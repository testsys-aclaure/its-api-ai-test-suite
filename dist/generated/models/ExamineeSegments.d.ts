export type ExamineeSegments = {
    /**
     * The sequence of the cycle for the examinee.
     */
    'cycle-sequence'?: number;
    /**
     * The sequence of the run for the examinee.
     */
    'run-sequence'?: number;
    /**
     * The sequence of the segment for the examinee.
     */
    'segment-sequence'?: number;
    /**
     * The start date of the segment in UTC.
     */
    'segment-start-utc'?: string;
    /**
     * The end date of the segment in UTC.
     */
    'segment-end-utc'?: string;
    /**
     * The table below includes the possible `segment-status` values.
     * **Segment Status**
     *
     * | Segment Status | Description                   |
     * |----------------|-------------------------------|
     * | 1              | The segment is in the past.   |
     * | 2              | The segment is current.       |
     * | 3              | The segment is in the future. |
     */
    'segment-status'?: number;
    /**
     * The sabbatical status for the examinee. False if Sabbatical cancelled or rejected or none taken.
     */
    sabbatical?: boolean;
    /**
     * The unique database identifier of the test result linked to the segment.
     */
    'result-id'?: number;
};
//# sourceMappingURL=ExamineeSegments.d.ts.map