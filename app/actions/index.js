// import * as types from './types';
import { fetchMovies } from '../api/index.js';

export function thumbnailsFetching(bool) {
    return {
        type: 'THUMBNAILS_FETCHING',
        thumbnailsFetching: bool
    };
}

export function thumbnailsFetchSuccess(thumbnails) {
    return {
        type: 'THUMBNAILS_FETCH_SUCCESS',
        thumbnails
    };
}

export function thumbnailsFetchError(error) {
    return {
        type: 'THUMBNAILS_FETCH_ERROR',
        error
    };
}

export function thumbnailLoaded(loadCount) {
    return {
        type: 'THUMBNAIL_LOADED',
        count: loadCount
    };
}

export function pageCached(bool) {
    return {
        type: 'PAGE_CACHED',
        cached: bool
    };
}

export function loadThumbnails(page) {
    return (dispatch) => {
        dispatch(thumbnailsFetching(true));

        fetchMovies(page, dispatch)
            .then((response) => {
                dispatch(thumbnailsFetching(false));
                return response;
            })
            .then((thumbnails) => dispatch(thumbnailsFetchSuccess(thumbnails, page)))
            .catch((e) => dispatch(thumbnailsFetchError(e)));
    };
}
