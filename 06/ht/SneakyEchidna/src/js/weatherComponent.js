import * as service from './services';
class WeatherComponent {
  constructor(element, eventBus) {
    this.element = element;
    this.eventBus = eventBus;
    this.weather = document.createElement('ul');
    this.weather.id = 'weather';
    this.element.appendChild(this.weather);
    this.eventBus.on('map:centerChange', (coordinates) =>
      this.drawWeatherReport(coordinates)
    );
  }
  parseWeather(data, element) {
    let node;
    if (this.weather.hasChildNodes) {
      this.weather.innerHTML = '';
    }
    for (let key of Object.keys(data)) {
      node = document.createElement('li');
      node.innerText = key + ': ' + data[key];
      this.weather.appendChild(node);
    }

    // humidity: data.humidity,
    // pressure: data.pressure,
    // summary: data.summary,
    // temperature: data.temperature,
    // wind speed: data.windSpeed,
  }
  drawWeatherReport(coordinates) {
    service.getForecastByLatLng(coordinates).then((a) => this.parseWeather(a));
  }
}
export { WeatherComponent };
