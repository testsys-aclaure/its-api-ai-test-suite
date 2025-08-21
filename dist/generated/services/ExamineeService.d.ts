import type { Examinee2 } from '../models/Examinee2';
import type { ExamineeDataHolder1 } from '../models/ExamineeDataHolder1';
import type { ExamineeResponse } from '../models/ExamineeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ExamineeService {
    /**
     * /examinee/query
     * Retrieves details about examinees in a program.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. The API matches examinees linked to this institution and the institution's children. The web API client must have access to this institution.
     * @param examineeId The unique ITS database identifier of the examinee. Use a comma-separated list to query on multiple examinees.
     * @param programExamineeSystemId The program's system identifier of the examinee. Use a comma-separated list to query on multiple examinees.
     * @param programExamineePublicId The program's public or business identifier of the examinee. Use a comma-separated list to query on multiple examinees.
     * @param returnFields
     * @param includeFlag Bit flag for any information you wish to include in the examinee object. If neither `include-flag` or `exclude-flag` are returned, all information is included. This parameter cannot be used if the exclude-flag parameter is used. Example: To include profile, address, and institution information, use 1096 to represent 8 + 64 + 1024. Bit Information
     *
     * | Bit Flag                            | Bit Value |
     * |-------------------------------------|-----------|
     * | 1 = Examinee status                 | 1         |
     * | 2 = Enrollment status               | 2         |
     * | 3 = Login information               | 4         |
     * | 4 = Profile information             | 8         |
     * | 5 = Examinee photo                  | 16        |
     * | 6 = Contact information             | 32        |
     * | 7 = Address                         | 64        |
     * | 8 = Job information                 | 218       |
     * | 9 = Program specific properties     | 256       |
     * | 10 = Delivery options and overrides | 512       |
     * | 11 = Institutions                   | 1024      |
     * | 12 = Certifications                 | 2048      |
     * @param excludeFlag Bit flag for any information you wish to exclude from the examinee object. This parameter cannot be used if the `include-flag` parameter is used. See the `include-flag` parameter for a list of supported bits.
     * @param limit The number of examinee objects to return. By default, this call returns a maximum of 500 objects. The limit can be set to any number less than 500.
     * @param beforeId A specific `examinee-id`. The API returns objects with `examinee-id`s that precede `before-id`. This parameter cannot be used if `after-id` is used.
     * @param afterId A specific `examinee-id`. The API returns objects with `examinee-id`s that follow `after-id`. This parameter cannot be used if `before-id` is used.
     * @returns Examinee2 OK
     * @throws ApiError
     */
    static examineeQuery(programId: number, programInstitutionId?: Array<string>, examineeId?: Array<number>, programExamineeSystemId?: Array<string>, programExamineePublicId?: Array<string>, returnFields?: number, includeFlag?: number, excludeFlag?: number, limit?: number, beforeId?: number, afterId?: number): CancelablePromise<Array<Examinee2>>;
    /**
     * /examinee/import
     * Creates or updates the examinee within a program. The POST update is a complete overwrite of the examinee in the ITS system. Any parameter not passed is cleared. Use the PATCH verb to update single fields. Please work with your Program Manager to setup the import template.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Examinees are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns ExamineeResponse OK
     * @throws ApiError
     */
    static examineeImport(programId: number, programInstitutionId?: string, requestBody?: ExamineeDataHolder1): CancelablePromise<Array<ExamineeResponse>>;
    /**
     * /examinee/import
     * Creates or updates the examinee within a program. The POST update is a complete overwrite of the examinee in the ITS system. Any parameter not passed is cleared. Use the PATCH verb to update single fields. Please work with your Program Manager to setup the import template.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Examinees are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns ExamineeResponse OK
     * @throws ApiError
     */
    static examineeImport1(programId: number, programInstitutionId?: string, requestBody?: ExamineeDataHolder1): CancelablePromise<Array<ExamineeResponse>>;
    /**
     * /examinee/delete
     * Deletes an examinee from a program.
     * @param programId The unique program identifier provided as part of configuration.
     * @param deleteReason
     * @param programInstitutionId The unique program identifier of an institution. The API matches examinees linked to this institution and the institution's children. The web API client must have access to this institution.
     * @param examineeId The unique ITS database identifier of the examinee. One of the three examinee identifiers are required.
     * @param programExamineePublicId The program's public or business identifier of the examinee. One of the three examinee identifiers are required.
     * @param programExamineeSystemId The program's system identifier of the examinee. One of the three examinee identifiers are required.
     * @returns any OK
     * @throws ApiError
     */
    static examineeDelete(programId: number, deleteReason: string, programInstitutionId?: Array<string>, examineeId?: Array<number>, programExamineePublicId?: Array<string>, programExamineeSystemId?: Array<string>): CancelablePromise<any>;
}
//# sourceMappingURL=ExamineeService.d.ts.map