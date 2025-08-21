import type { Institution3 } from './Institution3';
export type TestFormDate = {
    /**
     * The unique ID for a test
     */
    'test-id'?: number | null;
    /**
     * The unique ID for a FormDate
     */
    'form-date-id'?: number | null;
    /**
     * The date the form is available to be taken in UTC.
     */
    'start-utc'?: string | null;
    /**
     * End date the form is available in UTC.
     */
    'end-utc'?: string | null;
    /**
     * An identifier linking one or more forms for form selection.
     */
    group?: string | null;
    /**
     * A flag indicating whether all institutions have access to this form.  If not set, only the institutions specification in the collection of institutions below will have access to the form.
     */
    'all-institutions'?: boolean | null;
    /**
     * Collection of Institutions within Form Date (Required if all-institutions is set to false.)
     */
    institutions?: Array<Institution3> | null;
};
//# sourceMappingURL=TestFormDate.d.ts.map