import { getUrlHashParams } from '../utils/helpers';

import Forecast from '../components/Forecast';
import Star from '../components/Star';
import Map from '../components/Map';

export const coordinates = {
  name: 'coordinates',
  match: (coordinates) => coordinates.substring(0, 11) === 'coordinates',
  onEnter: (url, eventBus) => {

    const { lat, lng } = getUrlHashParams();
    const contentBlock = document.querySelector('section.main .content');

    fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=en&units=si`)
      .then(response => response.json())
      .then(data => {
        if (contentBlock.classList.contains('col-md-8')) {
          contentBlock.innerHTML = '';
        }
        contentBlock.classList.remove('col-md-offset-2', 'col-md-8');
        contentBlock.classList.add('col-md-12');

        const mapDiv = document.createElement('div');
        mapDiv.classList.add('map');

        const starDiv = document.createElement('div');
        starDiv.classList.add('star');

        // mapDiv.innerHTML = '<div class="col-md-9 map"></div><div class="col-md-3 star"></div>'

        // if (!document.querySelector('.forecast-block')) {
        //   new Map(eventBus, '.map').renderMap([lat, lng]);
        // }

        if (!document.querySelector('section.main .content .forecast-block')) {
          const forecastDiv = document.createElement('div');
          forecastDiv.classList.add('forecast-block');
          contentBlock.append(forecastDiv);
        }
        new Forecast('section.main .content .forecast-block', data).renderForecast();

        contentBlock.append(starDiv, mapDiv);


        // eventBus.trigger('coordinates:changed', {lat, lng});

        if (!document.querySelector('#map')) {
          new Map(eventBus, '.map').renderMap([lat, lng]);
        }

        // if (!document.querySelector('.star')) {
          new Star(eventBus, '.star').renderStar();
        // }

        eventBus.trigger('coordinates:changed', {lat, lng});

      })
      .catch(error => {
        contentBlock.innerHTML = `
          <h2>Sorry, we have some error :(</h2>
          <p class="error">${error}</p>
        `;
      })
  },

  onLeave() {
  }
}
