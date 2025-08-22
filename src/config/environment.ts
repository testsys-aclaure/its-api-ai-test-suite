/**
 * Environment Configuration Management
 * Centralizes all environment variable handling for the AI-Native Educational Testing Platform
 */

export interface EnvironmentConfig {
  // API Configuration
  baseUrl: string;
  tokenUrl: string;
  
  // OAuth2 Authentication
  clientId: string;
  clientSecret: string;
  scope: string;
  
  // Default Test Parameters
  defaultProgramId: string;
  programInstitutionId: string;
  parentProgramInstitutionId: string;
  vendorId: string;
  sponsorId: string;
  
  // Test Event Data (for consistent testing)
  testEventIds: string[];
  testEventDescriptions: string[];
}

class EnvironmentConfigManager {
  private static instance: EnvironmentConfigManager;
  private config: EnvironmentConfig | null = null;
  
  private constructor() {}
  
  static getInstance(): EnvironmentConfigManager {
    if (!EnvironmentConfigManager.instance) {
      EnvironmentConfigManager.instance = new EnvironmentConfigManager();
    }
    return EnvironmentConfigManager.instance;
  }
  
  /**
   * Initialize and validate environment configuration
   */
  initialize(): EnvironmentConfig {
    if (this.config) {
      return this.config;
    }
    
    // Required environment variables
    const requiredVars = {
      baseUrl: process.env.BASE_URL,
      tokenUrl: process.env.TOKEN_URL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      defaultProgramId: process.env.DEFAULT_PROGRAM_ID,
      programInstitutionId: process.env.PROGRAM_INSTITUTION_ID
    };
    
    // Check for missing required variables
    const missing = Object.entries(requiredVars)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key);
      
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    
    // Optional environment variables with intelligent defaults
    this.config = {
      baseUrl: requiredVars.baseUrl!,
      tokenUrl: requiredVars.tokenUrl!,
      clientId: requiredVars.clientId!,
      clientSecret: requiredVars.clientSecret!,
      scope: process.env.SCOPE || 'https://api-staging.testsys.io',
      defaultProgramId: requiredVars.defaultProgramId!,
      programInstitutionId: requiredVars.programInstitutionId!,
      parentProgramInstitutionId: process.env.PARENT_PROGRAM_INSTITUTION_ID || requiredVars.programInstitutionId!,
      vendorId: process.env.VENDOR_ID || '14',
      sponsorId: process.env.SPONSOR_ID || '12',
      
      // Test data from environment or intelligent discovery
      testEventIds: process.env.TEST_EVENT_IDS?.split(',') || ['1', '2', '3', '4', '5'],
      testEventDescriptions: process.env.TEST_EVENT_DESCRIPTIONS?.split(',') || [
        'ITS PPV- 18',
        'ITS PPV 2 - 4NIC19',
        'ITS PPV 3- 4NIC24',
        'ITS PPV4- 4NIC29',
        'ITS PPV 4NIC34'
      ]
    };
    
    return this.config;
  }
  
  /**
   * Get configuration with validation
   */
  getConfig(): EnvironmentConfig {
    if (!this.config) {
      return this.initialize();
    }
    return this.config;
  }
  
  /**
   * AI-NATIVE: Get intelligent default parameters for any endpoint
   */
  getDefaultParameters(): Record<string, string> {
    const config = this.getConfig();
    return {
      'program-id': config.defaultProgramId,
      'program-institution-id': config.programInstitutionId,
      'vendor-id': config.vendorId,
      'sponsor-id': config.sponsorId
    };
  }
  
  /**
   * AI-NATIVE: Get test event ID with rotation for varied testing
   */
  getTestEventId(index: number = 0): string {
    const config = this.getConfig();
    const eventId = config.testEventIds[index % config.testEventIds.length];
    if (!eventId) {
      throw new Error(`No test event ID available at index ${index}`);
    }
    return eventId;
  }
  
  /**
   * AI-NATIVE: Get test event description
   */
  getTestEventDescription(index: number = 0): string {
    const config = this.getConfig();
    const description = config.testEventDescriptions[index % config.testEventDescriptions.length];
    if (!description) {
      throw new Error(`No test event description available at index ${index}`);
    }
    return description;
  }
  
  /**
   * Check if running in test environment
   */
  isTestEnvironment(): boolean {
    return (process.env.NODE_ENV === 'test') || 
           (process.env.BASE_URL?.includes('staging') === true) ||
           (process.env.BASE_URL?.includes('test') === true);
  }
  
  /**
   * Check if environment is properly configured
   */
  isConfigured(): boolean {
    return !!(process.env.BASE_URL && process.env.DEFAULT_PROGRAM_ID && process.env.CLIENT_ID && process.env.CLIENT_SECRET);
  }
  
  /**
   * Get base URL for API calls
   */
  getBaseUrl(): string {
    return this.getConfig().baseUrl;
  }
  
  /**
   * Get default program ID
   */
  getDefaultProgramId(): string {
    return this.getConfig().defaultProgramId;
  }
  
  /**
   * Get program institution ID
   */
  getProgramInstitutionId(): string {
    return this.getConfig().programInstitutionId;
  }
  
  /**
   * Get vendor ID
   */
  getVendorId(): string {
    return this.getConfig().vendorId;
  }
  
  /**
   * Get sponsor ID
   */
  getSponsorId(): string {
    return this.getConfig().sponsorId;
  }
}

// Export singleton instance
export const EnvironmentConfig = EnvironmentConfigManager.getInstance();
