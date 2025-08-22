/**
 * Analyze All GET Endpoints from OpenAPI Documentation
 * Extract every GET endpoint with its required and optional parameters
 */

import fs from 'fs';

function analyzeGetEndpoints() {
  console.log('📖 ANALYZING ALL GET ENDPOINTS FROM OPENAPI DOCUMENTATION\n');
  
  try {
    // Load OpenAPI spec
    const openApiData = JSON.parse(fs.readFileSync('./OpenAPI.json', 'utf8'));
    const paths = openApiData.paths;
    
    const getEndpoints = [];
    
    // Extract all GET endpoints
    for (const [path, methods] of Object.entries(paths)) {
      if (methods.get) {
        const endpoint = methods.get;
        
        // Extract parameters
        const requiredParams = [];
        const optionalParams = [];
        
        if (endpoint.parameters) {
          endpoint.parameters.forEach(param => {
            const paramInfo = {
              name: param.name,
              type: param.schema?.type || 'unknown',
              description: param.description || 'No description',
              default: param.schema?.default,
              enum: param.schema?.enum,
              minimum: param.schema?.minimum,
              maximum: param.schema?.maximum
            };
            
            if (param.required) {
              requiredParams.push(paramInfo);
            } else {
              optionalParams.push(paramInfo);
            }
          });
        }
        
        getEndpoints.push({
          path,
          summary: endpoint.summary || path,
          description: endpoint.description || 'No description',
          operationId: endpoint.operationId,
          tags: endpoint.tags || [],
          requiredParams,
          optionalParams,
          totalParams: requiredParams.length + optionalParams.length
        });
      }
    }
    
    // Sort by number of required parameters (easiest first)
    getEndpoints.sort((a, b) => a.requiredParams.length - b.requiredParams.length);
    
    console.log(`📊 FOUND ${getEndpoints.length} GET ENDPOINTS\n`);
    
    // Group by required parameter count
    const byRequiredCount = {};
    getEndpoints.forEach(endpoint => {
      const count = endpoint.requiredParams.length;
      if (!byRequiredCount[count]) byRequiredCount[count] = [];
      byRequiredCount[count].push(endpoint);
    });
    
    // Show summary by complexity
    console.log('📋 ENDPOINTS BY COMPLEXITY (Required Parameters):');
    console.log('='.repeat(60));
    
    Object.keys(byRequiredCount).sort((a, b) => parseInt(a) - parseInt(b)).forEach(count => {
      const endpoints = byRequiredCount[count];
      console.log(`\n🔸 ${count} Required Parameter(s) - ${endpoints.length} endpoints:`);
      
      endpoints.forEach(endpoint => {
        console.log(`   ${endpoint.path}`);
        console.log(`     Summary: ${endpoint.summary}`);
        
        if (endpoint.requiredParams.length > 0) {
          console.log(`     Required: ${endpoint.requiredParams.map(p => `${p.name}(${p.type})`).join(', ')}`);
        }
        
        if (endpoint.optionalParams.length > 0) {
          console.log(`     Optional: ${endpoint.optionalParams.map(p => `${p.name}(${p.type})`).join(', ')}`);
        }
        
        console.log('');
      });
    });
    
    // Focus on the simplest endpoints (0-1 required params)
    console.log('\n🎯 EASIEST ENDPOINTS TO IMPLEMENT (0-1 Required Params):');
    console.log('='.repeat(60));
    
    const easyEndpoints = getEndpoints.filter(e => e.requiredParams.length <= 1);
    easyEndpoints.forEach((endpoint, i) => {
      console.log(`${i+1}. ${endpoint.path}`);
      console.log(`   ${endpoint.description}`);
      
      if (endpoint.requiredParams.length > 0) {
        console.log(`   REQUIRED: ${endpoint.requiredParams.map(p => 
          `${p.name} (${p.type}) - ${p.description}`
        ).join('; ')}`);
      } else {
        console.log(`   REQUIRED: None`);
      }
      
      console.log('');
    });
    
    // Show which endpoints need program-id
    console.log('\n🔍 ENDPOINTS REQUIRING PROGRAM-ID:');
    console.log('='.repeat(60));
    
    const programIdEndpoints = getEndpoints.filter(e => 
      e.requiredParams.some(p => p.name === 'program-id') ||
      e.optionalParams.some(p => p.name === 'program-id')
    );
    
    programIdEndpoints.forEach(endpoint => {
      const programParam = [...endpoint.requiredParams, ...endpoint.optionalParams]
        .find(p => p.name === 'program-id');
      const isRequired = endpoint.requiredParams.some(p => p.name === 'program-id');
      
      console.log(`${endpoint.path} - program-id is ${isRequired ? 'REQUIRED' : 'optional'}`);
    });
    
    return getEndpoints;
    
  } catch (error) {
    console.error('❌ Failed to analyze endpoints:', error);
    return [];
  }
}

const endpoints = analyzeGetEndpoints();
console.log(`\n🏁 Analysis complete: ${endpoints.length} GET endpoints documented`);
