export default function writeWeatherByHistory(city) {
  let cityName = decodeURI(city);
  let historyBlock = document.querySelector('#history');
  let historyInfo = historyBlock.querySelector('.block-info__wrap');

  if (!historyInfo.querySelector('ul')) {
    historyInfo.innerHTML = '<ul></ul>';
  }

  let list = historyInfo.querySelector('ul');
  let cityItem = document.createElement('li');
  cityItem.innerHTML = `<li><a href="#city/${cityName}">${cityName}</a></li>`;
  list.insertAdjacentHTML(
    'afterbegin',
    `<li><a href="#city/${cityName}">${cityName}</a></li>`
  );

  var items = list.querySelectorAll('li');
  if (items.length > 5) {
    items[items.length - 1].remove();
  }
}
