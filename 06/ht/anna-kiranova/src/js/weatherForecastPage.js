'use strict';

import weather from '../pages/weatherForecastPage.html';
document.getElementById('content').innerHTML += weather;

import hideAll from './hidePage';
import debounce from './debounce';
import { getHistory, addHistory } from './history';
import { addFavorite, getFavorites, removeFavorite } from './favorites';

let map;
let lastCity;
let points = [];

export default function showWeatherPage(city) {
    hideAll();
    let weatherPageContent = document.getElementById('weatherPageContent');
    let footer = document.getElementById('footer');
    footer.style.display = 'block';
    weatherPageContent.style.display = 'block';

    let firstStart = !map;

    if (!map) {
        map = new ymaps.Map('mapContent', {
            // London coordinates
            center: [51.50853, -0.12574],
            zoom: 9,
            controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
        });

        map.events.add(
            'boundschange',
            /* 600 - delay for getCenter, selected empirically
            when the map is loading or moving from city to city, it 3 times receives coordinates, 
            the delay gives the opportunity to take only the last coordinates, 
            and so to reduce the number of weather forecast requests */
            debounce(() => {
                weatherUpdate(map.getCenter());
            }, 600)
        );

        let favoriteButton = new ymaps.control.Button({
            data: {
                image: './icons/star.png',
                title: 'Click to add favorite'
            },
            options: {
                size: 'small',
                selectOnClick: false
            }
        });

        favoriteButton.events.add('click', clickFavoriteButton);

        map.controls.add(favoriteButton);
    }

    if (city) {
        getCityCoordinates(city);
    } else if (firstStart) {
        getUserCoordinates();
    }

    getHistory().then(showHistory);

    getFavorites().then((favorites) => {
        for (let i = 0; i < favorites.length; i++) {
            points.push(createPoint(favorites[i].name, favorites[i].lat_lon));
        }
        showFavorites(favorites);
    })
}

function clickFavoriteButton() {
    // ask name of new favorite place
    let name = prompt('Введите название места', lastCity);
    if (name) {
        name = name.trim();
    }
    if (!name) {
        return;
    }

    // get lat&lon of the map center
    let lat_lon = map.getCenter();

    addFavorite({lat_lon, name}).then((favorites) => {
        // create and put the point on map
        let p = createPoint(name, lat_lon);
        points.unshift(p);
        showFavorites(favorites);
    });
}

function getCityCoordinates(city) {
    return fetch(
        'https://maps.google.com/maps/api/geocode/json?address=' +
            encodeURIComponent(city) +
            '&key=AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY'
    )
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            alert('There are some problems with receiving coordinates!');
        })
        .then(function(cityCoordinates) {
            if (cityCoordinates.results.length === 0) {
                return;
            }
            var lat = cityCoordinates.results[0].geometry.location.lat;
            var lng = cityCoordinates.results[0].geometry.location.lng;
            changeMapPosition([lat, lng]);
            lastCity = city;
            addHistory(city).then(showHistory);
        })
        .catch(function(err) {
            alert('Not found this place on the Earth! ' + err);
        });
}

function getUserCoordinates() {
    let hdr = new Headers();
    hdr.append('Content-Type', 'application/json');
    hdr.append('Accept', 'application/json');
    let params = {
        method: 'GET',
        headers: hdr,
        mode: 'cors',
        cache: 'default'
    };
    fetch('https://ipinfo.io/?token=b06e0fc311d617', params)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            console.log('ip-api failure:', response);
            throw new Error('ip-api failure');
        })
        .then(function(userinfo) {
            let loc = userinfo.loc;
            let lat_lon = loc.split(',');
            changeMapPosition([+lat_lon[0], +lat_lon[1]]);
        });
}

function weatherUpdate(lat_lon) {
    document.getElementById('weather-target').innerHTML =
        '<img src="./icons/load.gif" width="300"></img>';
    if (document.getElementById('fetch').checked) {
        fetch(
            'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b5cc0ae068f1ee7c89f7deff0ae38728/' +
                lat_lon +
                '?lang=en&units=si'
        )
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function(weather) {
                showWheather(weather);
            })
            .catch(function(e) {
                document.getElementById('weather-target').innerHTML =
                    '<img src="./icons/sad.png" width="80"></img><br><p>We are really sorry - the forecast is unavailable right now...</p>';
                console.log(
                    'There are some problems with receiving weather! ' + e
                );
            });
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open(
            'GET',
            'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b5cc0ae068f1ee7c89f7deff0ae38728/' +
                lat_lon +
                '?lang=en&units=si',
            true
        );
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                document.getElementById('weather-target').innerHTML =
                    '<img src="./icons/sad.png" width="80"></img><br><p>We are really sorry - the forecast is unavailable right now...</p>';
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                try {
                    let weatherData = JSON.parse(xhr.responseText);
                    showWheather(weatherData);
                } catch (e) {
                    console.log('Attention! Incorrect answer ' + e.message);
                }
            }
        };
    }
}

function showWheather(weather) {
    let w = weather.currently;
    let temp = `<div class ="w"> Temperature: ${
        w.temperature
    } <img src="./icons/celsium.png" alt="C" width="15"></img></div>`;
    let sum = `<div class ="w"> Right now: ${w.summary} </div>`;
    let icon = `<img class ="w" src="./icons/${w.icon}.png" alt="${
        w.icon
    }" width="50" title="${w.icon}"></img>`;
    let press = `<div class ="w"> Pressure: ${w.pressure} hPa</div>`;
    let hum = `<div class ="w"> Humidity: ${parseInt(w.humidity * 100)} %</div>`;
    let wind = `<div class ="w"> Wind speed: ${w.windSpeed} m/s</div>`;
    document.getElementById('weather-target').innerHTML =
        temp + sum + icon + press + hum + wind;
}

function changeMapPosition(lat_lon) {
    map.panTo(lat_lon, {
        /* Опции перемещения:
                разрешить уменьшать и затем увеличивать зум
                карты при перемещении между точками */
        flying: true
    });
}

function showFavorites(favorites) {
    document.getElementById('favorites-target').innerHTML = '';
    for (let i = 0; i < favorites.length; i++) {
        let div = document.createElement('div');
        div.className = 'aItems';
        let a = document.createElement('a');
        a.href = '#';
        a.onclick = function() {
            changeMapPosition(favorites[i].lat_lon);
            return false;
        };
        a.innerText = favorites[i].name;
        let x = document.createElement('a');
        x.innerHTML = '<img src="./icons/delete.png" alt="x" width="15"></img>';
        x.href = '#';
        x.onclick = function() {
            if (!confirm('Are you sure?')) { return false };
            map.geoObjects.remove(points[i]);
            points.splice(i, 1);
            removeFavorite(i).then(showFavorites);
            return false;
        };
        div.appendChild(a);
        div.appendChild(x);
        document.getElementById('favorites-target').appendChild(div);
    }
}

function showHistory(history) {
    document.getElementById('history-target').innerHTML = '';
    for (let i = 0; i < history.length; i++) {
        let div = document.createElement('div');
        let a = document.createElement('a');
        div.className = 'aItems';
        a.href = '#weather/' + history[i];
        a.innerText = history[i];
        div.appendChild(a);
        document.getElementById('history-target').appendChild(div);
    }
}

function createPoint(name, lat_lon) {
    // create point and put it on the map
    let point = new ymaps.GeoObject(
        {
            geometry: {
                type: 'Point',
                coordinates: lat_lon
            },
            properties: {
                iconContent: name
            }
        },
        {
            preset: 'islands#redStretchyIcon',
            draggable: false
        }
    );
    map.geoObjects.add(point);
    return point;
}
