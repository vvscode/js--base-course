import Weather from "../components/Weather";
import Map from "../components/Map";

const coordinates = {
  name: "coordinates",
  match: coordinates => coordinates.substring(0, 11) === "coordinates",
  onEnter: () => {
    let hash = location.hash.split("/")[1].split("&");
    let coordinates = {};
    let query = document.getElementsByName('typeQuery');    
    for (var i = 0; i < query.length; i++) {
      if(query[i].checked) {
        query = query[i].value
        break;
      }
    }
    hash.map(item => {
      let items = item.split("=");
      coordinates[items[0]] = items[1];
    });
    new Map().renderMap(coordinates);
    new Weather().getWeather(coordinates, query);
  }
};

export { coordinates };
