/**
 * Test-Informed Intelligence System
 * 
 * Bridges test results and AI behavior by learning from actual test outcomes
 * and providing intelligent guidance for API interactions.
 */

export interface TestResult {
  endpoint: string;
  params: Record<string, any>;
  result: {
    success: boolean;
    status: number;
    data?: any;
    error?: any;
  };
  timestamp: Date;
  userIntent: string;
}

export interface EndpointBehavior {
  endpoint: string;
  requiredParams: string[];
  optionalParams: string[];
  expectedFailures: ExpectedFailure[];
  successPatterns: SuccessPattern[];
  aiGuidance: AIGuidance;
  alternatives: string[];
  testCoverage: TestCoverage;
}

export interface ExpectedFailure {
  status: number;
  errorPattern: string;
  meaning: string;
  isBusinessLogic: boolean;
  suggestedAction: string;
  aiResponse: string;
}

export interface SuccessPattern {
  status: number;
  dataPattern: string;
  businessMeaning: string;
}

export interface AIGuidance {
  whenToUse: string;
  limitations: string[];
  businessContext: string;
  troubleshootingTips: string[];
  specificGuidance?: string;
  suggestedAction?: string;
}

export interface TestCoverage {
  totalTests: number;
  lastUpdated: Date;
  hasBasicSuccess: boolean;
  hasParameterValidation: boolean;
  hasErrorScenarios: boolean;
  confidenceLevel: 'low' | 'medium' | 'high';
}

export class TestInformedIntelligence {
  private static testResults: Map<string, TestResult[]> = new Map();
  private static endpointBehaviors: Map<string, EndpointBehavior> = new Map();
  private static initialized = false;

  /**
   * Initialize with existing test knowledge
   */
  static async initialize() {
    if (this.initialized) return;

    try {
      // Load existing test results if available
      const fs = await import('fs');
      if (fs.existsSync('./test-intelligence.json')) {
        const data = JSON.parse(fs.readFileSync('./test-intelligence.json', 'utf8'));
        this.loadFromData(data);
      }
    } catch (error) {
      console.log('📝 Starting fresh test intelligence system');
    }

    this.initialized = true;
    console.log('✅ Test-Informed Intelligence initialized');
  }

  /**
   * Update intelligence from a test run
   */
  static updateFromTestRun(testResult: TestResult) {
    const endpoint = testResult.endpoint;
    
    // Store test result
    const existing = this.testResults.get(endpoint) || [];
    existing.push(testResult);
    this.testResults.set(endpoint, existing);

    // Regenerate behavior intelligence
    this.generateEndpointBehavior(endpoint);
    
    // Save to disk
    this.saveToFile();

    console.log(`📚 Updated intelligence for ${endpoint} (${existing.length} test cases)`);
  }

  /**
   * Get AI guidance for an endpoint based on test intelligence
   */
  static getAIGuidance(endpoint: string, errorResponse?: any): AIGuidance | null {
    const behavior = this.endpointBehaviors.get(endpoint);
    if (!behavior) return null;

    // If there's an error, provide specific guidance
    if (errorResponse) {
      const expectedFailure = behavior.expectedFailures.find(ef => 
        ef.status === errorResponse.status || 
        (errorResponse.message && errorResponse.message.includes(ef.errorPattern))
      );

      if (expectedFailure) {
        return {
          ...behavior.aiGuidance,
          specificGuidance: expectedFailure.aiResponse,
          suggestedAction: expectedFailure.suggestedAction
        };
      }
    }

    return behavior.aiGuidance;
  }

  /**
   * Get endpoint behavior based on test results
   */
  static getEndpointBehavior(endpoint: string): EndpointBehavior | null {
    return this.endpointBehaviors.get(endpoint) || null;
  }

  /**
   * Get suggestions for fixing failed calls
   */
  static getFixSuggestions(endpoint: string, errorResponse: any): Array<{params: Record<string, any>, reason: string}> {
    const behavior = this.endpointBehaviors.get(endpoint);
    if (!behavior) return [];

    const suggestions = [];

    // Check for missing required parameters
    if (errorResponse.status === 422) {
      for (const param of behavior.requiredParams) {
        if (!errorResponse.providedParams || !errorResponse.providedParams[param]) {
          const envValue = this.getEnvironmentValue(param);
          if (envValue) {
            suggestions.push({
              params: { [param]: envValue },
              reason: `Add required parameter ${param} from environment`
            });
          }
        }
      }
    }

    return suggestions;
  }

  /**
   * Generate endpoint behavior from test results
   */
  private static generateEndpointBehavior(endpoint: string) {
    const tests = this.testResults.get(endpoint) || [];
    if (tests.length === 0) return;

    const behavior: EndpointBehavior = {
      endpoint,
      requiredParams: this.extractRequiredParams(tests),
      optionalParams: this.extractOptionalParams(tests),
      expectedFailures: this.extractExpectedFailures(tests),
      successPatterns: this.extractSuccessPatterns(tests),
      aiGuidance: this.generateAIGuidance(tests),
      alternatives: this.findAlternativeEndpoints(tests),
      testCoverage: this.calculateTestCoverage(tests)
    };

    this.endpointBehaviors.set(endpoint, behavior);
  }

  private static extractRequiredParams(tests: TestResult[]): string[] {
    const required = new Set<string>();
    
    // Look for 422 errors that mention specific parameters
    tests.forEach(test => {
      if (test.result.status === 422 && test.result.error) {
        const errorMsg = JSON.stringify(test.result.error).toLowerCase();
        
        // Common patterns for required parameters
        if (errorMsg.includes('vendor-id') || errorMsg.includes('vendorid')) {
          required.add('vendor-id');
        }
        if (errorMsg.includes('sponsor-id') || errorMsg.includes('sponsorid')) {
          required.add('sponsor-id');
        }
        if (errorMsg.includes('event-id')) {
          required.add('event-id');
        }
        if (errorMsg.includes('examinee-id')) {
          required.add('examinee-id');
        }
      }
    });

    return Array.from(required);
  }

  private static extractOptionalParams(tests: TestResult[]): string[] {
    // Parameters that appear in successful calls but aren't always required
    const optional = new Set<string>();
    
    tests.forEach(test => {
      if (test.result.success && test.params) {
        Object.keys(test.params).forEach(param => {
          if (!['program-id', 'program-institution-id'].includes(param)) {
            optional.add(param);
          }
        });
      }
    });

    return Array.from(optional);
  }

  private static extractExpectedFailures(tests: TestResult[]): ExpectedFailure[] {
    const failures: ExpectedFailure[] = [];
    
    // Group failures by status code and error pattern
    const failureGroups = new Map<string, TestResult[]>();
    
    tests.forEach(test => {
      if (!test.result.success) {
        const key = `${test.result.status}-${this.getErrorPattern(test.result.error)}`;
        const group = failureGroups.get(key) || [];
        group.push(test);
        failureGroups.set(key, group);
      }
    });

    // Convert groups to expected failures
    failureGroups.forEach((group, key) => {
      const [status, errorPattern] = key.split('-', 2);
      const firstError = group[0].result.error;
      
      failures.push({
        status: parseInt(status),
        errorPattern,
        meaning: this.interpretError(parseInt(status), firstError),
        isBusinessLogic: this.isBusinessLogicError(parseInt(status), firstError),
        suggestedAction: this.getSuggestedAction(parseInt(status), firstError),
        aiResponse: this.generateAIResponse(parseInt(status), firstError)
      });
    });

    return failures;
  }

  private static extractSuccessPatterns(tests: TestResult[]): SuccessPattern[] {
    const patterns: SuccessPattern[] = [];
    
    tests.forEach(test => {
      if (test.result.success) {
        patterns.push({
          status: test.result.status,
          dataPattern: this.analyzeDataPattern(test.result.data),
          businessMeaning: this.interpretSuccess(test.userIntent, test.result.data)
        });
      }
    });

    return patterns;
  }

  private static generateAIGuidance(tests: TestResult[]): AIGuidance {
    const successfulTests = tests.filter(t => t.result.success);
    const failedTests = tests.filter(t => !t.result.success);
    
    return {
      whenToUse: this.deriveUsageContext(successfulTests),
      limitations: this.deriveLimitations(failedTests),
      businessContext: this.deriveBusinessContext(tests),
      troubleshootingTips: this.deriveTroubleshootingTips(failedTests)
    };
  }

  private static findAlternativeEndpoints(tests: TestResult[]): string[] {
    // This could be enhanced to suggest related endpoints
    // For now, return empty array
    return [];
  }

  private static calculateTestCoverage(tests: TestResult[]): TestCoverage {
    return {
      totalTests: tests.length,
      lastUpdated: new Date(),
      hasBasicSuccess: tests.some(t => t.result.success),
      hasParameterValidation: tests.some(t => t.result.status === 422),
      hasErrorScenarios: tests.some(t => !t.result.success),
      confidenceLevel: tests.length >= 5 ? 'high' : tests.length >= 3 ? 'medium' : 'low'
    };
  }

  // Helper methods
  private static getErrorPattern(error: any): string {
    if (!error) return 'unknown';
    const errorStr = JSON.stringify(error);
    
    if (errorStr.includes('vendorid') || errorStr.includes('vendor-id')) return 'vendor-required';
    if (errorStr.includes('sponsorid') || errorStr.includes('sponsor-id')) return 'sponsor-required';
    if (errorStr.includes('event-id')) return 'event-required';
    if (errorStr.includes('access denied') || errorStr.includes('forbidden')) return 'access-denied';
    
    return 'generic-error';
  }

  private static interpretError(status: number, error: any): string {
    switch (status) {
      case 422: return 'Missing or invalid parameters';
      case 403: return 'Access denied - may be expected behavior';
      case 404: return 'Endpoint or resource not found';
      case 500: return 'Server error';
      default: return `HTTP ${status} error`;
    }
  }

  private static isBusinessLogicError(status: number, error: any): boolean {
    return status === 403 || status === 422;
  }

  private static getSuggestedAction(status: number, error: any): string {
    switch (status) {
      case 422: return 'Add required parameters from environment';
      case 403: return 'Check if this is expected behavior for your access level';
      default: return 'Check API documentation';
    }
  }

  private static generateAIResponse(status: number, error: any): string {
    switch (status) {
      case 422: return 'This endpoint requires additional parameters. I can help identify what\'s needed.';
      case 403: return 'This endpoint returned access denied, which may be expected given our test context.';
      default: return `This endpoint returned HTTP ${status}. Let me help troubleshoot this.`;
    }
  }

  private static analyzeDataPattern(data: any): string {
    if (!data) return 'empty';
    if (Array.isArray(data)) return `array-${data.length}-items`;
    if (typeof data === 'object') return `object-${Object.keys(data).length}-fields`;
    return typeof data;
  }

  private static interpretSuccess(userIntent: string, data: any): string {
    return `Successfully retrieved data for: ${userIntent}`;
  }

  private static deriveUsageContext(successfulTests: TestResult[]): string {
    const intents = successfulTests.map(t => t.userIntent);
    return intents.length > 0 ? `Use for: ${intents.join(', ')}` : 'Usage context not yet determined';
  }

  private static deriveLimitations(failedTests: TestResult[]): string[] {
    const limitations = [];
    
    if (failedTests.some(t => t.result.status === 422)) {
      limitations.push('Requires specific parameters');
    }
    if (failedTests.some(t => t.result.status === 403)) {
      limitations.push('May require specific access permissions');
    }
    
    return limitations;
  }

  private static deriveBusinessContext(tests: TestResult[]): string {
    // Extract business context from user intents
    const intents = tests.map(t => t.userIntent).filter(Boolean);
    return intents.length > 0 ? `Business context: ${intents.join(', ')}` : 'Business context not yet determined';
  }

  private static deriveTroubleshootingTips(failedTests: TestResult[]): string[] {
    const tips = [];
    
    if (failedTests.some(t => t.result.status === 422)) {
      tips.push('Check parameter requirements in error response');
      tips.push('Verify environment variables have correct values');
    }
    if (failedTests.some(t => t.result.status === 403)) {
      tips.push('Verify access permissions for this endpoint');
      tips.push('Check if endpoint requires vendor/sponsor context');
    }
    
    return tips;
  }

  private static getEnvironmentValue(paramName: string): string | null {
    const envMap: Record<string, string> = {
      'vendor-id': process.env.VENDOR_ID || '14',
      'sponsor-id': process.env.SPONSOR_ID || '12',
      'event-id': '1',
      'examinee-id': '1',
      'session-id': '1'
    };
    
    return envMap[paramName] || null;
  }

  private static loadFromData(data: any) {
    // Load saved intelligence
    if (data.testResults) {
      this.testResults = new Map(Object.entries(data.testResults));
    }
    if (data.endpointBehaviors) {
      this.endpointBehaviors = new Map(Object.entries(data.endpointBehaviors));
    }
  }

  private static saveToFile() {
    try {
      const fs = require('fs');
      const data = {
        testResults: Object.fromEntries(this.testResults),
        endpointBehaviors: Object.fromEntries(this.endpointBehaviors),
        lastUpdated: new Date().toISOString()
      };
      
      fs.writeFileSync('./test-intelligence.json', JSON.stringify(data, null, 2));
    } catch (error) {
      console.warn('⚠️ Could not save test intelligence:', (error as Error).message);
    }
  }
}
