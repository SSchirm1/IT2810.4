export interface filter {
    city: any
    stars: any
}

export interface sort {
    parameter: string
}

export interface search {
    search: string
}

export const SET_SORTING = 'SET_SORTING'
export const SET_FILTER = 'SET_FILTER'
export const SET_SEARCH = 'SET_SEARCH'


interface SetSortingAction{
    type: typeof SET_SORTING
    sort: sort
}

interface SetFilterAction{
    type: typeof SET_FILTER
    filter: filter
}

interface SetSearchAction{
    type: typeof SET_SEARCH
    search: search
}

export type ActionTypes = SetSortingAction | SetFilterAction | SetSearchAction