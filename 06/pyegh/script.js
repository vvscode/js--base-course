







/*function getWeatherByAddress(addr) {

    let GOOGLE_API_KEY = 'AIzaSyAyF3_neS46cv1VQoXrX7rbIJNGfrf2P4U';
    let location = fetch(`http://cors-proxy.htmldriven.com/?url=https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`)
        .then((resp) => {
            var respJson = resp.json();
            return respJson;
        })
        .then((data) => {
            var geoObject = JSON.parse(data.body);
            var location = geoObject.results[0].geometry.location;
            return location;
        })
        .then((location) => {
            var lat = location.lat;
            var lng = location.lng;
            getWeatherForCoordinates(lat, lng);
        })
        .catch(error => {
            console.log(error);
        });
    return location;

}

function getWeatherForCoordinates(lat, lng) {
     return fetch(`http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/${lat},${lng}?lang=ru&units=si`)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            var data = JSON.parse(data.body);
        }).catch(error => {
            console.log(error);
        });
}*/