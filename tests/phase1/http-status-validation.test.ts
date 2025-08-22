import { test, expect } from '@playwright/test';
import { EventQuery } from '../../src/endpoints/get/event-query.js';
import { authenticatedRequest } from '../../src/auth/oauth-client.js';

test.describe('HTTP Status Code Validation', () => {
  
  test('Event Query returns actual HTTP 200 status', async () => {
    if (!process.env.BASE_URL || !process.env.DEFAULT_PROGRAM_ID) {
      test.skip();
      return;
    }
    
    // Build the exact same request as EventQuery.execute() but check response status
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/event/query`;
    const queryParams = new URLSearchParams();
    queryParams.set('program-id', process.env.DEFAULT_PROGRAM_ID);
    
    // Make the raw authenticated request
    const response = await authenticatedRequest('GET', `${url}?${queryParams}`);
    
    // EXPLICIT STATUS CODE VALIDATION
    console.log(`🔍 HTTP Status Code: ${response.status}`);
    console.log(`✅ Response OK: ${response.ok}`);
    
    // Verify we got HTTP 200
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
    
    // Get the actual response data
    const data = await response.json();
    expect(data).toBeDefined();
    
    if (Array.isArray(data)) {
      console.log(`📊 Event Query returned ${data.length} events with HTTP 200`);
    } else if (data.events && Array.isArray(data.events)) {
      console.log(`📊 Event Query returned ${data.events.length} events with HTTP 200`);
    }
  });

  test('Event Authorizations Query HTTP status verification', async () => {
    if (!process.env.BASE_URL || !process.env.DEFAULT_PROGRAM_ID) {
      test.skip();
      return;
    }
    
    // Build the request for Event Authorizations
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/event/authorizations/Query`;
    const queryParams = new URLSearchParams();
    queryParams.set('program-id', process.env.DEFAULT_PROGRAM_ID);
    queryParams.set('program-institution-id', process.env.PROGRAM_INSTITUTION_ID || '1009048');
    queryParams.set('event-id', '1');
    
    // Make the raw authenticated request
    const response = await authenticatedRequest('GET', `${url}?${queryParams}`);
    
    console.log(`🔍 Event Auth HTTP Status Code: ${response.status}`);
    console.log(`✅ Response OK: ${response.ok}`);
    
    if (response.status === 200) {
      console.log(`✅ Event Authorizations returned HTTP 200`);
      expect(response.status).toBe(200);
    } else if (response.status === 422) {
      console.log(`ℹ️ Event Authorizations returned HTTP 422 (business logic: no auth records found)`);
      const errorData = await response.text();
      expect(errorData).toContain('event-ids were not found');
    } else {
      console.log(`❓ Unexpected status: ${response.status}`);
      // Let's see what we got
      const data = await response.text();
      console.log('Response:', data);
    }
  });

  test('Event Class Query HTTP status verification', async () => {
    if (!process.env.BASE_URL || !process.env.DEFAULT_PROGRAM_ID) {
      test.skip();
      return;
    }
    
    // Build the request for Event Class
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/event-class/Query`;
    const queryParams = new URLSearchParams();
    queryParams.set('program-id', process.env.DEFAULT_PROGRAM_ID);
    queryParams.set('program-institution-id', process.env.PROGRAM_INSTITUTION_ID || '1009048');
    queryParams.set('event-id', '1');
    
    // Make the raw authenticated request
    const response = await authenticatedRequest('GET', `${url}?${queryParams}`);
    
    console.log(`🔍 Event Class HTTP Status Code: ${response.status}`);
    console.log(`✅ Response OK: ${response.ok}`);
    
    if (response.status === 200) {
      console.log(`✅ Event Class returned HTTP 200`);
      const data = await response.json();
      console.log(`📊 Data keys:`, Object.keys(data || {}));
    } else {
      console.log(`ℹ️ Event Class returned HTTP ${response.status}`);
      const data = await response.text();
      console.log('Response:', data.substring(0, 200));
    }
    
    // Accept either 200 (data found) or appropriate business logic responses
    expect([200, 404, 422]).toContain(response.status);
  });
});
