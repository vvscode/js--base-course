export default function CoordsFetcher(eventBus, key, method='fetch') {
  this.bus = eventBus;
  this.method = method;
  this.apiKey = key;
}

CoordsFetcher.prototype = {
  getCoords: function(address) {
    if(this.method === 'fetch') {
      return fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+this.apiKey)
      .then((req) => req.json())
      .then((data) => data.results[0].geometry.location);
    } else if(this.method === 'xhr') {
      
    }
  },
}
