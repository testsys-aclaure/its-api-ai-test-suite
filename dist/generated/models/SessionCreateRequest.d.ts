export type SessionCreateRequest = {
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
     * The ITS database identifier for the Event.
     */
    'event-id'?: number | null;
    /**
     * The number of examinees participating in the remote session.
     */
    'reserve-number'?: number;
    /**
     * The number of minutes that the session is offset from UTC. This parameter is used only if `end-utc` is not provided. If it is provided, the session expiration is `end-utc`. If it is not provided, the expiration is midnight of the current day based on the offset, or eight hours after the start of the session, whichever is later. If `minutes-offset` is not provided, the offset is EST (-300) / EDT (-240).
     */
    'minutes-offset'?: number;
    /**
     * Limits the proctor to only see sessions linked to this `group-identifier`.
     */
    'group-identifier'?: string | null;
    /**
     * Bit flag to set different options. Leave blank to use the preconfigured Global Options set for your program. Talk to your program manager on why you would use this field.
     *
     * Bit Information:
     *
     * |     Bit Flag                   |     Bit Value |
     * |--------------------------------|---------------|
     * |     0=Examinee Login with first name, last name, and date of birth                            |     1         |
     * |     1=Show terms of agreement                                                                 |     2         |
     * |     2=Get photograph                                                                          |     4         |
     * |     3=Get identification card photos                                                          |     8         |
     * |     4=Disable recordings                                                                      |     16        |
     * |     5=Create new sessions from management page                                                |     32        |
     * |     6=Enable pause functionality                                                              |     64        |
     * |     7=Examinee login with registration and password                                           |     128       |
     * |     8=Mobile option if no camera available on device                                          |     256       |
     * |     9=Check-in / Greeter Tab                                                                  |     512       |
     * |     12=Approve all on check-in / Greeter Tab                                                  |     4096      |
     * |     13=Assign examinee to proctors                                                            |     8192      |
     * |     14=Assign roles to proctors                                                               |     16384     |
     * |     16=Require two cameras for the examinee                                                   |     65536     |
     * |     17=Filter out the ability to use virtual cameras. Requires ITS Secure Browsers            |     131072    |
     * |     19=Enable a secondary institution consent form. Requires configuration within the system. |     524288    |
     */
    'examinee-portal-options'?: number | null;
    /**
     * The unique identifier of the remote session. This parameter is required to update a remote session.
     */
    'session-code'?: string | null;
};
//# sourceMappingURL=SessionCreateRequest.d.ts.map