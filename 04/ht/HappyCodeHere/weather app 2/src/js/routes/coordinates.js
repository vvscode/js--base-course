import { getUrlHashParams } from '../utils/helpers';

import Forecast from '../components/Forecast';
import Star from '../components/Star';
import Map from '../components/Map';

export const coordinates = {
  name: 'coordinates',
  match: (coordinates) => coordinates.substring(0, 11) === 'coordinates',
  onEnter: (url, eventBus) => {

    const { lat, lng } = getUrlHashParams();

    fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=en&units=si`)
      .then(response => response.json())
      .then(data => {

        const mapDiv = document.createElement('div');

        const starDiv = document.createElement('div');
        starDiv.classList.add('star');

        mapDiv.classList.add('map');
        // mapDiv.innerHTML = '<div class="col-md-9 map"></div><div class="col-md-3 star"></div>'


        document.querySelector('section.main').append(starDiv, mapDiv);

        new Forecast('section.main .content', data).renderForecast();

        if (!document.querySelector('#map')) {
          new Map(eventBus, '.map').renderMap([lat, lng]);
        }

        new Star(eventBus, '.star').renderStar();
        console.dir(mapDiv);

      })
      .catch(error => {
        console.log(error);
      })

    // eventBus.on('favorites:is-active');
    // eventBus.trigger('coordinates:changed');

    // - подписаться на `favorites:is-active` // определять должна ли гореть звездочка
    // - сгенерировать`coordinates:changed`,
    // - подписаться на клики по звездочке // добавлять или удалять избранное `favorites:add`/ `favorites:remove`

    // - подписаться на изменения на карте (и изменять hash)
  },

  onLeave() {
  }
}
