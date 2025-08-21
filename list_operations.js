const plan = require('./tests/contract/coverage/plan.readonly.json');

console.log('📋 Total read-only operations:', plan.length);
console.log('\n🔍 All operations:');

plan.forEach((op, i) => {
  console.log(`${i+1}. ${op.operationId}`);
});

console.log('\n📊 Operations by category:');
const categories = {};
plan.forEach(op => {
  const category = op.operationId.replace(/Query$/, '').replace(/([A-Z])/g, ' $1').trim();
  if (!categories[category]) categories[category] = [];
  categories[category].push(op.operationId);
});

Object.keys(categories).forEach(cat => {
  console.log(`\n${cat}:`);
  categories[cat].forEach(op => console.log(`  - ${op}`));
});
