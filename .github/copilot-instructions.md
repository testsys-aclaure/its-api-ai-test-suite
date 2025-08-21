# Repo-level instructions for Copilot / Agents

Context:
- This repo contains Phase-1 artifacts for API contract tests. Use them; do NOT re-enumerate operations.
- Default environment file: ./environments/238-stg.json

Preferred commands (use npm scripts when present):
- Install deps: `npm ci`
- Generate TS client: `npm run gen:client`
- Generate schemas: `npm run gen:schemas`
- Generate tests: `npm run gen:tests` or `node ./scripts/generate_readonly_tests.js --plan=tests/contract/coverage/plan.readonly.json`
- Run contract tests: `npm run test:contract`
- Verify coverage: `node ./scripts/verify_coverage.ts`

Safety rules:
- Phase-1 gate required: tests/contract/coverage/gate.readonly.json.status must be "pass".
- Do NOT run mutation (POST/PUT/PATCH/DELETE) tests unless ALLOW_MUTATIONS=true AND explicit human approval is recorded.
- Use generated client (src/generated) and thin wrapper (src/api/ApiWrapper.ts). Avoid hand-rolled HTTP clients unless all codegen options fail. If used, mark with TODOs and explain why.
- Log tooling choices and command output to ./runs/phase2/<timestamp> and create a branch ai/phase2/<timestamp> for artifacts.

Where to find evidence:
- plan.readonly.json (list of read-only ops)
- operations.all.json (full Phase-1 inventory)

If making changes:
- Commit generated artifacts to a branch and open a PR. If Git is unavailable, output a patch bundle and stop.
