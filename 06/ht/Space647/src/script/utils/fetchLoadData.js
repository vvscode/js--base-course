class FeatchLoadData{
    constructor(){}
    takeCoordinatsCityFetch(city,googleKey) {
          return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleKey}`)
                .then(response => response.json())
        };
    takeWeatherCityFetch(location,darkSkyKey) {
         return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${location}?lang=ru&units=si`)
                .then(response => response.json())
    }
}
export default FeatchLoadData;