import type { LongitudinalGroupSegmentDetail } from '../models/LongitudinalGroupSegmentDetail';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class LongitudinalSegmentDetailService {
    /**
     * /examinee/longitudinal-segment-detail/query
     * Retrieves all the information needed to build an examinee's continuous learning dashboard for a specific segment.
     * @param programId The unique program identifier provided as part of configuration.
     * @param longitudinalGroupId The unique ITS database identifier of the longitudinal group.
     * @param longitudinalGroupName The unique textual identifier of the longitudinal group.
     * @param examineeId **One of the examinee identifiers below must be supplied**
     * The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program's system identifier of the examinee.
     * @param programExamineePublicId The program's public or business identifier of the examinee.
     * @param includeFlag Bit flag that represents any information you wish to include in the result.
     * Example: To include examinee and longitudinal information, use 5 to represent 1 + 4.
     * **Bit Information**
     *
     * | Bit Flag                  | Bit Value |
     * |---------------------------|-----------|
     * | 1=Event Information       | 1         |
     * | 2=Detail Information      | 2         |
     * | 3=Score Group Information | 4         |
     * | 4=Time Bank Information   | 8         |
     * @param resultId The unique ITS database identifier of the test result. If this is not supplied, the last result taken by the examinee is returned.
     * @returns LongitudinalGroupSegmentDetail OK
     * @throws ApiError
     */
    static longitudinalSegmentDetailQuery(programId: number, longitudinalGroupId?: number, longitudinalGroupName?: string, examineeId?: number, programExamineeSystemId?: string, programExamineePublicId?: string, includeFlag?: number, resultId?: number): CancelablePromise<LongitudinalGroupSegmentDetail>;
}
//# sourceMappingURL=LongitudinalSegmentDetailService.d.ts.map