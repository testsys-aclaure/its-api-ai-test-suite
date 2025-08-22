# GitHub Copilot Instructions for AI-Native Educational Testing Platform

## Project Context & Vision
This is an **AI-Native Educational Testing Platform** API test suite that enables intelligent AI usage of the API through semantic interfaces, rich metadata, and business-friendly abstractions. The framework transforms raw API endpoints into AI-discoverable, self-describing interfaces.

## Core AI-Native Principles

### 1. 🧠 Semantic-First Development
Always create **semantic interfaces** alongside technical implementations:

```typescript
// ✅ ALWAYS include semantic wrappers for AI discoverability
static async findActiveEvents(programId: string, institution?: string): Promise<any> {
  return this.getEvents({ program: programId, institution, activeOnly: true });
}

// ✅ ALWAYS provide natural language mapping
static async getEvents(intent: SemanticIntent): Promise<any> {
  // Map natural language to technical parameters
  if (intent.program) params['program-id'] = intent.program;
  if (intent.institution) params['program-institution-id'] = intent.institution;
}
```

### 2. 📖 Rich Metadata for AI Discovery
Every endpoint MUST have comprehensive metadata:

```typescript
static readonly metadata: EndpointMetadata = {
  businessIntent: 'Clear business purpose in plain English',
  semanticNames: ['ai-discoverable', 'alternative names', 'business terms'],
  businessDomain: 'Functional Domain',
  parameters: {
    businessMeaning: {
      'technical-param': 'Business meaning explanation'
    }
  },
  useCases: ['Specific use case 1', 'Specific use case 2']
};
```

### 3. 🏗️ Environment-Driven Configuration
**NEVER hardcode values** - always use environment configuration:

```typescript
// ✅ CORRECT - Environment-driven
const params = {
  'program-id': env.getDefaultProgramId(),
  'program-institution-id': env.getProgramInstitutionId()
};

// ❌ WRONG - Hardcoded values
const params = {
  'program-id': '238',
  'program-institution-id': '1009048'
};
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

## Dashboard & Reporting Guidelines

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

## Key Success Metrics
- AI agents can discover endpoints by business intent
- Natural language queries map to correct API calls  
- Environment changes automatically propagate
- Business logic is self-explanatory
- Troubleshooting guidance is actionable
