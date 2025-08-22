import { UniversalValidators } from '../../validation/universal-validators.js';
import { APIError } from '../../types/errors.js';
import { authenticatedRequest } from '../../auth/oauth-client.js';
import type { APIParameters, SemanticIntent, EndpointMetadata } from '../../types/parameters.js';

/**
 * Event Query Endpoint
 * Retrieves details about events, allowing filtering by various criteria.
 * This is the primary endpoint for discovering and listing events.
 */
export class EventQuery {
  
  // AI-NATIVE: Rich metadata for operation discovery
  static readonly metadata: EndpointMetadata = {
    businessIntent: 'Query and retrieve educational testing events with filtering options',
    semanticNames: ['event query', 'list events', 'find events', 'event search', 'event details'],
    businessDomain: 'Event Management',
    parameters: {
      required: ['program-id'],
      conditional: [],
      businessMeaning: {
        'program-id': 'Educational program identifier',
        'program-institution-id': 'Institution filter for events',
        'event-id': 'Specific event identifier for single event lookup',
        'event-description': 'Event name or description filter',
        'active-only': 'Filter to show only active (non-expired) events',
        'limit': 'Maximum number of events to return (max 500)',
        'before-id': 'Pagination - get events before this event ID',
        'after-id': 'Pagination - get events after this event ID'
      }
    },
    useCases: [
      'List all events in a program',
      'Find events for a specific institution',
      'Get details for a specific event',
      'Discover active events available for testing',
      'Browse events by name or description',
      'Paginate through large event collections'
    ]
  };
  
  /**
   * Execute the Event Query with parameter validation
   */
  static async execute(params: APIParameters): Promise<any> {
    // STEP 1: VALIDATE UNIVERSAL REQUIRED PARAMETERS
    UniversalValidators.validateProgramId(params);
    
    // STEP 2: VALIDATE PAGINATION PARAMETERS (mutually exclusive)
    this.validatePaginationParams(params);
    
    // STEP 3: BUILD REQUEST URL
    const baseUrl = process.env.BASE_URL || 'https://api-staging.testsys.io';
    const url = `${baseUrl}/event/query`;
    const queryParams = new URLSearchParams();
    
    // STEP 4: ADD VALIDATED PARAMETERS
    queryParams.set('program-id', params['program-id']!);
    
    if (params['program-institution-id']) {
      queryParams.set('program-institution-id', params['program-institution-id']);
    }
    
    if (params['event-id']) {
      queryParams.set('event-id', params['event-id']);
    }
    
    if (params['event-description']) {
      queryParams.set('event-description', params['event-description']);
    }
    
    if (params['active-only']) {
      queryParams.set('active-only', params['active-only']);
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
    
    // STEP 5: EXECUTE WITH OAUTH2 AUTHENTICATION
    const response = await authenticatedRequest('GET', `${url}?${queryParams}`);
    
    // STEP 6: VALIDATE RESPONSE
    if (!response.ok) {
      const errorBody = await response.text();
      throw new APIError(`Event query failed: ${response.status} - ${errorBody}`, {
        endpoint: '/event/query',
        method: 'GET',
        status: response.status,
        params: params,
        businessContext: 'Failed to retrieve event details'
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
        endpoint: '/event/query',
        params: { 'before-id': beforeId, 'after-id': afterId },
        businessContext: 'Pagination parameters are mutually exclusive'
      });
    }
  }
  
  // AI-NATIVE: Semantic wrapper for natural language interaction
  static async getEvents(intent: SemanticIntent): Promise<any> {
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
    
    // Handle common natural language patterns
    if (intent.activeOnly !== undefined) params['active-only'] = intent.activeOnly.toString();
    
    return this.execute(params);
  }

  // AI-NATIVE: Business-friendly method aliases
  static async listAllEvents(programId: string): Promise<any> {
    return this.getEvents({ program: programId });
  }

  static async findActiveEvents(programId: string, institution?: string): Promise<any> {
    return this.getEvents({
      program: programId,
      institution,
      activeOnly: true
    });
  }

  static async searchEventsByName(programId: string, eventName: string): Promise<any> {
    return this.getEvents({
      program: programId,
      description: eventName
    });
  }

  static async getEventDetails(programId: string, eventId: string | number): Promise<any> {
    return this.getEvents({
      program: programId,
      event: eventId
    });
  }
}
