# Repository Cleanup Status

## Files to Clean Up (Development Artifacts)

### Debug/Analysis Scripts (to be removed)
- analyze_failures.js
- debug_client.js  
- debug_env.js
- debug_env2.js
- debug_params.js
- debug_single_endpoint.js
- fix_real_tests.js
- fix_tests.js
- fix_tests_v2.js
- get_error_message.js
- list_operations.js
- map_endpoints.js
- test_exact_previous.js
- test_institution_ids.js

### Test Files (to be cleaned up)
- test_ai_demo.spec.ts
- test_ai_wrapper.spec.ts
- test_all_endpoints.spec.ts
- test_comprehensive_analysis.spec.ts
- test_proper_wrapper.spec.ts
- test_single.spec.ts

### Build Artifacts (to be cleaned)
- dist/ (entire directory - can be regenerated)
- node_modules/ (standard - ignored)
- test-results/ (can be regenerated)
- openapi-ts-error-1755803945720.log

### Unused/Duplicate Files
- OpenAPI-converted.json (converted from OpenAPI.json)
- src/generated-v2/ (alternative client generation - keeping only one)

## Files to Preserve

### Core Implementation
- src/api/ApiWrapper.ts (main comprehensive wrapper)
- src/api/ApiWrapper.original.ts (backup)
- tests/wrapper-comprehensive.spec.ts (main test)

### Documentation
- docs/SESSION_POST_MORTEM.md (this session analysis)
- docs/wrapper-implementation-plan.md (implementation strategy)
- docs/ai-interaction-strategy.md (AI interaction design)

### Configuration & Data
- environments/238-stg.json (working environment)
- tests/contract/coverage/plan.readonly.json (operation inventory)
- tests/contract/coverage/operations.all.json (full API spec)
- tests/contract/coverage/gate.readonly.json.status (phase gate)

### Essential Generated Code
- src/generated/ (TypeScript client - keep for backup)
- tests/contract/ (contract tests - keep for reference)

### Project Configuration
- package.json
- package-lock.json  
- tsconfig.json
- playwright.config.ts
- .github/ (.github workflows)
- .vscode/ (VS Code settings)
