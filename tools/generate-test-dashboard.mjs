/**
 * Test Dashboard Generator with AI Intelligence Integration
 * Creates a human-readable HTML dashboard showing actual endpoint status
 * Enhanced with test-informed intelligence for AI-friendly interpretation
 */

import { EnhancedDirectAPITools } from '../dist/api/EnhancedDirectAPITools.js';
import fs from 'fs';

async function generateTestDashboard() {
  console.log('🔧 Generating Test Dashboard...');
  
  try {
    await EnhancedDirectAPITools.initialize();
    
    // Test all endpoints with full details
    const testResults = await runComprehensiveTests();
    
    // Generate HTML dashboard
    const html = generateDashboardHTML(testResults);
    
    // Write to file
      // Write the HTML file to test/results/
  const outputFile = 'test/results/test-dashboard.html';
    fs.writeFileSync(outputFile, html);
    
    console.log('✅ Test dashboard generated: test-dashboard.html');
    console.log('🌐 Open in browser to view detailed endpoint status');
    
    return testResults;
    
  } catch (error) {
    console.error('❌ Dashboard generation failed:', error);
    throw error;
  }
}

async function runComprehensiveTests() {
  console.log('🧪 Running comprehensive endpoint tests...');
  
  // Load endpoint parameter fixes
  let endpointFixes = {};
  try {
    const fixesData = fs.readFileSync('./endpoint-parameter-fixes.json', 'utf8');
    const fixesObj = JSON.parse(fixesData);
    endpointFixes = fixesObj.endpoints || {};
    console.log(`✅ Loaded parameter fixes for ${Object.keys(endpointFixes).length} endpoints`);
  } catch (error) {
    console.log('ℹ️ No endpoint parameter fixes found, using base parameters only');
  }
  
  const results = {
    timestamp: new Date().toISOString(),
    summary: { total: 0, working: 0, failed: 0 },
    endpoints: []
  };
  
  // All endpoints from our analysis
  const endpointsToTest = [
    // Simple endpoints (0 required params)
    { endpoint: '/message-history/query', params: {}, category: 'Simple', description: 'Communication logs' },
    { endpoint: '/signalr-domain/query', params: {}, category: 'Simple', description: 'SignalR domain config' },
    { endpoint: '/Timezone/Query', params: {}, category: 'Simple', description: 'Timezone information' },
    { endpoint: '/user/access/query', params: {}, category: 'Simple', description: 'User access info' },
    { endpoint: '/User/query', params: {}, category: 'Simple', description: 'User information' },
    
    // Core educational endpoints (1 required param: program-id)
    { endpoint: '/channel/institutions/query', params: {}, category: 'Educational', description: 'Institution data' },
    { endpoint: '/event/query', params: {}, category: 'Educational', description: 'Tests/Events' },
    { endpoint: '/examinee/query', params: {}, category: 'Educational', description: 'Students/Examinees' },
    { endpoint: '/registration/query', params: {}, category: 'Educational', description: 'Test registrations' },
    { endpoint: '/result/query', params: {}, category: 'Educational', description: 'Test results' },
    { endpoint: '/Test/Query', params: {}, category: 'Educational', description: 'Test definitions' },
    
    // Event-related endpoints
    { endpoint: '/event/authorizations/Query', params: {}, category: 'Event', description: 'Event authorizations' },
    { endpoint: '/event-class/Query', params: {}, category: 'Event', description: 'Event classes' },
    { endpoint: '/event-class/examinees/query', params: {}, category: 'Event', description: 'Class examinees' },
    { endpoint: '/examinee/events/query', params: {}, category: 'Event', description: 'Examinee events' },
    
    // Form and test content
    { endpoint: '/form/definition/Query', params: {}, category: 'Content', description: 'Form definitions' },
    { endpoint: '/Form/Query', params: {}, category: 'Content', description: 'Form data' },
    { endpoint: '/test/forms/Query', params: {}, category: 'Content', description: 'Test forms' },
    { endpoint: '/test/pretest-references/Query', params: {}, category: 'Content', description: 'Pretest references' },
    
    // Specialized endpoints  
    { endpoint: '/order/Query', params: {}, category: 'Specialized', description: 'Order information' },
    { endpoint: '/sabbatical/Query', params: {}, category: 'Specialized', description: 'Sabbatical data' },
    { endpoint: '/remote/system-checks/Query', params: {}, category: 'Specialized', description: 'System checks' },
    { endpoint: '/remote/practice-checks/Query', params: {}, category: 'Specialized', description: 'Practice checks' },
    { endpoint: '/longitudinal-group/examinees/query', params: {}, category: 'Specialized', description: 'Longitudinal groups' },
    { endpoint: '/result-identifier/Query', params: {}, category: 'Specialized', description: 'Result identifiers' },
    
    // Complex endpoints (multiple required params)
    { endpoint: '/secure-browser/errors/query', params: { 'environment-id': '1' }, category: 'Complex', description: 'Browser errors' },
    { endpoint: '/form/reports/Query', params: { 'test-id': '1', 'form-id': '1' }, category: 'Complex', description: 'Form reports' },
    { endpoint: '/package/forms/Query', params: { 'package-code': 'test' }, category: 'Complex', description: 'Package forms' },
    
    // Problematic endpoints (known to fail)
    { endpoint: '/inventory/query', params: {}, category: 'Problematic', description: 'Inventory data' },
    { endpoint: '/examinee/record/query', params: { 'table-name': 'examinee', 'record-id': '1' }, category: 'Problematic', description: 'Examinee records' },
    { endpoint: '/session/query', params: {}, category: 'Problematic', description: 'Session data' }
  ];
  
  for (const test of endpointsToTest) {
    results.summary.total++;
    console.log(`Testing ${results.summary.total}/${endpointsToTest.length}: ${test.endpoint}`);
    
    try {
      const startTime = Date.now();
      
      // Apply endpoint-specific parameter fixes
      const finalParams = { ...test.params };
      if (endpointFixes[test.endpoint]) {
        Object.assign(finalParams, endpointFixes[test.endpoint]);
        console.log(`   📝 Applied parameter fixes: ${Object.keys(endpointFixes[test.endpoint]).join(', ')}`);
      }
      
      // Use intelligent call instead of basic makeRequest
      const response = await EnhancedDirectAPITools.intelligentCall(
        test.endpoint, 
        finalParams, 
        `Dashboard test: ${test.description}`
      );
      const duration = Date.now() - startTime;
      
      const result = {
        endpoint: test.endpoint,
        category: test.category,
        description: test.description,
        success: response.success,
        httpStatus: response.metadata?.httpStatus || response.status || 0,
        duration: duration,
        fullUrl: response.metadata?.url || 'Unknown URL',
        requestParams: {
          ...test.params,
          'program-id': process.env.DEFAULT_PROGRAM_ID || '238',
          'program-institution-id': process.env.PROGRAM_INSTITUTION_ID || '1009048'
        },
        responseData: null,
        errorDetails: null,
        rawResponse: null,  // Add raw response capture
        // Enhanced: Add AI interpretation and exploration capability
        aiInterpretation: response.aiInterpretation || 
          (response.success ? 'API call successful with intelligent routing' : 'Failed - exploration mode available'),
        explorationCapability: response.explorationCapability !== false
      };
      
      if (response.success) {
        results.summary.working++;
        result.responseData = {
          type: Array.isArray(response.data) ? 'array' : typeof response.data,
          count: Array.isArray(response.data) ? response.data.length : (response.data ? Object.keys(response.data).length : 0),
          sample: Array.isArray(response.data) && response.data.length > 0 
            ? Object.keys(response.data[0]).slice(0, 5) 
            : response.data ? Object.keys(response.data).slice(0, 5) : [],
          fullData: response.data  // Include full successful response
        };
      } else {
        results.summary.failed++;
        result.errorDetails = {
          message: response.error || 'Unknown error',
          httpStatus: result.httpStatus,
          possibleCause: getPossibleCause(result.httpStatus),
          fullErrorResponse: response.data || response.error || 'No error details available'
        };
      }
      
      // Always capture the raw response for debugging
      result.rawResponse = response;
      
      results.endpoints.push(result);
      
    } catch (error) {
      results.summary.failed++;
      results.endpoints.push({
        endpoint: test.endpoint,
        category: test.category,
        description: test.description,
        success: false,
        httpStatus: 0,
        duration: 0,
        fullUrl: 'Request failed',
        requestParams: test.params,
        responseData: null,
        errorDetails: {
          message: error.message,
          httpStatus: 0,
          possibleCause: 'Network or authentication error',
          fullErrorResponse: error.message
        },
        rawResponse: { error: error.message }
      });
    }
  }
  
  console.log(`✅ Testing complete: ${results.summary.working}/${results.summary.total} working`);
  return results;
}

function getPossibleCause(httpStatus) {
  switch (httpStatus) {
    case 422: return 'Missing required parameters or invalid values';
    case 404: return 'Endpoint not found or incorrect path';
    case 500: return 'Server error - endpoint may not be implemented';
    case 401: return 'Authentication failed';
    case 403: return 'Access denied - insufficient permissions';
    default: return 'Unknown error condition';
  }
}

function generateDashboardHTML(results) {
  const successRate = Math.round((results.summary.working / results.summary.total) * 100);
  
  // Group endpoints by category
  const categories = {};
  results.endpoints.forEach(endpoint => {
    if (!categories[endpoint.category]) {
      categories[endpoint.category] = [];
    }
    categories[endpoint.category].push(endpoint);
  });
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Endpoint Test Dashboard</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5em;
        }
        .header p {
            margin: 0;
            opacity: 0.9;
        }
        .stats {
            display: flex;
            justify-content: space-around;
            padding: 30px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
        }
        .stat-box {
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            flex: 1;
            margin: 0 10px;
        }
        .stat-number {
            font-size: 3em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .stat-label {
            color: #666;
            text-transform: uppercase;
            font-size: 0.9em;
            letter-spacing: 1px;
        }
        .success { color: #28a745; }
        .failed { color: #dc3545; }
        .rate { color: #17a2b8; }
        
        .category-section {
            margin: 30px;
        }
        .category-header {
            background: #343a40;
            color: white;
            padding: 15px 20px;
            margin: 20px 0 0 0;
            border-radius: 6px;
            font-size: 1.2em;
            font-weight: bold;
        }
        .endpoint-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
            gap: 20px;
            padding: 20px 0;
        }
        .endpoint-card {
            border: 1px solid #ddd;
            border-radius: 6px;
            overflow: hidden;
            background: white;
        }
        .endpoint-card.success {
            border-left: 4px solid #28a745;
        }
        .endpoint-card.failed {
            border-left: 4px solid #dc3545;
        }
        .endpoint-header {
            padding: 15px 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
        }
        .endpoint-path {
            font-family: 'Monaco', 'Courier New', monospace;
            font-weight: bold;
            color: #495057;
            font-size: 1.1em;
        }
        .endpoint-description {
            color: #666;
            font-size: 0.9em;
            margin-top: 5px;
        }
        .endpoint-status {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background: white;
        }
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status-success {
            background: #d4edda;
            color: #155724;
        }
        .status-failed {
            background: #f8d7da;
            color: #721c24;
        }
        .duration {
            font-family: 'Monaco', 'Courier New', monospace;
            color: #666;
            font-size: 0.9em;
        }
        .endpoint-details {
            padding: 20px;
            background: #f8f9fa;
        }
        .detail-section {
            margin-bottom: 20px;
        }
        .detail-label {
            font-weight: bold;
            color: #495057;
            margin-bottom: 8px;
            text-transform: uppercase;
            font-size: 0.8em;
            letter-spacing: 0.5px;
        }
        .detail-content {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            padding: 12px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.85em;
            overflow-x: auto;
        }
        .url-display {
            word-break: break-all;
            color: #0066cc;
        }
        .error-message {
            color: #dc3545;
            background: #f8d7da;
            border: 1px solid #f1aeb5;
        }
        .response-data {
            color: #28a745;
        }
        .params-display {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
        }
        .performance-warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
        }
        .timestamp {
            text-align: center;
            color: #666;
            font-size: 0.9em;
            padding: 20px;
            border-top: 1px solid #e9ecef;
        }
        
        @media (max-width: 768px) {
            .endpoint-grid {
                grid-template-columns: 1fr;
            }
            .stats {
                flex-direction: column;
            }
            .stat-box {
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 API Endpoint Test Dashboard</h1>
            <p>Real-time status of all GET endpoints with full debugging information</p>
        </div>
        
        <div class="stats">
            <div class="stat-box">
                <div class="stat-number success">${results.summary.working}</div>
                <div class="stat-label">Working</div>
            </div>
            <div class="stat-box">
                <div class="stat-number failed">${results.summary.failed}</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat-box">
                <div class="stat-number rate">${successRate}%</div>
                <div class="stat-label">Success Rate</div>
            </div>
        </div>
        
        <div class="category-section">
            ${Object.entries(categories).map(([categoryName, endpoints]) => `
                <div class="category-header">
                    📁 ${categoryName} Endpoints (${endpoints.filter(e => e.success).length}/${endpoints.length} working)
                </div>
                <div class="endpoint-grid">
                    ${endpoints.map(endpoint => `
                        <div class="endpoint-card ${endpoint.success ? 'success' : 'failed'}">
                            <div class="endpoint-header">
                                <div class="endpoint-path">${endpoint.endpoint}</div>
                                <div class="endpoint-description">${endpoint.description}</div>
                            </div>
                            
                            <div class="endpoint-status">
                                <span class="status-badge ${endpoint.success ? 'status-success' : 'status-failed'}">
                                    HTTP ${endpoint.httpStatus} ${endpoint.success ? 'SUCCESS' : 'FAILED'}
                                </span>
                                <span class="duration">${endpoint.duration}ms</span>
                            </div>
                            
                            <div class="endpoint-details">
                                <div class="detail-section">
                                    <div class="detail-label">🌐 Full Request URL</div>
                                    <div class="detail-content url-display">${endpoint.fullUrl}</div>
                                </div>
                                
                                <div class="detail-section">
                                    <div class="detail-label">📝 Request Parameters</div>
                                    <div class="detail-content params-display">
                                        ${JSON.stringify(endpoint.requestParams, null, 2)}
                                    </div>
                                </div>
                                
                                ${endpoint.success ? `
                                    <div class="detail-section">
                                        <div class="detail-label">✅ Response Data</div>
                                        <div class="detail-content response-data">
                                            Type: ${endpoint.responseData.type}<br>
                                            Count: ${endpoint.responseData.count} items<br>
                                            Sample fields: ${endpoint.responseData.sample.join(', ') || 'None'}
                                        </div>
                                    </div>
                                    
                                    <div class="detail-section">
                                        <div class="detail-label">📄 Full Response Sample</div>
                                        <div class="detail-content response-data" style="max-height: 300px; overflow-y: auto;">
                                            ${JSON.stringify(Array.isArray(endpoint.responseData.fullData) && endpoint.responseData.fullData.length > 0 ? endpoint.responseData.fullData[0] : endpoint.responseData.fullData, null, 2)}
                                        </div>
                                    </div>
                                    
                                    ${endpoint.duration > 2000 ? `
                                        <div class="performance-warning">
                                            ⚠️ Performance Warning: This endpoint is slow (${endpoint.duration}ms). Consider using with caution in real-time applications.
                                        </div>
                                    ` : ''}
                                ` : `
                                    <div class="detail-section">
                                        <div class="detail-label">❌ Error Details</div>
                                        <div class="detail-content error-message">
                                            Message: ${endpoint.errorDetails.message}<br>
                                            HTTP Status: ${endpoint.errorDetails.httpStatus}<br>
                                            Possible Cause: ${endpoint.errorDetails.possibleCause}
                                        </div>
                                    </div>
                                    
                                    <div class="detail-section">
                                        <div class="detail-label">🔍 Full Error Response</div>
                                        <div class="detail-content error-message" style="max-height: 300px; overflow-y: auto;">
                                            ${typeof endpoint.errorDetails.fullErrorResponse === 'object' ? 
                                              JSON.stringify(endpoint.errorDetails.fullErrorResponse, null, 2) : 
                                              endpoint.errorDetails.fullErrorResponse}
                                        </div>
                                    </div>
                                    
                                    <div class="detail-section">
                                        <div class="detail-label">🧪 Raw Response Debug</div>
                                        <div class="detail-content" style="max-height: 200px; overflow-y: auto; font-size: 0.75em;">
                                            ${JSON.stringify(endpoint.rawResponse, null, 2)}
                                        </div>
                                    </div>
                                `}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
        
        <div class="timestamp">
            🕐 Last updated: ${new Date(results.timestamp).toLocaleString()}
            <br>Generated by API Test Dashboard
        </div>
    </div>
</body>
</html>`;
}

// Run the dashboard generation
generateTestDashboard().then((results) => {
  console.log(`\n📊 Dashboard Summary:`);
  console.log(`   Working: ${results.summary.working}/${results.summary.total}`);
  console.log(`   Failed: ${results.summary.failed}/${results.summary.total}`);
  console.log(`   Success Rate: ${Math.round((results.summary.working/results.summary.total)*100)}%`);
  console.log('\n🌐 Open test-dashboard.html in your browser to view detailed results');
}).catch(console.error);
