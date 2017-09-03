class mapYandex {
  // constructor() {}
  showMap(location) {
    ymaps.ready(init.bind(this));
    function init() {
      let myMap;
      myMap = new ymaps.Map(
        "map",
        {
          center: [53.902236, 27.56184], // Minsk
          zoom: 11,
          controls: [
            "zoomControl",
            "searchControl",
            "typeSelector",
            "geolocationControl"
          ]
        },
        {
          balloonMaxWidth: 150,
          searchControlProvider: "yandex#search"
        }
      );
      document.querySelector("#map").addEventListener("click", ev => {
        if (!ev.target.matches(".sendCoords")) return;
        if (myMap.balloon && myMap.balloon.onSendCoordsClick) {
          myMap.balloon.onSendCoordsClick();
        }
      });
      myMap.events.add("click", e => {
        if (!myMap.balloon.isOpen()) {
          let coords = e.get("coords");
          myMap.balloon.open(coords, {
            contentHeader: "Event",
            contentBody:
              "<p>Data to send.</p><p>This coordinates: " +
              [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(", ") +
              "</p>" +
              `<button class="sendCoords">Send this coordinates</button>`
          });
          myMap.balloon.onSendCoordsClick = () => this.sendMessage(coords);
        } else {
          myMap.balloon.close();
        }
      });
      myMap.events.add("contextmenu", function(e) {
        myMap.hint.open(e.get("coords"), "Someone right-clicked");
      });
      myMap.events.add("balloonopen", function(e) {
        myMap.hint.close();
      });
    }
    return location;
  }
}
export default mapYandex;
