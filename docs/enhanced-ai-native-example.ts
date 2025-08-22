import { UniversalValidators } from '../../validation/universal-validators.js';
import { APIError } from '../../types/errors.js';
import { authenticatedRequest } from '../../auth/oauth-client.js';
import type { APIParameters, SemanticIntent, EndpointMetadata } from '../../types/parameters.js';

/**
 * ENHANCED Event Query Endpoint - Full AI-Native Implementation
 * Demonstrates complete Richardson Level 3 compliance with AI discoverability
 */
export class EnhancedEventQuery {
  
  // AI-NATIVE: Comprehensive metadata for full AI discovery
  static readonly metadata: EndpointMetadata = {
    businessIntent: 'Query and retrieve educational testing events with intelligent filtering',
    semanticNames: ['event query', 'list events', 'find events', 'event search', 'event discovery'],
    businessDomain: 'Event Management',
    capabilities: {
      discoverability: {
        semanticSearch: true,
        naturalLanguageQueries: true,
        businessContextAware: true
      },
      navigation: {
        hypermediaControlled: true,
        relatedEndpoints: ['event-class', 'event-authorization', 'registration']
      },
      formats: ['application/json', 'application/hal+json', 'application/vnd.api+json']
    },
    parameters: {
      required: ['program-id'],
      conditional: [],
      businessMeaning: {
        'program-id': 'Educational program identifier - determines scope of event search',
        'program-institution-id': 'Institution filter - narrows events to specific institution',
        'event-id': 'Specific event identifier - retrieves single event details',
        'active-only': 'Temporal filter - shows only non-expired, available events'
      }
    },
    useCases: [
      'Discover all events available to students in a program',
      'Find upcoming active events for scheduling',
      'Locate specific events by name or description',
      'Browse events filtered by institutional access'
    ],
    businessWorkflows: [
      'Student Event Discovery → Event Registration → Assessment Taking',
      'Administrator Event Management → Class Setup → Student Assignment'
    ]
  };

  /**
   * Execute with enhanced AI-native response structure
   */
  static async execute(params: APIParameters, accept = 'application/json'): Promise<any> {
    // Standard validation and API call...
    UniversalValidators.validateProgramId(params);
    
    const url = `${process.env.BASE_URL}/event/query`;
    const queryParams = new URLSearchParams();
    
    // Build query parameters...
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.set(key, value);
    });

    const response = await authenticatedRequest('GET', `${url}?${queryParams}`);
    
    if (!response.ok) {
      throw this.createAIFriendlyError(response, params);
    }

    const rawData = await response.json();
    
    // AI-NATIVE: Enhanced response with full metadata and hypermedia
    return this.formatForAIConsumption(rawData, params, accept);
  }

  /**
   * AI-NATIVE: Self-descriptive response formatting
   */
  private static formatForAIConsumption(data: any, params: APIParameters, accept: string) {
    const baseResponse = {
      data: data,
      _metadata: {
        businessContext: 'Educational event discovery and filtering',
        semanticMeaning: this.interpretBusinessMeaning(data, params),
        dataInterpretation: {
          totalEvents: Array.isArray(data) ? data.length : data.events?.length || 0,
          filteringApplied: this.describeFiltering(params),
          businessSignificance: this.explainBusinessSignificance(data, params)
        },
        nextActions: this.suggestNextActions(data, params)
      },
      _links: this.generateHypermediaControls(data, params)
    };

    // Content negotiation for different AI agent formats
    switch (accept) {
      case 'application/hal+json':
        return this.formatAsHAL(baseResponse);
      case 'application/vnd.api+json':
        return this.formatAsJSONAPI(baseResponse);
      default:
        return baseResponse;
    }
  }

  /**
   * AI-NATIVE: Business meaning interpretation
   */
  private static interpretBusinessMeaning(data: any, params: APIParameters): string {
    const eventCount = Array.isArray(data) ? data.length : data.events?.length || 0;
    const hasInstitutionFilter = !!params['program-institution-id'];
    const hasActiveFilter = !!params['active-only'];

    if (eventCount === 0) {
      return hasInstitutionFilter 
        ? 'No events accessible to specified institution - may indicate access restrictions'
        : 'No events found in program - program may be inactive or access restricted';
    }

    return `Found ${eventCount} events${hasActiveFilter ? ' (active only)' : ''} - ready for student access or administrative management`;
  }

  /**
   * AI-NATIVE: Generate hypermedia controls for navigation
   */
  private static generateHypermediaControls(data: any, params: APIParameters) {
    const baseUrl = process.env.BASE_URL;
    const programId = params['program-id'];
    
    return {
      self: { 
        href: `/event/query?${new URLSearchParams(params).toString()}`,
        method: 'GET',
        title: 'Current event query'
      },
      related: [
        {
          rel: 'event-classes',
          href: `/event-class/query?program-id=${programId}`,
          method: 'GET',
          title: 'Get class sessions for these events'
        },
        {
          rel: 'event-authorizations', 
          href: `/event/authorizations/Query?program-id=${programId}`,
          method: 'GET',
          title: 'Check event access authorizations'
        }
      ],
      actions: {
        filterByInstitution: {
          href: `/event/query?program-id=${programId}&program-institution-id={institutionId}`,
          method: 'GET',
          title: 'Filter events by institution',
          templated: true
        },
        getActiveOnly: {
          href: `/event/query?program-id=${programId}&active-only=true`,
          method: 'GET', 
          title: 'Show only active events'
        }
      },
      documentation: {
        href: `/docs/endpoints/event-query`,
        type: 'text/html',
        title: 'Event Query API Documentation'
      }
    };
  }

  /**
   * AI-NATIVE: Enhanced semantic interface with intelligence
   */
  static async getEvents(intent: SemanticIntent): Promise<any> {
    const params: APIParameters = {};
    
    // Intelligent parameter mapping with business logic
    if (intent.program) params['program-id'] = intent.program;
    if (intent.institution) params['program-institution-id'] = intent.institution;
    
    // Smart event identification
    if (intent.event) {
      if (typeof intent.event === 'number' || /^\d+$/.test(intent.event.toString())) {
        params['event-id'] = intent.event.toString();
      } else {
        params['event-description'] = intent.event.toString();
      }
    }
    
    // Natural language patterns
    if (intent.activeOnly !== undefined) params['active-only'] = intent.activeOnly.toString();
    if (intent.limit) params['limit'] = intent.limit.toString();
    
    return this.execute(params);
  }

  /**
   * AI-NATIVE: Enhanced business-friendly aliases with context
   */
  static async discoverAvailableEvents(programId: string, options?: {
    institution?: string,
    activeOnly?: boolean,
    limit?: number
  }): Promise<any> {
    return this.getEvents({
      program: programId,
      institution: options?.institution,
      activeOnly: options?.activeOnly ?? true,
      limit: options?.limit
    });
  }

  static async findEventsByDescription(programId: string, searchTerm: string): Promise<any> {
    return this.getEvents({
      program: programId,
      event: searchTerm
    });
  }

  static async getUpcomingEvents(programId: string, institutionId?: string): Promise<any> {
    return this.getEvents({
      program: programId,
      institution: institutionId,
      activeOnly: true
    });
  }

  /**
   * AI-NATIVE: Enhanced error handling with business context
   */
  private static createAIFriendlyError(response: Response, params: APIParameters): APIError {
    return new APIError(`Event query failed`, {
      endpoint: '/event/query',
      method: 'GET',
      status: response.status,
      params: params,
      businessContext: 'Failed to retrieve educational event information',
      aiGuidance: {
        httpStatus: response.status,
        businessInterpretation: response.status === 422 
          ? 'Business validation - may indicate access restrictions or missing data'
          : 'Technical error - requires investigation',
        suggestedActions: response.status === 422
          ? ['Try different institution ID', 'Verify program access', 'Check if program has events']
          : ['Verify authentication', 'Check network connectivity', 'Review request parameters'],
        isExpectedBusinessBehavior: response.status === 422
      }
    });
  }
}
