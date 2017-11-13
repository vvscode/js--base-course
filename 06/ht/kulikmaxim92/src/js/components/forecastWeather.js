import {getMapStateFromHash} from '../utils/utils';

function ForecastWeather(options, requestService) {
    this.options = options;
    this.requestService = requestService;
    this.container = document.getElementById(this.options.container);

    window.addEventListener('hashchange', () => {
        var mapState = getMapStateFromHash();
        if (mapState) {
            this.getForecastWeather(mapState.center[0], mapState.center[1]);     
        }
    })

}

ForecastWeather.prototype.render = function (data) {
    var content = `<ul><div>${this.options.label || ''}</div>`;
    content += `<li>Описание: ${data.summary}</li><li>Температура: ${data.temperature} C</li>`;
    content += `<li>Скорость ветра: ${data.windSpeed} м/с</li><li>Давление: ${data.pressure} гПа</li>`;
    content += `<li>Влажность: ${data.humidity*100} %</li><li>Точка росы: ${data.dewPoint} C</li>`;
    content += `<li>Вероятность осадков: ${data.precipProbability*100} %</li></ul>`;
    
    this.container.innerHTML = content;
}

ForecastWeather.prototype.getForecastWeather = function (lat, lng) {
    this.requestService.getForecastWeatherByLocation(lat, lng)
        .then((data) => this.render(data))
        .catch(() => this.container.innerHTML = 'Ошибка!');
}

export default ForecastWeather;