import { DateRange } from './date-range';
import { NumericRange } from './numeric-range';
import { ProjectStatus } from './../enums/project-status.enum';
export interface Filter {
    property: string;
    value: string | number | DateRange | ProjectStatus | NumericRange;
}
