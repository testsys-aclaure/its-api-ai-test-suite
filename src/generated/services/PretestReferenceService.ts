/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PretestReferences } from '../models/PretestReferences';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PretestReferenceService {
    /**
     * /test/pretest-references/query
     * Gets a Pretest References object according to the specified TestIDs.
     * @param programId
     * @param testId
     * @returns PretestReferences OK
     * @throws ApiError
     */
    public static testPretestReferencesQuery(
        programId: number,
        testId?: Array<number>,
    ): CancelablePromise<PretestReferences> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/pretest-references/Query',
            query: {
                'program-id': programId,
                'test-id': testId,
            },
        });
    }
    /**
     * /test/pretest-references/import
     * Imports Pretest Reference objects into the database from the Pretest References object passed in. A 422 error is returned if 1 or more items or sets are not matched up before importing and the whole import is cancelled.
     * @param programId
     * @param testId
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static testPretestReferencesImport(
        programId: number,
        testId: number,
        requestBody: PretestReferences,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/pretest-references/Import',
            query: {
                'program-id': programId,
                'test-id': testId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
