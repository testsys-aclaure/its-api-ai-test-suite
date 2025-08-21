# ITS API Test Suite - Clean Slate Environment

## 🎯 Purpose
This is a minimal, clean environment for AI assistants to work on improving API contract testing for the ITS API. The repository has been systematically cleaned to remove confusion while preserving essential functionality.

## 📊 Current Status
- **4 of 41 operations** currently working (10% success rate)
- **All 41 read-only operations** implemented in wrapper
- **Complete OpenAPI specification** available
- **Environment configured** for staging API

## 🏗️ Architecture

### Essential Files Only
```
/
├── src/
│   ├── api/
│   │   ├── ApiWrapper.ts      # 532-line comprehensive wrapper (41 operations)
│   │   └── env.ts             # Environment configuration
│   └── generated/             # OpenAPI-generated TypeScript client
├── tests/
│   ├── contract/              # Contract test infrastructure  
│   └── wrapper-comprehensive.spec.ts  # Wrapper validation tests
├── environments/
│   └── 238-stg.json          # API staging environment config
├── docs/                     # Session documentation
├── scripts/                  # Essential generation scripts only
├── OpenAPI.json              # API specification
└── package.json              # Dependencies and scripts
```

## 🚀 Quick Start

### Install & Setup
```bash
npm ci                        # Install dependencies
```

### Generate Client (if needed)
```bash
npm run gen:client           # Generate TypeScript client from OpenAPI
npm run gen:schemas          # Generate JSON schemas
```

### Test Current State
```bash
npm run test:contract        # Run contract tests
npm test                     # Run all tests
```

## 🎯 Improvement Goals
1. **Increase success rate** from current 10% (4/41 operations)
2. **Fix parameter handling** for complex endpoints
3. **Improve error handling** and diagnostics
4. **Expand test coverage** beyond current 8 tested operations

## 🛡️ Guardrails
- **Phase-1 Gate**: `tests/contract/coverage/gate.readonly.json.status` must be "pass"
- **Read-Only Only**: No mutations (POST/PUT/PATCH/DELETE) unless ALLOW_MUTATIONS=true
- **Use Generated Client**: Prefer `src/generated/` and thin wrapper over hand-rolled HTTP
- **Document Changes**: Update docs/ with significant modifications

## 🧠 For AI Assistants
This environment is intentionally minimal to avoid context confusion. Key principles:
- **Start with existing wrapper** (`src/api/ApiWrapper.ts`) - don't rebuild from scratch
- **Use npm scripts** for generation and testing
- **Follow existing patterns** in the codebase
- **Test incrementally** - improve one operation at a time
- **Document insights** for future AI assistants

## 🔍 Debugging
- Environment config: `environments/238-stg.json`
- Test one operation: Modify `tests/wrapper-comprehensive.spec.ts`
- Check API responses: Wrapper includes response logging
- Generate fresh client: `npm run gen:client` if OpenAPI changes

## 📈 Success Metrics
Track improvements in:
- Number of operations returning 200 responses
- Test coverage (currently 8/41 operations tested)
- Error rate reduction
- Parameter handling accuracy

---
*Clean slate ready for innovation. All development artifacts removed. Essential functionality preserved.*
