class Map {
  constructor() {
    this.map = {};
  }

  renderMap(coordinates) {
    let divApp = document.querySelector("#app");
    if (divApp.innerHTML !== "") {
      return;
    }
    divApp.innerHTML = `
      <div id='map'></div>
      <div class="infoWeather">
        <div class="history"></div>
        <div class="weather"></div>
        <div class="favorites"></div>
      </div>
    `;
    this.getMap(coordinates);
  }

  getMap(coordinates) {
    ymaps.ready(() => {
      this.map = new ymaps.Map("map", {
        center: [eval(coordinates.latitude), eval(coordinates.longitude)],
        zoom: 13
      });

      let showCenter = () => {
        let arrCentr = this.map.getCenter();
        window.location.hash = `coordinates/latitude=${arrCentr[0]}&longitude=${arrCentr[1]}`;
      };
      this.map.events.add("actionend", showCenter);
    });
  }
}

export default Map;
