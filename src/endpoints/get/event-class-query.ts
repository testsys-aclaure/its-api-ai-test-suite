import { UniversalValidators } from '../../validation/universal-validators.js';
import { ConditionalValidators } from '../../validation/conditional-validators.js';
import { BusinessValidators } from '../../validation/business-validators.js';
import { APIError } from '../../types/errors.js';
import { authenticatedRequest } from '../../auth/oauth-client.js';
import type { APIParameters, SemanticIntent, EndpointMetadata } from '../../types/parameters.js';

/**
 * Event Class Query Endpoint
 * Retrieves details about event classes for organizing examinees into groups for particular events.
 * This endpoint helps manage event class structures and student groupings.
 */
export class EventClassQuery {
  
  // AI-NATIVE: Rich metadata for operation discovery
  static readonly metadata: EndpointMetadata = {
    businessIntent: 'Query and retrieve educational event class details for student grouping',
    semanticNames: ['event class query', 'class groups', 'student classes', 'event classes', 'class details'],
    businessDomain: 'Event Class Management',
    parameters: {
      required: ['program-id', 'program-institution-id', 'event-id'],
      conditional: [],
      businessMeaning: {
        'program-id': 'Educational program identifier',
        'program-institution-id': 'Institution identifier where classes are organized',
        'event-id': 'Specific event identifier for which classes are created',
        'event-class-id': 'Specific event class identifier for single class lookup',
        'program-class-code': 'Program-defined unique identifier for the event class'
      }
    },
    useCases: [
      'List all event classes for a specific event',
      'Get details for a specific event class',
      'Find classes by program-defined class code',
      'Manage student groupings for test events',
      'Organize examinees into classes for administration'
    ]
  };
  
  /**
   * Execute the Event Class Query with parameter validation
   */
  static async execute(params: APIParameters): Promise<any> {
    // STEP 1: VALIDATE UNIVERSAL REQUIRED PARAMETERS
    UniversalValidators.validateProgramId(params);
    
    // STEP 2: VALIDATE BUSINESS DOMAIN REQUIREMENTS
    // EventClass requires program-institution-id and event-id
    BusinessValidators.validateEventClassParams(params);
    
    // STEP 3: BUILD REQUEST URL
    const baseUrl = process.env.BASE_URL || 'https://api-staging.testsys.io';
    const url = `${baseUrl}/event-class/Query`;
    const queryParams = new URLSearchParams();
    
    // STEP 4: ADD VALIDATED PARAMETERS
    queryParams.set('program-id', params['program-id']!);
    queryParams.set('program-institution-id', params['program-institution-id']!);
    queryParams.set('event-id', params['event-id']!);
    
    if (params['event-class-id']) {
      queryParams.set('event-class-id', params['event-class-id']);
    }
    
    if (params['program-class-code']) {
      queryParams.set('program-class-code', params['program-class-code']);
    }
    
    // STEP 5: EXECUTE WITH OAUTH2 AUTHENTICATION
    const response = await authenticatedRequest('GET', `${url}?${queryParams}`);
    
    // STEP 6: VALIDATE RESPONSE
    if (!response.ok) {
      const errorBody = await response.text();
      throw new APIError(`Event class query failed: ${response.status} - ${errorBody}`, {
        endpoint: '/event-class/Query',
        method: 'GET',
        status: response.status,
        params: params,
        businessContext: 'Failed to retrieve event class details'
      });
    }
    
    return response.json();
  }
  
  // AI-NATIVE: Semantic wrapper for natural language interaction
  static async getEventClasses(intent: SemanticIntent): Promise<any> {
    const params: APIParameters = {};
    
    // Intelligent parameter mapping
    if (intent.program) params['program-id'] = intent.program;
    if (intent.institution) params['program-institution-id'] = intent.institution;
    if (intent.event) params['event-id'] = intent.event.toString();
    
    if (intent.classId) params['event-class-id'] = intent.classId.toString();
    if (intent.classCode) params['program-class-code'] = intent.classCode;
    
    return this.execute(params);
  }
  
  // AI-NATIVE: Business-friendly method aliases
  static async listEventClasses(programId: string, institutionId: string, eventId: string | number): Promise<any> {
    return this.getEventClasses({
      program: programId,
      institution: institutionId,
      event: eventId
    });
  }

  static async getEventClassDetails(programId: string, institutionId: string, eventId: string | number, classId: string | number): Promise<any> {
    return this.getEventClasses({
      program: programId,
      institution: institutionId,
      event: eventId,
      classId: classId
    });
  }

  static async findClassByCode(programId: string, institutionId: string, eventId: string | number, classCode: string): Promise<any> {
    return this.getEventClasses({
      program: programId,
      institution: institutionId,
      event: eventId,
      classCode: classCode
    });
  }
}
