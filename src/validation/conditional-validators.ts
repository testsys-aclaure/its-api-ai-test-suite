import { ValidationError } from '../types/errors.js';
import type { APIParameters } from '../types/parameters.js';

/**
 * Conditional parameter validators - handle complex parameter logic patterns
 * Based on analysis from parameter-requirements-intelligence.json - 7 patterns identified
 */
export class ConditionalValidators {
  
  /**
   * Pattern 1: session-code OR (start-utc AND end-utc)
   * Used in Remote Sessions/query and Remote Data/admin-urls/Query
   */
  static validateSessionCodeOrDateTime(params: APIParameters): void {
    const sessionCode = params['session-code'];
    const startUtc = params['start-utc'];
    const endUtc = params['end-utc'];
    
    if (!sessionCode && (!startUtc || !endUtc)) {
      throw new ValidationError(
        'Either session-code or both start-utc and end-utc are required',
        { 
          alternatives: ['session-code', 'start-utc + end-utc'],
          endpoints: ['Remote Sessions/query', 'Remote Data/admin-urls/Query']
        }
      );
    }
  }
  
  /**
   * Pattern 2: event-id OR event-description (exactly one)
   * Used in Event authorization and query operations
   */
  static validateEventIdentification(params: APIParameters): void {
    const eventId = params['event-id'];
    const eventDescription = params['event-description'];
    
    if (!eventId && !eventDescription) {
      throw new ValidationError('Either event-id or event-description is required', {
        parameter: 'event-id OR event-description',
        alternatives: ['event-id', 'event-description'],
        required: true
      });
    }
    if (eventId && eventDescription) {
      throw new ValidationError('Only one of event-id or event-description should be provided', {
        parameter: 'event-id AND event-description',
        documentation: 'These parameters are mutually exclusive'
      });
    }
  }
  
  /**
   * Pattern 3: longitudinal-group-id OR longitudinal-group-name (exactly one) 
   * Used in Longitudinal Group operations
   */
  static validateLongitudinalGroupIdentification(params: APIParameters): void {
    const groupId = params['longitudinal-group-id'];
    const groupName = params['longitudinal-group-name'];
    
    if (!groupId && !groupName) {
      throw new ValidationError('Either longitudinal-group-id or longitudinal-group-name is required', {
        alternatives: ['longitudinal-group-id', 'longitudinal-group-name'],
        required: true
      });
    }
    if (groupId && groupName) {
      throw new ValidationError('Only one of longitudinal-group-id or longitudinal-group-name should be provided', {
        parameter: 'longitudinal-group-id AND longitudinal-group-name',
        documentation: 'These parameters are mutually exclusive'
      });
    }
  }

  /**
   * Pattern 4: Validate datetime range parameters
   * Used when start-utc and end-utc are both required
   */
  static validateDateTimeRange(params: APIParameters): void {
    const startUtc = params['start-utc'];
    const endUtc = params['end-utc'];
    
    if (startUtc && !endUtc) {
      throw new ValidationError('end-utc is required when start-utc is provided', {
        parameter: 'end-utc',
        required: true
      });
    }
    if (!startUtc && endUtc) {
      throw new ValidationError('start-utc is required when end-utc is provided', {
        parameter: 'start-utc',
        required: true
      });
    }
  }

  /**
   * Pattern 5: parent-program-institution-id conditional validation
   * Required if the web API client is an institution-level client
   */
  static validateParentProgramInstitutionId(params: APIParameters, isInstitutionClient = false): void {
    if (isInstitutionClient && !params['parent-program-institution-id']) {
      throw new ValidationError(
        'parent-program-institution-id is required for institution-level clients',
        {
          parameter: 'parent-program-institution-id',
          required: true,
          documentation: 'Required if the web API client is an institution-level client'
        }
      );
    }
  }
}
