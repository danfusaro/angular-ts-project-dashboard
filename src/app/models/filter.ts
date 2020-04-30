import { ProjectStatus } from './../enums/project-status.enum';
import { DateRange } from './date-range';
import { NumericRange } from './numeric-range';
export interface Filter {
    property: string;
    value: string | number | DateRange | ProjectStatus | NumericRange;
}
