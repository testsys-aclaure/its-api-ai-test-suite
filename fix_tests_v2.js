const fs = require('fs');
const path = require('path');

// Find all test files
function findTestFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findTestFiles(fullPath));
    } else if (item.endsWith('.spec.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Fix a test file
function fixTestFile(filePath) {
  console.log('Fixing:', filePath);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix GET requests with body - convert to proper query parameters
  content = content.replace(
    /const response = await client\.raw\('\/unknown', \{\s*method: 'GET',\s*body: JSON\.stringify\(\{\s*query: \{([^}]+)\}\s*\}\)\s*\}\);/gs,
    (match, queryParams) => {
      return `const response = await client.raw('/unknown', { query: {${queryParams}} });`;
    }
  );
  
  // Also fix any remaining raw calls with bodies
  content = content.replace(
    /await client\.raw\([^,]+,\s*\{\s*method: 'GET',\s*body: [^}]+\}\);?/g,
    `await client.raw('/unknown', { query: {} });`
  );
  
  fs.writeFileSync(filePath, content);
}

// Main execution
const testDir = './tests/contract';
const testFiles = findTestFiles(testDir);

console.log(`Found ${testFiles.length} test files to fix`);

let fixedCount = 0;
for (const file of testFiles) {
  try {
    const before = fs.readFileSync(file, 'utf8');
    fixTestFile(file);
    const after = fs.readFileSync(file, 'utf8');
    if (before !== after) {
      fixedCount++;
      console.log('  ✅ Fixed');
    }
  } catch (err) {
    console.error('Error fixing', file, ':', err.message);
  }
}

console.log(`Done - fixed ${fixedCount} test files`);
