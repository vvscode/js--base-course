import { getUserCoordinates, changeHashByMapState } from './services';
import { debounce } from './utils';
/**
 *
 */
class YandexMap {
  /**
   *
   * @param {string} elementId
   * @argument {number} lat
   * @argument {number} lng
   * @argument {lat, lng} coordinates
   */
  constructor(elementId, ymaps, eventBus, coordinates) {
    this.ymaps = ymaps;
    this.eventBus = eventBus;
    this.elementId = elementId;
    this.center = [];
    this.coordinates = coordinates;
    this.setCenter(this.coordinates);
    this.ymaps.ready(() => this.drawMap());
  }
  drawMap() {
    this.map = new this.ymaps.Map(this.elementId, {
      center: this.center,
      zoom: 7,
    });
    this.eventBus.trigger('map:loaded');
    this.eventBus.trigger('map:centerChange', this.coordinates);
    this.addHanders();
  }
  addHanders() {
    this.map.events.add(
      'boundschange',
      debounce((e) => {
        this.eventBus.trigger('map:centerChange', e.get('newCenter'));
        changeHashByMapState(e.get('newCenter'));
      }, 400)
    );
    this.eventBus.on('map:centerMoved', (coordinates) => {
      this.moveCenter(coordinates);
    });
  }
  setCenter(coordinates) {
    this.center = coordinates;
  }
  moveCenter(coordinates) {
    this.map.panTo(coordinates, { flying: 'true' });
  }
  returnCenter() {
    return this.map.getCenter();
  }
}

export { YandexMap };
