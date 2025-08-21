import type { AccessRight } from './AccessRight';
import type { Institution4 } from './Institution4';
/**
 * A program within the sponsor the user can access.
 */
export type Program = {
    /**
     * The unique database identifier of the program.
     */
    'program-id': number;
    /**
     * The unique textual identifier of the program.
     */
    name: string | null;
    /**
     * The vendor’s unique textual identifier of the program.
     */
    'vendor-program-id': string | null;
    /**
     * The unique database identifier of the role.
     */
    'role-id': number | null;
    /**
     * The unique textual identifier of the role.
     */
    'role-code': string | null;
    /**
     * The name of the role.
     */
    'role-name': string | null;
    /**
     * The description of the role.
     */
    'role-description'?: string | null;
    /**
     * A collection of access rights for the user within a program. These access rights override the default access of the user.
     */
    readonly 'access-rights'?: Array<AccessRight> | null;
    /**
     * A collection of institutions a user can access.
     */
    readonly institutions?: Array<Institution4> | null;
};
//# sourceMappingURL=Program.d.ts.map