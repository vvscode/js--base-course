****# Загрузка данных с удаленного сервера

Актуальные варианты работы c `ajax`:

 - [XHR](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
 - [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Для загрузки прогноза погоды можно использовать, например одно из двух:
 - [DarkSky](https://darksky.net/) + [MapsGoogle](https://developers.google.com/maps/documentation/geocoding/intro)
 - [OpenWeather](http://openweathermap.org/api#)

Данные для работы с сервисами (а еще лучше создать свой аккант и использовать свои ключи):
```javascript
// Google API Key : AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY
// DarkSky API Key: d113af5f82393ef553f48314ae9f42e8
```

Пример получения координат по адресу с  помощью GoogleMapsAPI:
```javascript
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY
let GOOGLE_API_KEY = `AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY
let getLatLng = (addr) => fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`)
  .then((req) => req.json())
  .then((data) => data.results[0].geometry.location);
  /*  { lat: 53.890838, lng: 27.5372046 }  */
```

Пример получения прогноза по координатам:
```javascript
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// https://api.darksky.net/forecast/SOME_KEY/53.890838,27.5372046
// Для получения данных на русском + в метрической системе измерения нужно модицифровать запрос
// https://api.darksky.net/forecast/SOME_KEY/53.890838,27.5372046?lang=ru&units=si
// Для обхода CORS и запросов из браузера поднят прокси (именно поэтому в примере ниже адрес отличается от примеров для DarkSky )
// https://shrouded-spire-35703.herokuapp.com/forecast/53.890838,27.5372046
let getForecastByLatLng = (lat, lng) => fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`)
  .then((req) => req.json());
```

Пример объединения двух функция для получения прогноза по адресу:
```javascript
let getForecastByAddress = (str) => getLatLng(str)
  .then(({lat, lng}) => getForecastByLatLng(lat, lng))
  .catch((e) => {
    //  здесь можно обработать ошибки, например 
  });
```

Пример использования CORS proxy:
```
http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/53.890838,27.5372046?lang=ru&units=si
```