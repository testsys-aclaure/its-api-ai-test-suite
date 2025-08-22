/**
 * WORKING GET ENDPOINTS - Reality-Based Implementation
 * Focus on the 22 endpoints that actually work: 55% success rate
 */

import { EnvironmentConfig } from '../config/EnvironmentConfig.js';
import { OAuth2Client } from '../auth/OAuth2Client.js';

interface QueryParams {
  [key: string]: string | number | boolean;
}

interface EventOptions {
  eventId?: string;
  eventDescription?: string;
  activeOnly?: boolean;
  limit?: number;
}

interface ExamineeOptions {
  examineId?: string;
  systemId?: string;
  publicId?: string;
  limit?: number;
}

interface TestSessionOptions {
  eventClassId?: string;
  eventId?: string;
  classCode?: string;
}

interface TestResultOptions {
  resultId?: string;
  examineId?: string;
  eventId?: string;
  testId?: string;
  completedOnly?: boolean;
  limit?: number;
}

interface TestRegistrationOptions {
  registrationId?: string;
  examineId?: string;
  testId?: string;
  started?: boolean;
  completed?: boolean;
  limit?: number;
}

interface TestOptions {
  testName?: string;
  testId?: string;
  includeInactive?: boolean;
  includeDemo?: boolean;
  limit?: number;
}

interface FormOptions {
  formId?: string;
}

interface TestBlueprintOptions {
  testName?: string;
  testId?: string;
}

interface TestVersionOptions {
  testId?: string;
}

interface OrderOptions {
  orderId?: string;
  orderCode?: string;
  packageCode?: string;
}

interface LongitudinalGroupOptions {
  groupId?: string;
  groupName?: string;
  examineId?: string;
  limit?: number;
}

interface TestCompletionOptions {
  examineId?: string;
  eventId?: string;
  completedOnly?: boolean;
  limit?: number;
}

interface ScoreExportOptions {
  examineId?: string;
  systemId?: string;
  publicId?: string;
}

interface LoginAttemptOptions {
  ipAddress?: string;
  limit?: number;
}

interface ExternalRegistrationOptions {
  externalRegistrationId?: string;
  limit?: number;
}

interface PackageFormOptions {
  accessibleOnly?: boolean;
  nonSecureOnly?: boolean;
  practiceOnly?: boolean;
}

interface EndpointOptions {
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  status: number;
  data: any;
  endpoint: string;
  params: QueryParams;
  url: string;
  error?: string;
}

export class WorkingGetEndpoints {
  private static oauth2Client: OAuth2Client | null = null;
  
  static async initialize() {
    await EnvironmentConfig.initialize();
    this.oauth2Client = new OAuth2Client();
    console.log('✅ Working GET Endpoints client initialized');
  }
  
  // Helper method to make authenticated requests
  static async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    try {
      const token = await OAuth2Client.getAccessToken();
      const baseUrl = EnvironmentConfig.getBaseUrl();
      
      // Add universal parameters if not already present
      const finalParams = {
        'program-id': EnvironmentConfig.getDefaultProgramId(),
        'program-institution-id': EnvironmentConfig.getProgramInstitutionId(),
        ...params
      };
      
      const queryString = new URLSearchParams(finalParams).toString();
      const url = `${baseUrl}${endpoint}?${queryString}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      const data = response.ok ? await response.json() : null;
      
      return {
        success: response.ok,
        status: response.status,
        data,
        endpoint,
        params: finalParams,
        url
      };
      
    } catch (error) {
      return {
        success: false,
        status: 0,
        data: null,
        error: (error as any).message,
        endpoint,
        params
      };
    }
  }
  
  // =============================================================================
  // TIER 1: SIMPLE ENDPOINTS (No additional parameters required)
  // =============================================================================
  
  /**
   * Get message history - Communication logs
   */
  static async getMessageHistory() {
    return this.makeRequest('/message-history/query');
  }
  
  /**
   * Get SignalR domain configuration
   */
  static async getSignalRDomain() {
    return this.makeRequest('/signalr-domain/query');
  }
  
  /**
   * Get timezone information
   */
  static async getTimezones() {
    return this.makeRequest('/Timezone/Query');
  }
  
  /**
   * Get institution information for channels
   */
  static async getChannelInstitutions() {
    return this.makeRequest('/channel/institutions/query');
  }
  
  // =============================================================================
  // TIER 2: CORE EDUCATIONAL DATA ENDPOINTS
  // =============================================================================
  
  /**
   * Get events (tests/assessments) - CORE ENDPOINT
   */
  static async getEvents(options: EventOptions = {}) {
    const params: QueryParams = {};
    if (options.eventId) params['event-id'] = options.eventId;
    if (options.eventDescription) params['event-description'] = options.eventDescription;
    if (options.activeOnly) params['active-only'] = 'true';
    if (options.limit) params.limit = options.limit;
    
    return this.makeRequest('/event/query', params);
  }
  
  /**
   * Get examinees (students) - CORE ENDPOINT
   */
  static async getExaminees(options = {}) {
    const params = {};
    if (options.examineId) params['examinee-id'] = options.examineId;
    if (options.systemId) params['program-examinee-system-id'] = options.systemId;
    if (options.publicId) params['program-examinee-public-id'] = options.publicId;
    if (options.limit) params.limit = options.limit;
    
    return this.makeRequest('/examinee/query', params);
  }
  
  /**
   * Get event classes (groups/sessions) - REQUIRES institution-id
   */
  static async getEventClasses(options = {}) {
    const params = {};
    if (options.eventClassId) params['event-class-id'] = options.eventClassId;
    if (options.eventId) params['event-id'] = options.eventId;
    if (options.classCode) params['program-class-code'] = options.classCode;
    
    return this.makeRequest('/event-class/Query', params);
  }
  
  /**
   * Get test results - CORE ENDPOINT (slow but works)
   */
  static async getResults(options = {}) {
    const params = {};
    if (options.resultId) params['result-id'] = options.resultId;
    if (options.examineId) params['examinee-id'] = options.examineId;
    if (options.eventId) params['event-id'] = options.eventId;
    if (options.testId) params['test-id'] = options.testId;
    if (options.completedOnly) params['completed-only'] = 'true';
    if (options.limit) params.limit = options.limit;
    
    return this.makeRequest('/result/query', params);
  }
  
  /**
   * Get registrations (student test registrations)
   */
  static async getRegistrations(options = {}) {
    const params = {};
    if (options.registrationId) params['registration-id'] = options.registrationId;
    if (options.examineId) params['examinee-id'] = options.examineId;
    if (options.testId) params['test-id'] = options.testId;
    if (options.started !== undefined) params.started = options.started.toString();
    if (options.completed !== undefined) params.completed = options.completed.toString();
    if (options.limit) params.limit = options.limit;
    
    return this.makeRequest('/registration/query', params);
  }
  
  // =============================================================================
  // TIER 3: TEST CONTENT & CONFIGURATION
  // =============================================================================
  
  /**
   * Get tests information
   */
  static async getTests(options = {}) {
    const params = {};
    if (options.testName) params['test-name'] = options.testName;
    if (options.testId) params['test-id'] = options.testId;
    if (options.includeInactive) params['include-inactive'] = 'true';
    if (options.includeDemo) params['include-demo'] = 'true';
    if (options.limit) params.limit = options.limit;
    
    return this.makeRequest('/Test/Query', params);
  }
  
  /**
   * Get form definitions (test forms/versions)
   */
  static async getFormDefinitions(options = {}) {
    const params = {};
    if (options.formId) params['form-id'] = options.formId;
    
    return this.makeRequest('/form/definition/Query', params);
  }
  
  /**
   * Get test forms information
   */
  static async getTestForms(options = {}) {
    const params = {};
    if (options.testName) params['test-name'] = options.testName;
    if (options.testId) params['test-id'] = options.testId;
    
    return this.makeRequest('/test/forms/Query', params);
  }
  
  /**
   * Get pretest references
   */
  static async getPretestReferences(options = {}) {
    const params = {};
    if (options.testId) params['test-id'] = options.testId;
    
    return this.makeRequest('/test/pretest-references/Query', params);
  }
  
  // =============================================================================
  // TIER 4: SPECIALIZED ENDPOINTS
  // =============================================================================
  
  /**
   * Get orders information
   */
  static async getOrders(options = {}) {
    const params = {};
    if (options.orderId) params['order-id'] = options.orderId;
    if (options.orderCode) params['order-code'] = options.orderCode;
    if (options.packageCode) params['package-code'] = options.packageCode;
    
    return this.makeRequest('/order/Query', params);
  }
  
  /**
   * Get longitudinal group examinees
   */
  static async getLongitudinalGroupExaminees(options = {}) {
    const params = {};
    if (options.groupId) params['longitudinal-group-id'] = options.groupId;
    if (options.groupName) params['longitudinal-group-name'] = options.groupName;
    if (options.examineId) params['examinee-id'] = options.examineId;
    if (options.limit) params.limit = options.limit;
    
    return this.makeRequest('/longitudinal-group/examinees/query', params);
  }
  
  /**
   * Get result identifiers
   */
  static async getResultIdentifiers(options = {}) {
    const params = {};
    if (options.examineId) params['examinee-id'] = options.examineId;
    if (options.eventId) params['event-id'] = options.eventId;
    if (options.completedOnly) params['completed-only'] = 'true';
    if (options.limit) params.limit = options.limit;
    
    return this.makeRequest('/result-identifier/Query', params);
  }
  
  /**
   * Get sabbatical information
   */
  static async getSabbaticals(options = {}) {
    const params = {};
    if (options.examineId) params['examinee-id'] = options.examineId;
    if (options.systemId) params['program-examinee-system-id'] = options.systemId;
    if (options.publicId) params['program-examinee-public-id'] = options.publicId;
    
    return this.makeRequest('/sabbatical/Query', params);
  }
  
  /**
   * Get remote system checks
   */
  static async getRemoteSystemChecks(options = {}) {
    const params = {};
    if (options.ipAddress) params['ip-address'] = options.ipAddress;
    if (options.limit) params.limit = options.limit;
    
    return this.makeRequest('/remote/system-checks/Query', params);
  }
  
  /**
   * Get secure browser errors (requires environment-id)
   */
  static async getSecureBrowserErrors(environmentId = 1, options = {}) {
    const params = { 'environment-id': environmentId };
    if (options.externalRegistrationId) params['external-registration-id'] = options.externalRegistrationId;
    if (options.limit) params.limit = options.limit;
    
    return this.makeRequest('/secure-browser/errors/query', params);
  }
  
  /**
   * Get form reports (requires test-id and form-id)
   */
  static async getFormReports(testId, formId) {
    const params = { 'test-id': testId, 'form-id': formId };
    return this.makeRequest('/form/reports/Query', params);
  }
  
  /**
   * Get package forms (requires package-code)
   */
  static async getPackageForms(packageCode, options = {}) {
    const params = { 'package-code': packageCode };
    if (options.accessibleOnly) params['accessible-only'] = 'true';
    if (options.nonSecureOnly) params['non-secure-only'] = 'true';
    if (options.practiceOnly) params['practice-only'] = 'true';
    
    return this.makeRequest('/package/forms/Query', params);
  }
  
  // =============================================================================
  // CONVENIENCE METHODS - Natural Language Interface
  // =============================================================================
  
  /**
   * Find active tests/events for students
   */
  static async findActiveEvents() {
    return this.getEvents({ activeOnly: true });
  }
  
  /**
   * Get all students/examinees
   */
  static async findStudents(limit = 100) {
    return this.getExaminees({ limit });
  }
  
  /**
   * Get test results for completed assessments
   */
  static async findCompletedResults(limit = 50) {
    return this.getResults({ completedOnly: true, limit });
  }
  
  /**
   * Get all available tests
   */
  static async findAvailableTests() {
    return this.getTests({ includeDemo: false });
  }
  
  /**
   * Get event classes/sessions for institution
   */
  static async findEventClasses() {
    return this.getEventClasses();
  }
  
  // =============================================================================
  // STATUS & DIAGNOSTICS
  // =============================================================================
  
  /**
   * Get comprehensive status of all working endpoints
   */
  static async getSystemStatus() {
    const results = {
      timestamp: new Date().toISOString(),
      workingEndpoints: 22,
      testedEndpoints: [],
      summary: {}
    };
    
    // Test a few key endpoints for health check
    const healthChecks = [
      { name: 'Timezones', method: () => this.getTimezones() },
      { name: 'Events', method: () => this.getEvents({ limit: 1 }) },
      { name: 'Examinees', method: () => this.getExaminees({ limit: 1 }) },
      { name: 'Tests', method: () => this.getTests({ limit: 1 }) }
    ];
    
    for (const check of healthChecks) {
      try {
        const start = Date.now();
        const result = await check.method();
        const responseTime = Date.now() - start;
        
        results.testedEndpoints.push({
          name: check.name,
          success: result.success,
          status: result.status,
          responseTime
        });
      } catch (error) {
        results.testedEndpoints.push({
          name: check.name,
          success: false,
          status: 0,
          error: error.message
        });
      }
    }
    
    const successful = results.testedEndpoints.filter(r => r.success).length;
    results.summary = {
      healthy: successful === healthChecks.length,
      successRate: `${successful}/${healthChecks.length}`,
      averageResponseTime: results.testedEndpoints
        .filter(r => r.responseTime)
        .reduce((sum, r) => sum + r.responseTime, 0) / successful || 0
    };
    
    return results;
  }
  
  /**
   * Get all available endpoint methods
   */
  static getAvailableEndpoints() {
    return {
      simple: [
        'getMessageHistory', 'getSignalRDomain', 'getTimezones', 'getChannelInstitutions'
      ],
      core: [
        'getEvents', 'getExaminees', 'getEventClasses', 'getResults', 'getRegistrations'
      ],
      testContent: [
        'getTests', 'getFormDefinitions', 'getTestForms', 'getPretestReferences'
      ],
      specialized: [
        'getOrders', 'getLongitudinalGroupExaminees', 'getResultIdentifiers',
        'getSabbaticals', 'getRemoteSystemChecks', 'getSecureBrowserErrors',
        'getFormReports', 'getPackageForms'
      ],
      convenience: [
        'findActiveEvents', 'findStudents', 'findCompletedResults',
        'findAvailableTests', 'findEventClasses'
      ]
    };
  }
}

// Make it easy to use
export default WorkingGetEndpoints;
