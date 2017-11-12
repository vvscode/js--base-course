const DARK_SKY_API_KEY = "0af54334380529c3e76f2c4a7d343181";

class Weather {
  getWeather(coordinates, typeQuery) {
    if (typeQuery === "fetch") {
      this.getWeatherByFetch(coordinates);
    }
  }

  getWeatherByFetch(coordinates) {
    fetch(
      `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${coordinates.latitude},${coordinates.longitude}?lang=ru&units=si`
    )
      .then(res => res.json())
      .then(data => console.log(JSON.parse(data.body)));
  }
}

export default Weather;
