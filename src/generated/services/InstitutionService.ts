/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImportInstitutionResponse } from '../models/ImportInstitutionResponse';
import type { Institution } from '../models/Institution';
import type { QueryInstitutionResponse } from '../models/QueryInstitutionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InstitutionService {
    /**
     * /channel/institutions/query
     * Retrieves institutions.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The institutions imported will be children of this parent institution. The web API client must have access to this institution, or a parent of this institution.
     * @param limit The number of examinee objects to return. By default, this call returns a maximum of 500 objects. The limit can be set to any number less than 500.
     * @param beforeId A specific `examinee-id`. The API returns objects with `examinee-id`s that precede `before-id`. This parameter cannot be used if `after-id` is used.
     * @param afterId A specific `examinee-id`. The API returns objects with `examinee-id`s that follow `after-id`. This parameter cannot be used if `before-id` is used.
     * @returns QueryInstitutionResponse OK
     * @throws ApiError
     */
    public static channelInstitutionQuery(
        programId: number,
        programInstitutionId?: string,
        limit: number = 500,
        beforeId?: number,
        afterId?: number,
    ): CancelablePromise<Array<QueryInstitutionResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/channel/institutions/query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
            },
        });
    }
    /**
     * /channel/institutions/import
     * Creates institutions.
     * @param programId The unique program identifier provided as part of configuration.
     * @param parentProgramInstitutionId The institutions imported will be children of this parent institution. The web API client must have access to this institution or a parent of this institution. This parameter is required if the web API client is an institution-level client.
     * @param requestBody
     * @returns ImportInstitutionResponse OK
     * @throws ApiError
     */
    public static channelInstitutionImport(
        programId: number,
        parentProgramInstitutionId?: string,
        requestBody?: Institution,
    ): CancelablePromise<ImportInstitutionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/channel/institutions/import',
            query: {
                'program-id': programId,
                'parent-program-institution-id': parentProgramInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /channel/institutions/import
     * Creates institutions.
     * @param programId The unique program identifier provided as part of configuration.
     * @param parentProgramInstitutionId The institutions imported will be children of this parent institution. The web API client must have access to this institution or a parent of this institution. This parameter is required if the web API client is an institution-level client.
     * @param requestBody
     * @returns ImportInstitutionResponse OK
     * @throws ApiError
     */
    public static channelInstitutionImport1(
        programId: number,
        parentProgramInstitutionId?: string,
        requestBody?: Institution,
    ): CancelablePromise<ImportInstitutionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/channel/institutions/import',
            query: {
                'program-id': programId,
                'parent-program-institution-id': parentProgramInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
