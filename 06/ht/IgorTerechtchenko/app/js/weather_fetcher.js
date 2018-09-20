export default function WeatherFetcher(bus, key, method='fetch') {
  this.bus = bus;
  this.key = key;
  this.method = method;
}

WeatherFetcher.prototype = {
  fetchWeather: function(coords) {
    var requestURL = `https://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${this.key}/${coords.lat},${coords.lng}?lang=en&units=ca`
    if(this.method === 'fetch') {
      return fetch(requestURL).
        then(result => result.json()).
        then(data => {
          return JSON.parse(data.body);
        }).
        then(dataObj => {
          return dataObj.currently; 
        });
    } else if(this.method === 'xhr') {
      return new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', requestURL, true);
        xhr.onreadystatechange = function() {
          if (xhr.status != 200) {
            alert( xhr.status + ': ' + xhr.statusText );
          } else if (xhr.responseText !== '') {
            var responseText = JSON.parse(xhr.responseText);
            resolve(JSON.parse(responseText.body).currently);
          }
        }
        xhr.send();
      });
    }
  },
}
