/**
 * The time zone response.
 */
export type TimeZoneResponse = {
    /**
     * The unique ITS database identifier for the time zone.
     */
    'time-zone-id'?: number;
    /**
     * The standard nomenclature of time zones from the SQL server.
     */
    'standard-name'?: string | null;
    /**
     * Descriptive text of the time zone, which includes the UTC -+ hours information.
     */
    'description-text'?: string | null;
    /**
     * The flag that shows if that time zone is in daylight savings time adjustment.
     */
    'is-currently-dst'?: boolean;
};
//# sourceMappingURL=TimeZoneResponse.d.ts.map