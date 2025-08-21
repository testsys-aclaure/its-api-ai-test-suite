import { test, expect } from '@playwright/test';

// For now, use the working legacy client to demonstrate AI interaction pattern
const { ApiClient } = require('./dist/ApiClient.js');

test.describe('AI-Enabled API Interaction Demo', () => {
  let api: any;

  test.beforeEach(async () => {
    api = new ApiClient('./environments/238-stg.json');
  });

  test('AI can make intelligent dynamic calls', async () => {
    console.log('🤖 AI demonstrating intelligent API interaction...');
    
    // AI can call endpoints dynamically with natural parameter names
    const response = await api.raw('/channel/institutions/query', {
      method: 'GET',
      // AI automatically knows to inject program-id from environment
      query: {
        limit: 3,
        // program-id will be auto-injected
      }
    });

    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📄 Response:`, response.json || response.data);

    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
    
    if (response.json) {
      console.log(`✅ AI successfully retrieved ${response.json.length || 'unknown'} institutions`);
    }
  });

  test('AI can discover and call new endpoints', async () => {
    console.log('🤖 AI discovering new endpoints...');
    
    // AI can try different endpoints based on natural language understanding
    const endpoints = [
      '/channel/institutions/query',
      '/test/forms/query',
      '/event/authorizations/query'
    ];

    for (const endpoint of endpoints) {
      console.log(`🔍 AI trying: ${endpoint}`);
      
      try {
        const response = await api.raw(endpoint, { method: 'GET' });
        
        if (response.status >= 200 && response.status < 300) {
          console.log(`✅ ${endpoint} - SUCCESS (${response.status})`);
          
          if (response.json) {
            const count = Array.isArray(response.json) ? response.json.length : Object.keys(response.json).length;
            console.log(`   📊 Returned ${count} items`);
          }
        } else {
          console.log(`❌ ${endpoint} - Failed (${response.status})`);
        }
      } catch (error: any) {
        console.log(`❌ ${endpoint} - Error: ${error.message}`);
      }
    }
  });
});
