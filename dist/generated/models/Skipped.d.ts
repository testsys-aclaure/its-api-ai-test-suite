export type Skipped = {
    /**
     * Based on the skip configuration. Maximum number of questions that can be skipped in one cycle. Different values for cycle, run, and segment.
     */
    max?: number;
    count?: number;
    'count-scored'?: number;
    /**
     * Count of unanswered questions that are: (1) not in progress; (2) not rolled over; (3) not forfeited; and (4) do not match one of the skip sources.
     */
    'questions-not-counted'?: number;
    /**
     * SkipMax – Skipped, not less than 0. Not returned for in-progress results.
     */
    remaining?: number;
    /**
     * Specified as a number between 0 and 100. Not returned for in-progress results.
     */
    percentage?: number;
};
//# sourceMappingURL=Skipped.d.ts.map