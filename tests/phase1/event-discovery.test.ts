import { test, expect } from '@playwright/test';
import { EventQuery } from '../../src/endpoints/get/event-query.js';

test.describe('Event Discovery', () => {
  test('Discover actual events for testing', async () => {
    if (!process.env.BASE_URL || !process.env.DEFAULT_PROGRAM_ID) {
      test.skip();
      return;
    }
    
    // Get events with limit to see some actual event data
    const params = {
      'program-id': process.env.DEFAULT_PROGRAM_ID,
      'limit': '5'
    };
    
    const result = await EventQuery.execute(params);
    
    console.log('Full result:', JSON.stringify(result, null, 2));
  });
});
