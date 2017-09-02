import fetchRequests from "./fetchRequests";
class weatherPages {
  constructor() {
    this.requestFetch = new fetchRequests();
  }
  doneWeatherPageToWork() {
    Promise.resolve()
      .then((city = "минск") =>
        this.requestFetch.takeCoordinatesCityFetch(city)
      )
      .then(citiLocation =>
        this.requestFetch.takeWeatherCityFetch(citiLocation)
      )
      .then(cityCurrentWeather => this.renderingWeather(cityCurrentWeather));
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
