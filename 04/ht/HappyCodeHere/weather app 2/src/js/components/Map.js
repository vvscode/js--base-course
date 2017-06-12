
class Map {
  constructor(eventBus, element, ymaps) {
    this.eventBus = eventBus;
    this.element = element;
    this.ymaps = ymaps;
  }

  renderMap() {
    this.ymaps.ready(init);
    var myMap;

    function init() {
      myMap = new this.ymaps.Map("map", {
          center: [55.76, 37.64],
          zoom: 7
      });
    }
  }
}

export default Map;
