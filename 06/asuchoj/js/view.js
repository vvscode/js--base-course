'use strict';
// Модуль отвечает за вывод в DOM
(function() {
    let yaMap;
    ymaps.ready(init);

    newEventBus.on('Отрисовать_погоду', (el)=>{
        showWeather (el)
    });

    function init () {
        yaMap = new ymaps.Map('map', {
            center: [53.905,27.562],
            zoom: 11,
            controls: ['zoomControl', 'typeSelector']
        });

        yaMap.events.add('actionend', ()=>{
            yaMap.getCenter();
            location.hash = '#city/' + yaMap.getCenter();
        });
        newEventBus.on('показать_центер_карты', (lat, lng)=>{
            setCenterMaps(lat,lng);
        });

        newEventBus.trigger('прогрузилась_карта');

        newEventBus.on('addInFavorites', ()=>{
            newEventBus.trigger('getCentralYandexMap', yaMap.getCenter());
        });

        yaMap.events.add('dblclick', function (e) {
            newEventBus.trigger('getCentralYandexMap', e.get('coords') );
        });

    }

    function setCenterMaps(lat,lng) {
        yaMap.setCenter([lat, lng]);
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
    function roundValue (el) {
        return Math.round(el)
    }
})();
