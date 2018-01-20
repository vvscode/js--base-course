/**  const DARKSKY_API_KEY = 'd113af5f82393ef553f48314ae9f42e8';
  const GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';

 *
 */

let getCoordinatesByName = (address) =>
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY`
  )
    .then((req) => req.json())
    .then((data) => {
      return data.results[0].geometry.location;
    })
    .catch(() => console.log("Can't get coordinates"));

let getForecastByLatLng = ({ lat, lng }) =>
  fetch(
    `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/${lat},${lng}?lang=ru&units=auto`
  )
    .then((req) => req.json())
    .then((data) => {
      let forecast = JSON.parse(data.body);
      return {
        summary: forecast.currently.summary,
        temperature: forecast.currently.temperature,
        humidity: forecast.currently.humidity,
        pressure: forecast.currently.pressure,
        windSpeed: forecast.currently.windSpeed,
      };
    })
    .catch(() => console.log("Can't get forecast"));

let getForecastByName = (address) =>
  getCoordinatesByName(address).then((coordinates) =>
    getForecastByLatLng(coordinates)
  );

let getUserCoordinates = () =>
  fetch('https://api.userinfo.io/userinfos')
    .then((req) => req.json())
    .then((data) => ({
      lat: data.position.latitude,
      lng: data.position.longitude,
    }));

export {
  getCoordinatesByName,
  getForecastByLatLng,
  getForecastByName,
  getUserCoordinates,
};
