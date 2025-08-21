export type SessionUpdateRequest = {
    'user-id': number;
    code: number;
    /**
     * The unique identifier of the remote session. This parameter is required to update a remote session.
     */
    'session-code': string;
    /**
     * The description of the session. This is displayed in the user interface for proctors.
     */
    description: string;
    /**
     * The start date and time of the session in UTC.
     */
    'start-utc': string;
    /**
     * The end date and time of the session in UTC.
     */
    'end-utc'?: string;
    /**
     * The number of examinees participating in the remote session.
     */
    'reserve-number'?: number;
    /**
     * The number of minutes that the session is offset from UTC. This parameter is used only if `end-utc` is not provided. If it is provided, the session expiration is `end-utc`. If it is not provided, the expiration is midnight of the current day based on the offset, or eight hours after the start of the session, whichever is later. If `minutes-offset` is not provided, the offset is EST (-300) / EDT (-240).
     */
    'minutes-offset'?: number;
};
//# sourceMappingURL=SessionUpdateRequest.d.ts.map