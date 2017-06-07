const googleKey = `AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY`;
var arr = new Array(4);
document.querySelector('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var city = document.querySelector('.searchLine');
    var fetch = document.querySelector('.fetch');
    var XHR = document.querySelector('.XHR');
    city = city.value;
    // window.location.hash = city;
    var temperaturePromise = fetch.checked ? getTemperatureFetch(city) : getTemperatureXHR(city);
    temperaturePromise
        .then((data) => {
            var tem = data.currently['temperature'];
            var span = document.querySelector('.tem');
            span.innerHTML = `${tem}&deg;C`;
            addList(city);
        });
});


// // Создать обработчик URL
// function handleUrl(url) {
//     var city = document.querySelector('.searchLine');
//     var fetch = document.querySelector('.fetch');
//     var XHR = document.querySelector('.XHR');
//     city.value = url.slice(1);
//     city = city.value;
//     window.location.hash = city;
//     if (fetch.checked) getTemperatureFetch(city)
//         .then((data) => {
//             var tem = data.currently['temperature'];
//             var span = document.querySelector('.tem');
//             span.innerHTML = `${tem}&deg;C`;
//             addList(city);
//         });
//     else getTemperatureXHR(city);
// }
//
// // // Подписаться на изменения URL
// // window.addEventListener('hashchange', (ev) => handleUrl(ev.newURL));
//
// // При загрузке страницы - считать состояние и запустить обработчик
// handleUrl(window.location.hash);

function getTemperatureFetch(city) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleKey}`)
        .then(response => response.json())
        .then((data) => {
            var lat = data.results[0].geometry.location['lat'];
            var lng = data.results[0].geometry.location['lng'];
            return fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`)
        })
        .then(response => response.json())
        .catch(reject => console.error(reject));
}

function getTemperatureXHR(city) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleKey}`, true);
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
            xhr1.onerror = function () {
                reject(new Error('Network Error'))
            };
        }
    });
}

function addList(city) {
    var ul = document.querySelector('.list');
    var li = document.createElement('li');
    li.innerHTML = city;
    ul.appendChild(li) && arr.unshift(city);
}