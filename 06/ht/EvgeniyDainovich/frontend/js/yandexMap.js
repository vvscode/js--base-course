let map;

function yandexMap(eventBus, storageName) {
    this.eventBus = eventBus;
    this.storageName = storageName;
    this.placemarkList = [];
    this.init();

};

yandexMap.prototype.moveToCity = function (lat, lng) {
    map.panTo([+lat, +lng], { flying: true })
};
yandexMap.prototype.removePlacemark = function (city) {
    for (let i = 0; i < this.placemarkList.length; i++) {
        if (this.placemarkList[i].geometry._coordinates[0] === city.lat && this.placemarkList[i].geometry._coordinates[1] === city.lng) {
            map.geoObjects.remove(this.placemarkList[i]);
            this.placemarkList.splice(i, 1);
            break;
        }
    }
};
yandexMap.prototype.init = function () {
    ymaps.ready(() => {
        map = new ymaps.Map("map", {
            center: [53.31, 28.62],
            zoom: 8,
            controls: ['zoomControl']
        });
        map.events.add('click', (e) => {
            var coords = e.get('coords');
            this.eventBus.trigger('citySearchByCoords', ...coords);
        });
        this.eventBus.on('goggle:cityIsFound', (city, lat, lng) => {
            var cityname = prompt("Название метки", city);
            if (cityname) {
                var newPlace = new ymaps.Placemark([lat, lng], {
                    iconContent: (cityname)
                }, {
                        preset: 'islands#blackStretchyIcon'
                    })
                map.geoObjects.add(newPlace);
                this.placemarkList.push(newPlace);
                this.eventBus.trigger('map:clicked', cityname, lat, lng);
            }
        })
        var storage = localStorage.getItem(this.storageName);
        var cities = JSON.parse(storage) || [];
        for (var i = 0; i < cities.length; i++) {
            var newPlace = new ymaps.Placemark([cities[i].lat, cities[i].lng], {
                iconContent: (cities[i].name)
            }, {
                    preset: 'islands#blackStretchyIcon'
                })
            this.placemarkList.push(newPlace);
            map.geoObjects.add(newPlace);
        }
    });
};

export default yandexMap;