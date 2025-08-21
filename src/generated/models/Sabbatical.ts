/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Information for single Sabbatical
 */
export type Sabbatical = {
    /**
     * The unique ITS database identifier of the examinee’s sabbatical.
     */
    'examinee-sabbatical-id'?: number | null;
    /**
     * The unique ITS database identifier of the examinee.
     */
    'examinee-id'?: number | null;
    /**
     * The program’s system identifier of the examinee. This is typically a database identifier. This must be unique within the uniqueness scope defined for the program. This is required for creates if program-examinee-public-id is not provided. This is required for updates if examinee-id and program-examinee-public-id are not provided.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The program’s public or business identifier of the examinee. For instance, this may be a student ID. This identifier must be unique within the uniqueness scope defined for the program. This is required for creates if program-examinee-system-id is not provided. This is required for updates if examinee-id and program-examinee-system-id are not provided.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * Optional user-entered text for admin-elected sabbaticals.
     */
    request?: string | null;
    /**
     * Flag to show rejected or not. 0 or NULL is false and 1 is true or rejected.
     */
    rejected?: boolean | null;
    /**
     * Reason for the rejection of the sabbatical.
     */
    'reject-reason'?: string | null;
    /**
     * Notes for the sabbatical.
     */
    notes?: string | null;
    /**
     * The UTC date/time of the start of the sabbatical.
     */
    'start-utc'?: string | null;
    /**
     * The UTC date/time of the end of the sabbatical.
     */
    'end-utc'?: string | null;
    /**
     * Automatically generated Date/time when the sabbatical was originally created in UTC.
     */
    'created-utc'?: string;
    /**
     * Flag to show if the sabbatical was cancelled or not.
     */
    cancelled?: boolean | null;
    /**
     * Date/time in UTC when the sabbatical was cancelled. Automatically generated when the cancelled flag is set to 1.
     */
    'cancel-utc'?: string | null;
    /**
     * Sequence number of the Segment the sabbatical is for, if it is a Segment Sabbatical.
     */
    sequence?: number | null;
    /**
     * Flag for who created the sabbatical: 1 = Examinee, 0 or NULL = Admin
     */
    'sabbatical-option'?: boolean | null;
};

