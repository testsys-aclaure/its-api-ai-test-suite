export type SessionResponse = {
    /**
     * The unique identifier of the remote session.
     */
    'session-code': string;
    /**
     * The description of the session. This is displayed in the user interface for proctors.
     */
    description: string;
    /**
     * The create status of the remote session. Possible values: `created`, `skipped–exists`.
     */
    status: string;
};
//# sourceMappingURL=SessionResponse.d.ts.map