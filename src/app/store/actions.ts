import * as model from './../models/filter';
import { Action } from '@ngrx/store';
import { add } from './../utils/action-type-cache';
import { Project } from './../models/project';

export const ENUMERATE = add('[Projects - Get a list of projects]');
export const ENUMERATED = add('[Projects - List of projects available]');
export const UPDATE = add('[Projects - Update data for a project]');
export const FILTER = add('[Projects - Apply filter]');
export const SORT = add('[Projects - Apply sort]');
export const TOGGLE_FILTER = add('[Projects - Toggle filter]');

export class Enumerate implements Action {
    readonly type = ENUMERATE;
}

export class Enumerated implements Action {
    readonly type = ENUMERATED;
    constructor(public payload: Project[]) { }
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(public payload: Project) { }
}

export class ApplyFilter implements Action {
    readonly type = FILTER;
    constructor(public payload: model.Filter[]) { }
}

export class Sort implements Action {
    readonly type = SORT;
    constructor(public payload: string) { }
}

export class ToggleFilter implements Action {
    readonly type = TOGGLE_FILTER;
    constructor(public payload: boolean) { }
}

export type Actions
    = Enumerate
    | Enumerated
    | Update
    | ApplyFilter
    | ToggleFilter
    | Sort;
