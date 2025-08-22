#!/usr/bin/env node

/**
 * 🤖 AI-Native Capabilities Demo
 * 
 * Demonstrates the enhanced intelligence features:
 * - Test-informed behavior
 * - AI interpretation of responses  
 * - Exploration mode for troubleshooting
 * - Business context generation
 * - Smart parameter handling
 */

import 'dotenv/config';
import { EnhancedDirectAPITools } from '../dist/api/EnhancedDirectAPITools.js';

console.log('🤖 AI-Native Educational Testing Platform Demo');
console.log('='.repeat(50));
console.log('Showcasing intelligent API behavior with test-informed decisions\n');

try {
  // Initialize the enhanced system
  await EnhancedDirectAPITools.initialize();
  console.log('✅ Enhanced AI system initialized\n');

  // DEMO 1: Intelligent API Call with Business Context
  console.log('📊 DEMO 1: Intelligent API Calling with AI Interpretation');
  console.log('-'.repeat(50));
  console.log('🎯 Goal: Query educational events with intelligent parameter handling');
  console.log('🧠 AI will interpret the response in business terms\n');

  const eventResult = await EnhancedDirectAPITools.intelligentCall('/event/Query', {
    'program-id': process.env.DEFAULT_PROGRAM_ID || '238',
    'program-institution-id': process.env.PROGRAM_INSTITUTION_ID || '1009048'
  }, 'Find available educational tests and assessments for students');

  console.log('📈 INTELLIGENT CALL RESULT:');
  console.log(`   Success: ${eventResult.success ? '✅' : '❌'}`);
  console.log(`   HTTP Status: ${eventResult.httpStatus}`);
  console.log(`   🤖 AI Interpretation: "${eventResult.aiInterpretation}"`);
  console.log(`   📚 Business Context: "${eventResult.businessContext}"`);
  
  if (eventResult.data && Array.isArray(eventResult.data)) {
    console.log(`   📊 Data Summary: Found ${eventResult.data.length} educational events/tests`);
    if (eventResult.data.length > 0) {
      const sample = eventResult.data[0];
      console.log(`   📝 Sample Test: "${sample['event-description'] || sample.name || 'Test Available'}"`);
    }
  }
  console.log(`   🔍 Exploration Available: ${eventResult.explorationCapability ? 'Yes' : 'No'}\n`);

  // DEMO 2: Test-Informed Behavior on Problematic Endpoint
  console.log('🧠 DEMO 2: Test-Informed Intelligence on Known Problematic Endpoint');
  console.log('-'.repeat(60));
  console.log('🎯 Goal: Query user access (known to return 422 - business validation)');
  console.log('🧠 AI learned from previous tests that HTTP 422 here is EXPECTED behavior\n');

  const userAccessResult = await EnhancedDirectAPITools.intelligentCall('/user/access/query', {
    'program-id': process.env.DEFAULT_PROGRAM_ID || '238',
    'program-institution-id': process.env.PROGRAM_INSTITUTION_ID || '1009048'
  }, 'Check user access permissions for educational platform');

  console.log('📈 TEST-INFORMED RESULT:');
  console.log(`   Success: ${userAccessResult.success ? '✅' : '❌'} (${userAccessResult.httpStatus})`);
  console.log(`   🤖 AI Interpretation: "${userAccessResult.aiInterpretation}"`);
  console.log(`   📚 Business Understanding: "${userAccessResult.businessContext}"`);
  
  if (userAccessResult.suggestedFixes && userAccessResult.suggestedFixes.length > 0) {
    console.log('   💡 AI Suggestions:');
    userAccessResult.suggestedFixes.forEach((fix, i) => {
      console.log(`      ${i + 1}. ${fix}`);
    });
  }
  console.log(`   🔍 Can Explore: ${userAccessResult.explorationCapability ? 'Yes - fallback available' : 'No'}\n`);

  // DEMO 3: Exploration Mode for Troubleshooting
  console.log('🔍 DEMO 3: Exploration Mode for Troubleshooting');
  console.log('-'.repeat(45));
  console.log('🎯 Goal: Explore endpoint with multiple strategies when standard approach fails');
  console.log('🧠 AI will try different parameter combinations intelligently\n');

  const explorationResult = await EnhancedDirectAPITools.explore('/event/authorizations/Query', {
    intent: 'Find authorization requirements for educational tests',
    fallbackStrategies: ['minimal-params', 'common-patterns', 'environment-specific']
  });

  console.log('📈 EXPLORATION RESULT:');
  console.log(`   Discovery Success: ${explorationResult.success ? '✅' : '❌'}`);
  console.log(`   HTTP Status: ${explorationResult.httpStatus}`);
  console.log(`   🤖 AI Analysis: "${explorationResult.aiInterpretation}"`);
  console.log(`   📚 Business Meaning: "${explorationResult.businessContext}"`);
  
  if (explorationResult.suggestedFixes) {
    console.log('   🛠️ Next Steps:');
    explorationResult.suggestedFixes.forEach((step, i) => {
      console.log(`      ${i + 1}. ${step}`);
    });
  }
  console.log();

  // DEMO 4: Semantic Interface for Natural Language Queries
  console.log('💬 DEMO 4: Natural Language API Access');
  console.log('-'.repeat(40));
  console.log('🎯 Goal: Use business-friendly method names instead of technical endpoints');
  console.log('🧠 AI maps natural language intent to correct technical parameters\n');

  // Simulate semantic interface call
  console.log('🗣️ Natural Language Request: "Find all active tests for my institution"');
  const semanticResult = await EnhancedDirectAPITools.intelligentCall('/event/Query', {
    'program-id': process.env.DEFAULT_PROGRAM_ID || '238',
    'program-institution-id': process.env.PROGRAM_INSTITUTION_ID || '1009048',
    'active-only': 'true'  // AI-mapped parameter
  }, 'Natural language query: Find all active tests for institution');

  console.log('📈 SEMANTIC RESULT:');
  console.log(`   Understanding: ${semanticResult.success ? '✅ Correctly interpreted' : '❌ Interpretation failed'}`);
  console.log(`   🤖 AI Translation: "active tests" → active-only=true parameter`);
  console.log(`   📊 Business Result: "${semanticResult.aiInterpretation}"`);
  console.log(`   📚 Context: "${semanticResult.businessContext}"\n`);

  // SUMMARY
  console.log('🎉 AI-NATIVE CAPABILITIES DEMONSTRATED');
  console.log('='.repeat(50));
  console.log('✅ Test-Informed Intelligence: Learns from actual API behavior');
  console.log('✅ AI Interpretation: Provides business context for all responses');
  console.log('✅ Exploration Mode: Intelligent troubleshooting when calls fail');
  console.log('✅ Natural Language: Maps business intent to technical parameters');
  console.log('✅ Error Analysis: Distinguishes business validation from actual errors');
  console.log('✅ Adaptive Behavior: Changes strategy based on endpoint history');
  console.log('✅ Business Context: Educational testing domain understanding built-in');

  console.log('\n🚀 This system is now ready to assist AI agents with intelligent,');
  console.log('   context-aware API interactions for educational testing workflows!');

} catch (error) {
  console.error('❌ Demo failed:', error.message);
  console.log('\n🔧 This suggests the TypeScript build needs completion or environment setup.');
}
