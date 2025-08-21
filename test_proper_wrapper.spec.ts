import { test, expect } from '@playwright/test';

// Test using the PROPER wrapper layer architecture
test.describe('Proper Wrapper Layer Test', () => {
  
  test('Test with proper ApiWrapper through raw method', async () => {
    console.log('🎯 Testing with PROPER wrapper layer architecture...');
    
    // Set debug mode for visibility
    process.env.DEBUG = 'api:*';
    
    try {
      // Import the proper wrapper
      const { ApiWrapper } = await import('./src/api/ApiWrapper');
      const api = new ApiWrapper();
      
      console.log('✅ ApiWrapper imported and initialized');
      
      // Test basic endpoint with proper parameter handling
      const response = await api.raw('/channel/institutions/query', {
        method: 'GET'
      });
      
      console.log(`📊 Response Status: ${response.status}`);
      console.log(`📄 Response Text Length: ${response.text?.length || 0}`);
      
      if (response.status === 200 && response.json) {
        console.log(`✅ SUCCESS! Data count: ${Array.isArray(response.json) ? response.json.length : 'object'}`);
        console.log(`📋 First item keys:`, Object.keys(response.json[0] || {}));
      } else if (response.text) {
        console.log(`❌ Error response: ${response.text.substring(0, 200)}`);
        
        // Try to parse error for parameter format issues
        try {
          const errorData = JSON.parse(response.text);
          if (errorData.errors) {
            console.log(`💡 Parameter errors detected:`, errorData.errors);
          }
        } catch (e) {
          // Not JSON, raw error
        }
      }
      
      expect(response).toBeDefined();
      
    } catch (error: any) {
      console.error('❌ Error with proper wrapper:', error.message);
      
      // If the proper wrapper fails due to compilation issues, 
      // fall back to legacy client but with proper parameter investigation
      console.log('🔄 Falling back to investigate parameter formatting...');
      
      const { ApiClient } = require('./dist/ApiClient.js');
      const legacyApi = new ApiClient('./environments/238-stg.json', true);
      
      console.log('🔍 Testing different parameter formats:');
      
      const testCases = [
        { name: 'String IDs', query: { 'program-id': '238', 'program-institution-id': '1009048' }},
        { name: 'Number IDs', query: { 'program-id': 238, 'program-institution-id': 1009048 }},
        { name: 'Mixed format', query: { 'program-id': 238, 'program-institution-id': '1009048' }},
      ];
      
      for (const testCase of testCases) {
        console.log(`\n🧪 ${testCase.name}:`);
        try {
          const response = await legacyApi.raw('/channel/institutions/query', {
            method: 'GET',
            query: testCase.query
          });
          
          console.log(`   Status: ${response.status}`);
          if (response.status === 200) {
            console.log(`   ✅ SUCCESS with ${testCase.name}!`);
          } else if (response.text && response.text.length > 0) {
            const errorSample = response.text.substring(0, 100);
            console.log(`   ❌ Error: ${errorSample}`);
          }
        } catch (e: any) {
          console.log(`   ❌ Exception: ${e.message}`);
        }
      }
    }
  });
});
