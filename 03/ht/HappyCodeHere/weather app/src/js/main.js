
let isFetch = true;
let searchHistory = [];

changeCurrentSchene('welcome');

function changeCurrentSchene(schene) {
  const active = document.querySelector('.active');
  active.classList.remove('active');

  switch (schene) {
    case 'welcome':
      const welcome = document.querySelector('.welcome-block');
      welcome.classList.add('active');
      break;

    case 'forecast':
      const forecast = document.querySelector('.forecast-block');
      forecast.classList.add('active');
      break;

    case 'error':
      const error = document.querySelector('.error-block');
      error.classList.add('active');
      break;

    default:

  }
}

handleDocumentLoad();


const tougle = document.querySelector('.switcher input');
tougle.addEventListener('change', () => {
  const { checked } = event.target;
  const requestType = document.querySelector('.switcher span');

  if (checked) {
    requestType.innerHTML = 'Fetch';
  } else {
    requestType.innerHTML = 'XHR';
  }
})

const buttonSearch = document.querySelector('header button');
buttonSearch.addEventListener('click', () => {
  const input = document.querySelector('header .search input');
  const value = input.value;
  loadData(value);
  window.location.hash = value;
});

const inputSearch = document.querySelector('header .search input');
inputSearch.addEventListener('submit', loadData);
inputSearch.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const input = document.querySelector('header .search input');
    const value = input.value;
    loadData(value);
    window.location.hash = value;
  }
});


const ul = document.querySelector('.history ul');

ul.addEventListener('click', () => {
  if (!event.target.matches('li')) return;

  const inputSearch = document.querySelector('header .search input');
  const value = event.target.innerHTML;

  inputSearch.value = value;
  window.location.hash = value;

  loadData(value);
});

function handleDocumentLoad() {
  const { hash } = window.location;
  if (hash) {
    const inputSearch = document.querySelector('header .search input');
    inputSearch.value = hash.substring(1);
    loadData(hash.substring(1));
  }
  loadHistoryFromStorage(localStorage);
}

function loadData(city) {
  if (isFetch) {
    getForecastFetch(city);
  } else {
    // getForecastXHR(city);
  }
}

function getForecastFetch(city) {
  return new Promise((resolve, reject) => {

    const GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.results.length === 0) throw new Error(data.status);
        const { lat, lng } = data.results[0].geometry.location;
        city = data.results[0].formatted_address;
        return fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=en&units=si`);
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        renderMainInformation(data, city);


        // maybe for better UI
        setTimeout(() => {
          changeCurrentSchene('forecast');
          saveCityToHistory(city);
          renderSearchHistory(searchHistory);
        }, 100);

      })
      .catch(error => {
        handleApiError(error);
      })
  })
}

// function getForecastXHR(url) {
//
//   return new Promise(function(resolve, reject) {
//
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//
//     xhr.onload = function() {
//       if (this.status == 200) {
//         resolve(this.response);
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
//
// }

// function getForecastFetch2(url) {
//   return fetch(url)
//     .then(response)
// }


function handleApiError(error) {
  const err = document.querySelector('.error-block');
  err.innerHTML += error;
  changeCurrentSchene('error');
}

function renderMainInformation(cityData, cityName) {

  const title = document.querySelector('section.main h2');
  title.innerHTML = cityName;

  // icons
  const skycons = new Skycons({"color": "#e6a831"});
  skycons.add(document.querySelector('section.main .forecast-icon'), cityData.currently.icon);
  skycons.play();

  const temperature = document.querySelector('.forecast-info span.temperature');
  temperature.innerHTML = `Temperature: ${cityData.currently.temperature.toFixed(1)}°C`;

  const humidity = document.querySelector('section.main span.humidity');
  humidity.innerHTML = `Humidity: ${cityData.currently.humidity}%`;

  const windSpeed = document.querySelector('section.main span.wind-speed');
  windSpeed.innerHTML = `Wind speed: ${cityData.currently.windSpeed}m/s`;

  const summary = document.querySelector('.summary p');
  summary.innerHTML = cityData.currently.summary;
}


function renderSearchHistory(history) {
  const ul = document.querySelector('section.history ul');
  ul.innerHTML = '';

  for (var i = 0; i < history.length; i++) {
    ul.innerHTML += `<li class="list-group-item">${history[i]}</li>`;
  }
}

function saveCityToHistory(city) {
  if (searchHistory[0] === city) return;
  if (searchHistory.indexOf(city) > 0) {
     searchHistory.splice(searchHistory.indexOf(city), 1);
  }
  if (searchHistory.length > 4) {
    searchHistory.pop();
  }
  searchHistory.unshift(city);

  saveHistoryToStorage(localStorage, searchHistory);
}


function loadHistoryFromStorage(storage) {
  const forecast = storage.getItem('forecast');
  searchHistory = JSON.parse(forecast) || [];
}

function saveHistoryToStorage(storage, history) {
  storage.setItem('forecast', JSON.stringify(history));
}
