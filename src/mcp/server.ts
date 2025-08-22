/**
 * MCP Server for Educational Testing API
 * Enables direct conversational access to the API
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { ITSApi } from '../api/ITSApi.js';

// Tool definitions
const TOOLS = [
  {
    name: 'make_api_request',
    description: 'Make direct authenticated API requests to the educational testing platform',
    inputSchema: {
      type: 'object',
      properties: {
        endpoint: {
          type: 'string',
          description: 'API endpoint path (e.g., "/event/query", "/event-class/query")',
        },
        method: {
          type: 'string',
          enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          default: 'GET',
          description: 'HTTP method',
        },
        params: {
          type: 'object',
          description: 'Query parameters for GET requests',
          additionalProperties: true,
        },
        body: {
          type: 'object',
          description: 'Request body for POST/PUT requests',
          additionalProperties: true,
        },
      },
      required: ['endpoint'],
    },
  },
  {
    name: 'semantic_query',
    description: 'Make natural language queries to the API with automatic parameter mapping',
    inputSchema: {
      type: 'object',
      properties: {
        intent: {
          type: 'string',
          description: 'Natural language description of what you want (e.g., "find active events", "get classes for event 5")',
        },
        context: {
          type: 'object',
          description: 'Additional context like program, institution, event IDs',
          properties: {
            program: { type: 'string' },
            institution: { type: 'string' },
            event: { type: 'string' },
            limit: { type: 'number' },
          },
        },
      },
      required: ['intent'],
    },
  },
  {
    name: 'discover_api',
    description: 'Discover available API operations and their business purposes',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Business domain to explore (e.g., "testing", "institutions", "events")',
        },
        search: {
          type: 'string',
          description: 'Search for specific functionality',
        },
      },
    },
  },
];

class EducationalTestingMCPServer {
  private server: Server;
  private api: ITSApi | null = null;

  constructor() {
    this.server = new Server(
      {
        name: 'educational-testing-api',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private async initializeAPI(): Promise<ITSApi> {
    if (!this.api) {
      // Load from environment or use defaults
      const baseUrl = process.env.BASE_URL || 'https://api-staging.testsys.io';
      const clientId = process.env.CLIENT_ID || '';
      const clientSecret = process.env.CLIENT_SECRET || '';

      if (!clientId || !clientSecret) {
        throw new Error('API credentials not configured. Set CLIENT_ID and CLIENT_SECRET environment variables.');
      }

      this.api = await ITSApi.create(baseUrl, clientId, clientSecret);
    }
    return this.api;
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOLS,
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'make_api_request':
            return await this.handleDirectAPIRequest(args);
          
          case 'semantic_query':
            return await this.handleSemanticQuery(args);
          
          case 'discover_api':
            return await this.handleAPIDiscovery(args);

          default:
            throw new McpError(ErrorCode.MethodNotFound, `Tool ${name} not found`);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${message}`);
      }
    });
  }

  private async handleDirectAPIRequest(args: any) {
    const api = await this.initializeAPI();
    const { endpoint, method = 'GET', params = {}, body } = args;

    try {
      let result;
      
      // Use the HttpClient directly for maximum flexibility
      switch (method.toLowerCase()) {
        case 'get':
          result = await api.client.get(endpoint, { params });
          break;
        case 'post':
          result = await api.client.post(endpoint, body, { params });
          break;
        case 'put':
          result = await api.client.put(endpoint, body, { params });
          break;
        case 'delete':
          result = await api.client.delete(endpoint, { params });
          break;
        case 'patch':
          result = await api.client.patch(endpoint, body, { params });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              endpoint,
              method,
              params,
              data: result,
              timestamp: new Date().toISOString(),
              businessContext: this.interpretBusinessContext(endpoint, result),
            }, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: false,
              endpoint,
              method,
              params,
              error: {
                message: error.message,
                status: error.status,
                businessContext: error.status === 422 ? 
                  'Business validation response - may be expected behavior' : 
                  'Technical error requiring investigation',
              },
              timestamp: new Date().toISOString(),
            }, null, 2),
          },
        ],
      };
    }
  }

  private async handleSemanticQuery(args: any) {
    const { intent, context = {} } = args;

    // Parse natural language intent to API parameters
    const mappedQuery = this.mapNaturalLanguageToAPI(intent, context);
    
    // Make the API request
    return this.handleDirectAPIRequest(mappedQuery);
  }

  private async handleAPIDiscovery(args: any) {
    const api = await this.initializeAPI();
    const { domain, search } = args;

    let operations = api.discovery.getAllOperations();

    // Filter by domain if specified
    if (domain) {
      operations = operations.filter(op => 
        op.domain?.toLowerCase().includes(domain.toLowerCase()) ||
        op.name.toLowerCase().includes(domain.toLowerCase())
      );
    }

    // Filter by search term if specified
    if (search) {
      operations = operations.filter(op =>
        op.name.toLowerCase().includes(search.toLowerCase()) ||
        op.description?.toLowerCase().includes(search.toLowerCase()) ||
        op.businessContext?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            availableOperations: operations.slice(0, 20), // Limit to first 20
            totalCount: operations.length,
            domains: [...new Set(operations.map(op => op.domain).filter(Boolean))],
            searchTerm: search,
            domainFilter: domain,
          }, null, 2),
        },
      ],
    };
  }

  private mapNaturalLanguageToAPI(intent: string, context: any) {
    const intentLower = intent.toLowerCase();
    
    // Default context
    const defaultContext = {
      'program-id': context.program || process.env.DEFAULT_PROGRAM_ID || '238',
      'program-institution-id': context.institution || process.env.PROGRAM_INSTITUTION_ID || '1009048',
      'limit': context.limit || '10',
    };

    // Intent mapping patterns
    if (intentLower.includes('event') && (intentLower.includes('find') || intentLower.includes('get') || intentLower.includes('show'))) {
      if (intentLower.includes('active')) {
        return {
          endpoint: '/event/query',
          method: 'GET',
          params: { ...defaultContext, 'active-only': 'true' },
        };
      }
      return {
        endpoint: '/event/query',
        method: 'GET',
        params: defaultContext,
      };
    }

    if (intentLower.includes('class') && (intentLower.includes('find') || intentLower.includes('get') || intentLower.includes('show'))) {
      const params = { ...defaultContext };
      if (context.event) {
        params['event-id'] = context.event;
      }
      return {
        endpoint: '/event-class/query',
        method: 'GET',
        params,
      };
    }

    if (intentLower.includes('authorization') || intentLower.includes('auth')) {
      const params = { ...defaultContext };
      if (context.event) {
        params['event-id'] = context.event;
      }
      return {
        endpoint: '/event/authorizations/query',
        method: 'GET',
        params,
      };
    }

    // Default to events if unclear
    return {
      endpoint: '/event/query',
      method: 'GET',
      params: defaultContext,
    };
  }

  private interpretBusinessContext(endpoint: string, result: any): string {
    const endpointLower = endpoint.toLowerCase();

    if (endpointLower.includes('event') && !endpointLower.includes('class')) {
      const count = Array.isArray(result) ? result.length : 'unknown';
      return `Retrieved ${count} events from the testing platform. These represent available test administrations.`;
    }

    if (endpointLower.includes('event-class') || endpointLower.includes('class')) {
      const count = Array.isArray(result) ? result.length : 'unknown';
      return `Found ${count} class sessions. These represent scheduled test sessions for students.`;
    }

    if (endpointLower.includes('authorization')) {
      const count = Array.isArray(result) ? result.length : 'unknown';
      return `Retrieved ${count} authorization records. These control which students can access specific tests.`;
    }

    return 'API request completed successfully.';
  }

  async start() {
    const transport = this.server.createStdioTransport();
    await this.server.connect(transport);
    console.error('Educational Testing API MCP Server started');
  }
}

// Start server if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new EducationalTestingMCPServer();
  server.start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

export { EducationalTestingMCPServer };
