let history = document.querySelector("#history");

function addCityToHistory(cityName) {
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
        weatherRecordInLocalStorage(arrayCityName);
    }
    addHistoryAddressList(arrayCityName);
}

function weatherRecordInLocalStorage(addAddressList) {
    let weatherHistory = "";
    addAddressList.forEach(function (city) {
        weatherHistory += city + " ;;";
    })
    localStorage["searchHistory"] = weatherHistory.slice(0, -3);
}

function addHistoryAddressList(arrayCityName) {
    let addressList = `<ul> История поиска:`;
    arrayCityName.forEach(function (city) {
        addressList += `<li class="history">${city}</li>`
    });
    addressList += `</ul>`;

    history.innerHTML = addressList;
}