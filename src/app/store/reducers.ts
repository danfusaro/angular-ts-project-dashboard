import * as _ from 'lodash';
import * as actions from './actions';
import * as moment from 'moment';
import { createSelector } from '@ngrx/store';
import { DateRange } from './../models/date-range';
import { Filter } from './../models/filter';
import { NumericRange } from './../models/numeric-range';
import { Project } from './../models/project';
import { ProjectStats } from './../models/project-stats';

export interface AppState {
    projects: { [id: number]: Project };
    sortBy: string;
    filters: { [property: string]: Filter[] };
    toggleFilter: boolean;
}

// Set default sort to created date, does not chnange in this prototype
const defaultState: AppState = { projects: {}, filters: {}, sortBy: 'created', toggleFilter: true };

export function reducer(state = defaultState, action: actions.Actions) {
    switch (action.type) {
        case actions.ENUMERATED: {
            const projects = {};
            action.payload.forEach(value => {
                projects[value.id] = value;
            });
            return { ...state, projects };
        }
        case actions.FILTER: {
            const filters = {};
            action.payload.forEach(filter => {
                if (!filters[filter.property]) {
                    filters[filter.property] = [filter];
                } else {
                    filters[filter.property].push(filter);
                }
            });
            return { ...state, filters };
        }
        case actions.SORT:
            return { ...state, sortBy: action.payload };
        case actions.UPDATE: {
            const projects = { ...state.projects, [action.payload.id]: action.payload };
            return { ...state, projects };
        }
        case actions.TOGGLE_FILTER: {
            return { ...state, toggleFilter: action.payload };
        }
        default:
            return state;
    }
}

export const selectState = (state): AppState => state.app as AppState;
export const selectProjects =
    createSelector(selectState, (state: AppState) =>
        _.sortBy(Object.keys(state.projects).map(key => state.projects[key]), state.sortBy)
    );

export const selectFilters =
    createSelector(selectState,
        (state: AppState) => Object.keys(state.filters)
            .map(key => state.filters[key])
            .reduce((a, b) => a.concat(b), []));

// Get list of projects with filters applied
export const selectFilteredProjects =
    createSelector(selectProjects, selectFilters,
        (projects: Project[], filters: Filter[]) => {
            return projects
                .filter(p => {
                    return filters.every(f => {
                        // Do checks by type
                        if (f.property === 'created' || f.property === 'modified') {
                            // Do date range check
                            const filterDate: DateRange = f.value as DateRange;
                            const projectDate: Date = p[f.property] as Date;
                            const start = filterDate.start || new Date('1/1/1970');
                            const end = filterDate.end || new Date('1/1/3000');
                            return moment(projectDate).isBetween(start, end);
                        } else if (f.property === 'budget') {
                            const range: NumericRange = f.value as NumericRange;
                            const min = range.min || 0;
                            const max = range.max || Infinity;
                            return p.budget >= min && p.budget <= max;
                        } else {
                            // Do value check
                            return p[f.property] === f.value;
                        }
                    });
                });
        });

export const selectProjectStats = createSelector(selectProjects, (projects) => {
    // Newest project
    const newest = _.maxBy(projects, 'created');
    // Oldest project
    const oldest = _.minBy(projects, 'created');
    // Most expensive project
    const highest = _.maxBy(projects, 'budget');
    // Least expensive project
    const lowest = _.minBy(projects, 'budget');
    const owners = _.groupBy(projects, 'owner');
    const most = Object.keys(owners).reduce((a, b) => {
        return owners[a].length > owners[b].length ? a : b;
    });
    // Most active product owner
    const mostActive = { name: most, projects: owners[most] };
    // Find average cost
    const averageBudget = _.sumBy(projects, 'budget') / projects.length;
    return {
        newest,
        oldest,
        highest,
        lowest,
        mostActive,
        averageBudget
    } as ProjectStats;
});

