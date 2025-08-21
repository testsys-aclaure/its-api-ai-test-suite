/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormCaseSlide } from './FormCaseSlide';
export type FormCase = {
    /**
     * The name of the case.
     */
    name?: string | null;
    /**
     * The description of the case.
     */
    description?: string | null;
    /**
     * The rubric associated with the case.
     */
    'rubric-id'?: number;
    readonly 'case-slides'?: Array<FormCaseSlide> | null;
};

