/**
 * Parameter type definitions for the ITS API
 */

export interface APIParameters {
  'program-id'?: string;
  'program-institution-id'?: string;
  'event-id'?: string;
  'event-description'?: string;
  'session-code'?: string;
  'start-utc'?: string;
  'end-utc'?: string;
  'longitudinal-group-id'?: string;
  'longitudinal-group-name'?: string;
  'parent-program-institution-id'?: string;
  'bank-id'?: string;
  'language'?: string;
  'folder-id'?: string;
  'form-id'?: string;
  [key: string]: any;
}

export interface SemanticIntent {
  program?: string;
  event?: string | number;
  description?: string;
  institution?: string;
  session?: string;
  startDate?: string;
  endDate?: string;
  longitudinalGroup?: string | number;
  [key: string]: any;
}

export interface EndpointMetadata {
  businessIntent: string;
  semanticNames: string[];
  businessDomain: string;
  parameters: {
    required: string[];
    conditional?: string[];
    businessMeaning: Record<string, string>;
  };
  useCases: string[];
}
