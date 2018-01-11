let GOOGLE_API_KEY = 'AIzaSyAvzU7deehZHaZpq8vQWjxH8-a0HHa0Lsk';
function GoogleMap() {
};

GoogleMap.prototype.getCoordsByName = function (addr) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`)
        .then((req) => req.json())
        .then((data) => data.results[0].geometry.location);
};
// GoogleMap.prototype.calculateCoordinates = function (input) {
//     return getCoordsByName(input)
//         .then(location => {
//             this.city.lat = location.lat;
//             this.city.lng = location.lng;
//             console.log(city.name + ": " + location.lat + "  " + location.lng);

//         })
//         .catch(err => console.log(err));
// };




export default GoogleMap;