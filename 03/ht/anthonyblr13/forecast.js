/**
 * Created by Antony on 6/4/2017.
 */

var cities = [];
var links = [];
var temp = localStorage.getItem('cities');
var temp1 = localStorage.getItem('links');

if (temp!=undefined) {
    cities = JSON.parse(temp);
}

if (temp1!=undefined) {
    links = JSON.parse(temp1);
}

var btn = document.querySelector('.search');
btn.addEventListener('click', btnClick);

function btnClick() {
    var getWeather;
    var city = document.querySelector('.searchLine');
    var fetch = document.querySelector('.Fetch');
    var XHRequest = document.querySelector('.XHRequest');
    city = city.value;
    if (fetch.checked) {
        getWeather = getWeather_2(city);
    }
    else {
        getWeather = getWeather_1(city);
    }
    getWeather.then(function(weather) {
            document.getElementById("temperature").innerHTML = "Temperature: " + weather.main.temp + " C";
            document.getElementById("humidity").innerHTML = "Humidity: " + weather.main.humidity + " %";
            document.getElementById("wind").innerHTML = "Wind: " + weather.wind.speed + " meters per second";
            addList(city);
        },
        function(error) {
            document.getElementById("error").innerHTML = (error);
        });
}


function getWeather_1(city) {
    var weatherXhr = new Promise ( function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("load", function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else {
                    reject(xhr.statusText);
                }
            }
        });

        xhr.addEventListener("error", function(e) {
            reject(e);
        });

        xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=826be2aabbf0a3498599a424366d7d62");
        xhr.send();
    });
    return weatherXhr;
};

function getWeather_2(city) {
    var weatherPromise = new Promise(function (resolve, reject) {



        fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=826be2aabbf0a3498599a424366d7d62")
            .then(
                function(response) {
                    if (response.status !== 200) {
                        reject('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function(data) {
                        resolve(data);
                    });
                },
                function(err) {
                    reject('Fetch Error : ' + err.message);
                }
            );
    });

    return weatherPromise;

}

function addList(city) {
    if (cities.indexOf(city) == -1) {
        var aHref = window.location.origin + window.location.pathname + "?city=" + city;
        cities.unshift(city);
        links.unshift(aHref);
        if (cities.length == 6 && links.length == 6) {
            cities.pop();
            links.pop();
        }
        localStorage.setItem('cities', JSON.stringify(cities));
        localStorage.setItem('links', JSON.stringify(links));
    }
    for (var i = 0; i < cities.length; i++) {
        var a = document.querySelector('.a' +i);
        a.href = links[i];
        a.innerHTML = cities[i];
    }
}

for (var i = 0; i < cities.length; i++) {
    var a = document.querySelector('.a' +i);
    a.href = links[i];
    a.innerHTML = cities[i];
}

var queryString = window.location.search;

var params = new URLSearchParams(queryString.substring(1));

if (params.has('city')) {
    var cityParam = params.get("city");
    var searchLine = document.querySelector('.searchLine');
    searchLine.value = cityParam;
    btnClick();
}




