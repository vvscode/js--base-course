import { getUserCoordinates } from './services';
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
  constructor(elementId, ymaps, coordinates, eventBus) {
    this.ymaps = ymaps;
    // this.map;
    this.eventBus = eventBus;
    this.elementId = elementId;
    this.center = {};
    this.setCenter(coordinates || null);
    this.ymaps.ready(() => this.drawMap());
    // console.log(this.map.getCenter());
    setTimeout(console.log, 5000, this.map.getCenter());
    // setTimeout(this.getCenter, 5000, [-56, 1], { duration: 2000 });
  }
  drawMap() {
    this.map = new this.ymaps.Map(this.elementId, {
      center: [this.center.lat, this.center.lng],
      zoom: 7,
    });
    console.log(this.map.getCenter());
    this.eventBus.on('changeCenter', (center) => this.map.panTo(center));
  }
  setCenter(coordinates) {
    if (!coordinates) {
      getUserCoordinates().then((a) => {
        this.center = a;
      });
    } else {
      this.center = coordinates;
    }
  }
  returnCenter() {
    return this.map.getCenter();
  }
}

export { YandexMap };
