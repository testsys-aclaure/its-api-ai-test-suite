/**
 * Custom error classes for the ITS API AI Test Suite
 */

export class ValidationError extends Error {
  public readonly parameter?: string;
  public readonly required?: boolean;
  public readonly documentation?: string;
  public readonly alternatives?: string[];
  public readonly endpoints?: string[];
  
  constructor(
    message: string, 
    details?: {
      parameter?: string;
      required?: boolean;
      documentation?: string;
      alternatives?: string[];
      endpoints?: string[];
    }
  ) {
    super(message);
    this.name = 'ValidationError';
    Object.assign(this, details);
  }
}

export class APIError extends Error {
  public readonly endpoint?: string;
  public readonly method?: string;
  public readonly status?: number;
  public readonly params?: any;
  public readonly businessContext?: string;
  
  constructor(
    message: string,
    details?: {
      endpoint?: string;
      method?: string;
      status?: number;
      params?: any;
      businessContext?: string;
    }
  ) {
    super(message);
    this.name = 'APIError';
    Object.assign(this, details);
  }
}
