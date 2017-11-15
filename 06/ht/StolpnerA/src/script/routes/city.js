import Search from "../components/Search";
import Map from "../components/Map";
import Weather from "../components/Weather";

const city = {
  name: "city",
  match: /city=(.+)/,
  onEnter: () => {
    let country = location.hash.slice(6);
    Promise.resolve()
      .then(() => new Search().getCoordinates(country, "fetch"))
      .then(
        coords =>
          (window.location.hash = `coordinates/latitude=${coords.lat}&longitude=${coords.lng}`)
      );
  }
};

export { city };
