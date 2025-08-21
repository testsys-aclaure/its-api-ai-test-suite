import type { ImportInstitutionResponse } from '../models/ImportInstitutionResponse';
import type { Institution } from '../models/Institution';
import type { QueryInstitutionResponse } from '../models/QueryInstitutionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class InstitutionService {
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
    static channelInstitutionQuery(programId: number, programInstitutionId?: string, limit?: number, beforeId?: number, afterId?: number): CancelablePromise<Array<QueryInstitutionResponse>>;
    /**
     * /channel/institutions/import
     * Creates institutions.
     * @param programId The unique program identifier provided as part of configuration.
     * @param parentProgramInstitutionId The institutions imported will be children of this parent institution. The web API client must have access to this institution or a parent of this institution. This parameter is required if the web API client is an institution-level client.
     * @param requestBody
     * @returns ImportInstitutionResponse OK
     * @throws ApiError
     */
    static channelInstitutionImport(programId: number, parentProgramInstitutionId?: string, requestBody?: Institution): CancelablePromise<ImportInstitutionResponse>;
    /**
     * /channel/institutions/import
     * Creates institutions.
     * @param programId The unique program identifier provided as part of configuration.
     * @param parentProgramInstitutionId The institutions imported will be children of this parent institution. The web API client must have access to this institution or a parent of this institution. This parameter is required if the web API client is an institution-level client.
     * @param requestBody
     * @returns ImportInstitutionResponse OK
     * @throws ApiError
     */
    static channelInstitutionImport1(programId: number, parentProgramInstitutionId?: string, requestBody?: Institution): CancelablePromise<ImportInstitutionResponse>;
}
//# sourceMappingURL=InstitutionService.d.ts.map