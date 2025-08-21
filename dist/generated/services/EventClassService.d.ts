import type { EventClass } from '../models/EventClass';
import type { EventClassCreateRequest } from '../models/EventClassCreateRequest';
import type { EventClassExamineesCreateResponse } from '../models/EventClassExamineesCreateResponse';
import type { EventClassExamineesDeleteResponse } from '../models/EventClassExamineesDeleteResponse';
import type { EventClassExamineesQueryResponse } from '../models/EventClassExamineesQueryResponse';
import type { EventClassResponse } from '../models/EventClassResponse';
import type { EventClassUpdateRequest } from '../models/EventClassUpdateRequest';
import type { Examinee } from '../models/Examinee';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class EventClassService {
    /**
     * /event-class/query
     * Retrieves details about a remote session.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The program institution's name.
     * @param eventClassId The unique identifier of the event class.
     * @param eventId Includes all sessions starting on or after this date. This parameter and end-utc are required if session-code is not supplied.
     * @param programClassCode Program unique identifier for the event class.
     * @returns EventClass OK
     * @throws ApiError
     */
    static eventClassQuery(programId: number, programInstitutionId: string, eventClassId?: number, eventId?: number, programClassCode?: string): CancelablePromise<Array<EventClass>>;
    /**
     * /event-class/create
     * Creates an event class. This call is for clients who want to group together examinees into a class for a particular event.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The Web API client must have access to this institution.
     * @param requestBody
     * @returns EventClassResponse OK
     * @throws ApiError
     */
    static eventClassCreate(programId: number, programInstitutionId: string, requestBody: EventClassCreateRequest): CancelablePromise<EventClassResponse>;
    /**
     * /event-class/update
     * Finds and updates an existing event class from the event-class-id in the object data.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns EventClassResponse OK
     * @throws ApiError
     */
    static eventClassUpdate(programId: number, programInstitutionId: string, requestBody: EventClassUpdateRequest): CancelablePromise<EventClassResponse>;
    /**
     * /event-class/delete
     * Removes all the linked examinees and deletes the Event Class.
     * @param programId The unique program identifier provided as part of configuration.
     * @param eventClassId The unique identifier of the event class.
     * @returns EventClassResponse OK
     * @throws ApiError
     */
    static eventClassDelete(programId: number, eventClassId: number): CancelablePromise<EventClassResponse>;
    /**
     * /event-class/examinees/create
     * Creates an event class examinee record. This call is for clients who want to group together examinees into a class for a particular event.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param eventClassId
     * @param examineeIds
     * @param programExamineeSystemIds
     * @param programExamineePublicIds
     * @param requestBody
     * @returns EventClassExamineesCreateResponse OK
     * @throws ApiError
     */
    static eventClassExamineesCreate(programId: number, programInstitutionId: string, eventClassId: number, examineeIds?: Array<number>, programExamineeSystemIds?: Array<string>, programExamineePublicIds?: Array<string>, requestBody?: Array<Examinee>): CancelablePromise<Array<EventClassExamineesCreateResponse>>;
    /**
     * /event-class/examinees/query
     * Retrieves details about an examinee in an event class.Choose to filter by either event-class-id or a candidate identifier, and if candidate identifier choose 1 of the candidate identifiers (public, system, or examinee)
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param eventClassId The unique identifier of the event class.
     * @param examineeId ITS unique identifier for the examinee.
     * @param programExamineeSystemId The program’s system identifier of the examinee.
     * @param programExamineePublicId The program’s public or business identifier of the examinee.
     * @returns EventClassExamineesQueryResponse OK
     * @throws ApiError
     */
    static eventClassExamineesQuery(programId: number, programInstitutionId?: string, eventClassId?: number, examineeId?: number, programExamineeSystemId?: string, programExamineePublicId?: string): CancelablePromise<Array<EventClassExamineesQueryResponse>>;
    /**
     * /event-class/examinees/delete
     * Removes the specified linked examinees.
     * @param programId The unique program identifier provided as part of configuration.
     * @param eventClassExamineeId Deletes the individual Event Class Examinee record.
     * @param eventClassId Deletes all of the Event Class Examinee records for the event-class-id.
     * @returns EventClassExamineesDeleteResponse OK
     * @throws ApiError
     */
    static eventClassExamineesDelete(programId: number, eventClassExamineeId?: number, eventClassId?: number): CancelablePromise<Array<EventClassExamineesDeleteResponse>>;
}
//# sourceMappingURL=EventClassService.d.ts.map