const request = (method, url) => {
  switch (method) {
    case 'xhr':
      return new Promise((resolve, reject) => {
        const xhr = new window.XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = _ => resolve(xhr.responseText);
        xhr.onerror = _ => reject(xhr.status);
      });
    case 'fetch':
      return window.fetch(url)
        .then(response => {
          if (response.status === 200) return response.text();
          console.error(response.status);
        });
    default:
      return null;
  }
};

const getOwnLocation = (method) => {
  return request(method, 'https://ipinfo.io/geo')
    .then(data => {
      const pos = JSON.parse(data).loc.match(/(\S+),(\S+)/);
      return [pos[1], pos[2]];
    });
};

const getWeather = (method, location) => {
  return request(method, `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ce0eb7ffaebe7c0f840beaf1c15f1c00/${location[0]},${location[1]}?lang=en&units=si`)
    .then(data => JSON.parse(data));
};

const getCityByLocation = (method, location) => {
  return request(method, `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location[0] + 0.001},${location[1] + 0.001}&result_type=locality&language=en&key=AIzaSyBFl2Chh3nLWZ-bVlsSPiH_Q1o7f1x6cpg`)
    .then(data => JSON.parse(data).results.length > 0 ? JSON.parse(data).results[0].address_components[0].long_name : null);
};

const getLocationByCity = (method, city) => {
  return request(method, `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyBFl2Chh3nLWZ-bVlsSPiH_Q1o7f1x6cpg`)
    .then(data => {
      const pos = JSON.parse(data).results.length > 0 ? JSON.parse(data).results[0].geometry.location : null;
      return pos ? [pos.lat, pos.lng] : null;
    });
};

export {getOwnLocation, getWeather, getCityByLocation, getLocationByCity};
