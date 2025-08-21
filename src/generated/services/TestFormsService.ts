/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestFormsQueryResponse } from '../models/TestFormsQueryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestFormsService {
    /**
     * /test/forms/query
     * Return all forms configured for a test and the active status of those forms.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Only forms accessible by this institution are returned. The web API client must have access to this institution.
     * @param testName The unique textual identifier of the test.
     * @param testId The unique database identifier of the test.
     * @param startUtc The start date and time in UTC that test delivery will occur and forms must be available.
     * @param endUtc The last date and time in UTC that test delivery will occur and forms must be available.
     * @returns TestFormsQueryResponse OK
     * @throws ApiError
     */
    public static testFormsQuery(
        programId: number,
        programId?: number,
        programInstitutionId?: number,
        testName?: Array<string>,
        testId?: Array<number>,
        startUtc?: string,
        endUtc?: string,
    ): CancelablePromise<Array<TestFormsQueryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/forms/Query',
            query: {
                'program-id': programId,
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'test-name': testName,
                'test-id': testId,
                'start-utc': startUtc,
                'end-utc': endUtc,
            },
        });
    }
}
