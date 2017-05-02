window.onload = onLoad()

function onLoad() {
  drawHistory()

  let city = window.location.hash.substr(1)

  document.getElementById('cityInput').value = city

  getCityWeather(city)
    .then((weather) => {
      addToHistory(city, weather)
      drawForecast(city, weather)
      drawHistory()
    })
}

function updateHash(city) {
  window.location.hash = '#' + city
}

function drawForecast(city, weather) {
  let forecast = document.getElementById('main')
  forecast.innerHTML = `${city} - ${weather.currently.summary}`
}

function drawHistory() {
  let history = document.getElementById('searchHistory')
  history.innerHTML = ''

  getHistory().map(({ city, weather }) => {
    let forecast = document.createElement('div')
    forecast.innerHTML = `${city} - ${weather.currently.summary}`

    history.appendChild(forecast)
  })
}

function getHistory() {
  return JSON.parse(localStorage.getItem('cities')) || []
}

function addToHistory(city, weather) {
  let cities = getHistory()
  let newCities = cities.slice()
  newCities.push({ city, weather })
  localStorage.setItem('cities', JSON.stringify(newCities))
}

function getCityWeather(city) {
  return getCityCoordinates(city)
    .then(({ lat, lng }) => fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`))
    .then((req) => req.json())
}

function getCityCoordinates(city) {
  let GOOGLE_API_KEY = `AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY`
  let requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`

  return fetch(requestUrl)
    .then((req) => req.json())
    .then((data) => data.results[0].geometry.location);
}

function getWeather() {
  let city = document.getElementById("cityInput").value
  getCityWeather(city)
    .then((weather) => {
      addToHistory(city, weather)
      updateHash(city)
      drawForecast(city, weather)
      drawHistory()
    })
}
