const GOOGLEKEY = `AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY`;
var arr = [];
var arr2 = [];

document.querySelector('form').addEventListener('submit', function (ev) {
    var search = document.querySelector('.searchLine');
    ev.preventDefault();
    window.location.hash = search.value;
    handleUrl(window.location.hash)
});

// Создать обработчик URL
function handleUrl(url) {
    var fetch = document.querySelector('.fetch');
    var city = '';
    city = (url.slice(1)) || city;
    if (city) {
        var temperaturePromise = fetch.checked ? getTemperatureFetch(city) : getTemperaturexhr(city);
        temperaturePromise
            .then((data) => {
                var tem = data.currently['temperature'];
                var summary = data.currently['summary'];
                var precipProbability=data.currently['precipProbability'];
                var icon=data.currently['icon'];
                console.log(icon);
                webIcons(icon)
                var span = document.querySelector('.tem');
                span.innerHTML =  `${tem}&deg;C<br>${summary}<br>Вероятность осадков ${precipProbability}%`;
                addList(city);
            });
    }
}

// Подписаться на изменения URL(ev) => handleUrl(ev.newURL)
window.addEventListener('hashchange', () => handleUrl(window.location.hash));

// При загрузке страницы - считать состояние и запустить обработчик
handleUrl(window.location.hash);

function getTemperatureFetch(city) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLEKEY}`)
        .then(response => response.json())
        .then((data) => {
            var lat = data.results[0].geometry.location['lat'];
            var lng = data.results[0].geometry.location['lng'];
            return fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`)
        })
        .then(response => response.json())
        .catch(reject => console.error(reject));
}

function getTemperaturexhr(city) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLEKEY}`, true);
        xhr.send();

        xhr.onload = xhr.onerror = function () {
            if (this.status != 200) console.log('error:  ' + this.status);
            var data = this.response;
            var lat = JSON.parse(data).results[0].geometry.location['lat'];
            var lng = JSON.parse(data).results[0].geometry.location['lng'];
            var xhr1 = new XMLHttpRequest();
            xhr1.open('GET', `https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`, true);
            xhr1.send();
            xhr1.onload = function () {
                if (this.status == 200) {
                    var data = this.response;
                    resolve(JSON.parse(data));
                }
                else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr1.onerror = () => reject(new Error('Network Error'))
        }
    });
}

function addList(city) {
    if (arr.indexOf(city) == -1) {
        var aHref = window.location.href;
        arr.unshift(city);
        arr2.unshift(aHref);
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr.length == 6) {
            arr.splice(-1, 1);
            arr2.splice(-1, 1);
            var a = document.querySelector(`li.li${i} a.a${i}`);
            a.href = arr2[i];
            a.innerHTML = arr[i];
        }
        else {
            var a = document.querySelector(`li.li${i} a.a${i}`);
            a.href = arr2[i];
            a.innerHTML = arr[i];
        }
    }
}
function webIcons (icon) {
    icon = String(icon);
    var icons = new Skycons({"color": "orange"});
    if(icon == "clear-day") {
        icons.set("WebIcon", Skycons.CLEAR_DAY);
    }
    else if(icon == "clear-night" ) {
        icons.set("WebIcon", Skycons.CLEAR_NIGHT);
    }
    else if(icon == "partly-cloudy-day") {
        icons.set("WebIcon", Skycons.PARTLY_CLOUDY_DAY);
    }
    else if(icon == "partly-cloudy-night") {
        icons.set("WebIcon", Skycons.PARTLY_CLOUDY_NIGHT);
    }
    else if(icon == "cloudy") {
        icons.set("WebIcon", Skycons.CLOUDY);
    }
    else if(icon == "rain") {
        icons.set("WebIcon", Skycons.RAIN);
    }
    else if(icon == "sleet") {
        icons.set("WebIcon", Skycons.SLEET);
    }
    else if(icon == "snow") {
        icons.set("WebIcon", Skycons.SNOW);
    }
    else if(icon == "wind") {
        icons.set("WebIcon", Skycons.WIND);
    }
    else if(icon == "fog") {
        icons.set("WebIcon", Skycons.FOG);
    }
    icons.play();

}