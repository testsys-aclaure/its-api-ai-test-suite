import { ValidationError } from '../types/errors.js';
import type { APIParameters } from '../types/parameters.js';

/**
 * Request body validators for POST/PUT/PATCH operations
 * These handle complex JSON payload validation with business rules
 */
export class RequestBodyValidators {
  
  /**
   * Validates JSON request body structure
   */
  static validateJsonBody(body: any, schema: any): void {
    if (!body) {
      throw new ValidationError('Request body is required for this operation', {
        parameter: 'body',
        required: true,
        documentation: 'JSON payload containing operation data'
      });
    }
    
    // TODO: Implement JSON schema validation
    // This will be expanded based on specific endpoint requirements
  }
  
  /**
   * Validates examinee import body structure
   * Used by /event/examinee/import POST endpoint
   */
  static validateExamineeImportBody(body: any): void {
    if (!Array.isArray(body)) {
      throw new ValidationError('Examinee import requires array of examinee objects', {
        parameter: 'body',
        documentation: 'Array of examinee objects with required fields'
      });
    }
    
    if (body.length === 0) {
      throw new ValidationError('At least one examinee must be provided', {
        parameter: 'body',
        documentation: 'Cannot import empty examinee list (minimum length 1)'
      });
    }
    
    // Validate each examinee object
    body.forEach((examinee: any, index: number) => {
      this.validateExamineeObject(examinee, index);
    });
  }
  
  /**
   * Validates individual examinee object structure
   */
  private static validateExamineeObject(examinee: any, index: number): void {
    const requiredFields = ['examineeId']; // Based on API documentation
    const prefix = `examinee[${index}]`;
    
    for (const field of requiredFields) {
      if (!examinee[field]) {
        throw new ValidationError(`${prefix}.${field} is required`, {
          parameter: `${prefix}.${field}`,
          required: true,
          documentation: `Required field for examinee import`
        });
      }
    }
  }
  
  /**
   * Validates form submission body structure
   * Used by various form-related POST endpoints
   */
  static validateFormSubmissionBody(body: any): void {
    if (!body) {
      throw new ValidationError('Form submission body is required', {
        parameter: 'body',
        required: true
      });
    }
    
    // TODO: Implement form-specific validation rules
  }
  
  /**
   * Validates event creation body structure
   * Used by event creation POST endpoints
   */
  static validateEventCreationBody(body: any): void {
    if (!body) {
      throw new ValidationError('Event creation body is required', {
        parameter: 'body',
        required: true
      });
    }
    
    const requiredFields = ['eventName', 'eventDescription']; // Based on API patterns
    
    for (const field of requiredFields) {
      if (!body[field]) {
        throw new ValidationError(`${field} is required for event creation`, {
          parameter: field,
          required: true,
          documentation: `Required field for creating new events`
        });
      }
    }
  }
}
