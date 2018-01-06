
// отображение последних 5-ти городов из поиска
var his = [];
storage.getData('key1')
  .then(function (data) {
    document.querySelector('#history').innerHTML = data;
  });

function addHistory(ev) {
  if (ev.which === 13) {
    ev.preventDefault();
    var city = document.querySelector('#find').value;
    var storagedCities = document.querySelector('#history').innerHTML.split(',');
    his = storagedCities;
    if (his.length < 5) {
      his.unshift(`<br /><li>${city}</li>`);
    } else {
      his.unshift(`<br /><li>${city}</li>`) && his.pop();
    }
    document.querySelector('#history').innerHTML = his;
    storage.setData('key1', his);
  }
}


document.querySelector('#find').addEventListener('keypress', addHistory);

document.querySelector('.flex-container').addEventListener('click', function (ev) {
  ev.target.matches('li') &&
    getLatLngByFetch(ev.target.innerHTML).then(resolveMoving) &&
    getLatLngByFetch(ev.target.innerHTML).then(resolveForecast);
});







