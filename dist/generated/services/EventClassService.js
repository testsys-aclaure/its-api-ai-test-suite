"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventClassService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class EventClassService {
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
    static eventClassQuery(programId, programInstitutionId, eventClassId, eventId, programClassCode) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/event-class/Query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'event-class-id': eventClassId,
                'event-id': eventId,
                'program-class-code': programClassCode,
            },
        });
    }
    /**
     * /event-class/create
     * Creates an event class. This call is for clients who want to group together examinees into a class for a particular event.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The Web API client must have access to this institution.
     * @param requestBody
     * @returns EventClassResponse OK
     * @throws ApiError
     */
    static eventClassCreate(programId, programInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/event-class/Create',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /event-class/update
     * Finds and updates an existing event class from the event-class-id in the object data.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns EventClassResponse OK
     * @throws ApiError
     */
    static eventClassUpdate(programId, programInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/event-class/Update',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /event-class/delete
     * Removes all the linked examinees and deletes the Event Class.
     * @param programId The unique program identifier provided as part of configuration.
     * @param eventClassId The unique identifier of the event class.
     * @returns EventClassResponse OK
     * @throws ApiError
     */
    static eventClassDelete(programId, eventClassId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/event-class/Delete',
            query: {
                'program-id': programId,
                'event-class-id': eventClassId,
            },
        });
    }
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
    static eventClassExamineesCreate(programId, programInstitutionId, eventClassId, examineeIds, programExamineeSystemIds, programExamineePublicIds, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/event-class/examinees/create',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'event-class-id': eventClassId,
                'ExamineeIds': examineeIds,
                'ProgramExamineeSystemIds': programExamineeSystemIds,
                'ProgramExamineePublicIds': programExamineePublicIds,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
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
    static eventClassExamineesQuery(programId, programInstitutionId, eventClassId, examineeId, programExamineeSystemId, programExamineePublicId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/event-class/examinees/query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'event-class-id': eventClassId,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
            },
        });
    }
    /**
     * /event-class/examinees/delete
     * Removes the specified linked examinees.
     * @param programId The unique program identifier provided as part of configuration.
     * @param eventClassExamineeId Deletes the individual Event Class Examinee record.
     * @param eventClassId Deletes all of the Event Class Examinee records for the event-class-id.
     * @returns EventClassExamineesDeleteResponse OK
     * @throws ApiError
     */
    static eventClassExamineesDelete(programId, eventClassExamineeId, eventClassId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/event-class/examinees/delete',
            query: {
                'program-id': programId,
                'event-class-examinee-id': eventClassExamineeId,
                'event-class-id': eventClassId,
            },
        });
    }
}
exports.EventClassService = EventClassService;
//# sourceMappingURL=EventClassService.js.map