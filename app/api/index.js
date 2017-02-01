import { TITLES_PER_PAGE } from '../constants';
import Promise from 'es6-promise';
import 'isomorphic-fetch';

const apiCache = {};

export const cachedPage = (page) => apiCache[page];

export const fetchMovies = (page) => {
    const offset = TITLES_PER_PAGE * (page - 1);

    return fetch(`https://hoopla-ws-dev.hoopladigital.com/kinds/7/titles/featured?offset=${offset}&limit=${TITLES_PER_PAGE}&kindId=7`, {
        headers: {
            'ws-api': '2.1'
        }
    })
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error(response));
            }
            return response.json();
        }).then(thumbnails => {
            apiCache[page] = thumbnails;
            return Promise.resolve(thumbnails);
        });
};
