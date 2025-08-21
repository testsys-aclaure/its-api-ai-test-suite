export type Clones = {
    /**
     * The number of complete clones.
     */
    complete?: number;
    /**
     * The number of correct clones.
     */
    correct?: number;
    /**
     * The number of incomplete clones.
     */
    incomplete?: number;
    /**
     * The number of incorrect clones.
     */
    incorrect?: number;
    /**
     * The raw score if all remaining clones are correct.
     */
    'max-possible-score'?: number;
    /**
     * The percent score if all remaining clones are correct.
     */
    'max-possible-percent-score'?: number;
    /**
     * The number of clone questions.
     */
    questions?: number;
    /**
     * The number of rollover clones.
     */
    rollover?: number;
    /**
     * The sum of clone item scores, affected by forfeited configuration.
     */
    score?: number;
    /**
     * The total number of seconds spent answering questions.
     */
    seconds?: number;
    /**
     * The average time spent per clone question.
     */
    'seconds-average'?: number;
    /**
     * The average time spent on critique/read-only page.
     */
    'seconds-review-average'?: number;
    /**
     * The number of skipped clones.
     */
    skipped?: number;
    /**
     * The total number of points for clone questions regardless of whether the question was answered or correctness. Affected by forfeited configuration.
     */
    'points-all'?: number;
    /**
     * The total number of points for clone questions answered regardless of correctness. Affected by forfeited configuration.
     */
    'points-answered'?: number;
    /**
     * The number of clones visited.
     */
    visited?: number;
    /**
     * The number of clones not visited.
     */
    'not-visited'?: number;
    /**
     * Specified as a number between 0 and 100 affected by forfeited configuration.
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
     * The number of clone questions excluding unscored and pretest.
     */
    'num-questions-scored'?: number;
};
//# sourceMappingURL=Clones.d.ts.map