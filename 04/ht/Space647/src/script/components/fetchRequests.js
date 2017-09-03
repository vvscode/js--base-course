class fetchRequests {
  constructor() {
    this.GOOGLE_KEY = `AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY`;
    this.DARK_SKY_KEY = "2de010dcb0ebbb2d6031a1d3d61bf0b0";
  }
  determinationOfCoordinatesByIp() {
    return fetch("https://api.userinfo.io/userinfos").then(response =>
      response.json()
    );
  }
  takeCoordinatesCityFetch(city = "минск") {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${this
        .GOOGLE_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        return this.coordinatsCity(data, city);
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
  takeWeatherCityFetch(location) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${this
        .DARK_SKY_KEY}/${location}?lang=ru&units=si`
    )
      .then(response => response.json())
      .then(data => this.createObjCurrentlyWether(data));
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
export default fetchRequests;
