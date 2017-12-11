const DARK_SKY_API_KEY = "0af54334380529c3e76f2c4a7d343181";

class Weather {
  getWeather(coordinates, typeQuery) {
    if (typeQuery === "fetch") {
      this.getWeatherByFetch(coordinates);
    } else if (typeQuery === "xhr") {
      this.getWeatherByXhr(coordinates);      
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

  getWeatherByXhr(coordinates) {
    let that = this;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${coordinates.latitude ||
      coordinates.lat},${coordinates.longitude ||
      coordinates.lng}?lang=ru&units=si`, true);
      xhr.send();

      xhr.onload = xhr.onerror = function () {
        if (this.status !== 200) console.log('error:  ' + this.status);
        var data = JSON.parse(this.response);
        that.renderWeather(JSON.parse(data.body).currently)
      }
    })
  }
}

export default Weather;
