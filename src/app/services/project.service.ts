import { Injectable } from '@angular/core';
import { mockData } from './mock-data';
import { Observable } from 'rxjs/Rx';
import { Project } from './../models/project';
import { ProjectStatus } from './../enums/project-status.enum';

@Injectable()
export class ProjectService {

  constructor() { }

  getProjects(): Observable<Project[]> {
    // Typically this would be a get, convert server object
    // to TS object
    const projects = mockData.map((data, index) => {
      return {
        id: index,  // Faked the id
        title: data.title,
        division: data.division,
        owner: data.project_owner,
        budget: data.budget,
        status: ProjectStatus[data.status],
        created: new Date(data.created),
        modified: !!data.modified ? new Date(data.modified) : null
      } as Project;
    });
    // Kept this an observable to mock HTTP get
    return Observable.of(projects);

  }

}
