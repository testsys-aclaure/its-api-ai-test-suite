/**
 * The user object.
 */
export type UserResponse = {
    /**
     * Unique user identifier. System generated.
     */
    'user-id'?: number | null;
    /**
     * Links user to a specific vendor. This is not set for system administrators.
     */
    'vendor-id'?: number | null;
    /**
     * Only set for sponsor users.
     */
    'sponsor-id '?: number | null;
    /**
     * Links this user to a specific institution.
     */
    'institution-id '?: number | null;
    /**
     * Username used for the login.
     */
    username?: string | null;
    /**
     * The external, system identifier for a PW/IW user. The primary use will be to store an identity provider's ID.
     */
    'program-user-system-id'?: string | null;
    /**
     * Optional. Unique public external identifier (e.g., employee ID, Board ID).
     */
    'program-user-public-id'?: string | null;
    /**
     * User type.
     */
    'user-type'?: number;
    /**
     * First name of the user.
     */
    'first-name'?: string | null;
    /**
     * Middle name of the user.
     */
    'middle-name'?: string | null;
    /**
     * Last name of the user.
     */
    'last-name'?: string | null;
    /**
     * 1 = Mr, 2 = Ms, 3 = Professor, 4 = Dr.
     */
    prefix?: number | null;
    /**
     * Title
     */
    title?: string | null;
    /**
     * Company name.
     */
    company?: string | null;
    /**
     * Job title.
     */
    'job-title'?: string | null;
    /**
     * Must be a valid email format based on RFC5322 section 3.4.1.
     */
    email?: string | null;
    /**
     * Must be in the E.164 format [+][country code][area code][local phone number] and can have a maximum of fifteen digits. "[+][country code]" are optional.
     */
    'work-phone'?: string | null;
    /**
     * The extension of the user's work telephone number.
     */
    'work-phone-ext'?: string | null;
    /**
     * Must be in the E.164 format [+][country code][area code][local phone number] and can have a maximum of fifteen digits. [+][country code] are optional.
     */
    'mobile-phone'?: string | null;
    /**
     * The first line of the user's street address.
     */
    address?: string | null;
    /**
     * The second line of the user's street address.
     */
    address2?: string | null;
    /**
     * The third line of the user's street address.
     */
    address3?: string | null;
    /**
     * The city of the user's address.
     */
    city?: string | null;
    /**
     * If `country` = `US`, State is the two-letter code. If `country` <> `US`, then this field is the region/province.
     */
    'state-region'?: string | null;
    /**
     * The postal code for the user's address.
     */
    'postal-code'?: string | null;
    /**
     * The ISO-AlphaThree country code for the user's address.
     */
    country?: string | null;
    /**
     * The department the user is a member of.
     */
    department?: string | null;
    /**
     * If set, user is a technical contact.
     */
    'technical-contact'?: boolean | null;
    /**
     * If set, user is an administrative contact.
     */
    'administrative-contact'?: boolean | null;
    /**
     * Default ET = 23. For institution users, initially set based on institution configuration. May be overridden by user UI. Use `timezone/query` for possible `timezone-id` values.
     */
    'timezone-id'?: number;
    /**
     * The default is `true`. For institution users, initially set based on institution configuration. May be overridden by user UI.
     */
    'use-daylight-savings'?: boolean | null;
    /**
     * Language user logged in with.
     */
    language?: string | null;
    /**
     * Date record was created.
     */
    'created-utc'?: string;
    /**
     * User who created the user.
     */
    'create-user-id'?: number;
    /**
     * Date record was last modified.
     */
    'modified-utc'?: string;
    /**
     * User who modified the user.
     */
    'modify-user-id'?: number;
    /**
     * Date user's activation status last changed.
     */
    'activated-utc'?: string;
    /**
     * User who changed the user's activation status.
     */
    'activate-user-id'?: number;
    /**
     * Date to inactivate users.
     */
    'inactivation-utc'?: string;
    /**
     * Last login date.
     */
    'last-date-login'?: string | null;
    /**
     * The default is 0. If set, this user is an administrator.
     */
    administrator?: boolean;
    /**
     * The default is 0. If set, the user has access to all programs for this entity.
     */
    'all-programs'?: boolean;
    /**
     * The default is 0. 1 = All tests. 2 = SSO Login (disable profile view/edit).
     */
    options?: number;
    /**
     * Set when an institution user accepts the program agreement.
     */
    'agreement-accepted'?: boolean | null;
    /**
     * User's agreement date.
     */
    'agreement-accepted-utc'?: string;
    /**
     * Shows Item Workshop access.
     */
    'iw-active'?: boolean;
    /**
     * The default is 0. If set, then can’t change user profile information.
     */
    'externally-managed'?: boolean | null;
    /**
     * The status of the user.
     */
    status?: string | null;
};
//# sourceMappingURL=UserResponse.d.ts.map