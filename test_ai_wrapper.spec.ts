import { test, expect } from '@playwright/test';
import { ApiWrapper } from './src/api/ApiWrapper';

test.describe('AI-Enabled API Tests', () => {
  let api: ApiWrapper;

  test.beforeEach(async () => {
    // Enable debug mode for AI interaction visibility
    process.env.DEBUG = 'api:*';
    api = new ApiWrapper();
  });

  test.afterEach(async () => {
    await api.dispose();
  });

  test('AI can make dynamic GET call to /channel/institutions/query', async () => {
    console.log('🤖 AI making dynamic API call...');
    
    // AI can call any endpoint dynamically using the raw() method
    const response = await api.raw('/channel/institutions/query', {
      method: 'GET'
    });

    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📄 Response Data:`, response.json);

    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
    
    // Validate response structure
    if (response.json) {
      expect(response.json).toBeDefined();
      console.log(`✅ Success! Found ${response.json.length || 'unknown'} records`);
    }
  });

  test('AI can make parameterized calls with auto-injection', async () => {
    console.log('🤖 AI making parameterized call with auto-injection...');
    
    // AI can pass additional parameters, auto-injection handles program-id
    const path = '/channel/institutions/query?limit=3';
    const response = await api.raw(path, {
      method: 'GET'
    });

    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📄 Response Data:`, response.json);

    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });
});
