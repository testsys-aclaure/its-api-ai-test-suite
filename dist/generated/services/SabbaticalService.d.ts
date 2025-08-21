import type { Sabbatical } from '../models/Sabbatical';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SabbaticalService {
    /**
     * /sabbatical/query
     * Queries the Sabbatical tables for information on an examinee’s sabbatical.
     * @param programId The unique program identifier provided as part of configuration.
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program’s system identifier of the examinee.
     * @param programExamineePublicId The program’s public or business identifier of the examinee.
     * @param examineeSabbaticalId The unique ITS database identifier of the examinee’s sabbatical.
     * @param startUtc The start date >= of the CreateUTC field of the message record.
     * @param endUtc The end date <= of the CreateUTC field of the message record.
     * @returns Sabbatical OK
     * @throws ApiError
     */
    static sabbaticalQuery(programId: number, examineeId?: number, programExamineeSystemId?: string, programExamineePublicId?: string, examineeSabbaticalId?: string, startUtc?: string, endUtc?: string): CancelablePromise<Array<Sabbatical>>;
}
//# sourceMappingURL=SabbaticalService.d.ts.map