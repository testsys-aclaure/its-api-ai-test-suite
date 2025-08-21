const openapi = require('./OpenAPI.json');

// Get all the failed endpoints with 422 errors
const failedEndpoints = [
  '/event/authorizations/Query',
  '/event-class/Query', 
  '/event-class/examinees/query',
  '/examinee/audit/query',
  '/examinee/events/query',
  '/examinee/longitudinal-segment-detail/query',
  '/examinee/longitudinal-segments/query',
  '/examinee/record/query',
  '/inventory/query',
  '/iw-tool/export/tests/query',
  '/iw-tool/import/query',
  '/package/forms/Query',
  '/remote/admin-urls/Query',
  '/remote/examinee-data/Query',
  '/remote/session-data/Query',
  '/remote/sessions/query',
  '/session/query',
  '/user/access/query'
];

console.log('🔍 Analyzing failed endpoints for required parameters...\n');

failedEndpoints.forEach(path => {
  const pathData = openapi.paths[path];
  if (pathData && pathData.get) {
    const operation = pathData.get;
    console.log(`❌ ${path}:`);
    console.log(`   Operation: ${operation.operationId}`);
    
    if (operation.parameters && operation.parameters.length > 0) {
      console.log('   Required Parameters:');
      operation.parameters.forEach(param => {
        const required = param.required ? '✳️ REQUIRED' : '⚪ Optional';
        console.log(`     - ${param.name} (${param.in}) ${required}`);
      });
    } else {
      console.log('   📝 No parameters listed');
    }
    console.log();
  } else {
    console.log(`❓ ${path} - Path not found in OpenAPI spec`);
  }
});

console.log('💡 Potential fixes:');
console.log('1. Add missing required parameters from environment');
console.log('2. Some endpoints may need specific IDs (examinee-id, event-id, etc.)');
console.log('3. Check if case sensitivity matters (Query vs query)');
