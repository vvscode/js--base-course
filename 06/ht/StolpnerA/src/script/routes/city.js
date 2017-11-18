import Search from "../components/Search";
import Map from "../components/Map";
import Weather from "../components/Weather";

const city = {
  name: "city",
  match: /city=(.+)/,
  onEnter: () => {
    let country = location.hash.slice(6);
    let query = document.getElementsByName("typeQuery");
    for (var i = 0; i < query.length; i++) {
      if (query[i].checked) {
        query = query[i].value;
        break;
      }
    }
    new Search().getCoordinates(country, query).then(coords => {
      console.log(coords);
      window.location.hash = `coordinates/latitude=${coords.lat}&longitude=${coords.lng}`;
    });
  }
};

export { city };
