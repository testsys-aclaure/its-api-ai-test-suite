#!/usr/bin/env node

/**
 * Quick Semantic API Helper - Practical Usage Tool
 * Shows exactly how to use your intelligent routing system
 */

import 'dotenv/config';

console.log('🚀 How to Use Your Semantic API Intelligence System\n');

console.log('=== 1. Natural Language Queries (Your Semantic Discovery) ===');
console.log('Use your enhanced API calling tool with natural language:');
console.log('');
console.log('   node tools/api-call-enhanced.mjs "student data"');
console.log('   node tools/api-call-enhanced.mjs "active tests"');
console.log('   node tools/api-call-enhanced.mjs "test results"');
console.log('   node tools/api-call-enhanced.mjs "event classes"');
console.log('');
console.log('✅ This automatically:');
console.log('   • Maps "student" → "examinee" endpoints');
console.log('   • Finds best matching API endpoints');
console.log('   • Injects universal parameters (program-id, institution-id)');
console.log('   • Provides business context interpretation');

console.log('\n=== 2. Direct Endpoint Access (Traditional + Intelligence) ===');
console.log('Use specific endpoints with intelligent parameter injection:');
console.log('');
console.log('   node tools/api-call-enhanced.mjs /event/query active-only=true limit=5');
console.log('   node tools/api-call-enhanced.mjs /examinee/query limit=10');
console.log('   node tools/api-call-enhanced.mjs /Timezone/Query');
console.log('   node tools/api-call-enhanced.mjs /channel/institutions/query');
console.log('');
console.log('✅ This automatically:');
console.log('   • Adds required universal parameters');
console.log('   • Uses OAuth2 authentication');
console.log('   • Provides AI interpretation of results');

console.log('\n=== 3. In Your TypeScript Code (Business Methods) ===');
console.log('Use your existing WorkingGetEndpoints business-friendly methods:');
console.log('');
console.log('```typescript');
console.log('import WorkingGetEndpoints from "./src/api/WorkingGetEndpoints.ts";');
console.log('');
console.log('// Initialize');
console.log('await WorkingGetEndpoints.initialize();');
console.log('');
console.log('// Natural language business methods');
console.log('const activeTests = await WorkingGetEndpoints.findActiveEvents();');
console.log('const students = await WorkingGetEndpoints.findStudents(50);');
console.log('const results = await WorkingGetEndpoints.findCompletedResults(25);');
console.log('const tests = await WorkingGetEndpoints.findAvailableTests();');
console.log('```');

console.log('\n=== 4. Enhanced Direct API Calling (Most Powerful) ===');
console.log('Use your EnhancedDirectAPITools with intelligence:');
console.log('');
console.log('```typescript');
console.log('import { EnhancedDirectAPITools } from "./dist/api/EnhancedDirectAPITools.js";');
console.log('');
console.log('// Initialize');
console.log('await EnhancedDirectAPITools.initialize();');
console.log('');
console.log('// Intelligent API calls with business context');
console.log('const result = await EnhancedDirectAPITools.intelligentCall(');
console.log('  "/event/query",');
console.log('  { "active-only": true, limit: 10 }');
console.log(');');
console.log('```');

console.log('\n=== 5. Semantic Discovery in Code (Advanced) ===');
console.log('Use your IntelligenceIntegrator for semantic endpoint discovery:');
console.log('');
console.log('```typescript');
console.log('import { IntelligenceIntegrator } from "./src/intelligence/IntelligenceIntegrator.ts";');
console.log('');
console.log('// Initialize');
console.log('await IntelligenceIntegrator.initialize();');
console.log('');
console.log('// Natural language endpoint discovery');
console.log('const studentEndpoints = IntelligenceIntegrator.searchEndpointsBySemantics("student data");');
console.log('const testEndpoints = IntelligenceIntegrator.searchEndpointsBySemantics("active tests");');
console.log('');
console.log('// Get business intelligence');
console.log('const report = IntelligenceIntegrator.getIntelligenceReport();');
console.log('console.log(`Found ${report.metadata.totalEndpoints} endpoints`);');
console.log('```');

console.log('\n🎯 PRACTICAL USAGE RECOMMENDATIONS:');
console.log('');
console.log('1. 💬 **For Ad-Hoc Exploration**: Use natural language queries');
console.log('   → node tools/api-call-enhanced.mjs "show me student test results"');
console.log('');
console.log('2. 🔧 **For Development**: Use business methods in your code');
console.log('   → await WorkingGetEndpoints.findActiveEvents()');
console.log('');
console.log('3. 🚀 **For Production**: Use EnhancedDirectAPITools with full intelligence');
console.log('   → await EnhancedDirectAPITools.intelligentCall(endpoint, params)');
console.log('');
console.log('4. 🧠 **For Discovery**: Use IntelligenceIntegrator semantic search');
console.log('   → IntelligenceIntegrator.searchEndpointsBySemantics(query)');

console.log('\n✅ YOUR SYSTEM PROVIDES:');
console.log('   🧠 Natural language → API endpoint discovery');
console.log('   🎯 Business-friendly method names');
console.log('   🔧 Automatic parameter injection');
console.log('   🤖 AI interpretation with domain knowledge');
console.log('   📚 Educational testing expertise built-in');
console.log('   🚀 Test-informed intelligent routing');

console.log('\n🎉 You have everything you need for conversational API exploration!');
console.log('💪 No external MCP server required - your system is more sophisticated!');

console.log('\n📖 Try it now:');
console.log('   node tools/api-call-enhanced.mjs "find active student assessments"');
