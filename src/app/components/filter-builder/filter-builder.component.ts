import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSlider } from "@angular/material/slider";
import { Subscription } from "rxjs/Subscription";
import { ProjectStatus } from "./../../enums/project-status.enum";
import { DateRange } from "./../../models/date-range";
import { Filter } from "./../../models/filter";
import { NumericRange } from "./../../models/numeric-range";
import { Project } from "./../../models/project";

interface FormData {
  title: string;
  division: string;
  owner: string;
  budgetMin: number;
  budgetMax: number;
  status: string;
  createdFrom: Date;
  createdTo: Date;
  modifiedFrom: Date;
  modifiedTo: Date;
}

@Component({
  selector: "app-filter-builder",
  templateUrl: "./filter-builder.component.html",
  styleUrls: ["./filter-builder.component.css"],
})
export class FilterBuilderComponent implements OnChanges, OnDestroy {
  @Input()
  public projects: Project[];

  @Input()
  public filters: Filter[];

  @Output()
  public filterChanged: EventEmitter<Filter[]> = new EventEmitter();

  @ViewChild("budgetMinSlider", { static: true })
  public budgetMinSlider: MatSlider;
  @ViewChild("budgetMaxSlider", { static: true })
  public budgetMaxSlider: MatSlider;

  public existingValues: Map<string, string[]> = new Map();
  public formGroup: FormGroup;
  public hasValues: boolean;
  public statusEnum = ProjectStatus;

  private changeSubscription: Subscription;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      title: "",
      division: "",
      owner: "",
      budgetMin: 0,
      budgetMax: 0,
      status: "",
      createdFrom: { value: null, disabled: true },
      createdTo: { value: null, disabled: true },
      modifiedFrom: { value: null, disabled: true },
      modifiedTo: { value: null, disabled: true },
    });
    this.subscribeToChanges();
  }

  public ngOnChanges() {
    if (this.projects) {
      this.mapAndSortExistingValues();
    }
    if (this.filters) {
      this.bindFiltersToForm();
    }
  }

  public ngOnDestroy() {
    // Tear down
    this.changeSubscription.unsubscribe();
  }

  public clear() {
    this.formGroup.reset();
    // Manually set to zero, for some reason form.clear() does not reset
    // slider values.
    this.budgetMinSlider.value = 0;
    this.budgetMaxSlider.value = 0;
  }

  public statusToString(status: ProjectStatus): string {
    switch (status) {
      case ProjectStatus.archived:
        return "Archived";
      case ProjectStatus.delivered:
        return "Delivered";
      case ProjectStatus.new:
        return "New";
      case ProjectStatus.working:
        return "Working";
    }
  }

  public getDateRange(value: string): DateRange {
    const dates = this.existingValues.get(value);
    const result: DateRange = { start: null, end: null };
    if (!!dates) {
      result.start = new Date(dates[0]);
      result.end = new Date(dates[dates.length - 1]);
    }
    return result;
  }

  public formDataToFilters(formData: FormData): Filter[] {
    const filters = [];
    // TODO - maybe clean this up
    if (formData.budgetMax || formData.budgetMin) {
      filters.push({
        property: "budget",
        value: { min: formData.budgetMin, max: formData.budgetMax },
      });
    }

    if (formData.createdFrom || formData.createdTo) {
      filters.push({
        property: "created",
        value: { start: formData.createdFrom, end: formData.createdTo },
      });
    }

    if (formData.modifiedFrom || formData.modifiedTo) {
      filters.push({
        property: "modified",
        value: { start: formData.modifiedFrom, end: formData.modifiedTo },
      });
    }
    // Convert form data to filters
    // TODO -need to handle currency and dates
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      const skip = [
        "budgetMin",
        "budgetMax",
        "createdFrom",
        "createdTo",
        "modifiedFrom",
        "modifiedTo",
      ];
      if (!!value && skip.indexOf(key) < 0) {
        filters.push({ property: key, value });
      }
    });
    return filters;
  }

  private apply() {
    const formData = this.formGroup.getRawValue() as FormData;
    const filters = this.formDataToFilters(formData);
    this.filterChanged.emit(filters);
  }

  private mapAndSortExistingValues(): void {
    // TODO - optimize runtime complexity
    this.projects.forEach((p) => {
      Object.keys(p).forEach((key) => {
        const value = p[key];
        const valuesAtKey = this.existingValues.get(key);
        if (!!valuesAtKey) {
          // Add values to key, do not allow dupes
          if (valuesAtKey.indexOf(value) < 0) {
            valuesAtKey.push(value);
            this.existingValues.set(key, valuesAtKey);
          }
        } else {
          this.existingValues.set(key, [value]);
        }
      });
      this.existingValues.forEach((v) => v.sort());
    });
  }

  private bindFiltersToForm(): void {
    this.changeSubscription.unsubscribe();
    // Update form with incoming filters
    this.hasValues = this.filters.length > 0;
    if (this.hasValues) {
      this.filters.forEach((f) => {
        if (f.property === "modified") {
          // Set date ranges
          const range = f.value as DateRange;
          this.formGroup.get("modifiedFrom").setValue(range.start);
          this.formGroup.get("modifiedTo").setValue(range.end);
        } else if (f.property === "created") {
          // Set date ranges
          const range = f.value as DateRange;
          this.formGroup.get("createdFrom").setValue(range.start);
          this.formGroup.get("createdTo").setValue(range.end);
        } else if (f.property === "budget") {
          const range = f.value as NumericRange;
          this.formGroup.get("budgetMin").setValue(range.min);
          this.formGroup.get("budgetMax").setValue(range.max);
        } else {
          this.formGroup.get(f.property).setValue(f.value);
        }
      });
    } else {
      this.clear();
    }
    // Temporarily unsubscribed to changes while incoming values are set
    this.subscribeToChanges();
  }

  private subscribeToChanges(): void {
    this.changeSubscription = this.formGroup.valueChanges
      .debounceTime(250)
      .subscribe((value) => {
        this.hasValues = Object.keys(value).some((key) => !!value[key]);
        this.apply();
      });
  }
}
