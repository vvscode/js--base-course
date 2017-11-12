class Map {
  constructor() {
    this.map = {};
  }

  renderMap(coordinates) {
    document.querySelector("#app").innerHTML = `<div id='map'></div>`;
    this.getMap(coordinates);
  }

  getMap(coordinates) {
    ymaps.ready(() => {
      this.map = new ymaps.Map("map", {
        center: [eval(coordinates.latitude), eval(coordinates.longitude)],
        zoom: 15
      });

      let showCenter = () => {
        let arrCentr = this.map.getCenter();
        // this.getWeather(arrCentr[0], arrCentr[1]);
      };
      this.map.events.add("actionend", showCenter);
    });
  }
}

export default Map;
