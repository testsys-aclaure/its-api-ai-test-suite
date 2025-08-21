export type Total = {
    /**
     * The number of questions.
     */
    questions?: number;
    /**
     * Number of questions. Includes pretest and unscored. Includes rollover if incomplete result. Includes Skipped.NotCounted.
     */
    'question-all'?: number;
    /**
     * The number of complete scored questions.
     */
    complete?: number;
    /**
     * The number of correct scored questions.
     */
    incomplete?: number;
    /**
     * The number of questions visited.
     */
    visited?: number;
    /**
     * The number of questions not visited.
     */
    'not-visited'?: number;
    /**
     * The number of questions visited but incomplete.
     */
    'num-skipped'?: number;
    /**
     * The number of rollover questions.
     */
    'num-rollovers'?: number;
    /**
     * The total number of seconds spent answering questions.
     */
    seconds?: number;
    /**
     * The total time spent on critique/read-only page.
     */
    'review-seconds'?: number;
    /**
     * The average time spent on critique/read-only page.
     */
    'average-review-seconds'?: number;
    /**
     * The average time spent per scored question.
     */
    'average-seconds'?: number;
    /**
     * Specified as a number between 0 and 100.
     */
    'percent-complete'?: number;
    /**
     * The number of questions marked.
     */
    marked?: number;
    /**
     * The number of questions marked that were correct.
     */
    'marked-correct'?: number;
    /**
     * The number of questions with notes.
     */
    'num-with-notes'?: number;
    /**
     * The number of questions with comments.
     */
    'num-with-comments'?: number;
};
//# sourceMappingURL=Total.d.ts.map