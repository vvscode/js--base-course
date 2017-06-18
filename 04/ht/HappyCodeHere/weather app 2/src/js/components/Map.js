class Map {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;
  }

  renderMap(coords) {
    const map = document.querySelector(this.element);
    map.innerHTML = '<div id="map" style="width: 100%; height: 400px"></div>';

    window.ymaps.ready(init);
    var myMap;

    let self = this;

    function init() {
      myMap = new window.ymaps.Map("map", {
          center: coords,
          zoom: 7
      });

      myMap.events.add('boundschange', (event) => {
        let lat = event.originalEvent.newBounds[0][0];
        let lng = event.originalEvent.newBounds[0][1];
        self.eventBus.trigger('coordinates:changed', {lat,lng});
        window.location.hash = `coordinates?lat=${lat}&lng=${lng}`
      });
    }
  }
}

export default Map;
