import type { Institution2 } from './Institution2';
import type { Property } from './Property';
export type Examinee2 = {
    /**
     * The unique ITS database identifier of the examinee. Required for Updates.
     */
    'examinee-id'?: number | null;
    /**
     * The program's system identifier of the examinee. This is typically a database identifier. This identifier must be unique within the uniqueness scope defined for the program. It is required for Creates if `program-examinee-public-id` is not provided. It is required for Updates if `examinee-id` and `program-examinee-public-id` are not provided.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The program's public or business identifier of the examinee. For instance, this may be a student ID. The identifier must be unique within the uniqueness scope as defined for the program. It is required for Creates if `program-examinee-system-id` is not provided. It is required for Updates if `examinee-id` and `program-examinee-system-id` are not provided.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * The program's unique Institutional Examinee identifier. The identifier must be unique within the uniqueness scope as defined for the program. The `program-institution-id` URL parameter is required when using this identifier.
     */
    'program-examinee-institution-id'?: string | null;
    'record-identifier'?: string | null;
    'registration-identifier'?: string | null;
    /**
     * If `true`, the examinee is active.
     */
    active?: boolean | null;
    /**
     * The table below describes each possible examinee status ID.
     * **Examinee Status ID**
     *
     * | Status ID | Description         |
     * |-----------|---------------------|
     * | 1         | Active              |
     * | 2         | Inactive            |
     * | 3         | Suspended           |
     * | 4         | Suspended Read-Only |
     */
    'examinee-status-id'?: number | null;
    /**
     * This is a program defined list. Example: Active, Graduated, …
     */
    'enrollment-status'?: string | null;
    /**
     * The examinee's last name.
     */
    'last-name'?: string | null;
    /**
     * The examinee's first name.
     */
    'first-name'?: string | null;
    /**
     * The examinee's full name. This is used for certificates and score reports.
     */
    'full-name'?: string | null;
    /**
     * The examinee's middle name.
     */
    'middle-name'?: string | null;
    /**
     * A word used to describe the examinee's status or profession. Examples include Mr, Mrs, Doctor, Professor, etc. The set of allowed possible values is configurable for the program.
     */
    title?: string | null;
    /**
     * The enrolled grade of the examinee.
     */
    grade?: string | null;
    /**
     * The academic major of the examinee. The set of allowed possible values is configurable for the program.
     */
    major?: string | null;
    /**
     * The gender of the examinee. The set of allowed possible values is configurable for the program.
     */
    gender?: string | null;
    /**
     * A pipe-separated list of program-specific codes that describe the examinee.
     */
    ethnicity?: string | null;
    /**
     * A pipe-separated list of program-specific codes that describe the examinee.
     */
    race?: string | null;
    /**
     * The three-letter ISO language code.
     */
    language?: string | null;
    /**
     * The examinee's date of birth. MM-DD-YYYY
     */
    'date-of-birth'?: string | null;
    /**
     * Set if the user does not want their information shared. The default is `false`.
     */
    'privacy-protected'?: boolean | null;
    /**
     * Set if a waiver is on file for an examinee.
     */
    waiver?: boolean | null;
    /**
     * The time zone that the examinee is in. See timezone/query for valid ID numbers.
     */
    'time-zone-id'?: number | null;
    /**
     * If `true`, the examinee honors daylights savings.
     */
    'use-daylight-savings'?: boolean | null;
    /**
     * Not Available
     */
    'photo-image'?: string | null;
    /**
     * Not Available
     */
    'photo-format'?: string | null;
    /**
     * The examinee's email address. Must be correctly formatted per RFC 5322.
     */
    email?: string | null;
    /**
     * The examinee's primary phone number.
     */
    'primary-phone'?: string | null;
    /**
     * The examinee's alternative phone number.
     */
    'alternate-phone'?: string | null;
    /**
     * The email addresses of the examinee's parents. This is comma delimited. Must be correctly formatted per RFC 5322.
     */
    'parent-email-addresses'?: string | null;
    /**
     * This is the preferred contact method of the examinee. The default is 1. The table below includes the supported contact methods.
     * **Contact Method**
     *
     * | Value | Description |
     * |-------|-------------|
     * | 1     | Email       |
     * | 4     | SMS         |
     */
    'preferred-contact-method'?: number | null;
    /**
     * The first line of the examinee's address.
     */
    address?: string | null;
    /**
     * The second line of the examinee's address.
     */
    address2?: string | null;
    /**
     * The third line of the examinee's address.
     */
    address3?: string | null;
    /**
     * The city that the examinee lives in.
     */
    city?: string | null;
    /**
     * The state that the examinee lives in.
     */
    state?: string | null;
    /**
     * The examinee's postal code.
     */
    'postal-code'?: string | null;
    /**
     * The examinee's three-letter ISO country code. This is validated to be three characters.
     */
    country?: string | null;
    /**
     * The company that the examinee works for. No additional validation is performed.
     */
    company?: string | null;
    /**
     * The examinee's job title. No additional validation is performed.
     */
    'job-title'?: string | null;
    /**
     * This element can contain an XML hierarchy of custom properties that are returned with the examinee information.
     */
    'custom-properties'?: Array<Property> | null;
    /**
     * If the test is timed, this number will be multiplied against each element that is timed, including overall time, section times, and item times. For instance, a 3 would give the examinee triple time. 1 = no change, this is the default. 0 = ignore timing, the test is untimed.
     */
    'time-factor'?: string | null;
    /**
     * The bit flag that can be used for program options. See program documentation. See options in Appendix A.
     */
    'delivery-options'?: number | null;
    /**
     * The bit flag that can be used for program overrides. See program documentation. See overrides in Appendix B.
     */
    'delivery-overrides'?: number | null;
    /**
     * The collection of institution elements.
     */
    institutions?: Array<Institution2> | null;
    /**
     * The names of the certifications associated with this examinee. Multiple certifications are returned as a pipe | separated list.
     */
    'certification-names'?: Array<string> | null;
};
//# sourceMappingURL=Examinee2.d.ts.map