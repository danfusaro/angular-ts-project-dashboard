import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { Project } from './../../models/project'

@Component({
  selector: 'app-project-card-list',
  templateUrl: './project-card-list.component.html',
  styleUrls: ['./project-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardListComponent {
  @Output()
  public updated: EventEmitter<Project> = new EventEmitter()

  @Input()
  public projects: Project[]
}
