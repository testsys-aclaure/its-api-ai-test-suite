import type { EventInstitution } from './EventInstitution';
export type Event = {
    /**
     * Unique database identifier for the event. Must be used for subsequent calls to event/authorizations/query or event/close.
     */
    'event-id'?: number | null;
    /**
     * Unique textual identifier for the event. Minimum of 1 character and Maximum of 100
     */
    'event-description'?: string | null;
    /**
     * Uniquely identifies test(s) to be delivered. Not required or used for updates. Minimum of 1 character and Maximum of 50
     */
    'package-code'?: string | null;
    /**
     * Not required or used for updates.  Minimum of 1 character and Maximum of 50
     */
    'form-name'?: string | null;
    /**
     * The start date and time of the event in UTC.
     */
    'start-utc'?: string | null;
    /**
     * The end date and time of the event in UTC.
     */
    'end-utc'?: string | null;
    /**
     * The number of examinees. Parameter is required for anonymous or self-registration models (when not uploading examinees). One authorization will be generated for each examinee. Only increases are supported for updates.
     */
    'num-examinees'?: number;
    /**
     * Bitflag. Set bits to enable options. The table below includes the possible values for this parameter. Must be a value from 0 to 2097151 (including)
     * **Event Options**
     *
     * | Bit | (Bit Value) | Description                                                                                                                     |
     * |-----|-------------|---------------------------------------------------------------------------------------------------------------------------------|
     * |  0  | 1         | Enable immediate score report in session                                                                                                                                                                                                              |
     * |  2  | 4         | Automatically add students to event when logging into session                                                                                                                                                                                         |
     * |  3  | 8         | Allow sessions for future events to be created                                                                                                                                                                                                        |
     * |  4  | 16        | Restrict students to one class in event                                                                                                                                                                                                               |
     * |  5  | 32        | Enable PDF downloads for all students                                                                                                                                                                                                                 |
     * |  6  | 64        | Enable answer sheets for all students                                                                                                                                                                                                                 |
     * |  7  | 128       | Require students to have a class in order to test                                                                                                                                                                                                     |
     * |  8  | 256       | Allow classes to be created and modified after the event is closed.                                                                                                                                                                                   |
     * |  9  | 512       | Do not release all unused inventory on close (primary or secondary) if the student did not use primary and secondary inventory. Default behavior is to release inventory if the student did not use primary and secondary inventory.                  |
     * |  10 | 1024      | Release secondary inventory if student does not use secondary inventory. Default behavior is to not release secondary inventory if the student used the primary inventory and to release secondary inventory if the student did not use the primary.  |
     * |  11 | 2048      | Reports are generated on event close                                                                                                                                                                                                                  |
     * |  12 | 4096      | Reports are generated on score completion of all results                                                                                                                                                                                              |
     * |  13 | 8192      | Waiver required.                                                                                                                                                                                                                                      |
     * |  14 | 16384     | When set, StartTest2 will require a secure browser.
     * |  15 | 32768     | When set, event has been overridden by a program level user. Instutition users have limited ability to   edit.   |
     * |  16 | 65536     | Event assignments require candidates to have active registrations.                                                                                                                                                                                    |
     * |  17 | 131072    | Event candidates are anonymous                                                                                                                                                                                                                        |
     * |  18 | 262144    | Suppress pre-test profiles                                                                                                                                                                                                                            |
     * |  19 | 524288    | Require all sessions to be remote proctored.                                                                                                                                                                                                          |
     * |  20 | 1048576   | Practice test administration. Forms are limited to practice forms via the program-specific test   administration setup component.
     */
    'event-options'?: number | null;
    /**
     * If the test is timed, this number will be multiplied against each element that is timed, including overall time, section times, and item times. For instance, a “3” would give the examinee triple time. 1 = no change, this is the default. 0 = ignore timing, the test is untimed.
     */
    'time-factor'?: number | null;
    /**
     * Only used for programs that require inventory. Specific requirements for this element will be provided as part of program configuration. The table below includes the possible values for this parameter.
     * **Inventory Source**
     *
     * | Value | Description                                             |
     * |-------|---------------------------------------------------------|
     * | 1     | None                                                    |
     * | 2     | Event owner institution is responsible for inventory    |
     * | 3     | Event delivery institution is responsible for inventory |
     * | 4     | Institution configuration defines source for inventory  |
     */
    'inventory-source'?: number | null;
    /**
     * If set to true, this event is available to all children institutions of the program-institution-id passed as the input parameter of this call.
     */
    'all-institutions'?: boolean;
    /**
     * Used to determine constructed response scoring priority when passed to third-party scoring system. Recommended values are program-specific and are typically based upon the expected number of business days needed for scoring turn-around. If not set, scoring will use the default priority.
     *
     * Program approval is required to use expedited priority settings.
     */
    'scoring-priority'?: number | null;
    /**
     * A collection of delivery institutions that will have access to this event. This element should not be included if all-institutions is set to true.
     */
    'event-institutions'?: Array<EventInstitution> | null;
    /**
     * The unique identifier of a child institution that will have access to this event. Minimum of 1 character and Maximum of 50
     */
    'delivery-program-institution-id'?: string | null;
};
//# sourceMappingURL=Event.d.ts.map