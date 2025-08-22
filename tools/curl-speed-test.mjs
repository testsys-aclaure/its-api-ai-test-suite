#!/usr/bin/env node

/**
 * Simple CURL Speed Test vs Node.js
 * Shows the speed difference you were talking about
 */

import 'dotenv/config';
import { execSync } from 'child_process';

const endpoint = process.argv[2] || '/user/query';

console.log('⚡ CURL vs Node.js Speed Test');
console.log('════════════════════════════\n');

const baseUrl = process.env.BASE_URL || 'https://api-staging.testsys.io';
const identityUrl = process.env.IDENTITY_URL || 'https://identity-staging.testsys.io';
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.log('❌ Missing CLIENT_ID or CLIENT_SECRET in environment');
  process.exit(1);
}

console.log(`🎯 Testing: ${endpoint}`);
console.log(`🌐 Base URL: ${baseUrl}\n`);

// Test 1: CURL Token + API Call
console.log('⚡ CURL Speed Test:');
console.log('─'.repeat(20));

const curlStart = Date.now();

try {
  // Get token with CURL
  console.log('🔐 Getting token with CURL...');
  const tokenCmd = `curl -s -X POST "${identityUrl}/connect/token" ` +
    `-H "Content-Type: application/x-www-form-urlencoded" ` +
    `-d "grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=its-next-gen-api" ` +
    `--connect-timeout 5 --max-time 15`;

  const tokenResponse = execSync(tokenCmd, { encoding: 'utf8' });
  const tokenData = JSON.parse(tokenResponse);
  
  if (!tokenData.access_token) {
    throw new Error('No access token received');
  }
  
  const tokenTime = Date.now() - curlStart;
  console.log(`✅ Token: ${tokenTime}ms`);
  
  // API call with CURL
  console.log('🌐 API call with CURL...');
  const apiStart = Date.now();
  
  const url = `${baseUrl}${endpoint}?program-id=238&program-institution-id=1009048`;
  const apiCmd = `curl -s -w "HTTPSTATUS:%{http_code}" ` +
    `-H "Authorization: Bearer ${tokenData.access_token}" ` +
    `-H "Accept: application/json" ` +
    `--connect-timeout 5 --max-time 10 ` +
    `"${url}"`;
  
  const apiResponse = execSync(apiCmd, { encoding: 'utf8' });
  const apiTime = Date.now() - apiStart;
  
  const statusMatch = apiResponse.match(/HTTPSTATUS:(\d+)/);
  const httpStatus = statusMatch ? parseInt(statusMatch[1]) : 0;
  const responseData = apiResponse.replace(/HTTPSTATUS:\d+$/, '').trim();
  
  console.log(`✅ API call: ${apiTime}ms (HTTP ${httpStatus})`);
  
  const totalCurlTime = Date.now() - curlStart;
  console.log(`🏆 Total CURL time: ${totalCurlTime}ms`);
  
  if (httpStatus === 200) {
    try {
      const data = JSON.parse(responseData);
      const count = Array.isArray(data) ? data.length : Object.keys(data).length;
      console.log(`📊 Data: ${count} items`);
    } catch (e) {
      console.log(`📊 Response: ${responseData.length} bytes`);
    }
  }

} catch (error) {
  console.error('❌ CURL failed:', error.message);
}

console.log('\n💡 CURL Benefits:');
console.log('   ✅ Native OS networking stack');
console.log('   ✅ Lower overhead than Node.js HTTP'); 
console.log('   ✅ Built-in timeout handling');
console.log('   ✅ Direct shell execution');
console.log('   ✅ Perfect for rapid API exploration');
