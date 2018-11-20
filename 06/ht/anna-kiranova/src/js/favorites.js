'use strict';

import { setStorage } from './storage';
import { getStorage } from './storage';

let favorites;

export function getFavorites() {
    return getStorage('favorites').then((favoritesJSON) => {
        favorites = favoritesJSON ? JSON.parse(favoritesJSON) : [];
        return favorites;
    });
}

export function addFavorite(item) {
    favorites.unshift(item);
    return setStorage('favorites', JSON.stringify(favorites)).then(() => favorites);
}

export function removeFavorite(i) {
    favorites.splice(i, 1);
    return setStorage('favorites', JSON.stringify(favorites)).then(() => favorites);
}