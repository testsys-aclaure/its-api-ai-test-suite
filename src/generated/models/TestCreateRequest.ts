/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestFormDate } from './TestFormDate';
export type TestCreateRequest = {
    /**
     * Description of the test.  This is the description shown by StartTest.  Note that description is varchar. Localized version in Translations.
     */
    description?: string | null;
    /**
     * The languages the test is available in.  This is a comma delimited list.
     */
    languages?: string | null;
    /**
     * Program specific version associated with test.  If used by a program, must be populated either by a database trigger or custom publishing sproc.
     */
    'program-version'?: string | null;
    /**
     * Set if the test is a demonstration or sample test.
     */
    demo?: boolean | null;
    /**
     * If true, this test can be used by our ITS test simulation software.
     */
    simulation?: boolean | null;
    /**
     * The type of test (test, quiz, tutorial, survey, dynamic pool, flex pool, adaptive pool). Maps to dbo.TestTypes in the IW database.
     *
     * | TestTypeID | Code          |
     * |------------|---------------|
     * | 0          | Test          |
     * | 1          | Section       |
     * | 2          | Tutorial      |
     * | 3          | Survey        |
     * | 4          | Test Template |
     * | 5          | Quiz          |
     * | 6          | Dynamic Test  |
     * | 7          | Dynamic Pool  |
     * | 8          | Flex Pool     |
     * | 9          | Adaptive Pool |
     * | 10         | Article Block |
     * | 11         | Content Block |
     *
     */
    'test-type-id'?: number | null;
    /**
     * Bit flag for test usages
     *
     * | Bit Flag                                                  | Bit Value |
     * |-----------------------------------------------------------|-----------|
     * | 1 = Class assignment (home / proctored)                   | 1         |
     * | 2 = Scheduled administrations                             | 2         |
     * | 3 = Cohort administrations                                | 4         |
     * | 4 = Class practice (always available)                     | 8         |
     * | 5 = Class proctored assignment                            | 16        |
     * | 6 = Sample test for system verification                   | 32        |
     * | 7 = Simulation test                                       | 64        |
     * | 8 = System check test                                     | 128       |
     * | 9 = Program test available for institution administrators | 256       |
     * | 10 = Remote proctor onboarding test                       | 512       |
     * | 11 = Survey UI                                            | 1024      |
     *
     */
    'test-usages'?: number | null;
    /**
     * The number of hours before a test is considered abandoned.  If NULL, then no restartable results are considered abandoned.  If 0, then all restartable results are considered abandoned, unless active within 30 minutes.
     */
    'abandoned-hours'?: number | null;
    /**
     * The date form selection delivery counts should begin from in UTC.
     */
    'form-selection-start-utc'?: string | null;
    /**
     * Number of days that a set is active before rotating to next set.
     */
    'set-days'?: number | null;
    /**
     * Current set number. Must be set for sets to be considered in form selection.
     */
    'set-number'?: number | null;
    /**
     * Start date when current set was selected in UTC
     */
    'set-start-utc'?: string | null;
    /**
     * All variations will select the form least seen by examinee.
     *
     * | Value | Description                                        |
     * |-------|----------------------------------------------------|
     * | 1     | balance based on counts of delivery                |
     * | 2     | random form selection (used for very high volumes) |
     * | 3     | institutions dates, then do random form selection  |
     *
     */
    'test-form-selection-id'?: number | null;
    /**
     * Period for tracking max attempts.
     */
    'max-attempts-days'?: number | null;
    /**
     * Total number of attempts to pass that an examinee gets within max-attempt-days.
     */
    'max-attempts'?: number | null;
    /**
     * Minimum number of days that must elapsed before an examinee can retest on any form of the test.
     */
    'min-test-retake-days'?: number | null;
    /**
     * The number of days that must pass before a person can see a form again.
     */
    'min-retest-days'?: number | null;
    /**
     * Links category to a subject. Subjects may be program or institution defined. Institution subjects may be defined anywhere in the hierarchy,and are available to the institution and its children.
     */
    'subject-id'?: number | null;
    /**
     * Difficulty of test.
     * **Possible Values**
     *
     * | Test Difficulty | Value |
     * |-----------------|-------|
     * | Easy            | 1     |
     * | Moderate        | 2     |
     * | Hard            | 4     |
     *
     */
    'test-difficulty-id'?: number | null;
    /**
     * Used for Live in Application exams. For Windows, this is the class code.
     */
    'application-identifier-windows'?: string | null;
    /**
     * Used for Live in Application exams.
     */
    'application-identifier-mac'?: string | null;
    /**
     * If set, then test is linked to a subprogram. Subprograms allows reporting systems to determine method of reporting, and tests that can be reported on.
     */
    'sub-program-id'?: number | null;
    /**
     * The restrictions set on test data.
     * **Possible Values**
     *
     * | Bit Flag                                        | Bit Value |
     * |-------------------------------------------------|-----------|
     * | 1 = Question information                        | 1         |
     * | 2 = Group scores except scaled score and timing | 2         |
     * | 3 = Personal identifying information            | 4         |
     *
     */
    'test-export-restrictions'?: number | null;
    /**
     * Links to specific test category. Test categories are used for content security. Also used for grouping tests in the My Classes assignment picker.
     */
    'test-category-id'?: number | null;
    /**
     * Used for sorting tests within category.
     */
    'sort-key'?: string | null;
    /**
     * Used for delivery overrides.
     */
    'test-group-id'?: number | null;
    /**
     * The number of hours after the last modification before a result is automatically closed.  This requires the “Test Complete Service” to be running for the program.  Should be NULL if not set, but 0 will be ignored by service.
     */
    'max-hours'?: number | null;
    /**
     * The number of days after the last modification before a result is automatically closed.  This requires the “Test Complete Service” to be running for the program.  Should be NULL if not set, but 0 will be ignored by service.
     */
    'num-days'?: number | null;
    /**
     * Continuous Learning. If set, then test delivery will be limited to this value per day.
     */
    'max-questions-per-day'?: number | null;
    /**
     * Continuous Learning. If set, then test delivery will be limited to this value per week. Weeks are defined as Monday through Sunday.
     */
    'max-questions-per-week'?: number | null;
    /**
     * If set, max questions (daily or weekly) is ignored if this number of days or less is remaining in the testing period.
     */
    'max-questions-days-remaining'?: number | null;
    /**
     * Days examinees are notified.  This configuration can be overridden at the examinee level.
     * **Possible Values**
     *
     * | Bit Flag      | Bit Value |
     * |---------------|-----------|
     * | 1 = Monday    | 1         |
     * | 2 = Tuesday   | 2         |
     * | 3 = Wednesday | 4         |
     * | 4 = Thursday  | 8         |
     * | 5 = Friday    | 16        |
     * | 6 = Saturday  | 32        |
     * | 7 = Sunday    | 64        |
     *
     */
    'notification-days-default'?: number | null;
    /**
     * Continuous Learning. The recommended minutes per question.
     */
    'recommended-minutes-per-question'?: number | null;
    /**
     * Observational.  Number of minutes after scheduled start that examiner will participate in assessment. This value may be scaled if a TimeFactor is applied. If NULL, then assessor-offset-scaled is assumed to be 0.  Used to display start time on schedule UI for assessor.
     */
    'assessor-offset-scaled'?: number | null;
    /**
     * Observational. Number of fixed minutes after scheduled start that examiner will participate in assessment. If NULL, then assessor-offset-fixed is assumed to be 0. Used to display start time on schedule UI for assessor (see above).
     */
    'assessor-offset-fixed'?: number | null;
    /**
     * Observational.  Number of minutes after participation start (see above) offset that assessor will be expected to remain in event.  Used to display end time on schedule UI.
     */
    'assessor-duration'?: number | null;
    /**
     * Used for dynamic tests only.  Must map to an existing test template that will include user interface, questional styles, optional tutorials and intro screens, and options end of test screens. (note: may change for multi-segment)
     */
    'template-name'?: string | null;
    /**
     * Used for dynamic tests that are may be delivered as a multi-segment result.  Must map to the name of a test template.  Used for the first segment in the result.  If not set, then form cannot be used for multi-segment testing.  If not set, this can be configured outside of the web service, and updates will not overwrite the configuration.  The user interface and styles from the first segment is used for all segments.
     */
    'template-first'?: string | null;
    /**
     * Same as template-first, except used for the middle segments in a multi-segment result.
     */
    'template-middle'?: string | null;
    /**
     * Same as template-first, except used for the last segment in a multi-segment result.
     */
    'template-last'?: string | null;
    /**
     * Name of dynamic pretest pool. Maps to a pool name.
     */
    'pretest-pool'?: string | null;
    /**
     * The name of the test.  Unique within program.
     */
    'test-name': string;
    /**
     * If true, this test can be used by the System Check software.
     */
    'system-check'?: boolean | null;
    /**
     * Default 0. When set, result will be put on an automatic hold when delivered by StartTest.
     */
    'auto-hold'?: boolean | null;
    /**
     * Name of question pool for definition xml. Maps to a pool name.
     */
    'question-pool'?: string | null;
    /**
     * Name of display pool for definition xml. Maps to a pool name.
     */
    'display-pool'?: string | null;
    /**
     * A collection of dates associated within the form.
     */
    'form-dates'?: Array<TestFormDate> | null;
};

