import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProjectStatus } from "./../../enums/project-status.enum";
import { Project } from "./../../models/project";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.css"],
})
export class ProjectCardComponent implements OnChanges {
  public formGroup: FormGroup;

  @Input()
  public editable: boolean;

  @Input()
  public project: Project;

  @Output()
  public updated: EventEmitter<Project> = new EventEmitter();

  private statusEnum = ProjectStatus;

  constructor(private fb: FormBuilder) {}

  public ngOnChanges() {
    if (this.project) {
      this.formGroup = this.fb.group(this.project);
      if (!this.editable) {
        this.formGroup.disable({ onlySelf: true, emitEvent: false });
      }
    }
  }

  public statusChanged(value: ProjectStatus): void {
    this.submit();
  }

  public submit(): void {
    const value = this.formGroup.getRawValue() as Project;
    // Round excessively long decimals and handle edge cases
    const budget = !isNaN(Number(value.budget))
      ? this.project.budget
      : Math.round(value.budget * 100) / 100;

    value.budget = budget;

    // Name must have at least one char
    if (!value.owner) {
      value.owner = this.project.owner;
    }
    this.updated.emit(value);
  }
}
