/**
 * Comprehensive GET Endpoint Testing Suite
 * Tests all 41 GET endpoints systematically, starting with easiest
 */

import { EnhancedDirectAPITools } from './dist/api/EnhancedDirectAPITools.js';

async function testAllGetEndpoints() {
  console.log('🧪 COMPREHENSIVE GET ENDPOINT TESTING SUITE\n');
  
  try {
    await EnhancedDirectAPITools.initialize();
    
    const results = {
      total: 0,
      success: 0,
      failed: 0,
      details: []
    };
    
    // Test endpoints by complexity (easiest first)
    
    console.log('🔸 TESTING: 0 Required Parameters (5 endpoints)');
    console.log('='.repeat(50));
    
    const noRequiredParams = [
      '/message-history/query',
      '/signalr-domain/query', 
      '/Timezone/Query',
      '/user/access/query',
      '/User/query'
    ];
    
    for (const endpoint of noRequiredParams) {
      await testEndpoint(endpoint, {}, results);
    }
    
    console.log('\n🔸 TESTING: 1 Required Parameter - program-id only (25 endpoints)');
    console.log('='.repeat(50));
    
    const programIdOnly = [
      '/channel/institutions/query',
      '/event/authorizations/Query',
      '/event-class/examinees/query', 
      '/event/query',
      '/examinee/events/query',
      '/examinee/longitudinal-segment-detail/query',
      '/examinee/longitudinal-segments/query',
      '/examinee/query',
      '/form/definition/Query',
      '/Form/Query',
      '/longitudinal-group/examinees/query',
      '/order/Query',
      '/registration/query',
      '/remote/examinee-data/Query',
      '/remote/practice-checks/Query',
      '/remote/session-data/Query',
      '/remote/sessions/query',
      '/remote/system-checks/Query',
      '/result-identifier/Query',
      '/result/query',
      '/sabbatical/Query',
      '/session/query',
      '/test/forms/Query',
      '/test/pretest-references/Query',
      '/Test/Query'
    ];
    
    for (const endpoint of programIdOnly) {
      const params = { 'program-id': '238' };
      await testEndpoint(endpoint, params, results);
    }
    
    console.log('\n🔸 TESTING: 2 Required Parameters (6 endpoints)');
    console.log('='.repeat(50));
    
    const twoRequiredParams = [
      { 
        endpoint: '/event-class/Query', 
        params: { 'program-id': '238', 'program-institution-id': '1009048' }
      },
      { 
        endpoint: '/inventory/query', 
        params: { 'program-id': '238', 'program-institution-id': '1009048' }
      },
      { 
        endpoint: '/secure-browser/errors/query', 
        params: { 'program-id': '238', 'environment-id': '1' }
      },
      { 
        endpoint: '/form/res-files/Query', 
        params: { 'program-id': '238', 'form-id': '1' }
      },
      { 
        endpoint: '/iw-tool/export/tests/query', 
        params: { 'bank-id': '1', 'form-id': '1' }
      },
      { 
        endpoint: '/iw-tool/import/query', 
        params: { 'bank-id': '1', 'import-id': '1' }
      }
    ];
    
    for (const { endpoint, params } of twoRequiredParams) {
      await testEndpoint(endpoint, params, results);
    }
    
    console.log('\n🔸 TESTING: 3+ Required Parameters (4 endpoints)');
    console.log('='.repeat(50));
    
    const complexParams = [
      { 
        endpoint: '/examinee/record/query', 
        params: { 'program-id': '238', 'table-name': 'examinee', 'record-id': '1' }
      },
      { 
        endpoint: '/form/reports/Query', 
        params: { 'program-id': '238', 'test-id': '1', 'form-id': '1' }
      },
      { 
        endpoint: '/package/forms/Query', 
        params: { 'program-id': '238', 'program-institution-id': '1009048', 'package-code': 'test' }
      },
      { 
        endpoint: '/examinee/audit/query', 
        params: { 
          'program-id': '238', 
          'timezoneId': '1', 
          'useDaylightSavings': 'true',
          'includeBitFlag': '1'
        }
      }
    ];
    
    for (const { endpoint, params } of complexParams) {
      await testEndpoint(endpoint, params, results);
    }
    
    // Skip the 6-parameter admin endpoint for now
    console.log('\n⏸️ SKIPPING: /remote/admin-urls/Query (6 required params - complex)');
    
    // Final summary
    console.log('\n📊 COMPREHENSIVE TEST RESULTS:');
    console.log('='.repeat(60));
    console.log(`Total Endpoints Tested: ${results.total}`);
    console.log(`Successful Endpoints: ${results.success}`);
    console.log(`Failed Endpoints: ${results.failed}`);
    console.log(`Success Rate: ${Math.round((results.success/results.total) * 100)}%`);
    
    // Group results by status code
    const by200 = results.details.filter(r => r.status === 200);
    const by404 = results.details.filter(r => r.status === 404);
    const by422 = results.details.filter(r => r.status === 422);
    const by500 = results.details.filter(r => r.status >= 500);
    const byOther = results.details.filter(r => ![200, 404, 422].includes(r.status) && r.status < 500);
    
    console.log('\n📈 RESULTS BY STATUS CODE:');
    console.log(`✅ HTTP 200 (Success): ${by200.length} endpoints`);
    console.log(`❓ HTTP 404 (Not Found): ${by404.length} endpoints`);  
    console.log(`⚠️ HTTP 422 (Validation Error): ${by422.length} endpoints`);
    console.log(`❌ HTTP 5xx (Server Error): ${by500.length} endpoints`);
    console.log(`🔍 Other HTTP Status: ${byOther.length} endpoints`);
    
    if (by200.length > 0) {
      console.log('\n✅ SUCCESSFULLY WORKING ENDPOINTS:');
      by200.forEach((r, i) => {
        console.log(`${i+1}. ${r.endpoint} (${r.responseTime}ms)`);
      });
    }
    
    if (by422.length > 0) {
      console.log('\n⚠️ ENDPOINTS WITH VALIDATION ERRORS (might need additional params):');
      by422.forEach((r, i) => {
        console.log(`${i+1}. ${r.endpoint} - ${r.error}`);
      });
    }
    
    if (by404.length > 0) {
      console.log('\n❓ ENDPOINTS RETURNING 404 (might not exist or wrong path):');
      by404.forEach((r, i) => {
        console.log(`${i+1}. ${r.endpoint}`);
      });
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    return { total: 0, success: 0, failed: 0, details: [] };
  }
}

async function testEndpoint(endpoint, params, results) {
  results.total++;
  console.log(`${results.total}. Testing ${endpoint}...`);
  
  try {
    const response = await EnhancedDirectAPITools.makeRequest(endpoint, 'GET', params);
    
    const success = response.success;
    if (success) results.success++;
    else results.failed++;
    
    const detail = {
      endpoint,
      success,
      status: response.metadata.httpStatus,
      responseTime: response.metadata.responseTime,
      error: response.error,
      params: Object.keys(params).length > 0 ? params : null
    };
    
    results.details.push(detail);
    
    console.log(`   ${success ? '✅' : '❌'} HTTP ${response.metadata.httpStatus} (${response.metadata.responseTime}ms)`);
    if (!success && response.error) {
      console.log(`      Error: ${response.error}`);
    }
    
  } catch (error) {
    results.failed++;
    
    const detail = {
      endpoint,
      success: false,
      status: 0,
      responseTime: 0,
      error: error.message,
      params: Object.keys(params).length > 0 ? params : null
    };
    
    results.details.push(detail);
    console.log(`   ❌ Exception: ${error.message}`);
  }
  
  console.log('');
}

testAllGetEndpoints().then((results) => {
  console.log(`\n🏁 Test Suite Complete: ${results.success}/${results.total} endpoints working`);
  process.exit(0);
});
