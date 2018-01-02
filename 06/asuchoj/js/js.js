/*обработчик для кнопки поиска*/
'use strict';
let searchClick = document.querySelector('#search_click');
let searchEnter = document.querySelector('#search_enter');
let locationCity;



searchClick.addEventListener('click',(e)=>{
    e.preventDefault();
/*    location.href = '#city/' + searchEnter.value;*/
/*    f(searchEnter.value);*/
    google(searchEnter.value);
    addWeather(locationCity.lat, locationCity.lng);
});

function google (city) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET','http://maps.googleapis.com/maps/api/geocode/json?address='
        + city + '&sensor=false&language=ru',true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            alert( xhr.status + ': ' + xhr.statusText );
        }else{
            let r = JSON.parse(xhr.responseText);
            locationCity = r.results[0].geometry.location;
            setCenter(locationCity.lat, locationCity.lng);
        }
    };
}


 function addWeather (lat, lng) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET',`http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/959fa59e167330c18990fe8d19771971/${lat},${lng}?lang=ru&units=si`,true);
    xhr.send();

    xhr.onreadystatechange = function () {

        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            alert( xhr.status + ': ' + xhr.statusText );
        }else{
            let weather1 = JSON.parse(xhr.responseText);
            let weather = JSON.parse(weather1.body);


            let temperature = '<p> Температура: '  + Math.round( ( weather.currently.temperature - 32 )/ 1.8 )  + ' &#8451 </p>';
            let pressure = '<p> Давление: ' + weather.currently.pressure + '</p>';
            let humidity = '<p> Влажность: ' + weather.currently.humidity + '</p>';
            let windSpeed = '<p> Скорость ветра: ' + weather.currently.windSpeed + '</p>';
            let precipProbability = '<p> Вероятность осадков: ' + weather.currently.precipProbability + '</p>';
            let cloudCover = '<p> Облачность: ' + weather.currently.cloudCover + '</p>';

            let i = document.querySelector('.weather');
            i.innerHTML = temperature + pressure + humidity + windSpeed + precipProbability + cloudCover;
        }
    }
}
/*
function f(el) {
    let l = document.createElement('a');
    l.href = '#city=' + el;
    return l
}
*/

/*function g() {
    var a = location.hash.split('/');
    google(a);
}*/


function Model() {
    
}
function Viev() {
    
}
function Controller() {
    
}