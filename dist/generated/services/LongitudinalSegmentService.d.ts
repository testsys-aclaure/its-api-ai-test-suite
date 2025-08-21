import type { Result } from '../models/Result';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class LongitudinalSegmentService {
    /**
     * /examinee/longitudinal-segments/query
     * Retrieves high-level details about examinee segments for a specific longitudinal group.
     * @param programId The unique program identifier provided as part of configuration.
     * @param longitudinalGroupId The unique ITS database identifier of the longitudinal group. If `longitudinal-group-id` and `longitudinal-group-name` are not supplied, all longitudinal groups for the matched examinees are returned.
     * @param longitudinalGroupName The unique textual identifier of the longitudinal group. If `longitudinal-group-id` and `longitudinal-group-name` are not supplied, all longitudinal groups for the matched examinees are returned.
     * @param startUtc Filter for the start date to query from. Must include an end-utc date. Looks for all segments that start in this date range.
     * @param endUtc Filter for the end date to query to. Must include an end-utc date. Looks for all segments that start in this date range.
     * @param cycleNum The cycle sequence number.
     * @param runNum The run sequence number. Must include a cycle number.
     * @param segmentNum The segment sequence number. Must include a cycle and run number.
     * @param examineeId **One of the examinee identifiers below must be supplied**
     * The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program's system identifier of the examinee.
     * @param programExamineePublicId The program's public or business identifier of the examinee.
     * @returns Result OK
     * @throws ApiError
     */
    static longitudinalSegmentsQuery(programId: number, longitudinalGroupId?: number, longitudinalGroupName?: string, startUtc?: string, endUtc?: string, cycleNum?: number, runNum?: number, segmentNum?: number, examineeId?: number, programExamineeSystemId?: string, programExamineePublicId?: string): CancelablePromise<Array<Result>>;
}
//# sourceMappingURL=LongitudinalSegmentService.d.ts.map