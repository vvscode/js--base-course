import { getUrlParams } from '../utils/helpers';


import Map from '../components/Map';
import History from '../components/History';
import Search from '../components/Search';
import Star from '../components/Star';

export const coordinates = {
  name: 'coordinates',
  match: (coordinates) => coordinates.substring(0, 11) === 'coordinates',
  onEnter: (url, eventBus) => {
    // http://localhost:9000/#coordinates?lat=53.90453979999999&lng=27.5615244
    let data = {};

    url.split('?')[1].split('&').map(item => {
      let items = item.split('=');
      data[items[0]] = items[1];
    })
    const { lat, lng } = data;



    fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=en&units=si`)
      .then(response => response.json())
      .then(data => {

        const map = new Map(eventBus, '.map');
        map.renderMap([lat, lng]);


        const star = new Star(eventBus, '.star');
        star.renderStar();



        const mainDiv = document.querySelector('section.main .row');
        let html = `
        <div class="col-md-offset-2 col-md-8 forecast-block">
          <h2></h2>
          <div class="row">
            <div class="col-md-6">
              <canvas class="forecast-icon" width="128" height="128"></canvas>
            </div>
            <div class="col-md-6 forecast-info">
              <span class="temperature"></span>
              <span class="humidity"></span>
              <span class="wind-speed"></span>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-offset-3 col-lg-6 summary">
              <p></p>
            </div>
          </div>
        </div>`
        mainDiv.innerHTML = html;

        console.log(data);

        renderMainInformation(data, data.timezone);





      })
      .catch(error => {
        console.log(error);
      })


    // eventBus.on('favorites:is-active');
    // eventBus.trigger('coordinates:changed');

    // - получить координаты,
    // - отрисовать карту,

    // const map = new Map();
    // map.renderMap();
    // - загрузить и отрисовать прогноз погоды

    // - подписаться на `favorites:is-active` // определять должна ли гореть звездочка
    // - сгенерировать`coordinates:changed`,
    // - подписаться на клики по звездочке // добавлять или удалять избранное `favorites:add`/ `favorites:remove`

    // - подписаться на изменения на карте (и изменять hash)


    function renderMainInformation(cityData, cityName) {

      const title = document.querySelector('section.main h2');
      title.innerHTML = cityName;

      // icons
      const skycons = new window.Skycons({"color": "#e6a831"});
      skycons.add(document.querySelector('section.main .forecast-icon'), cityData.currently.icon);
      skycons.play();

      const temperature = document.querySelector('.forecast-info span.temperature');
      temperature.innerHTML = `Temperature: ${cityData.currently.temperature.toFixed(1)}°C`;

      const humidity = document.querySelector('section.main span.humidity');
      humidity.innerHTML = `Humidity: ${cityData.currently.humidity}%`;

      const windSpeed = document.querySelector('section.main span.wind-speed');
      windSpeed.innerHTML = `Wind speed: ${cityData.currently.windSpeed}m/s`;

      const summary = document.querySelector('.summary p');
      summary.innerHTML = cityData.currently.summary;
    }
  },

  onLeave() {
    // const history = document.querySelector('.history');
    // history.innerHTML = '';
  }

}
