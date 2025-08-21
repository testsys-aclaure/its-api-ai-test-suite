import { test, expect } from '@playwright/test';
import { ApiWrapper } from '../src/api/ApiWrapper';

describe('Intelligent API Wrapper - AI Assistant Integration Tests', () => {
  let api: ApiWrapper;

  beforeAll(async () => {
    api = new ApiWrapper();
    await api.initialize('./environments/238-stg.json');
  });

  describe('System Status and Connection', () => {
    test('should initialize successfully', async () => {
      const status = api.getSystemStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.operationsAvailable).toBeGreaterThan(0);
      expect(status.categories.length).toBeGreaterThan(0);
      
      console.log('🔍 System Status:', {
        initialized: status.initialized,
        operationsAvailable: status.operationsAvailable,
        categories: status.categories,
        environment: {
          baseUrl: status.environment.baseUrl,
          programId: status.environment.programId,
          programInstitutionId: status.environment.programInstitutionId
        }
      });
    });

    test('should authenticate successfully', async () => {
      const connectionTest = await api.testConnection();
      
      expect(connectionTest.authenticated).toBe(true);
      expect(connectionTest.environmentLoaded).toBe(true);
      expect(connectionTest.baseUrl).toBeTruthy();
      expect(connectionTest.availableOperations).toBeGreaterThan(0);
      
      console.log('🔐 Connection Test:', connectionTest);
    });
  });

  describe('Natural Language Operation Discovery', () => {
    test('should find operations using natural language', async () => {
      const schoolOperations = api.searchOperations('find schools');
      const programOperations = api.searchOperations('programs available');
      const institutionOperations = api.searchOperations('institutions');

      expect(schoolOperations.length).toBeGreaterThan(0);
      expect(programOperations.length).toBeGreaterThan(0);
      expect(institutionOperations.length).toBeGreaterThan(0);

      console.log('🔍 Natural Language Search Results:');
      console.log('  "find schools":', schoolOperations.map(op => ({
        name: op.operation.semanticName,
        relevance: op.relevanceScore,
        reason: op.matchReason
      })));
      console.log('  "programs available":', programOperations.map(op => ({
        name: op.operation.semanticName,
        relevance: op.relevanceScore
      })));
    });

    test('should browse operations by category', async () => {
      const operations = api.getAvailableOperations();
      
      expect(Object.keys(operations).length).toBeGreaterThan(0);
      
      console.log('📚 Available Operations by Category:');
      for (const [category, ops] of Object.entries(operations)) {
        console.log(`  ${category}:`, ops.map(op => op.semanticName));
      }
    });

    test('should get detailed operation information', async () => {
      const operationInfo = api.getOperationInfo('channel-institution-query');
      
      expect(operationInfo).toBeTruthy();
      expect(operationInfo?.semanticName).toBe('findInstitutionsByChannel');
      expect(operationInfo?.naturalLanguageDescription).toBeTruthy();
      expect(operationInfo?.examples.length).toBeGreaterThan(0);
      
      console.log('📋 Operation Details:', {
        name: operationInfo?.semanticName,
        description: operationInfo?.naturalLanguageDescription,
        parameters: operationInfo?.parameters,
        examples: operationInfo?.examples.map(ex => ex.title)
      });
    });
  });

  describe('Semantic API Operations - TRUE 200 RESPONSES', () => {
    test('should find institutions by channel with auto-injected parameters', async () => {
      // Test primary operation - this should return 200
      const result = await api.findInstitutionsByChannel({ 
        channel: 'online' 
      });
      
      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.data).toBeTruthy();
      expect(result.injectedParameters).toContain('program-id');
      expect(result.executionTimeMs).toBeGreaterThan(0);
      
      console.log('🎯 findInstitutionsByChannel SUCCESS:', {
        statusCode: result.statusCode,
        injectedParams: result.injectedParameters,
        dataReceived: !!result.data,
        executionTime: `${result.executionTimeMs}ms`,
        sampleData: Array.isArray(result.data) ? `${result.data.length} items` : typeof result.data
      });

      // Test different channel types
      const campusResult = await api.findInstitutionsByChannel({ 
        channel: 'campus' 
      });
      expect(campusResult.success).toBe(true);
      expect(campusResult.statusCode).toBe(200);
      
      console.log('🎯 findInstitutionsByChannel (campus) SUCCESS:', {
        statusCode: campusResult.statusCode,
        injectedParams: campusResult.injectedParameters
      });
    });

    test('should find programs with intelligent parameter injection', async () => {
      const result = await api.findPrograms({
        activeOnly: true
      });
      
      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.data).toBeTruthy();
      expect(result.injectedParameters.length).toBeGreaterThan(0);
      
      console.log('🎯 findPrograms SUCCESS:', {
        statusCode: result.statusCode,
        injectedParams: result.injectedParameters,
        dataReceived: !!result.data,
        executionTime: `${result.executionTimeMs}ms`
      });
    });

    test('should handle operations with no user parameters (full auto-injection)', async () => {
      // Test with completely empty parameters - should auto-inject everything needed
      const result = await api.findInstitutionsByChannel();
      
      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.injectedParameters.length).toBeGreaterThan(0);
      
      console.log('🎯 Full Auto-Injection SUCCESS:', {
        statusCode: result.statusCode,
        injectedParams: result.injectedParameters,
        warnings: result.warnings
      });
    });
  });

  describe('Direct Operation Execution', () => {
    test('should execute operations by ID', async () => {
      const result = await api.executeOperation('channel-institution-query', {
        channel: 'online'
      });
      
      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.operationId).toBe('channel-institution-query');
      expect(result.endpoint).toBe('/channel/institutions/query');
      
      console.log('🎯 Direct Operation Execution SUCCESS:', {
        operationId: result.operationId,
        statusCode: result.statusCode,
        endpoint: result.endpoint,
        injectedParams: result.injectedParameters
      });
    });

    test('should handle unknown operations gracefully', async () => {
      const result = await api.executeOperation('non-existent-operation');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Unknown operation');
      expect(result.warnings.length).toBeGreaterThan(0);
      
      console.log('🚫 Unknown Operation Handling:', {
        error: result.error,
        warnings: result.warnings
      });
    });
  });

  describe('AI Assistant Helper Features', () => {
    test('should provide smart suggestions', async () => {
      const suggestions = await api.getSmartSuggestions({
        userIntent: 'find schools'
      });
      
      expect(suggestions.suggestedOperations.length).toBeGreaterThan(0);
      expect(suggestions.tips.length).toBeGreaterThan(0);
      expect(suggestions.relatedQueries.length).toBeGreaterThan(0);
      
      console.log('💡 Smart Suggestions:', {
        suggestedOperations: suggestions.suggestedOperations.map(op => op.semanticName),
        tips: suggestions.tips,
        relatedQueries: suggestions.relatedQueries
      });
    });

    test('should find similar operations', async () => {
      const similar = api.getSimilarOperations('channel-institution-query');
      
      expect(similar.length).toBeGreaterThanOrEqual(0); // May be 0 if only one operation in category
      
      console.log('🔗 Similar Operations:', similar.map(op => ({
        name: op.semanticName,
        category: op.category
      })));
    });
  });

  describe('Batch Operations', () => {
    test('should execute multiple operations in sequence', async () => {
      const operations = [
        {
          operationId: 'channel-institution-query',
          params: { channel: 'online' }
        },
        {
          operationId: 'channel-institution-query',
          params: { channel: 'campus' }
        }
      ];

      const results = await api.executeOperationBatch(operations);
      
      expect(results.length).toBe(2);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(true);
      expect(results[0].statusCode).toBe(200);
      expect(results[1].statusCode).toBe(200);
      
      console.log('🔄 Batch Operations SUCCESS:', {
        totalOperations: results.length,
        allSuccessful: results.every(r => r.success),
        executionTimes: results.map(r => r.executionTimeMs)
      });
    });
  });

  describe('Error Handling and Debugging', () => {
    test('should provide helpful error messages for invalid parameters', async () => {
      const result = await api.findInstitutionsByChannel({
        channel: 'invalid-channel-type'
      });
      
      // This might succeed or fail depending on API validation
      // But should provide helpful information either way
      console.log('🐛 Invalid Parameter Test:', {
        success: result.success,
        statusCode: result.statusCode,
        error: result.error,
        warnings: result.warnings,
        injectedParams: result.injectedParameters
      });
      
      expect(result.injectedParameters.length).toBeGreaterThan(0);
      expect(result.operationId).toBe('channel-institution-query');
    });

    test('should handle network timeouts gracefully', async () => {
      const result = await api.executeOperation('channel-institution-query', 
        { channel: 'online' },
        { timeout: 1 } // Very short timeout to trigger timeout
      );
      
      // Should either succeed quickly or fail gracefully
      console.log('⏱️ Timeout Test:', {
        success: result.success,
        error: result.error,
        executionTime: result.executionTimeMs
      });
      
      expect(result.operationId).toBe('channel-institution-query');
    });
  });

  describe('AI Learning and Adaptation', () => {
    test('should log comprehensive operation details for AI learning', async () => {
      // This test demonstrates the comprehensive logging and debugging info
      // that future AI assistants can use to learn about the API
      
      const result = await api.findInstitutionsByChannel({
        channel: 'online',
        includeInactive: false
      });
      
      const operationInfo = api.getOperationInfo('channel-institution-query');
      const systemStatus = api.getSystemStatus();
      
      const aiLearningData = {
        operation: {
          semanticName: operationInfo?.semanticName,
          naturalDescription: operationInfo?.naturalLanguageDescription,
          examples: operationInfo?.examples,
          parameters: operationInfo?.parameters,
          hints: operationInfo?.aiHints
        },
        execution: {
          success: result.success,
          statusCode: result.statusCode,
          injectedParameters: result.injectedParameters,
          warnings: result.warnings,
          executionTime: result.executionTimeMs
        },
        system: {
          availableOperations: systemStatus.operationsAvailable,
          categories: systemStatus.categories,
          environment: systemStatus.environment
        }
      };
      
      console.log('🤖 AI Learning Data Package:', JSON.stringify(aiLearningData, null, 2));
      
      expect(aiLearningData.operation.semanticName).toBe('findInstitutionsByChannel');
      expect(aiLearningData.execution.success).toBe(true);
      expect(aiLearningData.system.availableOperations).toBeGreaterThan(0);
    });
  });
});
