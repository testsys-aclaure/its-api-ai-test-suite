export type Primary = {
    /**
     * The number of complete primary questions.
     */
    complete?: number;
    /**
     * The number of correct primary questions.
     */
    correct?: number;
    /**
     * The number of incomplete primary questions.
     */
    incomplete?: number;
    /**
     * The number of incorrect primary questions.
     */
    incorrect?: number;
    /**
     * The raw score if all remaining primary questions are correct.
     */
    'max-possible-score'?: number;
    /**
     * The percent score if all remaining primary questions are correct.
     */
    'max-possible-percent-score'?: number;
    /**
     * The number of primary questions.
     */
    questions?: number;
    /**
     * The number of rollover primary questions.
     */
    rollover?: number;
    /**
     * The sum of primary item scores, affected by forfeited configuration.
     */
    score?: number;
    /**
     * The total number of seconds spent answering primary questions.
     */
    seconds?: number;
    /**
     * The average time spent per primary question.
     */
    'seconds-average'?: number;
    /**
     * The average time spent on critique/read-only page.
     */
    'seconds-review-average'?: number;
    /**
     * The number of skipped primary questions.
     */
    skipped?: number;
    /**
     * The total number of points for primary questions regardless of whether the question was answered or correctness. Affected by forfeited configuration.
     */
    'points-all'?: number;
    /**
     * The total number of points for primary questions answered regardless of correctness. Affected by forfeited configuration.
     */
    'points-answered'?: number;
    /**
     * The number of primary questions visited.
     */
    visited?: number;
    /**
     * The number of primary questions not visited.
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
    /**
     * The number of primary questions excluding unscored and pretest.
     */
    'num-questions-scored'?: number;
};
//# sourceMappingURL=Primary.d.ts.map