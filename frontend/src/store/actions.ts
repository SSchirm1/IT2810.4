import {SET_SORTING, SET_FILTER, SET_SEARCH, ActionTypes, filter, sort, search} from './actiontypes'

export function setSorting(sortby: sort): ActionTypes {
    return {
      type: SET_SORTING,
      sort: sortby
    }
  }

export function setFilter(filterby: filter): ActionTypes {
    return {
        type: SET_FILTER,
        filter: filterby
    }
  }

export function setSearch(searchafter: search): ActionTypes {
    return {
        type: SET_SEARCH,
        search: searchafter
    }
  }