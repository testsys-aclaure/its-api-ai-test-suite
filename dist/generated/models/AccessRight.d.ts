import type { AccessOverride } from './AccessOverride';
/**
 * Access rights for the user within a program. These access rights override the default access of the user.
 */
export type AccessRight = {
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
    /**
     * A collection of security overrides for tests within a program.
     */
    readonly 'test-overrides'?: Array<AccessOverride> | null;
};
//# sourceMappingURL=AccessRight.d.ts.map