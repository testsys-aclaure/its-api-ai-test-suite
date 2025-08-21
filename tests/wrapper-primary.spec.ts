import { test, expect } from '@playwright/test';
import { ApiWrapper } from '../src/api/ApiWrapper';

test('AI-Enabled API Wrapper - Complete Integration Test', async () => {
  console.log('🚀 Starting AI-Enabled API Wrapper Test');
  
  // Initialize the wrapper
  const api = new ApiWrapper();
  await api.initialize('./environments/238-stg.json');

  // ==========================================
  // PHASE 1: SYSTEM VALIDATION
  // ==========================================
  
  console.log('\n📋 Phase 1: System Validation');
  
  const status = api.getSystemStatus();
  console.log('   System Status:', {
    initialized: status.initialized,
    operationsAvailable: status.operationsAvailable,
    categories: status.categories,
    environment: {
      baseUrl: status.environment.baseUrl,
      programId: status.environment.programId,
      programInstitutionId: status.environment.programInstitutionId
    }
  });

  expect(status.initialized).toBe(true);
  expect(status.operationsAvailable).toBeGreaterThan(0);

  // Test authentication
  const connectionTest = await api.testConnection();
  console.log('   Connection Test:', connectionTest);
  expect(connectionTest.authenticated).toBe(true);
  expect(connectionTest.environmentLoaded).toBe(true);

  // ==========================================
  // PHASE 2: NATURAL LANGUAGE DISCOVERY
  // ==========================================
  
  console.log('\n🔍 Phase 2: Natural Language Operation Discovery');
  
  const schoolOperations = api.searchOperations('find schools');
  const programOperations = api.searchOperations('programs available');
  
  console.log('   "find schools" results:', schoolOperations.map(op => ({
    name: op.operation.semanticName,
    relevance: op.relevanceScore,
    description: op.operation.naturalLanguageDescription
  })));
  
  console.log('   "programs available" results:', programOperations.map(op => ({
    name: op.operation.semanticName,
    relevance: op.relevanceScore
  })));

  expect(schoolOperations.length).toBeGreaterThan(0);
  expect(programOperations.length).toBeGreaterThan(0);

  // Browse operations by category
  const operations = api.getAvailableOperations();
  console.log('   Available Operations by Category:');
  for (const [category, ops] of Object.entries(operations)) {
    console.log(`     ${category}:`, ops.map(op => op.semanticName));
  }

  // ==========================================
  // PHASE 3: SEMANTIC API OPERATIONS (TRUE 200s)
  // ==========================================
  
  console.log('\n🎯 Phase 3: Semantic API Operations - Targeting TRUE 200 RESPONSES');

  // PRIMARY TEST: Find institutions by channel
  console.log('   Testing: findInstitutionsByChannel({ channel: "online" })');
  const onlineInstitutions = await api.findInstitutionsByChannel({ 
    channel: 'online' 
  });
  
  console.log('   🎯 ONLINE INSTITUTIONS RESULT:', {
    success: onlineInstitutions.success,
    statusCode: onlineInstitutions.statusCode,
    injectedParams: onlineInstitutions.injectedParameters,
    dataReceived: !!onlineInstitutions.data,
    dataType: Array.isArray(onlineInstitutions.data) ? `Array[${onlineInstitutions.data.length}]` : typeof onlineInstitutions.data,
    executionTime: `${onlineInstitutions.executionTimeMs}ms`,
    endpoint: onlineInstitutions.endpoint,
    warnings: onlineInstitutions.warnings,
    error: onlineInstitutions.error
  });

  expect(onlineInstitutions.success).toBe(true);
  expect(onlineInstitutions.statusCode).toBe(200);
  expect(onlineInstitutions.data).toBeTruthy();
  expect(onlineInstitutions.injectedParameters).toContain('program-id');

  // SECONDARY TEST: Test parameter flexibility with different channels
  console.log('\n   Testing different channels for parameter validation...');
  const campusInstitutions = await api.findInstitutionsByChannel({ 
    channel: 'campus' 
  });
  
  console.log('   Campus institutions result:', {
    success: campusInstitutions.success,
    statusCode: campusInstitutions.statusCode,
    dataCount: Array.isArray(campusInstitutions.data) ? campusInstitutions.data.length : 0
  });
  
  // Note: Different channels may return different results - this tests flexibility
  
  console.log('   🎯 CAMPUS INSTITUTIONS RESULT:', {
    success: campusInstitutions.success,
    statusCode: campusInstitutions.statusCode,
    injectedParams: campusInstitutions.injectedParameters
  });

  expect(campusInstitutions.success).toBe(true);
  expect(campusInstitutions.statusCode).toBe(200);

  // ==========================================
  // PHASE 4: AI ASSISTANT INTERACTION PATTERNS
  // ==========================================
  
  console.log('\n🤖 Phase 4: AI Assistant Interaction Patterns');

  // Test operation information retrieval
  const operationInfo = api.getOperationInfo('channel-institution-query');
  console.log('   Operation Info Example:', {
    semanticName: operationInfo?.semanticName,
    naturalDescription: operationInfo?.naturalLanguageDescription,
    parameters: operationInfo?.parameters,
    examples: operationInfo?.examples.length,
    hints: operationInfo?.aiHints
  });

  expect(operationInfo?.semanticName).toBe('findInstitutionsByChannel');

  // Direct operation execution
  const directResult = await api.executeOperation('channel-institution-query', {
    channel: 'online'
  });
  
  console.log('   🎯 DIRECT EXECUTION RESULT:', {
    success: directResult.success,
    statusCode: directResult.statusCode,
    operationId: directResult.operationId,
    endpoint: directResult.endpoint
  });

  expect(directResult.success).toBe(true);
  expect(directResult.statusCode).toBe(200);

  // ==========================================
  // FINAL SUMMARY
  // ==========================================
  
  console.log('\n✅ FINAL TEST SUMMARY:');
  console.log('   ✅ System initialized successfully');
  console.log('   ✅ Authentication working');  
  console.log('   ✅ Natural language operation discovery functional');
  console.log('   ✅ Semantic API methods returning TRUE 200 responses');
  console.log('   ✅ Parameter injection working automatically');
  console.log('   ✅ AI assistant interaction patterns validated');
  console.log('   ✅ Wrapper architecture ready for future AI assistants');
  
  console.log('\n🎯 CRITICAL SUCCESS METRICS:');
  console.log(`   📊 Operations Available: ${status.operationsAvailable}`);
  console.log(`   📊 Categories: ${status.categories.length}`);
  console.log(`   📊 200 Responses Achieved: ${[onlineInstitutions, campusInstitutions].filter(r => r.statusCode === 200).length}/2`);
  console.log(`   📊 Parameter Auto-Injection Working: ${onlineInstitutions.injectedParameters.length > 0 ? 'YES' : 'NO'}`);
});
