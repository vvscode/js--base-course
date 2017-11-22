var  WeatherService = function(){

}

WeatherService.prototype.getLatLng  = function(){
    let GOOGLE_API_KEY = 'AIzaSyCToEbN4Wor4usGmdgNy8T96Cuen_vPCmQ';
    let getLatLng  = (addr) => fetch(`http://cors-proxy.htmldriven.com/?url=https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`) //https://crossorigin.me
        .then((resp) => {
            var respJson = resp.json();
            return respJson;
        })
        .then((data) => {
            var geoObject = JSON.parse(data.body);
            var locationCoordinates = geoObject.results[0].geometry.location;
            return locationCoordinates;
        }).catch(function(){
            console.log('error occurred during location retrieve')
        });
    return getLatLng;
}


WeatherService.prototype.getLatLngForCurrLocation = function(){
    let getLatLng  = () => fetch(`https://api.userinfo.io/userinfos`) //https://crossorigin.me
        .then((resp) => {
            var respJson = resp.json();
            return respJson;
        })
        .then((data) => {
            var locationCoordinates = {lng: data.position.longitude, lat: data.position.latitude};
            return locationCoordinates;
        }).catch(function(){
            console.log('error occurred during location retrieve')
        });
    return getLatLng;
}

WeatherService.prototype.getForecastByLatLng  = function(){
    let getForecastByLatLng =  (lat, lng) => fetch(`http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/${lat},${lng}?lang=ru&units=si`)
        .then((resp) => {
            return resp.json();
        });
    return getForecastByLatLng;
}

WeatherService.prototype.getForecastByAddress  = function(str){
    var getLatLng = this.getLatLng();
    var getForecastByLatLng = this.getForecastByLatLng();

    let getForecastByAddress = (str) => getLatLng(str)
        .then(({lat, lng}) => getForecastByLatLng(lat, lng))
        .catch((e) => {
            //  здесь можно обработать ошибки, например
        });

    return getForecastByAddress;
}

WeatherService.prototype.getForecastByCoordinates = function(lat, lng){
    return this.getForecastByLatLng(lat, lng);
}










