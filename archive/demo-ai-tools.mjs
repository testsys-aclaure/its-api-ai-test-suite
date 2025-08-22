#!/usr/bin/env node
/**
 * Demo: Direct API Tools for AI Agents
 * Shows how AI assistants can make instant API requests
 */

import { config } from 'dotenv';
config();

// Import the direct API tools (Note: Will need to adjust import based on build)
import { 
  makeAPIRequest, 
  semanticQuery, 
  discoverAPI 
} from './src/tools/direct-api-tools.js';

console.log('🤖 AI Agent API Demo - Direct Request Tools');
console.log('==========================================\n');

async function demonstrateAITools() {
  try {
    // Demo 1: Direct API Request (like a precise AI agent)
    console.log('📞 DEMO 1: Direct API Request');
    console.log('AI Agent: "I need events for program 238 with limit 3"');
    
    const directResult = await makeAPIRequest('/event/query', 'GET', {
      'program-id': '238',
      'program-institution-id': '1009048',
      'limit': '3'
    });
    
    if (directResult.success) {
      console.log(`✅ Got ${directResult.metadata.count} events`);
      console.log('💡 Business Context:', directResult.businessContext);
      if (directResult.data?.length > 0) {
        console.log('📝 First Event:', directResult.data[0].name || directResult.data[0].title || 'Unnamed');
      }
    } else {
      console.log('❌ Request failed:', directResult.error.message);
      console.log('🔧 Troubleshooting:', directResult.error.troubleshooting);
    }

    console.log('\n---\n');

    // Demo 2: Semantic Query (natural language)
    console.log('🧠 DEMO 2: Semantic Query (Natural Language)');
    console.log('User: "Show me active events"');
    console.log('AI Agent processes: "find active events"');
    
    const semanticResult = await semanticQuery('find active events', {
      program: '238',
      institution: '1009048',
      limit: 5
    });
    
    if (semanticResult.success) {
      console.log(`✅ Semantic query successful - ${semanticResult.metadata.count} items`);
      console.log('💡 Business Interpretation:', semanticResult.businessContext);
    } else {
      console.log('❌ Semantic query failed:', semanticResult.error.message);
    }

    console.log('\n---\n');

    // Demo 3: API Discovery  
    console.log('🔍 DEMO 3: API Capability Discovery');
    console.log('AI Agent: "What can I do with events?"');
    
    const discoveryResult = await discoverAPI('event');
    
    if (discoveryResult.success) {
      console.log(`✅ Found ${discoveryResult.results.totalCount} event-related operations`);
      console.log('🏢 Available Domains:', discoveryResult.results.domains.join(', '));
      console.log('⚡ Business Capabilities:');
      discoveryResult.results.businessCapabilities.forEach((cap) => {
        console.log(`   • ${cap}`);
      });
    } else {
      console.log('❌ Discovery failed:', discoveryResult.error);
    }

    console.log('\n---\n');

    // Demo 4: Teams-Style Conversation Simulation
    console.log('💬 DEMO 4: Microsoft Teams Conversation Simulation');
    console.log('User: "Get classes for event 1"');
    
    const teamsResult = await semanticQuery('get classes for event 1', {
      program: '238',
      institution: '1009048', 
      event: '1'
    });
    
    if (teamsResult.success) {
      console.log(`Teams Bot: "Found ${teamsResult.metadata.count} class sessions for event 1"`);
      console.log(`Teams Bot: "${teamsResult.businessContext}"`);
      
      if (teamsResult.data?.length > 0) {
        console.log('Teams Bot: "Here are the details:"');
        console.log(`   📅 First Class: ${JSON.stringify(teamsResult.data[0], null, 2)}`);
      }
    } else {
      console.log('Teams Bot: "I encountered an issue:"');
      console.log(`Teams Bot: "${teamsResult.error.businessContext}"`);
      console.log('Teams Bot: "Here are some suggestions:"');
      teamsResult.error.troubleshooting?.forEach((tip) => {
        console.log(`   💡 ${tip}`);
      });
    }

    console.log('\n🎉 DEMO COMPLETE');
    console.log('🔮 This shows how AI agents can:');
    console.log('   ✅ Make instant authenticated API requests');
    console.log('   ✅ Process natural language queries');
    console.log('   ✅ Provide business-friendly responses');
    console.log('   ✅ Handle errors with helpful context');
    console.log('   ✅ Discover API capabilities on demand');

  } catch (error) {
    console.error('💥 Demo failed:', error);
    console.error('🔧 Check your .env file has CLIENT_ID and CLIENT_SECRET');
  }
}

// Run the demo
demonstrateAITools().catch(console.error);
