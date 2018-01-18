import YandexFunction from './yandexMap';
import GoogleFunction from './googleMap';
import ListComponent from './listComponent';
import DarkSky from './darkSky';
import EventBus from './eventBus';

let options = { request: "fetch" };

var historyHtml = document.getElementById("history");
var favoritesHtml = document.getElementById("favorites");
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var weatherHtml = document.getElementById("weather");

var eventBus = new EventBus();
var yandexMap = new YandexFunction(eventBus, 'favoritesList');
var googleMap = new GoogleFunction(eventBus);
let historyList = new ListComponent(false, 5, "historyList", false, historyHtml);
let favoritesList = new ListComponent(true, 100, "favoritesList", true, favoritesHtml, eventBus);
let darkSky = new DarkSky(weatherHtml);

subscribeToChangeRequest();
//перенести в ListComponent
historyHtml.addEventListener('click', (ev) => onClickElementInList(historyList, ev));
//перенести в listComponent
favoritesHtml.addEventListener('click', (ev) => {
    if (ev.target.matches('a') && ev.target.innerHTML === '[x]') {
        var city = favoritesList.findElement(ev.target.parentNode.firstChild.innerHTML);
        favoritesList.removeElement(city.name);
        favoritesList.redraw();
        yandexMap.removePlacemark(city);
    }
});
//перенести в ListComponent
favoritesHtml.addEventListener('click', (ev) => onClickElementInList(favoritesList, ev));

function onClickElementInList(list, ev) {
    if (ev.target.matches('a') && ev.target.innerHTML !== '[x]') {
        var city = list.findElement(ev.target.innerHTML);
        yandexMap.moveToCity(city.lat, city.lng)
        darkSky.getForecastBySelectedRequest(options.request, city.lat, city.lng)
            .then(response => darkSky.fillHtml(response));
    }
};
//создать элемент searchBtn и убрать туда все,
// что касается поиска города, а затем ипортировать. 
//Общаться через eventBus
searchBtn.addEventListener("click", searchAction);
searchInput.addEventListener("keydown", function (ev) {
    if (ev.keyCode === 13) {
        searchAction();
    }
});

function searchAction() {
    if (searchInput.value != "") {
        let city = { name: 'default', lat: 0, lng: 0 };
        googleMap.getCoordsByName(searchInput.value)
            .then(coords => {
                city.name = searchInput.value;
                city.lat = coords['lat'];
                city.lng = coords['lng'];
                searchInput.value = '';
                yandexMap.moveToCity(city.lat, city.lng);
                historyList.addElement(city);
                historyList.redraw();
            })
            .then(p => darkSky.getForecastBySelectedRequest(options.request, city.lat, city.lng))
            .then(response => darkSky.fillHtml(response))
            .catch(err => function () {
                alert('error city');
                searchInput.value = '';
            });
    }
};

function subscribeToChangeRequest() {
    var button = document.querySelector('.btn-group');
    button.addEventListener('click', function (ev) {
        options.request = document.querySelector('input[name="options_request"]:checked').value;
    });
}

















