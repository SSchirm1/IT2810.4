import {sort, filter, search, ActionTypes, SET_SORTING, SET_FILTER, SET_SEARCH} from './actiontypes'

const initialSortState: sort = {
    parameter: 'alphabetical'
}

export function sortReducer(
    state = initialSortState,
    action: ActionTypes
): sort {
    switch (action.type) {
        case SET_SORTING:
            return{
                ...action.sort
            }
        default:
            return{ 
                ...state
        }
    }
}

const initialFilterState: filter = {
    city: null,
    stars: null
}

export function filterReducer(
    state = initialFilterState,
    action: ActionTypes
): filter {
    switch (action.type) {
        case SET_FILTER:
            return{
                ...action.filter
            }
        default:
            return{ 
                ...state
        }
    }
}

const initialSearchState: search = {
   search: ''
}

export function searchReducer(
    state = initialSearchState,
    action: ActionTypes
): search {
    switch (action.type) {
        case SET_SEARCH:
            return{
                ...action.search
            }
        default:
            return{ 
                ...state
        }
    }
}
