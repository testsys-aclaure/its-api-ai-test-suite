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
//# sourceMappingURL=Package.d.ts.map