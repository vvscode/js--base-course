import debounce from '../utils/debounce';
import iStorage from '../utils/lsStorage';

function evHandler(ev) {
    var coords = myMap.getCenter();
    this.eventBus.trigger('map:moved', coords[0], coords[1]);
}

var myMap;
var placemarks = {};

class YandexMap {
    constructor(eventBus, lat, lng, storageName) {
        this.startLat = lat;
        this.startLng = lng;
        this.eventBus = eventBus;
        this.storageName = storageName;
        this.init();
    };
    moveTo(lat, lng) {
        myMap.panTo([+lat, +lng], { duration: 2000 });
    };
    init() {
        ymaps.ready(() => {
            this.createMap([this.startLat, this.startLng]);

            iStorage.getData(this.storageName).then(data => {
                var items = JSON.parse(data) || {};
                for (let key in items) {
                    let myPlacemark = new ymaps.Placemark([items[key]['lat'], items[key]['lng']], {}, {
                        preset: 'islands#yellowGlyphIcon',
                        iconGlyph: 'star'
                    });
                    placemarks[`${items[key]['lat']},${ items[key]['lng']}`] = myPlacemark;
                    myMap.geoObjects.add(myPlacemark);
                }

            })

            this.eventBus.on('list:addFav', (coords) => {
                let myPlacemark = new ymaps.Placemark([coords['lat'], coords['lng']], {}, {
                    preset: 'islands#yellowGlyphIcon',
                    iconGlyph: 'star'
                });
                placemarks[`${coords['lat']},${coords['lng']}`] = myPlacemark;
                myMap.geoObjects.add(myPlacemark);
            })

            this.eventBus.on('list:removeFav', (coords) => {
                myMap.geoObjects.remove(placemarks[`${coords['lat']},${coords['lng']}`]);
                delete placemarks[`${coords['lat']},${coords['lng']}`];
            })
        });

    };
    createMap(coords) {

        myMap = new ymaps.Map('map', {
            center: [coords[0], coords[1]],
            zoom: 12,
            controls: ['zoomControl']
        }, {
            suppressMapOpenBlock: true
        });

        myMap.events.add('click', (e) => {

            var coords = e.get('coords');
            var obj = {
                lat: coords[0],
                lng: coords[1]
            };
            this.eventBus.trigger('map:clicked', obj);
        });

        myMap.events.add('actionend', debounce(evHandler, 700).bind(this))
    };
};

export default YandexMap;