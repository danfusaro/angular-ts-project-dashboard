import * as moment from 'moment';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { DateRange } from './../../models/date-range';
import { Filter } from './../../models/filter';
import { NumericRange } from './../../models/numeric-range';
import { Project } from './../../models/project';
import { ProjectStatus } from './../../enums/project-status.enum';
import { StatusStringPipe } from './../../pipes/status-string.pipe';

@Component({
  selector: 'app-projects-toolbar-info',
  templateUrl: './projects-toolbar-info.component.html',
  styleUrls: ['./projects-toolbar-info.component.css']
})
export class ProjectsToolbarInfoComponent implements OnInit {

  @Output()
  toggle: EventEmitter<boolean> = new EventEmitter();
  @Output()
  filterChanged: EventEmitter<Filter[]> = new EventEmitter();
  @Output()
  sortChanged: EventEmitter<string> = new EventEmitter();

  toggled = false;

  @Input()
  projects: Project[];

  @Input()
  filters: Filter[];

  @Input()
  sort: string;

  @Input()
  sortValues: string[];

  constructor() { }

  ngOnInit() {
  }

  filterValueToString(filter: Filter): string {
    switch (filter.property) {
      case 'created':
      case 'modified': {
          const range = filter.value as DateRange;
          let value = '';
          const hasBoth = !!range.start && !!range.end;
          if (!!range.start) {
            value += `${!hasBoth ? 'after ' : ''} ${moment(range.start).format('MM/DD/YYYY')}`;
          }
          if (!!range.end) {
            value += `${!hasBoth ? 'before ' : ' - '}${moment(range.end).format('MM/DD/YYYY')}`;
          }
          return value;
        }
      case 'budget': {
          const range = filter.value as NumericRange;
          let value = '';
          const hasBoth = !!range.min && !!range.max;
          if (range.min > 0) {
            value += `${!hasBoth ? '> ' : ''}$${range.min}`;
          }
          if (range.max > 0) {
            value += `${!hasBoth ? '< ' : ' - '}$${range.max}`;
          }
          return value;
        }
      case 'status':
        return new StatusStringPipe().transform(filter.value as ProjectStatus);
      default:
        return filter.value.toString();
    }
  }
  removeFilter(filter: Filter): void {
    const filters = this.filters.filter(f => filter !== f);
    this.filterChanged.emit(filters);
  }

  sortChange(value: string) {
    this.sortChanged.emit(value);
  }

  toggleClicked(): void {
    this.toggled = !this.toggled;
    this.toggle.emit(this.toggled);
  }

}
