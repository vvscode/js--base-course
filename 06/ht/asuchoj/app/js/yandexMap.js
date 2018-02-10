(function() {
    'use strict';
    let yaMap;
    ymaps.ready(init);

    newEventBus.on('showWeather', (el)=>{
        showWeather (el)
    });

    function init () {
        yaMap = new ymaps.Map('map', {
            center: [53.905,27.562],
            zoom: 11,
            controls: ['zoomControl', 'typeSelector']
        });

        newEventBus.on('showCenterMap', (lat, lng)=>{
            setCenterMaps(lat,lng);
        });

        newEventBus.on('addInFavorites', ()=>{
            console.log(yaMap.getCenter());
            newEventBus.trigger('getCentralYandexMap', yaMap.getCenter());
        });

        newEventBus.trigger('mapUploaded');

        yaMap.events.add('actionend', ()=>{
            yaMap.getCenter();
            location.hash = '#city/' + yaMap.getCenter();
        });

        yaMap.events.add('dblclick', function (e) {
            console.log(e.get('coords'));
            newEventBus.trigger('getCentralYandexMap', e.get('coords') );
        });
    }

    function showWeather (el) {
        let temperature = '<p> Температура: ' + roundValue ( Math.round(( el.apparentTemperature)) ) + ' &#8451 </p>';
        let pressure = '<p> Давление: ' + roundValue ( el.pressure ) + ' гПа </p>';
        let humidity = '<p> Влажность: ' + roundValue ( el.humidity * 100 ) + ' % </p>';
        let windSpeed = '<p> Скорость ветра: ' + roundValue ( el.windSpeed) + ' м/с </p>';
        let precipProbability = '<p> Вероятность осадков: ' + el.precipProbability + '</p>';
        let cloudCover = '<p> Облачность: ' + el.cloudCover + '</p>';
        let summary = '<p> Сводка: ' + el.summary + '</p>';
        let i = document.querySelector('.weather');
        i.innerHTML = summary + temperature + pressure + humidity + windSpeed + precipProbability + cloudCover;
    }

    function setCenterMaps(lat,lng) {
        yaMap.setCenter([lat, lng]);
    }

    function roundValue (el) {
        return Math.round(el)
    }

})();
