'use strict';

// async LS
export function setStorage(key, val) {
    return Promise.resolve(localStorage.setItem(key, val));
}

export function getStorage(key) {
    return Promise.resolve(localStorage.getItem(key));
}
