'use strict';

class SearchCity {
    constructor(){
        this.searchInpute = document.querySelector("#search");
        this.addCityNameToHash();
    }

    addCityNameToHash() {
        let searchCityName = this.searchInpute.value;
        if (searchCityName) {
            window.location.hash = `/city/${searchCityName}/`;
            this.searchCity(null,searchCityName);
        }
    }

    searchCity(event,searchCity) {
        this.getLocation = getCoords(searchCity);
        this.getLocation
            .then((data) => {
                new HistorySearchCity().addCityToHistory(data.results[0].formatted_address);
                return data;
            })
            .then((data) => data.results[0].geometry.location)
            .then((coords) => {
                let arrCoords = [];
                arrCoords[0] = coords.lat;
                arrCoords[1] = coords.lng;
                return arrCoords;
            })
            .then((arrCoords) => {
                let latlng = getLatlng(arrCoords[0], arrCoords[1]);
                yandexMap.innerHTML = "";
                new YandexMap(event, arrCoords);
            });
    }
}

import {getCoords} from "./workWithAPI";
import {YandexMap, getLatlng} from "./yandexMap";
import HistorySearchCity from "./historySearchCity";

export default SearchCity;
