const { ApiClient } = require('./dist/ApiClient.js');

async function getActualErrorMessage() {
  console.log('🔍 Getting actual error message from 422 response...');
  
  const api = new ApiClient('./environments/238-stg.json', true);
  
  try {
    const response = await api.raw('/channel/institutions/query', {
      method: 'GET'
      // No query object - this gives us 422 with error message
    });
    
    console.log('📊 422 Response Details:');
    console.log('Status:', response.status);
    console.log('Response text length:', response.text?.length || 0);
    console.log('Response text:', response.text);
    
    // Try to parse as JSON
    if (response.text) {
      try {
        const errorData = JSON.parse(response.text);
        console.log('\n📋 Parsed Error Data:');
        console.log(JSON.stringify(errorData, null, 2));
        
        if (errorData.error || errorData.message || errorData.details) {
          console.log('\n💡 Key Error Information:');
          if (errorData.error) console.log('Error:', errorData.error);
          if (errorData.message) console.log('Message:', errorData.message);  
          if (errorData.details) console.log('Details:', errorData.details);
        }
      } catch (e) {
        console.log('Not valid JSON, raw text response:', response.text);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

getActualErrorMessage();
