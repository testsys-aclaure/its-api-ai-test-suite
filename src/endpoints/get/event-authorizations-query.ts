import { UniversalValidators } from '../../validation/universal-validators.js';
import { ConditionalValidators } from '../../validation/conditional-validators.js';
import { BusinessValidators } from '../../validation/business-validators.js';
import { APIError } from '../../types/errors.js';
import { authenticatedRequest } from '../../auth/oauth-client.js';
import type { APIParameters, SemanticIntent, EndpointMetadata } from '../../types/parameters.js';

/**
 * Event Authorizations Query Endpoint
 * This method queries event-specific authorization codes. 
 * The event must have previously been created, and the user querying must have access.
 */
export class EventAuthorizationsQuery {
  
  // AI-NATIVE: Rich metadata for operation discovery
  static readonly metadata: EndpointMetadata = {
    businessIntent: 'Get authorization status for educational testing events',
    semanticNames: ['event authorizations', 'test permissions', 'event access', 'authorization codes'],
    businessDomain: 'Event Management',
    parameters: {
      required: ['program-id', 'program-institution-id'],
      conditional: ['event-id OR event-description'],
      businessMeaning: {
        'program-id': 'Educational program identifier',
        'program-institution-id': 'Institution filter for events (REQUIRED despite documentation)',
        'event-id': 'Specific test event identifier', 
        'event-description': 'Human-readable event name',
        'limit': 'Maximum number of authorization records to return (max 500)',
        'before-id': 'Pagination - get records before this authorization ID',
        'after-id': 'Pagination - get records after this authorization ID'
      }
    },
    useCases: [
      'Check if students can access a test event',
      'Verify event permissions before test administration',
      'Audit authorization status for compliance reporting',
      'Retrieve authorization codes for event management',
      'Monitor event access patterns and usage'
    ]
  };
  
  /**
   * Execute the Event Authorizations Query with parameter validation
   */
  static async execute(params: APIParameters): Promise<any> {
    // STEP 1: VALIDATE UNIVERSAL REQUIRED PARAMETERS
    UniversalValidators.validateProgramId(params);
    
    // STEP 2: VALIDATE BUSINESS DOMAIN REQUIREMENTS
    // Event Authorization actually requires program-institution-id despite documentation
    BusinessValidators.validateEventAuthorizationParams(params);
    
    // STEP 3: VALIDATE CONDITIONAL PARAMETERS
    // Either event-id OR event-description is required
    ConditionalValidators.validateEventIdentification(params);
    
    // STEP 4: VALIDATE PAGINATION PARAMETERS (mutually exclusive)
    this.validatePaginationParams(params);
    
    // STEP 5: BUILD REQUEST URL
    const baseUrl = process.env.BASE_URL || 'https://api-staging.testsys.io';
    const url = `${baseUrl}/event/authorizations/Query`;
    const queryParams = new URLSearchParams();
    
    // STEP 6: ADD VALIDATED PARAMETERS
    queryParams.set('program-id', params['program-id']!);
    queryParams.set('program-institution-id', params['program-institution-id']!);
    
    if (params['event-id']) {
      queryParams.set('event-id', params['event-id']);
    } else if (params['event-description']) {
      queryParams.set('event-description', params['event-description']);
    }
    
    if (params['limit']) {
      queryParams.set('limit', params['limit']);
    }
    
    if (params['before-id']) {
      queryParams.set('before-id', params['before-id']);
    }
    
    if (params['after-id']) {
      queryParams.set('after-id', params['after-id']);
    }
    
    // STEP 7: EXECUTE WITH OAUTH2 AUTHENTICATION
    const response = await authenticatedRequest('GET', `${url}?${queryParams}`);
    
    // STEP 8: VALIDATE RESPONSE
    if (!response.ok) {
      const errorBody = await response.text();
      throw new APIError(`Event authorizations query failed: ${response.status} - ${errorBody}`, {
        endpoint: '/event/authorizations/Query',
        method: 'GET',
        status: response.status,
        params: params,
        businessContext: 'Failed to retrieve event authorization status'
      });
    }
    
    return response.json();
  }
  
  /**
   * Validate pagination parameters are mutually exclusive
   */
  private static validatePaginationParams(params: APIParameters): void {
    const beforeId = params['before-id'];
    const afterId = params['after-id'];
    
    if (beforeId && afterId) {
      throw new APIError('before-id and after-id cannot be used together', {
        endpoint: '/event/authorizations/Query',
        params: { 'before-id': beforeId, 'after-id': afterId },
        businessContext: 'Pagination parameters are mutually exclusive'
      });
    }
  }
  
  // AI-NATIVE: Semantic wrapper for natural language interaction
  static async getEventAuthorizations(intent: SemanticIntent): Promise<any> {
    const params: APIParameters = {};
    
    // Intelligent parameter mapping
    if (intent.program) params['program-id'] = intent.program;
    if (intent.institution) params['program-institution-id'] = intent.institution;
    
    if (intent.event) {
      if (typeof intent.event === 'number' || /^\d+$/.test(intent.event.toString())) {
        params['event-id'] = intent.event.toString();
      } else {
        params['event-description'] = intent.event.toString();
      }
    }
    if (intent.description) params['event-description'] = intent.description;
    
    return this.execute(params);
  }

  // AI-NATIVE: Business-friendly method aliases
  static async checkEventAccess(programId: string, eventIdentifier: string | number): Promise<any> {
    return this.getEventAuthorizations({
      program: programId,
      event: eventIdentifier
    });
  }

  static async getAuthorizationCodes(programId: string, eventDescription: string, institution?: string): Promise<any> {
    return this.getEventAuthorizations({
      program: programId,
      description: eventDescription,
      institution
    });
  }

  static async auditEventPermissions(programId: string, eventId: string): Promise<any> {
    return this.getEventAuthorizations({
      program: programId,
      event: eventId
    });
  }
}
