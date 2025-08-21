/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FormCaseSlide = {
    /**
     * Possible values:
     * | Case Type | Value |
     * | --------- | ----- |
     * | Examinee  | 1     |
     * | Assessor  | 2     |
     *
     */
    type?: number;
    /**
     * The name of case slide.
     */
    name?: string | null;
    /**
     * The display sequence within the case.
     */
    'display-sequence'?: number;
    /**
     * Set for assessor slides/
     */
    scored?: boolean;
};

