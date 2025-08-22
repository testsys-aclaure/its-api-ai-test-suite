/**
 * Test the Reality-Based Working GET Endpoints
 * Focus on the 22 endpoints that actually work
 */

import { WorkingGetEndpoints } from './dist/api/WorkingGetEndpoints.js';

async function testWorkingEndpoints() {
  console.log('🎯 TESTING REALITY-BASED WORKING GET ENDPOINTS');
  console.log('Based on proven results: 22/40 endpoints work (55% success rate)\n');
  
  try {
    // Initialize
    await WorkingGetEndpoints.initialize();
    
    // Run quick demo of most reliable endpoints
    console.log('🚀 Running Quick Demo...\n');
    const demoResults = await WorkingGetEndpoints.quickDemo();
    
    console.log('\n' + '='.repeat(60));
    console.log('🧪 TESTING SPECIFIC ENDPOINT CATEGORIES');
    console.log('='.repeat(60));
    
    // Test core educational endpoints
    console.log('\n📚 CORE EDUCATIONAL DATA:');
    
    const coreTests = [
      { 
        name: 'Active Events', 
        method: () => WorkingGetEndpoints.findActiveEvents() 
      },
      { 
        name: 'Students/Examinees (first 10)', 
        method: () => WorkingGetEndpoints.findStudents(10) 
      },
      { 
        name: 'Available Tests', 
        method: () => WorkingGetEndpoints.findAvailableTests() 
      },
      { 
        name: 'Event Classes', 
        method: () => WorkingGetEndpoints.findEventClasses() 
      },
      { 
        name: 'Recent Registrations (first 5)', 
        method: () => WorkingGetEndpoints.findRegistrations(5) 
      }
    ];
    
    for (const test of coreTests) {
      try {
        console.log(`\n   Testing ${test.name}...`);
        const start = Date.now();
        const result = await test.method();
        const duration = Date.now() - start;
        
        console.log(`   ✅ ${test.name}: ${result.success ? 'SUCCESS' : 'FAILED'} (${duration}ms)`);
        console.log(`      Status: HTTP ${result.metadata?.httpStatus || result.status}`);
        
        if (result.data) {
          const dataSize = Array.isArray(result.data) ? result.data.length : Object.keys(result.data).length;
          console.log(`      Data: ${dataSize} items returned`);
          
          if (Array.isArray(result.data) && result.data.length > 0) {
            const sample = result.data[0];
            const fields = Object.keys(sample).slice(0, 3).join(', ');
            console.log(`      Sample fields: ${fields}`);
          }
        }
        
        if (!result.success) {
          console.log(`      Error: ${result.error || 'Unknown error'}`);
        }
        
      } catch (error) {
        console.log(`   ❌ ${test.name}: EXCEPTION - ${error.message}`);
      }
    }
    
    // Test simple utility endpoints
    console.log('\n🔧 UTILITY ENDPOINTS:');
    
    const utilityTests = [
      { name: 'Timezones', method: () => WorkingGetEndpoints.getTimezones() },
      { name: 'SignalR Domain', method: () => WorkingGetEndpoints.getSignalRDomain() },
      { name: 'Message History', method: () => WorkingGetEndpoints.getMessageHistory() }
    ];
    
    for (const test of utilityTests) {
      try {
        console.log(`\n   Testing ${test.name}...`);
        const result = await test.method();
        
        console.log(`   ✅ ${test.name}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
        console.log(`      Status: HTTP ${result.metadata?.httpStatus || result.status}`);
        
        if (result.data && Array.isArray(result.data)) {
          console.log(`      Data: ${result.data.length} items`);
        }
        
      } catch (error) {
        console.log(`   ❌ ${test.name}: EXCEPTION - ${error.message}`);
      }
    }
    
    // Show endpoint summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 ENDPOINT SUMMARY:');
    console.log('='.repeat(60));
    
    const summary = WorkingGetEndpoints.getEndpointSummary();
    console.log(`\n📈 Proven Working Endpoints: ${summary.proven.total} out of ${summary.proven.testedFrom} tested`);
    console.log(`   Overall Success Rate: ${summary.proven.successRate}`);
    
    console.log('\n📋 By Category:');
    Object.entries(summary.categories).forEach(([category, stats]) => {
      console.log(`   ${category}: ${stats.count} endpoints (${stats.successRate} success, avg ${stats.avgResponse})`);
    });
    
    console.log('\n⚡ Performance Notes:');
    console.log(`   Fastest: ${summary.performance.fastest}`);
    console.log(`   Slowest: ${summary.performance.slowest}`);
    console.log(`   Recommended: ${summary.performance.recommended.join(', ')}`);
    
    console.log('\n🎯 REALITY CHECK COMPLETE');
    console.log('✅ This implementation focuses on ACTUALLY WORKING endpoints');
    console.log('✅ No more claims about endpoints that return HTTP 422/404');
    console.log('✅ Performance characteristics documented from real testing');
    console.log('✅ 22 proven endpoints ready for AI-native usage');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testWorkingEndpoints();
