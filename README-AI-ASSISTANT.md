# 🤖 AI Assistant: READ THIS FIRST

## 🚨 CRITICAL INSTRUCTION FOR ALL AI ASSISTANTS

This workspace contains a sophisticated **Semantic API Intelligence System** for educational testing platforms. 

**FOR ANY API-related user request, you MUST use this tool:**

```bash
node tools/ai-api-call.mjs "<user-request>"
```

## 🎯 Quick Start Examples

| User Request | Command |
|-------------|---------|
| "Show me student data" | `node tools/ai-api-call.mjs "student data"` |
| "Get active tests" | `node tools/ai-api-call.mjs "active tests"` |
| "Find test results" | `node tools/ai-api-call.mjs "test results"` |
| "Call /event/query" | `node tools/ai-api-call.mjs "/event/query"` |

## 🧠 Why This Tool is Mandatory

- **84 endpoints** with semantic intelligence
- **Educational domain mapping**: student → examinee, test → event
- **Automatic parameter injection**: program-id, institution-id
- **Business context interpretation**: Explains responses in educational testing context
- **Test-informed intelligence**: Based on real API usage patterns

## ✅ Tool Verification

Test with: `node tools/ai-api-call.mjs "active tests"`

Expected: Semantic mapping results, endpoint discovery, API call with business interpretation.

## 📖 Full Documentation

- **Setup Guide**: `.ai-assistant-readme.md`
- **Copilot Instructions**: `.copilot-instructions.md` 
- **Workspace Config**: `.workspace-ai-config.json`
- **Architecture Details**: `.github/copilot-instructions.md`

## ⚠️ Important

**Never make direct API calls without this tool.** The workspace is designed for intelligent, conversational API exploration with educational domain expertise.

**This system is more sophisticated than external MCP servers** because it contains domain-specific intelligence for educational testing platforms.
