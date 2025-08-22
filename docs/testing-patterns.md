# API Testing Patterns & Standards

## Program Institution ID Strategy

### Overview
For program-id `238`, we use a dedicated testing institution (`program-institution-id: 1009048`) that was created specifically for testing purposes. This provides a controlled environment for API exploration and validation.

### ✅ ENFORCEMENT: All tests must use environment configuration

**Never hardcode institution IDs.** Always use `env.getProgramInstitutionId()`.

### Implementation Standard

#### ✅ DO: Use Environment Configuration
```typescript
// ✅ CORRECT - Use environment configuration
const env = EnvironmentConfig;

const params = {
  'program-id': env.getDefaultProgramId(),
  'program-institution-id': env.getProgramInstitutionId(), // 1009048 from environment
  // ... other parameters
};

// ✅ CORRECT - Semantic interface with environment
const result = await EventQuery.searchEvents({
  program: env.getDefaultProgramId(),
  institution: env.getProgramInstitutionId(), // Always use environment config
  filters: { /* ... */ }
});
```

#### ❌ DON'T: Hardcode Values or Use Fallbacks
```typescript
// ❌ WRONG - Never hardcode institution IDs
const params = {
  'program-id': '238',
  'program-institution-id': '1009048', // Hardcoded - BAD!
};

// ❌ WRONG - Don't use fallback patterns
const institutionId = process.env.PROGRAM_INSTITUTION_ID || '1009048'; // Still hardcoding!

// ❌ WRONG - Direct environment access
'program-institution-id': process.env.PROGRAM_INSTITUTION_ID // Use environment config class
```

### When to Include `program-institution-id`

#### Required Parameters
- **Event Class operations** - Always required
- **Event Authorization operations** - Always required  
- **Institution-specific queries** - Always required

#### Optional but Recommended
- **Event Query** - Optional parameter, but we include it for consistent testing
- **General queries** - Include when parameter is supported for better test coverage

### Benefits of This Pattern

1. **Controlled Testing Environment**
   - Institution 1009048 is dedicated for testing
   - Safe to create/modify test data
   - No impact on production data

2. **Consistent Test Parameters**
   - All tests use same environment configuration
   - Easy to change test institution globally
   - Supports program-specific variations later

3. **Future Flexibility**
   - Pattern scales to other programs
   - Environment-driven configuration
   - Program-specific institution mapping ready

### Environment Configuration

The testing institution is configured in:
- **Environment File**: `environments/238-stg.json`
- **Code Access**: `EnvironmentConfig.getProgramInstitutionId()`
- **Current Value**: `1009048` (dedicated test institution)

### Implementation Examples

#### Basic API Call Pattern
```typescript
// Get environment configuration
const env = EnvironmentConfig;

// Build parameters using environment values
const params = {
  'program-id': env.getDefaultProgramId(),
  'program-institution-id': env.getProgramInstitutionId(),
  'event-id': '1' // Event-specific parameters as needed
};

// Execute API call
const result = await SomeEndpoint.execute(params);
```

#### Semantic Interface Pattern
```typescript
// Use environment configuration in semantic interfaces
const result = await EventQuery.searchEvents({
  program: env.getDefaultProgramId(),
  institution: env.getProgramInstitutionId(), // Always use environment config
  filters: { /* ... */ }
});
```

### Testing Advantages

1. **Exploratory Testing** - Institution 1009048 supports creating test scenarios
2. **Business Logic Validation** - Can test authorization/security with known data
3. **Edge Case Testing** - Safe environment for testing unusual conditions
4. **Data Consistency** - Predictable test data for reliable results

### Program-Specific Considerations

**Current Scope**: Program 238 with test institution 1009048
**Future Extension**: When testing other programs, update environment configuration with appropriate test institutions

### Documentation Updates Required

When implementing new endpoints:
1. ✅ Check if endpoint supports `program-institution-id` parameter
2. ✅ Include it in all test cases when supported (even if optional)
3. ✅ Use `env.getProgramInstitutionId()` - never hardcode
4. ✅ Document institution-specific behavior in endpoint metadata
5. ✅ Update troubleshooting guides with institution context

### Dashboard Reliability

**✅ Environment-Driven**: Dashboard reads actual environment values used by tests
**✅ No Hardcoded Fallbacks**: Fails fast if environment is misconfigured rather than showing wrong data
**✅ Actual Request URLs**: Shows the exact URLs being called by the test suite
**✅ Configuration Validation**: Alerts when environment setup is incomplete

This pattern ensures consistent, reliable testing while preparing for future program expansion.

## Code Review Checklist

When reviewing API test implementations, verify:

- [ ] ✅ Uses `env.getProgramInstitutionId()` instead of hardcoding
- [ ] ✅ No fallback patterns like `|| '1009048'`
- [ ] ✅ No direct `process.env.PROGRAM_INSTITUTION_ID` access
- [ ] ✅ Includes `program-institution-id` on all endpoints that support it
- [ ] ✅ Documents institution-specific behavior in troubleshooting

## Migration Complete

All existing tests have been updated to follow this pattern:
- ✅ `event-query.test.ts` - Updated to use environment config
- ✅ `event-class-query.test.ts` - Updated to use environment config  
- ✅ `event-authorization-query.test.ts` - Already compliant
- ✅ Dashboard reporter - Updated to show environment-based parameters

**Result**: Institution 1009048 is now consistently used across all API tests via environment configuration, enabling controlled testing and future program flexibility.
