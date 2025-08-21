import type { FormCase } from './FormCase';
import type { FormModule } from './FormModule';
import type { FormProject } from './FormProject';
import type { FormQuestion } from './FormQuestion';
import type { FormReporting } from './FormReporting';
import type { FormSet } from './FormSet';
/**
 * Returns a list of forms.
 */
export type FormQueryByFilterAsyncResult = {
    /**
     * Unique database identifier for the form.
     */
    'form-id': number;
    /**
     * Unique database identifier of the test.
     */
    'test-id': number;
    /**
     * Name of the form. Must be unique within test.
     */
    'form-name': string | null;
    /**
     * Unique textual identifier of the test.
     */
    'test-name': string | null;
    /**
     * Alternative name of form. Returned in result xml.
     */
    'alias-name'?: string | null;
    /**
     * A form description. Used for registration-based programs where the test contains forms that are actually different tests.
     */
    description: string | null;
    /**
     * The test driver version associated with this form.
     */
    'test-driver-version': string | null;
    /**
     * The version of the form.
     */
    'form-version'?: string | null;
    /**
     * Used as part of encryption process for forms published from Item Workshop. Not used for dynamic forms.
     */
    'content-key'?: string | null;
    /**
     * Unique identifier of published location (container and identifier) for forms published from Item Workshop. Not used for dynamic forms.
     */
    urid?: string | null;
    /**
     * Set to 1 for the first version of a dynamic form, and automatically incremented by 1 when a dynamic form is updated.
     */
    'definition-version'?: number | null;
    /**
     * Set if the form is available for selection.
     */
    active: boolean;
    /**
     * The three-letter ISO language code.� Forms are selected using target language or if this is not set.
     */
    language: string | null;
    /**
     * Categories are an optional way to balance forms across categories. When selecting forms, the software will first determine the eligible forms, and if the forms are linked to a category, randomly select a category and select the form from that category to deliver.
     */
    category?: string | null;
    /**
     * Used when load balancing forms.� Forms can be grouped together for registration groups.
     */
    groups?: string | null;
    /**
     * This is the priority of the form.� Used to sort the forms when selecting. Higher priority forms are selected first.
     */
    priority?: number | null;
    /**
     * Sets are used for rotating sets over time. If used, each form is linked to a set number, and an active set number will be tracked for the test. Only forms within the active set-number will be selected.
     */
    'set-number'?: number | null;
    /**
     * The date the form is available to be taken in UTC.
     */
    'start-utc'?: string | null;
    /**
     * End date the form is available in UTC.
     */
    'end-utc'?: string | null;
    /**
     * The target number of results.� Once this number is reached, the form will not be selected.
     */
    'target-number'?: number | null;
    /**
     * This is used for tests that have statistically equivalent lab and non-lab forms. This value is the minimum upload speed required to deliver a lab form. If set, an examinee's upload speed must be above this value or a non-lab form will be delivered.
     */
    'speed-min-upload'?: number | null;
    /**
     * This is used for tests that have statistically equivalent lab and non-lab forms. This value is the minimum download speed required to deliver a lab form. If set, an examinee's download speed must be above this value or a non-lab form will be delivered.
     */
    'speed-min-download'?: number | null;
    /**
     * This is used for tests that have statistically equivalent lab and non-lab forms. This value is the maximum latency allowed to deliver a lab form. If set, an examinee's latency to the lab portal must be below this value or a non-lab form will be delivered.
     */
    'speed-min-latency'?: number | null;
    /**
     * The date the form was created in UTC.
     */
    'create-utc'?: string | null;
    /**
     * The user who created the form.
     */
    'create-user-id'?: number | null;
    /**
     * The date the form information was modified in UTC.
     */
    'modify-utc'?: string | null;
    /**
     * The user who modified the form information.
     */
    'modify-user-id'?: number | null;
    /**
     * The date the form's activation status was modified in UTC.
     */
    'activate-utc'?: string | null;
    /**
     * The user who modified the form's activation status.
     */
    'activate-user-id'?: number | null;
    /**
     * If Null or set, the form is considered equated, meaning that score reports are available (if any), and aggregate results are also available
     */
    equated?: boolean | null;
    /**
     * The date and time in UTC the form was equated (meaning all rescoring has occured).
     */
    'equated-utc'?: string | null;
    /**
     * A message to be displayed on informational page at end of teest instead of scores when the form is waiting for equating to be completed.
     */
    'equate-message'?: string | null;
    /**
     * Number of all questions in form (includes the `y` in select `x` of `y`).
     */
    'num-overall-questions'?: number | null;
    /**
     * Number of questions (based on countme flag) in a test. Meta data, not used for delivery. Uses the `x` in select `x` of `y`.
     */
    'num-questions'?: number | null;
    /**
     * Number of reading passages in form.
     */
    'num-reading-passages'?: number | null;
    /**
     * Number of survey questions in form.
     */
    'num-survey-questions'?: number | null;
    /**
     * Based on all groups, but excludes survey and tutorial groups, and only include groups that have questions.
     */
    'question-seconds'?: number | null;
    /**
     * Based on first object in tree with type=survey
     */
    'survey-seconds'?: number | null;
    /**
     * Overall form timing. If timing is not set, then recursively calculated for each subgroup.
     */
    'total-test-seconds'?: number | null;
    /**
     * Based on first object in tree with type=tutorial.
     */
    'tutorial-seconds'?: number | null;
    /**
     * If true, this form is accessible.
     */
    accessible?: boolean;
    /**
     * If true, this form is only available to practice events.
     */
    practice?: boolean;
    /**
     * Used when read-aloud forms is delivered. Only one per test allowed.
     */
    'read-aloud'?: boolean;
    /**
     * If true, the form supports text to speech.
     */
    'text-to-speech'?: boolean;
    /**
     * If true, the test delivery system will require a secure browser.
     */
    'require-secure-browser'?: boolean;
    /**
     * Name of question pool for definition xml. Maps to a pool name.
     */
    'question-pool'?: string | null;
    readonly questions?: Array<FormQuestion> | null;
    readonly 'reporting-groups'?: Array<FormReporting> | null;
    readonly projects?: Array<FormProject> | null;
    readonly cases?: Array<FormCase> | null;
    readonly sets?: Array<FormSet> | null;
    /**
     * Collection of modules.  Modules are set for dynamic forms built from modules (sections) in existing forms.
     */
    readonly modules?: Array<FormModule> | null;
};
//# sourceMappingURL=FormQueryByFilterAsyncResult.d.ts.map