const STORAGE_KEY = "roundtable-seminar-current-v3";
const SAVED_KEY = "roundtable-seminar-saved-v1";
const MAX_ATTACHMENT_TEXT_CHARS = 24000;
const MAX_ATTACHMENT_TOTAL_CHARS = 72000;

const initialTopic =
  "AI-Coding 协作治理如何从机制思考落成可运行的组织协作系统？";

const participantCatalog = [
  {
    id: "andrew-ng",
    name: "Andrew Ng 思想席",
    role: "AI 落地、教育飞轮与应用场景选择",
    color: "#002fa7",
    lens: "culture",
    tags: ["ai", "人工智能", "落地", "教育", "学习", "应用", "产品", "coding", "agent"],
  },
  {
    id: "fei-fei-li",
    name: "Fei-Fei Li 思想席",
    role: "以人为本 AI、数据集、视觉智能与社会影响",
    color: "#3f4652",
    lens: "context",
    tags: ["ai", "人工智能", "视觉", "数据", "伦理", "人本", "社会", "研究"],
  },
  {
    id: "geoffrey-hinton",
    name: "Geoffrey Hinton 思想席",
    role: "深度学习能力边界、风险意识与长期影响",
    color: "#121212",
    lens: "risk",
    tags: ["ai", "深度学习", "风险", "安全", "长期", "模型", "研究"],
  },
  {
    id: "demis-hassabis",
    name: "Demis Hassabis 思想席",
    role: "通用智能、科学发现与长期研发组织",
    color: "#5b6472",
    lens: "platform",
    tags: ["ai", "agi", "科学", "研发", "模型", "研究", "长期", "deepmind"],
  },
  {
    id: "sam-altman",
    name: "Sam Altman 思想席",
    role: "AI 产品扩张、平台生态与商业化节奏",
    color: "#121212",
    lens: "culture",
    tags: ["ai", "openai", "平台", "产品", "商业", "创业", "agent", "模型"],
  },
  {
    id: "jensen-huang",
    name: "Jensen Huang 思想席",
    role: "算力平台、基础设施、生态位与执行速度",
    color: "#002fa7",
    lens: "platform",
    tags: ["ai", "算力", "gpu", "平台", "基础设施", "生态", "战略", "nvidia"],
  },
  {
    id: "satya-nadella",
    name: "Satya Nadella 思想席",
    role: "组织转型、平台战略、企业采用与文化更新",
    color: "#3f4652",
    lens: "culture",
    tags: ["组织", "文化", "企业", "平台", "采用", "管理", "转型", "microsoft"],
  },
  {
    id: "andy-grove",
    name: "Andy Grove 思想席",
    role: "高产出管理、瓶颈识别、指标与执行纪律",
    color: "#002fa7",
    lens: "metrics",
    tags: ["管理", "运营", "指标", "执行", "瓶颈", "组织", "项目", "效率"],
  },
  {
    id: "peter-drucker",
    name: "Peter Drucker 思想席",
    role: "管理本质、知识工作者、目标与责任",
    color: "#121212",
    lens: "culture",
    tags: ["管理", "组织", "知识工作", "目标", "责任", "战略", "企业"],
  },
  {
    id: "clayton-christensen",
    name: "Clayton Christensen 思想席",
    role: "颠覆式创新、价值网络与组织惯性",
    color: "#5b6472",
    lens: "culture",
    tags: ["创新", "颠覆", "战略", "组织", "产品", "商业", "价值"],
  },
  {
    id: "w-edwards-deming",
    name: "W. Edwards Deming 思想席",
    role: "质量体系、持续改进、过程能力与变异控制",
    color: "#3f4652",
    lens: "metrics",
    tags: ["质量", "流程", "改进", "指标", "工程", "生产", "管理"],
  },
  {
    id: "marty-cagan",
    name: "Marty Cagan 思想席",
    role: "产品发现、价值验证与 empowered product team",
    color: "#5b6472",
    lens: "culture",
    tags: ["产品", "用户", "发现", "验证", "团队", "价值", "pm"],
  },
  {
    id: "martin-fowler",
    name: "Martin Fowler 思想席",
    role: "软件架构、重构、演进式设计与工程实践",
    color: "#002fa7",
    lens: "platform",
    tags: ["工程", "架构", "重构", "代码", "软件", "dev", "质量"],
  },
  {
    id: "kent-beck",
    name: "Kent Beck 思想席",
    role: "极限编程、TDD、反馈循环与小步快跑",
    color: "#3f4652",
    lens: "context",
    tags: ["工程", "测试", "tdd", "敏捷", "反馈", "代码", "协作"],
  },
  {
    id: "linus-torvalds",
    name: "Linus Torvalds 思想席",
    role: "开源协作、代码质量、维护者文化与工程判断",
    color: "#121212",
    lens: "risk",
    tags: ["开源", "工程", "代码", "维护", "质量", "协作", "linux"],
  },
  {
    id: "gene-kim",
    name: "Gene Kim 思想席",
    role: "DevOps、价值流、约束理论与交付系统",
    color: "#002fa7",
    lens: "metrics",
    tags: ["devops", "交付", "价值流", "工程", "平台", "约束", "流程"],
  },
  {
    id: "nicole-forsgren",
    name: "Nicole Forsgren 思想席",
    role: "软件交付效能、DORA 指标与组织实证研究",
    color: "#5b6472",
    lens: "metrics",
    tags: ["dora", "指标", "交付", "效能", "工程", "研究", "质量"],
  },
  {
    id: "bruce-schneier",
    name: "Bruce Schneier 思想席",
    role: "安全工程、威胁建模、社会技术风险与信任",
    color: "#5b6472",
    lens: "risk",
    tags: ["安全", "风险", "隐私", "威胁", "信任", "治理", "security"],
  },
  {
    id: "don-norman",
    name: "Don Norman 思想席",
    role: "设计心理学、可用性、认知负荷与用户体验",
    color: "#002fa7",
    lens: "context",
    tags: ["设计", "用户", "体验", "交互", "可用性", "认知", "产品"],
  },
  {
    id: "daniel-kahneman",
    name: "Daniel Kahneman 思想席",
    role: "认知偏差、决策质量、风险感知与判断校准",
    color: "#3f4652",
    lens: "risk",
    tags: ["决策", "心理", "偏差", "风险", "判断", "管理", "行为"],
  },
  {
    id: "viktor-frankl",
    name: "Viktor Frankl 思想席",
    role: "意义疗法、苦难中的选择自由与责任",
    color: "#002fa7",
    lens: "context",
    tags: ["意义", "人生", "痛苦", "自由", "责任", "心理", "存在", "生命"],
  },
  {
    id: "albert-camus",
    name: "Albert Camus 思想席",
    role: "荒诞、反抗、自由与无保证处境中的尊严",
    color: "#121212",
    lens: "risk",
    tags: ["意义", "人生", "荒诞", "自由", "反抗", "存在", "哲学"],
  },
  {
    id: "jean-paul-sartre",
    name: "Jean-Paul Sartre 思想席",
    role: "存在主义、自由选择、责任与自我塑造",
    color: "#5b6472",
    lens: "culture",
    tags: ["意义", "人生", "存在", "自由", "选择", "责任", "哲学"],
  },
  {
    id: "simone-de-beauvoir",
    name: "Simone de Beauvoir 思想席",
    role: "处境、他者、关系中的自由与伦理实践",
    color: "#002fa7",
    lens: "culture",
    tags: ["意义", "人生", "关系", "自由", "伦理", "女性主义", "存在"],
  },
  {
    id: "irvin-yalom",
    name: "Irvin Yalom 思想席",
    role: "存在心理治疗、死亡、孤独、自由与意义",
    color: "#3f4652",
    lens: "context",
    tags: ["意义", "心理", "存在", "死亡", "孤独", "治疗", "人生"],
  },
  {
    id: "hannah-arendt",
    name: "Hannah Arendt 思想席",
    role: "行动、公共性、责任判断与人的复数性",
    color: "#5b6472",
    lens: "risk",
    tags: ["政治", "伦理", "责任", "行动", "公共", "哲学", "社会"],
  },
  {
    id: "laozi",
    name: "老子思想席",
    role: "无为、系统节制、反脆弱的治理直觉",
    color: "#121212",
    lens: "context",
    tags: ["哲学", "管理", "治理", "系统", "节制", "东方", "人生"],
  },
  {
    id: "confucius",
    name: "孔子思想席",
    role: "伦理秩序、角色责任、修身与共同体实践",
    color: "#002fa7",
    lens: "culture",
    tags: ["伦理", "组织", "责任", "关系", "教育", "东方", "管理"],
  },
  // ── 古典哲学
  {
    id: "socrates",
    name: "苏格拉底思想席",
    role: "质疑式对话、无知之知与真理探究",
    color: "#5b6472",
    lens: "context",
    tags: ["哲学", "对话", "质疑", "教育", "真理", "智慧", "伦理", "美德", "思辨"],
  },
  {
    id: "aristotle",
    name: "亚里士多德思想席",
    role: "逻辑学、目的论伦理与科学分类思维",
    color: "#002fa7",
    lens: "culture",
    tags: ["哲学", "逻辑", "伦理", "科学", "政治", "美学", "分类", "目的", "德性"],
  },
  {
    id: "nietzsche",
    name: "尼采思想席",
    role: "价值重估、权力意志与文化批判",
    color: "#121212",
    lens: "risk",
    tags: ["哲学", "价值", "文化", "道德", "批判", "创造", "超越", "人生", "意义"],
  },
  {
    id: "kant",
    name: "康德思想席",
    role: "道德律令、认识论边界与理性批判",
    color: "#5b6472",
    lens: "risk",
    tags: ["哲学", "伦理", "道德", "理性", "认识", "规则", "义务", "边界", "思维"],
  },
  // ── 科学与创新
  {
    id: "einstein",
    name: "爱因斯坦思想席",
    role: "想象力驱动的理论突破与科学革命",
    color: "#002fa7",
    lens: "platform",
    tags: ["科学", "物理", "创新", "理论", "想象", "思维", "宇宙", "时空", "研究"],
  },
  {
    id: "feynman",
    name: "费曼思想席",
    role: "第一性原理教学、好奇心与知识的可解释性",
    color: "#3f4652",
    lens: "context",
    tags: ["科学", "物理", "教育", "好奇", "解释", "简洁", "量子", "学习", "思维"],
  },
  {
    id: "turing",
    name: "图灵思想席",
    role: "计算本质、机器智能边界与算法思维",
    color: "#121212",
    lens: "platform",
    tags: ["计算", "人工智能", "算法", "逻辑", "智能", "机器", "ai", "数学", "密码"],
  },
  {
    id: "carl-sagan",
    name: "卡尔·萨根思想席",
    role: "科学精神、宇宙视角与批判性思维普及",
    color: "#5b6472",
    lens: "context",
    tags: ["科学", "宇宙", "教育", "怀疑", "思维", "人类", "星际", "文化", "认识"],
  },
  // ── 心理学
  {
    id: "jung",
    name: "荣格思想席",
    role: "集体无意识、原型理论与个体化过程",
    color: "#002fa7",
    lens: "context",
    tags: ["心理", "无意识", "原型", "象征", "人格", "梦", "意义", "自我", "成长"],
  },
  {
    id: "maslow",
    name: "马斯洛思想席",
    role: "需求层次、自我实现与人本主义心理学",
    color: "#3f4652",
    lens: "culture",
    tags: ["心理", "需求", "动机", "成长", "自我实现", "人本", "意义", "潜能", "人生"],
  },
  {
    id: "brene-brown",
    name: "布琳·布朗思想席",
    role: "脆弱性、勇气、羞耻感与真实领导力",
    color: "#5b6472",
    lens: "culture",
    tags: ["心理", "领导", "勇气", "关系", "情感", "文化", "信任", "组织", "脆弱"],
  },
  // ── 经济与战略
  {
    id: "adam-smith",
    name: "亚当·斯密思想席",
    role: "市场机制、分工协作与经济秩序的自发性",
    color: "#002fa7",
    lens: "metrics",
    tags: ["经济", "市场", "分工", "价值", "商业", "竞争", "自由", "交换", "制度"],
  },
  {
    id: "nassim-taleb",
    name: "塔勒布思想席",
    role: "反脆弱、黑天鹅与不确定性下的决策",
    color: "#121212",
    lens: "risk",
    tags: ["风险", "不确定", "反脆弱", "韧性", "决策", "黑天鹅", "系统", "策略", "管理"],
  },
  {
    id: "sun-tzu",
    name: "孙子思想席",
    role: "战略权谋、知己知彼与不战而屈人之兵",
    color: "#5b6472",
    lens: "risk",
    tags: ["战略", "竞争", "领导", "决策", "博弈", "管理", "东方", "组织", "优势"],
  },
  // ── 历史与政治
  {
    id: "wang-yangming",
    name: "王阳明思想席",
    role: "知行合一、心即理与致良知的实践哲学",
    color: "#002fa7",
    lens: "context",
    tags: ["哲学", "实践", "东方", "知行", "心学", "自我", "修身", "道德", "认知"],
  },
  {
    id: "machiavelli",
    name: "马基雅维利思想席",
    role: "权力现实主义、领导者的判断与组织博弈",
    color: "#3f4652",
    lens: "risk",
    tags: ["政治", "权力", "领导", "策略", "组织", "现实", "决策", "治理", "战略"],
  },
  {
    id: "mandela",
    name: "曼德拉思想席",
    role: "长期坚守、和解领导与制度性正义变革",
    color: "#002fa7",
    lens: "culture",
    tags: ["领导", "正义", "变革", "社会", "自由", "坚守", "道德", "制度", "人权"],
  },
  // ── 文学与社会批评
  {
    id: "luxun",
    name: "鲁迅思想席",
    role: "社会批判、文化改造与启蒙责任",
    color: "#121212",
    lens: "culture",
    tags: ["社会", "文化", "批判", "改革", "觉醒", "传统", "人性", "教育", "东方"],
  },
  {
    id: "simone-weil",
    name: "薇依思想席",
    role: "注意力伦理、劳动尊严与精神性批判",
    color: "#5b6472",
    lens: "context",
    tags: ["伦理", "社会", "劳动", "精神", "正义", "人性", "道德", "注意力", "意义"],
  },
  // ── 设计与创造力
  {
    id: "buckminster-fuller",
    name: "富勒思想席",
    role: "系统思维、设计科学与做得更少实现更多",
    color: "#002fa7",
    lens: "platform",
    tags: ["设计", "系统", "创新", "效率", "可持续", "未来", "建筑", "工程", "简洁"],
  },
  {
    id: "adam-grant",
    name: "亚当·格兰特思想席",
    role: "给予者文化、组织心理与重新思考的价值",
    color: "#3f4652",
    lens: "culture",
    tags: ["组织", "团队", "心理", "给予", "文化", "创新", "学习", "研究", "合作"],
  },
];

const timeline = ["定义", "质询", "共建", "综述", "沉淀"];
const palette = ["#002fa7", "#121212", "#5b6472", "#002fa7", "#3f4652"];
const avatarPool = Array.from({ length: 48 }, (_, index) => `assets/avatars/avatar-${String(index + 1).padStart(2, "0")}.png`);
const moderatorAvatar = "assets/avatars/avatar-34.png";

const els = {
  topicInput: document.querySelector("#topicInput"),
  startBtn: document.querySelector("#startBtn"),
  resetBtn: document.querySelector("#resetBtn"),
  newSessionBtn: document.querySelector("#newSessionBtn"),
  newSessionModal: document.querySelector("#newSessionModal"),
  closeNewSessionBtn: document.querySelector("#closeNewSessionBtn"),
  savedSessionList: document.querySelector("#savedSessionList"),
  sessionTitle: document.querySelector("#sessionTitle"),
  participantChips: document.querySelector("#participantChips"),
  thread: document.querySelector("#thread"),
  attachmentInput: document.querySelector("#attachmentInput"),
  uploadAttachmentBtn: document.querySelector("#uploadAttachmentBtn"),
  attachmentList: document.querySelector("#attachmentList"),
  topicSuggestionList: document.querySelector("#topicSuggestionList"),
  continueBtn: document.querySelector("#continueBtn"),
  deepenBtn: document.querySelector("#deepenBtn"),
  concludeBtn: document.querySelector("#concludeBtn"),
  inviteBtn: document.querySelector("#inviteBtn"),
  personModal: document.querySelector("#personModal"),
  closeModalBtn: document.querySelector("#closeModalBtn"),
  addPersonBtn: document.querySelector("#addPersonBtn"),
  personName: document.querySelector("#personName"),
  personAngle: document.querySelector("#personAngle"),
  freeformForm: document.querySelector("#freeformForm"),
  freeformInput: document.querySelector("#freeformInput"),
  sendFreeformBtn: document.querySelector("#sendFreeformBtn"),
  copyMarkdownBtn: document.querySelector("#copyMarkdownBtn"),
  exportMarkdownBtn: document.querySelector("#exportMarkdownBtn"),
  toast: document.querySelector("#toast"),
};

let state = loadCurrentState() || createFreshState();
let apiStatus = {
  mode: location.protocol === "file:" ? "file" : "checking",
  model: null,
  message: location.protocol === "file:" ? "请用本地服务打开以启用模型生成" : "正在检测本地服务",
};
let isBusy = false;

function createFreshState(topic = initialTopic, attachments = []) {
  const now = new Date().toISOString();
  const participants = selectParticipantsForTopic(topic);
  const fresh = {
    id: createId("session"),
    topic,
    attachments: normalizeAttachments(attachments),
    participants,
    activeParticipant: participants[0]?.id || "",
    panelNote: "本地根据议题邀请名人思想席",
    rounds: [],
    roundIndex: 0,
    activeView: "debate",
    completed: false,
    finalReport: null,
    topicSuggestions: [],
    createdAt: now,
    updatedAt: now,
  };
  fresh.rounds.push(generateRound(fresh, "initiate"));
  fresh.topicSuggestions = buildLocalTopicSuggestions(fresh);
  return fresh;
}

function normalizeState(value) {
  const now = new Date().toISOString();
  const normalized = {
    id: value.id || createId("session"),
    topic: value.topic || initialTopic,
    attachments: normalizeAttachments(value.attachments || []),
    participants: Array.isArray(value.participants) && value.participants.length ? value.participants : selectParticipantsForTopic(value.topic || initialTopic),
    activeParticipant: value.activeParticipant || "",
    panelNote: value.panelNote || "本题嘉宾思想席",
    rounds: Array.isArray(value.rounds) && value.rounds.length ? value.rounds : [],
    roundIndex: Number.isInteger(value.roundIndex) ? value.roundIndex : 0,
    activeView: value.activeView || "debate",
    completed: Boolean(value.completed),
    finalReport: value.finalReport ? normalizeFinalReport(value.finalReport, value.topic || initialTopic) : null,
    topicSuggestions: normalizeTopicSuggestions(value.topicSuggestions || []),
    createdAt: value.createdAt || now,
    updatedAt: value.updatedAt || now,
  };
  normalized.participants = normalized.participants.map((person, index) => ({
    id: person.id || createId("person"),
    name: person.name || `席位 ${index + 1}`,
    role: person.role || "未命名视角",
    initial: person.initial || (person.name || "席").slice(0, 1).toUpperCase(),
    color: person.color || palette[index % palette.length],
    lens: person.lens || inferLens(person.role || ""),
    reason: person.reason || "",
  }));
  if (!normalized.activeParticipant || !normalized.participants.some((person) => person.id === normalized.activeParticipant)) {
    normalized.activeParticipant = normalized.participants[0]?.id || "";
  }
  if (normalized.rounds.length === 0) {
    normalized.rounds.push(generateRound(normalized, "initiate"));
  }
  if (normalized.topicSuggestions.length === 0) {
    normalized.topicSuggestions = buildLocalTopicSuggestions(normalized);
  }
  normalized.roundIndex = Math.max(0, Math.min(normalized.roundIndex, normalized.rounds.length - 1));
  return normalized;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeAttachments(attachments = []) {
  let total = 0;
  const normalized = [];
  for (const attachment of Array.isArray(attachments) ? attachments : []) {
    if (normalized.length >= 8) break;
    const text = String(attachment.text || "").slice(0, MAX_ATTACHMENT_TEXT_CHARS);
    if (!text.trim()) continue;
    if (total >= MAX_ATTACHMENT_TOTAL_CHARS) break;
    const remaining = MAX_ATTACHMENT_TOTAL_CHARS - total;
    const clipped = text.slice(0, remaining);
    total += clipped.length;
    normalized.push({
      id: attachment.id || createId("file"),
      name: String(attachment.name || "未命名附件").slice(0, 120),
      type: String(attachment.type || "text/plain").slice(0, 80),
      size: Number(attachment.size) || clipped.length,
      text: clipped,
      addedAt: attachment.addedAt || new Date().toISOString(),
    });
  }
  return normalized;
}

function normalizeTopicSuggestions(suggestions = []) {
  return (Array.isArray(suggestions) ? suggestions : [])
    .map((item, index) => ({
      id: item.id || `topic-${index + 1}`,
      title: String(item.title || item).trim(),
      reason: String(item.reason || "作为下一轮可继续推进的议题。").trim(),
    }))
    .filter((item) => item.title)
    .slice(0, 3);
}

function hashString(value) {
  return String(value).split("").reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 2166136261);
}

function selectParticipantsForTopic(topic, count = 5) {
  const text = String(topic || "").toLowerCase();
  const scored = participantCatalog.map((candidate, index) => {
    const tagScore = (candidate.tags || []).reduce((score, tag) => {
      return text.includes(String(tag).toLowerCase()) ? score + 8 : score;
    }, 0);
    const lensScore = lensTopicBoost(candidate.lens, text);
    const tieBreak = (hashString(`${topic}:${candidate.id}`) % 1000) / 1000;
    return { candidate, index, score: tagScore + lensScore + tieBreak };
  });
  scored.sort((a, b) => b.score - a.score || a.index - b.index);

  const selected = [];
  const usedLenses = new Set();
  for (const item of scored) {
    if (selected.length >= count) break;
    if (usedLenses.has(item.candidate.lens) && selected.length < 3) continue;
    selected.push(item.candidate);
    usedLenses.add(item.candidate.lens);
  }
  for (const item of scored) {
    if (selected.length >= count) break;
    if (!selected.some((candidate) => candidate.id === item.candidate.id)) {
      selected.push(item.candidate);
    }
  }

  return selected.map((candidate, index) => normalizeParticipant(candidate, index));
}

function lensTopicBoost(lens, text) {
  const boosts = {
    context: ["上下文", "知识", "文档", "学习", "需求", "prompt", "spec",
              "认知", "理解", "教育", "对话", "意识", "感知", "心理", "无意识",
              "哲学", "思维", "智慧", "真理", "科普"],
    platform: ["平台", "工具", "系统", "模型", "api", "agent", "集成", "架构",
               "算法", "计算", "技术", "基础设施", "框架", "工程", "科学", "物理",
               "设计", "宇宙", "网络"],
    risk: ["风险", "安全", "权限", "合规", "生产", "回滚", "审计", "法务",
           "不确定", "脆弱", "反脆弱", "批判", "质疑", "边界", "道德", "伦理",
           "政治", "权力", "战略", "竞争", "博弈", "危机"],
    culture: ["组织", "采用", "文化", "用户", "产品", "团队", "变革", "管理",
              "社会", "价值", "关系", "领导", "人性", "意义", "人生", "精神",
              "历史", "传统", "共同体", "正义", "人权", "勇气", "情感"],
    metrics: ["指标", "成本", "效率", "交付", "质量", "数据", "roi", "项目",
              "经济", "市场", "增长", "商业", "分析", "绩效", "评估", "资源"],
  };
  return (boosts[lens] || []).reduce((score, word) => {
    return text.includes(word.toLowerCase()) ? score + 3 : score;
  }, 0);
}

function normalizeParticipant(person, index) {
  const name = String(person.name || `席位 ${index + 1}`);
  return {
    id: person.id || `seat-${hashString(`${name}:${person.role || ""}`).toString(36)}`,
    name,
    role: String(person.role || "未命名视角"),
    initial: person.initial || name.slice(0, 1).toUpperCase(),
    color: person.color || palette[index % palette.length],
    lens: person.lens || inferLens(person.role || ""),
    reason: person.reason || "",
  };
}

function applyPanel(panel, source = "llm") {
  if (!Array.isArray(panel?.participants) || panel.participants.length < 3) return false;
  state.participants = panel.participants
    .slice(0, 7)
    .map((person, index) => normalizeParticipant(person, index));
  state.activeParticipant = state.participants[0]?.id || "";
  state.panelNote = panel.rationale || (source === "llm" ? "模型根据议题邀请名人思想席" : "本地根据议题邀请名人思想席");
  state.rounds = [generateRound(state, "initiate")];
  state.roundIndex = 0;
  state.topicSuggestions = buildLocalTopicSuggestions(state);
  return true;
}

function findParticipantForSpeaker(speaker) {
  const normalizedSpeaker = String(speaker || "").replace(/\s+/g, "");
  return state.participants.find((person) => {
    const name = String(person.name || "").replace(/\s+/g, "");
    const shortName = name.replace(/席$/, "");
    return normalizedSpeaker.includes(name) || normalizedSpeaker.includes(shortName);
  });
}

function avatarMarkup(subject, options = {}) {
  const isModerator = Boolean(options.moderator);
  const image = getAvatarImage(subject, isModerator);
  return `<span class="avatar avatar-portrait${isModerator ? " moderator-avatar" : ""}" aria-hidden="true"><img src="${image}" alt="" loading="eager" decoding="async" /></span>`;
}

function getAvatarImage(subject = {}, isModerator = false) {
  if (isModerator) return moderatorAvatar;
  const seedKey = subject.avatarSeed || subject.id || subject.name || "roundtable-seat";
  return avatarPool[hashString(seedKey) % avatarPool.length];
}

function extractKeyConcept(topic) {
  const normalized = topic.replace(/[？?。！!]/g, "").trim();
  const matches = [
    "AI-Coding 协作治理",
    "AI-Coding",
    "组织协作",
    "圆桌讨论",
    "人工智能",
    "治理机制",
  ];
  return matches.find((item) => normalized.includes(item)) || normalized.slice(0, 18) || "核心议题";
}

function pickContradiction(roundNumber, mode, topic) {
  if (mode === "deepen") return "表层共识 vs 深层阻力";
  if (mode === "conclude") return "观点交锋 vs 知识沉淀";
  if (mode === "freeform") return "用户追问 vs 圆桌回应";
  const pool = [
    "效率释放 vs 责任可控",
    "完整框架 vs 最小启动",
    "AI 自主行动 vs 人类判断锚点",
    "组织学习 vs 流程负担",
    "知识沉淀 vs 交付速度",
    "工具能力 vs 团队采用",
  ];
  const offset = topic.length % pool.length;
  return pool[(roundNumber + offset - 1) % pool.length];
}

function actionFor(lens, mode, index) {
  if (mode === "initiate") return index === 0 ? "定义" : "补充";
  if (mode === "deepen") return lens === "risk" ? "质询" : "修正";
  if (mode === "freeform") return index === 0 ? "回应" : "补充";
  if (lens === "metrics") return "反驳";
  if (lens === "culture") return "回应";
  if (lens === "platform") return "共建";
  return index % 2 === 0 ? "定义" : "补充";
}

function responseFor(person, stateSnapshot, contradiction, mode, index, userPrompt = "") {
  const concept = extractKeyConcept(stateSnapshot.topic);
  const roundNumber = stateSnapshot.rounds.length + 1;
  const question = userPrompt ? userPrompt.replace(/\s+/g, " ").slice(0, 70) : "";
  if (mode === "freeform" && question) {
    const freeformTemplates = {
      context: {
        body: `针对你的追问「${question}」，我会先要求把问题改写成可执行上下文：背景是什么、决策对象是什么、已有证据是什么、希望圆桌产出什么。没有这个重写，嘉宾很容易各说各话。`,
        tldr: "先把追问翻译成可执行上下文。",
      },
      platform: {
        body: `我会把「${question}」拆成系统动作：需要读取哪些材料、调用哪些工具、谁有确认权、结果写回哪里。自主对话不能只是聊天，它要能推动下一步可追踪的机制动作。`,
        tldr: "追问要落到工具、权限和写回点。",
      },
      risk: {
        body: `我的第一反应是给「${question}」加停止条件。凡是涉及事实判断、外部承诺、权限边界或高风险决策，都要要求证据来源和人工确认，否则圆桌会显得热闹但不可负责。`,
        tldr: "自主推进也要有停止条件。",
      },
      culture: {
        body: `我会观察「${question}」是否真的帮助团队形成共同理解。好的追问会让参与者知道下一步该补充什么证据、承担什么责任；差的追问只会让讨论继续漂移。`,
        tldr: "追问要增强共同理解。",
      },
      metrics: {
        body: `如果要判断「${question}」有没有推进价值，我会看它是否带来新决策、新风险、新行动项或新验证标准。没有这些产物，就只是多一轮表达，而不是研讨进展。`,
        tldr: "用产物判断追问是否有效。",
      },
      custom: {
        body: `${person.name} 回应你的追问「${question}」：这需要先分清哪些是观点、哪些是证据、哪些可以转成下一步动作，再决定是否继续扩展议题。`,
        tldr: "追问应拆成观点、证据和动作。",
      },
    };
    return freeformTemplates[person.lens] || freeformTemplates.custom;
  }
  const templates = {
    context: {
      body: `我会先把「${concept}」写成 AI 能执行、也能被人审的上下文。没有稳定的需求模板、范例库和失败样本，AI 只是更快地产生不确定输出。第 ${roundNumber} 轮应检查：输入是否清楚、反馈是否可复用、错误是否能写回。`,
      tldr: "上下文质量决定 AI 输出上限。",
    },
    platform: {
      body: `这件事不能只靠提示词。要把 Git、PR、CI、Issue、文档状态连成一层薄 harness，让事件可监听、状态可追踪、动作有权限。围绕「${contradiction}」，平台层的任务是降低协作摩擦，而不是再造一个重系统。`,
      tldr: "先做薄 harness，再谈平台化。",
    },
    risk: {
      body: `我关心的是停止条件。凡是触碰公共契约、权限、生产、对外承诺，都不能让 AI 自动越过。当前矛盾「${contradiction}」的边界要写进任务卡、工具权限和审计轨迹。`,
      tldr: "关键动作必须可停、可追、可回滚。",
    },
    culture: {
      body: `组织采用的关键不是机制多完整，而是团队是否觉得它减少返工。把 AI 初稿、新人复核、解释证据、知识写回串成训练场，才能避免短期提效削薄长期能力。`,
      tldr: "机制要被感知为赋能，而不是监控。",
    },
    metrics: {
      body: `如果没有指标，「${concept}」会变成口号。至少要看 lead time、返工率、越界拦截、知识复用和评估器通过率。否则我们不知道这套机制是在提效，还是只是在增加仪式。`,
      tldr: "没有指标，就没有管理。",
    },
    custom: {
      body: `${person.name} 从「${person.role}」角度补充：当前重点不是把所有讨论一次性说完，而是把可执行动作、责任边界和证据留痕接起来。`,
      tldr: "新视角应转化为可执行机制。",
    },
  };
  return templates[person.lens] || templates.custom;
}

function generateRound(stateSnapshot, mode = "continue", options = {}) {
  const roundNumber = stateSnapshot.rounds.length + 1;
  const contradiction = pickContradiction(roundNumber, mode, stateSnapshot.topic);
  const concept = extractKeyConcept(stateSnapshot.topic);
  const stage = mode === "deepen" ? 1 : Math.min((roundNumber - 1) % timeline.length, 4);
  const selected = stateSnapshot.participants.slice(0, Math.min(5, stateSnapshot.participants.length));
  const userPrompt = String(options.userPrompt || "").trim();
  const messages = [
    {
      speaker: "主持人",
      action: mode === "initiate" ? "开场" : mode === "deepen" ? "深入" : mode === "freeform" ? "回应" : "推进",
      type: "moderator",
      body:
        mode === "initiate"
          ? `本次圆桌围绕「${stateSnapshot.topic}」开始。我们先统一「${concept}」的定义，再让不同席位围绕矛盾展开质询与共建。`
          : mode === "deepen"
            ? `我们暂停推进，继续追问「${contradiction}」：它不是表面分歧，而是机制设计能否被真实采用的关键。`
            : mode === "freeform"
              ? `收到你的追问。我们先把它纳入当前圆桌：${userPrompt || "请围绕当前议题补充追问"}。接下来请嘉宾判断它改变了哪些问题定义、证据要求和后续动作。`
            : `我们进入第 ${roundNumber} 轮。上一轮已经形成初步框架，现在要把「${contradiction}」拆成更可执行的判断。`,
      tldr:
        mode === "initiate"
          ? "先定义核心概念，再开始交锋。"
          : mode === "deepen"
            ? "深入当前矛盾，而不是急着换话题。"
            : mode === "freeform"
              ? "用户追问已进入圆桌回应。"
            : "推进到更可执行的机制层。",
    },
  ];

  selected.forEach((person, index) => {
    const response = responseFor(person, stateSnapshot, contradiction, mode, index, userPrompt);
    messages.push({
      speaker: person.name,
      action: actionFor(person.lens, mode, index),
      body: response.body,
      tldr: response.tldr,
    });
  });

  return {
    id: createId("round"),
    label: mode === "deepen" ? `Deep Dive ${roundNumber}` : mode === "freeform" ? `User Q ${roundNumber}` : `Round ${roundNumber}`,
    stage,
    contradiction,
    copy: buildContradictionCopy(contradiction, concept, mode),
    summary: buildSummary(contradiction, concept, mode),
    next: buildNextQuestion(contradiction, concept, mode),
    chart: buildAsciiChart(contradiction, concept, mode),
    messages,
    mode,
    createdAt: new Date().toISOString(),
  };
}

function buildContradictionCopy(contradiction, concept, mode) {
  if (mode === "deepen") {
    return `本节继续围绕「${contradiction}」追问：阻力通常不来自模型能力，而来自组织是否愿意改变协作习惯。`;
  }
  if (mode === "freeform") {
    return `本轮由用户自主追问触发，目标是判断这个追问如何改变「${concept}」的讨论焦点、证据要求和下一步动作。`;
  }
  return `围绕「${concept}」，本轮要处理的核心张力是「${contradiction}」。讨论目标是把抽象观点压缩成机制动作。`;
}

function buildSummary(contradiction, concept, mode) {
  if (mode === "conclude") {
    return `本次讨论已收束为一张围绕「${concept}」的知识网络：概念、分歧、标准、机制、风险和后续追问都已沉淀。`;
  }
  if (mode === "freeform") {
    return `用户追问把讨论重新拉回「${concept}」的可执行层：它需要明确上下文、责任边界、证据来源和可验证的后续动作。`;
  }
  return `本轮核心争议是「${contradiction}」。它提醒我们：${concept} 的价值不在于多产出文本，而在于让组织能更快形成判断、边界和证据。`;
}

function buildNextQuestion(contradiction, concept, mode) {
  if (mode === "deepen") {
    return `如果「${contradiction}」继续存在，哪个流程节点最先失效？`;
  }
  if (mode === "freeform") {
    return `基于这次追问，下一轮最应该补充哪一类证据或约束？`;
  }
  const questions = [
    `如果只允许从最小可行机制开始，${concept} 第一周必须跑通哪三个动作？`,
    `这套机制怎样证明自己是在减少返工，而不是增加流程？`,
    `哪些判断必须由人保留，哪些整理工作可以交给 AI 自动完成？`,
    `如何把每次失败写回成下一次 AI 能检索到的组织资产？`,
  ];
  return questions[(contradiction.length + concept.length) % questions.length];
}

function buildAsciiChart(contradiction, concept, mode) {
  const center = mode === "deepen" ? "深层阻力" : "受控自治";
  return [
    concept,
    "        |",
    `   ${center}`,
    "        |",
    "+-------+-------+",
    "|       |       |",
    "上下文   边界    证据",
    "需求    权限    CI/审计",
    "|       |       |",
    `+-- ${contradiction} --+`,
  ].join("\n");
}

function deriveKnowledgeItems() {
  const current = currentRound();
  const concept = extractKeyConcept(state.topic);
  const roundCount = state.rounds.length;
  return [
    ["核心概念", `${concept} 不是单一对话能力，而是把观点生成、质询、综合和知识沉淀串成可追溯流程。`],
    ["主要分歧", current ? current.contradiction : "尚未开始讨论。"],
    ["判断标准", "看需求清晰度、边界命中率、证据留存率、返工减少和知识复用，而不是只看输出字数。"],
    ["最小闭环", "议题输入 → 席位交锋 → 主持综合 → ASCII 框架 → 知识网络 → 导出/保存。"],
    ["当前进度", `已完成 ${roundCount} 轮，${state.completed ? "已结论沉淀" : "仍在推进中"}。`],
    ["后续追问", current ? current.next : "从一个具体议题开始第一轮研讨。"],
  ];
}

function deriveMetrics() {
  const roundCount = state.rounds.length;
  const participantCount = state.participants.length;
  const completedBonus = state.completed ? 8 : 0;
  const clamp = (value) => Math.max(0, Math.min(100, value));
  return [
    ["上下文完整度", `${clamp(52 + roundCount * 8 + participantCount * 2)}%`, clamp(52 + roundCount * 8 + participantCount * 2)],
    ["边界清晰度", `${clamp(46 + roundCount * 9 + completedBonus)}%`, clamp(46 + roundCount * 9 + completedBonus)],
    ["证据可追溯", `${clamp(40 + roundCount * 11 + completedBonus)}%`, clamp(40 + roundCount * 11 + completedBonus)],
    ["采用阻力", `${clamp(62 - roundCount * 7 - completedBonus)}%`, clamp(62 - roundCount * 7 - completedBonus)],
  ];
}

function currentRound() {
  return state.rounds[state.roundIndex] || state.rounds[0];
}

function renderParticipantChips() {
  els.participantChips.innerHTML = state.participants
    .map((person) => `
      <div class="p-chip">
        <span class="p-chip-av" style="background:${escapeHtml(person.color || "#002fa7")}" aria-hidden="true">
          ${escapeHtml((person.name || "?").slice(0, 1).toUpperCase())}
        </span>
        <span class="p-chip-name">${escapeHtml((person.name || "").replace(/\s*思想席$/, ""))}</span>
      </div>
    `)
    .join("");
}

function renderAttachments() {
  const attachments = state.attachments || [];
  els.attachmentList.innerHTML = attachments.length
    ? attachments
        .map(
          (attachment) => `
            <div class="attachment-chip">
              <span>${escapeHtml(attachment.name)} · ${escapeHtml(formatBytes(attachment.size))}</span>
              <button class="attachment-remove" data-id="${attachment.id}" type="button" aria-label="移除 ${escapeHtml(attachment.name)}">×</button>
            </div>
          `
        )
        .join("")
    : "";
}

function renderTopicSuggestions() {
  const suggestions = normalizeTopicSuggestions(state.topicSuggestions);
  els.topicSuggestionList.innerHTML = suggestions.length
    ? suggestions
        .map(
          (item) => `
            <button class="topic-suggestion" data-topic="${escapeHtml(item.title)}" type="button">
              <b>${escapeHtml(item.title)}</b>
              <span>${escapeHtml(item.reason)}</span>
            </button>
          `
        )
        .join("")
    : `<button class="topic-suggestion" type="button" data-topic="${escapeHtml(currentRound()?.next || state.topic)}">
        <b>${escapeHtml(currentRound()?.next || state.topic)}</b>
        <span>基于主持人留下的问题继续推进。</span>
      </button>`;
}

function buildMessageHtml(message) {
  const isModerator = message.type === "moderator" || message.speaker === "主持人";
  const isUser = message.type === "user" || message.speaker === "你";
  const person = findParticipantForSpeaker(message.speaker);
  const avatarSubject = isModerator
    ? { id: "moderator", name: "主持人" }
    : isUser
      ? { id: "user", name: "你" }
    : person || { id: `speaker-${message.speaker}`, name: message.speaker };
  return `
    <article class="msg${isModerator ? " msg-moderator" : ""}${isUser ? " msg-user" : ""}">
      ${avatarMarkup(avatarSubject, { moderator: isModerator })}
      <div class="msg-body">
        <div class="msg-meta">
          <span class="msg-name">${escapeHtml(message.speaker)}</span>
          <span class="action-chip">${escapeHtml(message.action)}</span>
        </div>
        <p class="msg-text">${escapeHtml(message.body)}</p>
        ${message.tldr ? `<p class="tldr">简言之：${escapeHtml(message.tldr)}</p>` : ""}
      </div>
    </article>
  `;
}

function buildSynthesisHtml(round) {
  if (!round.summary) return "";
  return `
    <div class="synthesis">
      <div class="synthesis-header">
        <span class="synthesis-kicker">Moderator</span>
        <span>主持人综述</span>
      </div>
      <p class="synthesis-text">${escapeHtml(round.summary)}</p>
      ${round.chart ? `<pre class="synthesis-ascii">${escapeHtml(round.chart)}</pre>` : ""}
      ${round.next ? `
        <div class="next-q-card">
          <p class="next-q-label">→ 下一问题</p>
          <p class="next-q-text">${escapeHtml(round.next)}</p>
        </div>
      ` : ""}
    </div>
  `;
}

function buildFinalReportHtml() {
  if (!state.finalReport) return "";
  const report = normalizeFinalReport(state.finalReport, state.topic);
  const renderList = (items) => items.length
    ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : `<p class="empty-note">暂无</p>`;
  return `
    <div class="final-report-card">
      <span class="final-report-kicker">Final Report</span>
      <h3 class="final-report-title">${escapeHtml(report.title)}</h3>
      <p class="final-report-summary">${escapeHtml(report.executiveSummary)}</p>
      <div class="final-report-conclusions">
        ${report.coreConclusions.map((item) => `
          <div class="conclusion-item">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.detail)}</p>
            ${item.evidence ? `<em>依据：${escapeHtml(item.evidence)}</em>` : ""}
          </div>
        `).join("")}
      </div>
      <div class="final-report-grid">
        <div><h4>已形成共识</h4>${renderList(report.consensus)}</div>
        <div><h4>仍存在分歧</h4>${renderList(report.disagreements)}</div>
        <div><h4>关键决策</h4>${renderList(report.decisions)}</div>
        <div><h4>开放问题</h4>${renderList(report.openQuestions)}</div>
      </div>
      ${report.actionItems.length ? `
        <div class="action-items">
          <h4>行动项</h4>
          ${report.actionItems.map((item) => `
            <div class="action-item">
              <b>${escapeHtml(item.owner)}</b>
              <span>${escapeHtml(item.action)}</span>
              <em>${escapeHtml(item.priority)}</em>
            </div>
          `).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function renderThread() {
  const rounds = state.rounds.slice(0, state.roundIndex + 1);
  let html = "";
  rounds.forEach((round) => {
    html += `<div class="round-divider" role="separator"><span>${escapeHtml(round.label)}${round.contradiction ? ` · ${escapeHtml(round.contradiction)}` : ""}</span></div>`;
    (round.messages || []).forEach((message) => { html += buildMessageHtml(message); });
    html += buildSynthesisHtml(round);
  });
  if (state.completed && state.finalReport) {
    html += buildFinalReportHtml();
  }
  els.thread.innerHTML = html;
  requestAnimationFrame(() => { els.thread.scrollTop = els.thread.scrollHeight; });
}

function renderSessions() {
  const saved = loadSavedSessions();
  const others = saved.filter((s) => s.id !== state.id);
  const modeLabel =
    apiStatus.mode === "llm"
      ? apiStatus.model || "LLM"
      : apiStatus.mode === "checking"
        ? "检测中"
        : "离线";
  els.savedSessionList.innerHTML = `
    <div class="group-label">当前</div>
    <div class="session-item session-current" role="listitem">
      <div class="session-item-title">${escapeHtml(state.topic)}</div>
      <div class="session-item-meta">${state.rounds.length} 轮 · ${escapeHtml(modeLabel)}${state.completed ? " · 已结论" : ""}</div>
    </div>
    ${others.length ? `
      <div class="group-label">历史</div>
      ${others.slice(0, 20).map((item) => `
        <button class="session-item" data-id="${escapeHtml(item.id)}" type="button">
          <div class="session-item-title">${escapeHtml(item.topic.length > 36 ? item.topic.slice(0, 36) + "…" : item.topic)}</div>
          <div class="session-item-meta">${item.rounds.length} 轮 · ${formatTime(item.updatedAt)}</div>
        </button>
      `).join("")}
    ` : ""}
  `;
}

function renderAll() {
  const title = state.topic.length > 30 ? `${state.topic.slice(0, 30)}…` : state.topic;
  els.sessionTitle.textContent = title;
  els.topicInput.value = state.topic;
  renderParticipantChips();
  renderAttachments();
  renderTopicSuggestions();
  renderThread();
  renderSessions();
  renderBusy();
  persistCurrent();
}

function renderBusy() {
  [els.startBtn, els.continueBtn, els.deepenBtn, els.concludeBtn,
   els.addPersonBtn, els.sendFreeformBtn, els.uploadAttachmentBtn].forEach((button) => {
    if (button) button.disabled = isBusy;
  });
  if (els.continueBtn) els.continueBtn.textContent = isBusy ? "生成中…" : "继续 →";
  if (els.sendFreeformBtn) els.sendFreeformBtn.textContent = isBusy ? "生成中" : "发送";
}

function openModal() {
  els.personName.value = "";
  els.personAngle.value = "";
  els.personModal.classList.add("open");
  els.personModal.setAttribute("aria-hidden", "false");
  els.personName.focus();
}

function closeModal() {
  els.personModal.classList.remove("open");
  els.personModal.setAttribute("aria-hidden", "true");
}

function addPerson() {
  const name = els.personName.value.trim();
  if (!name) { showToast("请输入人物名称"); els.personName.focus(); return; }
  const role = els.personAngle.value.trim() || "补充独特视角";
  const id = createId("person");
  const person = {
    id,
    name,
    role,
    initial: name.slice(0, 1).toUpperCase(),
    color: palette[state.participants.length % palette.length],
    lens: inferLens(role),
  };
  state.participants = [...state.participants, person];
  state.activeParticipant = id;
  const current = currentRound();
  const response = responseFor(person, state, current.contradiction, "continue", state.participants.length);
  current.messages = [
    ...current.messages,
    {
      speaker: "主持人",
      action: "引入",
      type: "moderator",
      body: `欢迎 ${name} 加入圆桌。请从"${role}"角度对当前矛盾提出一个新的判断。`,
      tldr: "新视角已进入当前轮次。",
    },
    {
      speaker: name,
      action: "补充",
      body: response.body,
      tldr: response.tldr,
    },
  ];
  touch();
  closeModal();
  renderAll();
  showToast(`已引入 ${name}`);
}

function inferLens(role) {
  if (/安全|权限|风险|治理/.test(role)) return "risk";
  if (/产品|体验|采用|文化/.test(role)) return "culture";
  if (/工程|质量|效率|交付|指标/.test(role)) return "metrics";
  if (/平台|工具|系统|基础/.test(role)) return "platform";
  if (/人才|学习|训练|知识/.test(role)) return "context";
  return "custom";
}

async function handleAttachmentFiles(files) {
  if (!files?.length) return;
  const accepted = [];
  for (const file of Array.from(files)) {
    if (!isTextLikeFile(file)) {
      showToast("当前仅支持文本、Markdown、HTML、JSON 等附件");
      continue;
    }
    try {
      const raw = await file.text();
      const text = extractAttachmentText(raw, file.name);
      if (!text.trim()) continue;
      accepted.push({
        id: createId("file"),
        name: file.name,
        type: file.type || "text/plain",
        size: file.size,
        text,
        addedAt: new Date().toISOString(),
      });
    } catch {
      showToast(`${file.name} 读取失败`);
    }
  }
  if (!accepted.length) return;
  state.attachments = normalizeAttachments([...(state.attachments || []), ...accepted]);
  state.topicSuggestions = buildLocalTopicSuggestions(state);
  touch();
  renderAll();
  showToast(`已加入 ${accepted.length} 个附件上下文`);
}

function isTextLikeFile(file) {
  const name = String(file.name || "").toLowerCase();
  return (
    /^text\//.test(file.type || "") ||
    /\.(txt|md|markdown|html|htm|json|csv|log|js|jsx|ts|tsx|css|py)$/i.test(name)
  );
}

function extractAttachmentText(raw, name = "") {
  let text = String(raw || "");
  if (/\.(html|htm)$/i.test(name)) {
    text = text
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
  return text.replace(/\s+/g, " ").trim().slice(0, MAX_ATTACHMENT_TEXT_CHARS);
}

function removeAttachment(id) {
  state.attachments = (state.attachments || []).filter((attachment) => attachment.id !== id);
  state.topicSuggestions = buildLocalTopicSuggestions(state);
  touch();
  renderAll();
  showToast("附件已移除");
}

function formatBytes(value) {
  const bytes = Number(value) || 0;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function userPromptMessage(userPrompt) {
  return {
    speaker: "你",
    action: "追问",
    type: "user",
    body: userPrompt,
    tldr: "用户提出新的讨论推进问题。",
  };
}

function withUserPromptMessage(round, userPrompt) {
  const hasUserMessage = (round.messages || []).some((message) => message.type === "user" || message.speaker === "你");
  if (hasUserMessage) return round;
  return {
    ...round,
    messages: [userPromptMessage(userPrompt), ...(round.messages || [])],
  };
}

async function submitFreeform(event) {
  event.preventDefault();
  if (isBusy) return;
  const userPrompt = els.freeformInput.value.trim();
  if (!userPrompt) {
    showToast("先输入你想追问的内容");
    return;
  }
  if (state.completed) {
    showToast("当前会话已结论，先新建会话再继续");
    return;
  }
  setBusy(true);
  els.freeformInput.value = "";
  const generated = await generateRoundPreferred("freeform", { userPrompt });
  state.rounds.push(withUserPromptMessage(generated, userPrompt));
  state.roundIndex = state.rounds.length - 1;
  touch();
  await refreshTopicSuggestions({ silent: true });
  renderAll();
  showToast("圆桌已回应你的追问");
  setBusy(false);
}

function buildLocalTopicSuggestions(stateSnapshot = state) {
  const current = stateSnapshot.rounds?.[stateSnapshot.roundIndex] || stateSnapshot.rounds?.[0];
  const concept = extractKeyConcept(stateSnapshot.topic || initialTopic);
  const attachmentHint = stateSnapshot.attachments?.length ? "结合已上传附件做证据校准" : "补充证据来源与验证标准";
  return normalizeTopicSuggestions([
    {
      id: "next-question",
      title: current?.next || `继续追问「${concept}」的下一步机制`,
      reason: "承接主持人留下的问题，适合直接开启下一场深入研讨。",
    },
    {
      id: "pilot",
      title: `把「${concept}」拆成一周可试运行方案`,
      reason: "把观点转成流程、角色、产物和检查点。",
    },
    {
      id: "evidence",
      title: `${attachmentHint}：哪些判断还缺真实依据？`,
      reason: "避免圆桌只停留在观点层，推动下一轮形成证据清单。",
    },
  ]);
}

async function refreshTopicSuggestions({ silent = false } = {}) {
  const suggestions = await requestModelTopicSuggestions();
  state.topicSuggestions = normalizeTopicSuggestions(suggestions || buildLocalTopicSuggestions(state));
  touch();
  if (!silent) {
    renderTopicSuggestions();
    renderSessions();
    persistCurrent();
    showToast(suggestions ? "已重新生成议题推荐" : "已使用本地规则推荐议题");
  }
}

function applySuggestedTopic(title) {
  if (!title) return;
  els.topicInput.value = title;
  showToast("已填入议题，点击【开始研讨】即可开启新圆桌");
}

async function startSession() {
  if (isBusy) return;
  closeNewSessionModal();
  setBusy(true);
  const topic = els.topicInput.value.trim() || initialTopic;
  const attachments = state.attachments || [];
  archiveCurrentSession({ silent: true });
  state = createFreshState(topic, attachments);
  await replacePanelFromApi(topic);
  await replaceCurrentRoundFromApi("initiate");
  await refreshTopicSuggestions({ silent: true });
  renderAll();
  showToast(apiStatus.mode === "llm" ? "已动态组局并开始研讨" : "已本地组局并开始研讨");
  setBusy(false);
}

function openNewSessionModal() {
  els.topicInput.value = state.topic;
  els.newSessionModal.setAttribute("aria-hidden", "false");
  els.newSessionModal.classList.add("open");
  els.topicInput.focus();
  refreshTopicSuggestions({ silent: true });
}

function closeNewSessionModal() {
  els.newSessionModal.setAttribute("aria-hidden", "true");
  els.newSessionModal.classList.remove("open");
}

async function continueRound() {
  if (isBusy) return;
  if (state.completed) {
    showToast("当前会话已结论，先新建会话再继续");
    return;
  }
  setBusy(true);
  if (state.roundIndex < state.rounds.length - 1) {
    state.roundIndex += 1;
  } else {
    state.rounds.push(await generateRoundPreferred("continue"));
    state.roundIndex = state.rounds.length - 1;
  }
  touch();
  await refreshTopicSuggestions({ silent: true });
  renderAll();
  setBusy(false);
}

async function deepen() {
  if (isBusy) return;
  if (state.completed) return;
  setBusy(true);
  state.rounds.push(await generateRoundPreferred("deepen"));
  state.roundIndex = state.rounds.length - 1;
  touch();
  await refreshTopicSuggestions({ silent: true });
  renderAll();
  setBusy(false);
}

async function conclude() {
  if (isBusy) return;
  setBusy(true);
  if (!state.completed) {
    const conclusion = await generateRoundPreferred("conclude");
    conclusion.stage = 4;
    conclusion.messages.push({
      speaker: "主持人",
      action: "结论",
      type: "moderator",
      body: `今天的讨论暂告一段落。我们从「${state.topic}」出发，通过 ${state.rounds.length} 轮交锋，形成了可导出的知识网络。`,
      tldr: "圆桌讨论已沉淀为知识网络。",
    });
    state.rounds.push(conclusion);
    state.roundIndex = state.rounds.length - 1;
    state.finalReport = normalizeFinalReport((await requestModelFinalReport()) || buildLocalFinalReport());
    state.completed = true;
  }
  touch();
  renderAll();
  archiveCurrentSession({ silent: true });
  showToast("已生成详细结论报告");
  setBusy(false);
}

function setBusy(value) {
  isBusy = value;
  renderBusy();
  if (value) showToast(apiStatus.mode === "llm" ? "模型生成中..." : "离线生成中...");
}

async function replaceCurrentRoundFromApi(mode) {
  const generated = await requestModelRound(mode);
  if (!generated) return;
  state.rounds[state.roundIndex] = normalizeRound(generated, mode);
  touch();
}

async function replacePanelFromApi(topic) {
  const panel = await requestModelPanel(topic, state.attachments || []);
  if (!panel) return false;
  const applied = applyPanel(panel, "llm");
  if (applied) touch();
  return applied;
}

async function generateRoundPreferred(mode, options = {}) {
  const generated = await requestModelRound(mode, options);
  return generated ? normalizeRound(generated, mode) : generateRound(state, mode, options);
}

function normalizeRound(round, mode) {
  return {
    id: round.id || createId("round"),
    label: String(round.label || `${mode === "deepen" ? "Deep Dive" : "Round"} ${state.rounds.length + 1}`),
    stage: Math.max(0, Math.min(4, Number(round.stage) || 0)),
    contradiction: String(round.contradiction || "未命名矛盾"),
    copy: String(round.copy || ""),
    summary: String(round.summary || ""),
    next: String(round.next || ""),
    chart: String(round.chart || ""),
    messages: Array.isArray(round.messages) ? round.messages.map(normalizeMessage) : [],
    mode,
    source: round.source || "openai",
    createdAt: round.createdAt || new Date().toISOString(),
  };
}

function normalizeMessage(message) {
  return {
    speaker: String(message.speaker || "未知席位"),
    action: String(message.action || "补充"),
    type: message.type === "moderator" ? "moderator" : message.type === "user" ? "user" : undefined,
    body: String(message.body || ""),
    tldr: String(message.tldr || ""),
  };
}

function normalizeFinalReport(report = {}, topic = initialTopic) {
  const toTextArray = (value) => (Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : []);
  return {
    title: String(report.title || `${topic} · 结论报告`),
    executiveSummary: String(report.executiveSummary || "本次讨论已完成，核心结论仍需结合全量记录继续沉淀。"),
    coreConclusions: (Array.isArray(report.coreConclusions) ? report.coreConclusions : [])
      .map((item) => ({
        title: String(item.title || "未命名结论"),
        detail: String(item.detail || ""),
        evidence: String(item.evidence || ""),
      }))
      .filter((item) => item.detail),
    consensus: toTextArray(report.consensus),
    disagreements: toTextArray(report.disagreements),
    decisions: toTextArray(report.decisions),
    openQuestions: toTextArray(report.openQuestions),
    nextSteps: toTextArray(report.nextSteps),
    risks: (Array.isArray(report.risks) ? report.risks : []).map((item) => ({
      risk: String(item.risk || item),
      mitigation: String(item.mitigation || "后续继续拆解缓解方案"),
    })),
    actionItems: (Array.isArray(report.actionItems) ? report.actionItems : []).map((item) => ({
      owner: String(item.owner || "待定"),
      action: String(item.action || ""),
      reason: String(item.reason || ""),
      priority: String(item.priority || "P1"),
    })),
    createdAt: report.createdAt || new Date().toISOString(),
  };
}

function buildLocalFinalReport() {
  const concept = extractKeyConcept(state.topic);
  const contradictions = state.rounds.map((round) => round.contradiction).filter(Boolean);
  const summaries = state.rounds.map((round) => round.summary).filter(Boolean);
  const lastRound = currentRound();
  return normalizeFinalReport({
    title: `${concept} · 结论报告`,
    executiveSummary: `本次圆桌围绕「${state.topic}」完成了 ${state.rounds.length} 轮讨论。总体结论是：这个议题不能只看单点观点，而要把问题定义、关键矛盾、责任边界、证据链和后续行动一起沉淀，才能从讨论走向可执行机制。`,
    coreConclusions: [
      {
        title: "先把问题机制化，而不是只形成观点",
        detail: `讨论中反复出现的矛盾包括：${contradictions.slice(0, 4).join("；") || "尚未形成明确矛盾"}。这些矛盾说明，真正需要沉淀的是可复用的判断标准和协作流程，而不是一轮漂亮的答案。`,
        evidence: summaries.slice(0, 2).join(" / "),
      },
      {
        title: "每轮圆桌都应该留下可追溯记录",
        detail: "历史记录需要保留每轮的主持综合、席位发言、简言之、下一问题和框架图，否则后续复盘时无法判断观点是如何演化出来的。",
        evidence: `当前已保留 ${state.rounds.length} 轮完整记录。`,
      },
      {
        title: "结论必须转化为下一步动作",
        detail: "结论报告应明确共识、分歧、行动项、风险和开放问题，避免讨论结束后只剩一个抽象摘要。",
        evidence: lastRound?.next || "暂无后续问题。",
      },
    ],
    consensus: ["需要把讨论过程保存为历史记录", "结论应基于全量讨论，而不是只看最后一轮", "下一步需要把核心判断转成行动项"],
    disagreements: ["哪些事项可以立即执行，哪些还需要继续讨论", "哪些席位的判断应拥有更高权重"],
    decisions: ["保留全量历史记录", "在结束时生成详细结论报告", "导出纪要时包含历史与结论"],
    openQuestions: [lastRound?.next || "下一步应该优先验证哪一个判断？"],
    risks: [{ risk: "总结过短会丢失推理过程", mitigation: "结论报告必须引用历史轮次中的矛盾、共识和行动项" }],
    nextSteps: ["基于结论报告挑选 1-3 个可执行动作", "补充负责人和验证标准", "在下一次圆桌中复盘行动结果"],
    actionItems: [
      { owner: "主持人", action: "把核心结论整理成可执行清单", reason: "避免讨论停留在观点层", priority: "P0" },
      { owner: "相关席位", action: "对仍存在分歧的问题补充证据", reason: "让下一轮讨论有依据", priority: "P1" },
    ],
  });
}

async function requestModelRound(mode, options = {}) {
  if (location.protocol === "file:") {
    apiStatus = { mode: "file", model: null, message: "请用本地服务打开以启用模型生成" };
    return null;
  }
  try {
    const response = await fetch("/api/roundtable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode,
        userPrompt: options.userPrompt || "",
        state: mode === "initiate" ? { ...state, rounds: [] } : state,
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      apiStatus = { mode: "offline", model: null, message: data.message || "模型服务不可用" };
      showToast(data.code === "missing_api_key" ? "未配置 OPENAI_API_KEY，已离线推进" : "模型请求失败，已离线推进");
      return null;
    }
    apiStatus = { mode: "llm", model: data.model || apiStatus.model, message: "LLM generation enabled" };
    return data.round;
  } catch {
    apiStatus = { mode: "offline", model: null, message: "模型服务不可用" };
    showToast("本地模型服务不可用，已离线推进");
    return null;
  }
}

async function requestModelPanel(topic, attachments = []) {
  if (location.protocol === "file:") return null;
  try {
    const response = await fetch("/api/panel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, attachments }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) return null;
    apiStatus = { mode: "llm", model: data.model || apiStatus.model, message: "LLM panel selection enabled" };
    return data.panel;
  } catch {
    return null;
  }
}

async function requestModelTopicSuggestions() {
  if (location.protocol === "file:") return null;
  try {
    const response = await fetch("/api/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) return null;
    apiStatus = { mode: "llm", model: data.model || apiStatus.model, message: "LLM topic suggestion enabled" };
    return data.suggestions;
  } catch {
    return null;
  }
}

async function requestModelFinalReport() {
  if (location.protocol === "file:") return null;
  try {
    const response = await fetch("/api/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) return null;
    apiStatus = { mode: "llm", model: data.model || apiStatus.model, message: "LLM summary enabled" };
    return data.summary;
  } catch {
    return null;
  }
}

async function refreshApiStatus() {
  if (location.protocol === "file:") {
    renderSessions();
    return;
  }
  try {
    const response = await fetch("/api/status");
    const data = await response.json();
    apiStatus = {
      mode: data.mode || "offline",
      model: data.model || null,
      message: data.message || "",
    };
  } catch {
    apiStatus = { mode: "offline", model: null, message: "模型服务不可用" };
  }
  renderSessions();
}

function saveCurrentSession() {
  archiveCurrentSession({ silent: true });
  renderSessions();
  showToast("当前会话已保存");
}

function archiveCurrentSession({ silent = false } = {}) {
  if (!state?.id || !state.rounds?.length) return;
  const saved = loadSavedSessions().filter((item) => item.id !== state.id);
  saved.unshift(clone(state));
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved.slice(0, 24)));
  if (!silent) renderSessions();
}

function clearSavedSessions() {
  localStorage.removeItem(SAVED_KEY);
  renderSessions();
  showToast("历史会话已清空");
}

function loadSavedSessions() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  } catch {
    return [];
  }
}

function loadCurrentState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!parsed?.topic || !Array.isArray(parsed.rounds) || parsed.rounds.length === 0) return null;
    return normalizeState(parsed);
  } catch {
    return null;
  }
}

function persistCurrent() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadSession(id) {
  const saved = loadSavedSessions();
  const selected = saved.find((item) => item.id === id);
  if (!selected) return;
  state = clone(selected);
  renderAll();
  showToast("已载入历史会话");
}

function touch() {
  state.updatedAt = new Date().toISOString();
}

function buildMarkdown() {
  const lines = [
    `# ${state.topic}`,
    "",
    `- 会话状态：${state.completed ? "已结论" : "研讨中"}`,
    `- 轮次：${state.rounds.length}`,
    `- 更新时间：${formatTime(state.updatedAt)}`,
    "",
    "## 本题嘉宾思想席",
    "",
    ...state.participants.map((person) => `- ${person.name}：${person.role}${person.reason ? `（${person.reason}）` : ""}`),
    "",
    "## 议题附件",
    "",
    ...((state.attachments || []).length
      ? state.attachments.map((attachment) => `- ${attachment.name}：${formatBytes(attachment.size)}，已作为研讨上下文`)
      : ["- 无"]),
    "",
    "## 圆桌记录",
    "",
  ];

  state.rounds.forEach((round) => {
    lines.push(`### ${round.label} · ${round.contradiction}`, "");
    round.messages.forEach((message) => {
      lines.push(`**${message.speaker}｜${message.action}**`);
      lines.push("");
      lines.push(message.body);
      lines.push("");
      lines.push(`简言之：${message.tldr}`);
      lines.push("");
    });
    lines.push("```text", round.chart, "```", "");
    lines.push(`下一问题：${round.next}`, "");
  });

  lines.push("## 知识网络", "");
  deriveKnowledgeItems().forEach(([title, body]) => {
    lines.push(`- **${title}**：${body}`);
  });
  lines.push("");

  if (state.finalReport) {
    const report = normalizeFinalReport(state.finalReport, state.topic);
    lines.push("## 详细结论报告", "");
    lines.push(`### ${report.title}`, "");
    lines.push(report.executiveSummary, "");
    lines.push("### 核心结论", "");
    report.coreConclusions.forEach((item) => {
      lines.push(`- **${item.title}**：${item.detail}${item.evidence ? ` 依据：${item.evidence}` : ""}`);
    });
    lines.push("", "### 已形成共识", "", ...report.consensus.map((item) => `- ${item}`), "");
    lines.push("### 仍存在分歧", "", ...report.disagreements.map((item) => `- ${item}`), "");
    lines.push("### 关键决策", "", ...report.decisions.map((item) => `- ${item}`), "");
    lines.push("### 行动项", "");
    report.actionItems.forEach((item) => {
      lines.push(`- **${item.owner}**：${item.action}（${item.priority}，${item.reason}）`);
    });
    lines.push("", "### 风险与缓解", "");
    report.risks.forEach((item) => {
      lines.push(`- **${item.risk}**：${item.mitigation}`);
    });
    lines.push("", "### 开放问题", "", ...report.openQuestions.map((item) => `- ${item}`), "");
    lines.push("### 后续步骤", "", ...report.nextSteps.map((item) => `- ${item}`), "");
  }
  return lines.join("\n");
}

async function copyMarkdown() {
  const text = buildMarkdown();
  try {
    await navigator.clipboard.writeText(text);
    showToast("纪要已复制");
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    showToast("纪要已复制");
  }
}

function exportMarkdown() {
  const blob = new Blob([buildMarkdown()], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${sanitizeFileName(state.topic)}.md`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast("Markdown 已导出");
}

function sanitizeFileName(value) {
  return value.replace(/[\\/:*?"<>|]/g, "").slice(0, 48) || "roundtable";
}

function formatTime(value) {
  if (!value) return "--";
  const date = new Date(value);
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let toastTimer;
function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1800);
}

els.savedSessionList.addEventListener("click", (event) => {
  const item = event.target.closest(".session-item[data-id]");
  if (!item) return;
  loadSession(item.dataset.id);
});

els.uploadAttachmentBtn.addEventListener("click", () => els.attachmentInput.click());
els.attachmentInput.addEventListener("change", async () => {
  await handleAttachmentFiles(els.attachmentInput.files);
  els.attachmentInput.value = "";
});

els.attachmentList.addEventListener("click", (event) => {
  const button = event.target.closest(".attachment-remove");
  if (!button) return;
  removeAttachment(button.dataset.id);
});

els.topicSuggestionList.addEventListener("click", (event) => {
  const button = event.target.closest(".topic-suggestion");
  if (!button) return;
  applySuggestedTopic(button.dataset.topic);
});

els.startBtn.addEventListener("click", startSession);
els.resetBtn.addEventListener("click", () => {
  els.topicInput.value = initialTopic;
  showToast("已重置为默认议题");
});
els.newSessionBtn.addEventListener("click", openNewSessionModal);
els.closeNewSessionBtn.addEventListener("click", closeNewSessionModal);
els.newSessionModal.addEventListener("click", (event) => {
  if (event.target === els.newSessionModal) closeNewSessionModal();
});

els.continueBtn.addEventListener("click", continueRound);
els.deepenBtn.addEventListener("click", deepen);
els.concludeBtn.addEventListener("click", conclude);
els.freeformForm.addEventListener("submit", submitFreeform);
els.inviteBtn.addEventListener("click", openModal);
els.closeModalBtn.addEventListener("click", closeModal);
els.addPersonBtn.addEventListener("click", addPerson);
els.copyMarkdownBtn.addEventListener("click", copyMarkdown);
els.exportMarkdownBtn.addEventListener("click", exportMarkdown);

els.personModal.addEventListener("click", (event) => {
  if (event.target === els.personModal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeNewSessionModal();
  }
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    if (document.activeElement === els.freeformInput) {
      event.preventDefault();
      els.freeformForm.requestSubmit();
    } else {
      continueRound();
    }
  }
});

renderAll();
refreshApiStatus();
