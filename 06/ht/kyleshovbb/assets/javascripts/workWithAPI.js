'use strict';

let fetchMethod = document.querySelector("#fetchMethod");
let XHRMethod = document.querySelector("#XHRMethod");

function getForecastByLatLng(event, latlng) {
    latlng = latlng || getLatlng();
    let DARKSKY_API_KEY = `e2fdce61fddd3b7c2bcc0ab7ac25536c`;
    let url = `https://free-cors-proxy.herokuapp.com/https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latlng}?lang=ru%26units=si`
    return getAjaxResponse(url);
}

function getCityName(latlng) {
    let GOOGLE_API_KEY = `AIzaSyBbt9DGHAlhJIrltRyAXpJ6d8E1RDvANAQ`;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${GOOGLE_API_KEY}&language=ru`;
    return getAjaxResponse(url);
}

function getCoords(addr) {
    let GOOGLE_API_KEY = `AIzaSyBbt9DGHAlhJIrltRyAXpJ6d8E1RDvANAQ`;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}&language=ru`;
    return getAjaxResponse(url);
}

function getUserLocation(addr) {
    let url = `https://api.userinfo.io/userinfos`;
    return getAjaxResponse(url);
}

function getAjaxResponse(url) {
    if (fetchMethod.checked) {
        return getFetch(url);
    } else if (XHRMethod.checked) {
        return getXHR(url);
    } else alert("Выберите метод отпрвки ajax запроса")
}

function getFetch(url) {
    return fetch(url)
        .then((request) => request.json())
        .catch(error => {
            console.log(error);
        });
}

function getXHR(url) {
    return new Promise(function(resolve, reject) {
        let cityNameXHR = new XMLHttpRequest();
        cityNameXHR.open('GET', url, true);
        cityNameXHR.onload = () => {
            if (cityNameXHR.status == 200) {
                resolve(JSON.parse(cityNameXHR.response));
            } else {
                let error = new Error(cityNameXHR.statusText);
                error.code = cityNameXHR.status;
                reject(error);
            }
        };
        cityNameXHR.onerror = () => console.log(error);
        cityNameXHR.send();
    });
}

import {getLatlng} from "./yandexMap";

export {
    getCoords,
    getCityName,
    getUserLocation,
    getForecastByLatLng
};
