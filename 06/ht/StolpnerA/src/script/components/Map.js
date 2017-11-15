class Map {
  constructor() {
    this.map = {};
    this.mySetCenter = this.mySetCenter.bind(this);
  }

  renderMap(coordinates) {
    let divApp = document.querySelector("#app");
    if (divApp.innerHTML !== "") {
      this.mySetCenter(coordinates);
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
        center: [
          eval(coordinates.latitude || coordinates.lat),
          eval(coordinates.longitude || coordinates.lng)
        ],
        zoom: 13
      });

      let showCenter = () => {
        let arrCentr = this.map.getCenter();
        window.location.hash = `coordinates/latitude=${arrCentr[0]}&longitude=${arrCentr[1]}`;
      };
      this.map.events.add("actionend", showCenter);
    });
  }

  mySetCenter(coordinates) {
    console.log(document.querySelector("#map"));
    this.map.setCenter([
      eval(coordinates.latitude || coordinates.lat),
      eval(coordinates.longitude || coordinates.lng)
    ]);
  }
}

export default Map;
