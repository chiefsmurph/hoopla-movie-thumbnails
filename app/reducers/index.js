import { combineReducers } from 'redux';
// import * as types from '../actions/types';

const thumbnails = (state = [], action) => {
    switch (action.type) {
        case 'THUMBNAILS_FETCH_SUCCESS':
            return action.thumbnails;
        default:
            return state;
    }
};

const thumbnailsFetching = (state = false, action) => {
    switch (action.type) {
        case 'THUMBNAILS_FETCHING':
            return true;
        case 'THUMBNAILS_FETCH_SUCCESS':
        case 'THUMBNAILS_FETCH_ERROR':
            return false;
        default:
            return state;
    }
};

const loadCount = (state = 0, action) => {
    switch (action.type) {
        case 'THUMBNAILS_FETCH_SUCCESS':
        case 'THUMBNAILS_FETCHING':
            return 0;
        case 'THUMBNAIL_LOADED':
            return state + 1;
        default:
            return state;
    }
};

const isCached = (state = false, action) => {
    switch (action.type) {
        case 'THUMBNAILS_FETCHING':
            return (action.thumbnailsFetching) ? false : state;
        case 'PAGE_CACHED':
            return action.cached;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    thumbnails,
    thumbnailsFetching,
    loadCount,
    isCached
});

export default rootReducer;
