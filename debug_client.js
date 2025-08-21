// Debug the ApiClient import issue
console.log('Testing ApiClient import...');

try {
  const exports = require('./dist/ApiClient.js');
  console.log('✅ File required successfully');
  console.log('📦 Exports keys:', Object.keys(exports));
  
  if (exports.ApiClient) {
    console.log('✅ ApiClient found in exports');
    console.log('🔧 ApiClient type:', typeof exports.ApiClient);
    
    const { ApiClient } = exports;
    const client = new ApiClient();
    console.log('✅ ApiClient instantiated successfully');
    console.log('📋 Client methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client)));
  } else {
    console.log('❌ ApiClient NOT found in exports');
    console.log('Available:', Object.keys(exports));
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('📍 Stack:', error.stack);
}
