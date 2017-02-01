import Promise from 'es6-promise';
import { pageCached } from '../actions';
import { TITLES_PER_PAGE } from '../constants';
import 'isomorphic-fetch';

const apiCache = {};

export const fetchMovies = (page, dispatch) => {
    const offset = TITLES_PER_PAGE * (page - 1);

    if (apiCache[page]) {
        return new Promise((resolve) => {
            dispatch(pageCached(true));
            resolve(apiCache[page]);
        });
    }

    return fetch(`https://hoopla-ws-dev.hoopladigital.com/kinds/7/titles/featured?offset=${offset}&limit=${TITLES_PER_PAGE}&kindId=7`, {
        headers: {
            'ws-api': '2.1'
        }
    })
        .then((response) => {
            if (response.status === 200) {
                const responseJSON = response.json();
                apiCache[page] = responseJSON;
                return Promise.resolve(responseJSON);
            }
            return Promise.reject(new Error(response.statusText));
        });
};
