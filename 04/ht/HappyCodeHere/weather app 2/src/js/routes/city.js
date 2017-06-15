const GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';


export const city = {
  name: 'city',
  match: /city=(.+)/,
  onEnter: (city, eventBus) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length === 0) throw new Error("Sorry, we can't find your city:(");
        const formattedAddress = data.results[0].formatted_address;
        const { lat, lng } = data.results[0].geometry.location;

        eventBus.on('history:add', formattedAddress);
        window.location.hash = `/coordinates?lat=${lat}&lng=${lng}`;
      })
      .catch(error => {
        console.log(error);
      })
  }
};



// function loadData(city) {
//   return isFetchRequest ? getForecastFetch(city) : getForecastXHR(city);
// }
//
// function getForecastXHR(city) {
//
//   return new Promise((resolve, reject) => {
//
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`, true);
//
//     xhr.onload = function() {
//       if (this.status == 200) {
//
//         const data = JSON.parse(this.response);
//         if (data.results.length === 0) throw new Error("Sorry, we can't find your city:(");
//         currentCity = data.results[0].formatted_address;
//         const { lat, lng } = data.results[0].geometry.location;
//
//         var xhr2 = new XMLHttpRequest();
//         xhr2.open('GET', `https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=en&units=si`, true);
//
//         xhr2.onload = function() {
//           if (this.status == 200) {
//             resolve(JSON.parse(this.response));
//           } else {
//             var error = new Error(this.statusText);
//             error.code = this.status;
//             reject(error);
//           }
//         };
//
//         xhr2.onerror = function() {
//           reject(new Error("Network Error"));
//         };
//
//         xhr2.send();
//
//       } else {
//         var error = new Error(this.statusText);
//         error.code = this.status;
//         reject(error);
//       }
//     };
//
//     xhr.onerror = function() {
//       reject(new Error("Network Error"));
//     };
//
//     xhr.send();
//   });
// }
