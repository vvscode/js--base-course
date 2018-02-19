var GOOGLE_API_KEY = 'AIzaSyBfCL7i-AyKlw0tHfaIVWCfkC7sudtWvLM';

// возвращает 'true' при ативном  xhr-батоне
function activeXhr() {
  var xhrActive = document.querySelector('#xhr').checked;
  return xhrActive;
}

// получение координат по введенному адресу XHR запросом
var getLatLngByXhr = function () {
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest();
    var addr1 = document.querySelector('#find').value;
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr1 || 'Lida'}&key=${GOOGLE_API_KEY}`;
    xhr.open('GET', url, true);

    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status !== 200) {
        alert(`${xhr.status}: ${xhr.statusText}`);
      } else {
        var cityInfo = JSON.parse(xhr.responseText);
        var result = cityInfo.results[0].geometry.location;
        resolve(result);
      }
    };
  });
};


// получение координат по введенному адресу fetch запросом
var getLatLngByFetch = function (addr) {
  var addr1 = document.querySelector('#find').value;
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr || addr1 || 'Lida'}&key=${GOOGLE_API_KEY}`;
  return fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data.results[0].geometry.location;
    });
};
  // установка центра карты по введенному адресу с учетом метода запроса координат
var resolveMoving = function (data) {
  var myAddress = [];
  myAddress.push(data.lat, data.lng);

  getCitiByCoords(data.lat, data.lng)
    .then(function (place) {
      addCoordsToHash(data.lat, data.lng, place);
    });

  myMap.panTo(myAddress, {
    flying: true,
  });
};
function move(ev) {
  if (ev.which === 13) {
    ev.preventDefault();
    if (activeXhr()) {
      getLatLngByXhr()
        .then(resolveMoving);
    } else {
      getLatLngByFetch()
        .then(resolveMoving);
    }
  }
}

// получение названия места по координатам
function getCitiByCoords(lat, lng) {
  var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${`${lat},${lng}`}&key=${GOOGLE_API_KEY}&language=en`;
  return fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return (data.results[3].formatted_address);
    });
}

// получение координат по клику и добавление города в "Избранное"
var arr = [];
storage.getData('storagedFavourites')
  .then(function (data) {
    document.querySelector('#favourites').innerHTML = data;
  });
function getCoordsByClick(ev) {
  var coords = ev.get('coords');
  var lat = coords[0],
    lng = coords[1];
  getCitiByCoords(lat, lng)
    .then(function (city) {
      addToFavourites(city);
    });
}
// добавляет город в "Избранное"
function addToFavourites(city) {
  if (arr.length < 3)arr.push(`<div id = "fevouriteCity"><li>${city}</li> <b title="Delete the city">x</b></div>`);
  document.querySelector('#favourites').innerHTML = arr.toString();
  storage.setData('storagedFavourites', arr);
}

// удаление города из "Избранного"
function removeFromFavourites(value) {
  var value1 = `<div id = "fevouriteCity">${value.parentNode.innerHTML}</div>`;
  var i = arr.indexOf(value1);
  arr.splice(i, 1);
  document.querySelector('#favourites').innerHTML = arr;
  storage.setData('storagedFavourites', arr);
}


document.querySelector('#favourites').addEventListener('click', function (ev) {
  ev.target.matches('b') && removeFromFavourites(ev.target);
});

document.querySelector('#find').addEventListener('keypress', move);
document.querySelector('#xhr').addEventListener('change', activeXhr);


