import { Environment } from './AuthenticationManager';

/**
 * Parameter injection context for intelligent parameter discovery
 */
export interface ParameterContext {
  environment: Environment;
  operationName: string;
  userParams: Record<string, any>;
  endpoint: string;
}

/**
 * Parameter injection result
 */
export interface InjectionResult {
  finalParams: Record<string, any>;
  injectedParams: string[];
  warnings: string[];
}

/**
 * Known parameter patterns for different API operations
 */
interface ParameterPattern {
  requiredParams: string[];
  optionalParams: string[];
  autoInjectParams: Record<string, string>; // param name -> environment key
  defaultValues: Record<string, any>;
}

/**
 * Intelligent parameter injection system
 * Automatically injects program-id, program-institution-id, and other contextual parameters
 * Designed for AI assistant ease-of-use - minimal parameter management required
 */
export class ParameterInjector {
  private readonly parameterPatterns: Map<string, ParameterPattern> = new Map();

  constructor() {
    this.initializeParameterPatterns();
  }

  /**
   * Initialize known parameter patterns for different operations
   * This provides intelligence about what parameters different endpoints need
   */
  private initializeParameterPatterns(): void {
    // Channel/Institution operations
    this.parameterPatterns.set('channel/institutions/query', {
      requiredParams: ['program-id'],
      optionalParams: ['program-institution-id', 'channel', 'include-inactive'],
      autoInjectParams: {
        'program-id': 'programId',
        'program-institution-id': 'programInstitutionId'
      },
      defaultValues: {
        'include-inactive': false
      }
    });

    // Add more patterns as we discover them
    this.parameterPatterns.set('programs/query', {
      requiredParams: ['program-id'],
      optionalParams: ['program-institution-id', 'active-only', 'include-details'],
      autoInjectParams: {
        'program-id': 'programId',
        'program-institution-id': 'programInstitutionId'
      },
      defaultValues: {
        'active-only': true,
        'include-details': false
      }
    });

    // Generic pattern for operations that need program context
    this.parameterPatterns.set('*', {
      requiredParams: [],
      optionalParams: ['program-id', 'program-institution-id'],
      autoInjectParams: {
        'program-id': 'programId',
        'program-institution-id': 'programInstitutionId'
      },
      defaultValues: {}
    });
  }

  /**
   * Intelligently inject parameters based on operation context
   * AI Assistant Usage: Pass user parameters and get back complete parameter set
   */
  injectParameters(context: ParameterContext): InjectionResult {
    const result: InjectionResult = {
      finalParams: { ...context.userParams },
      injectedParams: [],
      warnings: []
    };

    // Find matching parameter pattern
    const pattern = this.findParameterPattern(context.operationName, context.endpoint);
    
    if (pattern) {
      this.applyParameterPattern(pattern, context, result);
    } else {
      // Fallback to generic pattern
      this.applyGenericInjection(context, result);
    }

    // Validate required parameters are present
    this.validateParameters(pattern, result);

    return result;
  }

  /**
   * Find the best matching parameter pattern for an operation
   */
  private findParameterPattern(operationName: string, endpoint: string): ParameterPattern | null {
    // Try exact operation name match first
    if (this.parameterPatterns.has(operationName)) {
      return this.parameterPatterns.get(operationName) || null;
    }

    // Try endpoint-based matching
    for (const [pattern, config] of this.parameterPatterns.entries()) {
      if (pattern !== '*' && endpoint.includes(pattern)) {
        return config;
      }
    }

    // Fallback to generic pattern
    return this.parameterPatterns.get('*') || null;
  }

  /**
   * Apply parameter pattern to inject missing parameters
   */
  private applyParameterPattern(
    pattern: ParameterPattern, 
    context: ParameterContext, 
    result: InjectionResult
  ): void {
    // Auto-inject parameters from environment
    for (const [paramName, envKey] of Object.entries(pattern.autoInjectParams)) {
      if (!result.finalParams[paramName]) {
        const envValue = (context.environment as any)[envKey];
        if (envValue) {
          result.finalParams[paramName] = envValue;
          result.injectedParams.push(paramName);
        }
      }
    }

    // Apply default values for missing optional parameters
    for (const [paramName, defaultValue] of Object.entries(pattern.defaultValues)) {
      if (result.finalParams[paramName] === undefined) {
        result.finalParams[paramName] = defaultValue;
        result.injectedParams.push(`${paramName} (default)`);
      }
    }
  }

  /**
   * Generic parameter injection when no specific pattern is found
   */
  private applyGenericInjection(context: ParameterContext, result: InjectionResult): void {
    // Always try to inject program-id if missing
    if (!result.finalParams['program-id'] && context.environment.programId) {
      result.finalParams['program-id'] = context.environment.programId;
      result.injectedParams.push('program-id');
    }

    // Inject program-institution-id if missing and available
    if (!result.finalParams['program-institution-id'] && context.environment.programInstitutionId) {
      result.finalParams['program-institution-id'] = context.environment.programInstitutionId;
      result.injectedParams.push('program-institution-id');
    }
  }

  /**
   * Validate that all required parameters are present
   */
  private validateParameters(pattern: ParameterPattern | null, result: InjectionResult): void {
    if (!pattern) return;

    for (const requiredParam of pattern.requiredParams) {
      if (result.finalParams[requiredParam] === undefined || result.finalParams[requiredParam] === null) {
        result.warnings.push(`Required parameter '${requiredParam}' is missing`);
      }
    }
  }

  /**
   * Get parameter requirements for a specific operation
   * AI Assistant Usage: Query what parameters an operation needs before calling it
   */
  getParameterRequirements(operationName: string, endpoint: string): {
    required: string[];
    optional: string[];
    autoInjected: string[];
  } {
    const pattern = this.findParameterPattern(operationName, endpoint);
    
    if (!pattern) {
      return {
        required: [],
        optional: ['program-id', 'program-institution-id'],
        autoInjected: ['program-id', 'program-institution-id']
      };
    }

    return {
      required: pattern.requiredParams.filter(param => !Object.keys(pattern.autoInjectParams).includes(param)),
      optional: pattern.optionalParams,
      autoInjected: Object.keys(pattern.autoInjectParams)
    };
  }

  /**
   * Add or update parameter pattern for new operations
   * AI Assistant Usage: Teach the system about new parameter patterns discovered during usage
   */
  addParameterPattern(operationName: string, pattern: ParameterPattern): void {
    this.parameterPatterns.set(operationName, pattern);
  }

  /**
   * Get intelligent parameter suggestions for an operation
   * AI Assistant Usage: Get help on what parameters might be useful for an operation
   */
  getParameterSuggestions(operationName: string, endpoint: string, existingParams: Record<string, any>): string[] {
    const pattern = this.findParameterPattern(operationName, endpoint);
    if (!pattern) return [];

    const suggestions: string[] = [];
    
    // Suggest missing optional parameters
    for (const optionalParam of pattern.optionalParams) {
      if (!existingParams[optionalParam]) {
        suggestions.push(optionalParam);
      }
    }

    return suggestions;
  }

  /**
   * Format parameters for URL query string or request body
   * AI Assistant Usage: Get properly formatted parameters for different request types
   */
  formatParametersForRequest(
    params: Record<string, any>, 
    requestType: 'query' | 'body' = 'query'
  ): Record<string, any> {
    const formatted: Record<string, any> = {};

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        if (requestType === 'query') {
          // Convert to string for query parameters
          formatted[key] = String(value);
        } else {
          // Keep original type for body parameters
          formatted[key] = value;
        }
      }
    }

    return formatted;
  }
}
