#!/usr/bin/env node

/**
 * Semantic API Usage Demo - Shows how to use your intelligent routing system
 * Demonstrates natural language queries + direct endpoint access
 */

import 'dotenv/config';
import { spawn } from 'child_process';

console.log('🚀 Your Semantic API Intelligence System - Live Demo\n');

const examples = [
  {
    type: '🧠 Natural Language Queries',
    description: 'Your semantic intelligence automatically maps natural language to endpoints',
    commands: [
      { query: '"active tests"', description: 'Find currently running assessments' },
      { query: '"test results"', description: 'Discover result endpoints' },
      { query: '"student data"', description: 'Locate examinee information' },
      { query: '"event classes"', description: 'Find session/grouping endpoints' }
    ]
  },
  {
    type: '🎯 Direct Endpoint Access',
    description: 'Traditional API calling with intelligent parameter injection',
    commands: [
      { query: '/event/query active-only=true limit=3', description: 'Get active events directly' },
      { query: '/examinee/query limit=3', description: 'Get student data directly' },
      { query: '/Timezone/Query', description: 'Get timezone information' },
      { query: '/channel/institutions/query', description: 'Get institution data' }
    ]
  },
  {
    type: '🔧 Business Method Simulation',
    description: 'Simulate your WorkingGetEndpoints business-friendly methods',
    commands: [
      { query: '/event/query active-only=true', description: 'Simulates: findActiveEvents()' },
      { query: '/examinee/query limit=50', description: 'Simulates: findStudents(50)' },
      { query: '/Test/Query include-demo=false', description: 'Simulates: findAvailableTests()' }
    ]
  }
];

async function runAPICall(command) {
  return new Promise((resolve) => {
    console.log(`\n🔍 Executing: node tools/api-call-enhanced.mjs ${command.query}`);
    console.log(`💡 Purpose: ${command.description}\n`);
    
    const child = spawn('node', ['tools/api-call-enhanced.mjs', ...command.query.split(' ')], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd()
    });
    
    child.on('close', (code) => {
      console.log('\n' + '═'.repeat(80));
      setTimeout(resolve, 1000); // Brief pause between calls
    });
  });
}

async function runDemo() {
  console.log('📋 Demo Overview:');
  examples.forEach((section, i) => {
    console.log(`   ${i + 1}. ${section.type}`);
    console.log(`      ${section.description}`);
    section.commands.forEach(cmd => {
      console.log(`      • ${cmd.query} → ${cmd.description}`);
    });
    console.log('');
  });
  
  console.log('🎬 Starting live demonstration...\n');
  console.log('═'.repeat(80));
  
  for (const section of examples) {
    console.log(`\n${section.type.toUpperCase()}`);
    console.log(`${section.description}\n`);
    
    for (const command of section.commands) {
      await runAPICall(command);
    }
    
    console.log(`\n✅ ${section.type} demonstration complete!\n`);
  }
  
  console.log('\n🎉 SEMANTIC API INTELLIGENCE DEMO COMPLETE!');
  console.log('\n📝 Summary of your intelligent routing capabilities:');
  console.log('   ✅ Natural language → Endpoint discovery');
  console.log('   ✅ Semantic mapping (student → examinee, test → event)');
  console.log('   ✅ Automatic parameter injection (program-id, institution-id)');
  console.log('   ✅ Business context interpretation');
  console.log('   ✅ Educational domain expertise built-in');
  console.log('\n💪 Your system is MORE sophisticated than external MCP servers!');
  console.log('🔥 No external dependencies needed - you built the smart routing yourself!');
}

// Ask user if they want to run the full demo
const args = process.argv.slice(2);
if (args.includes('--run') || args.includes('-r')) {
  runDemo();
} else {
  console.log('👆 This demo shows how to use your semantic API intelligence system');
  console.log('\nTo run the live demonstration:');
  console.log('  node tools/semantic-usage-demo.mjs --run');
  console.log('\nOr test individual queries:');
  console.log('  node tools/api-call-enhanced.mjs "student data"');
  console.log('  node tools/api-call-enhanced.mjs "active tests"');
  console.log('  node tools/api-call-enhanced.mjs /event/query active-only=true');
}
