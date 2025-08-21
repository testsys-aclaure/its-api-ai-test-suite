/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LongitudinalGroupCycle = {
    /**
     * The database identifier of the longitudinal group.
     */
    id?: string | null;
    /**
     * The name of the longitudinal group.
     */
    name?: string | null;
    /**
     * The sequence of the cycle for the examinee.
     */
    'cycle-num'?: string | null;
    /**
     * The date the examinee cycle started in UTC.
     */
    'cycle-start-utc'?: string;
    /**
     * The description of the longitudinal group.
     */
    description?: string | null;
    /**
     * The identifier of the group of forms available for this longitudinal group.
     */
    'form-group'?: string | null;
    /**
     * The date the examinee was added to the longitudinal group.
     */
    'join-utc'?: string;
    /**
     * The date the run started in UTC.
     */
    'run-start-utc'?: string;
    /**
     * The date the run ended in UTC.
     */
    'run-end-utc'?: string;
    /**
     * The sequence of the run within the longitudinal group.
     */
    'run-num'?: string | null;
    /**
     * The date the segment started in UTC.
     */
    'segment-start-utc'?: string;
    /**
     * The sequence of the segment within the run.
     */
    'segment-num'?: string | null;
    /**
     * The date the segment ended in UTC.
     */
    'segment-end-utc'?: string;
};

