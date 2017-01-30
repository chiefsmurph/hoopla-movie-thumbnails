import Promise from 'es6-promise';
import { pageCached } from '../actions';

const apiCache = {};

export const fetchMovies = (page, dispatch) => {
    const offset = 48 * (page - 1);

    if (apiCache[page]) {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch(pageCached(true));
                resolve(apiCache[page]);
            }, 100);
        });
    }

    const processStatus = (response) => {
        if (response.status === 200) {
            const responseJSON = response.json();
            apiCache[page] = responseJSON;
            return Promise.resolve(responseJSON);
        }
        return Promise.reject(new Error(response.statusText));
    };

    return fetch(`https://hoopla-ws-dev.hoopladigital.com/kinds/7/titles/featured?offset=${offset}&limit=48&kindId=7`, {
        headers: {
            'ws-api': '2.1'
        }
    })
        .then(processStatus);
};
