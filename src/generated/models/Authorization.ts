/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Authorization = {
    /**
     * The unique database identifier of the authorization code the examinee must use to access a test.
     */
    'authorization-id'?: number | null;
    /**
     * The authorization code the examinee must use to access a test.
     */
    'authorization-code'?: string | null;
    'expiration-date'?: string | null;
    /**
     * The database identifier of the result.
     */
    'result-id'?: number | null;
    /**
     * The start date and time of the result in UTC.
     */
    'start-utc'?: string | null;
    /**
     * A boolean flag indicating if the result is complete.
     */
    completed?: boolean | null;
    /**
     * The unique database identifier of the examinee.
     */
    'program-examinee-id'?: number | null;
    /**
     * The program’s system identifier of the examinee.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The program’s public or business identifier of the examinee.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * The first name of the examinee who used this authorization.
     */
    'first-name'?: string | null;
    /**
     * The last name of the examinee who used this authorization.
     */
    'last-name'?: string | null;
};

