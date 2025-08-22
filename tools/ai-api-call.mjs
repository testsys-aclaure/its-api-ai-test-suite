#!/usr/bin/env node

/**
 * AI Assistant API Tool - Deterministic Semantic API Calling
 * This tool is designed for AI assistants to make intelligent API calls
 * Usage: node tools/ai-api-call.mjs <natural-query-or-endpoint> [params...]
 * 
 * AI Assistant Instructions:
 * - Use this tool for any API-related requests
 * - Pass natural language queries for semantic discovery
 * - Pass direct endpoints for specific calls
 * - Tool handles all intelligence, authentication, and interpretation
 */

import 'dotenv/config';
import { EnhancedDirectAPITools } from '../dist/api/EnhancedDirectAPITools.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load semantic intelligence for discovery
let endpointIntelligence;
let paramRequirements;

try {
  const basePath = resolve(__dirname, '..');
  endpointIntelligence = JSON.parse(fs.readFileSync(resolve(basePath, 'test/results/endpoint-intelligence.json'), 'utf-8'));
  paramRequirements = JSON.parse(fs.readFileSync(resolve(basePath, 'test/results/parameter-requirements-intelligence.json'), 'utf-8'));
} catch (error) {
  console.log('⚠️ Intelligence files not found - using direct endpoint calling only');
}

/**
 * Semantic endpoint discovery - Educational domain aware
 */
function discoverEndpoints(query) {
  if (!endpointIntelligence) {
    return { endpoints: [], query, semanticMapping: null };
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Educational domain semantic mappings
  const semanticMappings = {
    'student': ['examinee', 'test taker', 'participant'],
    'students': ['examinees', 'test takers', 'participants'], 
    'test': ['exam', 'assessment', 'evaluation', 'event'],
    'tests': ['exams', 'assessments', 'evaluations', 'events'],
    'session': ['event', 'test session', 'class', 'event-class'],
    'sessions': ['events', 'test sessions', 'classes', 'event-classes'],
    'score': ['result', 'outcome'],
    'scores': ['results', 'outcomes'],
    'class': ['event-class', 'group', 'session'],
    'classes': ['event-classes', 'groups', 'sessions'],
    'institution': ['school', 'organization'],
    'completed': ['finished', 'done'],
    'active': ['running', 'current', 'live'],
    'available': ['accessible', 'ready']
  };
  
  // Track semantic transformation
  let appliedMappings = [];
  
  // Expand query terms with semantic equivalents
  const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 2);
  const expandedTerms = [...queryTerms];
  
  queryTerms.forEach(term => {
    if (semanticMappings[term]) {
      expandedTerms.push(...semanticMappings[term]);
      appliedMappings.push(`"${term}" → [${semanticMappings[term].join(', ')}]`);
    }
  });
  
  // Search endpoints with relevance scoring
  const matches = endpointIntelligence.endpoints.map(endpoint => {
    let relevanceScore = 0;
    let matchedTerms = [];
    
    expandedTerms.forEach(term => {
      // Check various fields for matches
      const fields = [
        endpoint.name.toLowerCase(),
        endpoint.businessDomain.toLowerCase(),
        endpoint.description.toLowerCase(),
        endpoint.url.pathString.toLowerCase()
      ];
      
      fields.forEach((field, fieldIndex) => {
        if (field.includes(term)) {
          // Weight matches by field importance
          const weights = [3, 2, 1, 2]; // name, domain, description, path
          relevanceScore += weights[fieldIndex];
          matchedTerms.push(term);
        }
      });
    });
    
    // Boost exact query matches
    if (endpoint.name.toLowerCase().includes(normalizedQuery) ||
        endpoint.description.toLowerCase().includes(normalizedQuery)) {
      relevanceScore += 5;
    }
    
    return {
      endpoint,
      relevanceScore,
      matchedTerms: [...new Set(matchedTerms)]
    };
  })
  .filter(match => match.relevanceScore > 0)
  .sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  return {
    endpoints: matches,
    query: normalizedQuery,
    semanticMapping: appliedMappings,
    expandedTerms
  };
}

/**
 * AI Assistant deterministic API calling
 */
async function makeIntelligentAPICall() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('❌ AI Assistant API Tool - Missing query');
    console.log('Usage: node tools/ai-api-call.mjs <query> [param=value...]');
    console.log('Examples:');
    console.log('  node tools/ai-api-call.mjs "student data"');
    console.log('  node tools/ai-api-call.mjs "active tests"');
    console.log('  node tools/ai-api-call.mjs /event/query active-only=true');
    process.exit(1);
  }
  
  const query = args[0];
  const isDirectEndpoint = query.startsWith('/');
  
  let endpoint;
  let method = 'GET';
  let discoveryInfo = null;
  let endpointInfo = null;

  if (isDirectEndpoint) {
    // Direct endpoint access
    endpoint = query;
    // Infer method: GET if ends with /query (case-insensitive), else look up in endpoint intelligence, else POST
    if (/\/query$/i.test(endpoint)) {
      method = 'GET';
    } else if (endpointIntelligence) {
      endpointInfo = endpointIntelligence.endpoints.find(e => e.url && e.url.pathString && e.url.pathString.toLowerCase() === endpoint.toLowerCase());
      if (endpointInfo && endpointInfo.method) {
        method = endpointInfo.method.toUpperCase();
      } else {
        method = 'POST';
      }
    } else {
      method = 'POST';
    }
    console.log(`🎯 Direct API Call: ${endpoint} [${method}]`);
  } else {
    // Semantic discovery
    console.log(`🧠 AI Assistant Query: "${query}"`);
    discoveryInfo = discoverEndpoints(query);
    if (discoveryInfo.endpoints.length === 0) {
      console.log('❌ No matching endpoints found');
      console.log('💡 Try queries like: "student data", "active tests", "test results"');
      process.exit(1);
    }
    // Use best match
    endpoint = discoveryInfo.endpoints[0].endpoint.url.pathString;
    endpointInfo = discoveryInfo.endpoints[0].endpoint;
    // Infer method: GET if ends with /query (case-insensitive), else use method from endpoint intelligence, else POST
    if (/\/query$/i.test(endpoint)) {
      method = 'GET';
    } else if (endpointInfo && endpointInfo.method) {
      method = endpointInfo.method.toUpperCase();
    } else {
      method = 'POST';
    }
    console.log(`🔍 Semantic Discovery Results:`);
    if (discoveryInfo.semanticMapping.length > 0) {
      console.log(`   Mappings: ${discoveryInfo.semanticMapping.join(', ')}`);
    }
    console.log(`   Found ${discoveryInfo.endpoints.length} matching endpoints`);
    console.log(`   Best match: ${endpoint} (relevance: ${discoveryInfo.endpoints[0].relevanceScore})`);
    console.log(`   Business domain: ${discoveryInfo.endpoints[0].endpoint.businessDomain}`);
    // Show alternatives if available
    if (discoveryInfo.endpoints.length > 1) {
      console.log(`   Alternatives:`);
      discoveryInfo.endpoints.slice(1, 4).forEach((match, i) => {
        console.log(`     ${i + 2}. ${match.endpoint.url.pathString} (${match.endpoint.businessDomain})`);
      });
    }
    console.log('');
  }
  
  // Parse additional parameters
  const params = {};
  for (let i = 1; i < args.length; i++) {
    const [key, value] = args[i].split('=');
    if (key && value !== undefined) {
      // Smart parameter conversion
      if (value === 'true') params[key] = true;
      else if (value === 'false') params[key] = false;
      else if (!isNaN(value) && !isNaN(parseFloat(value))) params[key] = parseInt(value);
      else params[key] = value;
    }
  }
  
  console.log(`📋 Parameters: ${Object.keys(params).length > 0 ? 
    Object.entries(params).map(([k,v]) => `${k}=${v}`).join(', ') : 
    'Universal parameters only'}`);
  console.log('─'.repeat(60));
  
  try {
    // Initialize and make intelligent API call
    await EnhancedDirectAPITools.initialize();

    // Use the inferred method
    const result = await EnhancedDirectAPITools.makeRequest(endpoint, method, params);

    // Structured output for AI consumption
    const output = {
      query: query,
      endpoint: endpoint,
      method: method,
      parameters: params,
      discovery: discoveryInfo,
      result: {
        success: result.success,
        status: result.metadata?.httpStatus || result.httpStatus,
        data: result.data,
        aiInterpretation: result.aiInterpretation,
        businessContext: result.businessContext,
        suggestedFixes: result.suggestedFixes
      },
      timestamp: new Date().toISOString()
    };

    // Human-readable summary
    console.log(`\n📊 API CALL RESULT:`);
    console.log(`Status: ${result.metadata?.httpStatus || result.httpStatus} ${result.success ? '✅' : '❌'}`);

    if (result.success) {
      console.log(`Success: ${result.success}`);
      if (result.data) {
        const dataSize = Array.isArray(result.data) ? result.data.length :
                        typeof result.data === 'object' ? Object.keys(result.data).length : 1;
        console.log(`Data: ${dataSize} record${dataSize !== 1 ? 's' : ''} returned`);

        // Show sample data
        if (Array.isArray(result.data) && result.data.length > 0) {
          console.log(`\nSample record:`);
          console.log(JSON.stringify(result.data[0], null, 2));
          if (result.data.length > 1) {
            console.log(`\n... and ${result.data.length - 1} more record${result.data.length > 2 ? 's' : ''}`);
          }
        } else if (result.data && typeof result.data === 'object') {
          console.log(`\nData:`);
          console.log(JSON.stringify(result.data, null, 2));
        }
      }
    } else {
      console.log(`Error: ${result.error || 'Unknown error'}`);
    }

    if (result.aiInterpretation) {
      console.log(`\n🤖 AI Interpretation: ${result.aiInterpretation}`);
    }

    if (result.businessContext) {
      console.log(`📈 Business Context: ${result.businessContext}`);
    }

    if (result.suggestedFixes && result.suggestedFixes.length > 0) {
      console.log(`\n💡 Suggestions:`);
      result.suggestedFixes.forEach((fix, i) => {
        console.log(`   ${i + 1}. ${fix}`);
      });
    }

    // Machine-readable JSON output for AI parsing
    console.log(`\n🤖 STRUCTURED OUTPUT FOR AI:`);
    console.log(JSON.stringify(output, null, 2));

  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Execute the intelligent API call
makeIntelligentAPICall();
