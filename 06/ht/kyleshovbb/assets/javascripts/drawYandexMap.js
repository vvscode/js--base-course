'use strict';
let myMap;

function drawYandexMap (settings, center, zoom = 10) {
    myMap = new ymaps.Map(yandexMap, {
        center: center,
        zoom: zoom
    });
    subscribeToMapEvent();
}

function subscribeToMapEvent() {
    myMap.events.add('click', yandexBalloon);
    myMap.events.add('actionend', dragMap);
    footer.addEventListener('click',clickAtCityName);
    addWeather();
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