const DARK_SKY_API_KEY = "0af54334380529c3e76f2c4a7d343181";

class Weather {
  getWeather(coordinates, typeQuery) {
    if (typeQuery === "fetch") {
      this.getWeatherByFetch(coordinates);
    }
  }

  getWeatherByFetch(coordinates) {
    fetch(
      `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${coordinates.latitude ||
        coordinates.lat},${coordinates.longitude ||
        coordinates.lng}?lang=ru&units=si`
    )
      .then(res => res.json())
      .then(data => this.renderWeather(JSON.parse(data.body).currently));
  }

  renderWeather(dataWeather) {
    let divWeather = document.querySelector(".weather");
    divWeather.innerHTML = `${((dataWeather.temperature - 32) *
      (5 / 9)
    ).toFixed(2)}<br>`;
  }
}

export default Weather;
