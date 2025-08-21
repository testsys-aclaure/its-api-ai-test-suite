import { test, expect } from '@playwright/test';
const { ApiClient } = require('./dist/ApiClient.js');

test.describe('Comprehensive GET Endpoint Analysis', () => {
  let api: any;

  const endpoints = [
    // Channel endpoints
    '/channel/institutions/query',
    '/channel/transactions/query',
    
    // Test endpoints
    '/test/forms/query',
    '/test/booklets/query', 
    '/test/sessions/query',
    
    // Event endpoints
    '/event/authorizations/query',
    '/event/tests/query',
    '/event/results/query',
    
    // Package endpoints
    '/package/forms/query',
    '/package/booklets/query',
    
    // Order endpoints
    '/order/test-materials/query',
    '/order/test-booklets/query',
    
    // Institution endpoints
    '/institution/examinees/query',
    '/institution/users/query',
    '/institution/test-sessions/query',
    
    // Message endpoints
    '/message/history/query',
    
    // Longitudinal endpoints
    '/longitudinal/segments/query',
    '/longitudinal/segment-detail/query',
    '/longitudinal/group-examinees/query',
    
    // IW Tools
    '/iw-tools/placement-exam-groups/query',
    '/iw-tools/placement-exam-group-examinees/query',
    
    // Reports
    '/reports/longitudinal-test-results/query',
    
    // Start Test
    '/start-test/examinees/query'
  ];

  test.beforeEach(async () => {
    api = new ApiClient('./environments/238-stg.json', true); // Enable debug
  });

  test('Systematically analyze all GET endpoints with enhanced parameter injection', async () => {
    console.log('🔍 COMPREHENSIVE API ANALYSIS WITH ENHANCED PARAMETER INJECTION');
    console.log('================================================================');
    console.log('Environment values available:');
    console.log(`  program-id: ${api.env['program-id']}`);
    console.log(`  program-institution-id: ${api.env['program-institution-id']} (SAFE TEST INSTITUTION)`);
    console.log(`  vendor-id: ${api.env['vendor-id']}`);
    console.log(`  sponsor-id: ${api.env['sponsor-id']}`);
    console.log('================================================================\n');
    
    const results: {
      success: Array<{endpoint: string, status: number, dataCount: number}>,
      clientErrors: Array<{endpoint: string, status: number, error: string}>,
      serverErrors: Array<{endpoint: string, status: number}>,
      otherErrors: Array<{endpoint: string, error: string}>
    } = {
      success: [],
      clientErrors: [], // 4xx - missing params, validation issues
      serverErrors: [], // 5xx - server issues
      otherErrors: []   // network, etc.
    };

    for (const endpoint of endpoints) {
      console.log(`🔍 Testing: ${endpoint}`);
      
      try {
        // The enhanced wrapper will now automatically inject:
        // - program-id, program-institution-id, vendor-id, sponsor-id
        const response = await api.raw(endpoint, { 
          method: 'GET',
          query: {} // Let auto-injection handle parameters
        });
        
        if (response.status >= 200 && response.status < 300) {
          console.log(`✅ ${endpoint} - SUCCESS (${response.status})`);
          const dataCount = Array.isArray(response.json) ? response.json.length : 
                           (response.json ? Object.keys(response.json).length : 0);
          console.log(`   📊 Data: ${dataCount} items`);
          results.success.push({
            endpoint,
            status: response.status,
            dataCount
          });
        } else if (response.status >= 400 && response.status < 500) {
          console.log(`❌ ${endpoint} - CLIENT ERROR (${response.status})`);
          
          // Surface the exact error message to help troubleshoot missing parameters
          let errorDetails = 'Unknown error';
          try {
            if (response.json && response.json.error) {
              errorDetails = response.json.error;
            } else if (response.json && response.json.message) {
              errorDetails = response.json.message;
            } else if (response.text) {
              errorDetails = response.text.substring(0, 200);
            }
          } catch (e) {
            errorDetails = 'Unable to parse error details';
          }
          
          console.log(`   💡 Error Details: ${errorDetails}`);
          results.clientErrors.push({
            endpoint,
            status: response.status,
            error: errorDetails
          });
        } else if (response.status >= 500) {
          console.log(`❌ ${endpoint} - SERVER ERROR (${response.status})`);
          results.serverErrors.push({
            endpoint,
            status: response.status
          });
        }
      } catch (error: any) {
        console.log(`❌ ${endpoint} - NETWORK/OTHER ERROR`);
        console.log(`   💡 Error: ${error.message}`);
        results.otherErrors.push({
          endpoint,
          error: error.message
        });
      }
      
      console.log(''); // spacing
    }

    // Summary Report
    console.log('\n🎯 FINAL RESULTS SUMMARY');
    console.log('========================');
    console.log(`✅ SUCCESS (200s): ${results.success.length}/${endpoints.length} (${((results.success.length/endpoints.length)*100).toFixed(1)}%)`);
    console.log(`❌ CLIENT ERRORS (4xx): ${results.clientErrors.length}`);
    console.log(`❌ SERVER ERRORS (5xx): ${results.serverErrors.length}`);
    console.log(`❌ OTHER ERRORS: ${results.otherErrors.length}`);

    if (results.success.length > 0) {
      console.log('\n✅ SUCCESSFUL ENDPOINTS:');
      results.success.forEach(r => {
        console.log(`   ${r.endpoint} (${r.status}) - ${r.dataCount} items`);
      });
    }

    if (results.clientErrors.length > 0) {
      console.log('\n❌ CLIENT ERRORS REQUIRING INVESTIGATION:');
      results.clientErrors.forEach(r => {
        console.log(`   ${r.endpoint} (${r.status})`);
        console.log(`      Error: ${r.error}`);
      });
      console.log('\n💡 These errors likely indicate missing required parameters.');
      console.log('   Please review the error details above to identify what parameters are needed.');
    }

    // We want at least some successful endpoints, but we expect some failures due to missing required params
    expect(results.success.length).toBeGreaterThan(0);
    console.log(`\n🎯 Goal: Working toward 100% success rate by identifying and providing missing required parameters.`);
  });
});
