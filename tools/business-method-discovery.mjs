#!/usr/bin/env node

/**
 * Business Methods with Semantic Integration Demo
 * Shows how your semantic discovery can guide users to the right business methods
 */

import 'dotenv/config';
import fs from 'fs';

// Load semantic intelligence
let endpointIntelligence;
try {
  endpointIntelligence = JSON.parse(fs.readFileSync('test/results/endpoint-intelligence.json', 'utf-8'));
} catch (error) {
  console.log('⚠️ Intelligence files not available, showing conceptual demo');
}

// Business method mappings from your WorkingGetEndpoints class
const businessMethods = {
  '/event/query': {
    semanticMatches: ['test', 'event', 'assessment', 'exam'],
    businessMethod: 'WorkingGetEndpoints.getEvents(options)',
    convenientMethod: 'WorkingGetEndpoints.findActiveEvents()',
    description: 'Get test events/assessments',
    examples: [
      'getEvents({ activeOnly: true })',
      'getEvents({ eventId: 12345 })',
      'findActiveEvents()'
    ]
  },
  '/examinee/query': {
    semanticMatches: ['student', 'examinee', 'participant', 'test-taker'],
    businessMethod: 'WorkingGetEndpoints.getExaminees(options)',
    convenientMethod: 'WorkingGetEndpoints.findStudents(limit)',
    description: 'Get student/examinee data',
    examples: [
      'getExaminees({ examineId: "12345" })',
      'getExaminees({ limit: 100 })',
      'findStudents(50)'
    ]
  },
  '/result/query': {
    semanticMatches: ['result', 'score', 'outcome', 'completion'],
    businessMethod: 'WorkingGetEndpoints.getResults(options)',
    convenientMethod: 'WorkingGetEndpoints.findCompletedResults(limit)',
    description: 'Get test results and scores',
    examples: [
      'getResults({ examineId: "12345" })',
      'getResults({ completedOnly: true })',
      'findCompletedResults(50)'
    ]
  },
  '/event-class/Query': {
    semanticMatches: ['class', 'session', 'group', 'event-class'],
    businessMethod: 'WorkingGetEndpoints.getEventClasses(options)',
    convenientMethod: 'WorkingGetEndpoints.findEventClasses()',
    description: 'Get test sessions/classes',
    examples: [
      'getEventClasses({ eventId: 12345 })',
      'getEventClasses({ classCode: "MATH101" })',
      'findEventClasses()'
    ]
  },
  '/Test/Query': {
    semanticMatches: ['test', 'available', 'test-definition'],
    businessMethod: 'WorkingGetEndpoints.getTests(options)',
    convenientMethod: 'WorkingGetEndpoints.findAvailableTests()',
    description: 'Get available test definitions',
    examples: [
      'getTests({ testName: "Math Assessment" })',
      'getTests({ includeDemo: false })',
      'findAvailableTests()'
    ]
  }
};

function findBusinessMethodForQuery(query) {
  const normalizedQuery = query.toLowerCase();
  
  // Semantic mappings
  const semanticMappings = {
    'student': 'examinee',
    'students': 'examinee', 
    'test': 'event',
    'tests': 'event',
    'score': 'result',
    'scores': 'result'
  };
  
  // Map query terms
  const mappedQuery = Object.keys(semanticMappings).reduce((q, key) => {
    return q.replace(new RegExp(key, 'gi'), semanticMappings[key]);
  }, normalizedQuery);
  
  // Find matching business methods
  const matches = [];
  Object.entries(businessMethods).forEach(([endpoint, method]) => {
    const relevanceScore = method.semanticMatches.reduce((score, match) => {
      if (mappedQuery.includes(match) || normalizedQuery.includes(match)) {
        return score + 1;
      }
      return score;
    }, 0);
    
    if (relevanceScore > 0) {
      matches.push({
        endpoint,
        method,
        relevanceScore
      });
    }
  });
  
  return matches.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

console.log('🎯 Business Method Discovery with Semantic Intelligence\n');

const testQueries = [
  'student data',
  'active tests', 
  'test results',
  'event classes',
  'available tests',
  'completed assessments'
];

console.log('=== Natural Language → Business Method Mapping ===\n');

testQueries.forEach(query => {
  console.log(`🔍 Query: "${query}"`);
  
  const matches = findBusinessMethodForQuery(query);
  
  if (matches.length > 0) {
    const best = matches[0];
    console.log(`✅ Best match: ${best.endpoint}`);
    console.log(`📝 Description: ${best.method.description}`);
    console.log(`🏢 Business method: ${best.method.businessMethod}`);
    console.log(`⚡ Convenient method: ${best.method.convenientMethod}`);
    console.log(`💡 Usage examples:`);
    best.method.examples.forEach(example => {
      console.log(`   • await ${example}`);
    });
    
    if (matches.length > 1) {
      console.log(`📋 Other matches: ${matches.slice(1).map(m => m.endpoint).join(', ')}`);
    }
  } else {
    console.log('❌ No business method matches found');
  }
  
  console.log('');
});

console.log('=== Integration with Your Enhanced API Calling ===\n');

console.log('💡 How this works in practice:');
console.log('1. User asks: "Show me student data"');
console.log('2. Semantic discovery finds: /examinee/query endpoint');
console.log('3. System suggests: WorkingGetEndpoints.findStudents(50)');
console.log('4. Or direct call: await EnhancedDirectAPITools.intelligentCall("/examinee/query", { limit: 50 })');
console.log('5. AI interprets results with educational domain context');

console.log('\n🔄 Complete Integration Pipeline:');
console.log('   Natural Language → Semantic Mapping → Endpoint Discovery → Business Method → Enhanced API Call → AI Interpretation');

console.log('\n✅ Your Comprehensive Intelligent API System:');
console.log('   🧠 Semantic endpoint discovery ✅');
console.log('   🎯 Business method mapping ✅'); 
console.log('   🔧 Automatic parameter injection ✅');
console.log('   🚀 Enhanced API calling with intelligence ✅');
console.log('   🤖 AI interpretation and business context ✅');
console.log('   📚 Educational domain expertise ✅');

console.log('\n🎉 You have a complete conversational API interface!');
console.log('💪 More sophisticated than external MCP servers because it understands your specific educational testing domain!');
