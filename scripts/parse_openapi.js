const fs = require('fs');
const path = require('path');

// Load and parse the OpenAPI spec
const specPath = path.join(__dirname, '..', 'OpenAPI.json');
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

console.log('=== PARSING OPENAPI SPEC ===');
console.log(`OpenAPI Version: ${spec.openapi}`);
console.log(`Title: ${spec.info.title}`);
console.log(`Version: ${spec.info.version}`);
console.log(`Security Schemes: ${JSON.stringify(spec.components?.securitySchemes, null, 2)}`);

const operations = [];
const anomalies = [];
const allOperationIds = new Set();
const duplicateOperationIds = new Set();

// Parse all paths and operations
for (const [pathTemplate, pathObj] of Object.entries(spec.paths || {})) {
  for (const [method, operation] of Object.entries(pathObj)) {
    if (['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'].includes(method.toLowerCase())) {
      const operationId = operation.operationId;
      
      // Check for duplicate operationIds
      if (operationId) {
        if (allOperationIds.has(operationId)) {
          duplicateOperationIds.add(operationId);
          anomalies.push({
            type: 'duplicate_operationId',
            operationId,
            path: pathTemplate,
            method: method.toLowerCase(),
            jsonPointer: `/paths/${pathTemplate.replace(/\//g, '~1')}/${method.toLowerCase()}`,
            issue: 'Duplicate operationId found',
            fix: `Rename one operationId to ${operationId}_${method}`
          });
        } else {
          allOperationIds.add(operationId);
        }
      }

      // Analyze path casing
      const pathSegments = pathTemplate.split('/').filter(Boolean);
      const hasMixedCasing = pathSegments.some(segment => {
        return segment !== segment.toLowerCase() && segment !== segment.toUpperCase();
      });
      if (hasMixedCasing) {
        anomalies.push({
          type: 'mixed_path_casing',
          path: pathTemplate,
          method: method.toLowerCase(),
          jsonPointer: `/paths/${pathTemplate.replace(/\//g, '~1')}`,
          issue: 'Mixed case in path segments',
          normalizedPath: '/' + pathSegments.map(s => s.toLowerCase()).join('/')
        });
      }

      // Extract parameters
      const parameters = operation.parameters || [];
      const requiredParams = {
        path: [],
        query: [],
        header: [],
        cookie: []
      };

      parameters.forEach(param => {
        if (param.required && param.in) {
          requiredParams[param.in] = requiredParams[param.in] || [];
          requiredParams[param.in].push(param.name);
        }
      });

      // Analyze request body
      let requestBody = null;
      if (operation.requestBody) {
        const content = operation.requestBody.content || {};
        requestBody = {
          required: operation.requestBody.required || false,
          contentTypes: Object.keys(content),
          schemaRef: 'UNKNOWN',
          minimalShape: 'UNKNOWN'
        };

        // Try to find schema reference
        const jsonContent = content['application/json'];
        if (jsonContent?.schema?.$ref) {
          requestBody.schemaRef = jsonContent.schema.$ref;
        }
      }

      // Analyze responses
      const responses = operation.responses || {};
      const successCodes = Object.keys(responses)
        .filter(code => code.startsWith('2'))
        .map(code => parseInt(code));

      if (successCodes.length === 0) {
        anomalies.push({
          type: 'missing_success_response',
          path: pathTemplate,
          method: method.toLowerCase(),
          jsonPointer: `/paths/${pathTemplate.replace(/\//g, '~1')}/${method.toLowerCase()}/responses`,
          issue: 'No 2xx response defined'
        });
      }

      // Determine pagination pattern
      let pagination = { pattern: 'none', params: [] };
      const queryParams = parameters.filter(p => p.in === 'query').map(p => p.name.toLowerCase());
      
      if (queryParams.includes('cursor')) {
        pagination = { pattern: 'cursor', params: ['cursor', 'limit'] };
      } else if (queryParams.includes('page')) {
        pagination = { pattern: 'page', params: ['page', 'limit'] };
      } else if (queryParams.includes('offset')) {
        pagination = { pattern: 'offset', params: ['offset', 'limit'] };
      } else if (queryParams.includes('limit')) {
        pagination = { pattern: 'limit', params: ['limit'] };
      }

      // Determine effective security
      const securityEffective = operation.security || spec.security || [];

      // Determine produces/consumes
      const responses2xx = Object.entries(responses).filter(([code]) => code.startsWith('2'));
      const produces = [];
      responses2xx.forEach(([_, response]) => {
        if (response.content) {
          produces.push(...Object.keys(response.content));
        }
      });

      const consumes = requestBody ? requestBody.contentTypes : [];

      const op = {
        operationId: operationId || `${pathTemplate.split('/').pop()}_${method}`,
        path: pathTemplate,
        method: method.toLowerCase(),
        tags: operation.tags || [],
        summary: operation.summary || operation.description || '',
        securityEffective,
        successCodes,
        produces: [...new Set(produces)],
        consumes: [...new Set(consumes)],
        requiredParams,
        requestBody,
        pagination,
        idempotent: ['get', 'head', 'options', 'put', 'delete'].includes(method.toLowerCase()),
        status: 'parsed',
        evidence: ['spec'],
        jsonPointer: `/paths/${pathTemplate.replace(/\//g, '~1')}/${method.toLowerCase()}`,
        notes: []
      };

      operations.push(op);
    }
  }
}

console.log(`\n=== OPERATION SUMMARY ===`);
console.log(`Total operations: ${operations.length}`);

const methodCounts = operations.reduce((acc, op) => {
  acc[op.method] = (acc[op.method] || 0) + 1;
  return acc;
}, {});

Object.entries(methodCounts).forEach(([method, count]) => {
  console.log(`${method.toUpperCase()}: ${count}`);
});

console.log(`\n=== ANOMALIES SUMMARY ===`);
console.log(`Total anomalies: ${anomalies.length}`);

const anomalyCounts = anomalies.reduce((acc, anomaly) => {
  acc[anomaly.type] = (acc[anomaly.type] || 0) + 1;
  return acc;
}, {});

Object.entries(anomalyCounts).forEach(([type, count]) => {
  console.log(`${type}: ${count}`);
});

// Write operations.all.json
const operationsAllPath = path.join(__dirname, '..', 'tests', 'contract', 'coverage', 'operations.all.json');
fs.mkdirSync(path.dirname(operationsAllPath), { recursive: true });
fs.writeFileSync(operationsAllPath, JSON.stringify(operations, null, 2));

// Write anomalies.json
const anomaliesPath = path.join(__dirname, '..', 'tests', 'contract', 'anomalies.json');
fs.writeFileSync(anomaliesPath, JSON.stringify(anomalies, null, 2));

console.log(`\nFiles written:`);
console.log(`- ${operationsAllPath}`);
console.log(`- ${anomaliesPath}`);
