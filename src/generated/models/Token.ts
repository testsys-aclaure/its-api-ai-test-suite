/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request representing a token
 */
export type Token = {
    /**
     * The Environment to check the token against
     */
    environment: string | null;
    /**
     * The random string seed that was used to generate the original token in the GetToken() Secure Browser call.
     */
    'random-string': string | null;
    /**
     * The encrypted key returned by the GetToken() call made to the Secure Browser.
     */
    'encrypted-key': string | null;
    /**
     * The Agent Identifier associated with the Secure Browser.
     */
    'agent-identifier': string | null;
    /**
     * The version of the Secure Browser.
     */
    'sb-version': string | null;
};

