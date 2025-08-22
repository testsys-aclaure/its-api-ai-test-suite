/**
 * Debug Semantic Discovery - Test the intelligence system
 */

import { IntelligenceIntegrator } from './dist/intelligence/IntelligenceIntegrator.js';

async function debugSemanticDiscovery() {
  console.log('🔍 Debugging Semantic Discovery...\n');
  
  try {
    await IntelligenceIntegrator.initialize();
    
    // Test 1: Get all GET endpoints
    console.log('📊 Test 1: Get All GET Endpoints');
    const getEndpoints = IntelligenceIntegrator.getGetEndpoints();
    console.log(`   Found ${getEndpoints.length} GET endpoints`);
    
    if (getEndpoints.length > 0) {
      console.log('   Sample endpoints:');
      getEndpoints.slice(0, 5).forEach(ep => {
        console.log(`   - ${ep.name} (${ep.businessDomain})`);
        console.log(`     Path: ${ep.url?.pathString || 'N/A'}`);
        console.log(`     Tags: ${ep.semanticTags?.join(', ') || 'N/A'}`);
        console.log(`     Aliases: ${ep.naturalLanguageAliases?.join(', ') || 'N/A'}`);
        console.log('');
      });
    }
    
    // Test 2: Search by semantics
    console.log('🔍 Test 2: Semantic Search');
    const searchQueries = ['student', 'event', 'management', 'query'];
    
    for (const query of searchQueries) {
      const results = IntelligenceIntegrator.searchEndpointsBySemantics(query);
      console.log(`   "${query}": ${results.length} matches`);
      
      if (results.length > 0) {
        console.log(`     Best match: ${results[0].name} (${results[0].businessDomain})`);
      }
    }
    
    // Test 3: Business domains
    console.log('\n🏢 Test 3: Business Domains');
    const domains = [...new Set(getEndpoints.map(ep => ep.businessDomain))];
    console.log(`   Found domains: ${domains.join(', ')}`);
    
    for (const domain of domains.slice(0, 3)) {
      const domainEndpoints = IntelligenceIntegrator.getEndpointsByDomain(domain);
      console.log(`   ${domain}: ${domainEndpoints.length} endpoints`);
    }
    
    // Test 4: Intelligence report
    console.log('\n📊 Test 4: Intelligence Report');
    const report = IntelligenceIntegrator.getIntelligenceReport();
    console.log(`   Total endpoints: ${report.metadata.totalEndpoints}`);
    console.log(`   Readiness score: ${report.readinessScore}%`);
    console.log(`   Domains: ${report.domains.length}`);
    
    console.log('\n✅ Semantic discovery debugging complete');
    return true;
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
    return false;
  }
}

debugSemanticDiscovery().then(success => {
  process.exit(success ? 0 : 1);
});
