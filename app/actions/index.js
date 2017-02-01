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

export function thumbnailLoaded() {
    return {
        type: 'THUMBNAIL_LOADED'
    };
}

export function pageCached(cachedThumbnails) {
    return {
        type: 'PAGE_CACHED',
        thumbnails: cachedThumbnails
    };
}

export {default as loadThumbnails} from './loadThumbnails';
