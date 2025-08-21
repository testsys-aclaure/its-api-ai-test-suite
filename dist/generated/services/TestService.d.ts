import type { TestCreateRequest } from '../models/TestCreateRequest';
import type { TestQueryResult } from '../models/TestQueryResult';
import type { TestResponse } from '../models/TestResponse';
import type { TestUpdateRequest } from '../models/TestUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class TestService {
    /**
     * /test/query
     * Gets test query result object according to test object spec.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param testName The unique textual identifier of the test. Multiple Supported
     * @param testId The unique database identifier of the test. Multiple Supported
     * @param includeInactive A flag indicating whether inactive tests should be returned
     * @param includeDemo A flag indicating whether demo tests should be returned
     * @param lastModifiedUtc The UTC date/time to find all new or updated tests since that date/time.
     * @param limit The number of test objects to return. By default, this call will return a maximum of 1000 test objects. The limit can be set to any number less than 1000.
     * @param beforeId The test-id is the pagination ID used for this resource. Test-id objects with IDs immediately before this ID are returned. This parameter cannot be used if after-id is used.
     * @param afterId The test-id is the pagination ID used for this resource. Test objects with IDs immediately after this ID are returned. This parameter cannot be used if before-id is used.
     * @param includeFlag Bit flag for any information you wish to include in the test object. If include-flag is not requested, all information is included.
     * Example: To include general form information and informational meta data, use 65 to represent 1+ 64.
     * **Bit Information**
     *
     * | Bit Flag                     | Bit Value |
     * |------------------------------|-----------|
     * | 1 = General Test Information | 1         |
     * | 2 = Test Type                | 2         |
     * | 3 = Audits                   | 4         |
     * | 4 = Form Selection           | 8         |
     * | 5 = Attempts                 | 16        |
     * | 6 = Academic Models          | 32        |
     * | 7 = Live in Application      | 64        |
     * | 8 = Reporting & Exporting    | 128       |
     * | 9 = Test Categories & Groups | 256       |
     * | 10 = Start Test              | 512       |
     * | 11 = Automatic Close         | 1024      |
     * | 12 = Continuous Learning     | 2048      |
     * | 13 = Observational           | 4096      |
     *
     * @returns TestQueryResult OK
     * @throws ApiError
     */
    static testQuery(programId: number, programInstitutionId?: string, testName?: Array<string>, testId?: Array<number>, includeInactive?: boolean, includeDemo?: boolean, lastModifiedUtc?: string, limit?: number, beforeId?: number, afterId?: number, includeFlag?: number): CancelablePromise<Array<TestQueryResult>>;
    /**
     * /test/create
     * Creates a test from the test create request object passed in.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns TestResponse OK
     * @throws ApiError
     */
    static testCreate(programId: number, programInstitutionId?: string, requestBody?: TestCreateRequest): CancelablePromise<TestResponse>;
    /**
     * /test/delete
     * Deletes tests matching test ids.
     * @param programId The unique program identifier provided as part of configuration.
     * @param testId The unique database identifier of the test. Multiple Supported
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @returns TestResponse OK
     * @throws ApiError
     */
    static testDelete(programId: number, testId: Array<number>, programInstitutionId?: string): CancelablePromise<Array<TestResponse>>;
    /**
     * /test/update
     * Gets test object according to test object spec.
     * @param programId The unique program identifier provided as part of configuration.
     * @param requestBody
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @returns TestResponse OK
     * @throws ApiError
     */
    static testUpdate(programId: number, requestBody: TestUpdateRequest, programInstitutionId?: string): CancelablePromise<TestResponse>;
}
//# sourceMappingURL=TestService.d.ts.map