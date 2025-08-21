/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Examinee3 = {
    /**
     * The program's system identifier of the examinee. This is typically a database identifier. This identifier must be unique within the uniqueness scope defined for the program. It is required for Creates if `program-examinee-public-id` is not provided. It is required for Updates if `examinee-id` and `program-examinee-public-id` are not provided.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The program's public or business identifier of the examinee. For instance, this may be a student ID. The identifier must be unique within the uniqueness scope as defined for the program. It is required for Creates if `program-examinee-system-id` is not provided. It is required for Updates if `examinee-id` and `program-examinee-system-id` are not provided.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * The examinee's email address.
     */
    email?: string | null;
    /**
     * The examinee's first name.
     */
    'first-name'?: string | null;
    /**
     * The examinee's middle name.
     */
    'middle-name'?: string | null;
    /**
     * The examinee's last name.
     */
    'last-name'?: string | null;
    /**
     * The first line of the examinee's address.
     */
    address1?: string | null;
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
    postal?: string | null;
    /**
     * The examinee's three-letter ISO country code. This is validated to be three characters.
     */
    country?: string | null;
    /**
     * The examinee's primary phone number.
     */
    'primary-phone'?: string | null;
    /**
     * The examinee's alternative phone number.
     */
    'alternate-phone'?: string | null;
    /**
     * Not Available
     */
    'photo-image'?: string | null;
    /**
     * Not Available
     */
    'photo-format'?: string | null;
};

