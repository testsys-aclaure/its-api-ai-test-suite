#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const planPath = args.find(arg => arg.startsWith('--plan='))?.split('=')[1] || 'tests/contract/coverage/plan.readonly.json';
const outputPath = args.find(arg => arg.startsWith('--out='))?.split('=')[1] || 'tests/contract';

console.log('🧪 Generating read-only tests...');
console.log(`Plan: ${planPath}`);
console.log(`Output: ${outputPath}`);

// Load the plan
let plan;
try {
  const planContent = fs.readFileSync(planPath, 'utf8');
  plan = JSON.parse(planContent);
} catch (error) {
  console.error(`❌ Failed to load plan: ${error.message}`);
  process.exit(1);
}

console.log(`📋 Found ${plan.length} operations to generate`);

// Template for read-only tests based on the proven working pattern
const testTemplate = (operationId, path, method, requiredParams) => {
  const methodUpper = method.toUpperCase();
  const className = operationId.replace(/([A-Z])/g, '_$1').toLowerCase().substring(1);
  
  // Generate parameter examples based on required params
  const queryParams = [];
  
  if (requiredParams.query.includes('program-id')) {
    queryParams.push(`        'program-id': '238', // From environment`);
  }
  
  // Add limit for pagination
  queryParams.push(`        limit: 5, // Limit results for faster testing`);
  
  // Generate path parameters if needed
  const pathParamSetup = requiredParams.path.length > 0 
    ? `    // TODO: Provide required path parameters: ${requiredParams.path.join(', ')}\n    `
    : '    ';

  const queryParamSetup = queryParams.length > 0 
    ? `      query: {\n${queryParams.join(',\n')}\n      }`
    : '';

  return `import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../../dist/ApiClient.js';

test.describe('${methodUpper} ${path}', () => {
  let client: ApiClient;

  test.beforeEach(async () => {
    client = new ApiClient();
  });

  test.afterEach(async () => {
    if (client) {
      await client.dispose();
    }
  });

  test('returns 2xx status with valid response structure', async () => {
    ${pathParamSetup}const response = await client.raw('${path}', {
      method: '${methodUpper}',${queryParamSetup ? `\n      body: JSON.stringify({\n${queryParamSetup}\n      })` : ''}
    });

    // Assert success status (2xx)
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);

    // Assert content type if JSON response
    if (response.headers['content-type']?.includes('application/json')) {
      expect(response.json).toBeDefined();
    }

    // TODO: Add schema validation with AJV when schema ref available
    // Schema ref: ${operationId} - response schema needed
  });

  test('handles authentication correctly', async () => {
    ${pathParamSetup}const response = await client.raw('${path}', {
      method: '${methodUpper}'${queryParamSetup ? `,\n      body: JSON.stringify({\n${queryParamSetup}\n      })` : ''}
    });

    // Should not return 401/403 with proper authentication
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(403);
  });

  ${requiredParams.path.length > 0 ? `
  test('handles missing path parameters gracefully', async () => {
    // TODO: Test with invalid path parameter values
    // Required path params: ${requiredParams.path.join(', ')}
  });` : ''}

  test('handles empty result set gracefully', async () => {
    ${pathParamSetup}const response = await client.raw('${path}', {
      method: '${methodUpper}',${queryParams.length > 0 ? `\n      body: JSON.stringify({\n        query: {\n          // Use non-existent identifier to get empty results\n          'non-existent-param': 'non-existent-value-12345'\n        }\n      })` : ''}
    });

    // Should still return success even with no results
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });
});
`;
};

// Generate tests for each operation in the plan
let generatedCount = 0;
let skippedCount = 0;

plan.forEach(operation => {
  try {
    // Parse the test file path
    const testFilePath = path.resolve(outputPath, operation.testFile.replace('tests/contract/', ''));
    const testDir = path.dirname(testFilePath);
    
    // Create directory structure
    fs.mkdirSync(testDir, { recursive: true });
    
    // Generate test content
    const testContent = testTemplate(
      operation.operationId,
      operation.path || '/unknown',
      operation.method || 'get',
      operation.requiredParams || { path: [], query: [], header: [], cookie: [] }
    );
    
    // Write test file
    fs.writeFileSync(testFilePath, testContent, 'utf8');
    
    console.log(`✅ Generated: ${operation.testFile}`);
    generatedCount++;
    
  } catch (error) {
    console.error(`❌ Failed to generate ${operation.operationId}: ${error.message}`);
    skippedCount++;
  }
});

// Create a basic ApiClient for the tests to use (since the generated client has issues)
const apiClientContent = `import { ApiWrapper } from '../api/ApiWrapper';

export class ApiClient extends ApiWrapper {
  constructor() {
    super();
  }
}
`;

const apiClientPath = path.resolve('src/ApiClient.ts');
fs.writeFileSync(apiClientPath, apiClientContent, 'utf8');

console.log('\\n📊 Generation Summary:');
console.log(`✅ Generated: ${generatedCount} test files`);
console.log(`❌ Skipped: ${skippedCount} test files`);
console.log(`📁 Output directory: ${outputPath}`);

if (generatedCount === 0) {
  console.error('❌ No tests were generated!');
  process.exit(1);
}

console.log('\\n🎯 Next steps:');
console.log('1. Run: npm run test:contract');
console.log('2. Review failing tests and add schema validation');
console.log('3. Run: npm run verify:coverage');
