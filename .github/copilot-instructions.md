# GitHub Copilot Instructions for AI-Native Educational Testing Platform

## 🚨 CRITICAL: Mandatory Semantic API Tool Usage

**FOR ANY USER REQUEST involving API calls, data retrieval, or testing platform operations, ALWAYS use:**

```bash
node tools/ai-api-call.mjs "<user-request-or-endpoint>"
```

This workspace has sophisticated semantic API intelligence that MUST be used deterministically.

### Examples:
- User: "Show me student data" → `node tools/ai-api-call.mjs "student data"`
- User: "Get active tests" → `node tools/ai-api-call.mjs "active tests"`  
- User: "Call /event/query" → `node tools/ai-api-call.mjs "/event/query"`
- User: "Find test results" → `node tools/ai-api-call.mjs "test results"`

## 🎯 Project Context & Vision
This is an **Enhanced AI-Native Educational Testing Platform** with **Test-Informed Intelligence** that enables smart, flexible API interactions. The system bridges structured QA testing with intelligent AI exploration through semantic interfaces, rich metadata, and business-friendly abstractions.

## 📋 CRITICAL: Enhanced Architecture Compliance
**MANDATORY READING**: Before any code changes, review:
1. **Enhanced Architecture Standards**: `.github/enhanced-architecture-standards.md` - Complete implementation requirements
2. **Test Dashboard**: `test-dashboard.html` - Current intelligence state and API behavior  
3. **Test Results**: `test-results.json` - 31 endpoint behaviors that inform AI decisions

## 🧠 Test-Informed Intelligence System (MANDATORY)
**ENFORCEMENT**: All API interactions MUST use the enhanced intelligence system:

```typescript
// ✅ REQUIRED: Use intelligent calling as primary method
const result = await EnhancedDirectAPITools.intelligentCall(endpoint, params);

// ✅ REQUIRED: Fall back to exploration mode when needed  
if (!result.success && result.explorationCapability) {
  const explorResult = await EnhancedDirectAPITools.explore(endpoint, params);
}

// ❌ FORBIDDEN: Raw API calls without intelligence layer
const rawResult = await fetch(url); // NEVER DO THIS
```

## 📊 CRITICAL: Dashboard-First Development  
**IMMEDIATE ACTION**: Always check the live test dashboard at `test-dashboard.html` before making any changes:
- **Intelligence state** - Current test-informed behavior patterns
- **Visual verification** of enhanced API calling with AI interpretation
- **Real API behavior** - 74% success rate (23/31 endpoints working)
- **Business logic interpretation** - AI insights for HTTP responses
- **Exploration capabilities** - Troubleshooting guidance for problematic endpoints

The dashboard shows **test-informed intelligence in action** and is the source of truth for system behavior.

## Enhanced AI-Native Principles (MANDATORY)

### 1. 🧠 Test-Informed Development (NEW)
**ENFORCEMENT**: All development must be informed by actual test results:

```typescript
// ✅ REQUIRED: Load intelligence from test results
const intelligence = TestInformedIntelligence.getInstance();
const guidance = intelligence.getAIGuidance(endpoint, params);

// ✅ REQUIRED: Use guidance for API strategy
switch (guidance.approach) {
  case 'intelligent': return this.intelligentCall(endpoint, guidance.suggestedParameters);
  case 'exploration': return this.explore(endpoint, params);  
  case 'hybrid': // Try intelligent first, fallback to exploration
}

// ❌ FORBIDDEN: Ignoring test-informed intelligence
const result = await this.makeRequest(endpoint, params); // NEVER DO THIS
```

### 2. 🔍 Exploration-Mode Support (NEW) 
**ENFORCEMENT**: All endpoints must support troubleshooting exploration:

```typescript
// ✅ REQUIRED: Implement exploration capability
static async explore(endpoint: string, baseParams: any): Promise<EnhancedAPIResponse> {
  const strategies = [
    () => this.tryMinimalParams(endpoint, baseParams),
    () => this.tryCommonParams(endpoint, baseParams), 
    () => this.trySuccessfulPatterns(endpoint, baseParams)
  ];
  
  for (const strategy of strategies) {
    const result = await strategy();
    if (result.success) return result;
  }
  
  return this.generateFailureAnalysis(endpoint, baseParams);
}
```

### 3. 💡 AI Interpretation (NEW)
**ENFORCEMENT**: All responses must include business context and AI insights:

```typescript
// ✅ REQUIRED: Enhanced response with AI interpretation
interface EnhancedAPIResponse {
  success: boolean;
  data?: any;
  error?: string;
  httpStatus: number;
  aiInterpretation: string;           // MANDATORY: AI explanation
  businessContext: string;            // MANDATORY: Educational testing context
  suggestedFixes?: string[];          // MANDATORY: Actionable guidance
  explorationCapability: boolean;    // MANDATORY: Can this be explored?
}
```

### 4. 📊 Semantic-First Development (ENHANCED)
Always create **semantic interfaces** alongside technical implementations with intelligence:

```typescript
// ✅ ALWAYS include semantic wrappers with test-informed behavior
static async findActiveEvents(programId: string, institution?: string): Promise<any> {
  // Use intelligent calling instead of basic getEvents
  return EnhancedDirectAPITools.intelligentCall('/event/Query', { 
    'program-id': programId, 
    'program-institution-id': institution, 
    'active-only': 'true' 
  });
}

// ✅ ALWAYS provide natural language mapping with intelligence
static async getEvents(intent: SemanticIntent): Promise<any> {
  const params = this.mapSemanticToTechnical(intent);
  return EnhancedDirectAPITools.intelligentCall('/event/Query', params);
}
```

### 5. 📖 Rich Metadata for AI Discovery (ENHANCED)
Every endpoint MUST have comprehensive metadata including test intelligence:

```typescript
static readonly metadata: EnhancedEndpointMetadata = {
  businessIntent: 'Clear business purpose in plain English',
  semanticNames: ['ai-discoverable', 'alternative names', 'business terms'],
  businessDomain: 'Educational Testing',
  testIntelligence: {                    // NEW: Test-informed data
    successRate: 0.85,
    commonErrors: ['Missing program-id', 'Invalid institution'],
    workingParameters: ['program-id', 'program-institution-id'],
    explorationStrategies: ['minimal-params', 'common-params']
  },
  parameters: {
    businessMeaning: {
      'technical-param': 'Business meaning explanation'
    }
  },
  useCases: ['Specific use case 1', 'Specific use case 2']
};
```

### 6. 🏗️ Environment-Driven Configuration (ENHANCED)
**NEVER hardcode values** - always use environment configuration with intelligence awareness:

```typescript
// ✅ CORRECT - Environment-driven with intelligence
const params = {
  'program-id': env.getDefaultProgramId(),
  'program-institution-id': env.getProgramInstitutionId()
};

// Use intelligence to determine best approach
const intelligence = TestInformedIntelligence.getInstance();
const result = await intelligence.makeIntelligentCall(endpoint, params);

// ❌ WRONG - Hardcoded values without intelligence
const params = {
  'program-id': '238',
  'program-institution-id': '1009048'
};
const result = await fetch(url, { body: JSON.stringify(params) }); // NO INTELLIGENCE
```

## Specific Implementation Guidelines

### API Endpoint Development
When creating new API endpoints, follow this pattern:

```typescript
/**
 * [Endpoint Name] - AI-NATIVE
 * Business-focused description of what this endpoint accomplishes
 */
export class EndpointName {
  // 1. MANDATORY: Rich metadata for AI discovery
  static readonly metadata: EndpointMetadata = {
    businessIntent: 'Business purpose in plain English',
    semanticNames: ['natural language alternatives'],
    businessDomain: 'Domain Area',
    useCases: ['Specific business scenarios']
  };
  
  // 2. MANDATORY: Technical implementation with validation
  static async execute(params: APIParameters): Promise<any> {
    // Environment-driven validation and execution
  }
  
  // 3. MANDATORY: Semantic wrapper for AI agents
  static async semanticMethodName(intent: SemanticIntent): Promise<any> {
    // Natural language to technical parameter mapping
  }
  
  // 4. MANDATORY: Business-friendly aliases
  static async businessFriendlyMethod(): Promise<any> {
    // Easy-to-understand method names
  }
}
```

### Test Development Patterns
Every endpoint needs comprehensive AI-native tests:

```typescript
// ✅ ALWAYS test semantic interfaces
test('SEMANTIC INTERFACE - Natural language access works', async () => {
  const result = await EndpointName.semanticMethodName({
    program: env.getDefaultProgramId(),
    institution: env.getProgramInstitutionId()
  });
  // Validate AI-friendly interface works
});

// ✅ ALWAYS test business aliases
test('BUSINESS ALIASES - Business method aliases work', async () => {
  const result = await EndpointName.businessFriendlyMethod(
    env.getDefaultProgramId(),
    env.getProgramInstitutionId()
  );
  // Validate business-friendly interfaces
});
```

## Environment Configuration Standards

### Institution ID Strategy
- **Testing Institution**: Use `env.getProgramInstitutionId()` (currently 1009048) 
- **Always include** `program-institution-id` on endpoints that support it
- **Document** institution-specific behavior in metadata
- **Use environment config** - never fallback patterns like `|| '1009048'`

### Configuration Access Pattern
```typescript
// ✅ CORRECT - Use environment config class
const env = EnvironmentConfig;
const institutionId = env.getProgramInstitutionId();

// ❌ WRONG - Direct environment access or fallbacks
const institutionId = process.env.PROGRAM_INSTITUTION_ID || '1009048';
```

## AI-Native API Design Standards

### Richardson Maturity Model Level 3 Compliance
All endpoints must achieve **Level 3 - Hypermedia Controls** for AI discoverability:

1. **Level 0**: Basic HTTP transport ❌
2. **Level 1**: Resource-based URIs ✅
3. **Level 2**: HTTP verbs + status codes ✅  
4. **Level 3**: Hypermedia controls ✅ **← TARGET LEVEL**

### Self-Descriptive Message Implementation
Every response must be self-descriptive for AI consumption:

```typescript
// AI-NATIVE: Self-descriptive response structure
{
  "data": { /* actual data */ },
  "_metadata": {
    "businessContext": "Event authorization validation for educational testing",
    "semanticMeaning": "Security validation - no authorization records found",
    "nextActions": ["Try different event-id", "Verify expected behavior"],
    "troubleshooting": {
      "httpStatus": 422,
      "businessReason": "Event has no authorization requirements in test institution",
      "isErrorCondition": false,
      "expectedBehavior": true
    }
  },
  "_links": {
    "self": { "href": "/event/authorizations/query?..." },
    "related": [
      { "rel": "events", "href": "/event/query" },
      { "rel": "documentation", "href": "/docs/event-authorization" }
    ]
  }
}
```

### Uniform Interface Principles
Implement consistent patterns across all endpoints:

```typescript
// AI-NATIVE: Uniform interface pattern
export interface AIEndpointInterface {
  // 1. Resource identification through URIs
  readonly resourceURI: string;
  
  // 2. Resource manipulation through representations
  execute(params: APIParameters): Promise<ResourceRepresentation>;
  
  // 3. Self-descriptive messages
  readonly metadata: SelfDescriptiveMetadata;
  
  // 4. Hypermedia as engine of application state
  getHypermediaControls(context: any): HypermediaLinks;
}
```

## AI-Friendly Code Practices

### 1. Descriptive Naming
Use business terminology that AI agents can understand:

```typescript
// ✅ AI-friendly business names
async findAvailableTestsForStudent()
async getEventClassesForInstitution()
async validateStudentAuthorization()

// ❌ Technical jargon
async execEventAuth()
async qryClss()
```

### 2. Clear Comments & Context
Provide context that helps AI understand business logic:

```typescript
// AI-NATIVE: This endpoint handles business validation
// HTTP 422 responses are EXPECTED when no authorization records exist
// This is correct security behavior, not an error condition
if (error.status === 422) {
  console.log(`✅ Business validation working correctly: ${error.message}`);
}
```

### 3. Self-Documenting Patterns
Structure code so AI agents can understand the intent:

```typescript
// AI-NATIVE: Map natural language to technical parameters
const parameterMapping = {
  program: 'program-id',
  institution: 'program-institution-id',
  event: 'event-id',
  activeOnly: 'active-only'
};
```

### 4. Hypermedia-Driven Design
Following **Richardson Maturity Model Level 3**, provide discovery mechanisms:

```typescript
// AI-NATIVE: Include navigational links in responses
static async execute(params: APIParameters): Promise<any> {
  const result = await this.makeAPICall(params);
  
  // Add hypermedia controls for AI discovery
  if (result.success) {
    result._links = {
      self: { href: this.getSelfLink(params) },
      related: this.getRelatedEndpoints(),
      documentation: { href: `${this.metadata.businessDomain}/docs` }
    };
  }
  return result;
}
```

### 5. Machine-Readable Metadata
Provide structured metadata that AI agents can consume:

```typescript
// AI-NATIVE: Machine-readable capability description
static readonly capabilities = {
  discoverability: {
    semanticSearch: true,
    businessIntent: this.metadata.businessIntent,
    domainContext: this.metadata.businessDomain
  },
  interoperability: {
    standardsCompliance: ['REST Level 3', 'HATEOAS', 'Self-descriptive'],
    mediaTypes: ['application/json', 'application/hal+json']
  },
  usability: {
    naturalLanguageAccess: true,
    businessAliases: Object.keys(this.businessMethods),
    troubleshootingGuidance: true
  }
};
```

## Dashboard & Reporting Guidelines

### Central Dashboard Architecture
The **HTML test dashboard** (`test-dashboard.html`) is the **primary interface** for understanding project status:

```bash
# Quick dashboard access
npm run dashboard     # Run tests + open dashboard
start test-dashboard.html  # Direct access (Windows)
```

### Dashboard Intelligence Features
- **Environment transparency** - Shows actual API URLs and parameters being used
- **Business logic interpretation** - Explains HTTP 422 as "Security validation working"
- **AI-native metrics** - Semantic interface coverage, metadata completeness
- **Actionable troubleshooting** - Specific guidance for each endpoint scenario

### Environment-Driven Reporting
Dashboard must reflect actual API calls, not assumptions:

```typescript
// ✅ CORRECT - Use actual environment values
const baseUrl = process.env.BASE_URL;
const programId = process.env.DEFAULT_PROGRAM_ID;

// Fail fast if environment not configured
if (!baseUrl || !programId) {
  return '⚠️ Environment not configured - cannot display actual API requests';
}
```

### AI-Native Reporting Standards
Follow **Richardson Maturity Model Level 3** principles in dashboard design:
- **Self-descriptive messages** - Each endpoint result explains itself
- **Hypermedia controls** - Dashboard provides links to next actions
- **Semantic richness** - Business context for every technical response
- **Discovery mechanisms** - Help AI agents understand available operations

### Troubleshooting Context
Provide AI agents with actionable troubleshooting information:

```typescript
troubleshooting: {
  issue: 'HTTP 422 - Business Logic Validation',
  likelyCause: 'Event has no authorization requirements in test institution',
  solution: 'Try different event-id or verify expected behavior',
  testAdvice: 'Check if this response pattern is correct for business logic'
}
```

## Code Review Checklist

When reviewing code, ensure:
- [ ] **Dashboard consulted first** - Verify current state before making changes
- [ ] **Semantic interfaces** provided for AI discovery
- [ ] **Rich metadata** with business context
- [ ] **Environment configuration** used (no hardcoding)
- [ ] **Business-friendly method names**
- [ ] **Comprehensive test coverage** including semantic tests
- [ ] **Clear documentation** for AI understanding
- [ ] **Troubleshooting guidance** for common scenarios

## AI Agent Interaction Examples

The framework should enable AI agents to:

```typescript
// AI Agent: "Find active tests for students"
const tests = await EventQuery.findActiveEvents(program, institution);

// AI Agent: "Get details about student grouping"
const classes = await EventClassQuery.getEventClasses({
  program: program,
  institution: institution,
  event: eventId
});

// AI Agent: "Check if student can access this test"
const authorization = await EventAuthorizationQuery.checkStudentAccess({
  program: program,
  student: studentId,
  event: eventId
});
```

This framework transforms your API from technical documentation into **intelligent interfaces that AI agents can discover, understand, and use effectively** for educational testing workflows.

## AI Usability Enforcement Standards

### 1. **HATEOAS (Hypertext as Engine of Application State)**
All endpoints must implement hypermedia controls for AI navigation:

```typescript
// MANDATORY: Include navigational controls in every response
{
  "data": { /* response data */ },
  "_links": {
    "self": { "href": "current-resource-uri" },
    "next": { "href": "next-logical-action" },
    "related": [
      { "rel": "parent", "href": "/parent-resource" },
      { "rel": "children", "href": "/child-resources" }
    ],
    "actions": {
      "update": { "href": "/resource", "method": "PUT" },
      "delete": { "href": "/resource", "method": "DELETE" }
    }
  }
}
```

### 2. **Content Negotiation for AI Agents**
Support multiple representation formats:

```typescript
// AI-NATIVE: Support multiple formats for different AI agents
static async execute(params: APIParameters, accept = 'application/json'): Promise<any> {
  const result = await this.makeAPICall(params);
  
  switch (accept) {
    case 'application/hal+json':
      return this.formatAsHAL(result);
    case 'application/vnd.api+json':
      return this.formatAsJSONAPI(result);
    case 'application/json':
    default:
      return this.formatWithMetadata(result);
  }
}
```

### 3. **Uniform Resource Identification**
Consistent URI patterns that AI agents can predict:

```typescript
// AI-NATIVE: Predictable URI patterns
static readonly resourcePatterns = {
  collection: '/resources',
  item: '/resources/{id}',
  subCollection: '/resources/{id}/sub-resources',
  action: '/resources/{id}/actions/{action-name}'
};
```

### 4. **Machine-Readable Error Context**
HTTP errors with business context for AI troubleshooting:

```typescript
// AI-NATIVE: Enhanced error responses
{
  "error": {
    "httpStatus": 422,
    "code": "VALIDATION_FAILED",
    "title": "Business Logic Validation Failed",
    "detail": "Event has no authorization requirements in test institution",
    "businessContext": {
      "domain": "Security Validation",
      "expectedBehavior": true,
      "nextSteps": ["Try different event-id", "Verify test data setup"]
    }
  },
  "_links": {
    "help": { "href": "/docs/troubleshooting/validation-errors" },
    "retry": { "href": "/event/authorizations/query", "method": "GET" }
  }
}
```

## Key Success Metrics
- AI agents can discover endpoints by business intent
- Natural language queries map to correct API calls  
- Environment changes automatically propagate
- Business logic is self-explanatory
- Troubleshooting guidance is actionable
