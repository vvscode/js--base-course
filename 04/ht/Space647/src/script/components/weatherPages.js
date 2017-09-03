import fetchRequests from "./fetchRequests";
import database from "./db";
class weatherPages {
  constructor() {
    this.requestFetch = new fetchRequests();
    this.db = new database();
  }
  doneWeatherPageToWork() {
    debugger;
    Promise.resolve()
      .then(() => this.takeCityName())
      .then(city => this.chekUrlForCity(city))
      .then(data => this.changeUrl(data))
      .then(city => this.requestFetch.takeCoordinatesCityFetch(city))
      .then(location => this.requestFetch.takeWeatherCityFetch(location))
      .then(cityCurrentWeather => this.renderingWeather(cityCurrentWeather));
  }
  takeCityName() {
    return new Promise((resolve, reject) => {
      let urlCity, city;
      city = document.querySelector(".searchText").value;
      if (city) {
        resolve(city);
        return;
      } else {
        urlCity = window.location.hash;
        city = urlCity.slice(1);
        resolve(city);
      }
    });
  }

  chekUrlForCity(city) {
    return new Promise((resolve, reject) => {
      let curentUrl,
        urlCity,
        arr = [];
      curentUrl = window.location.hash;
      urlCity = curentUrl.slice(1);
      if (urlCity == city) {
        arr.push(true, city);
        resolve(arr);
      }
      arr.push(false, city);
      resolve(arr);
    });
  }
  changeUrl(data) {
    if (data[0]) return data[1];
    location.hash = data[1];
  }
  enterButtonHandlerForSentCity() {
    return new Promise((resolve, reject) => {
      let CodeEnterButton = 13;
      document.querySelector(".searchText").addEventListener("keypress", e => {
        let key = e.which || e.keyCode;
        if (key === CodeEnterButton) {
          e.preventDefault();
          resolve(this.doneWeatherPageToWork());
        }
      });
    });
  }
  clickHandlerForSentCity() {
    return new Promise((resolve, reject) => {
      document.querySelector(".search").addEventListener("click", () => {
        resolve(this.doneWeatherPageToWork());
      });
    });
  }

  renderingWeather(cityCurrentWeather) {
    return new Promise((resolve, reject) => {
      let placeRender = document.querySelector(".workPlace");
      placeRender.innerHTML = `<div class="icon"> <canvas id="WebIcon" width="150" height="150"></canvas> </div>
                                 <div>
                                 <span>Температура ${cityCurrentWeather.temperature}&deg;</span> <br>
                                 <span>Описание ${cityCurrentWeather.summary}</span> <br>
                                 <span>Влажность ${cityCurrentWeather.humidity}</span> <br>
                                 <span>скорость ветра ${cityCurrentWeather.windSpeed}</span>
                                </div>`;
      this.webIcons(cityCurrentWeather.icon);
      resolve();
    });
  }
  webIcons(icon) {
    icon = String(icon);
    var icons = new Skycons({ color: "black" });
    switch (icon) {
      case "clear-day":
        icons.set("WebIcon", Skycons.CLEAR_DAY);
        break;
      case "clear-night":
        icons.set("WebIcon", Skycons.CLEAR_NIGHT);
        break;
      case "partly-cloudy-day":
        icons.set("WebIcon", Skycons.PARTLY_CLOUDY_DAY);
        break;
      case "partly-cloudy-night":
        icons.set("WebIcon", Skycons.PARTLY_CLOUDY_NIGHT);
        break;
      case "cloudy":
        icons.set("WebIcon", Skycons.CLOUDY);
        break;
      case "rain":
        icons.set("WebIcon", Skycons.RAIN);
        break;
      case "sleet":
        icons.set("WebIcon", Skycons.SLEET);
        break;
      case "snow":
        icons.set("WebIcon", Skycons.SNOW);
        break;
      case "wind":
        icons.set("WebIcon", Skycons.WIND);
        break;
      case "fog":
        icons.set("WebIcon", Skycons.FOG);
        break;
    }
    icons.play();
  }
}
export default weatherPages;
