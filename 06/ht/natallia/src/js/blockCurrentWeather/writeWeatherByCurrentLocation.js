export default function writeWeatherByCurrentLocation(data) {
  let blockCurrentWeather = document.querySelector('#weather');
  let info = blockCurrentWeather.querySelector('.block-info__wrap');
  let date = new Date(data.currently.time * 1000).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
  let cloudCover = data.currently.summary;
  let icon = data.currently.icon;
  let temp = Math.round(data.currently.temperature);
  let speed = Math.round(data.currently.windSpeed);
  info.innerHTML = `<p><time class="block-info__time">${date}</time></p><p><span class="block-info__img-show-weather block-info__img-show-weather--${icon}"></span><span>${cloudCover}</span></p><p><span>${temp}&#176;C</span></p><p>Скорость ветра: ${speed} м/с</p>`;
}
