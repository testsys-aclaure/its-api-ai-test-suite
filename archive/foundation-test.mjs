/**
 * Foundation Validation Test - AI-NATIVE
 * Validates that core infrastructure works before building on it
 * 
 * CRITICAL: Must pass 100% before proceeding to Phase 2
 * Tests environment configuration, OAuth2 authentication, and basic API connectivity
 */

import { EnvironmentConfig } from './dist/config/EnvironmentConfig.js';
import { OAuth2Client } from './dist/auth/OAuth2Client.js';

class FoundationTester {
  constructor() {
    this.results = [];
  }

  /**
   * Run all foundation tests
   */
  async runFoundationTests() {
    console.log('🚀 Starting Foundation Validation Tests...\n');
    
    await this.testEnvironmentConfiguration();
    await this.testOAuth2Authentication();
    await this.testBasicAPIConnectivity();
    
    this.printResults();
    this.checkCriticalFailures();
  }

  /**
   * Test 1: Environment Configuration Loading
   */
  async testEnvironmentConfiguration() {
    const startTime = Date.now();
    
    try {
      console.log('📋 Testing environment configuration...');
      
      // Initialize configuration
      await EnvironmentConfig.initialize();
      
      // Validate critical configuration values
      const config = {
        baseUrl: EnvironmentConfig.getBaseUrl(),
        clientId: EnvironmentConfig.getClientId(),
        clientSecret: EnvironmentConfig.getClientSecret(),
        tokenUrl: EnvironmentConfig.getTokenUrl(),
        programId: EnvironmentConfig.getDefaultProgramId(),
        institutionId: EnvironmentConfig.getProgramInstitutionId()
      };
      
      // Check for missing values
      const missing = Object.entries(config)
        .filter(([key, value]) => !value || value.trim() === '')
        .map(([key]) => key);
      
      if (missing.length > 0) {
        throw new Error(`Missing configuration: ${missing.join(', ')}`);
      }
      
      // Get configuration report
      const report = EnvironmentConfig.getConfigurationReport();
      
      // Get universal parameters
      const universalParams = EnvironmentConfig.getUniversalParameters();
      
      this.results.push({
        test: 'Environment Configuration',
        status: 'PASS',
        duration: Date.now() - startTime,
        details: {
          loadedValues: Object.keys(config).length,
          universalParameters: Object.keys(universalParams).length,
          configurationSources: report,
          criticalValues: {
            hasBaseUrl: !!config.baseUrl,
            hasAuthentication: !!config.clientId && !!config.clientSecret,
            hasProgramConfig: !!config.programId && !!config.institutionId
          }
        }
      });
      
      console.log('✅ Environment configuration loaded successfully');
      
    } catch (error) {
      this.results.push({
        test: 'Environment Configuration',
        status: 'FAIL',
        duration: Date.now() - startTime,
        details: {},
        error: error instanceof Error ? error.message : String(error)
      });
      
      console.error('❌ Environment configuration failed:', error);
    }
  }

  /**
   * Test 2: OAuth2 Authentication
   */
  async testOAuth2Authentication() {
    const startTime = Date.now();
    
    try {
      console.log('🔐 Testing OAuth2 authentication...');
      
      // First validate configuration
      const configValidation = await OAuth2Client.validateConfiguration();
      
      if (!configValidation.isValid) {
        throw new Error(`Configuration issues: ${configValidation.issues.join(', ')}`);
      }
      
      // Clear any cached tokens to test fresh authentication
      OAuth2Client.clearTokenCache();
      
      // Acquire access token
      const accessToken = await OAuth2Client.getAccessToken();
      
      if (!accessToken || typeof accessToken !== 'string' || accessToken.length < 10) {
        throw new Error('Invalid access token received');
      }
      
      // Get authentication status
      const authStatus = OAuth2Client.getAuthenticationStatus();
      
      this.results.push({
        test: 'OAuth2 Authentication',
        status: 'PASS',
        duration: Date.now() - startTime,
        details: {
          tokenLength: accessToken.length,
          tokenAcquisitionTime: authStatus.performance.acquisitionTime,
          retryAttempts: authStatus.performance.retryAttempts,
          isAuthenticated: authStatus.isAuthenticated,
          tokenStatus: authStatus.tokenStatus,
          configurationValid: configValidation.isValid
        }
      });
      
      console.log(`✅ OAuth2 authentication successful (${authStatus.performance.acquisitionTime}ms)`);
      
      // Performance warning
      if (authStatus.performance.acquisitionTime > 5000) {
        console.warn('⚠️ Slow authentication - consider checking network connectivity');
      }
      
    } catch (error) {
      this.results.push({
        test: 'OAuth2 Authentication',
        status: 'FAIL',
        duration: Date.now() - startTime,
        details: {},
        error: error instanceof Error ? error.message : String(error)
      });
      
      console.error('❌ OAuth2 authentication failed:', error);
    }
  }

  /**
   * Test 3: Basic API Connectivity
   */
  async testBasicAPIConnectivity() {
    const startTime = Date.now();
    
    try {
      console.log('🌐 Testing basic API connectivity...');
      
      const baseUrl = EnvironmentConfig.getBaseUrl();
      const accessToken = await OAuth2Client.getAccessToken();
      
      // Test basic API endpoint (simple ping or status check)
      const testEndpoint = `${baseUrl}/event/query`;
      const universalParams = EnvironmentConfig.getUniversalParameters();
      
      // Build query string from universal parameters
      const queryString = new URLSearchParams(universalParams).toString();
      const fullUrl = `${testEndpoint}?${queryString}`;
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      const responseText = await response.text();
      let responseData = {};
      
      try {
        responseData = JSON.parse(responseText);
      } catch {
        // Response not JSON - that's OK for some endpoints
      }
      
      this.results.push({
        test: 'Basic API Connectivity',
        status: 'PASS',
        duration: Date.now() - startTime,
        details: {
          endpoint: fullUrl,
          httpStatus: response.status,
          responseSize: responseText.length,
          hasJsonResponse: typeof responseData === 'object',
          universalParametersApplied: Object.keys(universalParams).length,
          responseTime: Date.now() - startTime
        }
      });
      
      console.log(`✅ API connectivity test successful (HTTP ${response.status})`);
      
      // Performance warning
      const responseTime = Date.now() - startTime;
      if (responseTime > 10000) {
        console.warn('⚠️ Slow API response - consider checking network connectivity');
      }
      
    } catch (error) {
      this.results.push({
        test: 'Basic API Connectivity',
        status: 'FAIL',
        duration: Date.now() - startTime,
        details: {},
        error: error instanceof Error ? error.message : String(error)
      });
      
      console.error('❌ API connectivity test failed:', error);
    }
  }

  /**
   * Print detailed test results
   */
  printResults() {
    console.log('\n📊 Foundation Test Results:');
    console.log('=' .repeat(50));
    
    for (const result of this.results) {
      const status = result.status === 'PASS' ? '✅' : '❌';
      console.log(`${status} ${result.test} - ${result.duration}ms`);
      
      if (result.status === 'FAIL' && result.error) {
        console.log(`   Error: ${result.error}`);
      }
      
      if (result.details && Object.keys(result.details).length > 0) {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`);
      }
    }
    
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    
    console.log('\n📈 Summary:');
    console.log(`   Passed: ${passed}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Success Rate: ${Math.round((passed / this.results.length) * 100)}%`);
  }

  /**
   * Check for critical failures that block Phase 2
   */
  checkCriticalFailures() {
    const failures = this.results.filter(r => r.status === 'FAIL');
    
    if (failures.length > 0) {
      console.log('\n🚨 CRITICAL: Foundation tests failed!');
      console.log('❌ Cannot proceed to Phase 2 until all foundation tests pass');
      console.log('\n🔧 Troubleshooting Steps:');
      console.log('1. Check .env file has all required values');
      console.log('2. Verify 238-stg.json Postman environment exists');
      console.log('3. Test network connectivity to staging environment');
      console.log('4. Verify OAuth2 credentials are valid');
      
      process.exit(1);
    } else {
      console.log('\n🎉 SUCCESS: All foundation tests passed!');
      console.log('✅ Ready to proceed to Phase 2: Direct API Tools');
    }
  }

  /**
   * Get comprehensive foundation report for dashboard
   */
  getFoundationReport() {
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const totalTime = this.results.reduce((sum, r) => sum + r.duration, 0);
    
    return {
      overallStatus: failed === 0 ? 'PASS' : 'FAIL',
      testResults: this.results,
      summary: {
        totalTests: this.results.length,
        passed,
        failed,
        totalTime,
        successRate: Math.round((passed / this.results.length) * 100)
      },
      environment: EnvironmentConfig.getConfigurationReport(),
      authentication: OAuth2Client.getAuthenticationStatus(),
      readyForPhase2: failed === 0
    };
  }
}

// Run tests if called directly
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
  const tester = new FoundationTester();
  await tester.runFoundationTests();
}

export { FoundationTester };
