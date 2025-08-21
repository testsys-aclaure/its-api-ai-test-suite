export type EventResponse = {
    /**
     * The create status of the event. Possible values: created, skipped-exists.
     */
    status: string;
    /**
     * The unique ITS database identifier of the event.
     */
    'event-id': number;
    /**
     * The requested start date and time of the event in UTC.
     */
    'start-utc'?: string | null;
    /**
     * The requested end date and time of the event in UTC.
     */
    'end-utc'?: string | null;
};
//# sourceMappingURL=EventResponse.d.ts.map