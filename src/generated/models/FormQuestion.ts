/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FormQuestion = {
    /**
     * The delivery section name that this item was delivered in.
     */
    section?: string | null;
    /**
     * The unique section identifier.
     */
    'section-id'?: number | null;
    /**
     * The sequence of the item in the section as defined.
     */
    'section-sequence'?: any;
    /**
     * The sequence that the item was defined within the test.
     */
    sequence?: number | null;
    /**
     * A flag indicating whether the item is active.
     */
    active?: boolean | null;
    /**
     * A flag indicating whether the item is a pretest item.
     */
    pretest?: boolean | null;
    /**
     * A flag indicating whether the item is unscored.
     */
    unscored?: boolean | null;
    /**
     * A flag indicating whether the item is configured to be always correct.
     */
    'always-correct'?: boolean | null;
    /**
     * Possible values:
     *
     * | Used On | Description |
     * | ------- | ----------- |
     * | 1       | Test        |
     * | 2       | Tutorial    |
     * | 3       | Survey      |
     *
     */
    'used-on'?: number | null;
    /**
     * This is present if the item is part of one or more reporting groups.� The names of the reporting groups are �|� delimited.
     */
    'reporting-groups'?: string | null;
    /**
     * Specified as a number between -5 and 5 if IRT, or 0 and 1 if pvalue.
     */
    difficulty?: number | null;
    /**
     * Used for 3-param rasch.
     */
    discrimination?: number | null;
    /**
     * Used for 3-param rasch.
     */
    'guess-probability'?: number | null;
    /**
     * The same item may be published for different languages.
     */
    language?: string | null;
    /**
     * The name of the item.
     */
    name?: string | null;
    /**
     * Clone family name.
     */
    'clone-family'?: string | null;
    /**
     * Pass through from item banking system. Item name (identifier) from external system.
     */
    'external-name'?: string | null;
    /**
     * The description of the question.
     */
    description?: string | null;
    /**
     * The item type being returned. See domain table. Different than ResultAnswers ItemType.
     */
    'item-type-id'?: number | null;
    /**
     * Custom item type code configured in item bank.
     */
    'Item-type-code'?: string | null;
    /**
     * Description of item type.
     */
    'Item-type-description'?: string | null;
    /**
     * Version of the item.
     */
    version?: string | null;
    /**
     * IX.� Language and version independent identifier.
     */
    'iw-item-id'?: number | null;
    /**
     * IX.� Bank identifier.
     */
    'iw-bank-id'?: number | null;
    /**
     * Number of exhibits for item.� Only set if item has exhibits. ITD 12.0+.
     */
    'exhibit-count'?: number | null;
    /**
     * Bitflag. See IW for database.
     */
    'item-flags'?: number | null;
    /**
     * Default GETDATE(). DateTime this record was created or modified.
     */
    'modify-utc'?: string | null;
    /**
     * A flag indicating whether the item is an open-ended item.
     */
    'open-ended'?: boolean | null;
    /**
     * A flag indicating whether the item is a polytomous item.
     */
    polytomous?: boolean | null;
    /**
     * The key for the question. For multiple choice questions, this is a number (1=A, etc). If the question has multiple answers, the key is separated by a comma.� For instance, a key of "1, 2" means that the user must answer A and B to get the item correct.
     */
    key?: string | null;
    /**
     * The maximum score the examinee could have gotten for this question.
     */
    'max-score'?: number | null;
    /**
     * The minimum score the examinee could have gotten for this question.
     */
    'min-score'?: number | null;
    /**
     * Score to set if item is skipped.
     */
    'skip-score'?: number | null;
    /**
     * Minimum score that answering or skipping question receives.
     */
    'min-correct-score'?: number | null;
    /**
     * Possible Values:
     *
     * | Method ID | Description            |
     * | --------- | ---------------------- |
     * | 0         | Standard               |
     * | 1         | Weighted  key          |
     * | 2         | Weighted  answer       |
     * | 3         | Min/Max                |
     * | 4         | Scripted               |
     * | 5         | Placeholder            |
     * | 6         | Multi-key  expressions |
     *
     */
    'scoring-method'?: number | null;
    /**
     * Links to Master.Rubrics.
     */
    'rubric-id'?: number | null;
    /**
     * Set if the item was required.
     */
    required?: boolean | null;
    /**
     * The name of the reading passage.
     */
    'reading-passage-name'?: string | null;
    /**
     * Maximum number of options that can be selected.� Multiple choice only, ITD 12.0+.
     */
    'max-select'?: number | null;
    /**
     * Minimum number of groups that must be answered for item to be considered complete. Matrix only, ITD 12.0+.
     */
    'min-groups'?: number | null;
    /**
     * Minimum number of options that must be selected for complete answer. Multiple choice only, ITD 12.0+.
     */
    'min-select'?: number | null;
    /**
     * Item timing (in seconds).
     */
    'max-time'?: number | null;
    /**
     * Populated if the item links to a set.
     */
    'form-set-id'?: number | null;
    /**
     * The sequence of the item within the set.
     */
    'set-sequence'?: number | null;
};

