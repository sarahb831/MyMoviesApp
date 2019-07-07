import { combineReducers } from 'redux';
import { SET_FILTER, SET_SORT_COLUMN, SET_MOVIES, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch(action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function sortColumn(state = 'Title', action) {
    switch(action.type) {
        case SET_SORT_COLUMN:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch(action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function userObject(state = {}, action) {
    switch(action.type) {
        case SET_USER:
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    sortColumn,
    movies,
    userObject
});

export default moviesApp;