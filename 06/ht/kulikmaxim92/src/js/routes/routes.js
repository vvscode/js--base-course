import EventBus from '../utils/eventBus';
import RequestService from '../utils/requestService';
import YandexMap from '../components/yandexMap';
import List from '../components/list';
import Search from '../components/search';
import ForecastWeather from '../components/forecastWeather';
import {getMapStateFromHash, setHashByMapState} from '../utils/utils';
import localStorage from '../utils/localStorage';

var eventBus, search, forecastWeather, history, favorites, yandexMap;
var requestService = new RequestService({requestType: 'xhr'});

var content = document.getElementById('content');

var routes = [
    {
        name: 'index',
        match: '',
        onEnter: () => {
            requestService.getUserLocation()
                .then(({lat, lng}) => setHashByMapState({
                    mapType: 'map',
                    center: [lat, lng],
                    zoom: 7
                }))
        },
    },
    {
        name: 'about',
        match: '#about',
        onBeforeEnter: () => clearResources(),
        onEnter: () => content.innerHTML = '<div>О сайте: прогноз погоды</div><img src="img/photo.jpg" class="photo">',
    },
    {
        name: 'city',
        match: /city=(.+)/,
        onEnter: (city) => {
            requestService.getObjectLocationByAddress(city)
                .then(({lat, lng}) => {
                    var mapState = {
                        mapType: 'map',
                        center: [lat, lng],
                        zoom: 7
                    }

                    if (!yandexMap && !eventBus && !history && !favorites && !search && !forecastWeather) {
                        initComponents(mapState);
                        return;
                    }

                    yandexMap.changeMapCenter(mapState.center[0], mapState.center[1]);
                })
        },
    },
    {
        name: 'map',
        match: getMapStateFromHash,
        onEnter: (hashParams) => {
            if (!yandexMap && !eventBus && !history && !favorites && !search && !forecastWeather) {
                initComponents(hashParams);
            }
        } 
    },
]

function initComponents(hashParams) {
    content.innerHTML = '<div id="search"></div><hr><div id="map" class="mapContainer"></div><hr>' +
        '<div id="history" class="history"></div><div id="forecast" class="forecast"></div>' + 
        '<div id="favorites" class="favorites"></div>';

    eventBus = new EventBus();
    search = new Search({ container: "search" }, eventBus, requestService);
    forecastWeather = new ForecastWeather({ 
        container: "forecast",
        label: 'Погода',
    }, requestService);
    forecastWeather.getForecastWeather(hashParams.center[0], hashParams.center[1]);

    history = new List({
        container: 'history',
        label: 'История',
        capacity: 5,
        eventNameForAddElement: 'search:objectLocationLoaded'
    }, eventBus, localStorage);

    favorites = new List({
        container: 'favorites',
        label: 'Закладки',
        allowDeleteElements: true,
        eventNameForAddElement: 'yandexMap:click'
    }, eventBus, localStorage);

    yandexMap = new YandexMap({
        container: 'map',
        mapType: hashParams.mapType,
        center: hashParams.center,
        zoom: hashParams.zoom,
        controls: ['zoomControl', 'rulerControl', 'typeSelector']
    }, ymaps, eventBus, requestService);

}

function clearResources() {
    eventBus = null;
    search = null;
    forecastWeather = null;
    history = null;
    favorites = null;
    yandexMap = null;
}

export default routes;