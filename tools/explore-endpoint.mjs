#!/usr/bin/env node

/**
 * Quick Exploration Tool for AI-Native API Testing
 * 
 * Enables one-off exploration of endpoints for troubleshooting and discovery.
 * Uses test-informed intelligence when available, explores intelligently when not.
 */

import 'dotenv/config';
import { EnhancedDirectAPITools } from '../dist/api/EnhancedDirectAPITools.js';

// Get command line arguments
const args = process.argv.slice(2);
const endpoint = args[0];
const userIntent = args.slice(1).join(' ') || 'exploration';

async function exploreEndpoint(endpointPath, intent = 'general exploration') {
  console.log('🔍 AI-Guided API Exploration Tool');
  console.log('═══════════════════════════════════\n');
  
  if (!endpointPath) {
    console.log('❌ Usage: node explore-endpoint.mjs <endpoint> [user-intent]');
    console.log('\nExamples:');
    console.log('  node explore-endpoint.mjs /user/query "get user permissions"');
    console.log('  node explore-endpoint.mjs /event/query "find available tests"');
    console.log('  node explore-endpoint.mjs /examinee/query');
    process.exit(1);
  }

  try {
    console.log(`📝 Endpoint: ${endpointPath}`);
    console.log(`🎯 Intent: ${intent}`);
    console.log('─'.repeat(50));
    
    // Initialize API tools
    await EnhancedDirectAPITools.initialize();
    
    // Try intelligent call first
    console.log('\n🧠 Step 1: Attempting intelligent call with test knowledge...');
    const intelligentResult = await EnhancedDirectAPITools.intelligentCall(endpointPath, {}, intent);
    
    if (intelligentResult.success) {
      console.log('✅ SUCCESS with intelligent call!');
      displayResult(intelligentResult);
      return;
    }
    
    console.log('⚠️ Intelligent call failed, proceeding to exploration...');
    
    // If intelligent call fails, use exploration mode
    console.log('\n🔍 Step 2: Exploring endpoint behavior...');
    const explorationResult = await EnhancedDirectAPITools.explore(endpointPath, intent);
    
    displayResult(explorationResult);
    
  } catch (error) {
    console.error('❌ Exploration failed:', error.message);
    console.log('\n💡 Suggestions:');
    console.log('  • Check if the endpoint path is correct');
    console.log('  • Verify environment configuration');
    console.log('  • Try running the test dashboard first: node generate-test-dashboard.mjs');
  }
}

function displayResult(result) {
  console.log('\n📊 EXPLORATION RESULTS');
  console.log('═'.repeat(50));
  
  // Basic result info
  console.log(`Status: ${result.success ? '✅ SUCCESS' : '❌ FAILED'}`);
  if (result.metadata?.httpStatus) {
    console.log(`HTTP Status: ${result.metadata.httpStatus}`);
  }
  
  // AI Interpretation
  if (result.aiInterpretation) {
    console.log('\n🧠 AI INTERPRETATION:');
    console.log(`• Test Informed: ${result.aiInterpretation.testInformed ? 'Yes' : 'No'}`);
    console.log(`• Expected Behavior: ${result.aiInterpretation.expectedBehavior ? 'Yes' : 'No'}`);
    console.log(`• Business Meaning: ${result.aiInterpretation.businessMeaning}`);
    
    if (result.aiInterpretation.guidance) {
      console.log('\n📋 AI GUIDANCE:');
      console.log(`• When to Use: ${result.aiInterpretation.guidance.whenToUse}`);
      console.log(`• Business Context: ${result.aiInterpretation.guidance.businessContext}`);
      
      if (result.aiInterpretation.guidance.limitations.length > 0) {
        console.log('• Limitations:');
        result.aiInterpretation.guidance.limitations.forEach((limit) => {
          console.log(`  - ${limit}`);
        });
      }
      
      if (result.aiInterpretation.guidance.troubleshootingTips.length > 0) {
        console.log('• Troubleshooting Tips:');
        result.aiInterpretation.guidance.troubleshootingTips.forEach((tip) => {
          console.log(`  - ${tip}`);
        });
      }
    }
    
    if (result.aiInterpretation.suggestions.length > 0) {
      console.log('\n💡 PARAMETER SUGGESTIONS:');
      result.aiInterpretation.suggestions.forEach((suggestion) => {
        console.log(`• ${suggestion.reason}: ${JSON.stringify(suggestion.params)}`);
      });
    }
    
    if (result.aiInterpretation.appliedFix) {
      console.log('\n🔧 APPLIED FIX:');
      console.log(`• Fix: ${result.aiInterpretation.appliedFix.reason}`);
      console.log(`• Parameters: ${JSON.stringify(result.aiInterpretation.appliedFix.params)}`);
    }
  }
  
  // Error details
  if (!result.success && result.error) {
    console.log('\n❌ ERROR DETAILS:');
    console.log(result.error);
  }
  
  // Success data sample
  if (result.success && result.data) {
    console.log('\n📄 DATA SAMPLE:');
    if (Array.isArray(result.data)) {
      console.log(`Array with ${result.data.length} items`);
      if (result.data.length > 0) {
        console.log('First item:', JSON.stringify(result.data[0], null, 2));
      }
    } else {
      console.log(JSON.stringify(result.data, null, 2));
    }
  }
  
  // Exploration capability
  if (result.explorationCapability) {
    console.log('\n🔍 EXPLORATION STATUS:');
    console.log(`• Can Explore: ${result.explorationCapability.canExplore ? 'Yes' : 'No'}`);
    console.log(`• Command: ${result.explorationCapability.exploreCommand}`);
  }
  
  // Metadata
  if (result.metadata) {
    console.log('\n📋 TECHNICAL DETAILS:');
    console.log(`• Endpoint: ${result.metadata.endpoint}`);
    console.log(`• Response Time: ${result.metadata.responseTime}ms`);
    if (result.metadata.universalParametersApplied) {
      console.log(`• Universal Params: ${JSON.stringify(result.metadata.universalParametersApplied)}`);
    }
  }
}

// Run exploration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  exploreEndpoint(endpoint, userIntent);
}

export { exploreEndpoint };
