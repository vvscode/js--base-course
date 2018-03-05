/**  const DARKSKY_API_KEY = 'd113af5f82393ef553f48314ae9f42e8';
  const GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';

 *
 */

let getCoordinatesByName = (address) =>
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY&language=EN`
  )
    .then((req) => req.json())
    .then((data) => {
      return [
        data.results[0].geometry.location.lat,
        data.results[0].geometry.location.lng,
        data.results[0].formatted_address,
        data.status,
      ];
    })
    .catch(() => console.log("Can't get coordinates"));

let getForecastByLatLng = (coordinates) =>
  fetch(
    `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/${
      coordinates[0]
    },${coordinates[1]}?lang=en%26units=si`
  )
    .then((req) => req.json())
    .then((data) => {
      let forecast = JSON.parse(data.body);
      return {
        summary: forecast.currently.summary,
        temperature: forecast.currently.temperature,
        humidity: forecast.currently.humidity,
        pressure: forecast.currently.pressure,
        'wind speed': forecast.currently.windSpeed,
      };
    })
    .catch(() => console.log("Can't get forecast"));

let getForecastByName = (address) =>
  getCoordinatesByName(address).then((coordinates) =>
    getForecastByLatLng(coordinates)
  );

let getInitialCoordinates = () => {
  return new Promise((resolve, reject) => {
    let regExp = /#center=(-?\d*[.]?\d+),(-?\d*[.]?\d+)/;
    let coordinates = window.location.hash.match(regExp);
    let center;
    if (coordinates) {
      center = [coordinates[1], coordinates[2]];
      resolve(center);
    } else resolve(getUserCoordinates().then((center) => center));
  });
};

let getUserCoordinates = () =>
  fetch('https://api.userinfo.io/userinfos')
    .then((req) => req.json())
    .then((data) => [data.position.latitude, data.position.longitude]);

function changeHashByMapState(center) {
  window.location.hash = `center=${center}`;
}

export {
  getCoordinatesByName,
  getForecastByLatLng,
  getForecastByName,
  getInitialCoordinates,
  changeHashByMapState,
};
