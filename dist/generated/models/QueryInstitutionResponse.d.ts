import type { CustomProperties } from './CustomProperties';
export type QueryInstitutionResponse = {
    /**
     * ITS database unique identifier for the institution.
     */
    'institution-id'?: number;
    /**
     * The program-specific identifier of the institution. If not supplied, the API will set to `institution-code`. This identifier is used to identify an institution in all web API calls.
     */
    'program-institution-id'?: string | null;
    /**
     * The program-institution-id of the parent institution, one level up only.
     */
    'program-parent-institution-id'?: string | null;
    /**
     * Defines the type of institution. Valid values will be provided as part of configuration. This value must be a valid child type of the parent institution.
     */
    'institution-type-code'?: string | null;
    /**
     * The descriptive name of the institution.
     */
    name?: string | null;
    /**
     * The program billing code for the institution.
     */
    'program-billing-code'?: string | null;
    /**
     * The program campus code for the institution.
     */
    'program-campus-code'?: string | null;
    /**
     * The program alternate identifier for the institution.
     */
    'program-alternate-id'?: string | null;
    /**
     * The first line of the institution’s address.
     */
    address1?: string | null;
    /**
     * The second line of the institution’s address.
     */
    address2?: string | null;
    /**
     * The third line of the institution’s address.
     */
    address3?: string | null;
    /**
     * The city of the institution.
     */
    city?: string | null;
    /**
     * The state of the institution.
     */
    state?: string | null;
    /**
     * The country of the institution.
     */
    country?: string | null;
    /**
     * The zip code of the institution.
     */
    'postal-code'?: string | null;
    /**
     * The name of the institution campus.
     */
    campus?: string | null;
    /**
     * The email address of the main contact for the institution.
     */
    'contact-email'?: string | null;
    /**
     * The name of the main contact for the institution.
     */
    'contact-name'?: string | null;
    /**
     * The phone number of the main contact for the institution.
     */
    'contact-phone'?: string | null;
    /**
     * The directions to the institution.
     */
    directions?: string | null;
    /**
     * The lowest grade the institution supports.
     */
    'start-grade'?: number | null;
    /**
     * The highest grade the institution supports.
     */
    'end-grade'?: number | null;
    /**
     * The hours the institution is open and available for testing.
     */
    hours?: string | null;
    /**
     * The six-digit identification code used to identify institutions of higher education in the United States.
     */
    'fice-code'?: string | null;
    /**
     * Windows time zone identifier.
     */
    'time-zone-id'?: number | null;
    /**
     * If set to `true`, daylight savings will be honored.
     */
    'use-daylight-savings'?: boolean;
    /**
     * Should be set to `true` for QA, test, or demonstration locations. If not provided, set to `false`.
     */
    demo?: boolean;
    /**
     * If `false`, this institution will not be allowed to deliver tests. When set to `false`, all children institutions are automatically set to inactive. If not provided, set to `false`.
     */
    active?: boolean;
    /**
     * The collection of properties.
     */
    'custom-properties'?: Array<CustomProperties> | null;
};
//# sourceMappingURL=QueryInstitutionResponse.d.ts.map