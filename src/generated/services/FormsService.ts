/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormReportQueryResult } from '../models/FormReportQueryResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FormsService {
    /**
     * form/reports/query
     * This method returns the form reporting data for a specific form.
     * @param programId
     * @param testId
     * @param formId
     * @returns FormReportQueryResult OK
     * @throws ApiError
     */
    public static getFormReportsQuery(
        programId: number,
        testId: number,
        formId: number,
    ): CancelablePromise<FormReportQueryResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/form/reports/Query',
            query: {
                'program-id': programId,
                'test-id': testId,
                'form-id': formId,
            },
        });
    }
    /**
     * form/res-files/query
     * This method returns the binary encrypted RES file for a specific form.
     * @param programId
     * @param formId
     * @returns binary OK
     * @throws ApiError
     */
    public static getFormResFilesQuery(
        programId: number,
        formId: number,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/form/res-files/Query',
            query: {
                'program-id': programId,
                'form-id': formId,
            },
            errors: {
                422: `Unprocessable Content`,
            },
        });
    }
}
