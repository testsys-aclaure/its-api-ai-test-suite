# AI Assistant Instructions for Using the Semantic API Intelligence System

## MANDATORY: For ALL API-related requests, use this tool

When a user asks for any API information, data retrieval, or testing platform operations, **ALWAYS** use:

```bash
node tools/ai-api-call.mjs "<user-request>"
```

## Examples of when to use this tool:

### Natural Language Queries
- "Show me student data" → `node tools/ai-api-call.mjs "student data"`
- "Get active tests" → `node tools/ai-api-call.mjs "active tests"`
- "Find test results" → `node tools/ai-api-call.mjs "test results"`
- "List event classes" → `node tools/ai-api-call.mjs "event classes"`
- "Get institutions" → `node tools/ai-api-call.mjs "institutions"`

### Direct Endpoint Requests
- "Call /event/query" → `node tools/ai-api-call.mjs "/event/query"`
- "Get events with filters" → `node tools/ai-api-call.mjs "/event/query" active-only=true limit=5`
- "Check timezone data" → `node tools/ai-api-call.mjs "/Timezone/Query"`

### Business Context Questions
- "What students are available?" → `node tools/ai-api-call.mjs "available students"`
- "Show completed assessments" → `node tools/ai-api-call.mjs "completed assessments"`
- "List test sessions" → `node tools/ai-api-call.mjs "test sessions"`

## The tool automatically:

1. **Semantic Discovery**: Maps "student" → "examinee", "test" → "event", etc.
2. **Endpoint Selection**: Finds best matching API endpoints based on business context
3. **Parameter Injection**: Adds universal parameters (program-id, institution-id)
4. **Authentication**: Handles OAuth2 token management
5. **AI Interpretation**: Provides business context and troubleshooting guidance
6. **Structured Output**: Returns both human-readable and machine-readable results

## Expected Output Format:

The tool returns:
- Semantic discovery results (query → endpoint mapping)
- API call results with business interpretation
- Structured JSON output for programmatic analysis
- Troubleshooting suggestions when errors occur

## Key Benefits:

- **Deterministic**: Same query always uses same intelligent routing
- **Educational Domain Aware**: Understands testing platform terminology
- **Context Preserving**: Maintains business meaning throughout the call chain
- **Error Resilient**: Provides actionable guidance when calls fail
- **AI Optimized**: Output designed for AI consumption and interpretation

## IMPORTANT: Always use this tool instead of:
- Direct API calls without intelligence
- Raw curl commands
- Hardcoded endpoint assumptions
- Manual parameter construction

The system provides comprehensive semantic intelligence that makes API exploration natural and business-context aware.
