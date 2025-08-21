/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TestClass = {
    /**
     * The name of the test. Unique within program.
     */
    'test-name'?: string | null;
    /**
     * Name of the form. Must be unique within test.
     */
    'form-name'?: string | null;
    /**
     * Set if the test is a demonstration or sample test.
     */
    'test-demo'?: boolean | null;
    /**
     * The order in which the tests show up in the examinee's portal.
     */
    'test-display-sequence'?: number | null;
    /**
     * The three-letter ISO language code.
     */
    language?: string | null;
    /**
     * Possible bit flags that can be set to turn on or off options.
     */
    options?: number | null;
    /**
     * Possible bit flags that can be set to override configuration options that were made in the test or item.
     */
    overrides?: number | null;
    /**
     * The order in which the examinee has to take the test
     */
    'delivery-sequence'?: number | null;
    /**
     * If the test is timed, this number will be multiplied against each element that is timed, including overall time, section times, and item times. For instance, a “3” would give the examinee triple time. 1 = no change, this is the default. 0 = ignore timing, the test is untimed.
     */
    'time-factor'?: number | null;
    /**
     * A bit flag of remote proctor services that will be enabled for this registration test.
     */
    'remote-proctor-options'?: number | null;
    /**
     * A link to the RPVendorServices table, a table storing ITS’ supported remote proctoring vendor services.  If set, the exam will be delivered using this remote proctor vendor service.
     */
    'remote-vendor-id'?: number | null;
};

