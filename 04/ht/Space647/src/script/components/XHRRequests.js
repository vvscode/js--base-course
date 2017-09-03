class XHRRequests {
  constructor() {
    this.GOOGLE_KEY = `AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY`;
    this.DARK_SKY_KEY = "2de010dcb0ebbb2d6031a1d3d61bf0b0";
  }
  takeCoordinatesCityXHR(city = "минск") {
    return new Promise((resolve, reject) => {
      let location,
        lat,
        lng,
        then = this;
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${this
          .GOOGLE_KEY}`,
        true
      );
      xhr.send();
      xhr.onload = xhr.onerror = function() {
        if (xhr.status !== 200) console.log("error:  " + xhr.status);
        var data = xhr.response;
        data = JSON.parse(data);
        resolve(then.coordinatsCity(data, city));
      };
    });
  }
  coordinatsCity(data, city) {
    let location, lat, lng;
    location = data.results[0].geometry.location;
    lat = location.lat;
    lng = location.lng;
    location = [lat, lng];
    return location;
  }
  takeWeatherCityXHR(location) {
    return new Promise((resolve, reject) => {
      let then = this;
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${this
          .DARK_SKY_KEY}/${location}?lang=ru&units=si`,
        true
      );
      xhr.send();
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = xhr.response;
          data = JSON.parse(data);
          resolve(then.createObjCurrentlyWether(data));
        } else {
          var error = new Error(xhr.statusText);
          error.code = xhr.status;
          reject(error);
        }
      };
      xhr.onerror = () => reject(new Error("Network Error"));
    });
  }
  createObjCurrentlyWether(data) {
    return {
      temperature: data.currently.temperature,
      humidity: data.currently.humidity,
      summary: data.currently.summary,
      windSpeed: data.currently.windSpeed,
      icon: data.currently.icon
    };
  }
}
export default XHRRequests;
