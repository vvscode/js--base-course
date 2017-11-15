const GOOGLE_API_KEY = "AIzaSyDC0-aOiRRUiTgOJD7zHA3ClOcvyT_DAcM";

class Search {
  getCoordinates(country, typeQuery) {
    if (typeQuery === "fetch") {
      return this.getCoordinatesByFetch(country);
    }
  }

  getCoordinatesByFetch(country) {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${GOOGLE_API_KEY}`
    )
      .then(res => res.json())
      .then(data => data.results[0].geometry.location);
  }
}

export default Search;
