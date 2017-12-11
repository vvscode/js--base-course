class XHRLoadData{
    constructor(){}
    takeCoordinatsCityXHR(city,googleKey) {
        return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.open(
            "GET",
            `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleKey}`,
            true
          );
          xhr.send();
          xhr.onload = xhr.onerror = function() {
            if (xhr.status !== 200) console.log("error:  " + xhr.status);
            let data = xhr.response;
            data = JSON.parse(data);
            resolve(data);
          };
        });
    }
  takeWeatherCityXHR(location,darkSkyKey) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${location}?lang=ru&units=si`,
          true
        );
        xhr.send();
        xhr.onload = function() {
          if (xhr.status === 200) {
            let data = xhr.response;
            data = JSON.parse(data);
            resolve(createObjCurrentlyWether(data));
          } else {
            let error = new Error(xhr.statusText);
            error.code = xhr.status;
            reject(error);
          }
        };
        xhr.onerror = () => reject(new Error("Network Error"));
      });
  }
}
export default XHRLoadData;