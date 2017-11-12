import Weather from "../components/Weather";
import Map from "../components/Map";

const coordinates = {
  name: "coordinates",
  match: coordinates => coordinates.substring(0, 11) === "coordinates",
  onEnter: () => {
    let hash = location.hash.split("/")[1].split("&");
    let coordinates = {};
    hash.map(item => {
      let items = item.split("=");
      coordinates[items[0]] = items[1];
    });
    // new Weather().getWeather(coordinates, "fetch");\
    new Map().renderMap(coordinates);
  }
};

export { coordinates };
