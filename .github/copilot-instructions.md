# Copilot Instructions (MCP Usage) — Hardened

## Principle 0 — Prompt Authority
- **If a `.prompt.md` file is in use, its rules override everything here.**
- When a prompt specifies a **SelectedTool**, you must:
  - Invoke **only** that exact tool name.
  - **Do not** substitute, alias, or choose a “closest” tool.
  - **Do not** add headers or tokens when using any MCP tool (delegated auth).
  - If the selected tool cannot be invoked, **STOP** and report (do not fallback to a different tool).

## MCP Server Scope
- Azure DevOps → `ado` MCP server.
- ITS API (OpenAPI) → **use the single server named `its-openapi`**.  
  (If other OpenAPI servers are attached, **do not** use them unless the prompt explicitly names them.)

> Admin note: ensure only one OpenAPI MCP server is attached for ITS. If multiple are present, disable the extras.

- When a work item has AI anchors:
  - Use **exactly** the tool name in `mcp_tool` / `MCP_tool` / `ai_metadata.mcp_tool`.
  - If that name fails to invoke, **STOP** with a diagnostic (no substitution with look-alike names like `ResultQuery`, `Query`, etc.).

## Authentication & Headers
- For **MCP tools**: **never** construct `Authorization` or any headers. Auth is delegated.
- Only when explicitly using `mcp_http_request` (HTTP fallback) and only if a prompt allows it:
  - Then resolve base URL and token from env; if missing, **STOP** with `MissingToken`.
- Otherwise, **no tokens, no headers**.

## Defaults (Scoped + Non-Authoritative)
- Apply only when **not** running under a `.prompt.md` and only when the tool schema supports them:
  - **ADO Sandbox**: Project=`QA`, AreaPath=`QA\API Sandbox`, IterationPath=`QA`.
  - **ITS Program**: `program-id=238`.  
    `program-institution-id=1009048` **only** when `program-id=238` and the operation supports it.
- If a prompt or user specifies values, those override defaults.

## Guardrails
- **Never create phantom fields**—use only schema fields.
- **Never start/stop/configure MCP servers.**
- **Single server policy for ITS OpenAPI**: use `its-openapi` only.
- **Tool selection must be literal**. Avoid partial/contains match on names like `Query`, `Result`, `Search`, etc.


## Parameter Formatting & Troubleshooting Guidance

### Scalar-First Rule (MANDATORY)
- For **all GET endpoints**, if a parameter is documented as an array, **always send it as a scalar first** (e.g., `examinee-id=1`). Only try the array form (e.g., `examinee-id=[1]`) if a 422 or schema error occurs. No exceptions unless the endpoint explicitly requires an array or comma-delimited list.

### Examinee Identifier Default
- For examinee identifier parameters, **always default to `examinee-id` as a scalar** before trying `program-examinee-public-id` or `program-examinee-system-id`. Use others only if `examinee-id` is unavailable or fails.

### Explicit Reasoning Requirement
- During troubleshooting (e.g., resolving 422 errors or discovering valid params), the agent **must spell out its reasoning for each step**. This includes:
  - Why a scalar or array form is chosen
  - How error messages are interpreted
  - The logic behind parameter discovery or retries
- This self-explanation must be included in summary notes and output, ensuring protocol adherence and transparency.

Document which form succeeded and all troubleshooting logic in the summary notes.

## Quick Checklist (pre-flight)
- [ ] Running under a `.prompt.md`? If yes, follow it verbatim.
- [ ] Using `ado` for Azure Boards? Using `its-openapi` for ITS API?
- [ ] Exact anchored tool name selected (no aliasing)?
- [ ] No headers/tokens when using MCP tools?
- [ ] No server start/stop attempted?
