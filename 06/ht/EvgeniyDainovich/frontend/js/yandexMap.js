let map;
var counter = 0;
ymaps.ready(function () {
    map = new ymaps.Map("map", {
        center: [53.31, 28.62],
        zoom: 11,
        controls: ['zoomControl']
    });
    map.events.add('click', function (e) {
        var coords = e.get('coords');
        var newPlace = new ymaps.Placemark([coords[0].toPrecision(6), coords[1].toPrecision(6)], {
            iconContent: ('City' + counter)
        }, {
                preset: 'islands#blackStretchyIcon'
            })
        map.geoObjects.add(newPlace);
        counter++;
    })
}
);

function yandexMap() {
    this.moveToCity = function (lan, lng) {
        map.panTo([lan, lng], { flying: true })
    }
};


export default yandexMap;