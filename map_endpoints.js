const plan = require('./tests/contract/coverage/plan.readonly.json');
const openapi = require('./OpenAPI.json');

console.log('🔍 Mapping operations to actual endpoints...\n');

// Extract all GET paths from OpenAPI
const getPaths = {};
Object.keys(openapi.paths).forEach(path => {
  if (openapi.paths[path].get) {
    const operation = openapi.paths[path].get;
    getPaths[operation.operationId] = {
      path: path,
      operationId: operation.operationId,
      summary: operation.summary,
      parameters: operation.parameters || []
    };
  }
});

console.log(`📊 Found ${Object.keys(getPaths).length} GET endpoints in OpenAPI spec`);
console.log(`📋 Need to test ${plan.length} read-only operations\n`);

// Map plan operations to endpoints
let mapped = 0;
let unmapped = [];

plan.forEach((op, i) => {
  const endpoint = getPaths[op.operationId];
  if (endpoint) {
    console.log(`✅ ${i+1}. ${op.operationId} → ${endpoint.path}`);
    mapped++;
  } else {
    console.log(`❌ ${i+1}. ${op.operationId} → NOT FOUND`);
    unmapped.push(op.operationId);
  }
});

console.log(`\n📈 Mapping Results:`);
console.log(`✅ Mapped: ${mapped}/${plan.length}`);
console.log(`❌ Unmapped: ${unmapped.length}`);

if (unmapped.length > 0) {
  console.log(`\n🔍 Unmapped operations:`);
  unmapped.forEach(op => console.log(`   - ${op}`));
}
