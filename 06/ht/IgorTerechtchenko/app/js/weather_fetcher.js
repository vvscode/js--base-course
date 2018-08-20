export default function WeatherFetcher(bus, key, method='fetch') {
  this.bus = bus;
  this.key = key;
  this.method = method;
}

WeatherFetcher.prototype = {
  fetchWeather: function(coords) {
    if(this.method === 'fetch') {
    var requestURL = `https://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${this.key}/${coords.lat},${coords.lng}?lang=en&units=si`
    return fetch(requestURL).
      then(result => result.json()).
      then(data => {
        return JSON.parse(data.body);
      }).
      then(dataObj => {
        return dataObj.currently; 
      });
    } else if(this.method === 'xhr') {
      
    }
  },
}
