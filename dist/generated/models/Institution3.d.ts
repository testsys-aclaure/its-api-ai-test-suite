export type Institution3 = {
    /**
     * ID to join back to the form dates
     */
    'form-date-id'?: number | null;
    /**
     * A flag indicating whether all children institution have access to this form.
     */
    'all-children'?: boolean | null;
    /**
     * The unique program identifier of an institution. Only forms accessible by this institution are returned.  The web API client must have access to this institution.
     */
    'program-institution-id'?: string | null;
};
//# sourceMappingURL=Institution3.d.ts.map