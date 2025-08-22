/**
 * Direct API Request Tool for AI Assistants
 * Enables instant, authenticated API requests without test infrastructure
 */

import { ITSApi } from '../api/ITSApi.js';

// Global API instance for reuse
let apiInstance: ITSApi | null = null;

/**
 * Initialize or get existing API instance
 */
async function getAPIInstance(): Promise<ITSApi> {
  if (!apiInstance) {
    const baseUrl = process.env.BASE_URL || 'https://api-staging.testsys.io';
    const clientId = process.env.CLIENT_ID || '';
    const clientSecret = process.env.CLIENT_SECRET || '';

    if (!clientId || !clientSecret) {
      throw new Error('❌ API credentials not configured. Set CLIENT_ID and CLIENT_SECRET environment variables.');
    }

    console.log('🔧 Creating new API instance...');
    apiInstance = await ITSApi.create(baseUrl, clientId, clientSecret);
    console.log('✅ API instance ready');
  }
  return apiInstance;
}

/**
 * TOOL: Make direct authenticated API request
 * Usage: Direct conversational API access for AI agents
 */
export async function makeAPIRequest(
  endpoint: string,
  method: string = 'GET',
  params: Record<string, any> = {},
  body?: any
): Promise<any> {
  
  console.log(`\n🚀 Direct API Request: ${method} ${endpoint}`);
  console.log('📋 Parameters:', params);
  
  try {
    const api = await getAPIInstance();
    let result: any;

    // Use HttpClient directly for maximum flexibility
    switch (method.toUpperCase()) {
      case 'GET':
        result = await (api as any).client.get(endpoint, { params });
        break;
      case 'POST':
        result = await (api as any).client.post(endpoint, body, { params });
        break;
      case 'PUT':
        result = await (api as any).client.put(endpoint, body, { params });
        break;
      case 'DELETE':
        result = await (api as any).client.delete(endpoint, { params });
        break;
      case 'PATCH':
        result = await (api as any).client.patch(endpoint, body, { params });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    // Format successful response
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      request: { endpoint, method, params, body },
      data: result,
      businessContext: interpretBusinessContext(endpoint, result),
      metadata: {
        count: Array.isArray(result) ? result.length : 1,
        type: Array.isArray(result) ? 'array' : typeof result,
        firstItem: Array.isArray(result) && result.length > 0 ? result[0] : null,
      },
    };

    console.log(`✅ Success! Retrieved ${Array.isArray(result) ? result.length : 1} item(s)`);
    return response;

  } catch (error: any) {
    // Format error response with business context
    const errorResponse = {
      success: false,
      timestamp: new Date().toISOString(),
      request: { endpoint, method, params, body },
      error: {
        message: error.message,
        status: error.status,
        businessContext: interpretErrorContext(endpoint, error),
        troubleshooting: generateTroubleshooting(endpoint, error),
      },
    };

    console.log(`❌ Error: ${error.message} (HTTP ${error.status || 'unknown'})`);
    return errorResponse;
  }
}

/**
 * TOOL: Semantic query with natural language
 * Usage: "find active events", "get classes for event 5", etc.
 */
export async function semanticQuery(
  intent: string,
  context: Record<string, any> = {}
): Promise<any> {
  
  console.log(`\n🧠 Semantic Query: "${intent}"`);
  console.log('🔗 Context:', context);

  // Map natural language to API parameters
  const apiCall = mapIntentToAPI(intent, context);
  console.log('🎯 Mapped to:', apiCall);

  // Make the API request
  return makeAPIRequest(apiCall.endpoint, apiCall.method, apiCall.params, apiCall.body);
}

/**
 * TOOL: Discover API capabilities
 */
export async function discoverAPI(domain?: string, search?: string): Promise<any> {
  try {
    const api = await getAPIInstance();
    let operations = api.discovery.getAllOperations();

    // Apply filters
    if (domain) {
      operations = operations.filter((op: any) => 
        op.domain?.toLowerCase().includes(domain.toLowerCase()) ||
        op.name?.toLowerCase().includes(domain.toLowerCase())
      );
    }

    if (search) {
      operations = operations.filter((op: any) =>
        op.name?.toLowerCase().includes(search.toLowerCase()) ||
        op.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return {
      success: true,
      timestamp: new Date().toISOString(),
      query: { domain, search },
      results: {
        operations: operations.slice(0, 15), // Limit for readability
        totalCount: operations.length,
        domains: [...new Set(operations.map((op: any) => op.domain).filter(Boolean))],
        businessCapabilities: generateBusinessCapabilities(operations.slice(0, 10)),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      timestamp: new Date().toISOString(),
      error: error.message,
    };
  }
}

// Helper functions
function mapIntentToAPI(intent: string, context: any): any {
  const intentLower = intent.toLowerCase();
  
  // Default parameters
  const defaultParams: Record<string, any> = {
    'program-id': context.program || process.env.DEFAULT_PROGRAM_ID || '238',
    'program-institution-id': context.institution || process.env.PROGRAM_INSTITUTION_ID || '1009048',
    'limit': context.limit || '10',
  };

  // Intent mapping patterns
  if (intentLower.includes('event') && (intentLower.includes('find') || intentLower.includes('get') || intentLower.includes('show') || intentLower.includes('list'))) {
    const params = { ...defaultParams };
    if (intentLower.includes('active')) {
      params['active-only'] = 'true';
    }
    return {
      endpoint: '/event/query',
      method: 'GET',
      params,
      body: undefined,
    };
  }

  if (intentLower.includes('class')) {
    const params = { ...defaultParams };
    if (context.event) {
      params['event-id'] = context.event;
    }
    return {
      endpoint: '/event-class/query', 
      method: 'GET',
      params,
      body: undefined,
    };
  }

  if (intentLower.includes('authorization') || intentLower.includes('auth')) {
    const params = { ...defaultParams };
    if (context.event) {
      params['event-id'] = context.event;
    }
    return {
      endpoint: '/event/authorizations/query',
      method: 'GET', 
      params,
      body: undefined,
    };
  }

  if (intentLower.includes('institution')) {
    return {
      endpoint: '/institution/query',
      method: 'GET',
      params: { ...defaultParams },
      body: undefined,
    };
  }

  // Default fallback
  return {
    endpoint: '/event/query',
    method: 'GET',
    params: defaultParams,
    body: undefined,
  };
}

function interpretBusinessContext(endpoint: string, result: any): string {
  const endpointLower = endpoint.toLowerCase();

  if (endpointLower.includes('/event/query')) {
    const count = Array.isArray(result) ? result.length : 'unknown';
    return `Retrieved ${count} test events. Events represent scheduled test administrations available to students.`;
  }

  if (endpointLower.includes('/event-class')) {
    const count = Array.isArray(result) ? result.length : 'unknown';
    return `Found ${count} class sessions. These are specific scheduled test sessions with time slots and capacity limits.`;
  }

  if (endpointLower.includes('/authorization')) {
    const count = Array.isArray(result) ? result.length : 'unknown';
    return `Retrieved ${count} authorization records. These control student access to specific tests and events.`;
  }

  if (endpointLower.includes('/institution')) {
    const count = Array.isArray(result) ? result.length : 'unknown';
    return `Retrieved ${count} institutions. These are educational organizations that administer tests.`;
  }

  return 'API request completed successfully.';
}

function interpretErrorContext(endpoint: string, error: any): string {
  if (error.status === 422) {
    return 'Business validation response - this may be expected behavior when no data matches the query criteria.';
  }
  
  if (error.status === 401) {
    return 'Authentication failed - check API credentials and token validity.';
  }
  
  if (error.status === 404) {
    return 'Resource not found - verify endpoint path and required parameters.';
  }
  
  if (error.status === 400) {
    return 'Bad request - check parameter format and required fields.';
  }
  
  return 'Technical error occurred - investigate connectivity and server status.';
}

function generateTroubleshooting(endpoint: string, error: any): string[] {
  const suggestions: string[] = [];
  
  if (error.status === 422 && endpoint.includes('authorization')) {
    suggestions.push('This is expected when an event has no authorization requirements');
    suggestions.push('Try a different event-id to see authorization records');
    suggestions.push('Check if the event requires student registration');
  }
  
  if (error.status === 401) {
    suggestions.push('Verify CLIENT_ID and CLIENT_SECRET environment variables');
    suggestions.push('Check if OAuth2 token has expired');
    suggestions.push('Confirm API credentials are valid');
  }
  
  if (error.status === 404) {
    suggestions.push('Verify the endpoint path is correct');
    suggestions.push('Check if required parameters are provided');
    suggestions.push('Confirm the resource exists in the system');
  }
  
  if (suggestions.length === 0) {
    suggestions.push('Check network connectivity');
    suggestions.push('Verify API server status');
    suggestions.push('Review request parameters and format');
  }
  
  return suggestions;
}

function generateBusinessCapabilities(operations: any[]): string[] {
  const capabilities = new Set<string>();
  
  operations.forEach(op => {
    if (op.name?.includes('event')) {
      capabilities.add('Manage test events and schedules');
    }
    if (op.name?.includes('class')) {
      capabilities.add('Handle class sessions and enrollment');
    }
    if (op.name?.includes('institution')) {
      capabilities.add('Manage educational institutions');
    }
    if (op.name?.includes('student') || op.name?.includes('examinee')) {
      capabilities.add('Student registration and management');
    }
    if (op.name?.includes('authorization')) {
      capabilities.add('Control test access and permissions');
    }
    if (op.name?.includes('report')) {
      capabilities.add('Generate reports and analytics');
    }
  });
  
  return Array.from(capabilities);
}

// Export for external usage
export {
  getAPIInstance,
  mapIntentToAPI,
  interpretBusinessContext,
  interpretErrorContext,
  generateTroubleshooting,
};
