let GOOGLE_KEY ="AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY";
let DARK_SKY_KEY="2de010dcb0ebbb2d6031a1d3d61bf0b0";
let arrCity=[];
handleUrl(window.location.hash);
window.addEventListener('hashchange', () => handleUrl(window.location.hash)); 

function handleUrl(url) {
    let city = '';
    city = (url.slice(1)) || city;
    if (city) {
        checkMethodRequest(city);
    };
    }
function starSearchButton(){
    document.querySelector(".searchLine").addEventListener("keypress", e => {
        let key = e.which || e.keyCode;
        if (key === 13) {
          e.preventDefault();
          checkMethodRequest();
        }
      });
}
function checkMethodRequest(city){

     city = city || document.querySelector(".searchLine").value;
    if(document.querySelector(".fetch").checked){
        takeCoordinatsCityFetch(city);
    }
    else{
        takeCoordinatsCityXHR(city);
    }
}
function takeCoordinatsCityFetch(city){
    let location,lat,lng;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_KEY}`)
    .then(response => response.json())
    .then(data=>{
        location=data.results[0].geometry.location;
        lat= location.lat;
        lng= location.lng;
        location=[lat,lng];
        cityList(city);
        takeWeatherCityFetch(location);
    })
}

function takeWeatherCityFetch(location){
    let currentlyWether;
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${location}?lang=ru&units=si`)
    .then(response => response.json())
    .then(data=>{
        currentlyWether={
            temperature: data.currently.temperature,
            humidity: data.currently.humidity,
            summary: data.currently.summary,
            windSpeed: data.currently.windSpeed,
            icon: data.currently.icon                  
        };
        drowWetWeatherCity(currentlyWether);
    }) 

 }

 function takeCoordinatsCityXHR(city){
    let location,lat,lng;
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_KEY}`, true);
        xhr.send();
        xhr.onload = xhr.onerror = function () {
            if (this.status != 200) console.log('error:  ' + this.status);
            var data = this.response;
            resolve(data);
        }
    })
    .then(data=>{
        data = JSON.parse(data);
        location=data.results[0].geometry.location;
        lat= location.lat;
        lng= location.lng;
        location=[lat,lng];
        cityList(city);
        takeWeatherCityXHR(location);
    });
}

function takeWeatherCityXHR(location){
    let currentlyWether;
    return new Promise((resolve, reject) =>{
        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${location}?lang=ru&units=si`, true);
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
    })
    .then(data=>{
        currentlyWether={
            temperature: data.currently.temperature,
            humidity: data.currently.humidity,
            summary: data.currently.summary,
            windSpeed: data.currently.windSpeed,
            icon: data.currently.icon               
        };
        drowWetWeatherCity(currentlyWether)
    });
 }

 function drowWetWeatherCity(currentlyWether){
    let placeRender= document.querySelector(".workPlace");
    placeRender.innerHTML=`<div class="icon"> <canvas id="WebIcon" width="64" height="64"></canvas> </div>
                           <div>
                           <span>Температура${currentlyWether.temperature}&deg;</span> <br>
                           <span>Описание${currentlyWether.summary}</span> <br>
                           <span>Влажность${currentlyWether.humidity}</span> <br>
                           <span>скорость ветра${currentlyWether.windSpeed}</span>
                           </div>`;
    webIcons(currentlyWether.icon);
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

function cityList(city){
    window.location.hash=city;
    if(arrCity.indexOf(city)==-1){
        if(arrCity.length==5){
            arrCity.splice(-1, 1);;
            arrCity. unshift(city);
        }else
        {
            arrCity.unshift(city);
        }
    }
    drowCityList();
}

    function drowCityList(){
     let placeRender,listCity="";
     placeRender= document.querySelector(".list");
     for(let i=0;i <arrCity.length;i++){
        listCity+=`<li><a href="#${arrCity[i]}">${arrCity[i]}</a></li>`;
     }
     placeRender.innerHTML=listCity;
    }

starSearchButton();
