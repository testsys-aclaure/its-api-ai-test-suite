/**
 * Direct API Tools - AI-NATIVE
 * Built on proven oauth-client.ts for instant conversational access
 */

import { authenticatedRequest } from '../auth/oauth-client.js';
import { EnvironmentConfig } from '../config/environment.js';

/**
 * Instant API access for AI agents
 * Uses proven authenticatedRequest() - no complex infrastructure
 */
export class DirectAPITools {
  
  /**
   * Make direct authenticated API request
   * Returns in 2-3 seconds with business context
   */
  static async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const startTime = Date.now();
    
    try {
      // Use environment configuration
      const baseUrl = process.env.BASE_URL || 'https://api-staging.testsys.io';
      const programId = process.env.DEFAULT_PROGRAM_ID || '238';
      
      // Add universal parameters that most endpoints need
      const standardParams = {
        'program-id': programId,
        'program-institution-id': process.env.PROGRAM_INSTITUTION_ID || '1009048',
        ...params
      };
      
      // Build URL with query parameters
      const queryString = new URLSearchParams(standardParams).toString();
      const url = `${baseUrl}${endpoint}?${queryString}`;
      
      console.log(`🚀 API Request: ${endpoint}`);
      
      // Use proven authenticatedRequest
      const response = await authenticatedRequest('GET', url);
      
      const responseTime = Date.now() - startTime;
      const data = await response.json();
      
      // Return structured response with business context
      const result = {
        success: response.ok,
        endpoint,
        httpStatus: response.status,
        responseTime: `${responseTime}ms`,
        data,
        businessContext: this.interpretBusinessContext(endpoint, data),
        metadata: {
          count: Array.isArray(data) ? data.length : 1,
          type: Array.isArray(data) ? 'array' : typeof data,
          timestamp: new Date().toISOString(),
          parameters: standardParams
        }
      };
      
      console.log(`✅ Success: ${result.metadata.count} items in ${responseTime}ms`);
      return result;
      
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      const errorResult = {
        success: false,
        endpoint,
        httpStatus: error.status || 500,
        responseTime: `${responseTime}ms`,
        error: {
          message: error.message,
          status: error.status,
          businessContext: this.interpretErrorContext(endpoint, error)
        },
        troubleshooting: this.generateTroubleshooting(endpoint, error),
        timestamp: new Date().toISOString()
      };
      
      console.log(`❌ Error: ${error.message} (${responseTime}ms)`);
      return errorResult;
    }
  }
  
  /**
   * Natural language query interface for AI agents
   * Maps human intent to API endpoints
   */
  static async query(intent: string, context: Record<string, any> = {}): Promise<any> {
    console.log(`🧠 Semantic Query: "${intent}"`);
    
    // Map natural language to endpoints
    const intentMap: Record<string, string> = {
      // Event operations
      'active events': '/event/query',
      'find events': '/event/query', 
      'list events': '/event/query',
      'show events': '/event/query',
      'get events': '/event/query',
      
      // Event class operations  
      'event classes': '/event-class/Query',
      'classes': '/event-class/Query',
      'class sessions': '/event-class/Query',
      'sessions': '/event-class/Query',
      
      // Authorization operations
      'authorizations': '/event/authorizations/Query',
      'auth': '/event/authorizations/Query',
      'permissions': '/event/authorizations/Query',
      'access': '/event/authorizations/Query',
      
      // Institution operations
      'institutions': '/channel/institutions/query',
      'schools': '/channel/institutions/query',
      
      // Form operations
      'forms': '/form/query',
      'test forms': '/form/query',
      
      // Test operations  
      'tests': '/test/query'
    };
    
    const normalizedIntent = intent.toLowerCase().trim();
    let endpoint = intentMap[normalizedIntent];
    
    // Fallback logic for partial matches
    if (!endpoint) {
      if (normalizedIntent.includes('event') && normalizedIntent.includes('class')) {
        endpoint = '/event-class/Query';
      } else if (normalizedIntent.includes('event')) {
        endpoint = '/event/query';
      } else if (normalizedIntent.includes('auth')) {
        endpoint = '/event/authorizations/Query';
      } else {
        endpoint = '/event/query'; // Default fallback
      }
    }
    
    // Add semantic parameters
    const params = { ...context };
    
    if (normalizedIntent.includes('active')) {
      params['active-only'] = 'true';
    }
    
    if (context.limit) {
      params['limit'] = context.limit.toString();
    }
    
    console.log(`🎯 Mapped to: ${endpoint}`);
    return this.makeRequest(endpoint, params);
  }
  
  /**
   * Discover available API operations
   */
  static async discover(search?: string): Promise<any> {
    const capabilities = {
      'Event Management': {
        endpoints: ['/event/query', '/event-class/Query', '/event/authorizations/Query'],
        capabilities: ['Find test events', 'Get class sessions', 'Check permissions'],
        examples: ['active events', 'event classes', 'authorizations']
      },
      'Institution Management': {
        endpoints: ['/channel/institutions/query'],
        capabilities: ['List educational institutions'],
        examples: ['institutions', 'schools']
      },
      'Form Management': {
        endpoints: ['/form/query'],
        capabilities: ['Access test forms and assessments'],
        examples: ['forms', 'test forms']
      },
      'Test Management': {
        endpoints: ['/test/query'],
        capabilities: ['Manage test configurations'],
        examples: ['tests']
      }
    };
    
    const result = {
      success: true,
      search,
      totalDomains: Object.keys(capabilities).length,
      capabilities,
      examples: [
        'DirectAPITools.query("active events")',
        'DirectAPITools.query("event classes")',
        'DirectAPITools.query("authorizations")',
        'DirectAPITools.makeRequest("/event/query", { limit: "5" })'
      ],
      timestamp: new Date().toISOString()
    };
    
    if (search) {
      console.log(`🔍 Discovery search: "${search}"`);
      // Filter capabilities by search term
      const filtered = Object.fromEntries(
        Object.entries(capabilities).filter(([domain, info]) =>
          domain.toLowerCase().includes(search.toLowerCase()) ||
          info.capabilities.some(cap => cap.toLowerCase().includes(search.toLowerCase()))
        )
      );
      result.capabilities = filtered as typeof capabilities;
    }
    
    return result;
  }
  
  // Helper methods for business context
  private static interpretBusinessContext(endpoint: string, data: any): string {
    const path = endpoint.toLowerCase();
    
    if (path.includes('/event/query')) {
      const count = Array.isArray(data) ? data.length : 0;
      return `Retrieved ${count} test events. These represent scheduled test administrations available to students in the educational testing platform.`;
    }
    
    if (path.includes('/event-class')) {
      const count = Array.isArray(data) ? data.length : 0;
      return `Found ${count} class sessions. These are specific scheduled test sessions with time slots, capacity limits, and enrollment details.`;
    }
    
    if (path.includes('/authorization')) {
      const count = Array.isArray(data) ? data.length : 0;
      return `Retrieved ${count} authorization records. These control which students can access specific tests and events in the system.`;
    }
    
    if (path.includes('/institution')) {
      const count = Array.isArray(data) ? data.length : 0;
      return `Retrieved ${count} educational institutions. These are schools and organizations that administer tests through the platform.`;
    }
    
    return `Educational testing API response from ${endpoint}`;
  }
  
  private static interpretErrorContext(endpoint: string, error: any): string {
    if (error.status === 422) {
      return 'Business validation response - this may be expected when no data matches the query criteria.';
    }
    if (error.status === 401) {
      return 'Authentication failed - check API credentials and token validity.';
    }
    if (error.status === 404) {
      return 'Resource not found - verify endpoint path and parameters.';
    }
    if (error.status === 400) {
      return 'Bad request - check parameter format and required fields.';
    }
    return 'API request failed - check connectivity and server status.';
  }
  
  private static generateTroubleshooting(endpoint: string, error: any): string[] {
    const tips: string[] = [];
    
    if (error.status === 422) {
      tips.push('This is often expected behavior when no records match the query');
      tips.push('Try different parameters or verify the data exists');
      tips.push('Check if the endpoint requires specific institution access');
    } else if (error.status === 401) {
      tips.push('Verify CLIENT_ID and CLIENT_SECRET environment variables');
      tips.push('Check if OAuth2 token has expired');
      tips.push('Confirm API credentials are valid for the environment');
    } else if (error.status === 404) {
      tips.push('Verify the endpoint path is correct');
      tips.push('Check if required parameters are provided');
      tips.push('Confirm the resource exists in the system');
    } else {
      tips.push('Check network connectivity');
      tips.push('Verify API server status');
      tips.push('Review request parameters and format');
    }
    
    return tips;
  }
}

/**
 * Quick access functions for common operations
 */
export const QuickAPI = {
  
  // Event operations
  async getEvents(limit = 10): Promise<any> {
    return DirectAPITools.makeRequest('/event/query', { limit: limit.toString() });
  },
  
  async getActiveEvents(limit = 10): Promise<any> {
    return DirectAPITools.query('active events', { limit });
  },
  
  async getEventClasses(eventId?: string): Promise<any> {
    const params = eventId ? { 'event-id': eventId } : {};
    return DirectAPITools.makeRequest('/event-class/Query', params);
  },
  
  async checkAuthorizations(eventId?: string): Promise<any> {
    const params = eventId ? { 'event-id': eventId } : {};
    return DirectAPITools.makeRequest('/event/authorizations/Query', params);
  },
  
  // Institution operations
  async getInstitutions(): Promise<any> {
    return DirectAPITools.makeRequest('/channel/institutions/query');
  }
};

export default DirectAPITools;
