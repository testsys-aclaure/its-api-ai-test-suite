/**
 * Test Improved Semantic Discovery
 */

import { IntelligenceIntegrator } from './dist/intelligence/IntelligenceIntegrator.js';

async function testImprovedSemantics() {
  console.log('🧠 Testing Improved Semantic Discovery...\n');
  
  try {
    await IntelligenceIntegrator.initialize();
    
    const testQueries = [
      'student management',
      'student',
      'students',
      'examinee',
      'test administration',
      'event management'
    ];
    
    for (const query of testQueries) {
      const results = IntelligenceIntegrator.searchEndpointsBySemantics(query);
      console.log(`"${query}": ${results.length} matches`);
      
      if (results.length > 0) {
        console.log(`   Best matches:`);
        results.slice(0, 3).forEach((ep, i) => {
          console.log(`   ${i+1}. ${ep.name} (${ep.businessDomain})`);
        });
      }
      console.log('');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

testImprovedSemantics().then(success => {
  process.exit(success ? 0 : 1);
});
