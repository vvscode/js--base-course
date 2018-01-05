let favorites = document.querySelector("#favorites");

function yandexBalloon(e) {
    if (!myMap.balloon.isOpen()) {
        var coords = e.get('coords');
        getFavoriteCityName(coords);
    }
    else {
        myMap.balloon.close();
    }
}

function getFavoriteCityName(coords) {
    let cityName = getCityName(getLatlng(coords[0], coords[1]));
    cityName
        .then((data) => data.results[1].formatted_address)
        .then((cityName) => {
            myMap.balloon.open(coords, {
                contentBody: `${cityName} добавлен в избранное`,
                contentFooter: '<sup>Щелкните еще раз</sup>'
            });
            return cityName;
        })
        .then((cityName) => addCityToFavorite(cityName));
}

function addCityToFavorite(cityName) {
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
    addFavotiteCityInLocalStorage(arrayCityName);
    addFavoritesAddressList(arrayCityName);
    favorites.addEventListener("click", deleteFavorite);
}

function addFavotiteCityInLocalStorage(arrayCityName) {
    let favoriteCity = "";
    arrayCityName.forEach(function (city) {
        if (city) {
            favoriteCity += city + " ;;";
        }
    })
    localStorage["favoriteCity"] = favoriteCity.slice(0, -3);
}

function addFavoritesAddressList(arrayCityName) {
    let addressList = `<ul>Избранное:`;
    arrayCityName.forEach(function (city, index) {
        addressList += `<li class="favorites">${city}
<span class="deleteFavorite" data-index="${index}">×</span>
</li>`;
    });
    addressList += `</ul>`;

    favorites.innerHTML = addressList;
}

function deleteFavorite(event) {
    let target = event.target;
    let buttonDeleteFavorite = target.matches(".deleteFavorite") && target.closest(".deleteFavorite");
    if (buttonDeleteFavorite) {
        let parentButton = buttonDeleteFavorite.parentElement;
        let dataTask = buttonDeleteFavorite.getAttribute("data-index");
        let cityName = localStorage['favoriteCity'];
        let arrayCityName = cityName.split(' ;;');
        arrayCityName.splice(dataTask, 1);
        addFavotiteCityInLocalStorage(arrayCityName);
        parentButton.remove();
    }
}