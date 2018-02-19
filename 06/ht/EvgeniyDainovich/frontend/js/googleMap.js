let GOOGLE_API_KEY = 'AIzaSyAvzU7deehZHaZpq8vQWjxH8-a0HHa0Lsk';
function GoogleMap(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on("citySearchByCoords", (lat, lng) => {
        this.getCityNameByCoords(lat, lng)
            .then(city => this.eventBus.trigger('goggle:cityIsFound', city, lat, lng));
    })
};

GoogleMap.prototype.getCoordsByName = function (addr) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`)
        .then((req) => req.json())
        .then((data) => data.results[0].geometry.location);
};
GoogleMap.prototype.getCityNameByCoords = function (lat, lng) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`)
        .then((req) => req.json())
        .then((data) => {
            return data.results[1].formatted_address
        });
};

export default GoogleMap;