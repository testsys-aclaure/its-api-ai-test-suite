#!/usr/bin/env node

/**
 * Interactive API Explorer
 * For making one-off API calls during conversations
 * Usage: node tools/api-call.mjs <endpoint> [params]
 */

import 'dotenv/config';
import { execSync } from 'child_process';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node tools/api-call.mjs <endpoint> [param=value] [param=value]...');
  console.log('Examples:');
  console.log('  node tools/api-call.mjs /user/query');
  console.log('  node tools/api-call.mjs /event/query active-only=true limit=5');
  console.log('  node tools/api-call.mjs /examinee/query program-id=238');
  process.exit(1);
}

const endpoint = args[0];
const params = {};

// Parse parameters
for (let i = 1; i < args.length; i++) {
  const [key, value] = args[i].split('=');
  if (key && value) {
    params[key] = value;
  }
}

// Environment setup
const baseUrl = process.env.BASE_URL || 'https://api-staging.testsys.io';
const identityUrl = process.env.IDENTITY_URL || 'https://identity-staging.testsys.io';
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const defaultProgramId = process.env.DEFAULT_PROGRAM_ID || '238';
const institutionId = process.env.PROGRAM_INSTITUTION_ID || '1009048';

if (!clientId || !clientSecret) {
  console.log('❌ Missing CLIENT_ID or CLIENT_SECRET in environment');
  process.exit(1);
}

// Add universal parameters if not specified
if (!params['program-id']) {
  params['program-id'] = defaultProgramId;
}
if (!params['program-institution-id']) {
  params['program-institution-id'] = institutionId;
}

console.log(`🔍 API Call: ${endpoint}`);
console.log(`📋 Params: ${Object.entries(params).map(([k,v]) => `${k}=${v}`).join(', ')}`);
console.log('─'.repeat(50));

// Get access token
console.log('🔐 Getting token...');
const tokenStart = Date.now();

const scope = process.env.SCOPE || 'its-next-gen-api';
const tokenCmd = `curl.exe -s -X POST "${identityUrl}/connect/token" ` +
  `-H "Content-Type: application/x-www-form-urlencoded" ` +
  `-d "grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=${scope}" ` +
  `--connect-timeout 5 --max-time 10`;

try {
  const tokenResponse = execSync(tokenCmd, { encoding: 'utf8' });
  const tokenData = JSON.parse(tokenResponse);
  const tokenTime = Date.now() - tokenStart;
  
  if (!tokenData.access_token) {
    throw new Error('No access token received');
  }
  
  console.log(`✅ Token acquired (${tokenTime}ms)`);
  
  // Build query string
  const queryString = Object.entries(params).map(([k,v]) => `${k}=${v}`).join('&');
  const url = `${baseUrl}${endpoint}${queryString ? '?' + queryString : ''}`;
  
  // Make API call
  console.log('🌐 Making API call...');
  const apiStart = Date.now();
  
  const apiCmd = `curl.exe -s -w "HTTPSTATUS:%{http_code};TIMING:%{time_total}" ` +
    `-H "Authorization: Bearer ${tokenData.access_token}" ` +
    `-H "Accept: application/json" ` +
    `--connect-timeout 5 --max-time 15 ` +
    `"${url}"`;
  
  const apiResponse = execSync(apiCmd, { encoding: 'utf8' });
  const apiTime = Date.now() - apiStart;
  
  // Parse response
  const statusMatch = apiResponse.match(/HTTPSTATUS:(\d+)/);
  const timingMatch = apiResponse.match(/TIMING:([\d.]+)/);
  
  const httpStatus = statusMatch ? parseInt(statusMatch[1]) : 0;
  const curlTiming = timingMatch ? Math.round(parseFloat(timingMatch[1]) * 1000) : apiTime;
  
  const responseData = apiResponse.replace(/HTTPSTATUS:\d+;TIMING:[\d.]+$/, '').trim();
  
  console.log(`📊 Response: HTTP ${httpStatus} (${curlTiming}ms)`);
  console.log('─'.repeat(50));
  
  if (httpStatus === 200) {
    try {
      const data = JSON.parse(responseData);
      
      if (Array.isArray(data)) {
        console.log(`✅ SUCCESS: ${data.length} items returned`);
        if (data.length > 0) {
          console.log(`🔍 Sample item keys: ${Object.keys(data[0]).slice(0, 8).join(', ')}`);
          if (data.length <= 3) {
            console.log(`📋 Full data:\n${JSON.stringify(data, null, 2)}`);
          } else {
            console.log(`📋 First item:\n${JSON.stringify(data[0], null, 2)}`);
          }
        }
      } else {
        console.log(`✅ SUCCESS: Object returned`);
        console.log(`🔍 Keys: ${Object.keys(data).slice(0, 10).join(', ')}`);
        console.log(`📋 Data:\n${JSON.stringify(data, null, 2)}`);
      }
      
    } catch (parseError) {
      console.log(`✅ SUCCESS: ${responseData.length} bytes`);
      console.log(`📋 Raw response: ${responseData.slice(0, 200)}...`);
    }
    
  } else if (httpStatus === 422) {
    console.log(`⚠️ VALIDATION ERROR (HTTP 422)`);
    console.log(`💡 This might be expected business logic (like "no authorization records")`);
    try {
      const errorData = JSON.parse(responseData);
      console.log(`📋 Error details:\n${JSON.stringify(errorData, null, 2)}`);
    } catch {
      console.log(`📋 Raw error: ${responseData}`);
    }
    
  } else {
    console.log(`❌ ERROR: HTTP ${httpStatus}`);
    console.log(`📋 Response: ${responseData.slice(0, 300)}`);
  }
  
} catch (error) {
  console.error('❌ Call failed:', error.message);
}
