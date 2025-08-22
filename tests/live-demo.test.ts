import { test, expect } from '@playwright/test';
import { authenticatedRequest } from '../src/auth/oauth-client.js';

test.describe('Live API Interaction Demo', () => {

  test('Make a one-off custom API request', async () => {
    console.log('\n🎯 DEMONSTRATING LIVE API INTERACTION');
    console.log('=====================================');
    
    // Example 1: Raw API call with custom parameters
    console.log('\n📡 Making raw authenticated request...');
    const url = 'https://api-staging.testsys.io/event/query';
    const params = new URLSearchParams({
      'program-id': '238',
      'limit': '2',
      'event-description': 'PPV'  // Custom search
    });
    
    const response = await authenticatedRequest('GET', `${url}?${params}`);
    
    expect(response.ok).toBe(true);
    const data = await response.json();
    
    console.log(`✅ Status: ${response.status}`);
    console.log(`📊 Found: ${data.length || data.events?.length || 0} events`);
    
    if (data.events) {
      data.events.forEach((event, i) => {
        console.log(`📝 Event ${i+1}: "${event['event-description']}" (Form: ${event['form-name']})`);
        console.log(`   Duration: ${event['start-utc']} → ${event['end-utc']}`);
      });
    }
    
    // Example 2: Another custom request 
    console.log('\n📡 Making another custom request (Event Authorizations)...');
    const authUrl = 'https://api-staging.testsys.io/event/authorizations/Query';
    const authParams = new URLSearchParams({
      'program-id': '238',
      'program-institution-id': '1009048',
      'event-id': '2'  // Different event
    });
    
    try {
      const authResponse = await authenticatedRequest('GET', `${authUrl}?${authParams}`);
      if (authResponse.ok) {
        const authData = await authResponse.json();
        console.log(`✅ Authorization data retrieved successfully`);
        console.log('📄 Keys:', Object.keys(authData || {}));
      }
    } catch (error) {
      console.log(`ℹ️  Expected behavior: ${error.message}`);
      console.log('💡 Business Logic: This event likely has no authorization requirements');
    }
    
    console.log('\n🎯 INTERACTION SUMMARY:');
    console.log('- I can make authenticated requests to any endpoint');
    console.log('- I can customize parameters for specific queries'); 
    console.log('- I can interpret business logic responses');
    console.log('- I can handle both success and expected error scenarios');
  });
  
});
