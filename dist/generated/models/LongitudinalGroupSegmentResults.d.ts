import type { Event1 } from './Event1';
import type { LongitudinalGroupCycle } from './LongitudinalGroupCycle';
import type { LongitudinalGroupSegmentSyllabus } from './LongitudinalGroupSegmentSyllabus';
import type { TimeBank } from './TimeBank';
export type LongitudinalGroupSegmentResults = {
    event?: Event1;
    detail?: LongitudinalGroupCycle;
    timebank?: TimeBank;
    'score-groups'?: Array<LongitudinalGroupSegmentSyllabus> | null;
};
//# sourceMappingURL=LongitudinalGroupSegmentResults.d.ts.map