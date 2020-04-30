import { Action } from '@ngrx/store'
import * as model from './../models/filter'
import { Project } from './../models/project'
import { add } from './../utils/action-type-cache'

export const ENUMERATE = add('[Projects - Get a list of projects]')
export const ENUMERATED = add('[Projects - List of projects available]')
export const UPDATE = add('[Projects - Update data for a project]')
export const FILTER = add('[Projects - Apply filter]')
export const SORT = add('[Projects - Apply sort]')
export const TOGGLE_FILTER = add('[Projects - Toggle filter]')

export class Enumerate implements Action {
  public readonly type = ENUMERATE
}

export class Enumerated implements Action {
  public readonly type = ENUMERATED
  constructor(public payload: Project[]) {}
}

export class Update implements Action {
  public readonly type = UPDATE
  constructor(public payload: Project) {}
}

export class ApplyFilter implements Action {
  public readonly type = FILTER
  constructor(public payload: model.Filter[]) {}
}

export class Sort implements Action {
  public readonly type = SORT
  constructor(public payload: string) {}
}

export class ToggleFilter implements Action {
  public readonly type = TOGGLE_FILTER
  constructor(public payload: boolean) {}
}

export type Actions =
  | Enumerate
  | Enumerated
  | Update
  | ApplyFilter
  | ToggleFilter
  | Sort
