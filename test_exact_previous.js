const { ApiClient } = require('./dist/ApiClient.js');

async function testExactPreviousCall() {
  console.log('🔍 Testing with exact same call pattern that worked before...');
  
  const api = new ApiClient('./environments/238-stg.json', true);
  
  try {
    // This is the exact call pattern from our successful test_ai_demo
    console.log('Method 1: Using explicit query object (like successful test)');
    const response1 = await api.raw('/channel/institutions/query', {
      method: 'GET',
      query: {
        limit: 3,
        // program-id will be auto-injected
      }
    });
    
    console.log('Response 1:');
    console.log('Status:', response1.status);
    console.log('Response body length:', response1.text?.length || 0);
    if (response1.json) {
      console.log('JSON data available:', Array.isArray(response1.json) ? response1.json.length : 'object');
    }
    
    console.log('\nMethod 2: Using no query object (current approach)');
    const response2 = await api.raw('/channel/institutions/query', {
      method: 'GET'
      // No query object at all
    });
    
    console.log('Response 2:');
    console.log('Status:', response2.status);
    console.log('Response body length:', response2.text?.length || 0);
    
    console.log('\nMethod 3: Using the channelInstitutions_query method that worked');
    const response3 = await api.channelInstitutions_query({
      query: {
        'program-id': 238,
        limit: 5
      }
    });
    
    console.log('Response 3:');
    console.log('Status:', response3.status);
    console.log('Response body length:', response3.text?.length || 0);
    if (response3.json) {
      console.log('JSON data available:', Array.isArray(response3.json) ? response3.json.length : 'object');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testExactPreviousCall();
