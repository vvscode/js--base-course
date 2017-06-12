
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
