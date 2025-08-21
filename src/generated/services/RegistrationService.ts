/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegistrationCreateRequest } from '../models/RegistrationCreateRequest';
import type { RegistrationCreateUpdateRequest } from '../models/RegistrationCreateUpdateRequest';
import type { RegistrationDeleteStatus } from '../models/RegistrationDeleteStatus';
import type { RegistrationImportResponse } from '../models/RegistrationImportResponse';
import type { RegistrationQueryResponse } from '../models/RegistrationQueryResponse';
import type { RegistrationUpdateResponse } from '../models/RegistrationUpdateResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RegistrationService {
    /**
     * /registration/import
     * Creates a new registration or updates all fields for the record if given a program-registration-id.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param requestBody
     * @returns RegistrationImportResponse OK
     * @throws ApiError
     */
    public static registrationImportCreate(
        programId: number,
        programInstitutionId?: string,
        requestBody?: Array<RegistrationCreateRequest>,
    ): CancelablePromise<Array<RegistrationImportResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/registration/import',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /registration/import
     * Updates only the fields given for the record if given a program-registration-id.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param requestBody
     * @returns RegistrationImportResponse OK
     * @throws ApiError
     */
    public static registrationUpdate(
        programId: number,
        programInstitutionId?: string,
        requestBody?: Array<RegistrationCreateUpdateRequest>,
    ): CancelablePromise<Array<RegistrationImportResponse>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/registration/import',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /registration/update
     * This will update a registration to link an examinee to it.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param examineeId
     * @param programExamineePublicId
     * @param programExamineeSystemId
     * @param programExamineeInstitutionId
     * @param programRegistrationId
     * @param registrationId
     * @returns RegistrationUpdateResponse OK
     * @throws ApiError
     */
    public static patchRegistrationUpdate(
        programId: number,
        programInstitutionId?: string,
        examineeId?: number,
        programExamineePublicId?: string,
        programExamineeSystemId?: string,
        programExamineeInstitutionId?: string,
        programRegistrationId?: string,
        registrationId?: number,
    ): CancelablePromise<RegistrationUpdateResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/registration/update',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'examinee-id': examineeId,
                'program-examinee-public-id': programExamineePublicId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-institution-id': programExamineeInstitutionId,
                'program-registration-id': programRegistrationId,
                'registration-id': registrationId,
            },
        });
    }
    /**
     * /registration/query
     * This registration query will return registrations based on the filters provided.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param registrationId
     * @param programRegistrationId
     * @param examineeId
     * @param programExamineePublicId
     * @param programExamineeSystemId
     * @param programExamineeInstitutionId
     * @param startUtc
     * @param endUtc
     * @param testId
     * @param started
     * @param completed
     * @param excludeFlag
     * @param limit
     * @param beforeId
     * @param afterId
     * @returns RegistrationQueryResponse OK
     * @throws ApiError
     */
    public static registrationQuery(
        programId: number,
        programInstitutionId?: string,
        registrationId?: Array<number>,
        programRegistrationId?: Array<string>,
        examineeId?: number,
        programExamineePublicId?: string,
        programExamineeSystemId?: string,
        programExamineeInstitutionId?: string,
        startUtc?: string,
        endUtc?: string,
        testId?: number,
        started?: boolean,
        completed?: boolean,
        excludeFlag?: number,
        limit?: number,
        beforeId?: number,
        afterId?: number,
    ): CancelablePromise<Array<RegistrationQueryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/registration/query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'registration-id': registrationId,
                'program-registration-id': programRegistrationId,
                'examinee-id': examineeId,
                'program-examinee-public-id': programExamineePublicId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-institution-id': programExamineeInstitutionId,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'test-id': testId,
                'started': started,
                'completed': completed,
                'exclude-flag': excludeFlag,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
            },
        });
    }
    /**
     * /registration/delete
     * This will delete registrations that do not have results started for them.
     * @param programId The unique program identifier provided as part of configuration.
     * @param reason
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param registrationId
     * @param programRegistrationId
     * @returns RegistrationDeleteStatus OK
     * @throws ApiError
     */
    public static registrationDelete(
        programId: number,
        reason: string,
        programInstitutionId?: string,
        registrationId?: Array<number>,
        programRegistrationId?: Array<string>,
    ): CancelablePromise<Array<RegistrationDeleteStatus>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/registration/delete',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'registration-id': registrationId,
                'program-registration-id': programRegistrationId,
                'Reason': reason,
            },
        });
    }
}
