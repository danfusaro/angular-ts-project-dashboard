import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { Project } from './../../models/project';

@Component({
  selector: 'app-project-card-list',
  templateUrl: './project-card-list.component.html',
  styleUrls: ['./project-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardListComponent implements OnInit {

  @Output()
  updated: EventEmitter<Project> = new EventEmitter();

  @Input()
  projects: Project[];

  constructor() { }

  ngOnInit() {
  }

}
