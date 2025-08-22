#!/usr/bin/env node

/**
 * Enhanced Architecture Validation Script
 * Enforces AI-Native standards and test-informed intelligence compliance
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 Validating Enhanced Architecture Compliance...\n');

// Validation rules based on enhanced architecture standards
const VALIDATION_RULES = {
  // Test-Informed Intelligence Requirements
  INTELLIGENCE_SYSTEM: {
    requiredFiles: [
      'src/intelligence/TestInformedIntelligence.ts'
    ],
    requiredInterfaces: [
      'interface TestResult',
      'interface EndpointBehavior', 
      'interface AIGuidance'
    ],
    requiredMethods: [
      'updateFromTestRun',
      'getAIGuidance',
      'generateEndpointBehavior'
    ]
  },
  
  // Enhanced API Client Requirements
  ENHANCED_API_CLIENT: {
    requiredFiles: [
      'src/api/EnhancedDirectAPITools.ts'
    ],
    requiredMethods: [
      'intelligentCall',
      'explore'
    ],
    forbiddenPatterns: [
      'fetch(',
      'axios(',
      'makeRequest(' // Without intelligence layer
    ]
  },
  
  // User Interface Requirements
  USER_INTERFACES: {
    requiredFiles: [
      'tools/explore-endpoint.mjs',
      'tools/generate-test-dashboard.mjs'
    ],
    requiredPatterns: [
      'intelligentCall',
      'aiInterpretation',
      'explorationCapability'
    ]
  },
  
  // Documentation Requirements
  DOCUMENTATION: {
    requiredFiles: [
      '.github/enhanced-architecture-standards.md',
      '.github/copilot-instructions.md',
      'docs/README.md'
    ]
  }
};

let validationScore = 0;
let maxScore = 0;
const violations = [];

// Helper function to check file existence
function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

// Helper function to check file content
function checkFileContent(filePath, patterns) {
  if (!checkFileExists(filePath)) return { found: [], missing: patterns };
  
  const content = fs.readFileSync(filePath, 'utf8');
  const found = patterns.filter(pattern => content.includes(pattern));
  const missing = patterns.filter(pattern => !content.includes(pattern));
  
  return { found, missing };
}

// Validate Test-Informed Intelligence System
console.log('🧠 Validating Test-Informed Intelligence System...');
maxScore += 10;

const intelligenceFiles = VALIDATION_RULES.INTELLIGENCE_SYSTEM.requiredFiles;
const intelligenceExists = intelligenceFiles.every(checkFileExists);

if (intelligenceExists) {
  console.log('  ✅ Intelligence system files present');
  validationScore += 2;
  
  const intelligenceFile = intelligenceFiles[0];
  const { found: interfaces, missing: missingInterfaces } = checkFileContent(
    intelligenceFile, 
    VALIDATION_RULES.INTELLIGENCE_SYSTEM.requiredInterfaces
  );
  
  const { found: methods, missing: missingMethods } = checkFileContent(
    intelligenceFile,
    VALIDATION_RULES.INTELLIGENCE_SYSTEM.requiredMethods
  );
  
  if (missingInterfaces.length === 0) {
    console.log('  ✅ Required interfaces implemented');
    validationScore += 4;
  } else {
    console.log(`  ❌ Missing interfaces: ${missingInterfaces.join(', ')}`);
    violations.push(`Missing required interfaces: ${missingInterfaces.join(', ')}`);
  }
  
  if (missingMethods.length === 0) {
    console.log('  ✅ Required methods implemented');
    validationScore += 4;
  } else {
    console.log(`  ❌ Missing methods: ${missingMethods.join(', ')}`);
    violations.push(`Missing required methods: ${missingMethods.join(', ')}`);
  }
} else {
  console.log('  ❌ Intelligence system files missing');
  violations.push('TestInformedIntelligence.ts file missing');
}

// Validate Enhanced API Client
console.log('\n🔧 Validating Enhanced API Client...');
maxScore += 10;

const apiFiles = VALIDATION_RULES.ENHANCED_API_CLIENT.requiredFiles;
const apiExists = apiFiles.every(checkFileExists);

if (apiExists) {
  console.log('  ✅ Enhanced API client files present');
  validationScore += 2;
  
  const apiFile = apiFiles[0];
  const { found: methods, missing: missingMethods } = checkFileContent(
    apiFile,
    VALIDATION_RULES.ENHANCED_API_CLIENT.requiredMethods
  );
  
  if (missingMethods.length === 0) {
    console.log('  ✅ Required methods implemented');
    validationScore += 4;
  } else {
    console.log(`  ❌ Missing methods: ${missingMethods.join(', ')}`);
    violations.push(`Missing API methods: ${missingMethods.join(', ')}`);
  }
  
  // Check for forbidden patterns (raw API calls)
  const content = fs.readFileSync(apiFile, 'utf8');
  const forbiddenFound = VALIDATION_RULES.ENHANCED_API_CLIENT.forbiddenPatterns.filter(
    pattern => {
      // Allow internal makeRequest method definitions and super calls
      const lines = content.split('\n');
      const patternLines = lines.filter(line => line.includes(pattern));
      
      return patternLines.some(line => 
        !line.includes(`// Allowed: ${pattern}`) &&
        !line.includes('static async makeRequest(') &&  // Method definition OK
        !line.includes('await super.makeRequest(') &&   // Super calls OK
        !line.includes('await this.makeRequest(')       // Internal calls OK
      );
    }
  );
  
  if (forbiddenFound.length === 0) {
    console.log('  ✅ No forbidden raw API patterns found');
    validationScore += 4;
  } else {
    console.log(`  ❌ Forbidden patterns found: ${forbiddenFound.join(', ')}`);
    violations.push(`Forbidden raw API patterns: ${forbiddenFound.join(', ')}`);
  }
} else {
  console.log('  ❌ Enhanced API client files missing');
  violations.push('EnhancedDirectAPITools.ts file missing');
}

// Validate User Interfaces
console.log('\n🎯 Validating User Interfaces...');
maxScore += 8;

const uiFiles = VALIDATION_RULES.USER_INTERFACES.requiredFiles;
const uiExists = uiFiles.every(checkFileExists);

if (uiExists) {
  console.log('  ✅ User interface files present');
  validationScore += 2;
  
  let uiPatternsValid = 0;
  for (const uiFile of uiFiles) {
    const { found, missing } = checkFileContent(
      uiFile,
      VALIDATION_RULES.USER_INTERFACES.requiredPatterns
    );
    
    if (missing.length === 0) {
      console.log(`  ✅ ${path.basename(uiFile)} uses intelligent patterns`);
      uiPatternsValid++;
      validationScore += 3;
    } else {
      console.log(`  ❌ ${path.basename(uiFile)} missing patterns: ${missing.join(', ')}`);
      violations.push(`${uiFile} missing patterns: ${missing.join(', ')}`);
    }
  }
} else {
  console.log('  ❌ User interface files missing');
  violations.push('User interface files missing');
}

// Validate Documentation
console.log('\n📚 Validating Documentation...');
maxScore += 4;

const docFiles = VALIDATION_RULES.DOCUMENTATION.requiredFiles;
const docExists = docFiles.every(checkFileExists);

if (docExists) {
  console.log('  ✅ Documentation files present');
  validationScore += 4;
} else {
  console.log('  ❌ Documentation files missing');
  violations.push('Required documentation files missing');
}

// Check test dashboard exists and is enhanced
console.log('\n📊 Validating Dashboard Integration...');
maxScore += 4;

if (checkFileExists('test/results/test-dashboard.html')) {
  console.log('  ✅ Test dashboard exists');
  validationScore += 2;
  
  // Check if dashboard generator uses intelligent calling
  const { found } = checkFileContent('tools/generate-test-dashboard.mjs', ['intelligentCall']);
  if (found.length > 0) {
    console.log('  ✅ Dashboard uses intelligent calling');
    validationScore += 2;
  } else {
    console.log('  ❌ Dashboard not using intelligent calling');
    violations.push('Dashboard not enhanced with intelligent calling');
  }
} else {
  console.log('  ❌ Test dashboard missing');
  violations.push('Test dashboard file missing');
}

// Calculate compliance score
const compliancePercentage = Math.round((validationScore / maxScore) * 100);

console.log('\n' + '='.repeat(60));
console.log('📊 ENHANCED ARCHITECTURE VALIDATION RESULTS');
console.log('='.repeat(60));
console.log(`Score: ${validationScore}/${maxScore} (${compliancePercentage}%)`);

if (compliancePercentage >= 90) {
  console.log('🎉 EXCELLENT: Enhanced architecture fully compliant!');
} else if (compliancePercentage >= 75) {
  console.log('✅ GOOD: Enhanced architecture mostly compliant');
} else if (compliancePercentage >= 50) {
  console.log('⚠️  WARNING: Enhanced architecture partially compliant');
} else {
  console.log('❌ CRITICAL: Enhanced architecture non-compliant');
}

if (violations.length > 0) {
  console.log('\n🚨 VIOLATIONS TO FIX:');
  violations.forEach((violation, index) => {
    console.log(`${index + 1}. ${violation}`);
  });
}

console.log('\n📋 COMPLIANCE REQUIREMENTS:');
console.log('- Test-Informed Intelligence: Core system learning from test results');
console.log('- Enhanced API Client: Intelligent calling with exploration fallback');
console.log('- User Interfaces: CLI tools and dashboard with AI interpretation');
console.log('- Documentation: Complete standards and enforcement guidelines');

console.log('\n🎯 SUCCESS CRITERIA:');
console.log('- ≥90% compliance for production deployment');
console.log('- ≥75% compliance for development continuation');
console.log('- <75% compliance requires immediate remediation');

// Exit with error code if compliance is too low
if (compliancePercentage < 75) {
  console.log('\n❌ VALIDATION FAILED: Compliance too low for continued development');
  process.exit(1);
} else {
  console.log('\n✅ VALIDATION PASSED: Enhanced architecture standards met');
  process.exit(0);
}
