import type { APIParameters, SemanticIntent, EndpointMetadata } from '../types/parameters.js';
import { authenticatedRequest } from '../auth/oauth-client.js';
import { UniversalValidators } from '../validation/universal-validators.js';

/**
 * Base class for all API endpoint implementations
 * Provides common patterns for GET, POST, PUT, PATCH, DELETE operations
 */
export abstract class BaseEndpoint {
  /**
   * Each endpoint must define its metadata for AI discovery
   */
  static readonly metadata: EndpointMetadata;
  
  /**
   * Execute the endpoint with full validation and error handling
   */
  static async execute(params: APIParameters, body?: any): Promise<any> {
    throw new Error('Subclasses must implement execute method');
  }
  
  /**
   * Semantic interface for natural language interaction
   */
  static async semantic(intent: SemanticIntent): Promise<any> {
    throw new Error('Subclasses must implement semantic method');
  }
  
  /**
   * Common parameter validation pattern
   */
  protected static validateCommonParams(params: APIParameters): void {
    UniversalValidators.validateProgramId(params);
  }
  
  /**
   * Common request execution pattern with error handling
   */
  protected static async executeRequest(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string, 
    params: APIParameters,
    body?: any
  ): Promise<any> {
    try {
      return await authenticatedRequest(method, path, params, body);
    } catch (error: any) {
      // Enhanced error context for debugging
      const errorContext = {
        endpoint: path,
        method: method,
        params: params,
        status: error.status,
        businessContext: this.metadata?.businessDomain || 'Unknown'
      };
      
      throw error;
    }
  }
}

/**
 * Base class specifically for GET endpoints
 */
export abstract class BaseGetEndpoint extends BaseEndpoint {
  static async execute(params: APIParameters): Promise<any> {
    this.validateCommonParams(params);
    return this.executeRequest('GET', this.getPath(), params);
  }
  
  protected static abstract getPath(): string;
}

/**
 * Base class specifically for POST endpoints
 */
export abstract class BasePostEndpoint extends BaseEndpoint {
  static async execute(params: APIParameters, body: any): Promise<any> {
    this.validateCommonParams(params);
    this.validateRequestBody(body);
    return this.executeRequest('POST', this.getPath(), params, body);
  }
  
  protected static abstract getPath(): string;
  protected static abstract validateRequestBody(body: any): void;
}

/**
 * Base class specifically for PUT endpoints
 */
export abstract class BasePutEndpoint extends BaseEndpoint {
  static async execute(params: APIParameters, body: any): Promise<any> {
    this.validateCommonParams(params);
    this.validateRequestBody(body);
    return this.executeRequest('PUT', this.getPath(), params, body);
  }
  
  protected static abstract getPath(): string;
  protected static abstract validateRequestBody(body: any): void;
}

/**
 * Base class specifically for PATCH endpoints
 */
export abstract class BasePatchEndpoint extends BaseEndpoint {
  static async execute(params: APIParameters, body: any): Promise<any> {
    this.validateCommonParams(params);
    this.validateRequestBody(body);
    return this.executeRequest('PATCH', this.getPath(), params, body);
  }
  
  protected static abstract getPath(): string;
  protected static abstract validateRequestBody(body: any): void;
}

/**
 * Base class specifically for DELETE endpoints
 */
export abstract class BaseDeleteEndpoint extends BaseEndpoint {
  static async execute(params: APIParameters): Promise<any> {
    this.validateCommonParams(params);
    return this.executeRequest('DELETE', this.getPath(), params);
  }
  
  protected static abstract getPath(): string;
}
