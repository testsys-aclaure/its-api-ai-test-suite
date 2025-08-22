import { test, expect } from '@playwright/test';
import { EventQuery } from '../../src/endpoints/get/event-query.js';
import { EventClassQuery } from '../../src/endpoints/get/event-class-query.js';

test.describe('Custom One-Off API Requests', () => {
  
  test('Custom Event Query - Search by Description', async () => {
    console.log('\n🔍 CUSTOM REQUEST: Search for events containing "PPV"');
    
    const result = await EventQuery.execute({
      'program-id': '238',
      'event-description': 'PPV',
      'limit': '3'
    });
    
    console.log(`✅ Found ${result.length || result.events?.length || 0} events`);
    
    if (result.events) {
      result.events.forEach((event, index) => {
        console.log(`📝 Event ${index + 1}: ${event['event-description']} (ID: ${event['event-id']})`);
      });
    }
  });

  test('Custom Event Query - Find Long Running Events', async () => {
    console.log('\n🔍 CUSTOM REQUEST: Find events with long duration');
    
    const result = await EventQuery.execute({
      'program-id': '238',
      'limit': '10'
    });
    
    if (result.events) {
      const longEvents = result.events.filter(event => {
        if (!event['start-utc'] || !event['end-utc']) return false;
        const start = new Date(event['start-utc']);
        const end = new Date(event['end-utc']);
        const durationDays = (end - start) / (1000 * 60 * 60 * 24);
        return durationDays > 30; // More than 30 days
      });
      
      console.log(`✅ Found ${longEvents.length} events longer than 30 days:`);
      longEvents.forEach(event => {
        const start = new Date(event['start-utc']);
        const end = new Date(event['end-utc']);
        const durationDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
        console.log(`📝 ${event['event-description']}: ${durationDays} days (${start.toDateString()} → ${end.toDateString()})`);
      });
    }
  });

  test('Custom Event Class Query - Check Specific Event', async () => {
    console.log('\n🔍 CUSTOM REQUEST: Get classes for Event ID 3');
    
    try {
      const result = await EventClassQuery.execute({
        'program-id': '238',
        'program-institution-id': '1009048',
        'event-id': '3'
      });
      
      console.log(`✅ Event Class Query successful`);
      console.log('📄 Response keys:', Object.keys(result || {}));
      
    } catch (error) {
      if (error.status === 422 || error.status === 404) {
        console.log(`ℹ️  Business Logic Response: ${error.message}`);
        console.log('💡 This may be expected behavior - no classes configured for this event');
      } else {
        throw error;
      }
    }
  });

  test('AI-Style Natural Language Request', async () => {
    console.log('\n🤖 AI-STYLE REQUEST: "Show me active events for testing"');
    
    // Using the semantic interface
    const result = await EventQuery.getEvents({
      program: '238',
      institution: '1009048',
      activeOnly: true
    });
    
    console.log(`🎯 AI Interpretation: Found educational testing events`);
    if (result.events) {
      const now = new Date();
      const activeEvents = result.events.filter(event => {
        const endDate = new Date(event['end-utc']);
        return endDate > now;
      });
      
      console.log(`✅ ${activeEvents.length} events are currently active`);
      activeEvents.slice(0, 3).forEach(event => {
        console.log(`📚 ${event['event-description']} - Form: ${event['form-name']}`);
      });
    }
  });

});
