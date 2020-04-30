import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatus } from './../enums/project-status.enum';
@Pipe({
  name: 'statusString'
})
export class StatusStringPipe implements PipeTransform {

  public transform(status: ProjectStatus): string {
    switch (status) {
      case ProjectStatus.archived:
        return 'Archived';
      case ProjectStatus.delivered:
        return 'Delivered';
      case ProjectStatus.new:
        return 'New';
      case ProjectStatus.working:
        return 'Working';
    }
  }

}
