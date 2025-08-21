import type { Message } from '../models/Message';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class MessageHistoryService {
    /**
     * /message-history/query
     * Endpoint for querying message history
     * @param programId The program's unique identifier
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program’s system identifier of the examinee.
     * @param programExamineePublicId The program’s public or business identifier of the examinee.
     * @param startUtc The start date >= of the CreateUTC field of the message record.
     * @param endUtc The end date <= of the CreateUTC field of the message record.
     * @param beforeId Before ID for message history
     * @param afterId After ID for message history
     * @param limit Limit of the number of messages returned
     * @returns Message OK
     * @throws ApiError
     */
    static examineeQuery1(programId?: number, examineeId?: number, programExamineeSystemId?: string, programExamineePublicId?: string, startUtc?: string, endUtc?: string, beforeId?: number, afterId?: number, limit?: number): CancelablePromise<Array<Message>>;
}
//# sourceMappingURL=MessageHistoryService.d.ts.map