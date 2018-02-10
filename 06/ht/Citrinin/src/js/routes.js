import ListComponent from './components/listComponent';
import GoogleMap from './components/googleSearch';
import YandexMap from './components/yandexMap';
import WeatherForecast from './components/weatherForecast';
import EventBus from './utils/eventBus';
import weatherForecast from './components/weatherForecast';
import userLocation from './utils/userLocation';
import request from './utils/request';
import CityInput from './components/searchComponent';

var radio = document.querySelector('.myradio');
radio.addEventListener('click', ev => {
    request.type = document.querySelector('input[name="request__option"]:checked').value;
})

let eventBus;
let googleMap;
let yandexMap;
let favorites;
let history;
let weather;
let cityInput;

let mainHtml = document.querySelector('#map');
let weatherHtml = document.querySelector('#weather');

let routes = [{
        match: '',
        onEnter: () => {
            userLocation
                .then((position) => {
                    window.location.hash = `center=${position.latitude},${position.longitude}`
                });
        }
    },
    {
        match: /city=(.+)/,
        onEnter: (city) => {
            if (!checkResources()) {
                init(city);
                history.addItem(decodeURI(city));
                googleMap.getLatLng(city).then(data => {

                    window.location.hash = `center=${data['lat']},${data['lng']}`;
                })
            } else {
                history.addItem(decodeURI(city));
                googleMap.getLatLng(city)
                    .then((data) => {
                        yandexMap.moveTo(data['lat'], data['lng']);
                    });

            }

        }
    }, {

        match: /^([+|-]?\d*\.?\d+)\,([+|-]?\d*\.?\d+)/,
        onEnter: (coord) => {

            if (!checkResources()) {
                init(...coord);
            }

            googleMap.getPlaceName(...coord).then(
                cityName => weather.getForecastByLatLng(...coord, cityName)
            ).catch(err => weather.getForecastByLatLng(...coord, 'Unknown place'))

        }
    }, {
        match: /center=([+|-]?\d*\.?\d+)\,([+|-]?\d*\.?\d+)/,
        onBeforeEnter: (coord) => {
            if (checkResources()) {
                yandexMap.moveTo(...coord)
            } else {
                init(...coord);
                googleMap.getPlaceName(...coord).then(
                    cityName => weather.getForecastByLatLng(...coord, cityName)
                ).catch(err => weather.getForecastByLatLng(...coord, 'Unknown place'))
            }
        }
    },

    {
        match: 'author',
        onEnter: () => {
            clearResources();
            weatherHtml.hidden = 'true';
            document.querySelector('.active').className = '';
            document.querySelector('[href="#author"]').parentElement.className = 'active';
            mainHtml.innerHTML = "<div class='about'><h2>Author - <a href='https://github.com/Citrinin'>Kate Kuzkina</a></h2></div>";
        }
    }, {
        match: 'about',
        onEnter: () => {
            clearResources();
            weatherHtml.hidden = 'true';
            document.querySelector('.active').className = '';
            document.querySelector('[href="#about"]').parentElement.className = 'active';
            mainHtml.innerHTML = "<div class='about'><h2>Wezzard</h2><h4>Wezzard is the weather site with daily forecast, search history and favorite places</h4></div>";
        }
    }

];

function checkResources() {
    return history && googleMap && yandexMap && weather ? true : false;
}

function clearResources() {

    eventBus = null;
    googleMap = null;
    yandexMap = null;
    favorites = null;
    history = null;
    weather = null;
    cityInput = null;

}

function init(lat, lng) {
    weatherHtml.removeAttribute('hidden');
    mainHtml.innerHTML = '';
    document.querySelector('.active').className = '';
    document.querySelector('li [href="#"]').parentElement.className = 'active';
    eventBus = new EventBus();
    googleMap = new GoogleMap(eventBus);
    if (Number.isNaN(+lat)) {
        googleMap.getLatLng(lat)
            .then((data) => {
                yandexMap = new YandexMap(eventBus, data['lat'], data['lng'], 'Favorites');
            })
    } else {
        yandexMap = new YandexMap(eventBus, lat, lng, 'Favorites');
    }


    favorites = new ListComponent(true, 0, 'Favorites', document.querySelector('.favorites__list'), eventBus);
    history = new ListComponent(false, 5, 'History', document.querySelector('.history__list'));
    weather = new WeatherForecast(document.querySelector('.weather__forecast'), eventBus);
    cityInput = new CityInput(document.querySelector('.input-group'), eventBus);


    eventBus.on('search:city', (city) => {
        window.location.hash = `city=${city}`;
    });

    eventBus.on('map:moved', (lat, lng) => {

        window.location.hash = `${lat},${lng}`;
    });
}

export default routes;