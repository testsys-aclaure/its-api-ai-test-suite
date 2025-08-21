/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LongitudinalGroupExaminee = {
    /**
     * The unique ITS database identifier of the longitudinal group.
     */
    'longitudinal-group-id'?: number | null;
    /**
     * The unique textual identifier of the longitudinal group.
     */
    'longitudinal-group-name'?: string | null;
    'longitudinal-group-description'?: string | null;
    /**
     * The unique ITS database identifier of the examinee.
     */
    'examinee-id'?: number | null;
    /**
     * The program's public or business identifier of the examinee.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * The program's system identifier of the examinee.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The form group that the examinee is assigned to. This determines the forms that are available for the examinee who is within a fixed-form longitudinal group. If this parameter is provided, the examinee receives a form linked to this form group.
     */
    'form-group'?: string | null;
    /**
     * If true, the examinee can test and actively participate.
     */
    active?: boolean;
    /**
     * If true, the examinee is given read-only access to the longitudinal group.
     */
    'read-only'?: boolean;
};

