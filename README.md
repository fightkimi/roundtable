# Roundtable Seminar

一个本地运行的 AI 圆桌研讨工具，用于围绕议题动态邀请名人思想席，支持附件上下文、自由追问、下一议题推荐、历史记录和结论报告。

## 功能

- 每个议题动态生成嘉宾思想席，不固定常驻角色。
- 支持上传文本、Markdown、HTML、JSON、CSV 等附件作为研讨上下文。
- 支持会中自由追问，用户输入会进入历史记录并触发新一轮圆桌回应。
- 支持 AI 生成下一议题推荐，并一键填入开始议题。
- 支持全量历史记录、结论报告、Markdown 复制和导出。

## 本地运行

1. 复制环境变量文件：

```bash
cp .env.example .env
```

2. 在 `.env` 中配置模型服务：

```bash
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=gpt-5.5
OPENAI_BASE_URL=https://api.openai.com
```

3. 启动服务：

```bash
npm start
```

4. 打开：

[http://localhost:4177](http://localhost:4177)

没有配置 API Key 时，前端仍可用本地规则兜底推进，但模型生成、动态组局、结论报告和议题推荐会降级。

## 安全说明

- `.env` 已被 `.gitignore` 忽略，不要提交真实 API Key。
- 真实名人只作为“公开思想席/观点原型”使用，不表示本人真实参会，也不生成私人或未公开观点。
