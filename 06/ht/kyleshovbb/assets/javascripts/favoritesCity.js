'use strict';

class FavoritesCity {
    constructor(coords, element) {
        this.favorites = element || document.querySelector("#favorites");
        if (coords) {
            this.cityName = getCityName(getLatlng(coords[0], coords[1]));
            this.getFavoriteCityName(coords);
        }
    }

    getFavoriteCityName(coords) {
        this.cityName
            .then((data) => data.results[1].formatted_address)
            .then((cityName) => {
                myMap.balloon.open(coords, {
                    contentBody: `${cityName} добавлен в избранное`,
                    contentFooter: '<sup>Щелкните еще раз</sup>'
                });
                return cityName;
            })
            .then((cityName) => this.addCityToFavorite(cityName));
    }

    addCityToFavorite(cityName) {
        let arrayCityName;
        if (!localStorage["favoriteCity"]) {
            localStorage["favoriteCity"] = [];
            arrayCityName = [];
        } else {
            arrayCityName = localStorage["favoriteCity"].split(" ;;");
        }
        if (cityName) {
            arrayCityName.unshift(cityName);
        }
        this.addFavotiteCityInLocalStorage(arrayCityName);
        this.addFavoritesAddressList(arrayCityName);
    }

    addFavotiteCityInLocalStorage(arrayCityName) {
        let favoriteCity = "";
        arrayCityName.forEach(function (city) {
            if (city) {
                favoriteCity += city + " ;;";
            }
        })
        localStorage["favoriteCity"] = favoriteCity.slice(0, -3);
    }

    addFavoritesAddressList(arrayCityName) {
        let addressList = `<ul>Избранное:`;
        arrayCityName.forEach(function (city, index) {
            addressList += `<li class="favorites">${city}
<span class="deleteFavorite" data-index="${index}">×</span>
</li>`;
        });
        addressList += `</ul>`;
        this.favorites.innerHTML = addressList;
    }

    deleteFavorite(target) {
        let parentButton = target.parentElement;
        let dataTask = target.getAttribute("data-index");
        let cityName = localStorage['favoriteCity'];
        let arrayCityName = cityName.split(' ;;');
        arrayCityName.splice(dataTask, 1);
        this.addFavotiteCityInLocalStorage(arrayCityName);
        parentButton.remove();
    }
}

import {myMap,getLatlng} from "./yandexMap";
import {getCityName} from "./workWithAPI";

export default FavoritesCity;