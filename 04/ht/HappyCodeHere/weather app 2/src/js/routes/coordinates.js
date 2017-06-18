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
        mapDiv.classList.add('map');

        document.querySelector('section.main').append(mapDiv);

        new Forecast('section.main .content', data).renderForecast();
        new Map(eventBus, '.map').renderMap([lat, lng]);

        const starIcon = document.createElement('div');
        starIcon.classList.add('star');

        document.querySelector('section.main').append(starIcon);

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
