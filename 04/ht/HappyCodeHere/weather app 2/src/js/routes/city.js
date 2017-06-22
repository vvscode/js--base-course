const GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';


export const city = {
  name: 'city',
  match: /city=(.+)/,
  onEnter: (url, eventBus) => {
    const city = url.split('=')[1];

    const contentBlock = document.querySelector('section.main .content');
    contentBlock.classList.remove('col-md-12');
    contentBlock.classList.add('col-md-offset-2', 'col-md-8');
    contentBlock.innerHTML = `
      <h2>Loading information about your city...</h2>
    `;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        contentBlock.innerHTML += `
          <p>Almost ready...</p>
        `;
        if (data.results.length === 0) throw new Error("We can't find your city");
        const formattedAddress = data.results[0].formatted_address;
        const { lat, lng } = data.results[0].geometry.location;

        eventBus.trigger('history:add', formattedAddress);
        window.location.hash = `coordinates?lat=${lat}&lng=${lng}`;
      })
      .catch(error => {
        contentBlock.innerHTML = `
          <h2>Sorry, we have some error :(</h2>
          <p class="error">${error}</p>
        `;
      })
  },
  onLeave: () => {
    // document.querySelector('section.main .content').innerHTML = '';
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
