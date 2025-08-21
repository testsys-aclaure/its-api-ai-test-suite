const { ApiClient } = require('./dist/ApiClient.js');

async function debugSingleEndpoint() {
  console.log('🔍 Debugging single endpoint that was previously working...');
  
  const api = new ApiClient('./environments/238-stg.json', true);
  
  try {
    console.log('Available environment keys:');
    Object.keys(api.env).forEach(key => {
      console.log(`  ${key}: ${api.env[key]}`);
    });
    
    console.log('\nTesting /channel/institutions/query that was working before...');
    
    const response = await api.raw('/channel/institutions/query', { 
      method: 'GET',
      query: {} // Let auto-injection handle parameters
    });
    
    console.log('\n📊 Raw Response Details:');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Text:', response.text);
    
    if (response.text) {
      try {
        const parsed = JSON.parse(response.text);
        console.log('JSON:', JSON.stringify(parsed, null, 2));
      } catch (e) {
        console.log('Failed to parse as JSON, raw text:', response.text);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

debugSingleEndpoint();
