import type { Sponsor } from './Sponsor';
/**
 * Markdown enabled object description.
 */
export type UserAccessQueryResponse = {
    /**
     * The unique ITS database identifier of the user.
     */
    'user-id'?: number;
    /**
     * The program's system-generated unique identifier of the user. Used to link the ITS system with the program's system for SSO and system-to-system imports.
     */
    'program-user-system-id'?: string | null;
    /**
     * The program's public identifier of a user. For example, the users Board ID.
     */
    'program-user-public-id'?: string | null;
    /**
     *
     * | User Type | Description |
     * | --------- | ----------- |
     * | 2         | Vendor      |
     * | 3         | Sponsor     |
     * | 4         | Institution |
     */
    'user-type-id'?: number;
    /**
     * This is only applicable for institution users. This is the unique database identifier of the institution administrator role.
     */
    'institution-admin-role-id'?: number | null;
    /**
     * This is only applicable for institution users. This is the unique textual identifier of the institution administrator role.
     */
    'institution-admin-role-code'?: string | null;
    /**
     * The default result access given to a user.
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
    'result-access-id'?: number;
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
    'content-access-id'?: number;
    /**
     * The date of the last login for this user.
     */
    'last-login-utc'?: string | null;
    /**
     * The number of logins for this user.
     */
    'num-logins'?: number | null;
    /**
     * A collection of sponsors a user can access.
     */
    readonly sponsors?: Array<Sponsor> | null;
    /**
     * The status of the user.
     */
    status?: string | null;
    /**
     * Shows Item Workshop access.
     */
    'iw-active'?: boolean;
};
//# sourceMappingURL=UserAccessQueryResponse.d.ts.map