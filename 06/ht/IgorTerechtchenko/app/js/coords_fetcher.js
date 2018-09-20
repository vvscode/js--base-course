export default function CoordsFetcher(eventBus, key, method='fetch') {
  this.bus = eventBus;
  this.method = method;
  this.apiKey = key;
}

CoordsFetcher.prototype = {
  getCoords: function(address) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+this.apiKey;
    if(this.method === 'fetch') {
      return fetch(url)
      .then((req) => req.json())
      .then((data) => data.results[0].geometry.location);
    } else if(this.method === 'xhr') {
      return new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
          if (xhr.status != 200) {
            alert( xhr.status + ': ' + xhr.statusText );
          } else if (xhr.responseText !== '') {
            var responseText = JSON.parse(xhr.responseText);
            resolve(responseText.results[0].geometry.location);
          }
        }
        xhr.send();
      });
    }
  },
}
