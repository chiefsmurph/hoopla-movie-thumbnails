import { fetchMovies, cachedPage } from '../api';
import { pageCached, thumbnailsFetching, thumbnailsFetchSuccess, thumbnailsFetchError } from './index.js';

export default function loadThumbnails(page) {
    return (dispatch) => {
        // if page cached
        const cached = cachedPage(page);
        if (cached) {
            return dispatch(pageCached(cached));
        }

        // else fetch movies
        dispatch(thumbnailsFetching(true));
        return fetchMovies(page)
            .then((thumbnails) => {
                dispatch(thumbnailsFetching(false));
                dispatch(thumbnailsFetchSuccess(thumbnails, page));
            })
            .catch((e) => dispatch(thumbnailsFetchError(e)));
    };
}
