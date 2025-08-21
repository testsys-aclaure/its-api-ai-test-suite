import type { Examinee3 } from './Examinee3';
import type { StartTestDelivery } from './StartTestDelivery';
export type StartTestDataHolder = {
    examinee?: Examinee3;
    readonly 'examinee-xml'?: string | null;
    delivery?: StartTestDelivery;
    readonly 'delivery-xml'?: string | null;
    'program-registration-id'?: string | null;
    'start-test-options'?: number | null;
    'site-code'?: string | null;
};
//# sourceMappingURL=StartTestDataHolder.d.ts.map