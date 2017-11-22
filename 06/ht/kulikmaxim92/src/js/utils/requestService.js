function RequestService(options) {
    this.options = options;
}

RequestService.prototype.getUserLocation = function () {
    var userInfoUrl = 'https://api.userinfo.io/userinfos';

    return createRequest(userInfoUrl, this.options.requestType)
        .then((data) => ({ lat: data.position.latitude, lng: data.position.longitude }));
}

RequestService.prototype.getObjectLocationByAddress = function (address) {
    var GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`;

    return createRequest(url, this.options.requestType)
        .then((data) => ({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
            address: getAddress(data)
        }));
}

RequestService.prototype.getObjectNameByLocation = function (lat, lng) {
    var GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

    return createRequest(url, this.options.requestType)
        .then((data) => ({
            lat: lat,
            lng: lng,
            address: getAddress(data)
        }));
}

RequestService.prototype.getForecastWeatherByLocation = function (lat, lng) {
    var DARKSKY_API_KEY = 'd113af5f82393ef553f48314ae9f42e8';
    var darkskyUrl = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}?exclude=daily,minutely,hourly,flags&lang=ru&units=si`;
    var proxyUrl = `https://cors-anywhere.herokuapp.com/${darkskyUrl}`;

    return createRequest(proxyUrl, this.options.requestType)
        .then((data) => {
            return data.currently;
        });
}

function getAddress(googleResponseData) {
    return googleResponseData.results.length ? googleResponseData.results[0].formatted_address : 'unknown';
}

function createRequest(url, type) {
    if (type === 'fetch') {
        return fetch(url)
            .then((request) => request.json());
    }

    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => xhr.status === 200 ? resolve(JSON.parse(xhr.response)) : reject();
        xhr.onerror = () => reject();

        xhr.open('GET', url, true);
        xhr.send();
    });
}

export default RequestService;