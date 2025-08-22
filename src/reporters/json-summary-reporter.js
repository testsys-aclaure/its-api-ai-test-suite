/**
 * Simple JSON Test Summary Reporter
 * Generates quick test summary for CLI review
 */

import { writeFileSync } from 'fs';

export default class JsonSummaryReporter {
  constructor(options = {}) {
    this.outputFile = options.outputFile || 'test-summary.json';
    this.results = [];
    this.startTime = null;
    this.endTime = null;
    this.apiResults = [];
  }

  onBegin(config, suite) {
    this.startTime = new Date();
  }

  onTestEnd(test, result) {
    // Capture ONLY REAL API SUCCESS tests - the ones that matter for progress tracking
    if (test.title.includes('REAL API SUCCESS')) {
      const stdout = result.stdout?.map(chunk => chunk.text).join('') || '';
      
      // Extract endpoint from suite name more reliably
      let endpoint = 'Unknown Endpoint';
      let httpStatus = null;
      let resultInfo = '';
      
      const suite = test.parent.title.toLowerCase();
      
      // Map suite names to actual endpoints
      if (suite.includes('event authorization')) {
        endpoint = 'Event/authorizations/Query';
        // Look for the specific success patterns
        if (stdout.includes('Real API Success (No auth records for event)') || stdout.includes('422')) {
          httpStatus = 422;
          resultInfo = 'Business validation - No auth records';
        } else if (stdout.includes('Real API Success')) {
          httpStatus = 200;
          resultInfo = 'Authorization data retrieved';
        }
      } else if (suite.includes('event query') || suite.includes('event ')) {
        endpoint = 'Event/Query';
        const eventMatch = stdout.match(/Found (\d+) events/);
        if (eventMatch) {
          httpStatus = 200;
          resultInfo = `${eventMatch[1]} events retrieved`;
        }
      } else if (suite.includes('event class')) {
        endpoint = 'EventClass/Query';
        if (stdout.includes('Real API Success')) {
          httpStatus = 200;
          resultInfo = 'Event class data retrieved';
        }
      }
      
      // Only add if we have real API test data
      if (httpStatus !== null) {
        this.apiResults.push({
          endpoint,
          status: result.status,
          httpStatus,
          resultInfo,
          duration: result.duration,
          suite: test.parent.title
        });
      }
    }
    
    this.results.push({
      title: test.title,
      suite: test.parent.title,
      status: result.status,
      duration: result.duration,
      isApiTest: test.title.includes('REAL API SUCCESS') || test.title.includes('HTTP status')
    });
  }

  onEnd() {
    this.endTime = new Date();
    this.generateSummary();
  }

  generateSummary() {
    const duration = this.endTime - this.startTime;
    const stats = this.results.reduce((acc, test) => {
      acc.total++;
      acc[test.status] = (acc[test.status] || 0) + 1;
      if (test.isApiTest && test.status === 'passed') acc.apiSuccesses++;
      if (test.isApiTest) acc.apiTests++;
      return acc;
    }, { total: 0, passed: 0, failed: 0, skipped: 0, apiTests: 0, apiSuccesses: 0 });

    const summary = {
      timestamp: this.endTime.toISOString(),
      duration: Math.round(duration / 1000),
      stats: {
        total: stats.total,
        passed: stats.passed || 0,
        failed: stats.failed || 0,
        skipped: stats.skipped || 0,
        successRate: stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0,
        apiTests: stats.apiTests,
        apiSuccesses: stats.apiSuccesses,
        apiSuccessRate: stats.apiTests > 0 ? Math.round((stats.apiSuccesses / stats.apiTests) * 100) : 0
      },
      endpoints: this.apiResults.map(api => ({
        name: api.endpoint,
        status: api.httpStatus,
        testStatus: api.status,
        info: api.resultInfo,
        duration: api.duration
      })),
      foundation: {
        implemented: this.apiResults.length,
        total: 37,
        progress: Math.round((this.apiResults.length / 37) * 100)
      }
    };

    writeFileSync(this.outputFile, JSON.stringify(summary, null, 2));
    
    // Also output to console for quick review
    console.log('\n🎯 AI-NATIVE TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`📊 Overall: ${stats.passed}/${stats.total} tests passed (${summary.stats.successRate}%)`);
    console.log(`🚀 API Tests: ${stats.apiSuccesses}/${stats.apiTests} passed (${summary.stats.apiSuccessRate}%)`);
    console.log(`⏱️  Duration: ${summary.duration}s`);
    console.log(`📈 Progress: ${this.apiResults.length}/37 endpoints (${summary.foundation.progress}%)`);
    
    if (this.apiResults.length > 0) {
      console.log('\n🔗 ENDPOINT STATUS:');
      this.apiResults.forEach(api => {
        const statusIcon = api.testStatus === 'passed' ? '✅' : '❌';
        const httpIcon = api.httpStatus === 200 ? '🟢' : api.httpStatus === 422 ? '🟡' : '🔴';
        console.log(`  ${statusIcon} ${httpIcon} ${api.endpoint} (HTTP ${api.httpStatus}) - ${api.info}`);
      });
    }
    
    console.log(`\n📄 Detailed report: ${this.outputFile}`);
    console.log('='.repeat(50));
  }
}
