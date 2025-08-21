/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Retries = {
    /**
     * The number of complete retry questions.
     */
    complete?: number;
    /**
     * The number of correct retry questions.
     */
    correct?: number;
    /**
     * The number of incomplete retry questions.
     */
    incomplete?: number;
    /**
     * The number of incorrect retry questions.
     */
    incorrect?: number;
    /**
     * The raw score if all remaining retry questions are correct.
     */
    'max-possible-score'?: number;
    /**
     * The percent score if all remaining retry questions are correct.
     */
    'max-possible-percent-score'?: number;
    /**
     * The number of retry questions.
     */
    questions?: number;
    /**
     * The number of rollover retry questions.
     */
    rollover?: number;
    /**
     * The sum of retry item scores, affected by forfeited configuration.
     */
    score?: number;
    /**
     * The total number of seconds spent answering retry questions.
     */
    seconds?: number;
    /**
     * The average time spent per retry question.
     */
    'seconds-average'?: number;
    /**
     * The average time spent on critique/read-only page.
     */
    'seconds-review-average'?: number;
    /**
     * The total number of points for retry questions regardless of whether the question was answered or correctness. Affected by forfeited configuration.
     */
    'points-all'?: number;
    /**
     * The total number of points for retry questions answered regardless of correctness. Affected by forfeited configuration.
     */
    'points-answered'?: number;
    /**
     * The number of retry questions visited.
     */
    visited?: number;
    /**
     * The number of retry questions not visited.
     */
    'not-visited'?: number;
    /**
     * Specified as a number between 0 and 100, affected by forfeited configuration.
     */
    'percent-correct'?: number;
    /**
     * The number of skipped retry questions.
     */
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
     * The number of retry questions excluding unscored and pretest.
     */
    'num-question-scored'?: number;
};

