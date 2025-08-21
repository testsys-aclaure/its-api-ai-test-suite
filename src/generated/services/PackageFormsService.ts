/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PackageForm } from '../models/PackageForm';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PackageFormsService {
    /**
     * /package/forms/query
     * This method returns the forms an institution is authorized to deliver for an event.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Only forms accessible by this institution are returned. The web API client must have access to this institution.
     * @param packageCode The API will return forms for the `package-code` specified.
     * @param accessibleOnly If `true`, only accessible forms are returned. If not passed or `false`, accessible and non-accessible forms are returned.
     * @param nonSecureOnly If `true`, only non-secure forms are returned. If not passed or `false`, secure and non-secure forms are returned.
     * @param practiceOnly If `true`, only practice forms are returned. If not passed or `false` and `non-practice-only` is not passed or `false`, then practice and non-practice forms are returned. This parameter cannot be passed if `non-practice-only` is passed as `true`.
     * @param nonPracticeOnly If `true`, only non-practice forms are returned. If not passed or `false` and `practice-only` is not passed or `false`, then practice and non-practice forms are returned. This parameter cannot be passed if `practice-only` is passed as `true`.
     * @returns PackageForm OK
     * @throws ApiError
     */
    public static packageFormsQuery(
        programId: number,
        programInstitutionId: string,
        packageCode: string,
        accessibleOnly?: boolean,
        nonSecureOnly?: boolean,
        practiceOnly: boolean = false,
        nonPracticeOnly: boolean = false,
    ): CancelablePromise<Array<PackageForm>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/package/forms/Query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'package-code': packageCode,
                'accessible-only': accessibleOnly,
                'non-secure-only': nonSecureOnly,
                'practice-only': practiceOnly,
                'non-practice-only': nonPracticeOnly,
            },
        });
    }
}
