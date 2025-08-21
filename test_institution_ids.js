const { ApiClient } = require('./dist/ApiClient.js');

async function testWithDifferentInstitutionIds() {
  console.log('🔍 Testing with different institution IDs...');
  
  const api = new ApiClient('./environments/238-stg.json', true);
  
  const testCases = [
    {
      name: 'No institution ID (just program-id)',
      query: { 'program-id': 238, limit: 3 }
    },
    {
      name: 'With program-institution-id',
      query: { 'program-id': 238, 'program-institution-id': '1009048', limit: 3 }
    },
    {
      name: 'With parent-program-institution-id',
      query: { 'program-id': 238, 'program-institution-id': '1009159', limit: 3 }
    },
    {
      name: 'Minimal parameters',
      query: { 'program-id': 238 }
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n🧪 Test: ${testCase.name}`);
    
    try {
      const response = await api.raw('/channel/institutions/query', {
        method: 'GET',
        query: testCase.query
      });
      
      console.log(`   Status: ${response.status}`);
      
      if (response.status === 200 && response.json) {
        const count = Array.isArray(response.json) ? response.json.length : 'object';
        console.log(`   ✅ SUCCESS! Data: ${count} items`);
        console.log(`   Sample item keys:`, Object.keys(response.json[0] || {}));
      } else if (response.text && response.text.length > 0) {
        try {
          const errorData = JSON.parse(response.text);
          console.log(`   ❌ Error:`, errorData.title || errorData.message || 'Unknown');
          if (errorData.errors) {
            console.log(`   📋 Details:`, JSON.stringify(errorData.errors));
          }
        } catch (e) {
          console.log(`   ❌ Error: ${response.text.substring(0, 100)}`);
        }
      } else {
        console.log(`   ❌ ${response.status} with no response body`);
      }
      
    } catch (error) {
      console.log(`   ❌ Exception: ${error.message}`);
    }
  }
}

testWithDifferentInstitutionIds();
