# Repository Cleanup Plan: Keep vs Strip

## 🎯 **PRESERVE (Essential Working Code)**

### **Core Infrastructure (KEEP)**
```bash
# Authentication & HTTP (WORKING)
src/auth/oauth-client.ts                    # ✅ OAuth2 + HTTP working perfectly
src/config/environment.ts                   # ✅ Environment configuration
environments/238-stg.json                   # ✅ Complete staging config
.env                                        # ✅ Working credentials

# API Intelligence (ESSENTIAL)
endpoint-intelligence.json                  # ✅ 84 endpoints, business context
parameter-requirements-intelligence.json    # ✅ 107 validation rules
OpenAPI.json                               # ✅ Technical specifications

# Foundation Config
package.json                               # ✅ Dependencies (undici, playwright)
tsconfig.json                              # ✅ TypeScript configuration
.env.example                               # ✅ Setup template
```

### **Working Pattern Examples (KEEP)**
```bash
src/endpoints/get/event-query.ts            # ✅ Proven AI-native endpoint pattern
tests/phase1/event-query.test.ts           # ✅ Working test validation
```

## 🚫 **STRIP (Complexity & Incomplete Work)**

### **Incomplete/Complex Infrastructure (REMOVE)**
```bash
# Duplicate authentication systems
src/api/core/OAuth2Manager.ts              # ❌ Duplicate - src/auth/oauth-client.ts works
src/api/core/HttpClient.ts                 # ❌ Complex - authenticatedRequest() is simpler

# Incomplete endpoint implementations
src/endpoints/get/event-class-query.ts     # ❌ Only 3/37 implemented - start fresh
src/endpoints/get/event-authorizations-query.ts
src/endpoints/base-endpoint.ts             # ❌ Over-engineered base class

# Complex test infrastructure 
tests/phase1/                              # ❌ Keep 1 example, remove rest
tests/contract/                            # ❌ Not needed for AI tools
playwright.config.ts                      # ❌ Over-complex for simple HTTP
```

### **Generated/Analysis Files (REMOVE)**
```bash
# Analysis artifacts
api-progress.json
test-results.json
test-summary.*
endpoint-intelligence.json                # ❌ Wait, keep this!
docs/                                     # ❌ Documentation overhead
BUILD-VERIFICATION.md                     # ❌ Status artifacts
PROGRESS-TRACKER.md
```

### **Demo/Development Files (REMOVE)**
```bash
debug-api.mjs
elegant-demo.mjs
demo-ai-tools.mjs
interactive-api.js
test-dashboard.html                       # ❌ Complex dashboard
src/reporters/                           # ❌ Complex reporting
```

## 🎯 **CLEAN FOUNDATION (What Remains)**

### **Essential Core (8 files)**
```
/
├── src/
│   ├── auth/oauth-client.ts              # OAuth2 + HTTP (WORKING)
│   ├── config/environment.ts             # Environment management
│   └── tools/                            # NEW: Direct API tools
├── environments/238-stg.json             # Complete staging config
├── endpoint-intelligence.json            # Business intelligence 
├── parameter-requirements-intelligence.json # Validation rules
├── OpenAPI.json                          # API specifications
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript config
├── .env                                  # Working credentials
└── README.md                             # Simple setup guide
```

### **New Implementation Strategy**
```typescript
// Simple, direct approach using proven patterns
import { authenticatedRequest } from './src/auth/oauth-client.js';
import { EnvironmentConfig } from './src/config/environment.js';

export class DirectAPITools {
  // Use proven authenticatedRequest() - no complex HttpClient
  static async get(endpoint: string, params: any = {}): Promise<any> {
    const env = EnvironmentConfig;
    const url = `${env.baseUrl}${endpoint}?${new URLSearchParams(params)}`;
    const response = await authenticatedRequest('GET', url);
    
    return {
      success: response.ok,
      data: await response.json(),
      businessContext: `Educational Testing API: ${endpoint}`
    };
  }
  
  // Natural language interface
  static async query(intent: string): Promise<any> {
    const endpoints = {
      'active events': '/event/query',
      'event classes': '/event-class/Query'
    };
    return this.get(endpoints[intent] || '/event/query');
  }
}
```

## 🚀 **Clean Rebuild Approach**

1. **Commit current work** to preserve research
2. **Create clean branch** with only essential 8 files
3. **Build direct tools** using proven `authenticatedRequest()`
4. **Test with real API** immediately
5. **Add conversational interface** once proven

**Result**: 
- **8 files** instead of 100+
- **2 authentication systems** → **1 working system**
- **Complex infrastructure** → **Simple, direct tools**
- **Test-driven** → **API-driven with validation**

Should I help you identify exactly which files to preserve in the clean rebuild?
