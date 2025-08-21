import type { BigInteger } from './BigInteger';
export type LogClass = {
    /**
     * Table source.
     */
    Table?: string | null;
    /**
     * RecordID from table.
     */
    RecordID?: number;
    /**
     * Date of record, converted to requested timezone.
     */
    Date?: string | null;
    /**
     * Time of record, converted to requested timezone
     */
    Time?: string | null;
    /**
     * Description of source.
     */
    Description?: string | null;
    /**
     * Specific action or log information.
     */
    Information?: string | null;
    ResultID?: BigInteger;
    /**
     * User, if any.
     */
    User?: string | null;
    /**
     * Sort UTC as returned from database (with milliseconds)
     */
    SortUTC?: string | null;
    /**
     * Time that the record was created; used to measure how long queries are taking
     */
    LogTime?: string | null;
};
//# sourceMappingURL=LogClass.d.ts.map