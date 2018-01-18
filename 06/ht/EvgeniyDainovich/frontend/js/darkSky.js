//secret key 29ca886e8c1f12c7853b3b1398233503
function darkSky(htmlElement) {
    this.htmlElement = htmlElement;
    this.returnUrl = function (lat, lng) {
        const DARKNET_KEY = '29ca886e8c1f12c7853b3b1398233503';
        var darkNetUrl = `https://api.darksky.net/forecast/${DARKNET_KEY}/${lat},${lng}?lang=ru&units=si`;
        var proxyUrl = `https://cors-anywhere.herokuapp.com/${darkNetUrl}`;
        return proxyUrl;
    };

};
darkSky.prototype.fillHtml = function (response) {

    var input = `<table class='forecast_table'><tr>${this.shortDate()}</tr><tr><th></th><th>Сегодня:</th><th>Завтра:</th></tr>`;
    input += "<tr class='forecast'><td>Прогноз:</td><td>" + response.daily.data[0].summary + "</td><td>" + response.daily.data[1].summary + "</td></tr>";
    input += "<tr><th>Днем, t&deg:</th><td>" + ~~response.daily.data[0].temperatureMax + "&deg" + "</td><td>" + ~~response.daily.data[1].temperatureMax + "&deg</td></tr>";
    input += "<tr><th>Ночью, t&deg:</th><td>" + ~~response.daily.data[0].temperatureMin + "&deg" + "</td><td>" + ~~response.daily.data[1].temperatureMin + "&deg</td></tr>";
    input += "<tr><th>Ветер, м/с:</th><td>" + response.daily.data[0].windSpeed + "</td><td>" + response.daily.data[1].windSpeed + "</td>";
    input += '</table>';
    this.htmlElement.innerHTML = input;

}
darkSky.prototype.shortDate = function () {
    var date = new Date();
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }
    return date.toLocaleString("ru", options);
};

darkSky.prototype.getForecastByFetch = function (lat, lng) {
    return fetch(this.returnUrl(lat, lng))
        .then((req) => req.json())
        .catch(err => console.log("errorFromDarkSky"));
};

darkSky.prototype.getForecastByXhr = function (lat, lng) {
    return new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.returnUrl(lat, lng), true);
        xhr.onload = function () {
            xhr.status === 200 ? resolve(JSON.parse(xhr.response)) : console.dir(this.responseText);
        }
        xhr.onerror = function () {
            console.log('Ошибка ' + this.status);
        }
        xhr.send();
    });
}

darkSky.prototype.getForecastBySelectedRequest = function (request, lat, lng) {
    if (request === 'fetch') {
        return this.getForecastByFetch(lat, lng)
    }
    else if (request === 'xhr') {
        return this.getForecastByXhr(lat, lng)
    }
};



export default darkSky;