# AI-NATIVE EDUCATIONAL TESTING PLATFORM IMPLEMENTATION
*Reengineered prompt based on comprehensive analysis and previous failure prevention*

## 🎯 ROLE & MISSION
**Role**: Senior TypeScript engineer implementing AI-native business workflow automation platform with **natural language interface** and **intelligent operation discovery**.

**Mission**: Build a production-ready platform enabling **conversational AI interaction** with 84 educational testing operations across 31 business domains. Users should be able to say "get event authorizations for program X" and the system intelligently maps this to the correct API calls.

**AI-NATIVE GOALS:**
- **Natural Language Operations**: "Show me test results for John Doe" → intelligent parameter mapping and API execution  
- **Semantic Operation Discovery**: AI can find relevant operations based on business intent, not technical endpoint names
- **Contextual Parameter Intelligence**: System understands parameter relationships and provides intelligent defaults
- **Business Workflow Automation**: Chain multiple API calls to complete complex educational testing workflows

## ⚠️ CRITICAL CONTEXT - READ FIRST
**YOU ARE NOT BUILDING "API TESTING"** - You are implementing an **AI-native business workflow automation platform** for educational testing operations.

**DATA SOURCE**: Use the Postman collection `ITS Next Gen API 2.0.postman_collection.json` as the PRIMARY specification. All technical details are extracted from this collection.

**SCOPE**: 84 operations (37 GET, 21 POST, 13 DELETE, 9 PATCH, 4 PUT) with **107 explicit parameter validation requirements**.

## 📚 REQUIRED READING (BEFORE WRITING ANY CODE)
Read these files in order - they contain complete implementation intelligence:
1. **`endpoint-intelligence.json`** - Complete technical specifications for all 84 endpoints
2. **`parameter-requirements-intelligence.json`** - 107 explicit parameter validation rules
3. **`ITS Next Gen API 2.0.postman_collection.json`** - Primary API specification source
4. **`environments/238-stg.json`** - Environment configuration template

## 🔒 PHASE 1: PARAMETER VALIDATION FOUNDATION (CRITICAL FIRST STEP)

### Universal Required Parameters (IMPLEMENT FIRST)
```typescript
// From analysis: program-id required in 79% of endpoints (64/81)
class UniversalValidators {
  static validateProgramId(params: any): void {
    if (!params['program-id']) {
      throw new ValidationError('program-id is required - found in 64 endpoints (79% coverage)', {
        parameter: 'program-id',
        required: true,
        documentation: 'The unique program identifier provided as part of configuration'
      });
    }
  }
  
  // program-institution-id required in specific endpoints
  static validateProgramInstitutionId(params: any, required = false): void {
    if (required && !params['program-institution-id']) {
      throw new ValidationError('program-institution-id is required for this endpoint', {
        parameter: 'program-institution-id', 
        required: true
      });
    }
  }
}
```

### Conditional Parameter Logic (FROM ANALYSIS - 7 PATTERNS)
```typescript
// From parameter-requirements-intelligence.json
class ConditionalValidators {
  
  // Pattern 1: session-code OR (start-utc AND end-utc)
  static validateSessionCodeOrDateTime(params: any): void {
    const sessionCode = params['session-code'];
    const startUtc = params['start-utc'];
    const endUtc = params['end-utc'];
    
    if (!sessionCode && (!startUtc || !endUtc)) {
      throw new ValidationError(
        'Either session-code or both start-utc and end-utc are required',
        { 
          alternatives: ['session-code', 'start-utc + end-utc'],
          endpoints: ['Remote Sessions/query', 'Remote Data/admin-urls/Query']
        }
      );
    }
  }
  
  // Pattern 2: event-id OR event-description (exactly one)
  static validateEventIdentification(params: any): void {
    const eventId = params['event-id'];
    const eventDescription = params['event-description'];
    
    if (!eventId && !eventDescription) {
      throw new ValidationError('Either event-id or event-description is required');
    }
    if (eventId && eventDescription) {
      throw new ValidationError('Only one of event-id or event-description should be provided');
    }
  }
  
  // Pattern 3: longitudinal-group-id OR longitudinal-group-name (exactly one) 
  static validateLongitudinalGroupIdentification(params: any): void {
    const groupId = params['longitudinal-group-id'];
    const groupName = params['longitudinal-group-name'];
    
    if (!groupId && !groupName) {
      throw new ValidationError('Either longitudinal-group-id or longitudinal-group-name is required');
    }
    if (groupId && groupName) {
      throw new ValidationError('Only one of longitudinal-group-id or longitudinal-group-name should be provided');
    }
  }
}
```

### Business Domain Validators (FROM ANALYSIS - 23 EXPLICIT REQUIREMENTS)
```typescript
// From parameter-requirements-intelligence.json - business-specific requirements
class BusinessValidators {
  
  // IW Tools domain: bank-id, language, folder-id required
  static validateIWToolsParams(params: any): void {
    if (!params['bank-id']) {
      throw new ValidationError('bank-id is required for IW Tools operations');
    }
    if (!params['language']) {
      throw new ValidationError('language is required for IW Tools operations');  
    }
    if (!params['folder-id']) {
      throw new ValidationError('folder-id is required for IW Tools operations');
    }
  }
  
  // Form domain: form-id required for delete operations
  static validateFormParams(params: any, operation: string): void {
    if (operation === 'delete' && !params['form-id']) {
      throw new ValidationError('form-id is required for Form delete operations');
    }
  }
  
  // Session domain: session-code required
  static validateSessionParams(params: any): void {
    if (!params['session-code']) {
      throw new ValidationError('session-code is required for Session operations');
    }
  }
}
```

## 🚀 PHASE 1: GET ENDPOINTS IMPLEMENTATION (37 ENDPOINTS)

### MANDATORY: Complete Endpoint Inventory (ALL 37 MUST BE IMPLEMENTED)
**Before writing any code, extract the complete list of 37 GET endpoints from `endpoint-intelligence.json`:**

```bash
# Use this command to extract all GET endpoints and their requirements:
node -e "
const data = require('./endpoint-intelligence.json');
const gets = data.endpoints.filter(e => e.method === 'GET');
console.log('GET ENDPOINTS INVENTORY - ' + gets.length + ' total:');
gets.forEach((e, i) => {
  console.log((i+1).toString().padStart(2, '0') + '. ' + e.path.padEnd(40) + ' - ' + e.parameterCount + ' params');
});
"
```

### Priority Order (from endpoint-intelligence.json):
1. **Event/authorizations/Query** - 8 Event operations (highest business value)
2. **EventClass/Query** - 7 EventClass operations  
3. **Registration/Query** - 5 Registration operations
4. **Form/Query** - 4 Form operations
5. **Test/Query** - 4 Test operations

### Implementation Pattern (EXACT PATTERN TO FOLLOW):
```typescript
// src/endpoints/get/event-authorizations-query.ts
export class EventAuthorizationsQuery {
  
  // AI-NATIVE: Rich metadata for operation discovery
  static readonly metadata = {
    businessIntent: 'Get authorization status for educational testing events',
    semanticNames: ['event authorizations', 'test permissions', 'event access'],
    businessDomain: 'Event Management',
    parameters: {
      required: ['program-id'],
      conditional: ['event-id OR event-description'],
      businessMeaning: {
        'program-id': 'Educational program identifier',
        'event-id': 'Specific test event identifier', 
        'event-description': 'Human-readable event name'
      }
    },
    useCases: [
      'Check if students can access a test event',
      'Verify event permissions before test administration',
      'Audit authorization status for compliance reporting'
    ]
  };
  
  static async execute(params: any): Promise<any> {
    // STEP 1: VALIDATE UNIVERSAL REQUIRED PARAMETERS
    UniversalValidators.validateProgramId(params);
    
    // STEP 2: VALIDATE CONDITIONAL PARAMETERS
    // From analysis: Either event-id OR event-description required
    ConditionalValidators.validateEventIdentification(params);
    
    // STEP 3: BUILD REQUEST URL
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/event/authorizations/Query`;
    const queryParams = new URLSearchParams();
    
    // STEP 4: ADD VALIDATED PARAMETERS
    queryParams.set('program-id', params['program-id']);
    
    if (params['program-institution-id']) {
      queryParams.set('program-institution-id', params['program-institution-id']);
    }
    
    if (params['event-id']) {
      queryParams.set('event-id', params['event-id']);
    } else if (params['event-description']) {
      queryParams.set('event-description', params['event-description']);
    }
    
    // STEP 5: EXECUTE WITH OAUTH2 AUTHENTICATION
    const response = await authenticatedRequest('GET', `${url}?${queryParams}`);
    
    // STEP 6: VALIDATE RESPONSE
    if (!response.ok) {
      throw new APIError(`Event authorizations query failed: ${response.status}`, {
        endpoint: 'Event/authorizations/Query',
        method: 'GET',
        status: response.status,
        params: params,
        businessContext: 'Failed to retrieve event authorization status'
      });
    }
    
    return response.json();
  }
  
  // AI-NATIVE: Semantic wrapper for natural language interaction
  static async getEventAuthorizations(intent: {
    program?: string;
    event?: string | number;
    description?: string;
  }): Promise<any> {
    const params: any = {};
    
    // Intelligent parameter mapping
    if (intent.program) params['program-id'] = intent.program;
    if (intent.event) {
      if (typeof intent.event === 'number' || /^\d+$/.test(intent.event)) {
        params['event-id'] = intent.event.toString();
      } else {
        params['event-description'] = intent.event;
      }
    }
    if (intent.description) params['event-description'] = intent.description;
    
    return this.execute(params);
  }
}
```

### IMMEDIATE TEST REQUIREMENT (TEST EACH ENDPOINT)
```typescript
// tests/phase1/event-authorizations-query.test.ts
describe('Event Authorizations Query', () => {
  
  test('parameter validation - missing program-id throws', async () => {
    await expect(EventAuthorizationsQuery.execute({}))
      .rejects.toThrow('program-id is required');
  });
  
  test('parameter validation - missing event identification throws', async () => {
    await expect(EventAuthorizationsQuery.execute({
      'program-id': 'test-123'
    })).rejects.toThrow('Either event-id or event-description is required');
  });
  
  test('parameter validation - both event-id and event-description throws', async () => {
    await expect(EventAuthorizationsQuery.execute({
      'program-id': 'test-123',
      'event-id': '456',
      'event-description': 'test-event'
    })).rejects.toThrow('Only one of event-id or event-description should be provided');
  });
  
  test('successful execution with event-id', async () => {
    if (!process.env.BASE_URL || !process.env.DEFAULT_PROGRAM_ID) {
      test.skip('Environment not configured for integration tests');
      return;
    }
    
    const params = {
      'program-id': process.env.DEFAULT_PROGRAM_ID,
      'event-id': '123'
    };
    
    const result = await EventAuthorizationsQuery.execute(params);
    expect(result).toBeDefined();
    // Additional response validation based on expected schema
  });
});
```

## 🏗️ PROJECT STRUCTURE (REQUIRED ARCHITECTURE)
```
src/
├── validation/
│   ├── universal-validators.ts      # program-id (79% coverage)
│   ├── conditional-validators.ts    # 7 conditional patterns
│   ├── business-validators.ts       # 23 domain-specific requirements  
│   └── schema-validators.ts         # Request body validation (30 schemas)
├── endpoints/
│   └── get/                        # 37 GET endpoints (Phase 1 ONLY)
│       ├── event-authorizations-query.ts
│       ├── event-class-query.ts
│       └── [35 more GET endpoints].ts
├── auth/
│   └── oauth-client.ts             # OAuth2 client-credentials (EXISTS)
├── types/
│   ├── parameters.ts               # Parameter type definitions
│   └── api-responses.ts            # Response type definitions
├── business-domains/
│   ├── event.ts                    # 8 operations with semantic methods
│   ├── event-class.ts              # 7 operations with semantic methods
│   └── [29 other domains].ts       # Remaining domains with AI-friendly interfaces
├── ai-interface/
│   ├── operation-discovery.ts      # Semantic search and operation matching
│   ├── natural-language-mapper.ts  # Maps natural language to API operations
│   ├── parameter-intelligence.ts   # Contextual parameter suggestions and validation
│   └── workflow-orchestrator.ts    # Chains operations for complex business workflows
├── semantic/
│   ├── operation-metadata.ts       # Rich operation descriptions for AI consumption
│   ├── business-context.ts         # Domain knowledge and relationships
│   └── intent-recognition.ts       # Natural language intent classification
└── tests/
    ├── phase1/                     # Test each GET endpoint immediately  
    │   ├── event-authorizations-query.test.ts
    │   └── [36 more test files].ts
    ├── ai-interface/               # Test AI-native capabilities
    │   ├── natural-language.test.ts
    │   ├── operation-discovery.test.ts
    │   └── workflow-orchestration.test.ts
    └── integration/                # End-to-end business workflow tests
        ├── student-registration-flow.test.ts
        ├── test-administration-flow.test.ts
        └── results-reporting-flow.test.ts
```

## 📊 SUCCESS CRITERIA (DO NOT CLAIM SUCCESS WITHOUT THESE)

### Phase 1 Must Achieve:
- [ ] **Universal parameter validators** implemented and tested (program-id, program-institution-id)
- [ ] **Conditional parameter validators** working for all 7 patterns
- [ ] **Alternative parameter validators** working (either/or scenarios)
- [ ] **Business domain validators** implemented for 23 explicit requirements
- [ ] **First 5 priority GET endpoints** implemented with AI-native metadata and semantic wrappers
- [ ] **ALL 37 GET ENDPOINTS IMPLEMENTED AND TESTED WITH REAL 200 RESPONSES**
- [ ] **Operation discovery system** - AI can find endpoints by business intent
- [ ] **Natural language interface** - Users can interact using business terminology
- [ ] **Semantic operation metadata** - Rich descriptions and use cases for each endpoint
- [ ] **Parameter validation prevents 400 errors** (no invalid requests sent)
- [ ] **OAuth2 authentication** working for all requests  
- [ ] **Tests pass with real environment**, skip gracefully without environment

### MANDATORY REAL API TEST REQUIREMENT FOR EACH ENDPOINT:
```typescript
// EVERY GET endpoint MUST have this integration test that hits the real API
test('REAL API SUCCESS - [endpoint-name] returns 200', async () => {
  if (!process.env.BASE_URL || !process.env.DEFAULT_PROGRAM_ID) {
    test.skip('Environment not configured for integration tests');
    return;
  }
  
  // Use REAL parameters that work with the actual API
  const params = {
    'program-id': process.env.DEFAULT_PROGRAM_ID,
    // Add other REAL parameters based on endpoint requirements
  };
  
  const result = await [EndpointClass].execute(params);
  
  // MANDATORY validations for EVERY real API test:
  expect(result).toBeDefined();
  expect(result).not.toBeNull();
  expect(result).not.toHaveProperty('error');
  expect(result).not.toHaveProperty('fault');
  
  // Log successful API call for verification
  console.log(`✅ ${endpoint} - Real API Success:`, Object.keys(result));
});

// AI-NATIVE TEST: Verify semantic wrapper works
test('SEMANTIC INTERFACE - [endpoint-name] natural language access', async () => {
  if (!process.env.BASE_URL || !process.env.DEFAULT_PROGRAM_ID) {
    test.skip('Environment not configured for integration tests');
    return;
  }
  
  // Test natural language interface
  const result = await [EndpointClass].getEventAuthorizations({
    program: process.env.DEFAULT_PROGRAM_ID,
    event: 'Sample Test Event'  // Natural language event description
  });
  
  expect(result).toBeDefined();
  expect(result).not.toHaveProperty('error');
  
  console.log(`✅ ${endpoint} - Semantic Interface Success`);
});

// AI-NATIVE TEST: Verify operation metadata is complete  
test('METADATA COMPLETENESS - [endpoint-name] has AI-discoverable metadata', () => {
  const metadata = [EndpointClass].metadata;
  
  expect(metadata.businessIntent).toBeDefined();
  expect(metadata.semanticNames).toHaveLength.greaterThan(0);
  expect(metadata.businessDomain).toBeDefined();
  expect(metadata.parameters.required).toBeDefined();
  expect(metadata.useCases).toHaveLength.greaterThan(0);
  
  console.log(`✅ ${endpoint} - Metadata Complete:`, metadata.businessIntent);
});
```

### Validation Requirements:
```typescript
// Every endpoint MUST pass these validation tests
describe('Parameter Validation Standards', () => {
  test('universal parameter validation', async () => {
    // Missing program-id should throw
    await expect(endpoint.execute({})).rejects.toThrow('program-id is required');
  });
  
  test('conditional parameter validation', async () => {
    // Missing conditional requirements should throw with specific message
    await expect(endpoint.execute({
      'program-id': 'test-123'
      // missing conditional requirements
    })).rejects.toThrow(/Either .+ or .+ is required/);
  });
  
  test('successful execution with valid parameters', async () => {
    if (!process.env.BASE_URL) {
      test.skip('Environment not configured');
      return;
    }
    
    const result = await endpoint.execute(validParams);
    expect(result).toBeDefined();
    expect(result).not.toHaveProperty('error');
  });
});
```

## ⚠️ FAILURE PREVENTION (LEARN FROM PREVIOUS 43.9% FAILURE)

### What Went Wrong Before:
- ❌ **Scope misunderstanding**: Thought "API testing" → Actually "business platform automation"
- ❌ **Infrastructure first**: Built complex systems before proving basic endpoints worked  
- ❌ **Ignored parameter validation**: Missed 107 explicit "(Required)" markers
- ❌ **No test-first**: Built without immediate validation
- ❌ **False success claims**: Reported working with only 18/41 operations actually functional

### What You MUST Do Differently:
- ✅ **Start with parameter validation** - implement universal validators FIRST
- ✅ **Test each endpoint immediately** after implementation
- ✅ **Use universal parameter patterns** (program-id in 79% of endpoints)  
- ✅ **Follow the business domain intelligence** from analysis
- ✅ **Never claim success without proof** - test with real API calls
- ✅ **Complete Phase 1 before any other phases** - all 37 GET endpoints working

## 🛠️ TECHNOLOGY STACK (PROVEN TO WORK)
```json
{
  "runtime": {
    "node": "20+", 
    "typescript": "^5.x"
  },
  "http": {
    "undici": "^6.x",
    "oauth": "client-credentials (implementation exists)"
  },
  "validation": {
    "zod": "^3.x"
  },
  "testing": {
    "playwright": "^1.x"
  }
}
```

## 📋 IMPLEMENTATION CHECKLIST

### Before You Start:
- [ ] Read `endpoint-intelligence.json` for complete endpoint specs and technical details
- [ ] Read `parameter-requirements-intelligence.json` for all validation rules and patterns  
- [ ] Review `ITS Next Gen API 2.0.postman_collection.json` for primary API specification
- [ ] Examine `environments/238-stg.json` for environment configuration structure
- [ ] Understand the 84 operation scope (not just API testing)

### Implementation Steps:
- [ ] Implement universal parameter validators (program-id, program-institution-id)
- [ ] Implement conditional parameter validators (7 patterns)
- [ ] Implement business domain validators (23 explicit requirements)
- [ ] **Implement AI-native operation discovery system** (semantic search and metadata)
- [ ] Choose first GET endpoint from priority list (Event/authorizations/Query)
- [ ] Implement endpoint with full parameter validation AND AI-native metadata
- [ ] **Add semantic wrapper methods for natural language interaction**
- [ ] Write comprehensive tests for the endpoint (real API + semantic interface + metadata)
- [ ] **TEST WITH REAL API ENVIRONMENT - MUST GET 200 RESPONSE**
- [ ] **TEST SEMANTIC INTERFACE - Natural language interaction must work**
- [ ] Verify endpoint works before moving to next
- [ ] **REPEAT FOR ALL 37 GET ENDPOINTS - NO EXCEPTIONS**

### AI-NATIVE CAPABILITIES VALIDATION (AFTER EVERY 5 ENDPOINTS):
```bash
# Test semantic interface functionality
npm run test:semantic

# Test metadata completeness
npm run test:metadata

# Test all AI-native capabilities together
npm run test:ai

# Expected: All semantic capabilities working alongside real API calls
```

### MANDATORY PROGRESS VALIDATION (CHECK AFTER EVERY 5 ENDPOINTS):
```bash
# Run this command to verify real API success for implemented endpoints
npm run test:integration

# Run this command to verify semantic interface functionality
npm run test:semantic

# Run this command to verify metadata completeness
npm run test:metadata

# Expected output should show:
# ✅ Event/authorizations/Query - Real API Success: [response-keys]
# ✅ EventClass/Query - Real API Success: [response-keys]  
# ✅ Registration/Query - Real API Success: [response-keys]
# [etc. for each implemented endpoint]
```

### Progress Tracking (UPDATE THIS TABLE):
```
ENDPOINT IMPLEMENTATION PROGRESS - 37 GET ENDPOINTS TOTAL

Priority 1 - Event Operations (8 endpoints):
[ ] Event/authorizations/Query          - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Event/Query                         - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Event/longitudinal-score/Query      - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Event/report/Query                  - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Event/event-url/Query               - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Event/report-url/Query              - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Event/results-url/Query             - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Event/online-score-report-url/Query - Code: __ | Test: __ | Real API: __ | AI: __

Priority 2 - EventClass Operations (7 endpoints):
[ ] EventClass/Query                    - Code: __ | Test: __ | Real API: __ | AI: __
[ ] EventClass/event-url/Query          - Code: __ | Test: __ | Real API: __ | AI: __
[ ] EventClass/report-url/Query         - Code: __ | Test: __ | Real API: __ | AI: __
[ ] EventClass/results-url/Query        - Code: __ | Test: __ | Real API: __ | AI: __
[ ] EventClass/online-score-report-url/Query - Code: __ | Test: __ | Real API: __ | AI: __
[ ] EventClass/accommodation/Query      - Code: __ | Test: __ | Real API: __ | AI: __
[ ] EventClass/longitudinal-score/Query - Code: __ | Test: __ | Real API: __ | AI: __

Priority 3 - Registration Operations (5 endpoints):
[ ] Registration/Query                  - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Registration/event-url/Query        - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Registration/report-url/Query       - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Registration/results-url/Query      - Code: __ | Test: __ | Real API: __ | AI: __
[ ] Registration/accommodation/Query    - Code: __ | Test: __ | Real API: __ | AI: __

[REMAINING 17 ENDPOINTS MUST BE LISTED AND TRACKED]

COMPLETION RULE: NO ENDPOINT IS CONSIDERED "DONE" UNTIL ALL FOUR COLUMNS SHOW "✅"
- Code: ✅ = Endpoint class implemented with parameter validation + AI metadata
- Test: ✅ = Parameter validation tests + Real API test + Semantic interface test + Metadata test
- Real API: ✅ = Test passes with actual 200 response from real API
- AI: ✅ = Semantic wrapper works + metadata complete + discoverable by business intent
```

### Progress Tracking (LEGACY - REMOVE THIS SECTION):
- [ ] Track completed endpoints: ___/37 GET endpoints implemented and tested
- [ ] Parameter validation preventing invalid requests: Yes/No
- [ ] OAuth2 authentication working: Yes/No  
- [ ] Tests passing with real environment: Yes/No
- [ ] Ready for Phase 2 (POST endpoints): Yes/No

## 🎯 FINAL IMPLEMENTATION COMMAND

**Execute this systematic approach:**

1. **READ** the intelligence from the available files (`endpoint-intelligence.json`, `parameter-requirements-intelligence.json`)
2. **IMPLEMENT** parameter validation first (universal, conditional, business)
3. **START** with highest priority GET endpoint (Event/authorizations/Query)
4. **TEST** each endpoint immediately after implementation  
5. **VALIDATE** with real API calls (no unit-test-only success claims)
6. **PROGRESS** systematically through all 37 GET endpoints
7. **UPDATE** the progress tracking table after each endpoint
8. **COMPLETE** Phase 1 before claiming any success

## 🚨 MANDATORY COMPLETION VERIFICATION

Before claiming Phase 1 success, you MUST demonstrate:

### A. Complete Progress Table
```
FINAL VERIFICATION - ALL 37 GET ENDPOINTS WITH AI-NATIVE CAPABILITIES

✅✅✅✅ Event/authorizations/Query          - Code: ✅ | Test: ✅ | Real API: ✅ | AI: ✅
✅✅✅✅ Event/Query                         - Code: ✅ | Test: ✅ | Real API: ✅ | AI: ✅  
✅✅✅✅ Event/longitudinal-score/Query      - Code: ✅ | Test: ✅ | Real API: ✅ | AI: ✅
[... 34 more endpoints with all ✅✅✅✅]

TOTAL: 37/37 endpoints fully implemented with AI-native capabilities and tested with real API
```

### B. Real API Test Suite Results
```bash
# This command MUST show 37 passing real API tests
npm run test:integration

# This command MUST show 37 passing semantic interface tests  
npm run test:semantic

# This command MUST show 37 passing metadata completeness tests
npm run test:metadata

# Expected: 111 total tests passing (37 × 3), 0 failing, 0 skipped (when environment configured)
```

### C. No False Success Claims
**DO NOT CLAIM SUCCESS unless you can provide:**
- [ ] Complete progress table with all 37 endpoints showing ✅✅✅✅
- [ ] Test output showing 37 "REAL API SUCCESS" tests passing
- [ ] Test output showing 37 "SEMANTIC INTERFACE" tests passing  
- [ ] Test output showing 37 "METADATA COMPLETENESS" tests passing
- [ ] Actual log output showing real API responses for each endpoint
- [ ] Verification that parameter validation prevents invalid requests
- [ ] **Demonstration that AI can discover operations by business intent**
- [ ] **Proof that natural language interaction works for each endpoint**

## 🎯 SUCCESS DEFINITION

**Phase 1 SUCCESS = ALL 37 GET endpoints implemented with AI-native capabilities AND tested with real 200 API responses AND semantic interface working**

**NOT SUCCESS:**
- ❌ "Framework is ready" but endpoints not implemented
- ❌ "Tests are written" but not hitting real API
- ❌ "Some endpoints working" but not all 37
- ❌ Unit tests only without real API validation
- ❌ **"API works" but no AI-native interaction capabilities**
- ❌ **Technical endpoints without business-friendly semantic wrappers**

**ACTUAL SUCCESS:**
- ✅ 37 endpoint classes implemented with parameter validation + AI metadata
- ✅ 37 real API tests hitting actual endpoints and getting 200 responses  
- ✅ 37 semantic interface tests proving natural language interaction works
- ✅ 37 metadata completeness tests ensuring AI discoverability
- ✅ Progress table showing ✅✅✅✅ for all 37 endpoints
- ✅ **Users can interact naturally: "get event authorizations for program X"**
- ✅ **AI can discover operations by business intent, not technical endpoint names**
- ✅ **System provides intelligent parameter mapping and contextual help**

**You have complete intelligence. You have explicit requirements. You have failure analysis. Execute systematically and succeed where the previous attempt failed.**

---

# 📊 IMPLEMENTATION GRADING RUBRIC

## 🎯 **SELF-ASSESSMENT INSTRUCTIONS**
After implementing each milestone, **grade yourself** using this rubric. **Do not proceed** to the next milestone until you achieve **PROFICIENT** or **EXEMPLARY** in all categories.

## 📋 **RUBRIC CATEGORIES & SCORING**

### **1. PARAMETER VALIDATION FOUNDATION** (25 points)

| Score | Level | Criteria |
|-------|--------|----------|
| **4 - Exemplary** | **22-25 pts** | ✅ Universal validators handle program-id (79% coverage) + program-institution-id<br/>✅ All 7 conditional patterns implemented with clear error messages<br/>✅ All 23 business domain requirements implemented<br/>✅ Validators prevent 400 errors - no invalid requests sent to API<br/>✅ Error messages include business context and suggestions |
| **3 - Proficient** | **18-21 pts** | ✅ Universal validators working<br/>✅ Most conditional patterns implemented<br/>✅ Most business requirements covered<br/>⚠️ Minor edge cases missing |
| **2 - Developing** | **12-17 pts** | ✅ Basic universal validation<br/>⚠️ Some conditional patterns missing<br/>⚠️ Some business requirements missing<br/>❌ Still sending some invalid requests |
| **1 - Inadequate** | **0-11 pts** | ❌ Missing universal validation<br/>❌ No conditional logic<br/>❌ Ignoring business requirements<br/>❌ API receiving invalid requests |

**Self-Assessment Score: ___/25**

### **2. ENDPOINT IMPLEMENTATION COMPLETENESS** (25 points)

| Score | Level | Criteria |
|-------|--------|----------|
| **4 - Exemplary** | **22-25 pts** | ✅ ALL 37 GET endpoints implemented<br/>✅ Each endpoint follows exact implementation pattern<br/>✅ All endpoints tested with real API calls getting 200 responses<br/>✅ Progress table shows ✅✅✅✅ for all 37 endpoints<br/>✅ No endpoints skipped or stubbed |
| **3 - Proficient** | **18-21 pts** | ✅ 32+ endpoints implemented (85%+)<br/>✅ Most follow implementation pattern<br/>✅ Most tested with real API<br/>⚠️ Few remaining endpoints in progress |
| **2 - Developing** | **12-17 pts** | ✅ 20+ endpoints implemented (55%+)<br/>⚠️ Some pattern deviations<br/>⚠️ Some real API testing missing<br/>❌ Significant work remaining |
| **1 - Inadequate** | **0-11 pts** | ❌ <20 endpoints implemented<br/>❌ No consistent pattern<br/>❌ No real API testing<br/>❌ Claiming success prematurely |

**Self-Assessment Score: ___/25**

### **3. AI-NATIVE INTERACTION CAPABILITIES** (25 points)

| Score | Level | Criteria |
|-------|--------|----------|
| **4 - Exemplary** | **22-25 pts** | ✅ Every endpoint has rich AI metadata (businessIntent, semanticNames, useCases)<br/>✅ Natural language semantic wrapper methods work<br/>✅ Operation discovery by business intent functional<br/>✅ Intelligent parameter mapping from human terms to API params<br/>✅ All semantic interface tests passing |
| **3 - Proficient** | **18-21 pts** | ✅ Most endpoints have AI metadata<br/>✅ Basic semantic wrappers working<br/>✅ Simple operation discovery<br/>⚠️ Some parameter mapping gaps |
| **2 - Developing** | **12-17 pts** | ✅ Some AI metadata present<br/>⚠️ Limited semantic capabilities<br/>⚠️ Basic discovery only<br/>❌ Missing intelligent parameter handling |
| **1 - Inadequate** | **0-11 pts** | ❌ No AI metadata<br/>❌ No semantic wrappers<br/>❌ No operation discovery<br/>❌ Only technical API access |

**Self-Assessment Score: ___/25**

### **4. TESTING & VERIFICATION RIGOR** (25 points)

| Score | Level | Criteria |
|-------|--------|----------|
| **4 - Exemplary** | **22-25 pts** | ✅ 111+ tests passing (37 real API + 37 semantic + 37 metadata)<br/>✅ All tests hit real API environment and get 200 responses<br/>✅ Test output shows actual API response data<br/>✅ No false success claims - concrete evidence provided<br/>✅ Parameter validation tests prevent all invalid requests |
| **3 - Proficient** | **18-21 pts** | ✅ 90+ tests passing<br/>✅ Most hit real API<br/>✅ Good test coverage<br/>⚠️ Minor verification gaps |
| **2 - Developing** | **12-17 pts** | ✅ 60+ tests passing<br/>⚠️ Some real API testing<br/>⚠️ Basic verification<br/>❌ Some false claims |
| **1 - Inadequate** | **0-11 pts** | ❌ <60 tests or no real API testing<br/>❌ Unit tests only<br/>❌ False success claims<br/>❌ No concrete evidence |

**Self-Assessment Score: ___/25**

---

## 📈 **OVERALL GRADING SCALE**

| Total Score | Grade | Status | Action Required |
|-------------|--------|--------|-----------------|
| **90-100** | **A** | **EXEMPLARY** | ✅ **PROCEED TO NEXT PHASE** |
| **80-89** | **B** | **PROFICIENT** | ✅ **PROCEED** (monitor weak areas) |
| **70-79** | **C** | **DEVELOPING** | ⚠️ **IMPROVE** weak categories before proceeding |
| **60-69** | **D** | **NEEDS WORK** | ❌ **STOP** - Address major gaps |
| **<60** | **F** | **INADEQUATE** | ❌ **RESTART** - Fundamental issues |

**TOTAL SELF-ASSESSMENT SCORE: ___/100 = Grade: ___**

---

## 🔄 **MANDATORY SELF-EVALUATION CHECKPOINTS**

### **Checkpoint 1: After First 5 Endpoints** (Score must be ≥70)
```bash
# Run these commands and evaluate results:
npm run test:integration
npm run test:semantic  
npm run test:metadata

# Grade yourself in each category
# If <70 total, identify specific gaps and fix before continuing
```

### **Checkpoint 2: After 15 Endpoints** (Score must be ≥75)
- Verify progress table shows consistent ✅✅✅✅ pattern
- Confirm no regression in earlier endpoints
- Validate AI-native capabilities are improving

### **Checkpoint 3: After 25 Endpoints** (Score must be ≥80)  
- Demonstrate operation discovery working across business domains
- Show natural language interaction examples
- Prove parameter intelligence is comprehensive

### **Final Checkpoint: All 37 Endpoints** (Score must be ≥85)
- Complete final verification requirements
- Provide concrete evidence for all claims
- No exceptions - must meet exemplary standards

---

## 🎯 **BEHAVIORAL ENFORCEMENT MECHANISMS**

### **Anti-Pattern Detection**
**If you catch yourself doing any of these, STOP and restart:**
- ❌ Claiming success without running the verification commands
- ❌ Implementing endpoints without AI metadata
- ❌ Skipping real API testing
- ❌ Building infrastructure before proving endpoints work
- ❌ Providing unit tests instead of integration tests
- ❌ Missing semantic wrapper methods
- ❌ Incomplete progress tracking

### **Success Pattern Reinforcement**
**Continue if you're doing these consistently:**
- ✅ Every endpoint has complete AI metadata
- ✅ Every test hits real API and gets 200 response
- ✅ Natural language interaction works for each endpoint
- ✅ Progress table updated after each endpoint
- ✅ Self-assessment score improving or maintaining ≥80
- ✅ Concrete evidence provided for all claims

---

## 🚨 **MANDATORY RUBRIC USAGE**

### **Before Claiming Any Success:**
1. **Complete full self-assessment** using this rubric
2. **Score yourself honestly** in each category  
3. **Provide specific evidence** for your scores
4. **Show actual test output** demonstrating claims
5. **Only proceed if grade ≥80** (Proficient)

### **Evidence Required for Each Score:**
- **Real API Success**: Test output showing 200 responses with actual data
- **Semantic Interface**: Examples of natural language → API parameter mapping working
- **Metadata Completeness**: Show businessIntent, semanticNames, useCases for sample endpoints
- **Parameter Validation**: Demonstrate invalid requests are caught before reaching API

**This rubric ensures you build the AI-native interaction platform successfully, not just another API wrapper.**