import * as actions from './../../store/actions';
import * as root from './../../store/reducers';
import { Component, OnInit } from '@angular/core';
import { Filter } from './../../models/filter';
import { Observable } from 'rxjs/Observable';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-dashboard-view',
  templateUrl: './project-dashboard-view.component.html',
  styleUrls: ['./project-dashboard-view.component.css']
})
export class ProjectDashboardViewComponent implements OnInit {

  projects$: Observable<Project[]>;
  filtered$: Observable<Project[]>;
  filters$: Observable<Filter[]>;
  sort$: Observable<string>;

  toggleFilter$: Observable<boolean>;

  constructor(
    private store: Store<root.AppState>) { }

  ngOnInit() {
    this.projects$ = this.store.select(root.selectProjects);
    this.filtered$ = this.store.select(root.selectFilteredProjects);
    this.filters$ = this.store.select(root.selectFilters);
    this.toggleFilter$ = this.store.select(root.selectState).map(s => s.toggleFilter);
    this.sort$ = this.store.select(root.selectState).map(s => s.sortBy);
    this.store.dispatch(new actions.Enumerate());
  }

  filterChanged(filters: Filter[]): void {
    // Dispatch action
    this.store.dispatch(new actions.ApplyFilter(filters));
  }

  filterToggled(value: boolean): void {
    // Toggle side nav
    this.store.dispatch(new actions.ToggleFilter(!value));
  }

  projectUpdated(value: Project): void {
    this.store.dispatch(new actions.Update(value));
  }

  sortChanged(value: string): void {
    this.store.dispatch(new actions.Sort(value));
  }


}
