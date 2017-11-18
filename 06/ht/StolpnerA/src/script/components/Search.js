const GOOGLE_API_KEY = "AIzaSyDC0-aOiRRUiTgOJD7zHA3ClOcvyT_DAcM";

class Search {
  getCoordinates(country, typeQuery) {
    if (typeQuery === "fetch") {
      return this.getCoordinatesByFetch(country);
    } else if (typeQuery === "xhr") {
      return this.getCoordinatesByXhr(country);
    }
  }

  getCoordinatesByFetch(country) {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${GOOGLE_API_KEY}`
    )
      .then(res => res.json())
      .then(data => data.results[0].geometry.location);
  }

  getCoordinatesByXhr(country) {
    let that = this;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${GOOGLE_API_KEY}`,
        true
      );
      xhr.send();

      xhr.onload = xhr.onerror = function() {
        if (this.status !== 200) console.log("error:  " + this.status);
        let data = JSON.parse(this.response);
        return resolve(data.results[0].geometry.location);
      };
    });
  }
}

export default Search;
