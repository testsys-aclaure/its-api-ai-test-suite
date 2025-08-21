/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StartTestDataHolder } from '../models/StartTestDataHolder';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StartTestService {
    /**
     * /start-test/Login
     * Retrieves a URL that logs an examinee into the specified site. The examinee record is created or updated. The URL is time-sensitive and can be used only once.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. The API matches examinees linked to this institution and the institution's children. The web API client must have access to this institution.
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static startTestLogin(
        programId?: number,
        programInstitutionId?: string,
        requestBody?: StartTestDataHolder,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/start-test/Login',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /start-test/Start
     * Retrieves a URL that starts or restarts a test. The URL returned is time-sensitive and can be used only once. If the test is completed and has a score report, the score report is returned. If the test is completed and does not have a score report, the test is restarted on the “end of test display” or the last question of the test, whichever is earlier.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. The API matches examinees linked to this institution and the institution's children. The web API client must have access to this institution.
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static startTestStart(
        programId?: number,
        programInstitutionId?: string,
        requestBody?: StartTestDataHolder,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/start-test/Start',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
