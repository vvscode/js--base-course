let weather = document.querySelector("#weather");

function dragMap() {
    window.location.hash = `/location/${getLatlng()},${myMap.getZoom()}/`;
    addWeather();
}

function addWeather() {
    let myWeather = getForecastByLatLng();
    myWeather
        .then((forecast) => {
            let weatherList = `<ul>Прогноз погоды:
            <li>${forecast.currently.summary}</li>
            <li>Температура: ${Math.round(forecast.currently.temperature)}°C</li>
            <li>Облачность: ${Math.round(forecast.currently.cloudCover * 100)}%</li>
            <li>Влажность: ${Math.round(forecast.currently.humidity * 100)}%</li>
            <li>Скорость ветра: ${forecast.currently.windSpeed}км/ч</li>
            </ul>`;

            weather.innerHTML = weatherList;
        })
}