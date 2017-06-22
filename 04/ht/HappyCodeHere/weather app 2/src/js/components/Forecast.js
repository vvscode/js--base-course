import Skycons from 'skycons';

class Forecast {
  constructor(element, cityData) {
    this.element = element;
    this.cityData = cityData;
  }

  renderForecast() {
    const forecastDiv = document.querySelector(this.element);

    forecastDiv.outerHTML = `
      <div class="forecast-block">
        <h2>${this.cityData.timezone}</h2>
        <div class="row">
          <div class="col-md-6">
            <canvas class="forecast-icon" width="128" height="128"></canvas>
          </div>
          <div class="col-md-6 forecast-info">
            <span class="temperature">Temperature: ${this.cityData.currently.temperature.toFixed(1)}°C</span>
            <span class="humidity">Humidity: ${this.cityData.currently.humidity}%</span>
            <span class="wind-speed">Wind speed: ${this.cityData.currently.windSpeed}m/s</span>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-offset-3 col-lg-6 summary">
            <p>${this.cityData.currently.summary}</p>
          </div>
        </div>
      </div>
    `

    const skycons = new (new Skycons({}))({"color": "#e6a831"})
    skycons.add(document.querySelector('section.main .forecast-icon'), this.cityData.currently.icon);
    skycons.play();
  }
}

export default Forecast;
