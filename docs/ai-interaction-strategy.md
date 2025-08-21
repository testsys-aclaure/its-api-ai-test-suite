# AI-Enabled API Interaction Strategy

## Current Status: Success with Modern Generator

✅ **@hey-api/openapi-ts** generates clean, working TypeScript
✅ Eliminates duplicate parameter issues from old generator  
✅ Provides proper operation methods (channelInstitutionQuery, etc.)
⚠️ Minor TypeScript target issues (easily fixable)

## Recommended Architecture

### Layer 1: Semantic Understanding
```javascript
// Natural language intent recognition
const intentMap = {
  "get institutions": "channelInstitutionQuery",
  "find test events": "eventQuery", 
  "show examinee data": "examineeQuery"
};
```

### Layer 2: Smart Wrapper (Enhanced ApiWrapper.ts)
```typescript
class ApiWrapper {
  // Use generated client as foundation
  constructor() {
    this.client = new GeneratedClient();
    this.env = new EnvironmentLoader();
  }
  
  // AI-friendly semantic calls
  async callByIntent(intent: string, params: any = {}) {
    const operation = this.mapIntentToOperation(intent);
    return this.smartCall(operation, params);
  }
  
  // Intelligent parameter injection
  private injectContextualParams(operation: string, params: any) {
    // Always inject program-institution-id when available (safe test institution)
    if (!params['program-institution-id'] && this.env.programInstitutionId) {
      params['program-institution-id'] = this.env.programInstitutionId;
    }
    // Context-aware injection based on operation type
  }
}
```

### Layer 3: Generated Foundation
- Types and schemas from OpenAPI spec
- Automatic updates when spec changes  
- Operation discovery for AI

## Documentation Strategy (GitHub Best Practices)

### Enhanced copilot-instructions.md
```markdown
# AI Interaction Patterns

## Natural Language Commands
- "get institutions" → channelInstitutionQuery()
- "find events for program X" → eventQuery(program-id: X)
- "show test results" → resultQuery() with auto-injected context

## Context Rules  
- Always inject program-institution-id when available (1009048 = safe test institution)
- Auto-inject program-id from environment
- Use semantic search for operation discovery

## Semantic Operation Map
See: ./docs/semantic-map.json
```

### Operation Documentation
```javascript
// Auto-generate from Phase 1 artifacts
const semanticMap = {
  operations: plan.readOnlyOperations.map(op => ({
    operationId: op.operationId,
    path: op.path,
    intent: generateSemanticIntents(op), // "get institutions", "find events"
    requiredParams: extractRequiredParams(op),
    commonParams: ['program-id', 'program-institution-id']
  }))
};
```

## Implementation Plan

1. **Fix Generated Client** - Resolve TypeScript target issues  
2. **Enhance ApiWrapper.ts** - Add semantic layer capabilities
3. **Create Semantic Map** - Intent → Operation mapping
4. **Update Documentation** - GitHub-native AI guidance
5. **Test Natural Language Flow** - End-to-end AI interaction

## Why This Approach Works

- **Leverages imperfect OpenAPI spec** - Types and operations remain valuable
- **Enables semantic search** - Natural language → API operations  
- **Maintainable** - Generated foundation updates with spec changes
- **AI-optimized** - Built for natural language interaction
- **GitHub-integrated** - Uses copilot-instructions.md patterns

This gives us both immediate functionality AND long-term scalability.
