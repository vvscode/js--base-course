import * as service from './services';
class WeatherComponent {
  constructor(element) {
    this.element = element;
    this.weather = document.createElement('ul');
    this.weather.id = 'weather';
    this.element.appendChild(this.weather);
  }
  parseWeather(data, element) {
    let node;
    for (let key of Object.keys(data)) {
      node = document.createElement('li');
      node.innerText = key + ': ' + data[key];
      this.weather.appendChild(node);
    }

    // humidity: data.humidity,
    // pressure: data.pressure,
    // summary: data.summary,
    // temperature: data.temperature,
    // windSpeed: data.windSpeed,
  }
  drawWeatherReport(coordinates) {
    console.log(coordinates);
    service.getForecastByLatLng(coordinates).then((a) => this.parseWeather(a));
  }
}
export { WeatherComponent };
