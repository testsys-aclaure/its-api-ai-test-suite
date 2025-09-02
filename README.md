# ITS Public Web API – MCP Server

A Model Context Protocol (MCP) stdio server generated from `OpenAPI.json`. It exposes one MCP tool per API operation and proxies to the ITS Public Web API via `API_BASE_URL`.

## What’s here
- Generated MCP server entry: `src/generated/index.ts` → compiled to `dist/generated/index.js`
- Build tooling: TypeScript project at the repo root
- VS Code wiring: `.vscode/mcp.json` registers the server as `openapi-tools`
- Env loading: `.env` (via `dotenv`) for API base URL and auth
- OAuth2 client-credentials fallback: if `API_BEARER_TOKEN` is not provided, the server can fetch a token using `OAUTH_*` vars

## Prerequisites
- Node.js 18+ (ESM and fetch-compatible)
- VS Code (for MCP usage), ideally with MCP support enabled in your chat client (e.g., Copilot with MCP feature)

## Setup
1) Create `.env` at the repo root and fill in values:

   Required for basic proxying:
   - `API_BASE_URL=https://api-staging.testsys.io` (or your target)
   - `API_BEARER_TOKEN=` (leave empty if you’ll use OAuth2 acquisition)

   Optional OAuth2 client-credentials (auto-fetch if `API_BEARER_TOKEN` is empty):
   - `OAUTH_TOKEN_URL=YOUR_TOKEN_ENDPOINT`
   - `OAUTH_CLIENT_ID=YOUR_CLIENT_ID`
   - `OAUTH_CLIENT_SECRET=YOUR_CLIENT_SECRET`
   - `OAUTH_SCOPE="space separated scopes"` (optional)
   - `OAUTH_AUDIENCE=your-audience` (optional)

   Scheme-scoped overrides (only if needed for named security schemes):
   - `OAUTH_TOKEN_URL_<SCHEME>`
   - `OAUTH_CLIENT_ID_<SCHEME>`
   - `OAUTH_CLIENT_SECRET_<SCHEME>`
   - `OAUTH_SCOPES_<SCHEME>`

2) Install deps and build:
   - Install once: `npm install`
   - Build and verify: `npm run build:strict`

   Success criteria: you see “Compiled entry present: .../dist/generated/index.js”.

## VS Code MCP wiring
- `.vscode/mcp.json` registers this server under `openapi-tools` and points to the compiled entry via the script `start:mcp`.
- It loads `${workspaceFolder}/.env` and passes a few top-level env vars explicitly. Additional `OAUTH_*` values are read from `.env` by the server itself.

If your Chat client supports MCP and uses `.vscode/mcp.json` automatically, it will discover `openapi-tools` without extra steps.

## Auth behavior
- If `API_BEARER_TOKEN` is set, it’s used for Bearer auth.
- If not set and `OAUTH_TOKEN_URL` + `OAUTH_CLIENT_ID` + `OAUTH_CLIENT_SECRET` are present, the server requests a token with `grant_type=client_credentials` and sets `API_BEARER_TOKEN` at startup.
- Optional: `OAUTH_SCOPE`/`OAUTH_SCOPES`, `OAUTH_AUDIENCE` are added when present.
- For OpenAPI OAuth2 schemes, the server also supports per-scheme overrides via `OAUTH_*_<SCHEME>`.

## How it works
- One MCP tool per OpenAPI operation is defined in `src/generated/index.ts`.
- When a tool is called, the server validates inputs (zod), builds the HTTP request (axios), applies security, and returns the HTTP response content as the tool output.

## Troubleshooting
- Build fails: make sure Node.js 18+ is used; run `npm install` then `npm run build:strict`.
- 401/403 calling tools: confirm `API_BEARER_TOKEN` is valid, or the `OAUTH_*` values fetch a token. Check stderr output in the Chat “server logs” area.
- Wrong API host: set `API_BASE_URL` to your environment and rebuild (env is read at runtime; rebuild not strictly required, but recommended after changes).
- Tool not found: confirm the tool name from the Chat’s tool list; the OpenAPI generator created names like `EventQuery`, `EventClassCreate`, etc.

---

# Next steps to test the server

Use these steps to confirm the MCP server is discovered and can call the API.

1) Environment ready
- Ensure `.env` has either a valid `API_BEARER_TOKEN` or the `OAUTH_*` values to auto-fetch a token.
- Save the file.

2) Build artifact present
- Run `npm run build:strict`.
- Confirm “Compiled entry present” is printed.

3) Reload VS Code MCP config
- Open the Command Palette and reload the window to refresh MCP server registrations.
- Your chat client should now detect an MCP server named `openapi-tools`.

4) List available tools in Chat
- In your Chat client (with MCP enabled), select or mention the `openapi-tools` server and request the tool list. For example, ask to “list tools from the openapi server.”
- You should see tools like `EventQuery`, `EventAuthorizationQuery`, `EventClassCreate`, etc.

5) Call a simple GET tool
- Choose a tool that requires minimal parameters, e.g., `EventQuery`.
- Provide the required parameters the API expects (for example, `program-id`), then run the tool from Chat.
- Expect a JSON response (or a clear error message with status code). If unauthorized, revisit the `API_BEARER_TOKEN` or `OAUTH_*` values.

6) Check server logs
- The server logs to stderr. Most Chat clients surface these logs in a side panel or an expandable log area. Look for lines like:
  - “MCP Server running on stdio, proxying API at …”
  - “Acquiring bearer token via client_credentials …” (if using OAuth)
  - “Executing tool "<toolName>": <METHOD> <URL>”

7) Try a POST tool
- Pick a tool with a request body (e.g., `EventExamineeImport`) and supply a minimal valid payload.
- Confirm you receive a 2xx response or a structured validation error from the API.

8) Optional: per-scheme OAuth overrides
- If the OpenAPI security scheme has a name (e.g., `Default`), you can define `OAUTH_*_DEFAULT` to scope credentials/token URL for that scheme. Re-run the tool and check logs.

If you want a scripted, non-Chat smoke test later, we can add a tiny Node client that spawns the server and calls `listTools` + one tool over MCP stdio.

**TO USE INSPECTOR: npx @modelcontextprotocol/inspector node src/generated/index.ts**