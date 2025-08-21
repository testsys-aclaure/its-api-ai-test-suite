/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Event1 = {
    /**
     * `False` = Normal close; `True` = Examinee did not complete the test, the exam was closed by system, due to expiration or batch process on export. Auto-closed results are scored normally.
     */
    'auto-close'?: string | null;
    /**
     * ITS unique identifier for the examinee
     */
    'examinee-id'?: number | null;
    /**
     * Program’s unique system identifier for the examinee
     */
    'program-examinee-system-id'?: string | null;
    /**
     * Program’s unique public identifier fo rthe examinee
     */
    'program-examinee-public-id'?: string | null;
    /**
     * Set to `true` if the result is complete.
     */
    completed?: string | null;
    /**
     * The database identifier of the form.
     */
    'form-id'?: string | null;
    /**
     * The description of the form.
     */
    'form-description '?: string | null;
    /**
     * The textual identifier of the form.
     */
    'form-name'?: string | null;
    /**
     * The three-character ISO language code.
     */
    'language-code'?: string | null;
    /**
     * The last date and time in UTC of the test (stored in EST).
     */
    'last-modified-utc'?: string;
    /**
     * The name of the program.
     */
    program?: string | null;
    /**
     * The unique database identifier of the program.
     */
    'program-id'?: string | null;
    /**
     * The unique database identifier of the result.
     */
    'result-id'?: string | null;
    /**
     * The unique database identifier of the test.
     */
    'test-id'?: string | null;
    /**
     * The description of the test delivered.
     */
    'test-description'?: string | null;
    /**
     * The number multiplied against the time. The default is 1.
     */
    'time-factor'?: string | null;
    /**
     * The UTC date and time the test was started.
     */
    'start-utc'?: string;
    /**
     * The UTC date and time the test was completed. The date/time is before examinees complete surveys or view score reports.
     */
    'complete-utc'?: string;
    /**
     * The UTC date and time the test was scored. If scoring is immediate, then this will be the same date/time as `complete-utc`. If scoring is external, this is the date and time the scoring was completed.
     */
    'scoring-complete-utc'?: string;
    /**
     * The UTC date and time the test was exited by the examinee after completing surveys and viewing score reports.
     */
    'end-test-utc'?: string;
    /**
     * If outcome result is rescored, date and time rescored occurred in UTC timezone.
     */
    'rescore-utc'?: string;
};

