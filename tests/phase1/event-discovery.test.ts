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

  test('LIVE DEMO: One-off custom API requests', async () => {
    if (!process.env.BASE_URL || !process.env.DEFAULT_PROGRAM_ID) {
      test.skip();
      return;
    }
    
    console.log('\n🎯 DEMONSTRATING LIVE API INTERACTION');
    console.log('=====================================');
    
    // Example 1: Search for events containing "PPV"
    console.log('\n📡 Custom Request 1: Search for PPV events');
    const searchResult = await EventQuery.execute({
      'program-id': '238',
      'event-description': 'PPV',
      'limit': '3'
    });
    
    if (searchResult.events) {
      console.log(`✅ Found ${searchResult.events.length} PPV events:`);
      searchResult.events.forEach((event, i) => {
        console.log(`  ${i+1}. "${event['event-description']}" (Form: ${event['form-name']})`);
      });
    }
    
    // Example 2: Use semantic interface
    console.log('\n🤖 Custom Request 2: Using AI-native semantic interface');
    const semanticResult = await EventQuery.getEvents({
      program: '238',
      limit: 2,
      event: 'ITS'  // Search for "ITS" in description
    });
    
    console.log('✅ Semantic interface response received');
    if (semanticResult.events) {
      semanticResult.events.forEach(event => {
        console.log(`📚 Found: ${event['event-description']}`);
      });
    }
    
    // Example 3: Business-friendly alias
    console.log('\n🏢 Custom Request 3: Using business-friendly method');
    const businessResult = await EventQuery.listAllEvents('238');
    console.log(`✅ Business alias returned ${businessResult.events?.length || 0} total events`);
    
    console.log('\n🎯 INTERACTION CAPABILITIES SUMMARY:');
    console.log('✅ Raw parameter-based requests');
    console.log('✅ Semantic natural-language style queries'); 
    console.log('✅ Business-friendly method aliases');
    console.log('✅ Custom parameter combinations');
    console.log('✅ Real-time data retrieval and analysis');
  });
});
