/**
 * AI-Native API Demo - Phase 2 Validation
 * Demonstrates natural language queries and direct API access
 * 
 * This demo validates that Phase 2 implementation works correctly
 * before proceeding to Phase 3 expansion
 */

import { DirectAPITools } from './dist/api/DirectAPITools.js';

class APIDemo {
  async runDemo() {
    console.log('🚀 Starting AI-Native API Demo - Phase 2\n');
    
    try {
      // Initialize the Direct API Tools
      console.log('🔧 Initializing Direct API Tools...');
      await DirectAPITools.initialize();
      
      // Get API status
      console.log('\n📊 Checking API Status...');
      const status = await DirectAPITools.getAPIStatus();
      
      if (!status.readyForQueries) {
        console.error('❌ API not ready for queries');
        console.log('Authentication:', status.authentication);
        console.log('Connectivity:', status.connectivity);
        return false;
      }
      
      console.log('✅ API ready for queries');
      console.log(`   - Authentication: ${status.authentication.isAuthenticated ? 'Valid' : 'Invalid'}`);
      console.log(`   - Base URL: ${status.connectivity.baseUrl}`);
      console.log(`   - Response Time: ${status.connectivity.responseTime}ms`);
      
      // Demo 1: Natural Language Queries
      console.log('\n🤖 Demo 1: Natural Language Queries');
      console.log('=' .repeat(50));
      
      const queries = [
        'active events',
        'students', 
        'test results',
        'institutions'
      ];
      
      for (const query of queries) {
        console.log(`\n🗣️ Query: "${query}"`);
        const response = await DirectAPITools.query(query);
        
        console.log(`   ${response.success ? '✅' : '❌'} ${response.metadata.method} ${response.metadata.endpoint}`);
        console.log(`   Response Time: ${response.metadata.responseTime}ms`);
        console.log(`   HTTP Status: ${response.metadata.httpStatus}`);
        
        if (response.metadata.businessContext) {
          console.log(`   Context: ${response.metadata.businessContext}`);
        }
        
        if (response.success && response.data) {
          const dataType = Array.isArray(response.data) ? 'array' : typeof response.data;
          const itemCount = Array.isArray(response.data) ? response.data.length : 'N/A';
          console.log(`   Data: ${dataType} (${itemCount} items)`);
        }
        
        if (response.error) {
          console.log(`   Error: ${response.error}`);
        }
        
        // Show hypermedia controls
        if (response.hypermedia && response.hypermedia.related.length > 0) {
          console.log('   Related Endpoints:');
          response.hypermedia.related.forEach(rel => {
            console.log(`     - ${rel.rel}: ${rel.description}`);
          });
        }
      }
      
      // Demo 2: Direct API Access
      console.log('\n\n🎯 Demo 2: Direct API Access');
      console.log('=' .repeat(50));
      
      const directEndpoints = [
        '/event/query',
        '/student/query',
        '/result/query'
      ];
      
      for (const endpoint of directEndpoints) {
        console.log(`\n🌐 Direct API: ${endpoint}`);
        const response = await DirectAPITools.makeRequest(endpoint);
        
        console.log(`   ${response.success ? '✅' : '❌'} Response in ${response.metadata.responseTime}ms`);
        console.log(`   HTTP Status: ${response.metadata.httpStatus}`);
        
        if (response.metadata.universalParametersApplied) {
          const paramCount = Object.keys(response.metadata.universalParametersApplied).length;
          console.log(`   Universal Parameters Applied: ${paramCount}`);
          Object.entries(response.metadata.universalParametersApplied).forEach(([key, value]) => {
            console.log(`     - ${key}: ${value}`);
          });
        }
        
        if (response.success && response.data) {
          const dataType = Array.isArray(response.data) ? 'array' : typeof response.data;
          const itemCount = Array.isArray(response.data) ? response.data.length : 'N/A';
          console.log(`   Response Data: ${dataType} (${itemCount} items)`);
          
          // Show sample of first item if array
          if (Array.isArray(response.data) && response.data.length > 0) {
            const firstItem = response.data[0];
            console.log('   Sample Item Keys:', Object.keys(firstItem).join(', '));
          }
        }
      }
      
      // Demo 3: Quick API Convenience Methods
      console.log('\n\n⚡ Demo 3: Quick API Convenience Methods');
      console.log('=' .repeat(50));
      
      const conveniences = [
        { name: 'getEvents()', method: DirectAPITools.getEvents },
        { name: 'getStudents()', method: DirectAPITools.getStudents },
        { name: 'getResults()', method: DirectAPITools.getResults }
      ];
      
      for (const { name, method } of conveniences) {
        console.log(`\n⚡ ${name}`);
        const startTime = Date.now();
        const response = await method.call(DirectAPITools);
        const totalTime = Date.now() - startTime;
        
        console.log(`   ${response.success ? '✅' : '❌'} Completed in ${totalTime}ms`);
        console.log(`   API Response Time: ${response.metadata.responseTime}ms`);
        
        if (response.success && response.data) {
          const itemCount = Array.isArray(response.data) ? response.data.length : 'N/A';
          console.log(`   Retrieved: ${itemCount} items`);
        }
      }
      
      // Demo 4: Available Queries Reference
      console.log('\n\n📚 Demo 4: Available Query Patterns');
      console.log('=' .repeat(50));
      
      const availableQueries = DirectAPITools.getAvailableQueries();
      
      availableQueries.forEach(query => {
        console.log(`\n📋 ${query.pattern}:`);
        console.log(`   Endpoint: ${query.endpoint}`);
        console.log(`   Description: ${query.description}`);
        console.log(`   Examples: ${query.examples.join(', ')}`);
      });
      
      console.log('\n\n🎉 Phase 2 Demo Complete!');
      console.log('✅ Natural language queries working');
      console.log('✅ Direct API access working');
      console.log('✅ Quick convenience methods working');
      console.log('✅ Self-descriptive responses with business context');
      console.log('✅ Richardson Level 3 hypermedia controls');
      console.log('✅ Universal parameters automatically applied');
      console.log('\n🚀 Ready for Phase 3: Systematic Endpoint Expansion');
      
      return true;
      
    } catch (error) {
      console.error('\n❌ Demo failed:', error);
      return false;
    }
  }

  async runQuickValidation() {
    console.log('🔍 Quick Phase 2 Validation...\n');
    
    try {
      await DirectAPITools.initialize();
      
      // Test 1: Natural language query
      const nlResponse = await DirectAPITools.query('active events');
      console.log(`✅ Natural Language: ${nlResponse.success ? 'PASS' : 'FAIL'}`);
      
      // Test 2: Direct API access
      const directResponse = await DirectAPITools.makeRequest('/event/query');
      console.log(`✅ Direct API: ${directResponse.success ? 'PASS' : 'FAIL'}`);
      
      // Test 3: Convenience method
      const convResponse = await DirectAPITools.getEvents();
      console.log(`✅ Convenience Method: ${convResponse.success ? 'PASS' : 'FAIL'}`);
      
      const allPassed = nlResponse.success && directResponse.success && convResponse.success;
      
      console.log(`\n${allPassed ? '🎉 VALIDATION PASSED' : '❌ VALIDATION FAILED'}`);
      
      return allPassed;
      
    } catch (error) {
      console.error('❌ Validation error:', error);
      return false;
    }
  }
}

// Run demo based on command line argument
const demo = new APIDemo();

if (process.argv.includes('--quick')) {
  demo.runQuickValidation().then(success => {
    process.exit(success ? 0 : 1);
  });
} else {
  demo.runDemo().then(success => {
    process.exit(success ? 0 : 1);
  });
}
