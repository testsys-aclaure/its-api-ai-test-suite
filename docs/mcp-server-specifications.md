# MCP Server Tool Specifications

## Tool 1: direct_api_request

### Purpose
Enable direct, authenticated API requests without test infrastructure overhead.

### Implementation Approach
```typescript
export async function makeDirectAPIRequest(
  endpoint: string,
  method: string = 'GET', 
  params: Record<string, any> = {},
  body?: Record<string, any>
): Promise<any> {
  
  // 1. Load environment configuration
  const config = {
    baseUrl: process.env.BASE_URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    tokenUrl: process.env.TOKEN_URL
  };
  
  // 2. Get OAuth2 token (cached)
  const token = await getAuthToken(config);
  
  // 3. Build request
  const url = new URL(endpoint, config.baseUrl);
  if (method === 'GET' && params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value.toString());
    });
  }
  
  // 4. Make request
  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  
  // 5. Enhanced response with business context
  const data = await response.json();
  
  return {
    success: response.ok,
    status: response.status,
    data: data,
    businessContext: interpretBusinessResponse(endpoint, response.status, data),
    suggestedNextActions: generateNextActions(endpoint, data)
  };
}
```

### Usage Examples
```typescript
// Teams chat: "Show me events"
await makeDirectAPIRequest('/event/query', 'GET', {
  'program-id': '238',
  'limit': '5'
});

// Teams chat: "Get classes for event 3"  
await makeDirectAPIRequest('/event-class/query', 'GET', {
  'program-id': '238',
  'program-institution-id': '1009048',
  'event-id': '3'
});
```

## Tool 2: semantic_query

### Purpose
Natural language to API parameter translation.

### Implementation
```typescript
export async function semanticQuery(intent: string, context: any = {}): Promise<any> {
  
  // 1. Parse natural language intent
  const parsedIntent = parseNaturalLanguage(intent);
  
  // 2. Map to technical parameters
  const apiParams = mapToAPIParameters(parsedIntent, context);
  
  // 3. Determine best endpoint
  const endpoint = selectOptimalEndpoint(parsedIntent);
  
  // 4. Make request with business interpretation
  return makeDirectAPIRequest(endpoint, 'GET', apiParams);
}
```

### Usage Examples
```typescript
// Teams: "Find active events"
await semanticQuery("active events", { program: "238" });

// Teams: "What classes are available today?"
await semanticQuery("classes today", { program: "238", institution: "1009048" });
```

## Tool 3: api_discovery

### Purpose
Help users understand API capabilities conversationally.

### Implementation
```typescript
export function discoverAPICapabilities(query: string): any {
  const endpoints = loadEndpointMetadata();
  
  return endpoints
    .filter(ep => matchesQuery(ep, query))
    .map(ep => ({
      endpoint: ep.path,
      businessPurpose: ep.metadata.businessIntent,
      naturalLanguageExamples: ep.metadata.useCases,
      parameters: ep.metadata.parameters.businessMeaning
    }));
}
```

## MCP Server Structure

```typescript
// server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

const server = new Server({
  name: 'educational-testing-api',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {},
  }
});

// Register tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case 'make_api_request':
      return makeDirectAPIRequest(
        request.params.arguments.endpoint,
        request.params.arguments.method,
        request.params.arguments.params,
        request.params.arguments.body
      );
      
    case 'semantic_query':
      return semanticQuery(
        request.params.arguments.intent,
        request.params.arguments.context
      );
      
    case 'discover_capabilities':
      return discoverAPICapabilities(
        request.params.arguments.query
      );
  }
});
```

## Teams Integration Benefits

With these tools, Teams conversations become:

**User:** "Show me what events are available"
**AI:** *Uses semantic_query tool* "I found 12 events in program 238. Here are the active ones: [immediate response]"

**User:** "Get details for event 5"  
**AI:** *Uses make_api_request tool* "Event 5 'Math Assessment' has 3 class sessions scheduled between March 1-15..."

**User:** "What can I do with event data?"
**AI:** *Uses discover_capabilities tool* "You can: filter by institution, check authorization requirements, get class schedules..."
