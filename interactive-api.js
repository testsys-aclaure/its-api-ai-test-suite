// Interactive API Client for One-Off Requests
// Usage: node interactive-api.js

import { EventQuery } from './src/endpoints/get/event-query.js';
import { EventClassQuery } from './src/endpoints/get/event-class-query.js';
import { EventAuthorizationsQuery } from './src/endpoints/get/event-authorizations-query.js';

console.log('🎯 AI-Native Educational Testing Platform - Interactive API Client');
console.log('================================================================');

async function makeCustomRequest(endpoint, params) {
  try {
    console.log(`\n🔄 Making request to ${endpoint}...`);
    console.log('📋 Parameters:', JSON.stringify(params, null, 2));
    
    let result;
    switch (endpoint.toLowerCase()) {
      case 'events':
      case 'event':
        result = await EventQuery.execute(params);
        break;
      case 'event-class':
      case 'classes':
        result = await EventClassQuery.execute(params);
        break;
      case 'event-auth':
      case 'authorizations':
        result = await EventAuthorizationsQuery.execute(params);
        break;
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
    
    console.log('✅ Success! Response received:');
    
    // Smart response formatting
    if (Array.isArray(result)) {
      console.log(`📊 Array response with ${result.length} items`);
      if (result.length > 0) {
        console.log('📝 First item:', JSON.stringify(result[0], null, 2));
      }
    } else if (result.events && Array.isArray(result.events)) {
      console.log(`📊 Events array with ${result.events.length} items`);
      if (result.events.length > 0) {
        console.log('📝 First event:', JSON.stringify(result.events[0], null, 2));
      }
    } else {
      console.log('📄 Full response:', JSON.stringify(result, null, 2));
    }
    
    return result;
  } catch (error) {
    console.log('❌ Error:', error.message);
    if (error.status) {
      console.log(`🌐 HTTP Status: ${error.status}`);
      console.log('💡 Business Context:', error.context?.businessContext || 'None provided');
    }
    return null;
  }
}

// Example usage functions
export async function quickEventList() {
  return makeCustomRequest('events', {
    'program-id': '238',
    'limit': '5'
  });
}

export async function findActiveEvents() {
  return makeCustomRequest('events', {
    'program-id': '238',
    'program-institution-id': '1009048',
    'active-only': 'true',
    'limit': '10'
  });
}

export async function getEventClasses(eventId = '1') {
  return makeCustomRequest('event-class', {
    'program-id': '238',
    'program-institution-id': '1009048',
    'event-id': eventId
  });
}

export async function checkEventAuth(eventId = '1') {
  return makeCustomRequest('event-auth', {
    'program-id': '238',
    'program-institution-id': '1009048',
    'event-id': eventId
  });
}

// If called directly, run some examples
if (process.argv[1].endsWith('interactive-api.js')) {
  console.log('\n🚀 Running example queries...\n');
  
  await quickEventList();
  await findActiveEvents(); 
  await getEventClasses('1');
  await checkEventAuth('1');
}
