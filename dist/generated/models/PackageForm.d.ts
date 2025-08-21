export type PackageForm = {
    /**
     * Unique database identifier for the test.
     */
    'test-id'?: number | null;
    /**
     * Unique textual identifier for the test.
     */
    'test-name'?: string | null;
    /**
     * Unique identifier for the form. Unique within TestID.
     */
    'form-id'?: number | null;
    /**
     * Name of the form. Must be unique within test.
     */
    'form-name'?: string | null;
    /**
     * A form description. Used for registration-based programs where the test contains forms that are actually different tests.
     */
    description?: string | null;
    /**
     * Forms selected using target language OR NULL for multi-language tests.
     */
    language?: string | null;
    /**
     * Start date the form is accessible.
     */
    'start-utc'?: string | null;
    /**
     * End date the form is accessible.
     */
    'end-utc'?: string | null;
    /**
     * If `true`, this form is accessible.
     */
    accessible?: boolean | null;
    /**
     * If `true`, this form is available only to practice events.
     */
    practice?: boolean | null;
    /**
     * If `true`, the test delivery system will require a secure browser.
     */
    'require-secure-browser'?: boolean | null;
};
//# sourceMappingURL=PackageForm.d.ts.map