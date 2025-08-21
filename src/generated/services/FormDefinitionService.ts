/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormDefinitionModel } from '../models/FormDefinitionModel';
import type { FormDefinitionResponseReturn } from '../models/FormDefinitionResponseReturn';
import type { FormRequestBody } from '../models/FormRequestBody';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FormDefinitionService {
    /**
     * /form/definition/import
     * Used to import Base64 encoded Form Definition XML. See schema and example files listed in the appendix.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns FormDefinitionResponseReturn OK
     * @throws ApiError
     */
    public static formDefinitionImport(
        programId: number,
        programInstitutionId?: string,
        requestBody?: FormRequestBody,
    ): CancelablePromise<FormDefinitionResponseReturn> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/form/definition/Import',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /form/definition/query
     * Used to query Form Definition XML. XML is return Base64 encoded.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param formId The unique database identifier of the form.
     * @returns FormDefinitionModel OK
     * @throws ApiError
     */
    public static formDefinitionQuery(
        programId: number,
        programInstitutionId?: string,
        formId?: number,
    ): CancelablePromise<Array<FormDefinitionModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/form/definition/Query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'form-id': formId,
            },
        });
    }
}
