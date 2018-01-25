'use strict';

let myMap;

class YandexMap {
    constructor(settings, center, zoom = 10) {
        myMap = new ymaps.Map(yandexMap, {
            center: center,
            zoom: zoom
        });
        this.yandexForm = document.querySelector("#yandexForm");
        this.footer = document.querySelector("#footer");
        this.subscribeToMapEvent();
    }

    subscribeToMapEvent() {
        myMap.events.add('actionend', this.dragMap);
        myMap.events.add('click', this.yandexBalloon);
        this.footer.addEventListener('click',this.clickAtCityName);
        this.yandexForm.addEventListener("submit", this.subsSearchCity);
        new AddWeather();
    }

    subsSearchCity(){
        new SearchCity();
    }

    dragMap() {
        window.location.hash = `/location/${getLatlng()},${myMap.getZoom()}/`;
        new AddWeather();
    }

    clickAtCityName(event) {
        let target = event.target;
        let targetCityList = target.matches(".favorites") && target.closest(".favorites") ||
            target.matches(".history") && target.closest(".history");
        let buttonDeleteFavorite = target.matches(".deleteFavorite") && target.closest(".deleteFavorite");
        if (targetCityList) {
            window.location.hash = `/city/${target.firstChild.data}/`;
            new SearchCity().searchCity(null,target.firstChild.data);
        } else if (buttonDeleteFavorite) {
            new FavoritesCity().deleteFavorite(target);
        }
    }

    yandexBalloon(e) {
        if (!myMap.balloon.isOpen()) {
            let coords = e.get('coords');
            new FavoritesCity(coords);
        } else {
            myMap.balloon.close();
        }
    }
}

function getLatlng(lat, lng) {
    let center;
    if (myMap) {
        center = myMap.getCenter();
    }
    lat = lat || center[0];
    lng = lng || center[1];
    let latlng = lat + "," + lng;
    return latlng;
}

import AddWeather from "./addWeather";
import SearchCity from "./searchCity";
import FavoritesCity from "./favoritesCity";

export {
    myMap,
    YandexMap,
    getLatlng
}