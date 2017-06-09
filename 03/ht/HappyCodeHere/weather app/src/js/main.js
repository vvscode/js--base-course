
let isFetchRequest = true;
let searchHistory = [];
let currentCity = '';

const GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';

window.addEventListener('load', () => {
  handleUrlChange();

  changeCurrentSchene('welcome');
  loadHistoryFromStorage(localStorage);
  renderSearchHistory(searchHistory);
});

window.addEventListener('hashchange', handleUrlChange);

document.querySelector('.switcher input').addEventListener('change', () => {
  const { checked } = event.target;
  const requestType = document.querySelector('.switcher span');

  if (checked) {
    isFetchRequest = true;
    requestType.innerHTML = 'Fetch';
  } else {
    isFetchRequest = false;
    requestType.innerHTML = 'XHR';
  }
})

document.querySelector('header form').addEventListener('submit', () => {
  event.preventDefault();
  const input = document.querySelector('header .search input');
  const value = input.value;
  if (value) {
    window.location.hash = value;
  }
});


function handleUrlChange() {
  const { hash } = window.location;
  if (hash) {
    const city = hash.substring(1);
    const inputSearch = document.querySelector('header .search input');
    inputSearch.value = city;
    handleRequest(loadData(city));
  }
}

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
  }
}

function loadData(city) {
  return isFetchRequest ? getForecastFetch(city) : getForecastXHR(city);
}

function getForecastFetch(city) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length === 0) throw new Error("Sorry, we can't find your city:(");
      currentCity = data.results[0].formatted_address;
      const { lat, lng } = data.results[0].geometry.location;
      return fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=en&units=si`);
    })
    .then(response => response.json())

}

function getForecastXHR(city) {

  return new Promise((resolve, reject) => {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`, true);

    xhr.onload = function() {
      if (this.status == 200) {

        const data = JSON.parse(this.response);
        if (data.results.length === 0) throw new Error("Sorry, we can't find your city:(");
        currentCity = data.results[0].formatted_address;
        const { lat, lng } = data.results[0].geometry.location;

        var xhr2 = new XMLHttpRequest();
        xhr2.open('GET', `https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=en&units=si`, true);

        xhr2.onload = function() {
          if (this.status == 200) {
            resolve(JSON.parse(this.response));
          } else {
            var error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };

        xhr2.onerror = function() {
          reject(new Error("Network Error"));
        };

        xhr2.send();

      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}

function handleRequest(promise) {
  promise
    .then(data => {
      renderMainInformation(data, currentCity);

      changeCurrentSchene('forecast');
      saveCityToHistory(currentCity);
      renderSearchHistory(searchHistory);

    })
    .catch(error => {
      handleApiError(error);
    })
}

function handleApiError(error) {
  const err = document.querySelector('.error-block p');
  err.innerHTML = error;
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
  const historyUl = document.querySelector('section.history ul');
  historyUl.innerHTML = '';

  for (var i = 0; i < history.length; i++) {
    historyUl.innerHTML += `<li class="list-group-item"><a href="#${history[i]}">${history[i]}</a></li>`;
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
