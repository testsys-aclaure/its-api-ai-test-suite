# AI-Enabled API Validation Platform — Stage 1 (Inventory → Generate)

**Objective:** Produce a **complete, deterministic** contract‑test blueprint and a **read‑only** test suite for the **ITS Public Web API** (OpenAPI 3.0.3) using **TypeScript + Playwright**. Do **not** hand‑roll an HTTP client; **generate** one from the OpenAPI and layer a **thin OAuth wrapper** on top. Implement tests for **all read‑only endpoints (GET/HEAD/OPTIONS)** with a hard coverage gate.

---

## Inputs (attach as context to the run)
- `OpenAPI.json` — ITS Public Web API spec (≈90 operations)
- `environments/238-stg.json` — Postman environment with OAuth2 client‑credentials
- `tests/contract/channel/institutions/query.spec.ts` — **PROVEN WORKING PATTERN** (replicate this structure for other GETs)

### Project facts to honor (from current repository context)
- OAuth2 token URL (staging): `https://identity-staging.testsys.io/connect/token`
- Global context parameters exist in env and are used across endpoints: **`program-id` (238)**, `vendor-id`, `sponsor-id`
- Mixed path casing is present (e.g., `/Form/Query` vs `/event/query`); duplicate/numbered `operationId`s also exist (e.g., `ChannelInstitutionImport` vs `ChannelInstitutionImport1`)
- Previous attempt: **~90 ops in spec, 9 parsed, 2 tested** → the new process must prevent this failure mode

---

## Evidence precedence (for “required”, minimal bodies, auth)
When sources disagree, choose in this order and record which source decided the field:
1) Postman **collection annotations** (comments/prefills)  
2) **Run logs** (successful requests/responses)  
3) Postman **environment** (`program-id`, `vendor-id`, `sponsor-id`, credentials)  
4) **OpenAPI spec** (schemas, `required`, examples)  

Never guess silently; mark assumptions explicitly.

---

## PHASE 1 — Inventory & preflight only (no codegen, no tests)

**Goal:** deterministically enumerate **every** operation and preflight hazards before generating anything.

### Tasks
1) **Parse & dereference** the OpenAPI locally; do **not** fetch remote `$ref` URLs.  
2) Write `tests/contract/coverage/operations.all.json` — one object per `{path, method}`:

```json
{
  "operationId": "from spec or <cleanTagOrPath>_<method>",
  "path": "/…",
  "method": "get|head|options|post|put|patch|delete|trace",
  "tags": ["…"],
  "summary": "short",
  "securityEffective": [{"scheme":"oauth2_client_credentials"}],
  "successCodes": [200,201,204],
  "produces": ["application/json"],
  "consumes": ["application/json","multipart/form-data"],
  "requiredParams": {"path":["…"],"query":["…"],"header":[],"cookie":[]},
  "requestBody": {
    "required": true|false|"assumed_from:<collection|logs|spec>",
    "contentTypes": ["application/json"],
    "schemaRef": "#/components/schemas/…|UNKNOWN",
    "minimalShape": {"…":"…"}  // or "UNKNOWN"
  },
  "pagination": {"pattern":"cursor|page|offset|none","params":["page","limit","cursor","offset"]},
  "idempotent": true|false,
  "status": "parsed|unparsed",
  "evidence": ["collection","logs","env","spec"],
  "jsonPointer": "/paths/~1…/get",
  "notes": []
}
```

3) Emit **anomalies** → `tests/contract/anomalies.json` + `anomalies.md` with JSON Pointers and concrete fixes for:
   - Missing/incorrect `required`
   - **Unresolved `$ref`**
   - Path template mismatches
   - **Mixed path casing** (e.g., `/Form/Query` vs `/event/query`)
   - **Duplicate/numbered `operationId`** conflicts
   - Inconsistent `security`
   - Responses missing `2xx`
   - Media‑type drift; unreferenced components

4) Emit **auth plan** → `tests/contract/coverage/auth_plan.json`
   - Discover OAuth2 client‑credentials token URL from `components.securitySchemes`; fallback to `https://identity-staging.testsys.io/connect/token` if missing.
   - Record any per‑operation overrides of global security.

5) Emit **env map** → `tests/contract/coverage/env_map.json`
   - Normalize Postman keys: `client-id`→`client_id`, `client-secret`→`client_secret`; keep `baseURL` and **`program-id`/`vendor-id`/`sponsor-id`** as named context inputs.
   - Mark each key as `required` or `optional` and list the operations that use it.

6) Emit **read‑only plan** → `tests/contract/coverage/plan.readonly.json` (subset where `method ∈ {get, head, options}`):

```json
{
  "operationId":"…",
  "testFile":"tests/contract/<path>/<method>.spec.ts",
  "successCodes":[…],
  "schemaRefs":{"request":null,"response":"<pointer or file path>"},
  "requiredParams":{"path":[…],"query":[…],"header":[…],"cookie":[…]},
  "envBindings":{"program-id":"{{program-id}}","vendor-id":"{{vendor-id}}","sponsor-id":"{{sponsor-id}}"},
  "dataNeeds":"none|seed|fixture",
  "evidence":["collection|logs|env|spec"],
  "notes":[]
}
```

7) Emit **gate** → `tests/contract/coverage/gate.readonly.json`:

```json
{"totalReadonly": <N_from_spec>, "plannedReadonlyTests": <M_from_plan>, "status": "pass|fail", "missing": ["operationIdA","…"]}
```

**Stop if status = fail.** Print a short summary; do **not** proceed to Phase 2.

> Reality check from prior run: spec ≈90 ops; only 9 parsed and 2 tested. The above gate prevents a repeat.

---

## PHASE 2 — Codegen client → thin OAuth wrapper → read‑only tests (batch)

**Proceed only if Phase‑1 gate passes. Do not hand‑roll clients.**

### Tooling
- Client: `openapi-typescript-codegen --input ./OpenAPI.json --output ./src/generated --client fetch`  
  *(Only if that fails: `openapi-generator-cli generate -g typescript-fetch`.)*
- Runner: **Playwright Test** (`@playwright/test`)
- Validation: **AJV** (strict off)

### Deliverables
```
./src/generated/**                       // code-generated client (DO NOT edit)
./src/api/env.ts                        // load env (array or flat), merge .env.local, hyphen→underscore normalization
./src/api/ApiWrapper.ts                 // thin wrapper: OAuth client-credentials + global context injection
./src/api/schemas/**                    // deref’d response schemas for AJV
./tests/contract/<path>/<method>.spec.ts // one per read-only op (from plan.readonly.json)
./tests/contract/coverage/coverage.json  // spec→wrapper→tests map with counts
./tests/contract/README_TESTS.md
./scripts/run_contract.sh
./ado/contract-tests.yml
./.env.example
```

### Wrapper contract (thin, AI‑friendly)
- OAuth2 client‑credentials:
  - Discover token URL from spec; fallback to `https://identity-staging.testsys.io/connect/token`.
  - Fetch token, cache by `expires_in`, inject `Authorization: Bearer …`.
- Auto‑inject global context params (from env) unless overridden: **`program-id` (238)**, `vendor-id`, `sponsor-id`.
- Expose both:
  - **Named helpers per operation** (generated names), and
  - `call(operationId, args)` dispatcher for agents, plus `raw()` escape hatch.
- Redacted debug logs under `DEBUG=api:*`.

### Read‑only tests (batch‑generated from the plan)
- **Arrange:** pull required params from env; synthesize minimal inputs from examples/defaults.
- **Act:** call the wrapper’s per‑op helper.
- **Assert:** status ∈ declared `2xx`; content‑type matches; if JSON, validate with AJV schema (if available).
- If schema missing: assert status + content‑type; add `// TODO: add schema` with pointer.
- **Path casing:** use the **literal path** from spec when calling; normalize only for file names and method names.

### Coverage map + verifier
Write `tests/contract/coverage/coverage.json`:
```json
{
  "openapiVersion":"3.0.3",
  "baseUrlVar":"baseURL",
  "auth":{"type":"oauth2_client_credentials","tokenUrlSource":"spec|env"},
  "summary":{"totalReadonly":N,"generated":N,"skipped":0,"todo":0},
  "operations":[
    {
      "operationId":"…",
      "path":"/…",
      "method":"get",
      "testFile":"tests/contract/…/get.spec.ts",
      "wrapperMethod":"…",
      "successCodes":[200],
      "requiresAuth":true,
      "requiredParams":{"path":[…],"query":[…],"header":[],"cookie":[]},
      "schemaRefs":{"response":"src/api/schemas/res/…json"},
      "status":"generated"
    }
  ]
}
```
Add `scripts/verify_coverage.ts` that re‑parses the spec for read‑only ops and **exits non‑zero** if counts differ.

---

## Acceptance criteria
- **Phase‑1 gate passes:** `totalReadonly === plannedReadonlyTests`; anomalies documented with JSON Pointers.
- **No manual HTTP client:** wrapper sits over the **generated** client only.
- **Complete read‑only coverage:** all GET/HEAD/OPTIONS endpoints have tests; failures are TODO‑tagged, not skipped.
- Mixed casing and duplicate `operationId`s are **handled systematically** (never a reason to skip).
- Use the **proven working test** at `tests/contract/channel/institutions/query.spec.ts` as the structural template.

**End‑of‑run output:**
- Phase‑1: counts by method; anomaly totals.
- Phase‑2: read‑only N/N generated.
- Top 5 blockers for mutation phase with JSON Pointers (expect unresolved `$ref`, underspecified POST bodies, path casing cleanups, duplicate `operationId`s, etc.).

---

## What not to do (learned from last run)
- Do **not** cherry‑pick endpoints. Inventory **all** ops first; **batch** generate tests.
- Do **not** get blocked by path casing or duplicate IDs — normalize for names, use literal for requests, and document anomalies.
- Do **not** hand‑roll a client; use codegen and keep the wrapper thin.


---

## Multi‑Environment Support (explicit)

This workflow must support **multiple Postman environments** (e.g., `238-stg`, `uat`, `dev`, `prod`) without code changes.

### Environment selection & resolution
- Accept **one of**:
  - `ENV_FILE` path (e.g., `environments/238-stg.json`) **or**
  - `ENV_NAME` (e.g., `238-stg`) resolved to a file under `./environments/`.
- Resolution order (highest → lowest):
  1. `ENV_FILE` (explicit)  
  2. `ENV_NAME` → `./environments/${ENV_NAME}.json`  
  3. Default fallback (current: `environments/238-stg.json`)
- Merge `.env.local` on top for developer overrides (never commit secrets).

### What varies by environment
- `baseURL` (host/port)  
- OAuth **token_url** (if not discoverable from spec)  
- Context params: **`program-id`**, `vendor-id`, `sponsor-id`, etc.  
- Optional feature flags (if present in env)

### Wrapper behavior per environment
- Cache OAuth tokens **per (baseURL, client_id)** tuple.  
- Auto‑inject context params from the **active environment** unless explicitly overridden in a call.  
- Redacted logging includes the **active ENV_NAME/ENV_FILE** for traceability.

### Safety rails
- If `baseURL` matches **production** patterns, automatically set `ALLOW_MUTATIONS=false` (even in future mutation phases).  
- For read‑only phase, tests are always safe across all environments.  
- Fail fast if required env keys are missing; print which keys are absent and for which operations they’re needed.

### CI: environment matrix (Azure Pipelines)
Provide a sample matrix job that runs the **read‑only suite** across multiple environments:

```yaml
# ado/contract-tests.yml (excerpt)
strategy:
  matrix:
    stg:
      ENV_NAME: "238-stg"
    uat:
      ENV_NAME: "uat"
steps:
  - task: NodeTool@0
    inputs: { versionSpec: "lts/*" }
  - script: npm ci
  - script: npm run gen:client && npm run gen:schemas && npm run build
  - script: ENV_NAME=$(ENV_NAME) npm run test:contract
  - script: npm run verify:coverage
```

### Acceptance additions
- The suite can be invoked with `ENV_FILE` or `ENV_NAME` and runs without edits.  
- A **missing‑key report** is generated if environment variables required by any operation are absent.  
- Coverage remains **environment‑agnostic** (endpoint count is from the spec); if an environment lacks routes or behaviors, emit an **environment deltas** note in the test summary (non‑blocking for read‑only).

