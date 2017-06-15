
import Map from '../components/Map';

export const coordinates = {
  name: 'coordinates',
  match: 'coordinates',
  onEnter: ({ lat, lng }, eventBus) => {

    fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=en&units=si`)
      .then(response => response.json())
      .then(data => {

      })
      .catch(error => {
        console.log(error);
      })


    eventBus.on('favorites:is-active');
    eventBus.trigger('coordinates:changed');

    // - получить координаты,
    // - отрисовать карту,
    const map = new Map();
    map.renderMap();
    // - загрузить и отрисовать прогноз погоды
    // - подписаться на `favorites:is-active` // определять должна ли гореть звездочка
    // - сгенерировать`coordinates:changed`,
    // - подписаться на клики по звездочке // добавлять или удалять избранное `favorites:add`/ `favorites:remove`

    // - подписаться на изменения на карте (и изменять hash)
  },
}


//
// function renderMainInformation(cityData, cityName) {
//
//   const title = document.querySelector('section.main h2');
//   title.innerHTML = cityName;
//
//   // icons
//   const skycons = new Skycons({"color": "#e6a831"});
//   skycons.add(document.querySelector('section.main .forecast-icon'), cityData.currently.icon);
//   skycons.play();
//
//   const temperature = document.querySelector('.forecast-info span.temperature');
//   temperature.innerHTML = `Temperature: ${cityData.currently.temperature.toFixed(1)}°C`;
//
//   const humidity = document.querySelector('section.main span.humidity');
//   humidity.innerHTML = `Humidity: ${cityData.currently.humidity}%`;
//
//   const windSpeed = document.querySelector('section.main span.wind-speed');
//   windSpeed.innerHTML = `Wind speed: ${cityData.currently.windSpeed}m/s`;
//
//   const summary = document.querySelector('.summary p');
//   summary.innerHTML = cityData.currently.summary;
// }
