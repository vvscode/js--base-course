var lastSearchedCities;
try{
    lastSearchedCities = JSON.parse(localStorage.getItem('lastSearchedCities'));
}
catch(e){};

var MAX_HISTORY_LENGTH = 5;
function handleCity(city) {
    res = lastSearchedCities.indexOf(city);
    if (res >= 0) {
        lastSearchedCities.splice(res, 1);
    }
    lastSearchedCities.unshift(city);
    lastSearchedCities = lastSearchedCities.slice(0, MAX_HISTORY_LENGTH);
    localStorage.setItem('lastSearchedCities', JSON.stringify(lastSearchedCities));
    window.location.hash = city;
};

var googleKey = 'AIzaSyDYVJLYgfq13kghwkbxod5Eqx7RaBVCqT8';
var dqsb = document.querySelector.bind(document);
function showWeatherXHR(city) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleKey}`, true);
    xmlHttp.onload = function () {
        var data = JSON.parse(xmlHttp.responseText);
        if (data.status === 'OK') {
            var placeName = '';
            for (var i = 0; i < data.results[0].address_components.length; i++) {
                placeName = data.results[0].address_components[i].short_name + ' ' + placeName;
            }
            dqsb('#weather').innerHTML = placeName + ': <br /><br />';
            var {lat, lng} = data.results[0].geometry.location;
            var getWeather = new XMLHttpRequest();
            getWeather.open("GET", `https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`, true);
            getWeather.onload = function () {
                var data = JSON.parse(getWeather.responseText);
                dqsb('#weather').innerHTML += data.currently.summary + '<br />Температура, C: ' + data.currently.temperature +
                '<br />Скорость ветра, м/с: ' + data.currently.windSpeed + '<br />Влажность, %: ' + (data.currently.humidity * 100).toFixed();
            }
            getWeather.send();
        } else {
            dqsb('#weather').innerHTML = 'Введенное место не найдено';
        }
    }
    xmlHttp.send();
};

function showWeather(city) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleKey}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        var placeName = '';
        for (var i = 0; i < data.results[0].address_components.length; i++) {
            placeName = data.results[0].address_components[i].short_name + ' ' + placeName;
        }
        dqsb('#weather').innerHTML = placeName + ': <br /><br />';
        return data.results[0].geometry.location;
    })
    .then(function({lat, lng}) {
        fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            dqsb('#weather').innerHTML += data.currently.summary + '<br />Температура, C: ' + data.currently.temperature +
            '<br />Скорость ветра, м/с: ' + data.currently.windSpeed + '<br />Влажность, %: ' + (data.currently.humidity * 100).toFixed();
        });
    })
    .catch(function() {  
        dqsb('#weather').innerHTML = 'Введенное место не найдено';
    });
};

function showHistory(array) {
    dqsb('#history').innerHTML = '';
    var list = document.createElement('ul');
    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        var a = document.createElement("a");
        a.innerHTML = array[i];
        a.setAttribute('href', '#' + array[i]);
        item.appendChild(a);
        list.appendChild(item);
    }
    dqsb('#history').appendChild(list)
};

dqsb('#search').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var inputCity = ev.target.querySelector('input[name="city"]');
    if (inputCity.value.trim()) {
        handleCity(inputCity.value);
    }
    inputCity.value = '';
});

function last() {
    var cityName = window.location.hash.replace('#', '');
    if (cityName) {
        handleCity(cityName);
        var knopka = document.getElementsByName('knopka');
        var checkedRadio;
        for (var i = 0, length = knopka.length; i < length; i++) {
            if (knopka[i].checked) {
                checkedRadio = knopka[i].value;
                break;
            }
        }
        if (checkedRadio === 'fetch') {
            showWeather(cityName);
        } else {
            showWeatherXHR(cityName);
        }
    }
    showHistory(lastSearchedCities);
};

window.onhashchange = last;
last();