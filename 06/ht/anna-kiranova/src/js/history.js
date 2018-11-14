'use strict';

import {setStorage} from './storage';
import {getStorage} from './storage';

let history;

export function getHistory() {
    return getStorage('history').then((historyJSON) => {
        history = historyJSON ? JSON.parse(historyJSON) : [];
        return history;
    });
}

export function addHistory(item) {
    history.unshift(item);
    history = history.slice(0, 5);
    return setStorage('history', JSON.stringify(history)).then(() => history);
}
