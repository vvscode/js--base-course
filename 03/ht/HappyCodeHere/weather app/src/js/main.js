
let isFetch = true;
let searchHistory = [];

// window.addEventListener('onload', handleDocumentLoad);

const buttonSearch = document.querySelector('header button');
buttonSearch.addEventListener('click', () => {
  const input = document.querySelector('header input');
  const value = input.value;
  loadData(value, isFetch);
  input.value = '';
});

// keyup', function (e) {
//     if (e.keyCode == 13) {
//         // Do something
//     }
// });


const inputSearch = document.querySelector('header input');
inputSearch.addEventListener('submit', loadData);
inputSearch.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const input = document.querySelector('header input');
    const value = input.value;
    loadData(value, isFetch);
    input.value = '';
  }
});


const ul = document.querySelector('.history ul');

ul.addEventListener('click', () => {
  if (!event.target.matches('li')) return;
  // const input = document.querySelector('header input');
  const value = event.target.innerHTML;
  loadData(value, isFetch);
});


// ...addEventListener('change', handleTougleChange);
//
// function handleTougleChange(event) {
//   isFetch = event.target.value;
// }
//
// function handleDocumentLoad() {
//   if (hash) {
//     loadData(hash);
//   }
//   loadDataFromStorage(localStorage);
//   // и как то отрендерить данные
// }
//
// function loadDataFromStorage(storage) {
//   const forecast = storage.getItem('forecast');
//   // ???
//   searchHistory = forecast;
// }
//
function loadData(city, isFetch) {
  if (isFetch) {
    getForecastFetch(city);
  } else {
    // getForecastXHR(city);
  }
}
//
// handleLoadData(promise) {
//   promise
//     .then(data => renderMainInfo(data));
//     .catch(error => handleError);
// }

function getForecastFetch(city) {
  return new Promise((resolve, reject) => {


//     // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY
let GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';
// let getLatLng = (addr) => fetch(``)
//   .then((req) => req.json())
//   .then((data) => data.results[0].geometry.location);
//   /*  { lat: 53.890838, lng: 27.5372046 }  */

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`)
      .then(response => {
        return response.json();
      })

      .then(data => {
        // cords;
        // return data.cords;
        const { lat, lng } = data.results[0].geometry.location;
        city = data.results[0].formatted_address;
        console.log(lat, lng);
  //       let getForecastByLatLng = (lat, lng) => fetch(``)
  // .then((req) => req.json());
        return fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`);
      })
      .then(response => {
        console.log('here 1');
        return response.json();
      })
      .then(data => {
        console.log('here 2');
        console.log(data);

        renderMainInfo(data, city);
        saveCityToHistory(city);

        // return data[0];
      })
      .catch(error => {
        console.log(error);
        reject(error);
      })

  })
}


function renderMainInfo(obj, city) {

  const skycons = new Skycons({"color": "pink"});
  skycons.add(document.querySelector('section.main .forecast-icon'), obj.currently.icon);
  skycons.play();

  const temperature = document.querySelector('.forecast-info span.temperature');
  temperature.innerHTML = `Temperature: ${obj.currently.temperature.toFixed(1)}°C`;

  const summary = document.querySelector('.summary p');
  summary.innerHTML = obj.currently.summary;

  const currentCity = document.querySelector('section.main h2');
  currentCity.innerHTML = city;

  const humidity = document.querySelector('section.main span.humidity');
  humidity.innerHTML = `Humidity: ${obj.currently.humidity}%`;

  const windSpeed = document.querySelector('section.main span.wind-speed');
  windSpeed.innerHTML = `Wind speed: ${obj.currently.windSpeed}m/s`;



  console.log('here', obj);
  // document.querySelectorAll();
  // change data
}
//
// function handleError(error) {
//   document.querySelector('div with erro');
//   // show error;
// }
//
// function changeUrl(hash) {
//   pushState(hash);
// }
//
//

function saveCityToHistory(city) {
  if (searchHistory.length > 4) {
    searchHistory.pop();
  }
  searchHistory.unshift(city);

  console.log(searchHistory);

  renderSearchHistory(searchHistory);
}
//
function renderSearchHistory(history) {
  const ul = document.querySelector('section.history ul');
  ul.innerHTML = '';

  for (var i = 0; i < history.length; i++) {
    ul.innerHTML += `<li class="list-group-item">${history[i]}</li>`;
  }

  if (history.length === 0) {
    // Your history is empty;
  }
}
//
// saveCityToStorage(storage, history) {
//   localStorage.setItem('forecast', forecastHistory);
// }
