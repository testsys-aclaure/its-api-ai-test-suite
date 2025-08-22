import { ValidationError } from '../types/errors.js';
import type { APIParameters } from '../types/parameters.js';

/**
 * Universal parameter validators - apply across multiple endpoints
 * Based on analysis: program-id required in 79% of endpoints (64/81)
 */
export class UniversalValidators {
  /**
   * Validates program-id parameter - required in 64 endpoints (79% coverage)
   */
  static validateProgramId(params: APIParameters): void {
    if (!params['program-id']) {
      throw new ValidationError('program-id is required - found in 64 endpoints (79% coverage)', {
        parameter: 'program-id',
        required: true,
        documentation: 'The unique program identifier provided as part of configuration'
      });
    }
  }
  
  /**
   * Validates program-institution-id parameter - required in specific endpoints
   */
  static validateProgramInstitutionId(params: APIParameters, required = false): void {
    if (required && !params['program-institution-id']) {
      throw new ValidationError('program-institution-id is required for this endpoint', {
        parameter: 'program-institution-id', 
        required: true,
        documentation: 'The unique program identifier of an institution'
      });
    }
  }

  /**
   * Validates all universal parameters for an endpoint
   */
  static validateUniversalParameters(
    params: APIParameters, 
    requirements: { programInstitutionIdRequired?: boolean } = {}
  ): void {
    this.validateProgramId(params);
    this.validateProgramInstitutionId(params, requirements.programInstitutionIdRequired);
  }
}
