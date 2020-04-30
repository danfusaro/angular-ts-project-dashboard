import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Filter } from './../../models/filter'
import { Project } from './../../models/project'
import * as actions from './../../store/actions'
import * as root from './../../store/reducers'

@Component({
  selector: 'app-project-dashboard-view',
  templateUrl: './project-dashboard-view.component.html',
  styleUrls: ['./project-dashboard-view.component.css']
})
export class ProjectDashboardViewComponent implements OnInit {
  public projects$: Observable<Project[]>
  public filtered$: Observable<Project[]>
  public filters$: Observable<Filter[]>
  public sort$: Observable<string>

  public toggleFilter$: Observable<boolean>

  constructor(private store: Store<root.AppState>) {}

  public ngOnInit() {
    this.projects$ = this.store.select(root.selectProjects)
    this.filtered$ = this.store.select(root.selectFilteredProjects)
    this.filters$ = this.store.select(root.selectFilters)
    this.toggleFilter$ = this.store
      .select(root.selectState)
      .map(s => s.toggleFilter)
    this.sort$ = this.store.select(root.selectState).map(s => s.sortBy)
    this.store.dispatch(new actions.Enumerate())
  }

  public filterChanged(filters: Filter[]): void {
    // Dispatch action
    this.store.dispatch(new actions.ApplyFilter(filters))
  }

  public filterToggled(value: boolean): void {
    // Toggle side nav
    this.store.dispatch(new actions.ToggleFilter(!value))
  }

  public projectUpdated(value: Project): void {
    this.store.dispatch(new actions.Update(value))
  }

  public sortChanged(value: string): void {
    this.store.dispatch(new actions.Sort(value))
  }
}
