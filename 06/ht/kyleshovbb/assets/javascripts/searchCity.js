let searchInpute = document.querySelector("#search");
let yandexForm = document.querySelector("#yandexForm");

yandexForm.addEventListener("submit", addCityNameToHash)

function addCityNameToHash() {
    let searchCityName = searchCity || searchInpute.value;
    if (searchInpute.value) {
        window.location.hash = `/city/${searchInpute.value}/`;
        searchCity(null,searchInpute.value);
    }
}

function clickAtCityName(event) {
    let target = event.target;
    let targetCityList = target.matches(".favorites") && target.closest(".favorites") ||
        target.matches(".history") && target.closest(".history");
    if (targetCityList) {
        window.location.hash = `/city/${targetCityList.firstChild.data}/`;
        searchCity(event,targetCityList.firstChild.data);
    }
}

function searchCity(event,searchCity) {
    let getLocation = getCoords(searchCity);
    getLocation
        .then((data) => {
            addCityToHistory(data.results[0].formatted_address);
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
            drawYandexMap(event, arrCoords);
            getForecastByLatLng(event, latlng);
        });
}