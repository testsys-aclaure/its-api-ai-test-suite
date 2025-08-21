import type { StartTestDataHolder } from '../models/StartTestDataHolder';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class StartTestService {
    /**
     * /start-test/Login
     * Retrieves a URL that logs an examinee into the specified site. The examinee record is created or updated. The URL is time-sensitive and can be used only once.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. The API matches examinees linked to this institution and the institution's children. The web API client must have access to this institution.
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    static startTestLogin(programId?: number, programInstitutionId?: string, requestBody?: StartTestDataHolder): CancelablePromise<string>;
    /**
     * /start-test/Start
     * Retrieves a URL that starts or restarts a test. The URL returned is time-sensitive and can be used only once. If the test is completed and has a score report, the score report is returned. If the test is completed and does not have a score report, the test is restarted on the “end of test display” or the last question of the test, whichever is earlier.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. The API matches examinees linked to this institution and the institution's children. The web API client must have access to this institution.
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    static startTestStart(programId?: number, programInstitutionId?: string, requestBody?: StartTestDataHolder): CancelablePromise<string>;
}
//# sourceMappingURL=StartTestService.d.ts.map