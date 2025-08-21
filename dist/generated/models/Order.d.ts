import type { Package } from './Package';
export type Order = {
    /**
     * The program-assigned, alpha-numeric identifier of the order.  Make sure that this is a unique identifier on the program side when creating or updating the order record.
     */
    'order-code'?: string | null;
    /**
     * The unique database identifier of the event.
     */
    'event-id'?: number | null;
    /**
     * The unique database identifier of the user who placed the order. If not provided or if invalid, the username of the user uploading the order is saved instead.
     */
    'user-id'?: number | null;
    /**
     * The unique ITS database identifier of the examinee.
     */
    'examinee-id'?: number | null;
    /**
     * The program's system identifier of the examinee.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The program's public or business identifier of the examinee.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * Collection of packages.
     */
    packages: Array<Package>;
    /**
     * The shipping code. Values are defined for the program.
     */
    method?: string | null;
    /**
     * The shipping name for the order.
     */
    name?: string | null;
    /**
     * The shipping organization name for the order.
     */
    organization?: string | null;
    /**
     * The shipping phone number for the order.
     */
    phone?: string | null;
    /**
     * The three-letter ISO country code for the country that the order will be shipped to.
     */
    country?: string | null;
    /**
     * The first line of the shipping address for the order.
     */
    address1?: string | null;
    /**
     * The second line of the shipping address for the order.
     */
    address2?: string | null;
    /**
     * The third line of the shipping address for the order.
     */
    address3?: string | null;
    /**
     * The city that the order will be shipped to.
     */
    city?: string | null;
    /**
     * The state or region that the order will be shipped to.
     */
    'state-region'?: string | null;
    /**
     * The postal code that the order will be shipped to.
     */
    'postal-code'?: string | null;
};
//# sourceMappingURL=Order.d.ts.map