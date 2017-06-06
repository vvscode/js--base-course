const googleKey = `AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY`;
var arr = new Array(4);
var btn = document.querySelector('.search');
btn.addEventListener('click', btnClick);

function btnClick() {
    var city = document.querySelector('.searchLine');
    var fetch = document.querySelector('.fetch');
    var XHR = document.querySelector('.XHR');
    city = city.value;
    if (fetch.checked) getLocationFetch(city);
    else getLocationXHR(city);
}

function getLocationFetch(city) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleKey}`)
        .then(response => response.json())
        .then((data) => {
            var lat = data.results[0].geometry.location['lat'];
            var lng = data.results[0].geometry.location['lng'];
            return fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`)
        })
        .then(response => response.json())
        .then((data) => {
            var tem = data.currently['temperature'];
            var span = document.querySelector('.tem');
            span.innerHTML = `${tem}&deg;C`;
            addList(city);
        })
        .catch(reject => console.error(reject));
}

function getLocationXHR(city) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleKey}`, true);
    xhr.send();
    xhr.onload = xhr.onerror = function () {
        if (this.status == 200) {
            var data = this.response;
            if (JSON.parse(data).status == "ZERO_RESULTS") {
                console.log('ZERO_RESULTS');
            }
            else {
                var lat = JSON.parse(data).results[0].geometry.location['lat'];
                var lng = JSON.parse(data).results[0].geometry.location['lng'];
                var xhr1 = new XMLHttpRequest();
                xhr1.open('GET', `https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`, true);
                xhr1.send();
                xhr1.onload = function () {
                    let data = this.response;
                    var tem = JSON.parse(data).currently['temperature'];
                    var span = document.querySelector('.tem');
                    span.innerHTML = `${tem}&deg;C`;
                }
            }
        }
        else console.log('error:  ' + this.status);
    }
}

function addList(city) {
    var ul = document.querySelector('.list');
    var li = document.createElement('li');
    li.innerHTML = city;
    ul.appendChild(li) && arr.unshift(city);
}