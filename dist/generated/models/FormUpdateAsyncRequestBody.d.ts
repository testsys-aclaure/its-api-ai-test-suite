export type FormUpdateAsyncRequestBody = {
    /**
     * Unique database identifier for the form.
     */
    'form-id': number;
    /**
     * Name of the form. Must be unique within test.
     */
    'form-name'?: string | null;
    /**
     * Alternative name of form.  Returned in result xml.  Also used in form selection if form not found.
     */
    'alias-name'?: string | null;
    /**
     * A form description. Used for registration-based programs where the test contains forms that are different tests.
     */
    description?: string | null;
    /**
     * The test driver version associated with this form.
     */
    'test-driver-version'?: string | null;
    /**
     * Used as part of encryption process for forms published from Item Workshop.  Not used for dynamic forms.
     */
    'content-key'?: string | null;
    /**
     * Set if the form is available for selection.
     */
    active?: boolean | null;
    /**
     * The three-letter ISO language code.  Forms are selected using target language or if this is not set.
     */
    language?: string | null;
    /**
     * Categories are an optional way to balance forms across categories.  When selecting forms, the software will first determine the eligible forms, and if the forms are linked to a category, randomly select a category and select the form from that category to deliver.
     */
    category?: string | null;
    /**
     * Used when load balancing forms.  Forms can be grouped together for registration groups.
     */
    groups?: string | null;
    /**
     * This is the priority of the form.  Used to sort the forms when selecting.  Higher priority forms are selected first.
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
     * The target number of results. Once this number is reached, the form will not be selected.
     */
    'target-number'?: number | null;
    /**
     * This is used for tests that have statistically equivalent lab and non-lab forms. This value is the minimum upload speed required to deliver a lab form. If set, an examinee’s upload speed must be above this value or a non-lab form will be delivered.
     */
    'speed-min-upload'?: number | null;
    /**
     * This is used for tests that have statistically equivalent lab and non-lab forms. This value is the minimum download speed required to deliver a lab form. If set, an examinee’s download speed must be above this value or a non-lab form will be delivered.
     */
    'speed-min-download'?: number | null;
    /**
     * This is used for tests that have statistically equivalent lab and non-lab forms. This value is the maximum latency allowed to deliver a lab form. If set, an examinee’s latency to the lab portal must be below this value or a non-lab form will be delivered.
     */
    'speed-min-latency'?: number | null;
    /**
     * The date the form's activation status was modified in UTC.
     */
    'activate-utc'?: string | null;
    /**
     * If Null or set, the form is considered equated, meaning that score reports are available (if any), and aggregate results are also available
     */
    equated?: boolean | null;
    /**
     * The date and time in UTC the form was equated (meaning all rescoring has occurred).
     */
    'equated-utc'?: string | null;
    /**
     * A message to be displayed on informational page at end of test instead of scores when the form is waiting for equating to be completed.
     */
    'equate-message'?: string | null;
    /**
     * If true, this form is accessible.
     */
    accessible?: boolean | null;
    /**
     * If true, this form is only available to practice events.
     */
    practice?: boolean | null;
    /**
     * Used when read-aloud forms is delivered.  Only one per test allowed.
     */
    'read-aloud'?: boolean | null;
    /**
     * If true, the form supports text to speech.
     */
    'text-to-speech'?: boolean | null;
    /**
     * If true, the test delivery system will require a secure browser.
     */
    'require-secure-browser'?: boolean | null;
};
//# sourceMappingURL=FormUpdateAsyncRequestBody.d.ts.map