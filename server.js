const http = require("http");
const fs = require("fs");
const path = require("path");

loadLocalEnv(path.join(__dirname, ".env"));

const PORT = Number(process.env.PORT || 4177);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_BASE_URL = normalizeOpenAIBaseURL(process.env.OPENAI_BASE_URL || "https://api.openai.com");
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.5";
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (req.method === "GET" && url.pathname === "/api/status") {
      return json(res, 200, {
        ok: true,
        mode: OPENAI_API_KEY ? "llm" : "offline",
        model: OPENAI_API_KEY ? OPENAI_MODEL : null,
        message: OPENAI_API_KEY ? "LLM generation enabled" : "OPENAI_API_KEY is not set",
      });
    }

    if (req.method === "POST" && url.pathname === "/api/roundtable") {
      const payload = await readJson(req);
      if (!OPENAI_API_KEY) {
        return json(res, 503, {
          ok: false,
          code: "missing_api_key",
          message: "Set OPENAI_API_KEY before starting the local server.",
        });
      }
      const result = await generateRoundWithModel(payload);
      return json(res, 200, { ok: true, source: "openai", model: OPENAI_MODEL, ...result });
    }

    if (req.method === "POST" && url.pathname === "/api/panel") {
      const payload = await readJson(req);
      if (!OPENAI_API_KEY) {
        return json(res, 503, {
          ok: false,
          code: "missing_api_key",
          message: "Set OPENAI_API_KEY before selecting a model-curated panel.",
        });
      }
      const result = await generatePanelWithModel(payload);
      return json(res, 200, { ok: true, source: "openai", model: OPENAI_MODEL, ...result });
    }

    if (req.method === "POST" && url.pathname === "/api/summary") {
      const payload = await readJson(req);
      if (!OPENAI_API_KEY) {
        return json(res, 503, {
          ok: false,
          code: "missing_api_key",
          message: "Set OPENAI_API_KEY before generating a final summary.",
        });
      }
      const result = await generateSummaryWithModel(payload);
      return json(res, 200, { ok: true, source: "openai", model: OPENAI_MODEL, ...result });
    }

    if (req.method === "POST" && url.pathname === "/api/topics") {
      const payload = await readJson(req);
      if (!OPENAI_API_KEY) {
        return json(res, 503, {
          ok: false,
          code: "missing_api_key",
          message: "Set OPENAI_API_KEY before generating topic suggestions.",
        });
      }
      const result = await generateTopicSuggestionsWithModel(payload);
      return json(res, 200, { ok: true, source: "openai", model: OPENAI_MODEL, ...result });
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      return json(res, 405, { ok: false, message: "Method not allowed" });
    }

    const safePath = safeStaticPath(url.pathname);
    if (!safePath) return text(res, 403, "Forbidden");
    const filePath = path.join(ROOT, safePath === "/" ? "index.html" : safePath);
    if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      return text(res, 404, "Not found");
    }
    const ext = path.extname(filePath);
    const headers = { "Content-Type": MIME[ext] || "application/octet-stream" };
    if ([".js", ".css"].includes(ext)) headers["Cache-Control"] = "no-store";
    res.writeHead(200, headers);
    if (req.method === "HEAD") return res.end();
    return fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error(error);
    return json(res, 500, { ok: false, message: error.message || "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Roundtable Seminar running at http://localhost:${PORT}`);
  console.log(OPENAI_API_KEY ? `LLM mode: ${OPENAI_MODEL}` : "Offline fallback: set OPENAI_API_KEY for real model generation");
});

function loadLocalEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function normalizeOpenAIBaseURL(value) {
  return value.trim().replace(/\/+$/, "").replace(/\/v1$/i, "");
}

function safeStaticPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded.includes("..") || decoded.includes("\0")) return null;
  return decoded;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function json(res, status, value) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
}

function text(res, status, value) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(value);
}

async function generateRoundWithModel(payload) {
  const prompt = buildPrompt(payload);
  const result = await requestModel(prompt);
  const text = extractText(result.data);
  const parsed = parseJsonFromText(text);
  validateRound(parsed);
  return { endpoint: result.endpoint, round: parsed };
}

async function generatePanelWithModel(payload) {
  const prompt = buildPanelPrompt(payload);
  const result = await requestModel(prompt);
  const text = extractText(result.data);
  const parsed = parseJsonFromText(text);
  validatePanel(parsed);
  return { endpoint: result.endpoint, panel: parsed };
}

async function generateSummaryWithModel(payload) {
  const prompt = buildSummaryPrompt(payload);
  const result = await requestModel(prompt);
  const text = extractText(result.data);
  const parsed = parseJsonFromText(text);
  validateSummary(parsed);
  return { endpoint: result.endpoint, summary: parsed };
}

async function generateTopicSuggestionsWithModel(payload) {
  const prompt = buildTopicSuggestionsPrompt(payload);
  const result = await requestModel(prompt);
  const text = extractText(result.data);
  const parsed = parseJsonFromText(text);
  const suggestions = validateTopicSuggestions(parsed);
  return { endpoint: result.endpoint, suggestions };
}

async function requestModel(prompt) {
  const response = await fetch(`${OPENAI_BASE_URL}/v1/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: prompt,
      temperature: 0.7,
    }),
  });

  if (response.ok) {
    return { endpoint: "responses", data: await response.json() };
  }

  const detail = await response.text();
  if (!shouldTryChatCompletions(response.status, detail)) {
    throw new Error(formatOpenAIError(response.status, detail));
  }

  return requestChatCompletions(prompt, detail);
}

async function requestChatCompletions(prompt, previousDetail) {
  const response = await fetch(`${OPENAI_BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "你是严格输出 JSON 的中文圆桌研讨生成器。不要输出 Markdown，不要输出解释。",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    }),
  });

  if (response.ok) {
    return { endpoint: "chat_completions", data: await response.json() };
  }

  const detail = await response.text();
  throw new Error(formatOpenAIError(response.status, detail || previousDetail));
}

function shouldTryChatCompletions(status, detail) {
  return status === 404 || status === 405 || /responses|not found|unsupported/i.test(detail);
}

function formatAttachmentsForPrompt(attachments = []) {
  const normalized = Array.isArray(attachments) ? attachments.slice(0, 6) : [];
  if (!normalized.length) return "";
  return normalized
    .map((file, index) => {
      const name = String(file.name || `附件 ${index + 1}`);
      const text = String(file.text || "").replace(/\s+/g, " ").trim().slice(0, 4000);
      return `### 附件 ${index + 1}: ${name}\n${text || "无可读文本"}`;
    })
    .join("\n\n");
}

function buildPanelPrompt({ topic, attachments }) {
  const attachmentContext = formatAttachmentsForPrompt(attachments);
  return `你是“圆桌研讨会”的组局策展人。请先根据用户议题判断本次最应该邀请哪些讨论席位，再输出严格 JSON。

议题: ${topic || "未命名议题"}

${attachmentContext ? `用户上传的议题附件上下文:\n${attachmentContext}\n` : ""}

要求：
- 每个新议题都要重新判断嘉宾，不沿用默认专家团。
- 优先邀请与议题最相关的真实知名人物、历史思想家、AI 顶尖人才、企业管理人才、产品/工程大师。
- 名称必须写成“姓名 思想席”或“中文姓名 思想席”，例如“Peter Drucker 思想席”“Andrew Ng 思想席”“Viktor Frankl 思想席”。
- 不要输出“存在哲学席”“心理健康席”“平台架构席”这类纯功能席，除非用户明确要求不要名人。
- 每位嘉宾代表一种必要视角，输出 5 个，最多 7 个。
- 这些不是本人真实参会，只是基于公开思想与代表性方法构建的“思想席位/观点原型”；不得暗示真人亲自发言，不得编造私密经历或未公开观点。
- lens 只能是 context/platform/risk/culture/metrics/custom。
- reason 要说明为什么本题需要这个名人思想席。
- 输出必须是严格 JSON，不要 Markdown，不要解释。

请返回：
{
  "rationale": "一句话说明本次组局逻辑",
  "participants": [
    {
      "name": "某某 思想席",
      "role": "基于该人物公开思想/方法可代表的核心角度",
      "lens": "context/platform/risk/culture/metrics/custom",
      "reason": "为什么本题需要邀请这位名人思想席"
    }
  ]
}`;
}

function buildSummaryPrompt({ state }) {
  const topic = state?.topic || "未命名议题";
  const attachmentContext = formatAttachmentsForPrompt(state?.attachments || []);
  const participants = (state?.participants || [])
    .map((p) => `- ${p.name}: ${p.role}${p.reason ? `；入场理由：${p.reason}` : ""}`)
    .join("\n");
  const rounds = (state?.rounds || [])
    .map(
      (round, index) =>
        `## 第 ${index + 1} 轮：${round.label || ""} / ${round.contradiction || ""}\n主持综合：${round.summary || ""}\n下一问题：${round.next || ""}\n发言：\n${(round.messages || [])
          .map((message) => `- ${message.speaker}（${message.action}）：${message.body}；简言之：${message.tldr}`)
          .join("\n")}`
    )
    .join("\n\n");

  return `你是“圆桌研讨会”的结论整理官。请基于全量历史记录生成尽可能详细、可执行、可复盘的中文结论报告。

议题: ${topic}

${attachmentContext ? `用户上传的议题附件上下文:\n${attachmentContext}\n` : ""}

本题嘉宾思想席:
${participants || "暂无"}

全量历史记录:
${rounds || "暂无"}

要求：
- 必须基于全量历史记录，不只总结最后一轮。
- 结论要详细，避免空泛口号。
- 明确核心结论、已形成共识、仍存在分歧、关键决策、行动项、风险缓解、开放问题和后续步骤。
- 行动项要包含 owner、action、reason、priority。
- risks 每项包含 risk 和 mitigation。
- 输出必须是严格 JSON，不要 Markdown，不要解释。

请返回：
{
  "title": "报告标题",
  "executiveSummary": "300-600 字的详细总述",
  "coreConclusions": [
    {"title":"结论标题","detail":"详细解释，至少 120 字","evidence":"来自哪类发言或轮次的依据"}
  ],
  "consensus": ["共识 1"],
  "disagreements": ["分歧 1"],
  "decisions": ["决策 1"],
  "actionItems": [
    {"owner":"负责角色","action":"具体动作","reason":"为什么要做","priority":"P0/P1/P2"}
  ],
  "risks": [
    {"risk":"风险","mitigation":"缓解方式"}
  ],
  "openQuestions": ["开放问题 1"],
  "nextSteps": ["下一步 1"]
}`;
}

function buildTopicSuggestionsPrompt({ state }) {
  const topic = state?.topic || "未命名议题";
  const attachmentContext = formatAttachmentsForPrompt(state?.attachments || []);
  const participants = (state?.participants || [])
    .map((p) => `- ${p.name}: ${p.role}`)
    .join("\n");
  const rounds = (state?.rounds || [])
    .slice(-4)
    .map(
      (round, index) =>
        `## 最近第 ${index + 1} 轮：${round.contradiction || ""}\n主持综合：${round.summary || ""}\n下一问题：${round.next || ""}\n用户追问：${(round.messages || [])
          .filter((message) => message.type === "user" || message.speaker === "你")
          .map((message) => message.body)
          .join(" / ") || "无"}`
    )
    .join("\n\n");

  return `你是“圆桌研讨会”的议题策划助手。请根据当前讨论，生成 3 个适合作为下一场圆桌的中文议题推荐。

当前议题: ${topic}

${attachmentContext ? `用户上传的议题附件上下文:\n${attachmentContext}\n` : ""}

本题嘉宾思想席:
${participants || "暂无"}

最近讨论:
${rounds || "暂无"}

要求：
- 推荐必须是具体可讨论的问题，不要是泛泛标题。
- 至少 1 个推荐要承接主持人留下的“下一问题”。
- 至少 1 个推荐要把讨论推向可执行方案、验证标准或真实组织落地。
- 如果有附件，至少 1 个推荐要引导回到附件证据或文档内容。
- 每个 reason 说明为什么适合作为下一场。
- 输出严格 JSON，不要 Markdown，不要解释。

请返回：
{
  "suggestions": [
    {"title":"下一议题问题","reason":"推荐理由"}
  ]
}`;
}

function buildPrompt({ state, mode, userPrompt }) {
  const topic = state?.topic || "未命名议题";
  const attachmentContext = formatAttachmentsForPrompt(state?.attachments || []);
  const userTurn = String(userPrompt || "").trim();
  const participants = (state?.participants || [])
    .map((p) => `- ${p.name}: ${p.role}`)
    .join("\n");
  const recentRounds = (state?.rounds || [])
    .slice(-3)
    .map(
      (r) =>
        `## ${r.label}: ${r.contradiction}\n主持综合: ${r.summary}\n下一问题: ${r.next}\n要点:\n${(r.messages || [])
          .slice(0, 6)
          .map((m) => `- ${m.speaker}/${m.action}: ${m.tldr}`)
          .join("\n")}`
    )
    .join("\n\n");

  return `你是“圆桌研讨会”系统的主持引擎。请基于用户议题和当前会话，生成下一轮中文圆桌讨论。

目标：
- 以求真为目标，不迎合用户预设。
- 每轮围绕一个核心矛盾展开。
- 主持人先推进/深入/结论，再由代表席位给出不同视角。
- 若席位名称包含真实人物，只能模拟其公开思想、代表性方法和常见立场所形成的“思想席位/观点原型”。
- 不要写成真人正在参会或亲自发言，不要编造私密信息、未公开观点或逐字引语。
- 输出必须是严格 JSON，不要 Markdown 包裹，不要解释。

模式: ${mode}
议题: ${topic}

${attachmentContext ? `用户上传的议题附件上下文:\n${attachmentContext}\n` : ""}

${userTurn ? `用户本轮自主追问/插话:\n${userTurn}\n\n请先让主持人明确回应用户追问，再让嘉宾围绕它补充、质询或修正。输出 messages 时必须保留一条 {"speaker":"你","action":"追问","type":"user","body":"用户追问原文","tldr":"用户提出新的讨论推进问题。"}。` : ""}

本题名人思想席:
${participants}

最近轮次:
${recentRounds || "暂无"}

请返回这个 JSON 结构：
{
  "label": "Round N 或 Deep Dive N",
  "stage": 0,
  "contradiction": "一句核心矛盾",
  "copy": "解释本轮矛盾的一段话",
  "summary": "主持人本轮综合",
  "next": "下一轮更深问题",
  "chart": "ASCII 图，使用换行符",
  "messages": [
    {"speaker":"主持人","action":"开场/推进/深入/结论","type":"moderator","body":"...","tldr":"..."},
    {"speaker":"某席位","action":"定义/质询/回应/反驳/补充/修正/共建","body":"...","tldr":"..."}
  ]
}

约束：
- stage 只能是 0-4，分别对应 定义/质询/共建/综述/沉淀。
- messages 至少包含主持人和 3 个席位。
- 每个 body 80-180 个汉字，tldr 18-35 个汉字。
- chart 必须短小、可读。
- 如果 mode 是 freeform，label 可写成 "User Q N"，stage 选择最贴近本轮追问的阶段。
- 如果 mode 是 conclude，stage 应为 4，并输出结论导向。`;
}

function extractText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  const chatText = data.choices?.[0]?.message?.content;
  if (typeof chatText === "string") return chatText;
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function parseJsonFromText(text) {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Model did not return JSON");
    return JSON.parse(match[0]);
  }
}

function validateRound(round) {
  const required = ["label", "stage", "contradiction", "copy", "summary", "next", "chart", "messages"];
  for (const key of required) {
    if (!(key in round)) throw new Error(`Model response missing ${key}`);
  }
  if (!Array.isArray(round.messages) || round.messages.length < 2) {
    throw new Error("Model response has no messages");
  }
  round.stage = Math.max(0, Math.min(4, Number(round.stage) || 0));
}

function validatePanel(panel) {
  if (!Array.isArray(panel.participants) || panel.participants.length < 3) {
    throw new Error("Panel response has too few participants");
  }
  panel.rationale = String(panel.rationale || "模型根据议题动态组局");
  panel.participants = panel.participants.slice(0, 7).map((participant, index) => ({
    id: participant.id ? String(participant.id) : `panel-${index + 1}`,
    name: String(participant.name || `席位 ${index + 1}`),
    role: String(participant.role || "未命名视角"),
    lens: normalizeLens(participant.lens),
    reason: String(participant.reason || ""),
  }));
}

function validateSummary(summary) {
  summary.title = String(summary.title || "结论报告");
  summary.executiveSummary = String(summary.executiveSummary || "");
  summary.coreConclusions = normalizeConclusionItems(summary.coreConclusions);
  summary.consensus = normalizeStringArray(summary.consensus);
  summary.disagreements = normalizeStringArray(summary.disagreements);
  summary.decisions = normalizeStringArray(summary.decisions);
  summary.openQuestions = normalizeStringArray(summary.openQuestions);
  summary.nextSteps = normalizeStringArray(summary.nextSteps);
  summary.actionItems = (Array.isArray(summary.actionItems) ? summary.actionItems : []).map((item, index) => ({
    owner: String(item.owner || `负责人 ${index + 1}`),
    action: String(item.action || ""),
    reason: String(item.reason || ""),
    priority: String(item.priority || "P1"),
  }));
  summary.risks = (Array.isArray(summary.risks) ? summary.risks : []).map((item) => ({
    risk: String(item.risk || item),
    mitigation: String(item.mitigation || ""),
  }));
  summary.createdAt = new Date().toISOString();
}

function validateTopicSuggestions(value) {
  const raw = Array.isArray(value?.suggestions) ? value.suggestions : Array.isArray(value) ? value : [];
  const suggestions = raw
    .map((item, index) => ({
      id: item.id ? String(item.id) : `topic-${index + 1}`,
      title: String(item.title || item).trim(),
      reason: String(item.reason || "适合作为下一场圆桌议题继续推进。").trim(),
    }))
    .filter((item) => item.title)
    .slice(0, 3);
  if (suggestions.length === 0) {
    throw new Error("Topic suggestion response has no suggestions");
  }
  return suggestions;
}

function normalizeConclusionItems(value) {
  return (Array.isArray(value) ? value : []).map((item, index) => ({
    title: String(item.title || `核心结论 ${index + 1}`),
    detail: String(item.detail || ""),
    evidence: String(item.evidence || ""),
  }));
}

function normalizeStringArray(value) {
  return (Array.isArray(value) ? value : []).map((item) => String(item)).filter(Boolean);
}

function normalizeLens(value) {
  const lens = String(value || "custom");
  return ["context", "platform", "risk", "culture", "metrics", "custom"].includes(lens) ? lens : "custom";
}

function formatOpenAIError(status, detail) {
  let code = "";
  let message = "";
  try {
    const parsed = JSON.parse(detail);
    code = parsed?.error?.code || parsed?.error?.type || "";
    message = parsed?.error?.message || "";
  } catch {
    message = detail || "";
  }

  if (status === 401 || code === "invalid_api_key") {
    return "OpenAI request failed: invalid_api_key. Check OPENAI_API_KEY in .env.";
  }
  if (status === 404 && /model/i.test(message)) {
    return `OpenAI request failed: model_not_found. Check OPENAI_MODEL=${OPENAI_MODEL}.`;
  }
  if (status === 429) {
    return "OpenAI request failed: rate_limited_or_quota_exceeded.";
  }
  return `OpenAI request failed: HTTP ${status}${code ? ` ${code}` : ""}.`;
}
