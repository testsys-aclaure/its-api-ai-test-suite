const { ApiClient } = require('./dist/ApiClient.js');

async function debugParameterInjection() {
  console.log('🔍 Debugging parameter injection...');
  
  const api = new ApiClient('./environments/238-stg.json', true);
  
  // Let me intercept the fetch call to see what URL is actually being built
  const originalFetch = global.fetch;
  global.fetch = async (url, options) => {
    console.log('\n📡 INTERCEPTED FETCH CALL:');
    console.log('URL:', url);
    console.log('Method:', options.method);
    console.log('Headers:', JSON.stringify(options.headers, null, 2));
    
    // Call the original fetch
    const result = await originalFetch(url, options);
    return result;
  };
  
  try {
    console.log('Testing parameter injection...');
    
    const response = await api.raw('/channel/institutions/query', {
      method: 'GET'
      // No query object - should auto-inject parameters
    });
    
    console.log('\n📊 Response:');
    console.log('Status:', response.status);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Restore original fetch
    global.fetch = originalFetch;
  }
}

debugParameterInjection();
