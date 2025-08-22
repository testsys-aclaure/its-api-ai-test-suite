#!/usr/bin/env node

/**
 * Quick API Test - Direct endpoint testing
 */

import 'dotenv/config';
import { EnhancedDirectAPITools } from './dist/api/EnhancedDirectAPITools.js';

async function quickTest() {
  console.log('🔍 Quick API Test - /user/query with no parameters');
  
  try {
    // Initialize the API tools
    await EnhancedDirectAPITools.initialize();
    console.log('✅ API tools initialized');
    
    // Test /user/query with ONLY universal parameters
    console.log('\n🧪 Testing /user/query with ONLY universal parameters (program-id, program-institution-id)...');
    
    // Make request with empty params - the universal parameters should be applied automatically
    const response = await EnhancedDirectAPITools.makeRequest('/user/query', 'GET', {});
    
    console.log('\n📊 RESPONSE:');
    console.log('Status:', response.metadata?.httpStatus || 'unknown');
    console.log('Success:', response.success);
    
    if (response.success) {
      console.log('\n✅ SUCCESS! /user/query works with just universal parameters');
      console.log('📝 Data sample:', JSON.stringify(response.data.slice ? response.data.slice(0, 2) : response.data, null, 2));
    } else {
      console.log('\n❌ Error Details:');
      console.log('📝 Raw Response Data:');
      console.log(JSON.stringify(response.data, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.log('\n📝 Raw Error Response:');
      console.log(JSON.stringify(error.response, null, 2));
    }
  }
}

quickTest();
