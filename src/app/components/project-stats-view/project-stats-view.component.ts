import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx'
import { Project } from './../../models/project'
import { ProjectStats } from './../../models/project-stats'
import { Enumerate } from './../../store/actions'
import * as root from './../../store/reducers'

@Component({
  selector: 'app-project-stats-view',
  templateUrl: './project-stats-view.component.html',
  styleUrls: ['./project-stats-view.component.css']
})
export class ProjectStatsViewComponent implements OnInit {

  public stats$: Observable<ProjectStats>

  constructor(private store: Store<root.AppState>) { }

  public ngOnInit() {
    this.store.dispatch(new Enumerate())
    this.stats$ = this.store.select(root.selectProjectStats)
  }

  public getMostActiveLabel(stats: ProjectStats): string {
    return `${stats.mostActive.name} (${stats.mostActive.projects.length} projects)`
  }

  public getMostActiveProjects(stats: ProjectStats): Project[] {
    return stats.mostActive.projects
  }

}
