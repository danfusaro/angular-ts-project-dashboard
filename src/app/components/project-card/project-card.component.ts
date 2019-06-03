import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from './../../models/project';
import { ProjectStatus } from './../../enums/project-status.enum';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit, OnChanges {

  formGroup: FormGroup;

  @Input()
  editable: boolean;

  @Input()
  project: Project;

  @Output()
  updated: EventEmitter<Project> = new EventEmitter();

  private statusEnum = ProjectStatus;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.project) {
      this.formGroup = this.fb.group(this.project);
      if (!this.editable) {
        this.formGroup.disable({ onlySelf: true, emitEvent: false });
      }
    }
  }

  statusChanged(value: ProjectStatus): void {
    this.submit();
  }

  submit(): void {
    const value = this.formGroup.getRawValue() as Project;
    let budget = Number(value.budget);
    // Round excessively long decimals and handle edge cases
    if (!isNaN(budget)) {
      budget = Math.round(value.budget * 100) / 100;
    } else {
      budget = this.project.budget;
    }
    value.budget = budget;

    // Name must have at least one char
    if (!value.owner) {
      value.owner = this.project.owner;
    }
    this.updated.emit(value);
  }

}
