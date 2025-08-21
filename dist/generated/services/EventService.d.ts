import type { Event } from '../models/Event';
import type { EventAuthorization } from '../models/EventAuthorization';
import type { EventCreateRequest } from '../models/EventCreateRequest';
import type { EventExamineeResponse } from '../models/EventExamineeResponse';
import type { EventResponse } from '../models/EventResponse';
import type { EventUpdateRequest } from '../models/EventUpdateRequest';
import type { ExamineeDataHolder } from '../models/ExamineeDataHolder';
import type { ExamineeEventsResponse } from '../models/ExamineeEventsResponse';
import type { ExamineeIdentifierTypEnum } from '../models/ExamineeIdentifierTypEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class EventService {
    /**
     * /event/authorizations/query
     * This method queries event-specific authorization codes. The event must have previously been created, and the user querying must have access. If an authorization code has been used, then result information is also returned.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. If supplied, all events linked to this institution or its children will be returned. The web API client must have access to this institution.
     * @param eventId The unique database identifier of the event. If not supplied, `event-description` is required.
     * @param eventDescription The unique textual identifier of the event. If not supplied, `event-id` is required.
     * @param limit The number of event-authorization objects to return. By default, this call returns a maximum of 500 objects. The limit can be set to any number less than 500.
     * @param beforeId A specific `authorization-id`. The API returns objects with `authorization-id`s that precede `before-id`. This parameter cannot be used if `after-id` is used.
     * @param afterId A specific `authorization-id`. The API returns objects with `authorization-id`s that follow `after-id`. This parameter cannot be used if `before-id` is used.
     * @returns EventAuthorization OK
     * @throws ApiError
     */
    static eventAuthorizationQuery(programId: number, programInstitutionId?: string, eventId?: number, eventDescription?: string, limit?: number, beforeId?: number, afterId?: number): CancelablePromise<EventAuthorization>;
    /**
     * /event/examinee/import
     * Creates or updates examinees and adds them to an event. This is a complete overwrite of the examinee in the ITS system. Any parameter not passed is cleared.
     * @param programId The unique program identifier provided as part of configuration.
     * @param eventId The unique database identifier of the event.
     * @param programInstitutionId The unique program identifier of an institution. Examinees are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns EventExamineeResponse OK
     * @throws ApiError
     */
    static eventExamineeImport(programId: number, eventId: number, programInstitutionId?: string, requestBody?: ExamineeDataHolder): CancelablePromise<EventExamineeResponse>;
    /**
     * /event/examinee/import
     * Creates or updates examinees and adds them to an event. This is a complete overwrite of the examinee in the ITS system. Any parameter not passed is cleared.
     * @param programId The unique program identifier provided as part of configuration.
     * @param eventId The unique database identifier of the event.
     * @param programInstitutionId The unique program identifier of an institution. Examinees are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns EventExamineeResponse OK
     * @throws ApiError
     */
    static eventExamineeImport1(programId: number, eventId: number, programInstitutionId?: string, requestBody?: ExamineeDataHolder): CancelablePromise<EventExamineeResponse>;
    /**
     * /event/query
     * Retrieves details about an event.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. If supplied, all events linked to this institution, or its children will be returned. The web API client must have access to this institution.
     * @param eventId The unique database identifier of the event.
     * @param eventDescription Unique textual identifier for the event.
     * @param activeOnly If true, only events that haven't expired will be returned. The api will return events where end-utc is in the future.
     * @param limit The number of event objects to return. By default, this call returns a maximum of 500 objects. The limit can be set to any number less than 500.
     * @param beforeId A specific `event-id`. The API returns objects with event-ids that precede `before-id`. This parameter cannot be used if `after-id` is used.
     * @param afterId A specific `event-id`. The API returns objects with event-ids that follow `after-id`. This parameter cannot be used if `before-id` is used.
     * @returns Event OK
     * @throws ApiError
     */
    static eventQuery(programId: number, programInstitutionId?: string, eventId?: string, eventDescription?: string, activeOnly?: boolean, limit?: number, beforeId?: number, afterId?: number): CancelablePromise<Array<Event>>;
    /**
     * /event/close
     * This method closes a testing event. Closing a testing event will automatically complete all incomplete results, and if inventory is used, release unused inventory. User making the call must have access to the `program-institution-id` associated with the event. This is an asynchronous call that sets a flag on the event telling a service to start the process, and immediately returns, before the service has started.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. If supplied, all events linked to this institution, or its children will be returned. The web API client must have access to this institution.
     * @param eventId The unique database identifier of the event.
     * @param eventDescription Unique textual identifier for the event.
     * @returns EventResponse OK
     * @throws ApiError
     */
    static eventClose(programId: number, programInstitutionId?: string, eventId?: string, eventDescription?: string): CancelablePromise<Array<EventResponse>>;
    /**
     * /event/create
     * Creates events
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. This identifier is required for all institution tests. If supplied the testing event is only available to this institution and its children. The web API client must have access to this institution.
     * @param requestBody
     * @returns EventResponse OK
     * @throws ApiError
     */
    static eventCreate(programId: number, programInstitutionId?: string, requestBody?: Array<EventCreateRequest>): CancelablePromise<Array<EventResponse>>;
    /**
     * /event/update
     * Finds and updates events by matching on supplied identifiers.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. This identifier is required for all institution tests. If supplied the testing event is only available to this institution and its children. The web API client must have access to this institution.
     * @param requestBody
     * @returns EventResponse OK
     * @throws ApiError
     */
    static eventUpdate(programId: number, programInstitutionId?: string, requestBody?: Array<EventUpdateRequest>): CancelablePromise<Array<EventResponse>>;
    /**
     * /examinee/events/query
     * Retrieves examinee event information.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. If supplied, all events linked to this institution, or its children will be returned. The web API client must have access to this institution.
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program's system identifier of the examinee.
     * @param programExamineePublicId The program's public or business identifier of the examinee.
     * @param idType
     * @returns ExamineeEventsResponse OK
     * @throws ApiError
     */
    static queryExamineeEvents(programId: number, programInstitutionId?: string, examineeId?: Array<number>, programExamineeSystemId?: Array<string>, programExamineePublicId?: Array<string>, idType?: ExamineeIdentifierTypEnum): CancelablePromise<Array<ExamineeEventsResponse>>;
}
//# sourceMappingURL=EventService.d.ts.map