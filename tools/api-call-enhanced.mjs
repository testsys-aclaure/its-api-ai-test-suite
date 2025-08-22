#!/usr/bin/env node

/**
 * Interactive API Explorer with Semantic Intelligence
 * Uses your existing semantic discovery and intelligent routing
 * Usage: node tools/api-call-enhanced.mjs <natural-query-or-endpoint> [params]
 */

import 'dotenv/config';
import { EnhancedDirectAPITools } from '../dist/api/EnhancedDirectAPITools.js';
import fs from 'fs';

// Load your semantic intelligence
let endpointIntelligence;
let paramRequirements;

try {
  endpointIntelligence = JSON.parse(fs.readFileSync('test/results/endpoint-intelligence.json', 'utf-8'));
  paramRequirements = JSON.parse(fs.readFileSync('test/results/parameter-requirements-intelligence.json', 'utf-8'));
} catch (error) {
  console.warn('⚠️ Could not load intelligence files:', error.message);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('🧠 Semantic API Explorer - Natural Language or Direct Endpoint Access');
  console.log('Usage: node tools/api-call-enhanced.mjs <natural-query-or-endpoint> [param=value]...');
  console.log('\n📝 Natural Language Examples:');
  console.log('  node tools/api-call-enhanced.mjs "student data"');
  console.log('  node tools/api-call-enhanced.mjs "active tests"');
  console.log('  node tools/api-call-enhanced.mjs "test results"');
  console.log('  node tools/api-call-enhanced.mjs "event classes"');
  console.log('\n🔧 Direct Endpoint Examples:');
  console.log('  node tools/api-call-enhanced.mjs /event/query active-only=true limit=5');
  console.log('  node tools/api-call-enhanced.mjs /examinee/query limit=10');
  console.log('  node tools/api-call-enhanced.mjs "/event/authorization/query" event-id=12345');
  process.exit(1);
}

// Semantic endpoint discovery function
function searchEndpointsBySemantics(query) {
  if (!endpointIntelligence) {
    console.log('⚠️ Semantic intelligence not available, using direct endpoint');
    return [];
  }
  
  const normalizedQuery = query.toLowerCase();
  
  // Educational domain mappings (from your IntelligenceIntegrator)
  const semanticMappings = {
    'student': ['examinee', 'test taker', 'participant'],
    'students': ['examinees', 'test takers', 'participants'],
    'test': ['exam', 'assessment', 'evaluation', 'event'],
    'tests': ['exams', 'assessments', 'evaluations', 'events'],
    'session': ['event', 'test session', 'class'],
    'score': ['result', 'outcome'],
    'scores': ['results', 'outcomes'],
    'institution': ['school', 'organization'],
    'administration': ['management', 'admin']
  };
  
  // Expand query terms
  const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 2);
  const expandedTerms = [...queryTerms];
  
  queryTerms.forEach(term => {
    if (semanticMappings[term]) {
      expandedTerms.push(...semanticMappings[term]);
    }
  });
  
  // Search endpoints
  return endpointIntelligence.endpoints.filter(endpoint => {
    return expandedTerms.some(term => 
      endpoint.name.toLowerCase().includes(term) ||
      endpoint.businessDomain.toLowerCase().includes(term) ||
      endpoint.description.toLowerCase().includes(term) ||
      endpoint.url.pathString.toLowerCase().includes(term)
    );
  }).sort((a, b) => {
    // Sort by relevance - exact matches first
    const aExact = a.name.toLowerCase().includes(normalizedQuery) ? 2 : 0;
    const bExact = b.name.toLowerCase().includes(normalizedQuery) ? 2 : 0;
    
    const aPartial = expandedTerms.filter(term => 
      a.name.toLowerCase().includes(term) ||
      a.businessDomain.toLowerCase().includes(term)
    ).length;
    
    const bPartial = expandedTerms.filter(term => 
      b.name.toLowerCase().includes(term) ||
      b.businessDomain.toLowerCase().includes(term)
    ).length;
    
    return (bExact + bPartial) - (aExact + aPartial);
  });
}

const firstArg = args[0];
let endpoint;
let isSemanticQuery = false;

// Determine if this is a natural language query or direct endpoint
if (!firstArg.startsWith('/')) {
  // This is a natural language query
  isSemanticQuery = true;
  console.log(`🧠 Semantic Query: "${firstArg}"`);
  console.log('🔍 Searching for matching endpoints...\n');
  
  const matches = searchEndpointsBySemantics(firstArg);
  
  if (matches.length === 0) {
    console.log('❌ No endpoints found for that query. Try:');
    console.log('   • "student data" → examinee endpoints');
    console.log('   • "test results" → result endpoints');
    console.log('   • "active tests" → event endpoints');
    console.log('   • "event classes" → event-class endpoints');
    process.exit(1);
  }
  
  console.log(`✅ Found ${matches.length} matching endpoints:`);
  matches.slice(0, 5).forEach((match, index) => {
    console.log(`   ${index + 1}. ${match.name} (${match.businessDomain})`);
    console.log(`      Path: ${match.url.pathString}`);
    console.log(`      Description: ${match.description.substring(0, 80)}...`);
  });
  
  // Use the best match
  endpoint = matches[0].url.pathString;
  console.log(`\n🎯 Using best match: ${endpoint}\n`);
  
} else {
  // Direct endpoint access
  endpoint = firstArg;
}

const params = {};

// Parse parameters (skip first arg if it was semantic query)
const paramStart = isSemanticQuery ? 1 : 1;
for (let i = paramStart; i < args.length; i++) {
  const [key, value] = args[i].split('=');
  if (key && value) {
    // Handle boolean values
    if (value.toLowerCase() === 'true') {
      params[key] = true;
    } else if (value.toLowerCase() === 'false') {
      params[key] = false;
    } else if (!isNaN(value) && !isNaN(parseFloat(value))) {
      params[key] = parseInt(value);
    } else {
      params[key] = value;
    }
  }
}

async function makeSemanticAPICall() {
  try {
    if (isSemanticQuery) {
      console.log(`🧠 Semantic Discovery: ${firstArg} → ${endpoint}`);
    } else {
      console.log(`🔍 Direct API Call: ${endpoint}`);
    }
    console.log(`📋 Params: ${Object.keys(params).length > 0 ? Object.entries(params).map(([k,v]) => `${k}=${v}`).join(', ') : 'Using universal parameters only'}`);
    console.log('─'.repeat(50));
    
    // Initialize the enhanced API tools
    await EnhancedDirectAPITools.initialize();
    console.log('✅ Enhanced API tools initialized');
    
    // Determine method based on endpoint
    const method = endpoint.includes('/query') || endpoint.includes('/Query') ? 'GET' : 'POST';
    
    // Use the enhanced API system with intelligence
    const response = await EnhancedDirectAPITools.makeRequest(endpoint, method, params);
    
    console.log('\n📊 RESPONSE:');
    console.log('Status:', response.metadata?.httpStatus || 'unknown');
    console.log('Success:', response.success);
    
    if (response.success) {
      console.log('\n✅ SUCCESS!');
      const data = response.data;
      
      if (Array.isArray(data)) {
        console.log(`📝 Found ${data.length} records`);
        if (data.length > 0) {
          console.log('\nSample record:');
          console.log(JSON.stringify(data[0], null, 2));
          if (data.length > 1) {
            console.log(`\n... and ${data.length - 1} more records`);
          }
        }
      } else if (typeof data === 'object' && data !== null) {
        console.log('\n📝 Response data:');
        console.log(JSON.stringify(data, null, 2));
      } else {
        console.log('📝 Response:', data);
      }
    } else {
      console.log('\n❌ API Error:');
      console.log('Error:', response.error);
      
      if (response.metadata?.aiInterpretation) {
        console.log('\n🤖 AI Interpretation:', response.metadata.aiInterpretation);
      }
      
      if (response.metadata?.businessContext) {
        console.log('📈 Business Context:', response.metadata.businessContext);
      }
      
      if (response.metadata?.suggestedFixes) {
        console.log('\n💡 Suggestions:');
        response.metadata.suggestedFixes.forEach((fix, i) => {
          console.log(`  ${i + 1}. ${fix}`);
        });
      }
    }
    
    // Show timing if available
    if (response.metadata?.timing) {
      console.log(`\n⏱️ Request timing: ${response.metadata.timing}ms`);
    }
    
  } catch (error) {
    console.error('\n❌ Call failed:', error.message);
    if (error.response) {
      console.log('\n📝 Raw Error Response:');
      console.log(JSON.stringify(error.response, null, 2));
    }
    
    // Provide helpful suggestions
    console.log('\n💡 Try:');
    console.log('  - Check if the endpoint path is correct');
    console.log('  - Verify your .env configuration');
    console.log('  - Run: npm run build (to ensure TypeScript is compiled)');
    console.log('  - Check: npm test (to see which endpoints are working)');
  }
}

// Execute the call
makeSemanticAPICall();
