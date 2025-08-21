import type { FormDefinitionModel } from '../models/FormDefinitionModel';
import type { FormDefinitionResponseReturn } from '../models/FormDefinitionResponseReturn';
import type { FormRequestBody } from '../models/FormRequestBody';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class FormDefinitionService {
    /**
     * /form/definition/import
     * Used to import Base64 encoded Form Definition XML. See schema and example files listed in the appendix.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns FormDefinitionResponseReturn OK
     * @throws ApiError
     */
    static formDefinitionImport(programId: number, programInstitutionId?: string, requestBody?: FormRequestBody): CancelablePromise<FormDefinitionResponseReturn>;
    /**
     * /form/definition/query
     * Used to query Form Definition XML. XML is return Base64 encoded.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param formId The unique database identifier of the form.
     * @returns FormDefinitionModel OK
     * @throws ApiError
     */
    static formDefinitionQuery(programId: number, programInstitutionId?: string, formId?: number): CancelablePromise<Array<FormDefinitionModel>>;
}
//# sourceMappingURL=FormDefinitionService.d.ts.map