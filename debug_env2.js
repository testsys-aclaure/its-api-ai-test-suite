const { ApiClient } = require('./dist/ApiClient.js');

try {
  console.log('🔍 Debugging environment loading...');
  const api = new ApiClient('./environments/238-stg.json');
  
  console.log('🔧 Environment keys:');
  Object.keys(api.env).forEach(key => {
    console.log(`   ${key}: ${api.env[key]}`);
  });
  
  console.log('\n🔍 Looking for URL fields:');
  console.log('baseURL:', api.env.baseURL);
  console.log('baseUrl:', api.env.baseUrl); 
  console.log('base-url:', api.env['base-url']);
  console.log('base_url:', api.env.base_url);
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
