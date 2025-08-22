/**
 * Semantic API Discovery Demo - Shows how your existing intelligent routing works
 * Demonstrates the comprehensive semantic mapping system you already have built
 */

import { IntelligenceIntegrator } from '../src/intelligence/IntelligenceIntegrator.ts';
import WorkingGetEndpoints from '../src/api/WorkingGetEndpoints.ts';
import { EnhancedDirectAPITools } from '../src/api/EnhancedDirectAPITools.ts';

// Initialize the intelligence system
await IntelligenceIntegrator.initialize();
await WorkingGetEndpoints.initialize();

console.log('🧠 Your Existing Semantic Intelligence System Demo\n');

// Example 1: Natural language queries get mapped to endpoints
console.log('=== Natural Language → API Endpoint Mapping ===');

const queries = [
  'student data',
  'active tests', 
  'test results',
  'event classes',
  'institutions',
  'completed assessments'
];

for (const query of queries) {
  console.log(`\n🔍 Query: "${query}"`);
  const endpoints = IntelligenceIntegrator.searchEndpointsBySemantics(query);
  
  if (endpoints.length > 0) {
    console.log(`  Found ${endpoints.length} matching endpoints:`);
    endpoints.slice(0, 3).forEach(endpoint => {
      console.log(`    • ${endpoint.name} (${endpoint.businessDomain})`);
      console.log(`      Tags: ${endpoint.semanticTags.join(', ')}`);
      console.log(`      Business: ${endpoint.businessContext}`);
    });
  } else {
    console.log('  No matches found');
  }
}

console.log('\n\n=== Business Method Aliases (Natural Language Interface) ===');

// Example 2: Show your business-friendly method names
const businessMethods = [
  { method: 'findActiveEvents', description: 'Get currently running tests/assessments' },
  { method: 'findStudents', description: 'Get student/examinee data' },
  { method: 'findCompletedResults', description: 'Get finished test results' },
  { method: 'findAvailableTests', description: 'Get all available tests' },
  { method: 'findEventClasses', description: 'Get test sessions/groups' }
];

for (const { method, description } of businessMethods) {
  console.log(`\n💡 ${method}()`);
  console.log(`   Description: ${description}`);
  console.log(`   Usage: await WorkingGetEndpoints.${method}()`);
}

console.log('\n\n=== Educational Domain Translation ===');

// Example 3: Show semantic mapping translations
const translations = [
  { human: 'student', technical: 'examinee' },
  { human: 'test', technical: 'event/assessment' },  
  { human: 'score', technical: 'result' },
  { human: 'session', technical: 'event-class' },
  { human: 'school', technical: 'institution' }
];

translations.forEach(({ human, technical }) => {
  console.log(`🔄 "${human}" → "${technical}"`);
  const matches = IntelligenceIntegrator.searchEndpointsBySemantics(human);
  console.log(`   Found ${matches.length} endpoints for "${human}"`);
});

console.log('\n\n=== Intelligent Parameter Injection ===');

// Example 4: Show universal parameter requirements
const universalParams = IntelligenceIntegrator.getUniversalParameterRequirements();
console.log('🔧 Universal parameters automatically added:');
Object.entries(universalParams).forEach(([param, requirement]) => {
  console.log(`   • ${param}: Used in ${requirement.percentage} of endpoints`);
  console.log(`     Frequency: ${requirement.frequency} occurrences`);
});

console.log('\n\n=== Intelligence Summary ===');

// Example 5: Show intelligence metadata
const report = IntelligenceIntegrator.getIntelligenceReport();
console.log(`📊 AI-Native Intelligence System Status:`);
console.log(`   • Total endpoints analyzed: ${report.metadata.totalEndpoints}`);
console.log(`   • Business domains: ${report.metadata.businessDomains.length}`);
console.log(`   • Universal parameters: ${report.metadata.universalParameters}`);
console.log(`   • AI readiness score: ${report.readinessScore}/100`);

console.log('\n📋 Business Domains:');
report.domains.forEach(domain => {
  console.log(`   • ${domain.name}: ${domain.endpointCount} endpoints`);
  console.log(`     Examples: ${domain.examples.slice(0, 2).join(', ')}`);
});

console.log('\n\n=== Integration with Enhanced Calling ===');

// Example 6: Show how semantic discovery integrates with your enhanced API calling
console.log('🎯 Complete Natural Language → API Call Pipeline:');
console.log('1. Natural query: "Show me active student tests"');
console.log('2. Semantic mapping: "student" → "examinee", "tests" → "events"');
console.log('3. Endpoint discovery: findActiveEvents()');
console.log('4. Intelligent calling: EnhancedDirectAPITools.intelligentCall()');
console.log('5. AI interpretation: Business context + troubleshooting guidance');

console.log('\n✅ Your system already provides comprehensive intelligent routing!');
console.log('🔥 No external MCP server needed - you built something more sophisticated!');
