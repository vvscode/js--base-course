'use strict';
// Модуль отвечает за вывод в DOM
(function() {
  let yaMap;

    ymaps.ready(init);

  if(true){

      let lat = 50;
      let lng = 30;

  }



  newEventBus.on('showWeatherCity', (el)=>{
    console.log('showWeatherCity');
    showWeather (el)
  });

  let info = document.querySelector('#info');

  function init (lat, lng) {
    yaMap = new ymaps.Map('map', {
      center: [lat, lng],
        zoom: 11,
        controls: ['zoomControl', 'typeSelector']
    });

    newEventBus.trigger('showMap',yaMap.getCenter()); //показать погоду стартовой страницы

    newEventBus.on('showCity', (lat, lng)=>{
      yaMap.setCenter([lat, lng]);
    });

    newEventBus.on('addInFavorites', ()=>{
      newEventBus.trigger('getCentralYandexMap', yaMap.getCenter())
    });

    // завершение действия с картой
    yaMap.events.add('actionend', ()=>{
      newEventBus.trigger('showMap',yaMap.getCenter());
    });
  }

  function showWeather (el) {
    console.log(1);
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
