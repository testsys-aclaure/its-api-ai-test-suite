/**
 * Returns a list of test forms.
 */
export type TestFormsQueryResponse = {
    /**
     * Unique test identifier.
     */
    'test-id': number;
    /**
     * The name of the test. Unique within program.
     */
    'test-name': string | null;
    /**
     * Unique database identifier for the form.
     */
    'form-id': number;
    /**
     * Name of the form. The combination of name and language must be unique within a test.
     */
    'form-name': string | null;
    /**
     * The letter ISO code of the form language.
     */
    language: string | null;
    /**
     * A form description. Used for registration-based programs where the test contains forms that are actually different tests.
     */
    description?: string | null;
    /**
     * A flag indicating whether the form is active at the moment the API call was made.
     */
    active: boolean;
    /**
     * 1 = Outside active date range; 2 = Flagged as inactive.
     */
    'inactive-reason'?: number;
};
//# sourceMappingURL=TestFormsQueryResponse.d.ts.map