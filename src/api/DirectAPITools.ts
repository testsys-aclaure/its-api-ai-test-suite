/**
 * Direct API Tools - AI-NATIVE
 * Provides natural language access to educational testing platform APIs
 * 
 * AI-Native Features:
 * - Natural language query interface: query("active events")
 * - Direct API access: makeRequest("/event/query") 
 * - Self-descriptive responses with business context
 * - Universal parameter injection
 * - Richardson Maturity Model Level 3 compliance
 * - Built-in error handling with troubleshooting guidance
 */

import { EnvironmentConfig } from '../config/EnvironmentConfig.js';
import { OAuth2Client } from '../auth/OAuth2Client.js';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata: {
    endpoint: string;
    method: string;
    responseTime: number;
    httpStatus: number;
    timestamp: string;
    businessContext?: string;
    universalParametersApplied?: Record<string, string>;
    troubleshooting?: string[];
  };
  hypermedia?: {
    self: string;
    related: Array<{
      rel: string;
      href: string;
      description: string;
    }>;
  };
}

export interface QueryMapping {
  pattern: RegExp;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  businessContext: string;
  parameters?: Record<string, any>;
}

/**
 * AI-NATIVE Direct API Tools for Educational Testing Platform
 * Enables conversational AI access through natural language queries
 */
export class DirectAPITools {
  private static initialized = false;

  /**
   * Initialize the Direct API Tools
   * Must be called before using any other methods
   */
  static async initialize(): Promise<void> {
    if (this.initialized) return;

    await EnvironmentConfig.initialize();
    this.initialized = true;

    console.log('✅ Direct API Tools initialized');
  }

  /**
   * AI-NATIVE: Natural language query interface
   * Transform conversational queries into API calls
   * 
   * Examples:
   * - query("active events") -> /event/query
   * - query("student progress") -> /student/progress
   * - query("test results") -> /result/query
   */
  static async query(naturalLanguageQuery: string): Promise<APIResponse> {
    this.ensureInitialized();
    
    const startTime = Date.now();
    
    try {
      console.log(`🤖 Processing natural language query: "${naturalLanguageQuery}"`);
      
      // Map natural language to API endpoint
      const mapping = this.mapQueryToEndpoint(naturalLanguageQuery);
      
      if (!mapping) {
        return {
          success: false,
          error: `No API mapping found for query: "${naturalLanguageQuery}"`,
          metadata: {
            endpoint: 'unknown',
            method: 'GET',
            responseTime: Date.now() - startTime,
            httpStatus: 0,
            timestamp: new Date().toISOString(),
            troubleshooting: [
              'Try more specific queries like "active events" or "test results"',
              'Use direct API access with makeRequest() for exact endpoints',
              'Check available query patterns with getAvailableQueries()'
            ]
          }
        };
      }
      
      console.log(`🎯 Mapped to endpoint: ${mapping.method} ${mapping.endpoint}`);
      
      // Execute the mapped API call
      return await this.makeRequest(mapping.endpoint, mapping.method, mapping.parameters);
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        metadata: {
          endpoint: 'query-processing',
          method: 'GET',
          responseTime: Date.now() - startTime,
          httpStatus: 0,
          timestamp: new Date().toISOString(),
          troubleshooting: [
            'Check network connectivity',
            'Verify API authentication',
            'Try a simpler query'
          ]
        }
      };
    }
  }

  /**
   * AI-NATIVE: Direct API access with full control
   * Make authenticated requests to any endpoint with automatic parameter injection
   */
  static async makeRequest(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    additionalParams?: Record<string, any>
  ): Promise<APIResponse> {
    this.ensureInitialized();
    
    const startTime = Date.now();
    
    try {
      // Get authenticated components
      const baseUrl = EnvironmentConfig.getBaseUrl();
      const accessToken = await OAuth2Client.getAccessToken();
      const universalParams = EnvironmentConfig.getUniversalParameters();
      
      // Merge parameters
      const allParams = { ...universalParams, ...additionalParams };
      
      // Build URL
      let fullUrl = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
      
      if (method === 'GET' && Object.keys(allParams).length > 0) {
        const queryString = new URLSearchParams(allParams).toString();
        fullUrl += `?${queryString}`;
      }
      
      console.log(`🌐 Making ${method} request to: ${fullUrl}`);
      
      // Prepare request
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      
      // Add body for non-GET requests
      if (method !== 'GET' && additionalParams) {
        requestOptions.body = JSON.stringify(additionalParams);
      }
      
      // Make the request
      const response = await fetch(fullUrl, requestOptions);
      const responseTime = Date.now() - startTime;
      
      // Parse response
      const responseText = await response.text();
      let responseData: any = null;
      
      try {
        responseData = JSON.parse(responseText);
      } catch {
        // Response not JSON - store as text
        responseData = responseText;
      }
      
      // Build AI-native response
      const apiResponse: APIResponse = {
        success: response.ok,
        data: responseData,
        metadata: {
          endpoint: fullUrl,
          method,
          responseTime,
          httpStatus: response.status,
          timestamp: new Date().toISOString(),
          businessContext: this.getBusinessContext(endpoint),
          universalParametersApplied: universalParams
        }
      };
      
      // Add error information if not successful
      if (!response.ok) {
        apiResponse.error = `HTTP ${response.status}: ${response.statusText}`;
        apiResponse.metadata.troubleshooting = this.getTroubleshootingTips(response.status, endpoint);
      }
      
      // Add hypermedia controls (Richardson Level 3)
      apiResponse.hypermedia = this.generateHypermediaControls(endpoint, method, responseData);
      
      console.log(`${response.ok ? '✅' : '❌'} Request completed in ${responseTime}ms (HTTP ${response.status})`);
      
      return apiResponse;
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        metadata: {
          endpoint: `${EnvironmentConfig.getBaseUrl()}${endpoint}`,
          method,
          responseTime,
          httpStatus: 0,
          timestamp: new Date().toISOString(),
          businessContext: this.getBusinessContext(endpoint),
          troubleshooting: [
            'Check network connectivity to staging environment',
            'Verify OAuth2 authentication is working',
            'Ensure endpoint path is correct',
            'Check if the API service is available'
          ]
        }
      };
    }
  }

  /**
   * AI-NATIVE: Quick API convenience methods for common operations
   */
  static async getEvents(): Promise<APIResponse> {
    return await this.makeRequest('/event/query');
  }

  static async getEventById(eventId: string): Promise<APIResponse> {
    return await this.makeRequest(`/event/${eventId}`);
  }

  static async getStudents(): Promise<APIResponse> {
    return await this.makeRequest('/student/query');
  }

  static async getResults(): Promise<APIResponse> {
    return await this.makeRequest('/result/query');
  }

  static async getInstitutions(): Promise<APIResponse> {
    return await this.makeRequest('/institution/query');
  }

  /**
   * Map natural language queries to API endpoints
   */
  private static mapQueryToEndpoint(query: string): QueryMapping | null {
    const normalizedQuery = query.toLowerCase().trim();
    
    const mappings: QueryMapping[] = [
      {
        pattern: /\b(events?|test\s+sessions?|active\s+events?)\b/i,
        endpoint: '/event/query',
        method: 'GET',
        description: 'Query test events and sessions',
        businessContext: 'Retrieve information about scheduled test events and sessions'
      },
      {
        pattern: /\b(students?|test\s+takers?|participants?)\b/i,
        endpoint: '/student/query',
        method: 'GET',
        description: 'Query student information',
        businessContext: 'Retrieve information about students and test participants'
      },
      {
        pattern: /\b(results?|scores?|outcomes?|test\s+results?)\b/i,
        endpoint: '/result/query',
        method: 'GET',
        description: 'Query test results and scores',
        businessContext: 'Retrieve test results, scores, and outcome data'
      },
      {
        pattern: /\b(institutions?|schools?|organizations?)\b/i,
        endpoint: '/institution/query',
        method: 'GET',
        description: 'Query institutional information',
        businessContext: 'Retrieve information about institutions and organizations'
      },
      {
        pattern: /\b(programs?|test\s+programs?)\b/i,
        endpoint: '/program/query',
        method: 'GET',
        description: 'Query program information',
        businessContext: 'Retrieve information about test programs and configurations'
      }
    ];
    
    for (const mapping of mappings) {
      if (mapping.pattern.test(normalizedQuery)) {
        return mapping;
      }
    }
    
    return null;
  }

  /**
   * Get business context for endpoints
   */
  private static getBusinessContext(endpoint: string): string {
    const contexts: Record<string, string> = {
      '/event': 'Test event management and session scheduling',
      '/student': 'Student information and test taker management',
      '/result': 'Test results, scores, and performance data',
      '/institution': 'Institution and organization management',
      '/program': 'Test program configuration and settings'
    };
    
    for (const [path, context] of Object.entries(contexts)) {
      if (endpoint.includes(path)) {
        return context;
      }
    }
    
    return 'Educational testing platform operations';
  }

  /**
   * Generate troubleshooting tips based on HTTP status
   */
  private static getTroubleshootingTips(status: number, endpoint: string): string[] {
    const tips: string[] = [];
    
    switch (status) {
      case 401:
        tips.push('Authentication failed - check OAuth2 credentials');
        tips.push('Token may have expired - try clearing cache');
        break;
      case 403:
        tips.push('Access forbidden - check user permissions');
        tips.push('Verify program and institution access rights');
        break;
      case 404:
        tips.push(`Endpoint not found: ${endpoint}`);
        tips.push('Check if the endpoint path is correct');
        break;
      case 429:
        tips.push('Rate limit exceeded - wait before retrying');
        tips.push('Consider implementing request throttling');
        break;
      case 500:
        tips.push('Server error - API service may be temporarily unavailable');
        tips.push('Check system status or try again later');
        break;
      default:
        tips.push('Check network connectivity and API service status');
        tips.push('Verify request parameters and format');
    }
    
    return tips;
  }

  /**
   * Generate Richardson Level 3 hypermedia controls
   */
  private static generateHypermediaControls(
    endpoint: string, 
    method: string, 
    responseData: any
  ): APIResponse['hypermedia'] {
    const baseUrl = EnvironmentConfig.getBaseUrl();
    const controls = {
      self: `${baseUrl}${endpoint}`,
      related: [] as Array<{ rel: string; href: string; description: string }>
    };

    // Add related endpoints based on current endpoint
    if (endpoint.includes('/event')) {
      controls.related.push(
        { rel: 'students', href: `${baseUrl}/student/query`, description: 'Get students for this event' },
        { rel: 'results', href: `${baseUrl}/result/query`, description: 'Get results for this event' }
      );
    }
    
    if (endpoint.includes('/student')) {
      controls.related.push(
        { rel: 'events', href: `${baseUrl}/event/query`, description: 'Get events for this student' },
        { rel: 'results', href: `${baseUrl}/result/query`, description: 'Get results for this student' }
      );
    }
    
    if (endpoint.includes('/result')) {
      controls.related.push(
        { rel: 'event', href: `${baseUrl}/event/query`, description: 'Get event for this result' },
        { rel: 'student', href: `${baseUrl}/student/query`, description: 'Get student for this result' }
      );
    }

    return controls;
  }

  /**
   * Get available query patterns for AI assistance
   */
  static getAvailableQueries(): Array<{
    pattern: string;
    examples: string[];
    endpoint: string;
    description: string;
  }> {
    return [
      {
        pattern: 'events',
        examples: ['active events', 'test sessions', 'event query'],
        endpoint: '/event/query',
        description: 'Query test events and sessions'
      },
      {
        pattern: 'students', 
        examples: ['students', 'test takers', 'participants'],
        endpoint: '/student/query',
        description: 'Query student information'
      },
      {
        pattern: 'results',
        examples: ['test results', 'scores', 'outcomes'],
        endpoint: '/result/query', 
        description: 'Query test results and scores'
      },
      {
        pattern: 'institutions',
        examples: ['institutions', 'schools', 'organizations'],
        endpoint: '/institution/query',
        description: 'Query institutional information'
      },
      {
        pattern: 'programs',
        examples: ['programs', 'test programs'],
        endpoint: '/program/query',
        description: 'Query program information'
      }
    ];
  }

  /**
   * Get API status and diagnostics
   */
  static async getAPIStatus(): Promise<{
    authentication: any;
    environment: any;
    connectivity: {
      baseUrl: string;
      accessible: boolean;
      responseTime?: number;
    };
    readyForQueries: boolean;
  }> {
    try {
      await this.initialize();
      
      const authStatus = OAuth2Client.getAuthenticationStatus();
      const envReport = EnvironmentConfig.getConfigurationReport();
      
      // Test basic connectivity
      const startTime = Date.now();
      const connectivityTest = await this.makeRequest('/event/query');
      const responseTime = Date.now() - startTime;
      
      return {
        authentication: authStatus,
        environment: envReport,
        connectivity: {
          baseUrl: EnvironmentConfig.getBaseUrl(),
          accessible: connectivityTest.success,
          responseTime
        },
        readyForQueries: authStatus.isAuthenticated && connectivityTest.success
      };
    } catch (error) {
      return {
        authentication: { isAuthenticated: false },
        environment: {},
        connectivity: {
          baseUrl: 'unknown',
          accessible: false
        },
        readyForQueries: false
      };
    }
  }

  /**
   * Ensure the tools are initialized
   */
  private static ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('❌ DirectAPITools not initialized. Call DirectAPITools.initialize() first.');
    }
  }
}
