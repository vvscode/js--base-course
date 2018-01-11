import YandexFunction from './yandexMap';
import GoogleFunction from './googleMap';
import ListComponent from './listComponent';
import DarkSky from './darkSky';

let options = { request: "fetch" };

var historyHtml = document.getElementById("history");
var favoritesHtml = document.getElementById("favorites");
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var weatherHtml = document.getElementById("weather");

var yandexMap = new YandexFunction();
var googleMap = new GoogleFunction();
let historyList = new ListComponent(false, 5, "historyList", historyHtml);
let favoritesList = new ListComponent(true, 100, "favoritesList", favoritesHtml);
let darkSky = new DarkSky(weatherHtml);



handlerChangeRequest();

historyHtml.addEventListener('click', function (ev) {
    if (ev.target.matches('a')) {
        var cords = historyList.findElement(ev.target.innerHTML);
        yandexMap.moveToCity(cords[0], cords[1])
        getForecastBySelectedRequest(options.request, cords[0], cords[1])
            .then(response => darkSky.fillHtml(response));
    }
});
searchBtn.addEventListener("click", searchAction);
searchInput.addEventListener("keydown", function (ev) {
    if (ev.keyCode === 13) {
        searchAction();
    }
});
function searchAction() {
    if (searchInput.value != "") {
        let city = {
            name: 'default',
            lat: 0,
            lng: 0
        };
        googleMap.getCoordsByName(searchInput.value)
            .then(coords => {
                city.name = searchInput.value;
                city.lat = coords['lat'];
                city.lng = coords['lng'];
                searchInput.value = '';
                yandexMap.moveToCity(city.lat, city.lng);
                historyList.addElement(city);
                historyList.draw();
            })
            .then(p => getForecastBySelectedRequest(options.request, city.lat, city.lng))
            .then(response => darkSky.fillHtml(response))
            .catch(err => function () {
                alert('error city');
                searchInput.value = '';
            });
    }
};

function getForecastBySelectedRequest(request, lat, lng) {
    if (request === 'fetch') {
        return darkSky.getForecastByFetch(lat, lng)
    }
    else if (request === 'xhr') {
        return darkSky.getForecastByXhr(lat, lng)
    }
}

function handlerChangeRequest() {
    var button = document.querySelector('.btn-group');
    button.addEventListener('click', function (ev) {
        options.request = document.querySelector('input[name="options_request"]:checked').value;
    });



}

















