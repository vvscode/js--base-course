import SearchCoords from "../components/SearchCoords";
import Map from "../components/Map";
import Weather from "../components/Weather";
import History from "../components/History";

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
    new SearchCoords()
      .getCoordinates(country, query)
      .then(
        coords =>
          (window.location.hash = `coordinates/latitude=${coords.lat}&longitude=${coords.lng}`)
      )
      .then(() => new History().addHistory(country));
  }
};

export { city };
