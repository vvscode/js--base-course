'use strict';

class HistorySearchCity {
    constructor(element) {
        this.history = element || document.querySelector("#history");
    }

    addCityToHistory(cityName) {
        let arrayCityName;
        if (!localStorage["searchHistory"]) {
            localStorage["searchHistory"] = [];
            arrayCityName = [];
        } else {
            arrayCityName = localStorage["searchHistory"].split(" ;;");
        }

        if (arrayCityName.length === 5 && cityName) {
            arrayCityName.pop();
        }

        if (cityName) {
            arrayCityName.unshift(cityName);
            this.weatherRecordInLocalStorage(arrayCityName);
        }
        this.addHistoryAddressList(arrayCityName);
    }

    weatherRecordInLocalStorage(addAddressList) {
        let weatherHistory = "";
        addAddressList.forEach(function (city) {
            weatherHistory += city + " ;;";
        })
        localStorage["searchHistory"] = weatherHistory.slice(0, -3);
    }

    addHistoryAddressList(arrayCityName) {
        let addressList = `<ul> История поиска:`;
        arrayCityName.forEach(function (city) {
            addressList += `<li class="history">${city}</li>`
        });
        addressList += `</ul>`;

        this.history.innerHTML = addressList;
    }
}

export default HistorySearchCity;