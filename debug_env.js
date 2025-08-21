const { ApiClient } = require('./dist/ApiClient.js');

try {
  console.log('Creating ApiClient...');
  const client = new ApiClient('./environments/238-stg.json');
  
  console.log('Environment loaded:');
  console.log(JSON.stringify(client.env, null, 2));
  
  console.log('\nChecking for required credentials:');
  console.log('client-id:', client.env['client-id'] || client.env['client_id']);
  console.log('client-secret:', client.env['client-secret'] || client.env['client_secret']);  
  console.log('auth-url:', client.env['auth-url'] || client.env['auth_url']);
  console.log('token-url:', client.env['token-url'] || client.env['token_url']);
  console.log('baseUrl:', client.env.baseUrl);
  console.log('program-id:', client.env['program-id'] || client.env['program_id']);
  
} catch (error) {
  console.error('Error:', error.message);
}
