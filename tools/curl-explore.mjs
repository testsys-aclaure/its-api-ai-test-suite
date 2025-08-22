#!/usr/bin/env node

/**
 * CURL-Based Fast API Exploration
 * 
 * Much faster than Node.js HTTP requests - uses native CURL for speed
 * Perfect for rapid endpoint discovery and troubleshooting
 */

import 'dotenv/config';
import { execSync } from 'child_process';

// Direct environment access for speed
const env = {
  getBaseUrl: () => process.env.BASE_URL || 'https://api-staging.testsys.io',
  getIdentityUrl: () => process.env.IDENTITY_URL || 'https://identity-staging.testsys.io', 
  getClientId: () => process.env.CLIENT_ID,
  getClientSecret: () => process.env.CLIENT_SECRET,
  getScope: () => process.env.SCOPE || 'its-next-gen-api',
  getDefaultProgramId: () => process.env.DEFAULT_PROGRAM_ID || '238',
  getProgramInstitutionId: () => process.env.PROGRAM_INSTITUTION_ID || '1009048'
};

// Get command line arguments
const args = process.argv.slice(2);
const endpoint = args[0];
const userIntent = args.slice(1).join(' ') || 'fast exploration';

async function curlExplore(endpointPath, intent = 'fast exploration') {
  console.log('⚡ CURL-Based Fast API Exploration');
  console.log('═══════════════════════════════════\n');
  
  if (!endpointPath) {
    console.log('❌ Usage: node tools/curl-explore.mjs <endpoint> [user-intent]');
    console.log('\nExamples:');
    console.log('  node tools/curl-explore.mjs /user/query "get user permissions"');
    console.log('  node tools/curl-explore.mjs /event/query "find available tests"');
    console.log('  node tools/curl-explore.mjs /examinee/query');
    process.exit(1);
  }

  const baseUrl = env.getBaseUrl();
  
  console.log(`📝 Endpoint: ${endpointPath}`);
  console.log(`🎯 Intent: ${intent}`);
  console.log(`🌐 Base URL: ${baseUrl}`);
  console.log('─'.repeat(50));

  // Step 1: Get access token (fast with CURL)
  console.log('\n🔐 Step 1: Getting access token with CURL...');
  const tokenStart = Date.now();
  
  const tokenCmd = `curl -s -X POST "${env.getIdentityUrl()}/connect/token" ` +
    `-H "Content-Type: application/x-www-form-urlencoded" ` +
    `-d "grant_type=client_credentials&client_id=${env.getClientId()}&client_secret=${env.getClientSecret()}&scope=${env.getScope()}" ` +
    `--connect-timeout 10 --max-time 30`;

  try {
    const tokenResponse = execSync(tokenCmd, { encoding: 'utf8' });
    const tokenData = JSON.parse(tokenResponse);
    const tokenTime = Date.now() - tokenStart;
    
    if (!tokenData.access_token) {
      throw new Error('No access token received');
    }
    
    console.log(`✅ Token acquired in ${tokenTime}ms (CURL)`);
    
    // Step 2: Fast endpoint exploration strategies
    const accessToken = tokenData.access_token;
    
    console.log('\n🔍 Step 2: Fast exploration strategies...');
    
    const strategies = [
      {
        name: 'No Parameters',
        params: ''
      },
      {
        name: 'Universal Parameters Only', 
        params: `?program-id=${env.getDefaultProgramId()}&program-institution-id=${env.getProgramInstitutionId()}`
      },
      {
        name: 'With Active Filter',
        params: `?program-id=${env.getDefaultProgramId()}&program-institution-id=${env.getProgramInstitutionId()}&active-only=true`
      },
      {
        name: 'With Limit',
        params: `?program-id=${env.getDefaultProgramId()}&program-institution-id=${env.getProgramInstitutionId()}&limit=10`
      }
    ];

    let successFound = false;
    
    for (const strategy of strategies) {
      console.log(`\n   📋 Trying: ${strategy.name}`);
      const requestStart = Date.now();
      
      const url = `${baseUrl}${endpointPath}${strategy.params}`;
      const curlCmd = `curl -s -w "HTTPSTATUS:%{http_code};TIMING:%{time_total}" ` +
        `-H "Authorization: Bearer ${accessToken}" ` +
        `-H "Accept: application/json" ` +
        `--connect-timeout 5 --max-time 15 ` +
        `"${url}"`;
      
      try {
        const output = execSync(curlCmd, { encoding: 'utf8' });
        const requestTime = Date.now() - requestStart;
        
        // Parse CURL output
        const statusMatch = output.match(/HTTPSTATUS:(\d+)/);
        const timingMatch = output.match(/TIMING:([\d.]+)/);
        
        const httpStatus = statusMatch ? parseInt(statusMatch[1]) : 0;
        const curlTiming = timingMatch ? parseFloat(timingMatch[1]) * 1000 : requestTime;
        
        const responseData = output.replace(/HTTPSTATUS:\d+;TIMING:[\d.]+$/, '').trim();
        
        console.log(`      ⚡ CURL Response: HTTP ${httpStatus} (${Math.round(curlTiming)}ms)`);
        
        if (httpStatus === 200) {
          successFound = true;
          console.log(`      ✅ SUCCESS! Strategy "${strategy.name}" works`);
          
          // Parse and analyze response
          try {
            const data = JSON.parse(responseData);
            const dataSize = Array.isArray(data) ? data.length : Object.keys(data).length;
            console.log(`      📊 Data: ${dataSize} items/properties`);
            
            if (Array.isArray(data) && data.length > 0) {
              console.log(`      🔍 Sample item keys: ${Object.keys(data[0] || {}).slice(0, 5).join(', ')}`);
            }
            
            // Business interpretation based on endpoint and data
            const businessContext = getBusinessContext(endpointPath, data, strategy.name);
            console.log(`      💡 AI Interpretation: ${businessContext}`);
            
          } catch (parseError) {
            console.log(`      ⚠️ Response not JSON: ${responseData.slice(0, 100)}...`);
          }
          
          break; // Found working strategy
          
        } else if (httpStatus === 422) {
          console.log(`      ⚠️ HTTP 422 - Need different parameters (business validation)`);
        } else if (httpStatus === 404) {
          console.log(`      ❌ HTTP 404 - Endpoint not found`);
        } else if (httpStatus >= 500) {
          console.log(`      ❌ HTTP ${httpStatus} - Server error`);
        } else {
          console.log(`      ❓ HTTP ${httpStatus} - Unexpected response`);
        }
        
      } catch (curlError) {
        console.log(`      ❌ CURL failed: ${curlError.message.slice(0, 100)}`);
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    if (successFound) {
      console.log('🎉 EXPLORATION SUCCESSFUL');
      console.log('✅ Found working parameter combination');
      console.log('⚡ CURL exploration is significantly faster than Node.js HTTP requests');
    } else {
      console.log('🔍 EXPLORATION COMPLETE');
      console.log('⚠️ No working parameter combination found');
      console.log('💡 Consider checking endpoint documentation or trying different parameters');
    }
    
  } catch (tokenError) {
    console.error('❌ Token acquisition failed:', tokenError.message);
    console.log('\n💡 Check your CLIENT_ID and CLIENT_SECRET in environment');
  }
}

function getBusinessContext(endpoint, data, strategy) {
  const contexts = {
    '/event/query': 'Educational test events and assessments',
    '/user/query': 'System users and permissions', 
    '/examinee/query': 'Students/test-takers in the system',
    '/result/query': 'Test results and scores',
    '/registration/query': 'Student test registrations',
    '/test/query': 'Available tests and assessments',
    '/institution/query': 'Educational institutions',
    '/program/query': 'Educational programs',
    '/timezone/query': 'System timezone information',
    '/message-history/query': 'System messaging logs'
  };
  
  const baseContext = contexts[endpoint.toLowerCase()] || 'API data';
  const dataSize = Array.isArray(data) ? data.length : Object.keys(data).length;
  
  if (strategy === 'Universal Parameters Only') {
    return `Found ${dataSize} ${baseContext} for program/institution`;
  } else if (strategy === 'With Active Filter') {
    return `Found ${dataSize} active ${baseContext}`;
  } else if (strategy === 'With Limit') {
    return `Retrieved limited set of ${dataSize} ${baseContext}`;
  } else {
    return `Retrieved ${dataSize} ${baseContext}`;
  }
}

// Run exploration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  curlExplore(endpoint, userIntent);
}

export { curlExplore };
