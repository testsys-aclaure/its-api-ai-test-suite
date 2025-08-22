# AI Agent Interaction Guide

## How AI Agents Should Interact With This API

### Discovery Pattern
1. **Read endpoint metadata** to understand business purpose
2. **Use semantic interfaces** for natural language queries
3. **Follow hypermedia links** for related operations
4. **Interpret business context** in responses

### Natural Language Mapping Examples

```typescript
// AI Agent Query: "Find active events for program 238"
const result = await EventQuery.findActiveEvents('238');

// AI Agent Query: "Get events for institution 1009048 in program 238"
const result = await EventQuery.getEvents({
  program: '238',
  institution: '1009048'
});

// AI Agent Query: "Search for events named 'Math Test'"
const result = await EventQuery.searchEventsByName('238', 'Math Test');
```

### Business Context Interpretation

AI agents should understand:
- **HTTP 422** often means "business validation working correctly"
- **Empty results** may be expected behavior, not errors
- **Environment configuration** drives all parameters

### Error Handling for AI Agents

```typescript
try {
  const events = await EventQuery.execute(params);
} catch (error) {
  if (error.isBusinessLogicError) {
    // Expected business behavior - not a failure
    console.log(`Business rule: ${error.businessExplanation}`);
  } else {
    // Actual technical error requiring action
    throw error;
  }
}
```

### Semantic Search Capability

AI agents can search endpoints by:
- **Business intent**: "event management", "student registration"  
- **Domain**: "Event Management", "Assessment"
- **Use cases**: "List all events", "Find active tests"

## Current AI-Friendly Features

### ✅ Available Now
- Rich metadata with business context
- Semantic parameter mapping
- Business-friendly method names
- Environment-driven configuration
- Comprehensive error information

### 🚧 Partially Implemented  
- Self-descriptive responses (basic)
- Business context in errors (limited)
- Natural language interfaces (incomplete)

### ❌ Missing for Full AI-Native
- Hypermedia controls for navigation
- Content negotiation for different AI formats
- Machine-readable capability descriptions
- Automated endpoint discovery

## AI Agent Capabilities Matrix

| Capability | Current Support | Enhancement Needed |
|------------|----------------|-------------------|
| **Discover Endpoints** | Manual metadata reading | Automated discovery API |
| **Natural Language Queries** | Semantic interfaces | Enhanced NL processing |
| **Business Context Understanding** | Basic metadata | Rich business reasoning |
| **Error Recovery** | Technical errors | Business-guided recovery |
| **Workflow Navigation** | Manual programming | Hypermedia-driven flow |

## Recommended AI Agent Workflow

1. **Start with Dashboard** - Always check `test-dashboard.html` first
2. **Read Metadata** - Understand business purpose before calling
3. **Use Semantic Interfaces** - Prefer natural language methods
4. **Follow Business Logic** - Expect 422 responses as valid behavior
5. **Navigate via Links** - Use hypermedia controls (when implemented)
