/**
 * Environment Configuration Manager - AI-NATIVE
 * Loads configuration from multiple sources with fallback hierarchy:
 * 1. Process environment variables (.env file)
 * 2. Postman environment file (238-stg.json)
 * 3. Built-in intelligent defaults
 * 
 * AI-Native Features:
 * - Self-describing configuration with business context
 * - Validation with actionable error messages
 * - Environment-driven parameter mapping
 * - No hardcoded values - all configurable
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

export interface PostmanEnvironment {
  values: Array<{
    key: string;
    value: string;
    enabled: boolean;
  }>;
}

export interface EnvironmentMetadata {
  source: 'env' | 'postman' | 'default';
  configFile?: string;
  businessContext: string;
  lastLoaded: Date;
}

/**
 * AI-NATIVE Environment Configuration Manager
 * Provides environment-driven configuration with intelligent fallbacks
 */
export class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private static config: Map<string, any> = new Map();
  private static metadata: Map<string, EnvironmentMetadata> = new Map();
  private static initialized = false;

  /**
   * Initialize configuration from all available sources
   * Must be called before any other methods
   */
  static async initialize(): Promise<void> {
    if (this.initialized) return;

    // Load from .env file first (highest priority)
    dotenv.config();

    // Load from Postman environment as fallback
    await this.loadPostmanEnvironment();

    // Set intelligent defaults
    this.setDefaults();

    // Validate critical configuration
    this.validateConfiguration();

    this.initialized = true;
  }

  /**
   * Load configuration from Postman environment file
   */
  private static async loadPostmanEnvironment(): Promise<void> {
    const postmanFile = resolve(process.cwd(), '238-stg.json');
    
    if (!existsSync(postmanFile)) {
      console.warn('⚠️ Postman environment file not found:', postmanFile);
      return;
    }

    try {
      const postmanData: PostmanEnvironment = JSON.parse(readFileSync(postmanFile, 'utf-8'));
      
      for (const variable of postmanData.values) {
        if (variable.enabled) {
          const envKey = this.mapPostmanToEnvKey(variable.key);
          
          // Only use Postman value if not already set in .env
          if (!process.env[envKey]) {
            this.config.set(envKey, variable.value);
            this.metadata.set(envKey, {
              source: 'postman',
              configFile: '238-stg.json',
              businessContext: this.getBusinessContext(variable.key),
              lastLoaded: new Date()
            });
          } else {
            this.metadata.set(envKey, {
              source: 'env',
              businessContext: this.getBusinessContext(variable.key),
              lastLoaded: new Date()
            });
          }
        }
      }
      console.log('✅ Loaded Postman environment configuration');
    } catch (error) {
      console.error('❌ Failed to load Postman environment:', error);
    }
  }

  /**
   * Map Postman variable names to environment variable names
   */
  private static mapPostmanToEnvKey(postmanKey: string): string {
    const mapping: Record<string, string> = {
      'baseUrl': 'BASE_URL',
      'program-id': 'DEFAULT_PROGRAM_ID',
      'client-id': 'CLIENT_ID',
      'client-secret': 'CLIENT_SECRET',
      'auth-url': 'TOKEN_URL',
      'scope': 'SCOPE',
      'vendor-id': 'VENDOR_ID',
      'sponsor-id': 'SPONSOR_ID',
      'program-institution-id': 'PROGRAM_INSTITUTION_ID',
      'parent-program-institution-id': 'PARENT_PROGRAM_INSTITUTION_ID'
    };
    
    return mapping[postmanKey] || postmanKey.toUpperCase().replace(/-/g, '_');
  }

  /**
   * Get business context for configuration keys
   */
  private static getBusinessContext(key: string): string {
    const contexts: Record<string, string> = {
      'baseUrl': 'API endpoint for educational testing platform',
      'program-id': 'Default program identifier for test sessions',
      'client-id': 'OAuth2 client identifier for API authentication',
      'client-secret': 'OAuth2 client secret for secure authentication',
      'auth-url': 'Token endpoint for OAuth2 authentication flow',
      'scope': 'API access scope for testing operations',
      'vendor-id': 'Vendor identifier for test administration',
      'sponsor-id': 'Sponsor organization identifier',
      'program-institution-id': 'Institution identifier for test programs',
      'parent-program-institution-id': 'Parent institution identifier'
    };
    
    return contexts[key] || 'Configuration parameter for testing platform';
  }

  /**
   * Set intelligent defaults for missing configuration
   */
  private static setDefaults(): void {
    const defaults = {
      BASE_URL: 'https://api-staging.testsys.io',
      TOKEN_URL: 'https://identity-staging.testsys.io/connect/token',
      SCOPE: 'https://api-staging.testsys.io',
      DEFAULT_PROGRAM_ID: '238'
    };

    for (const [key, value] of Object.entries(defaults)) {
      if (!process.env[key] && !this.config.has(key)) {
        this.config.set(key, value);
        this.metadata.set(key, {
          source: 'default',
          businessContext: this.getBusinessContext(key),
          lastLoaded: new Date()
        });
      }
    }
  }

  /**
   * Validate that all critical configuration is present
   */
  private static validateConfiguration(): void {
    const required = [
      'BASE_URL',
      'CLIENT_ID', 
      'CLIENT_SECRET',
      'TOKEN_URL',
      'DEFAULT_PROGRAM_ID'
    ];

    const missing = required.filter(key => 
      !process.env[key] && !this.config.has(key)
    );

    if (missing.length > 0) {
      throw new Error(`❌ Missing required configuration: ${missing.join(', ')}\n` +
        'Please check your .env file or 238-stg.json Postman environment'
      );
    }

    console.log('✅ Environment configuration validated successfully');
  }

  // AI-NATIVE: Getter methods for common configuration
  static getBaseUrl(): string {
    this.ensureInitialized();
    return process.env.BASE_URL || this.config.get('BASE_URL');
  }

  static getClientId(): string {
    this.ensureInitialized();
    return process.env.CLIENT_ID || this.config.get('CLIENT_ID');
  }

  static getClientSecret(): string {
    this.ensureInitialized();
    return process.env.CLIENT_SECRET || this.config.get('CLIENT_SECRET');
  }

  static getTokenUrl(): string {
    this.ensureInitialized();
    return process.env.TOKEN_URL || this.config.get('TOKEN_URL');
  }

  static getScope(): string {
    this.ensureInitialized();
    return process.env.SCOPE || this.config.get('SCOPE');
  }

  static getDefaultProgramId(): string {
    this.ensureInitialized();
    return process.env.DEFAULT_PROGRAM_ID || this.config.get('DEFAULT_PROGRAM_ID');
  }

  static getProgramInstitutionId(): string {
    this.ensureInitialized();
    return process.env.PROGRAM_INSTITUTION_ID || this.config.get('PROGRAM_INSTITUTION_ID');
  }

  static getParentProgramInstitutionId(): string {
    this.ensureInitialized();
    return process.env.PARENT_PROGRAM_INSTITUTION_ID || this.config.get('PARENT_PROGRAM_INSTITUTION_ID');
  }

  static getVendorId(): string {
    this.ensureInitialized();
    return process.env.VENDOR_ID || this.config.get('VENDOR_ID');
  }

  static getSponsorId(): string {
    this.ensureInitialized();
    return process.env.SPONSOR_ID || this.config.get('SPONSOR_ID');
  }

  /**
   * AI-NATIVE: Get universal parameters that should be included in most API calls
   * Returns parameters that are commonly needed across endpoints
   */
  static getUniversalParameters(): Record<string, string> {
    this.ensureInitialized();
    
    const params: Record<string, string> = {
      'program-id': this.getDefaultProgramId()
    };

    // Add institution ID if available
    const institutionId = this.getProgramInstitutionId();
    if (institutionId) {
      params['program-institution-id'] = institutionId;
    }

    return params;
  }

  /**
   * AI-NATIVE: Get configuration metadata for transparency
   */
  static getConfigurationReport(): Record<string, any> {
    this.ensureInitialized();
    
    return {
      baseUrl: {
        value: this.getBaseUrl(),
        metadata: this.metadata.get('BASE_URL')
      },
      authentication: {
        clientId: this.getClientId(),
        tokenUrl: this.getTokenUrl(),
        scope: this.getScope(),
        metadata: {
          clientId: this.metadata.get('CLIENT_ID'),
          tokenUrl: this.metadata.get('TOKEN_URL'),
          scope: this.metadata.get('SCOPE')
        }
      },
      programs: {
        defaultProgramId: this.getDefaultProgramId(),
        institutionId: this.getProgramInstitutionId(),
        parentInstitutionId: this.getParentProgramInstitutionId(),
        metadata: {
          program: this.metadata.get('DEFAULT_PROGRAM_ID'),
          institution: this.metadata.get('PROGRAM_INSTITUTION_ID'),
          parent: this.metadata.get('PARENT_PROGRAM_INSTITUTION_ID')
        }
      },
      universalParameters: this.getUniversalParameters(),
      loadedAt: new Date().toISOString()
    };
  }

  /**
   * Ensure configuration is initialized before use
   */
  private static ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('❌ EnvironmentConfig not initialized. Call EnvironmentConfig.initialize() first.');
    }
  }
}
