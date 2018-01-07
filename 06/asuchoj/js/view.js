'use strict';
// Модуль отвечает за вывод в DOM
(function() {
    let yaMap;
    ymaps.ready(init);
    newEventBus.on('showWeatherCity', (el)=>{
        showWeather (el)
    });
    function init () {
        yaMap = new ymaps.Map('map', {
            center: [53.905,27.562],
            zoom: 11,
            controls: ['zoomControl', 'typeSelector']
        });

        yaMap.events.add('actionend', ()=>{
            console.log('1');
            /*location.hash = '#city/' + yaMap.getCenter();*/
        });

        newEventBus.on('addInFavorites', ()=>{
            newEventBus.trigger('getCentralYandexMap', yaMap.getCenter());
        });

        yaMap.events.add('dblclick', function (e) {
            newEventBus.trigger('getCentralYandexMap', e.get('coords') );
        });

        newEventBus.on('showCity', (lat, lng)=>{
            yaMap.setCenter([lat, lng]);
        });
    }

    function showWeather (el) {
        console.log('showWeather');
        let temperature = '<p> Температура: ' + Math.round(( el.temperature - 32 ) / 1.8) + ' &#8451 </p>';
        let pressure = '<p> Давление: ' + el.pressure + '</p>';
        let humidity = '<p> Влажность: ' + el.humidity + '</p>';
        let windSpeed = '<p> Скорость ветра: ' + el.windSpeed + '</p>';
        let precipProbability = '<p> Вероятность осадков: ' + el.precipProbability + '</p>';
        let cloudCover = '<p> Облачность: ' + el.cloudCover + '</p>';
        let summary = '<p> Сводка: ' + el.summary + '</p>';
        let i = document.querySelector('.weather');
        i.innerHTML = summary + temperature + pressure + humidity + windSpeed + precipProbability + cloudCover;
    }
})();
