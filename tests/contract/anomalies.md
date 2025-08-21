# OpenAPI Spec Anomalies Analysis

## Summary
- **Total operations parsed**: 87
- **Total anomalies found**: 36
- **Anomaly types**: 1 (Mixed path casing)

## Anomaly Details

### 1. Mixed Path Casing (36 occurrences)

The OpenAPI specification contains inconsistent path casing throughout. This creates challenges for:
- Code generation (method names)
- File naming conventions
- API client consistency

#### Examples:
| Path | Issue | Recommended Fix |
|------|-------|-----------------|
| `/event/authorizations/Query` | Mixed case `Query` | `/event/authorizations/query` |
| `/event-class/Query` | Mixed case `Query` | `/event-class/query` |
| `/event-class/Create` | Mixed case `Create` | `/event-class/create` |
| `/Form/Query` | Mixed case `Form/Query` | `/form/query` |
| `/Test/Query` | Mixed case `Test/Query` | `/test/query` |
| `/User/query` | Mixed case `User` | `/user/query` |

#### Pattern Analysis:
- **Legacy patterns**: Paths like `/Form/Query`, `/Test/Query` use Pascal case
- **Modern patterns**: Paths like `/channel/institutions/query` use lowercase
- **Inconsistent segments**: Some paths mix both conventions

#### Resolution Strategy:
1. **For API requests**: Use literal paths from spec to ensure compatibility
2. **For file names**: Normalize to lowercase with hyphens
3. **For method names**: Generate consistent camelCase names
4. **For future spec**: Standardize on lowercase paths

#### Impact on Test Generation:
- File paths will be normalized: `tests/contract/form/query/get.spec.ts`
- Method calls will use literal paths: `client.call('/Form/Query', { method: 'GET' })`
- No operations will be skipped due to casing issues

## JSON Pointer References

All anomalies include precise JSON Pointers for programmatic fixes:

```json
{
  "type": "mixed_path_casing",
  "path": "/event/authorizations/Query",
  "method": "get", 
  "jsonPointer": "/paths/~1event~1authorizations~1Query",
  "issue": "Mixed case in path segments",
  "normalizedPath": "/event/authorizations/query"
}
```

## Resolution Plan

### Phase 1 (Current) - Document and Handle
- ✅ All anomalies documented with JSON Pointers
- ✅ Systematic handling prevents test generation failures
- ✅ Mixed casing handled via normalization strategy

### Phase 2 - Test Generation
- Use literal paths for API calls
- Normalize paths for file/method naming
- Generate consistent test structure regardless of path casing

### Future - Spec Improvement
- Recommend path standardization to API team
- Provide automated migration suggestions
- Implement linting rules to prevent future inconsistencies

## Coverage Impact

**No impact on coverage**: All 41 read-only operations will have tests generated despite path casing anomalies.

The systematic handling ensures that previous failures (90 ops → 9 parsed → 2 tested) will not recur.
