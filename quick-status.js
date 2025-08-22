/**
 * Quick API Progress Status - Focus on Real Implementation Progress
 */

import { readFileSync, existsSync } from 'fs';

const PROGRESS_FILE = 'api-progress.json';
const DASHBOARD_FILE = 'test-dashboard.html';

console.log('\n🎯 AI-NATIVE EDUCATIONAL TESTING PLATFORM');
console.log('='.repeat(60));

if (!existsSync(PROGRESS_FILE)) {
  console.log('❌ No API progress data found. Run: npx playwright test');
  process.exit(1);
}

try {
  const progress = JSON.parse(readFileSync(PROGRESS_FILE, 'utf8'));
  const timestamp = new Date(progress.timestamp).toLocaleString();
  
  // Core Implementation Progress
  console.log(`📅 Last Run: ${timestamp}`);
  console.log(`⏱️  Duration: ${progress.duration}s`);
  console.log(`📊 API Progress: ${progress.progress.implemented}/${progress.progress.total} endpoints (${progress.progress.percentage}%)`);
  
  // Implementation Status
  const statusIcon = progress.progress.percentage >= 50 ? '🟢' : 
                    progress.progress.percentage >= 25 ? '🟡' : '�';
  console.log(`\n${statusIcon} IMPLEMENTATION STATUS: ${progress.progress.remaining} endpoints remaining`);
  
  // Real Working Endpoints
  if (progress.endpoints && progress.endpoints.length > 0) {
    console.log(`\n� WORKING ENDPOINTS:`);
    progress.endpoints.forEach(endpoint => {
      const httpIcon = endpoint.httpStatus === 200 ? '🟢' : 
                      endpoint.httpStatus === 422 ? '🟡' : '🔴';
      const testIcon = endpoint.testPassed ? '✅' : '❌';
      console.log(`  ${testIcon} ${httpIcon} ${endpoint.name}`);
      console.log(`     └─ ${endpoint.summary}`);
    });
  }
  
  // Summary Stats
  if (progress.summary) {
    console.log(`\n📋 ENDPOINT BREAKDOWN:`);
    console.log(`  🟢 Production Ready: ${progress.summary.readyForProduction}`);
    console.log(`  🟡 Business Validation: ${progress.summary.businessValidation}`);
    console.log(`  🔴 Failing: ${progress.summary.failing}`);
  }
  
  // Next Steps
  console.log(`\n📋 QUICK ACTIONS:`);
  console.log(`  🌐 View Dashboard: file://${process.cwd().replace(/\\/g, '/')}/${DASHBOARD_FILE}`);
  console.log(`  🔄 Re-run Tests: npx playwright test`);
  console.log(`  🎯 Next: Implement ${progress.progress.remaining} remaining GET endpoints`);
  
} catch (error) {
  console.error('❌ Error reading API progress:', error.message);
}

console.log('='.repeat(60));
