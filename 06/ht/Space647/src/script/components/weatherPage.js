import DB from '../utils/db';
import FeatchLoadData from '../utils/fetchLoadData';
import XHRLoadData from '../utils/xhrLoadData';

class WeatherPage{
    constructor(){
        this.dataBase = new DB();
        this.fetchRequest = new FeatchLoadData();
        this.XHRRequest = new XHRLoadData();
        this.GOOGLE_KEY = "AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY";
        this.DARK_SKY_KEY = "2de010dcb0ebbb2d6031a1d3d61bf0b0";
    }
    initPage(){
        let coordinatsCity;
        let cityName;
        let request;
        Promise.resolve()
        .then(() => {this.renderPage()})
        .then(() => {this.addEvents()})
        .then(() =>{request = this.checkMethodRequest()})
        .then(() => this.takeCity())
        .then((city)=>{cityName = city; return this.takeСoordinatesCity(city ,request)})
        .then((coordinats) => this.normalizationCoordinats(coordinats))
        .then((coordinats) => {coordinatsCity = coordinats; return coordinats})
        .then((coordinats)=> this.takeWeatherCity(coordinats))
        .then((weather) => this.renderWeather(weather))
        .then(() => {this.createMap(coordinatsCity)})
        .then(() => this.addCitiOnHistorry(cityName))
        .then((citys) => this.renderCitysHistory(citys))
    }
    checkMethodRequest(){
       return this.dataBase.methodRequestLoad();
    }
    renderPage(){
        document.querySelector("header").innerHTML = `
        <label><input class="fetch" type="radio" name="query" value="fetch" >fetch</label>
        <label><input class="XHR" type="radio" name="query" value="xhr" checked>XHR</label>
        <a href="#">Main</a>
        <a href="#about">About</a>
        <input class="searchLine" placeholder="Search" type="text" autofocus>
        <button class='enter'>Search</button>`;
        document.querySelector(".workPlace").innerHTML = `<div id="map"></div>`
        document.querySelector('footer').innerHTML = `
        <div class='history'></div>
        <div class='weather'><canvas id="WebIcon" width="150" height="150"></canvas></div>
        <div class='favorite'></div>
        `
        Promise.resolve();
    }
    renderCitysHistory(history){
       let placeRender = document.querySelector('.history');
       let listCity = history.map(function(cityName) {
          return (listCity = `<li><a href="#${cityName}">${cityName}</a></li>`);
        }).join(" ");
      placeRender.innerHTML = listCity;
    }
    renderWeather(weather){
        let t1 = weather.currently.temperature
        let t2 = weather.currently.summary
        let t3 = weather.currently.windSpeed
        document.querySelector('.weather').innerHTML+=`
        <div class = 'summaryWeather'>
        <span>${t1}</span> <br>
        <span>${t2}</span> <br>
        <span>${t3}</span> <br>
        </div>`;
        this.webIcons(weather.currently.icon);
    }
    addEvents(){
        document.querySelector('.enter').addEventListener('click',()=>this.searchWeather())
    }
    searchWeather(){
        Promise.resolve()
        .then(()=>{
            if(document.querySelector('.XHR').checked){
                this.dataBase.methodRequestSave('xhr')
            }else{
                this.dataBase.methodRequestSave('fetch')
            }
            location.hash=this.takeCity();
        })
    }
    takeCity(){
        return document.querySelector('.searchLine').value || location.href.split('#')[1];
    }
    takeСoordinatesCity(city ,request){
        if(request==='xhr'){
            return this.XHRRequest.takeCoordinatsCityFetch(city,this.GOOGLE_KEY).then( res => res.results[0]);
        }else{
            return this.fetchRequest.takeCoordinatsCityFetch(city,this.GOOGLE_KEY).then( res => res.results[0]);
        }
    }
    normalizationCoordinats(coordinats){
        return [coordinats.geometry.location.lat,coordinats.geometry.location.lng]
    }
    takeWeatherCity(coordinats,request){
        if(request==='xhr'){
            return this.XHRRequest.takeWeatherCityFetch(coordinats,this.DARK_SKY_KEY).then( res => res);
        }else{
            return this.fetchRequest.takeWeatherCityFetch(coordinats,this.DARK_SKY_KEY).then( res => res);
        }
    }
    createMap(coordinats){
        let myMap;
        ymaps.ready(init);
        function init () {
            myMap = new ymaps.Map('map', {
                center: coordinats,
                zoom: 10
            }, {
                searchControlProvider: 'yandex#search'
            });
        return Promise.resolve(coordinats);
        }
    }
    addCitiOnHistorry(city){

      return this.dataBase.loadInDb('history')
       .then((citys)=>{
        if(citys.length >= 5){
            citys.splice(-1,1)
            citys.unshift(city);
        }else{
            citys.unshift(city);
        }
        this.dataBase.saveInDb(citys,'history');
        return citys;
       })
    }
    addCitiOnFavorite(city){
        return this.dataBase.loadInDb('favorite')
         .then((citys)=>{
          if(citys.length === 5){
              citys.splice(-1,1)
              citys.unshift(city);
          }else{
              citys.unshift(city);
          }
          this.dataBase.saveInDb(citys,'favorite');
          return citys;
         })
      }
      webIcons(icon) {
        icon = String(icon);
        var icons = new Skycons({ color: "black" });
        switch (icon) {
          case "clear-day":
            icons.set("WebIcon", Skycons.CLEAR_DAY);
            break;
          case "clear-night":
            icons.set("WebIcon", Skycons.CLEAR_NIGHT);
            break;
          case "partly-cloudy-day":
            icons.set("WebIcon", Skycons.PARTLY_CLOUDY_DAY);
            break;
          case "partly-cloudy-night":
            icons.set("WebIcon", Skycons.PARTLY_CLOUDY_NIGHT);
            break;
          case "cloudy":
            icons.set("WebIcon", Skycons.CLOUDY);
            break;
          case "rain":
            icons.set("WebIcon", Skycons.RAIN);
            break;
          case "sleet":
            icons.set("WebIcon", Skycons.SLEET);
            break;
          case "snow":
            icons.set("WebIcon", Skycons.SNOW);
            break;
          case "wind":
            icons.set("WebIcon", Skycons.WIND);
            break;
          case "fog":
            icons.set("WebIcon", Skycons.FOG);
            break;
        }
        icons.play();
      }
}
export default WeatherPage;