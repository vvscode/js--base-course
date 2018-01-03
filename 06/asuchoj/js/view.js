function View() {

  let that = this;

  this.init = function() {
    let yaMap = new ymaps.Map('map', {
      center: [53.90, 27.56], // Минск
      zoom: 10,
      controls: ['zoomControl', 'typeSelector']
    });

    let showCenter = () => {
      info.innerHTML = (info.innerHTML +'\n' + 'Center: ' + yaMap.getCenter().join(' - ')).trim();
      that.c = yaMap.getCenter();
    };

    that.k = function (f) {

      yaMap.events.add('actionend', f);
    }
    that.yaMap = yaMap;
  }

  this.addStateCenterMap = function () {
    return that.yaMap.getCenter();
  }

  this.showWeather = function (el) {
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

  this.setCenterMap = function (el, lat, lng) {
      el.setCenter([lat, lng]);
      this.showWeather(el);
  }
}
