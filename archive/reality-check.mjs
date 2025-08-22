/**
 * Reality Check - How Many Endpoints Actually Work?
 * Let's test actual endpoint accessibility vs claims
 */

import { EnhancedDirectAPITools } from './dist/api/EnhancedDirectAPITools.js';
import { IntelligenceIntegrator } from './dist/intelligence/IntelligenceIntegrator.js';

async function realityCheck() {
  console.log('🔍 REALITY CHECK: How many endpoints actually work?\n');
  
  try {
    await EnhancedDirectAPITools.initialize();
    
    // Get all GET endpoints from intelligence
    const allEndpoints = IntelligenceIntegrator.getGetEndpoints();
    console.log(`📊 Intelligence Claims: ${allEndpoints.length} GET endpoints available\n`);
    
    // Test a sample of endpoints to see what actually works
    const testEndpoints = [
      '/event/query',
      '/event/authorizations/Query', 
      '/examinee/events/query',
      '/event-class/Query',
      '/event-class/examinees/query',
      '/student/query',
      '/result/query',
      '/institution/query',
      '/program/query'
    ];
    
    let successCount = 0;
    let totalTested = 0;
    const results = [];
    
    console.log('🧪 Testing Sample Endpoints:\n');
    
    for (const endpoint of testEndpoints) {
      totalTested++;
      console.log(`${totalTested}. Testing ${endpoint}...`);
      
      try {
        const response = await EnhancedDirectAPITools.makeRequest(endpoint, 'GET');
        
        const success = response.success;
        if (success) successCount++;
        
        results.push({
          endpoint,
          success,
          status: response.metadata.httpStatus,
          responseTime: response.metadata.responseTime,
          error: response.error
        });
        
        console.log(`   ${success ? '✅' : '❌'} HTTP ${response.metadata.httpStatus} (${response.metadata.responseTime}ms)`);
        if (!success && response.error) {
          console.log(`      Error: ${response.error}`);
        }
        
      } catch (error) {
        results.push({
          endpoint,
          success: false,
          status: 0,
          responseTime: 0,
          error: error.message
        });
        console.log(`   ❌ Exception: ${error.message}`);
      }
      
      console.log('');
    }
    
    // Summary
    console.log('📊 REALITY CHECK RESULTS:');
    console.log('=' .repeat(50));
    console.log(`Total Endpoints Tested: ${totalTested}`);
    console.log(`Successful Endpoints: ${successCount}`);
    console.log(`Success Rate: ${Math.round((successCount/totalTested) * 100)}%`);
    console.log(`Intelligence Claims vs Reality: ${allEndpoints.length} claimed, ${successCount} actually working`);
    
    console.log('\n📋 Detailed Results:');
    results.forEach((result, i) => {
      console.log(`${i+1}. ${result.endpoint}`);
      console.log(`   Status: ${result.success ? 'SUCCESS' : 'FAILED'} (HTTP ${result.status})`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });
    
    // Honest assessment
    console.log('\n🎯 HONEST ASSESSMENT:');
    if (successCount === 0) {
      console.log('❌ REALITY: No endpoints successfully tested');
      console.log('❌ The "complete success" claims were premature');
      console.log('❌ Need to focus on getting basic endpoints working first');
    } else if (successCount < totalTested / 2) {
      console.log('⚠️ REALITY: Limited endpoint success');
      console.log(`⚠️ Only ${successCount}/${totalTested} endpoints working`);
      console.log('⚠️ Need to investigate why others are failing');
    } else {
      console.log('✅ REALITY: Most endpoints working');
      console.log(`✅ ${successCount}/${totalTested} endpoints successful`);
      console.log('✅ Foundation appears solid');
    }
    
    return { successCount, totalTested, results };
    
  } catch (error) {
    console.error('❌ Reality check failed:', error);
    return { successCount: 0, totalTested: 0, results: [] };
  }
}

realityCheck().then(({ successCount, totalTested }) => {
  console.log(`\n🏁 Final Reality: ${successCount}/${totalTested} endpoints actually work`);
  process.exit(0);
});
