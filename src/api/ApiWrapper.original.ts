/**
 * Intelligent API Wrapper for ITS API - AI Assistant Interaction Layer
 * 
 * This file provides a complete AI-friendly interface to the ITS API with:
 * - Semantic method names for natural language interaction
 * - Automatic parameter injection (program-id, program-institution-id, auth)
 * - Natural language operation discovery
 * - Comprehensive error handling and debugging
 * - Future-proof architecture for AI assistants
 * 
 * Created: August 21, 2025
 * Purpose: Enable natural language AI interaction with ITS API
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

// ===========================================
// TYPE DEFINITIONS
// ===========================================

export interface Environment {
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  programId?: string;
  programInstitutionId?: string;
  scope?: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

interface CachedToken {
  token: string;
  expiresAt: number;
  type: string;
}

export interface ApiCallResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
  injectedParameters: string[];
  warnings: string[];
  operationId: string;
  endpoint: string;
  executionTimeMs: number;
}

export interface OperationMetadata {
  id: string;
  name: string;
  semanticName: string;
  description: string;
  naturalLanguageDescription: string;
  category: string;
  endpoint: string;
  method: string;
  parameters: {
    required: string[];
    optional: string[];
    autoInjected: string[];
  };
  examples: Array<{
    title: string;
    description: string;
    input: Record<string, any>;
    expectedOutput: string;
    naturalLanguageQuery: string;
  }>;
  tags: string[];
  aiHints: string[];
}

export interface SemanticMatch {
  operation: OperationMetadata;
  relevanceScore: number;
  matchReason: string;
}

// ===========================================
// AUTHENTICATION MANAGER
// ===========================================

class AuthenticationManager {
  private environment: Environment = {} as Environment;
  private cachedToken: CachedToken | null = null;
  private readonly BUFFER_TIME_MS = 60000; // 1 minute buffer

  async loadEnvironment(environmentPath = './environments/238-stg.json'): Promise<void> {
    try {
      const envFile = await readFile(environmentPath, 'utf-8');
      const envData = JSON.parse(envFile);
      
      // Handle Postman environment format
      if (envData.values && Array.isArray(envData.values)) {
        const envMap: Record<string, string> = {};
        for (const item of envData.values) {
          if (item.enabled) {
            envMap[item.key] = item.value;
          }
        }
        
        this.environment = {
          tokenEndpoint: envMap['auth-url'],
          clientId: envMap['client-id'],
          clientSecret: envMap['client-secret'],
          baseUrl: envMap['baseUrl'],
          programId: envMap['program-id'],
          programInstitutionId: envMap['program-institution-id'],
          scope: envMap['scope']
        };
      } else {
        // Handle flat JSON format
        this.environment = envData as Environment;
      }
      
      if (!this.environment.tokenEndpoint || !this.environment.clientId || !this.environment.clientSecret) {
        throw new Error('Environment file missing required OAuth2 configuration');
      }
      
      console.log(`🔐 Authentication environment loaded: ${environmentPath}`);
      console.log(`   Token Endpoint: ${this.environment.tokenEndpoint}`);
      console.log(`   Base URL: ${this.environment.baseUrl}`);
      console.log(`   Program ID: ${this.environment.programId}`);
      console.log(`   Program Institution ID: ${this.environment.programInstitutionId}`);
    } catch (error) {
      throw new Error(`Failed to load environment from ${environmentPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.cachedToken && Date.now() < this.cachedToken.expiresAt) {
      return this.cachedToken.token;
    }

    // Request new token
    await this.refreshToken();
    
    if (!this.cachedToken) {
      throw new Error('Failed to obtain access token');
    }

    return this.cachedToken.token;
  }

  async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await this.getAccessToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  getEnvironment(): Environment {
    return this.environment;
  }

  private async refreshToken(): Promise<void> {
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.environment.clientId,
      client_secret: this.environment.clientSecret,
      ...(this.environment.scope && { scope: this.environment.scope })
    });

    try {
      const response = await fetch(this.environment.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OAuth2 token request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const tokenData = await response.json() as TokenResponse;
      
      this.cachedToken = {
        token: tokenData.access_token,
        type: tokenData.token_type || 'Bearer',
        expiresAt: Date.now() + (tokenData.expires_in * 1000) - this.BUFFER_TIME_MS
      };

      console.log(`🔄 OAuth2 token refreshed, expires in ${Math.round(tokenData.expires_in / 60)} minutes`);
    } catch (error) {
      console.error('❌ Failed to refresh OAuth2 token:', error);
      throw error;
    }
  }

  isConfigured(): boolean {
    return !!(this.environment.tokenEndpoint && 
              this.environment.clientId && 
              this.environment.clientSecret && 
              this.environment.baseUrl);
  }

  getBaseUrl(): string {
    return this.environment.baseUrl;
  }

  clearCache(): void {
    this.cachedToken = null;
    console.log('🗑️ Authentication cache cleared');
  }
}

// ===========================================
// PARAMETER INJECTION SYSTEM
// ===========================================

class ParameterInjector {
  injectParameters(context: {
    environment: Environment;
    operationName: string;
    userParams: Record<string, any>;
    endpoint: string;
  }): {
    finalParams: Record<string, any>;
    injectedParams: string[];
    warnings: string[];
  } {
    const result = {
      finalParams: { ...context.userParams },
      injectedParams: [] as string[],
      warnings: [] as string[]
    };

    // Auto-inject program-id if missing
    if (!result.finalParams['program-id'] && context.environment.programId) {
      result.finalParams['program-id'] = context.environment.programId;
      result.injectedParams.push('program-id');
    }

    // Auto-inject program-institution-id if missing
    if (!result.finalParams['program-institution-id'] && context.environment.programInstitutionId) {
      result.finalParams['program-institution-id'] = context.environment.programInstitutionId;
      result.injectedParams.push('program-institution-id');
    }

    return result;
  }

  formatParametersForRequest(params: Record<string, any>, requestType: 'query' | 'body' = 'query'): Record<string, any> {
    const formatted: Record<string, any> = {};

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        if (requestType === 'query') {
          formatted[key] = String(value);
        } else {
          formatted[key] = value;
        }
      }
    }

    return formatted;
  }
}

// ===========================================
// OPERATION REGISTRY
// ===========================================

class OperationRegistry {
  private operations: Map<string, OperationMetadata> = new Map();
  private semanticIndex: Map<string, string[]> = new Map();

  constructor() {
    this.initializeOperations();
    this.buildSemanticIndex();
  }

  private initializeOperations(): void {
    // Channel/Institution Operations
    this.addOperation({
      id: 'channel-institution-query',
      name: 'channelInstitutionQuery',
      semanticName: 'findInstitutionsByChannel',
      description: 'Query institutions by delivery channel',
      naturalLanguageDescription: 'Find all schools and institutions that offer programs through a specific delivery method like online, campus-based, or hybrid learning',
      category: 'institutions',
      endpoint: '/channel/institutions/query',
      method: 'GET',
      parameters: {
        required: ['program-id'],
        optional: ['program-institution-id', 'channel', 'include-inactive'],
        autoInjected: ['program-id', 'program-institution-id']
      },
      examples: [
        {
          title: 'Find online institutions',
          description: 'Get all institutions offering online programs',
          input: { channel: 'online' },
          expectedOutput: 'List of institutions with online delivery channels',
          naturalLanguageQuery: 'What schools offer online programs?'
        }
      ],
      tags: ['institutions', 'channels', 'delivery', 'schools'],
      aiHints: [
        'Use "online", "campus", or "hybrid" for channel parameter',
        'Results include institution details and available programs'
      ]
    });

    // Programs Operations
    this.addOperation({
      id: 'programs-query',
      name: 'programsQuery',
      semanticName: 'findPrograms',
      description: 'Query available programs',
      naturalLanguageDescription: 'Search for academic programs, degrees, and courses offered by institutions',
      category: 'programs',
      endpoint: '/programs/query',
      method: 'GET',
      parameters: {
        required: ['program-id'],
        optional: ['program-institution-id', 'active-only', 'include-details'],
        autoInjected: ['program-id', 'program-institution-id']
      },
      examples: [
        {
          title: 'Find all programs',
          description: 'Get complete list of available programs',
          input: {},
          expectedOutput: 'List of programs with details',
          naturalLanguageQuery: 'What programs are available?'
        }
      ],
      tags: ['programs', 'degrees', 'courses', 'academic'],
      aiHints: [
        'Returns program details including requirements and descriptions'
      ]
    });
  }

  private addOperation(metadata: OperationMetadata): void {
    this.operations.set(metadata.id, metadata);
  }

  private buildSemanticIndex(): void {
    for (const [id, operation] of this.operations.entries()) {
      const words = [
        ...operation.semanticName.toLowerCase().split(/(?=[A-Z])|[\s-_]/),
        ...operation.naturalLanguageDescription.toLowerCase().split(/\s+/),
        ...operation.tags
      ];

      for (const word of words) {
        const cleanWord = word.toLowerCase().trim();
        if (cleanWord.length > 2) {
          if (!this.semanticIndex.has(cleanWord)) {
            this.semanticIndex.set(cleanWord, []);
          }
          if (!this.semanticIndex.get(cleanWord)!.includes(id)) {
            this.semanticIndex.get(cleanWord)!.push(id);
          }
        }
      }
    }
  }

  getOperation(id: string): OperationMetadata | undefined {
    return this.operations.get(id);
  }

  searchOperations(query: string): SemanticMatch[] {
    const queryWords = query.toLowerCase().split(/\s+/);
    const matches: Map<string, { score: number; reasons: string[] }> = new Map();

    for (const word of queryWords) {
      if (this.semanticIndex.has(word)) {
        for (const operationId of this.semanticIndex.get(word)!) {
          if (!matches.has(operationId)) {
            matches.set(operationId, { score: 0, reasons: [] });
          }
          matches.get(operationId)!.score += 1;
          matches.get(operationId)!.reasons.push(`matches "${word}"`);
        }
      }
    }

    const results: SemanticMatch[] = [];
    for (const [operationId, match] of matches.entries()) {
      const operation = this.operations.get(operationId);
      if (operation) {
        results.push({
          operation,
          relevanceScore: match.score,
          matchReason: match.reasons.join(', ')
        });
      }
    }

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  getAllOperations(): OperationMetadata[] {
    return Array.from(this.operations.values());
  }

  getCategories(): string[] {
    const categories = new Set(Array.from(this.operations.values()).map(op => op.category));
    return Array.from(categories).sort();
  }
}

// ===========================================
// MAIN API WRAPPER CLASS
// ===========================================

export class ApiWrapper {
  private auth: AuthenticationManager;
  private paramInjector: ParameterInjector;
  private operationRegistry: OperationRegistry;
  private isInitialized = false;

  constructor() {
    this.auth = new AuthenticationManager();
    this.paramInjector = new ParameterInjector();
    this.operationRegistry = new OperationRegistry();
  }

  /**
   * Initialize the API wrapper with environment configuration
   * AI Assistant Usage: Call this first before making any API requests
   */
  async initialize(environmentPath = './environments/238-stg.json'): Promise<void> {
    await this.auth.loadEnvironment(environmentPath);
    this.isInitialized = true;
    console.log('🚀 API Wrapper initialized and ready for AI assistant interaction');
  }

  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('ApiWrapper not initialized. Call initialize() first.');
    }
  }

  // ===========================================
  // SEMANTIC API OPERATIONS (AI-Friendly Names)
  // ===========================================

  /**
   * Find institutions that offer programs through specific delivery channels
   * AI Assistant Usage: "What schools offer online programs?"
   */
  async findInstitutionsByChannel(params: {
    channel?: string;
    includeInactive?: boolean;
    programId?: string;
    programInstitutionId?: string;
  } = {}): Promise<ApiCallResult> {
    return this.executeOperation('channel-institution-query', params);
  }

  /**
   * Find all available programs
   * AI Assistant Usage: "What programs are available?"
   */
  async findPrograms(params: {
    activeOnly?: boolean;
    includeDetails?: boolean;
    programId?: string;
    programInstitutionId?: string;
  } = {}): Promise<ApiCallResult> {
    return this.executeOperation('programs-query', params);
  }

  // ===========================================
  // NATURAL LANGUAGE OPERATION DISCOVERY
  // ===========================================

  /**
   * Search for operations using natural language
   * AI Assistant Usage: "What operations help me find schools?"
   */
  searchOperations(naturalLanguageQuery: string): SemanticMatch[] {
    return this.operationRegistry.searchOperations(naturalLanguageQuery);
  }

  /**
   * Get all available operations organized by category
   * AI Assistant Usage: Browse available functionality
   */
  getAvailableOperations(): { [category: string]: OperationMetadata[] } {
    const categories = this.operationRegistry.getCategories();
    const result: { [category: string]: OperationMetadata[] } = {};
    
    for (const category of categories) {
      const operations = this.operationRegistry.getAllOperations()
        .filter(op => op.category === category);
      result[category] = operations;
    }
    
    return result;
  }

  /**
   * Get detailed information about a specific operation
   * AI Assistant Usage: Learn how to use an operation before calling it
   */
  getOperationInfo(operationId: string): OperationMetadata | undefined {
    return this.operationRegistry.getOperation(operationId);
  }

  // ===========================================
  // DIRECT OPERATION EXECUTION
  // ===========================================

  /**
   * Execute any operation by ID with automatic parameter injection
   * AI Assistant Usage: Call any operation once you know its ID
   */
  async executeOperation(
    operationId: string, 
    userParams: Record<string, any> = {},
    options: { timeout?: number } = {}
  ): Promise<ApiCallResult> {
    this.ensureInitialized();

    const startTime = Date.now();
    const operation = this.operationRegistry.getOperation(operationId);
    
    if (!operation) {
      return {
        success: false,
        error: `Unknown operation: ${operationId}`,
        injectedParameters: [],
        warnings: [`Operation '${operationId}' not found in registry`],
        operationId,
        endpoint: 'unknown',
        executionTimeMs: Date.now() - startTime
      };
    }

    try {
      // Inject parameters intelligently
      const injection = this.paramInjector.injectParameters({
        environment: this.auth.getEnvironment(),
        operationName: operation.name,
        userParams,
        endpoint: operation.endpoint
      });

      // Get authentication headers
      const authHeaders = await this.auth.getAuthHeaders();

      // Build request URL
      const baseUrl = this.auth.getBaseUrl();
      const url = new URL(operation.endpoint, baseUrl);

      // Add query parameters for GET requests
      if (operation.method === 'GET') {
        const queryParams = this.paramInjector.formatParametersForRequest(injection.finalParams, 'query');
        for (const [key, value] of Object.entries(queryParams)) {
          url.searchParams.append(key, String(value));
        }
      }

      // Make the API request
      const requestInit: RequestInit = {
        method: operation.method,
        headers: authHeaders,
        ...(options.timeout && { signal: AbortSignal.timeout(options.timeout) })
      };

      // Add body for non-GET requests
      if (operation.method !== 'GET') {
        requestInit.body = JSON.stringify(injection.finalParams);
      }

      console.log(`🔄 Executing ${operation.semanticName}:`, {
        endpoint: operation.endpoint,
        injectedParams: injection.injectedParams,
        finalParams: injection.finalParams
      });

      const response = await fetch(url.toString(), requestInit);
      const responseData = await response.json();

      const result: ApiCallResult = {
        success: response.ok,
        data: response.ok ? responseData : undefined,
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
        statusCode: response.status,
        injectedParameters: injection.injectedParams,
        warnings: injection.warnings,
        operationId,
        endpoint: operation.endpoint,
        executionTimeMs: Date.now() - startTime
      };

      // Log result for AI assistant learning
      if (result.success) {
        console.log(`✅ ${operation.semanticName} succeeded in ${result.executionTimeMs}ms`);
      } else {
        console.log(`❌ ${operation.semanticName} failed:`, result.error);
      }

      return result;

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        injectedParameters: [],
        warnings: ['Request failed due to network or parsing error'],
        operationId,
        endpoint: operation.endpoint,
        executionTimeMs: Date.now() - startTime
      };
    }
  }

  // ===========================================
  // AI ASSISTANT HELPER METHODS
  // ===========================================

  /**
   * Test API connection and authentication
   * AI Assistant Usage: Verify everything is working before making real requests
   */
  async testConnection(): Promise<{
    authenticated: boolean;
    environmentLoaded: boolean;
    baseUrl: string;
    availableOperations: number;
  }> {
    this.ensureInitialized();

    let authenticated = false;
    try {
      await this.auth.getAccessToken();
      authenticated = true;
    } catch (error) {
      console.log('❌ Authentication test failed:', error);
    }

    return {
      authenticated,
      environmentLoaded: this.auth.isConfigured(),
      baseUrl: this.auth.getBaseUrl(),
      availableOperations: this.operationRegistry.getAllOperations().length
    };
  }

  /**
   * Get comprehensive status for AI assistant debugging
   * AI Assistant Usage: Check system status when troubleshooting issues
   */
  getSystemStatus(): {
    initialized: boolean;
    authenticated: boolean;
    operationsAvailable: number;
    environment: Environment;
    categories: string[];
  } {
    return {
      initialized: this.isInitialized,
      authenticated: this.auth.isConfigured(),
      operationsAvailable: this.operationRegistry.getAllOperations().length,
      environment: this.auth.getEnvironment(),
      categories: this.operationRegistry.getCategories()
    };
  }
}

// Export default instance for easy usage
export default ApiWrapper;
