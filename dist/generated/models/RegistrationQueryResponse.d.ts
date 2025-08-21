import type { TestClass } from './TestClass';
export type RegistrationQueryResponse = {
    /**
     * ITS database unique identifier for the examinee.
     */
    'examinee-id'?: number | null;
    /**
     * Program’s unique public identifier for the examinee.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * Program’s unique system identifier for the examinee.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The program's unique Institutional Examinee identifier. The identifier must be unique within the uniqueness scope as defined for the program. The program-institution-id URL parameter is required when using this identifier.
     */
    'program-examinee-institution-id'?: string | null;
    /**
     * The unique database identifier of the registration.
     */
    'registration-id'?: number | null;
    /**
     * The program’s unique identifier for the registration.
     */
    'program-registration-id'?: string | null;
    /**
     * Program’s unique order identifier.
     */
    order?: string | null;
    /**
     * Program’s unique session identifier.
     */
    'sales-order-line-number'?: string | null;
    /**
     * If set to 0, then the registration is inactive.
     */
    active?: boolean | null;
    /**
     * An identifier linking one or more forms for form selection.
     */
    group?: string | null;
    /**
     * Room description for the Institution.
     */
    room?: string | null;
    /**
     * Class description or name. ITS database unique identifier for the examinee.
     */
    'class-description'?: string | null;
    /**
     * Course Section Information
     */
    'course-section'?: string | null;
    /**
     * The maximum hours before this test must be completed.
     */
    'max-hours'?: number | null;
    /**
     * Start date of the registration in UTC.
     */
    'start-utc'?: string | null;
    /**
     * End date of the registration in UTC.
     */
    'end-utc'?: string | null;
    /**
     * Date record was created.
     */
    'created-utc'?: string | null;
    /**
     * User who created the registration.
     */
    'created-user-id'?: number | null;
    /**
     * Date record was last modified.
     */
    'modified-utc'?: string | null;
    /**
     * User who modified the registration.
     */
    'modify-user-id'?: number | null;
    /**
     * Date user's activation status last changed.
     */
    'activated-utc'?: string | null;
    /**
     * User who changed the registration's activation status.
     */
    'activate-user-id'?: number | null;
    tests?: Array<TestClass> | null;
};
//# sourceMappingURL=RegistrationQueryResponse.d.ts.map