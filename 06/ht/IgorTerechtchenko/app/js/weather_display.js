export default function WeatherDisplay(el) {
  this.element = el;
  this.wrapper = document.createElement('div');
  this.wrapper.className = 'weatherDisplayWrapper';
}

WeatherDisplay.prototype = {
  render: function() {
    this.wrapper.innerHTML = '<h2>Weather</h2><br>';
    this.element.appendChild(this.wrapper); 
    this.weather = document.createElement('div');
    this.weather.className = 'weather';
    this.wrapper.appendChild(this.weather);
  },
  updateWeather: function(weather) {
    this.weather.innerHTML = weather.summary + '<br>' 
                           + weather.temperature + '<br>' 
                           + 'Humidity: ' + weather.humidity + '<br>'
                           + 'Wind Speed: ' + weather.windSpeed + '<br>';
  },
}
