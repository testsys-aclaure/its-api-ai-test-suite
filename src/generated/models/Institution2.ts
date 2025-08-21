/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Institution2 = {
    /**
     * The unique ITS database identifier of the institution.
     */
    'institution-id'?: number;
    /**
     * The unique program identifier of an institution. Examinees are linked to this institution. The web API client must have access to this institution.
     */
    'program-institution-id'?: string | null;
    /**
     * The institution name.
     */
    name?: string | null;
    /**
     * The program's public or business identifier of the examinee. For instance, this may be a student ID. For programs that use a username to login, this is the username. This identifier must be unique within the uniqueness scope as defined for the program. It is required if `RecordIdentifier` is not provided.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * This is required if the examinee is uniquely identified at the institution level. The table below includes the acceptable enrollment status values.
     * **Enrollment Status**
     *
     * | Value | Description  |
     * |-------|--------------|
     * | 1     | Enrolled     |
     * | 2     | Transferred  |
     * | 3     | Graduated    |
     * | 4     | Not Enrolled |
     */
    'enrollment-status'?: number;
};

