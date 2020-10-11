import { sortReducer } from './reducers'
import { combineReducers } from 'redux';

const {rootReducer} = combineReducers({
    sort: sortReducer
})

export type RootState = ReturnType<typeof rootReducer>