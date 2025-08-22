/**
 * Simple Foundation Test - Debug Version
 * Tests basic functionality with better error handling
 */

import { EnvironmentConfig } from './dist/config/EnvironmentConfig.js';
import { OAuth2Client } from './dist/auth/OAuth2Client.js';

async function simpleFoundationTest() {
  console.log('🚀 Starting Simple Foundation Test...\n');

  try {
    // Test 1: Environment Configuration
    console.log('📋 Testing environment configuration...');
    await EnvironmentConfig.initialize();
    
    const baseUrl = EnvironmentConfig.getBaseUrl();
    const clientId = EnvironmentConfig.getClientId();
    const programId = EnvironmentConfig.getDefaultProgramId();
    
    console.log('✅ Environment loaded:');
    console.log(`   - Base URL: ${baseUrl}`);
    console.log(`   - Client ID: ${clientId ? clientId.substring(0, 8) + '...' : 'MISSING'}`);
    console.log(`   - Program ID: ${programId}`);
    
    if (!baseUrl || !clientId || !programId) {
      throw new Error('Missing critical configuration');
    }
    
    // Test 2: OAuth2 Configuration Validation  
    console.log('\n🔐 Testing OAuth2 configuration...');
    const configValidation = await OAuth2Client.validateConfiguration();
    
    if (!configValidation.isValid) {
      console.error('❌ OAuth2 Configuration Issues:');
      configValidation.issues.forEach(issue => console.error(`   - ${issue}`));
      throw new Error('OAuth2 configuration invalid');
    }
    
    console.log('✅ OAuth2 configuration valid');
    
    // Test 3: Token Acquisition (with timeout)
    console.log('\n🔐 Testing token acquisition...');
    
    const tokenPromise = OAuth2Client.getAccessToken();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Token acquisition timeout')), 15000)
    );
    
    const accessToken = await Promise.race([tokenPromise, timeoutPromise]);
    
    if (!accessToken || accessToken.length < 10) {
      throw new Error('Invalid access token received');
    }
    
    console.log(`✅ Access token acquired (${accessToken.length} characters)`);
    
    // Test 4: Simple API Call
    console.log('\n🌐 Testing API connectivity...');
    
    const testUrl = `${baseUrl}/event/query?program-id=${programId}`;
    
    const apiPromise = fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });
    
    const apiTimeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('API call timeout')), 10000)
    );
    
    const response = await Promise.race([apiPromise, apiTimeoutPromise]);
    
    console.log(`✅ API responded with status: ${response.status}`);
    
    if (response.status === 401) {
      throw new Error('Authentication failed - invalid token');
    }
    
    console.log('\n🎉 SUCCESS: Foundation is working!');
    console.log('✅ Ready to proceed to Phase 2: Direct API Tools');
    
    return true;
    
  } catch (error) {
    console.error('\n❌ FOUNDATION FAILURE:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check .env file configuration');
    console.error('2. Verify network connectivity');
    console.error('3. Check OAuth2 credentials');
    console.error('4. Ensure staging environment is accessible');
    
    return false;
  }
}

// Run the test
simpleFoundationTest().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
