/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FormReporting = {
    /**
     * The group name.� For classifications, this is the IndexCode.
     */
    'group-name'?: string | null;
    /**
     * The group description.� For classifications, this is the description.
     */
    description?: string | null;
    /**
     * Possible values:
     *
     * | Group Type | Description                   |
     * | ---------- | ----------------------------- |
     * | 0          | Test                          |
     * | 1          | Delivery  section             |
     * | 2          | Reporting  group              |
     * | 3          | Essay                         |
     * | 4          | Test  (replaces 0 if present) |
     * | 5  � 99    | External                      |
     *
     */
    'group-type'?: number;
    /**
     * Total number of pretest items.
     */
    'num-pretest'?: number;
    /**
     * Total number of questions.
     */
    'num-questions'?: number;
    /**
     * Determines the type of cut score. Possible values:
     *
     * | Method ID | Description    |
     * | --------- | -------------- |
     * | 0         | None           |
     * | 1         | Raw  score     |
     * | 2         | Scaled  score  |
     * | 3         | Percent  score |
     *
     */
    'pass-method-id'?: number;
    /**
     * The minimum score needed to pass.
     */
    'raw-cut-score'?: number;
    /**
     * The maximum possible score.
     */
    'raw-max-score'?: number;
    /**
     * The minimum possible score.
     */
    'raw-min-score'?: number;
    /**
     * Possible values:
     *
     * | Calculation ID | Description                |
     * | -------------- | -------------------------- |
     * | 1              | Number  correct            |
     * | 2              | Weighted  raw sum          |
     * | 3              | Unweighted  scaled average |
     * | 4              | Unweighted  scaled sum     |
     * | 5              | Scripted                   |
     * | 6              | None                       |
     * | 7              | Average  weighted scores   |
     * | 8              | Rasch  1 parameter (Logit) |
     * | 9              | Rasch  1 parameter (Logit  |
     *
     *
     */
    'raw-score-calculation-id'?: number;
    /**
     * Possible values:
     *
     * | Option Bit                                                                       | Bit Value |
     * | -------------------------------------------------------------------------------- | --------- |
     * | 1  = Examinee must pass this reporting group to pass the parent reporting group. | 1         |
     *
     *
     */
    'reporting-group-options'?: number;
    /**
     * The scaled score the examinee must achieve to pass.
     */
    'scaled-cut-core'?: number;
    /**
     * The maximum possible scaled score.
     */
    'scaled-max-score'?: number;
    /**
     * The minimum possible scaled score.
     */
    'scaled-min-score'?: number;
    /**
     * Possible values:
     *
     * | Method ID | Description         |
     * | --------- | ------------------- |
     * | 0         | None                |
     * | 1         | Raw  score          |
     * | 2         | Percentage  correct |
     * | 3         | Percentage  score   |
     * | 4         | Range               |
     * | 5         | Table               |
     * | 6         | Linear  min         |
     * | 7         | Linear  max         |
     * | 8         | Linear  Bisection   |
     * | 9         | Linear  Min/Max     |
     *
     *
     */
    'scaling-method-id'?: number;
    /**
     * Number of digits to the right of decimal.� Only applies for calculated scores.
     */
    'scaling-precision'?: number;
    /**
     * Only applies for calculated scores.
     * Possible values:
     *
     * | Method ID | Description |
     * | --------- | ----------- |
     * | 0         | None        |
     * | 1         | Traditional |
     * | 2         | Truncate    |
     *
     */
    'scaling-rounding-method-id'?: number;
    /**
     * Optional sort order for reporting groups.
     */
    'sort-order'?: number;
    /**
     * Multiple for raw score.� Applied before RawScore set.
     */
    weight?: number;
};

