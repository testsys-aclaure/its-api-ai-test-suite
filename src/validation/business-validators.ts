import { ValidationError } from '../types/errors.js';
import type { APIParameters } from '../types/parameters.js';

/**
 * Business domain-specific parameter validators
 * Based on analysis from parameter-requirements-intelligence.json - 23 explicit requirements
 */
export class BusinessValidators {
  
  /**
   * IW Tools domain: bank-id, language, folder-id required
   * Used in IW Tools export and import operations
   */
  static validateIWToolsParams(params: APIParameters): void {
    if (!params['bank-id']) {
      throw new ValidationError('bank-id is required for IW Tools operations', {
        parameter: 'bank-id',
        required: true,
        documentation: 'The unique identifier of the question bank'
      });
    }
    if (!params['language']) {
      throw new ValidationError('language is required for IW Tools operations', {
        parameter: 'language',
        required: true,
        documentation: 'The language code for the content'
      });  
    }
    if (!params['folder-id']) {
      throw new ValidationError('folder-id is required for IW Tools operations', {
        parameter: 'folder-id',
        required: true,
        documentation: 'The unique identifier of the folder'
      });
    }
  }
  
  /**
   * Form domain: form-id required for delete operations
   */
  static validateFormParams(params: APIParameters, operation: string): void {
    if (operation === 'delete' && !params['form-id']) {
      throw new ValidationError('form-id is required for Form delete operations', {
        parameter: 'form-id',
        required: true,
        documentation: 'The unique identifier of the form to delete'
      });
    }
  }
  
  /**
   * Session domain: session-code required
   * Used in Session operations
   */
  static validateSessionParams(params: APIParameters): void {
    if (!params['session-code']) {
      throw new ValidationError('session-code is required for Session operations', {
        parameter: 'session-code',
        required: true,
        documentation: 'The unique identifier of the session'
      });
    }
  }

  /**
   * Event Authorization domain: program-institution-id is actually required 
   * despite being marked optional in documentation
   */
  static validateEventAuthorizationParams(params: APIParameters): void {
    if (!params['program-institution-id']) {
      throw new ValidationError('program-institution-id is required for Event Authorization operations', {
        parameter: 'program-institution-id',
        required: true,
        documentation: 'Required for Event Authorization operations despite being marked optional'
      });
    }
  }

  /**
   * Event Class domain: program-institution-id and event-id are required
   * Used in EventClass operations for organizing examinees into groups
   */
  static validateEventClassParams(params: APIParameters): void {
    if (!params['program-institution-id']) {
      throw new ValidationError('program-institution-id is required for Event Class operations', {
        parameter: 'program-institution-id',
        required: true,
        documentation: 'Required to identify the institution where classes are organized'
      });
    }

    if (!params['event-id']) {
      throw new ValidationError('event-id is required for Event Class operations', {
        parameter: 'event-id',
        required: true,
        documentation: 'Required to identify the event for which classes are created'
      });
    }
  }

  /**
   * Registration domain: complex parameter validation
   * Used in Registration operations which have the most parameters (19)
   */
  static validateRegistrationParams(params: APIParameters): void {
    // Registration operations typically require program-id (handled by universal validators)
    // Additional business-specific validations can be added here based on specific requirements
  }

  /**
   * Remote domain: URL type specific validation
   * Used in Remote operations for admin URLs
   */
  static validateRemoteAdminUrlParams(params: APIParameters): void {
    const urlType = params['url-type'];
    const sessionCode = params['session-code'];
    
    if (urlType === '1' && !sessionCode) {
      throw new ValidationError('session-code is required when url-type = 1 for Remote admin URLs', {
        parameter: 'session-code',
        required: true,
        documentation: 'Required for url-type = 1 in Remote admin URL operations'
      });
    }
  }

  /**
   * Result domain: complex parameter validation for result queries
   * Used in Result operations which have the most parameters (35)
   */
  static validateResultParams(params: APIParameters): void {
    // Result operations have complex parameter requirements
    // Additional validations based on specific business rules
  }

  /**
   * User Access domain: user and access related validations
   * Used in User Access operations
   */
  static validateUserAccessParams(params: APIParameters): void {
    // User access specific validations
    // Can be extended based on specific requirements
  }
}
