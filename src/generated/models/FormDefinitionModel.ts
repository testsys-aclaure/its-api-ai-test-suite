/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FormDefinitionModel = {
    /**
     * The unique database identifier of the form.
     */
    'form-id'?: number | null;
    /**
     * XML that defines the test definition. If not NULL, then this is a dynamic test.
     */
    'definition-xml'?: string | null;
    /**
     * A number that is incremented each time the `DefinitionXML` is updated for a rescore. The default value is 1.
     */
    'definition-version'?: number;
    /**
     * The source XML for Forms.DefinitionXML. Clients pass this XML to ITS through the form/definition API call, which transforms it into the format ITD expects and stores it in the Forms.DefinitionXML field.
     */
    'form-definition'?: string | null;
};

