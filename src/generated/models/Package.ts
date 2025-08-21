/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Package = {
    /**
     * The program-assigned, alpha-numeric identifier of the package. Packages are not changed when you update an existing order.
     */
    'package-code': string;
    /**
     * The quantity of the package. Package quantities are not changed when you update an existing order.
     */
    quantity: number;
    /**
     * The expiration date of the inventory in UTC.
     */
    'expiration-utc'?: string | null;
};

