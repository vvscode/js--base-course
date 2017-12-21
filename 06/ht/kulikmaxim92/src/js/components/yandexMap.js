import {debounce, setHashByMapState} from '../utils/utils';

var map = Symbol('map');
function YandexMap(options, ymaps, eventBus, requestService) {
    this.options = options;
    this.ymaps = ymaps;
    this.eventBus = eventBus;
    this.requestService = requestService;

    this.ymaps.ready(() => this.init());
}

YandexMap.prototype.init = function () {
    this[map] = new this.ymaps.Map(this.options.container, {
        center: this.options.center,
        zoom: this.options.zoom,
        mapType: this.options.mapType,
        controls: this.options.controls,
    });

    this.subscribeToChangeMapCenter();
    this.subscribeToMapClick();

    this.eventBus.on('search:objectLocationLoaded', ({lat, lng}) => this.changeMapCenter(lat, lng));

    this.eventBus.on('list:elementClick', ({lat, lng}) => this.changeMapCenter(lat, lng));
}

YandexMap.prototype.changeMapCenter = function (lat, lng) {
    this[map].panTo([lat, lng], { flying: true, duration: 300 });
}

YandexMap.prototype.subscribeToMapClick = function(){
    this[map].events.add('click', (ev) => {
        var location = ev.get('coords');
        this[map].balloon.open(location, "Added to Favorites");

        this.requestService.getObjectNameByLocation(location[0], location[1])
            .then((data) => this.eventBus.trigger('yandexMap:click', data))
            .catch();
    });
}

YandexMap.prototype.subscribeToChangeMapCenter = function(){
    var debouncedSetLocationHash = debounce(() => {
        setHashByMapState({
            mapType: this[map].getType().split('#')[1],
            center: this[map].getCenter(),
            zoom: this[map].getZoom(),
        });
    }, 200);

    this[map].events.add(['boundschange', 'typechange'], () => debouncedSetLocationHash());
}

export default YandexMap;