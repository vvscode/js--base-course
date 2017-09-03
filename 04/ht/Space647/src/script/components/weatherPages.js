import fetchRequests from "./fetchRequests";
import XHRRequests from "./XHRRequests";
import database from "./db";
import mapYandex from "./map";
class weatherPages {
  constructor() {
    this.requestFetch = new fetchRequests();
    this.requestXHR = new XHRRequests();
    this.db = new database();
    this.yandex = new mapYandex();
  }
  doneWeatherPageToWork() {
    Promise.resolve()
      .then(() => this.takeCityName())
      .then(city => this.chekUrlForCity(city))
      .then(data => this.changeUrl(data))
      .then(city => this.methodRequestsWeather(city))
      .then(cityCurrentWeather => this.renderingWeather(cityCurrentWeather))
      .then(() => this.drawingTheSearchList())
      .then(() => this.yandex.showMap());
  }
  methodRequestsWeather(city) {
    return new Promise((resolve, reject) => {
      let check = document.querySelector(".check");
      if (check.checked) {
        Promise.resolve()
          .then(city => this.db.setCityListToDB(city, "cityListSearch"))
          .then(city => this.requestFetch.takeCoordinatesCityFetch(city))
          .then(location =>
            resolve(this.requestFetch.takeWeatherCityFetch(location))
          );
      } else {
        Promise.resolve()
          .then(city => this.db.setCityListToDB(city, "cityListSearch"))
          .then(city => this.requestXHR.takeCoordinatesCityXHR(city))
          .then(location =>
            resolve(this.requestXHR.takeWeatherCityXHR(location))
          );
      }
    });
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
                                </div>
                                <div id="map" style="width: 600px; height: 400px"></div>`;
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
  drawingTheSearchList() {
    return new Promise((resolve, reject) => {
      let placeRender,
        listCity,
        arrCity = this.db.getCityListFromDB("cityListSearch");
      placeRender = document.querySelector(".searchList");
      listCity = arrCity
        .map(function(cityName) {
          return (listCity = `<li><a href="#${cityName}">${cityName}</a></li>`);
        })
        .join(" ");
      placeRender.innerHTML = listCity;
      resolve();
    });
  }
}
export default weatherPages;
