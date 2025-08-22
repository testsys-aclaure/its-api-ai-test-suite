import { test, expect } from '@playwright/test';
import { EventQuery } from '../../src/endpoints/get/event-query.js';
import { EnvironmentConfig } from '../../src/config/environment.js';

test.describe('Event Query', () => {
  const env = EnvironmentConfig;
  
  // PARAMETER VALIDATION TESTS
  test('parameter validation - missing program-id throws', async () => {
    await expect(EventQuery.execute({}))
      .rejects.toThrow('program-id is required');
  });

  test('parameter validation - both before-id and after-id throws', async () => {
    await expect(EventQuery.execute({
      'program-id': 'test-123',
      'before-id': '100',
      'after-id': '200'
    })).rejects.toThrow('before-id and after-id cannot be used together');
  });
  
  // REAL API SUCCESS TEST
  test('REAL API SUCCESS - Event query returns 200', async () => {
    if (!env.isConfigured()) {
      test.skip();
      return;
    }
    
    // Use environment configuration - never hardcode institution IDs
    const params = {
      'program-id': env.getDefaultProgramId(),
      'program-institution-id': env.getProgramInstitutionId() // Use dedicated test institution from environment
    };
    
    const result = await EventQuery.execute(params);
    
    // MANDATORY validations for EVERY real API test:
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).not.toHaveProperty('error');
    expect(result).not.toHaveProperty('fault');
    
    // Log successful API call for verification
    console.log(`✅ Event/query - Real API Success:`, Object.keys(result));
    
    // If we get events, log some details
    if (result.events && Array.isArray(result.events)) {
      console.log(`📊 Found ${result.events.length} events`);
      if (result.events.length > 0) {
        console.log(`📝 Sample event:`, result.events[0].eventDescription || result.events[0]['event-description'] || 'No description');
      }
    }
  });

  // AI-NATIVE TEST: Verify semantic wrapper works
  test('SEMANTIC INTERFACE - Event query natural language access', async () => {
    if (!env.isConfigured()) {
      test.skip();
      return;
    }
    
    // Test natural language interface
    const result = await EventQuery.getEvents({
      program: env.getDefaultProgramId()
    });
    
    expect(result).toBeDefined();
    expect(result).not.toHaveProperty('error');
    
    console.log(`✅ Event/query - Semantic Interface Success`);
  });

  // AI-NATIVE TEST: Verify operation metadata is complete  
  test('METADATA COMPLETENESS - Event query has AI-discoverable metadata', () => {
    const metadata = EventQuery.metadata;
    
    expect(metadata.businessIntent).toBeDefined();
    expect(metadata.semanticNames.length).toBeGreaterThan(0);
    expect(metadata.businessDomain).toBeDefined();
    expect(metadata.parameters.required).toBeDefined();
    expect(metadata.useCases.length).toBeGreaterThan(0);
    
    // Verify specific metadata content
    expect(metadata.businessIntent).toContain('events');
    expect(metadata.semanticNames).toContain('event query');
    expect(metadata.businessDomain).toBe('Event Management');
    expect(metadata.parameters.required).toContain('program-id');
    expect(metadata.useCases.length).toBeGreaterThanOrEqual(3);
    
    console.log(`✅ Event/query - Metadata Complete:`, metadata.businessIntent);
  });

  // AI-NATIVE TEST: Verify business-friendly method aliases work
  test('SEMANTIC INTERFACE - Business method aliases work', async () => {
    if (!env.isConfigured()) {
      test.skip();
      return;
    }

    // Test listAllEvents method
    const result1 = await EventQuery.listAllEvents(env.getDefaultProgramId());
    expect(result1).toBeDefined();

    // Test findActiveEvents method  
    const result2 = await EventQuery.findActiveEvents(env.getDefaultProgramId());
    expect(result2).toBeDefined();

    console.log(`✅ Event/query - Business Aliases Success`);
  });

  // PARAMETER VALIDATION STANDARDS (every endpoint must pass these)
  test('universal parameter validation', async () => {
    // Missing program-id should throw
    await expect(EventQuery.execute({})).rejects.toThrow('program-id is required');
  });
  
  test('successful execution with valid parameters', async () => {
    if (!env.isConfigured()) {
      test.skip();
      return;
    }
    
    const validParams = {
      'program-id': env.getDefaultProgramId()
    };
    
    const result = await EventQuery.execute(validParams);
    expect(result).toBeDefined();
    expect(result).not.toHaveProperty('error');
  });
});
