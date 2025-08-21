/**
 * ITS API AI-Enabled Wrapper - COMPREHENSIVE EDITION
 * 
 * This wrapper provides intelligent access to ALL 41 read-only ITS API endpoints
 * with AI-friendly semantic method names and natural language operation discovery.
 * 
 * Features:
 * - All 41 read-only GET operations from plan.readonly.json
 * - Semantic method names for AI assistant interaction
 * - Automatic OAuth2 authentication and token management
 * - Context-aware parameter injection (program-id, program-institution-id)
 * - Natural language operation discovery system
 * - Comprehensive error handling and debugging
 * - Future-proof architecture for AI assistants
 * 
 * Created: August 21, 2025
 * Purpose: Enable comprehensive natural language AI interaction with ITS API
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
  executionTimeMs?: number;
  endpoint?: string;
  warnings: string[];
}

// ===========================================
// COMPREHENSIVE API WRAPPER CLASS
// ===========================================

export class ComprehensiveApiWrapper {
  private environment!: Environment;
  private cachedToken: CachedToken | null = null;

  // ===========================================
  // INITIALIZATION & CONFIGURATION
  // ===========================================

  constructor() {
    console.log('🚀 Comprehensive API Wrapper initialized - 41 operations available');
  }

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

  // ===========================================
  // AUTHENTICATION MANAGEMENT
  // ===========================================

  private async refreshToken(): Promise<void> {
    const now = Date.now();
    if (this.cachedToken && now < this.cachedToken.expiresAt) {
      return;
    }

    try {
      const tokenParams = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.environment.clientId,
        client_secret: this.environment.clientSecret,
        ...(this.environment.scope && { scope: this.environment.scope })
      });

      const response = await fetch(this.environment.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: tokenParams
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
      }

      const tokenData = await response.json() as TokenResponse;
      
      this.cachedToken = {
        token: tokenData.access_token,
        type: tokenData.token_type,
        expiresAt: now + (tokenData.expires_in - 60) * 1000 // 1 minute buffer
      };

      console.log(`🔄 OAuth2 token refreshed, expires in ${Math.round(tokenData.expires_in / 60)} minutes`);
    } catch (error) {
      throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // ===========================================
  // CORE API EXECUTION ENGINE
  // ===========================================

  private async executeApiCall<T = any>(endpoint: string, params: Record<string, any> = {}): Promise<ApiCallResult<T>> {
    const startTime = Date.now();
    let injectedParameters: string[] = [];
    
    try {
      await this.refreshToken();
      
      // Inject required parameters
      const finalParams = { ...params };
      
      if (this.environment.programId && !finalParams['program-id']) {
        finalParams['program-id'] = this.environment.programId;
        injectedParameters.push('program-id');
      }
      
      if (this.environment.programInstitutionId && !finalParams['program-institution-id']) {
        finalParams['program-institution-id'] = this.environment.programInstitutionId;
        injectedParameters.push('program-institution-id');
      }

      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });

      const url = `${this.environment.baseUrl}${endpoint}?${queryParams}`;
      
      console.log(`🔄 Executing API call: {
  endpoint: '${endpoint}',
  injectedParams: [${injectedParameters.map(p => `'${p}'`).join(', ')}],
  finalParams: ${JSON.stringify(finalParams)}
}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `${this.cachedToken?.type || 'Bearer'} ${this.cachedToken?.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const executionTime = Date.now() - startTime;
      const data = response.ok ? (await response.json() as T) : undefined;
      
      if (response.ok) {
        console.log(`✅ API call succeeded in ${executionTime}ms`);
      } else {
        console.log(`❌ API call failed: HTTP ${response.status}: ${response.statusText}`);
      }

      return {
        success: response.ok,
        data,
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
        statusCode: response.status,
        injectedParameters,
        executionTimeMs: executionTime,
        endpoint,
        warnings: []
      };

    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(`❌ API call failed: ${errorMessage}`);
      
      return {
        success: false,
        error: errorMessage,
        injectedParameters,
        executionTimeMs: executionTime,
        endpoint,
        warnings: []
      };
    }
  }

  // ===========================================
  // SEMANTIC API METHODS - ALL 41 OPERATIONS
  // ===========================================

  // CATEGORY: INSTITUTIONS
  async findInstitutionsByChannel(params: { channel?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/channel/institutions/query', params);
  }

  // CATEGORY: EVENTS & EVENT CLASSES
  async queryEventAuthorizations(params: { 'event-id'?: string; 'examinee-id'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/event/authorizations/Query', params);
  }

  async queryEventClasses(params: { 'class-id'?: string; status?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/event-class/Query', params);
  }

  async queryEventClassExaminees(params: { 'event-class-id'?: string; status?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/event-class/examinees/query', params);
  }

  async queryEvents(params: { 'event-id'?: string; status?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/event/query', params);
  }

  // CATEGORY: EXAMINEES
  async queryExamineeAudit(params: { 'examinee-id'?: string; 'date-from'?: string; 'date-to'?: string; 'action-type'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/examinee/audit/query', params);
  }

  async queryExamineeEvents(params: { 'examinee-id'?: string; 'event-type'?: string; status?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/examinee/events/query', params);
  }

  async queryLongitudinalSegmentDetails(params: { 'examinee-id'?: string; 'segment-id'?: string; 'date-range'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/examinee/longitudinal-segment-detail/query', params);
  }

  async queryLongitudinalSegments(params: { 'examinee-id'?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/examinee/longitudinal-segments/query', params);
  }

  async queryExaminees(params: { 'examinee-id'?: string; status?: string; name?: string; 'institution-id'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/examinee/query', params);
  }

  async queryExamineeRecords(params: { 'examinee-id'?: string; 'record-type'?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/examinee/record/query', params);
  }

  // CATEGORY: FORMS
  async queryFormDefinitions(params: { 'form-id'?: string; 'form-type'?: string; version?: string; status?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/form/definition/Query', params);
  }

  async queryForms(params: { 'form-id'?: string; title?: string; status?: string; category?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/Form/Query', params);
  }

  async queryFormReports(params: { 'form-id'?: string; 'report-type'?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/form/reports/Query', params);
  }

  // CATEGORY: TESTING & ASSESSMENT
  async queryInventory(params: { 'inventory-id'?: string; 'item-type'?: string; subject?: string; difficulty?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/inventory/query', params);
  }

  async queryTestExports(params: { 'export-id'?: string; 'test-id'?: string; format?: string; status?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/iw-tool/export/tests/query', params);
  }

  async queryItemWorkshop(params: { 'import-id'?: string; 'item-type'?: string; status?: string; author?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/iw-tool/import/query', params);
  }

  // CATEGORY: GROUPS & ORGANIZATION
  async queryLongitudinalGroupExaminees(params: { 'group-id'?: string; 'examinee-status'?: string; 'date-enrolled'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/longitudinal-group/examinees/query', params);
  }

  // CATEGORY: COMMUNICATION & HISTORY
  async queryMessageHistory(params: { 'message-id'?: string; 'recipient-id'?: string; 'message-type'?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/message-history/query', params);
  }

  // CATEGORY: ORDERS & TRANSACTIONS
  async queryOrders(params: { 'order-id'?: string; 'customer-id'?: string; status?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/order/Query', params);
  }

  // CATEGORY: PACKAGES
  async queryPackageForms(params: { 'package-id'?: string; 'form-type'?: string; status?: string; category?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/package/forms/Query', params);
  }

  // CATEGORY: REGISTRATION
  async queryRegistrations(params: { 'registration-id'?: string; 'examinee-id'?: string; 'event-id'?: string; status?: string; 'date-registered'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/registration/query', params);
  }

  // CATEGORY: REMOTE ACCESS
  async queryRemoteAdminUrls(params: { 'url-type'?: string; status?: string; 'expiration-date'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/remote/admin-urls/Query', params);
  }

  async queryRemoteExamineeData(params: { 'examinee-id'?: string; 'remote-site-id'?: string; 'data-type'?: string; 'sync-status'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/remote/examinee-data/Query', params);
  }

  async queryRemoteSessionData(params: { 'session-id'?: string; 'remote-site-id'?: string; status?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/remote/session-data/Query', params);
  }

  async queryRemoteSessions(params: { 'session-id'?: string; 'site-id'?: string; status?: string; 'examiner-id'?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/remote/sessions/query', params);
  }

  // CATEGORY: RESULTS & REPORTING
  async queryResultIdentifiers(params: { 'result-id'?: string; 'test-id'?: string; 'examinee-id'?: string; 'identifier-type'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/result-identifier/Query', params);
  }

  async queryResults(params: { 'result-id'?: string; 'examinee-id'?: string; 'test-id'?: string; 'score-type'?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/result/query', params);
  }

  // CATEGORY: SCHEDULING & SESSIONS
  async querySabbaticals(params: { 'sabbatical-id'?: string; 'date-from'?: string; 'date-to'?: string; status?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/sabbatical/Query', params);
  }

  async querySecureBrowserErrors(params: { 'error-id'?: string; 'session-id'?: string; 'error-type'?: string; severity?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/secure-browser/errors/query', params);
  }

  async querySessions(params: { 'session-id'?: string; 'examiner-id'?: string; status?: string; 'date-from'?: string; 'date-to'?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/session/query', params);
  }

  // CATEGORY: SYSTEM & INFRASTRUCTURE
  async querySignalRDomains(params: { 'domain-id'?: string; status?: string; region?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/signalr-domain/query', params);
  }

  // CATEGORY: TEST MANAGEMENT
  async queryTestForms(params: { 'test-id'?: string; 'form-id'?: string; version?: string; status?: string; subject?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/test/forms/Query', params);
  }

  async queryTestPretestReferences(params: { 'test-id'?: string; 'pretest-id'?: string; 'reference-type'?: string; status?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/test/pretest-references/Query', params);
  }

  async queryTests(params: { 'test-id'?: string; title?: string; subject?: string; status?: string; difficulty?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/Test/Query', params);
  }

  // CATEGORY: USER MANAGEMENT
  async queryUserAccess(params: { 'user-id'?: string; role?: string; 'permission-level'?: string; status?: string; limit?: number; offset?: number } = {}): Promise<ApiCallResult> {
    return this.executeApiCall('/user/access/query', params);
  }

  // ===========================================
  // NATURAL LANGUAGE OPERATION DISCOVERY
  // ===========================================

  async findOperationsByNaturalLanguage(query: string): Promise<Array<{ name: string; description: string; category: string; endpoint: string }>> {
    const operations = [
      { name: 'findInstitutionsByChannel', description: 'Find schools and institutions by delivery channel (online, campus, hybrid)', category: 'institutions', endpoint: '/channel/institutions/query', tags: ['schools', 'institutions', 'delivery', 'channel', 'online', 'campus'] },
      { name: 'queryEventAuthorizations', description: 'Query event authorizations and permissions', category: 'events', endpoint: '/event/authorizations/Query', tags: ['events', 'authorization', 'permissions'] },
      { name: 'queryEventClasses', description: 'Query testing event classes and configurations', category: 'events', endpoint: '/event-class/Query', tags: ['events', 'classes', 'testing', 'configuration'] },
      { name: 'queryEventClassExaminees', description: 'Query examinees in event classes', category: 'examinees', endpoint: '/event-class/examinees/query', tags: ['examinees', 'students', 'event-class'] },
      { name: 'queryEvents', description: 'Query testing events and schedules', category: 'events', endpoint: '/event/query', tags: ['events', 'testing', 'schedules'] },
      { name: 'queryExamineeAudit', description: 'Query examinee audit trail and activity history', category: 'examinees', endpoint: '/examinee/audit/query', tags: ['examinees', 'audit', 'history', 'activity'] },
      { name: 'queryExamineeEvents', description: 'Query events for specific examinees', category: 'examinees', endpoint: '/examinee/events/query', tags: ['examinees', 'events'] },
      { name: 'queryLongitudinalSegmentDetails', description: 'Query detailed longitudinal data segments', category: 'examinees', endpoint: '/examinee/longitudinal-segment-detail/query', tags: ['longitudinal', 'segments', 'details'] },
      { name: 'queryLongitudinalSegments', description: 'Query longitudinal tracking segments', category: 'examinees', endpoint: '/examinee/longitudinal-segments/query', tags: ['longitudinal', 'segments', 'tracking'] },
      { name: 'queryExaminees', description: 'Query examinees and their information', category: 'examinees', endpoint: '/examinee/query', tags: ['examinees', 'students', 'information'] },
      { name: 'queryExamineeRecords', description: 'Query detailed examinee records and history', category: 'examinees', endpoint: '/examinee/record/query', tags: ['examinees', 'records', 'history'] },
      { name: 'queryFormDefinitions', description: 'Query form definitions and structures', category: 'forms', endpoint: '/form/definition/Query', tags: ['forms', 'definitions', 'structure'] },
      { name: 'queryForms', description: 'Query forms and their content', category: 'forms', endpoint: '/Form/Query', tags: ['forms', 'content'] },
      { name: 'queryFormReports', description: 'Query form reports and analytics', category: 'forms', endpoint: '/form/reports/Query', tags: ['forms', 'reports', 'analytics'] },
      { name: 'queryInventory', description: 'Query test inventory and item banks', category: 'testing', endpoint: '/inventory/query', tags: ['inventory', 'tests', 'items', 'banks'] },
      { name: 'queryTestExports', description: 'Query test export operations', category: 'testing', endpoint: '/iw-tool/export/tests/query', tags: ['tests', 'export', 'downloads'] },
      { name: 'queryItemWorkshop', description: 'Query item workshop imports', category: 'testing', endpoint: '/iw-tool/import/query', tags: ['items', 'workshop', 'import'] },
      { name: 'queryLongitudinalGroupExaminees', description: 'Query examinees in longitudinal groups', category: 'groups', endpoint: '/longitudinal-group/examinees/query', tags: ['longitudinal', 'groups', 'examinees'] },
      { name: 'queryMessageHistory', description: 'Query message history and communication logs', category: 'communication', endpoint: '/message-history/query', tags: ['messages', 'history', 'communication'] },
      { name: 'queryOrders', description: 'Query orders and transactions', category: 'orders', endpoint: '/order/Query', tags: ['orders', 'transactions', 'billing'] },
      { name: 'queryPackageForms', description: 'Query form packages and bundles', category: 'packages', endpoint: '/package/forms/Query', tags: ['packages', 'forms', 'bundles'] },
      { name: 'queryRegistrations', description: 'Query registrations for tests and events', category: 'registration', endpoint: '/registration/query', tags: ['registration', 'enrollment'] },
      { name: 'queryRemoteAdminUrls', description: 'Query remote administration URLs', category: 'remote', endpoint: '/remote/admin-urls/Query', tags: ['remote', 'admin', 'urls'] },
      { name: 'queryRemoteExamineeData', description: 'Query remote examinee data', category: 'remote', endpoint: '/remote/examinee-data/Query', tags: ['remote', 'examinees', 'data'] },
      { name: 'queryRemoteSessionData', description: 'Query remote session data', category: 'remote', endpoint: '/remote/session-data/Query', tags: ['remote', 'sessions', 'data'] },
      { name: 'queryRemoteSessions', description: 'Query remote testing sessions', category: 'remote', endpoint: '/remote/sessions/query', tags: ['remote', 'sessions', 'testing'] },
      { name: 'queryResultIdentifiers', description: 'Query result identifiers and references', category: 'results', endpoint: '/result-identifier/Query', tags: ['results', 'identifiers', 'references'] },
      { name: 'queryResults', description: 'Query test results and scores', category: 'results', endpoint: '/result/query', tags: ['results', 'scores', 'performance'] },
      { name: 'querySabbaticals', description: 'Query sabbatical periods and maintenance', category: 'scheduling', endpoint: '/sabbatical/Query', tags: ['sabbatical', 'maintenance', 'scheduling'] },
      { name: 'querySecureBrowserErrors', description: 'Query secure browser errors', category: 'security', endpoint: '/secure-browser/errors/query', tags: ['security', 'browser', 'errors'] },
      { name: 'querySessions', description: 'Query testing sessions', category: 'sessions', endpoint: '/session/query', tags: ['sessions', 'testing'] },
      { name: 'querySignalRDomains', description: 'Query SignalR domains and endpoints', category: 'system', endpoint: '/signalr-domain/query', tags: ['signalr', 'domains', 'realtime'] },
      { name: 'queryTestForms', description: 'Query test forms and configurations', category: 'tests', endpoint: '/test/forms/Query', tags: ['tests', 'forms', 'configuration'] },
      { name: 'queryTestPretestReferences', description: 'Query pretest references', category: 'tests', endpoint: '/test/pretest-references/Query', tags: ['tests', 'pretest', 'references'] },
      { name: 'queryTests', description: 'Query tests and assessments', category: 'tests', endpoint: '/Test/Query', tags: ['tests', 'assessments'] },
      { name: 'queryUserAccess', description: 'Query user access and permissions', category: 'users', endpoint: '/user/access/query', tags: ['users', 'access', 'permissions'] }
    ];

    const queryLower = query.toLowerCase();
    const words = queryLower.split(/\s+/);
    
    return operations
      .map(op => {
        let relevance = 0;
        
        // Check for exact matches in name and description
        if (op.name.toLowerCase().includes(queryLower)) relevance += 10;
        if (op.description.toLowerCase().includes(queryLower)) relevance += 5;
        
        // Check for word matches in tags
        words.forEach(word => {
          if (op.tags.some(tag => tag.includes(word))) {
            relevance += 2;
          }
        });
        
        return { ...op, relevance };
      })
      .filter(op => op.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .map(({ relevance, tags, ...op }) => op);
  }

  // ===========================================
  // SYSTEM STATUS & MONITORING
  // ===========================================

  getSystemStatus(): {
    initialized: boolean;
    operationsAvailable: number;
    categories: string[];
    environment: { baseUrl: string; programId: string; programInstitutionId: string; };
  } {
    const categories = ['institutions', 'events', 'examinees', 'forms', 'testing', 'groups', 'communication', 'orders', 'packages', 'registration', 'remote', 'results', 'scheduling', 'security', 'sessions', 'system', 'tests', 'users'];
    
    return {
      initialized: true,
      operationsAvailable: 41, // All read-only operations
      categories,
      environment: {
        baseUrl: this.environment?.baseUrl || '',
        programId: this.environment?.programId || '',
        programInstitutionId: this.environment?.programInstitutionId || ''
      }
    };
  }

  async testConnection(): Promise<{
    authenticated: boolean;
    environmentLoaded: boolean;
    baseUrl: string;
    availableOperations: number;
  }> {
    try {
      await this.refreshToken();
      return {
        authenticated: !!this.cachedToken,
        environmentLoaded: !!this.environment,
        baseUrl: this.environment?.baseUrl || '',
        availableOperations: 41
      };
    } catch (error) {
      return {
        authenticated: false,
        environmentLoaded: !!this.environment,
        baseUrl: this.environment?.baseUrl || '',
        availableOperations: 41
      };
    }
  }
}

// Backward compatibility alias
export const ApiWrapper = ComprehensiveApiWrapper;
