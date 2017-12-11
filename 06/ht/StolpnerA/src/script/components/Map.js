import History from "./History";

let map;

class Map {
  renderMap(coordinates) {
    let divApp = document.querySelector("#app");
    let isMap = divApp.querySelector("#map");
    if (isMap) {
      this.setCenter(coordinates);
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
    this.showMap(coordinates);
    new History().renderHistory();
  }

  showMap(coordinates) {
    ymaps.ready(() => {
      map = new ymaps.Map("map", {
        center: [
          eval(coordinates.latitude || coordinates.lat),
          eval(coordinates.longitude || coordinates.lng)
        ],
        zoom: 10
      });

      let showCenter = () => {
        let arrCentr = map.getCenter();
        window.location.hash = `coordinates/latitude=${arrCentr[0]}&longitude=${arrCentr[1]}`;
      };
      map.events.add("actionend", showCenter);
    });
  }

  setCenter(coordinates) {
    map.setCenter([
      eval(coordinates.latitude || coordinates.lat),
      eval(coordinates.longitude || coordinates.lng)
    ]);
  }
}

export default Map;
