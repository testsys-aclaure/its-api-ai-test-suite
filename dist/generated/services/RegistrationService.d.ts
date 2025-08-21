import type { RegistrationCreateRequest } from '../models/RegistrationCreateRequest';
import type { RegistrationCreateUpdateRequest } from '../models/RegistrationCreateUpdateRequest';
import type { RegistrationDeleteStatus } from '../models/RegistrationDeleteStatus';
import type { RegistrationImportResponse } from '../models/RegistrationImportResponse';
import type { RegistrationQueryResponse } from '../models/RegistrationQueryResponse';
import type { RegistrationUpdateResponse } from '../models/RegistrationUpdateResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class RegistrationService {
    /**
     * /registration/import
     * Creates a new registration or updates all fields for the record if given a program-registration-id.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param requestBody
     * @returns RegistrationImportResponse OK
     * @throws ApiError
     */
    static registrationImportCreate(programId: number, programInstitutionId?: string, requestBody?: Array<RegistrationCreateRequest>): CancelablePromise<Array<RegistrationImportResponse>>;
    /**
     * /registration/import
     * Updates only the fields given for the record if given a program-registration-id.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param requestBody
     * @returns RegistrationImportResponse OK
     * @throws ApiError
     */
    static registrationUpdate(programId: number, programInstitutionId?: string, requestBody?: Array<RegistrationCreateUpdateRequest>): CancelablePromise<Array<RegistrationImportResponse>>;
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
    static patchRegistrationUpdate(programId: number, programInstitutionId?: string, examineeId?: number, programExamineePublicId?: string, programExamineeSystemId?: string, programExamineeInstitutionId?: string, programRegistrationId?: string, registrationId?: number): CancelablePromise<RegistrationUpdateResponse>;
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
    static registrationQuery(programId: number, programInstitutionId?: string, registrationId?: Array<number>, programRegistrationId?: Array<string>, examineeId?: number, programExamineePublicId?: string, programExamineeSystemId?: string, programExamineeInstitutionId?: string, startUtc?: string, endUtc?: string, testId?: number, started?: boolean, completed?: boolean, excludeFlag?: number, limit?: number, beforeId?: number, afterId?: number): CancelablePromise<Array<RegistrationQueryResponse>>;
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
    static registrationDelete(programId: number, reason: string, programInstitutionId?: string, registrationId?: Array<number>, programRegistrationId?: Array<string>): CancelablePromise<Array<RegistrationDeleteStatus>>;
}
//# sourceMappingURL=RegistrationService.d.ts.map