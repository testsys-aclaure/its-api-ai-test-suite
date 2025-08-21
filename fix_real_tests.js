const fs = require('fs');
const path = require('path');

// Load the operations data to get correct endpoint mappings
const operationsData = JSON.parse(fs.readFileSync('./tests/contract/coverage/operations.all.json', 'utf8'));
const planData = JSON.parse(fs.readFileSync('./tests/contract/coverage/plan.readonly.json', 'utf8'));

// Create mapping from operationId to details
const operationMap = {};
operationsData.forEach(op => {
  if (op.method === 'get') { // Only GET operations for now
    operationMap[op.operationId] = {
      path: op.path,
      method: op.method.toLowerCase(),
      apiClientMethod: generateApiClientMethodName(op.operationId, op.path)
    };
  }
});

// Generate API client method name from operationId and path
function generateApiClientMethodName(operationId, path) {
  // For now, we'll map based on the working pattern we know
  if (operationId === 'ChannelInstitutionQuery') return 'channelInstitutions_query';
  
  // Generate method names for other operations
  // Convert path like "/event/authorizations/query" to "eventAuthorizations_query"
  const pathParts = path.split('/').filter(part => part && part !== 'query');
  const methodBase = pathParts.map(part => 
    part.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  ).join('');
  
  return methodBase + '_query';
}

// Update API client with all needed methods
function updateApiClient() {
  const apiClientPath = './dist/ApiClient.js';
  let content = fs.readFileSync(apiClientPath, 'utf8');
  
  // Find where to insert new methods (before the closing brace)
  const insertPoint = content.lastIndexOf('  }\\n}');
  
  let newMethods = '';
  Object.entries(operationMap).forEach(([opId, details]) => {
    if (details.apiClientMethod !== 'channelInstitutions_query') { // Skip existing
      newMethods += `
  async ${details.apiClientMethod}(options = {}) {
    return this.raw('${details.path}', {
      method: 'GET',
      query: options.query
    });
  }
`;
    }
  });
  
  if (newMethods) {
    content = content.substring(0, insertPoint) + newMethods + content.substring(insertPoint);
    fs.writeFileSync(apiClientPath, content);
    console.log(`✅ Updated ApiClient with ${Object.keys(operationMap).length - 1} new methods`);
  }
}

// Fix a test file to use correct endpoint and method
function fixTestFile(testFilePath, operationId) {
  if (!operationMap[operationId]) {
    console.log(`❌ No mapping found for ${operationId}`);
    return false;
  }
  
  const operation = operationMap[operationId];
  console.log(`🔧 Fixing ${testFilePath} -> ${operation.path}`);
  
  let content = fs.readFileSync(testFilePath, 'utf8');
  
  // Update test describe title
  content = content.replace(
    /test\.describe\('GET \/unknown'/,
    `test.describe('GET ${operation.path}'`
  );
  
  // Update test to call correct API client method
  content = content.replace(
    /const response = await client\.raw\('\/unknown'[^}]*}\s*\);/gs,
    `const response = await client.${operation.apiClientMethod}({
      query: {
        limit: 5 // Limit results for faster testing
      }
    });`
  );
  
  fs.writeFileSync(testFilePath, content);
  return true;
}

// Main execution
console.log('🚀 Starting test fixes...');

// First update the API client
updateApiClient();

// Get mapping from plan data
const testFileToOperation = {};
planData.forEach(item => {
  if (item.testFile) {
    testFileToOperation[item.testFile] = item.operationId;
  }
});

let fixedCount = 0;
Object.entries(testFileToOperation).forEach(([testFile, operationId]) => {
  const fullPath = `./${testFile}`;
  if (fs.existsSync(fullPath)) {
    const success = fixTestFile(fullPath, operationId);
    if (success) fixedCount++;
  } else {
    console.log(`⚠️  Test file not found: ${fullPath}`);
  }
});

console.log(`\\n✅ Fixed ${fixedCount} test files`);
console.log(`📊 Operations mapped: ${Object.keys(operationMap).length}`);
console.log('\\n🎯 Test files are now ready to test real endpoints!');
