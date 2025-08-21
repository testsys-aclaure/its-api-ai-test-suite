import type { ResultIDs } from '../models/ResultIDs';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ResultsService {
    /**
     * /result-identifier/Query
     * Retrieves result identifiers that match the requested query.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. The API matches results linked to this institution and the institution’s children. The API client must have access to this institution.
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program's system identifier of the examinee.
     * @param programExamineePublicId The program's public or business identifier of the examinee.
     * @param programRegistrationId The program's registration identifier.
     * @param programCenterId The program's managed center.
     * @param cohortId The ITS database identifier of the cohort.
     * @param eventId The ITS database identifier of the event.
     * @param testId The ITS database identifier of the test.
     * @param formId The ITS database identifier of the form.
     * @param longitudinalGroupId The unique ITS database identifier of the longitudinal group.
     * @param startUtc Used in conjunction with the end-utc to give a time range for results with a modified date in that time range, in UTC.
     * @param endUtc Used in conjunction with the start-utc to give a time range for results with a modified date in that time range, in UTC.
     * @param completedOnly If `true`, only completed results are returned.
     * @param equatedOnly If `true`, only results linked to equated forms are returned.
     * @param includeDemo If `true`, demo results are included.
     * @param limit The number of `result-id`s to return. By default, this call returns a maximum of 10,000 identifiers.
     * @param beforeId A specific `result-id`. The API returns `result-id`s that precede `before-id`. This parameter cannot be used if `after-id` is used.
     * @param afterId A specific `result-id`. The API returns `result-id`s that follow `after-id`. This parameter cannot be used if `before-id` is used.
     * @returns ResultIDs OK
     * @throws ApiError
     */
    static resultIdentifierQuery(programId: number, programInstitutionId?: Array<string>, examineeId?: Array<number>, programExamineeSystemId?: Array<string>, programExamineePublicId?: Array<string>, programRegistrationId?: Array<string>, programCenterId?: Array<string>, cohortId?: Array<number>, eventId?: Array<number>, testId?: Array<number>, formId?: Array<number>, longitudinalGroupId?: Array<number>, startUtc?: string, endUtc?: string, completedOnly?: boolean, equatedOnly?: boolean, includeDemo?: boolean, limit?: number, beforeId?: number, afterId?: number): CancelablePromise<ResultIDs>;
}
//# sourceMappingURL=ResultsService.d.ts.map