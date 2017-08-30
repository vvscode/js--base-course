let GOOGLE_KEY ="AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY";
let DARK_SKY_KEY="2de010dcb0ebbb2d6031a1d3d61bf0b0";

function starSearchButton(){
    document.querySelector(".searchLine").addEventListener("keypress", e => {
        let key = e.which || e.keyCode;
        if (key === 13) {
          e.preventDefault();
          checkMethodRequest();
        }
      });
}

function checkMethodRequest(){
    let city = document.querySelector(".searchLine").value;
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
        location=[lat,lng]
        takeWeatherCityFetch(location);
    })
}

function takeWeatherCityFetch(location){
    let weather=[],currentlyWether;
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${location}?lang=ru&units=si`)
    .then(response => response.json())
    .then(data=>{
        currentlyWether={
            date: "будет тут дата ",
            temperature: data.currently.temperature,
            humidity: data.currently.humidity,
            summary: data.currently.summary,
            windSpeed: data.currently.windSpeed,
            icon: data.currently.windSpeed                
        };
    weather.push(currentlyWether);
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
        location=[lat,lng]
        takeWeatherCityXHR(location);
    });
}

function takeWeatherCityXHR(location){
    let weather=[],currentlyWether;
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
            date: "будет тут дата ",
            temperature: data.currently.temperature,
            humidity: data.currently.humidity,
            summary: data.currently.summary,
            windSpeed: data.currently.windSpeed,
            icon: data.currently.windSpeed                
        };
    weather.push(currentlyWether);
    });
 }

//  function drowWetWeatherCity(arrWether){
//     for(let i=0; i < arrWether.lenght;i++){}
//  }









starSearchButton();
