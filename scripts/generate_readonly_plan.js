const fs = require('fs');
const path = require('path');

// Load the operations inventory
const operationsPath = path.join(__dirname, '..', 'tests', 'contract', 'coverage', 'operations.all.json');
const operations = JSON.parse(fs.readFileSync(operationsPath, 'utf8'));

console.log('=== GENERATING READ-ONLY PLAN ===');

// Filter for read-only operations
const readOnlyMethods = ['get', 'head', 'options'];
const readOnlyOps = operations.filter(op => readOnlyMethods.includes(op.method));

console.log(`Total operations: ${operations.length}`);
console.log(`Read-only operations: ${readOnlyOps.length}`);

// Generate the read-only plan
const plan = readOnlyOps.map(op => {
  // Normalize path for file system
  const pathSegments = op.path.split('/').filter(Boolean);
  const normalizedSegments = pathSegments.map(segment => 
    segment.toLowerCase().replace(/[^a-z0-9]/g, '-')
  );
  const testFile = `tests/contract/${normalizedSegments.join('/')}/${op.method}.spec.ts`;

  // Determine schema refs
  const schemaRefs = {
    request: null, // GET/HEAD/OPTIONS typically don't have request bodies
    response: "UNKNOWN" // Will be determined during schema generation
  };

  // Map environment bindings based on required params
  const envBindings = {};
  if (op.requiredParams.query.includes('program-id')) {
    envBindings['program-id'] = '{{program-id}}';
  }
  if (op.requiredParams.query.includes('vendor-id')) {
    envBindings['vendor-id'] = '{{vendor-id}}';
  }
  if (op.requiredParams.query.includes('sponsor-id')) {
    envBindings['sponsor-id'] = '{{sponsor-id}}';
  }

  // Determine data needs
  let dataNeeds = 'none';
  const hasPathParams = op.requiredParams.path.length > 0;
  const hasRequiredQueryParams = op.requiredParams.query.length > 0;
  
  if (hasPathParams || hasRequiredQueryParams) {
    dataNeeds = 'seed'; // Will need minimal test data
  }

  return {
    operationId: op.operationId,
    testFile,
    successCodes: op.successCodes,
    schemaRefs,
    requiredParams: op.requiredParams,
    envBindings,
    dataNeeds,
    evidence: op.evidence,
    notes: op.notes
  };
});

// Write the read-only plan
const planPath = path.join(__dirname, '..', 'tests', 'contract', 'coverage', 'plan.readonly.json');
fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));

// Generate the gate
const gate = {
  totalReadonly: readOnlyOps.length,
  plannedReadonlyTests: plan.length,
  status: readOnlyOps.length === plan.length ? 'pass' : 'fail',
  missing: []
};

// If there's a mismatch, identify missing operations
if (gate.status === 'fail') {
  const plannedIds = new Set(plan.map(p => p.operationId));
  gate.missing = readOnlyOps.filter(op => !plannedIds.has(op.operationId)).map(op => op.operationId);
}

// Write the gate
const gatePath = path.join(__dirname, '..', 'tests', 'contract', 'coverage', 'gate.readonly.json');
fs.writeFileSync(gatePath, JSON.stringify(gate, null, 2));

console.log(`\n=== READ-ONLY GATE RESULT ===`);
console.log(`Total read-only operations: ${gate.totalReadonly}`);
console.log(`Planned read-only tests: ${gate.plannedReadonlyTests}`);
console.log(`Status: ${gate.status.toUpperCase()}`);

if (gate.missing.length > 0) {
  console.log(`Missing operations: ${gate.missing.join(', ')}`);
}

console.log(`\nFiles written:`);
console.log(`- ${planPath}`);
console.log(`- ${gatePath}`);

// Print method breakdown
const methodBreakdown = readOnlyOps.reduce((acc, op) => {
  acc[op.method] = (acc[op.method] || 0) + 1;
  return acc;
}, {});

console.log(`\n=== READ-ONLY METHOD BREAKDOWN ===`);
Object.entries(methodBreakdown).forEach(([method, count]) => {
  console.log(`${method.toUpperCase()}: ${count}`);
});
