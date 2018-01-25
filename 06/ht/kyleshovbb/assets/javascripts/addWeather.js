'use strict';

class AddWeather {
    constructor(){
        this.myWeather = getForecastByLatLng();
        this.weather = document.querySelector("#weather");
        this.addMyWeather();
    }

    addMyWeather() {
        this.myWeather
            .then((forecast) => {
                let weatherList = `<ul>Прогноз погоды:
                <li>${forecast.currently.summary}</li>
                <li>Температура: ${Math.round(forecast.currently.temperature)}°C</li>
                <li>Облачность: ${Math.round(forecast.currently.cloudCover * 100)}%</li>
                <li>Влажность: ${Math.round(forecast.currently.humidity * 100)}%</li>
                <li>Скорость ветра: ${forecast.currently.windSpeed}км/ч</li>
                </ul>`;

                this.weather.innerHTML = weatherList;
            })
    }
}

import {getForecastByLatLng} from "./workWithAPI";

export default AddWeather;