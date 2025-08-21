export type Scored = {
    /**
     * The number of complete scored questions.
     */
    complete?: number;
    /**
     * The number of correct scored questions.
     */
    correct?: number;
    /**
     * The number of incomplete scored questions.
     */
    incomplete?: number;
    /**
     * The number of incorrect scored questions.
     */
    incorrect?: number;
    /**
     * The raw score if all remaining scored questions are correct.
     */
    'max-possible-score'?: number;
    /**
     * The percent score if all remaining scored questions are correct.
     */
    'max-possible-percent-score'?: number;
    /**
     * The number of scored questions.
     */
    questions?: number;
    /**
     * The number of rollover scored questions.
     */
    rollover?: number;
    /**
     * The sum of scored item scores, affected by forfeited configuration.
     */
    score?: number;
    /**
     * The total number of seconds spent answering scored questions.
     */
    seconds?: number;
    /**
     * The average time spent per scored question.
     */
    'seconds-average'?: number;
    /**
     * The average time spent on critique/read-only page.
     */
    'seconds-review-average'?: number;
    /**
     * The number of skipped scored questions.
     */
    skipped?: number;
    /**
     * The total number of points for scored questions regardless of whether the question was answered or correctness. Affected by forfeited configuration.
     */
    'points-all'?: number;
    /**
     * The total number of points for scored questions answered regardless of correctness. Affected by forfeited configuration.
     */
    'points-answered'?: number;
    /**
     * The number of scored questions visited.
     */
    visited?: number;
    /**
     * The number of scored questions not visited.
     */
    'not-visited'?: number;
    /**
     * Specified as a number between 0 and 100, affected by forfeited configuration.
     */
    'percent-correct'?: number;
    'num-skipped'?: number;
    /**
     * The total time spent on critique/read-only page.
     */
    'seconds-review'?: number;
    /**
     * Specified as a number between 0 and 100, affected by forfeited configuration.
     */
    'percent-score'?: number;
};
//# sourceMappingURL=Scored.d.ts.map