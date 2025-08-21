export type FormSet = {
    /**
     * The unique database identifier of the bank.
     */
    'iw-bank-id'?: number | null;
    /**
     * The unique file identifier within the bank.
     */
    'iw-item-id'?: number | null;
    /**
     * Possible Values:
     *
     * | Form Set Type        | Value |
     * | -------------------- | ----- |
     * | Reading  passage     | 1     |
     * | Article              | 2     |
     * | Case                 | 3     |
     * | Live  in application | 4     |
     * | Lab                  | 5     |
     *
     */
    'form-set-type-id'?: number | null;
    /**
     * The URID of the frameset if it was created in the pool.
     */
    'frameset-urid'?: string | null;
    /**
     * The URID of the reading passage.
     */
    'passage-urid'?: string | null;
    /**
     * Used if the set is an article.
     */
    description?: string | null;
    /**
     * The URID of the article.
     */
    'article-url'?: string | null;
    /**
     * A flag indicating whether the set is grouped on the same page in the user interface.
     */
    'group-for-display'?: boolean | null;
    /**
     * A flag indicating whether the set order is randomized.
     */
    'random-order'?: boolean | null;
    /**
     *
     * | Bit Flag                                                        | Bit Value |
     * | --------------------------------------------------------------- | --------- |
     * | 6  = Group all tasks onto one page                              | 32        |
     * | 7  = Display a checkbox for each task                           | 64        |
     * | 8  = Do not allow forward navigation until task(s) are complete | 128       |
     * | 9  = Requires advanced secure browser windowing                 | 256       |
     *
     */
    'item-flags'?: number | null;
    /**
     * A flag indicating whether the set is inactive.
     */
    inactive?: boolean | null;
    /**
     * A flag indicating whether the set is a pretest set.
     */
    pretest?: boolean | null;
};
//# sourceMappingURL=FormSet.d.ts.map