/**
 * A security override for tests within a program.
 */
export type AccessOverride = {
    /**
     * The unique database identifier of the test.
     */
    'test-id': number | null;
    /**
     * The category identifier of the test.
     */
    'test-category-id'?: number | null;
    /**
     * The name of the test.
     */
    'test-name': string | null;
    /**
     * The description of the test.
     */
    'test-description'?: string | null;
    /**
     * The description of the test category.
     */
    'test-category-description '?: string | null;
    /**
     * The override result access given to a user for a specific program.
     *
     * | Value | Description                                                                      |
     * | ----- | -------------------------------------------------------------------------------- |
     * | 0     | The user has no access to results.                                               |
     * | 1     | User can see result information but cannot see PII information or scores.        |
     * | 2     | User can see result information including scores but cannot see PII information. |
     * | 3     | User can see all result information including PII and score data.                |
     * | 4     | User can see result information including PII data but cannot see scores.        |
     *
     */
    'result-access-id': number;
    /**
     * The override content access given to a user for a specific program.
     *
     * | Value | Description                                                     |
     * | ----- | --------------------------------------------------------------- |
     * | 0     | The user has no access to content.                              |
     * | 1     | The user can see scrambled content.                             |
     * | 2     | The user can see scrambled content with the option to override. |
     * | 3     | The user has full access to content.                            |
     *
     */
    'content-access-id': number;
    /**
     * The date and time access expires.
     */
    'expires-utc'?: string | null;
    /**
     * The date and time the security override was created.
     */
    'created-utc'?: string | null;
    /**
     * The date and time the security override was modified.
     */
    'modified-utc'?: string | null;
};
//# sourceMappingURL=AccessOverride.d.ts.map