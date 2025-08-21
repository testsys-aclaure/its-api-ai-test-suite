/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExamineeResponse } from './ExamineeResponse';
export type EventExamineeResponse = {
    /**
     * The unique ITS database identifier of the event.
     */
    'event-id'?: number | null;
    /**
     * Examinee Identifiers
     */
    examinees?: Array<ExamineeResponse> | null;
};

