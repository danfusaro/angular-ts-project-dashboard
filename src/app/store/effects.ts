import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { ProjectService } from './../services/project.service'
import * as actions from './actions'
import { AppState } from './reducers'

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private service: ProjectService) { }

  @Effect()
  public enumerate$(): Observable<Action> {
    return this.actions$.filter(action => action.type === actions.ENUMERATE)
      .switchMap(() => {
        // Get value from server, map back to action to end up
        // in reducer
        return this.service.getProjects()
          .map(projects => new actions.Enumerated(projects))
      })
  }
}
