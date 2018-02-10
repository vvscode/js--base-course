var InfoArea = function(el, addr){
    this.el = el;
    this.addr = addr;
}

InfoArea.prototype.render = function(){
    this.drawWeather(this.addr);
}

InfoArea.prototype.drawWeather  = function(addr){


    var ws = new WeatherService();

    if(addr instanceof Object){
        var forecastPromise = ws.getForecastByCoordinates();
        forecastPromise(addr.lat, addr.lng).then((data) => {
            //ws.getForecastByLatLng(lat, lng);
            this.fillContent(data);
        });
    } else{
        var forecastPromise = ws.getForecastByAddress();

        forecastPromise(addr).then((data) => {
            var data = JSON.parse(data.body);
            var zeroDegreeByForengeit = 32;

            var summary = data.currently.summary;
            var temperature = (data.currently.temperature - zeroDegreeByForengeit)*5/9;
            var pressure = data.currently.pressure;
            var humidity = data.currently.humidity; // vlazhnost
            var windSpeed = data.currently.windSpeed;
            var time = new Date(data.currently.time * 1000);
            var precipProbability = data.currently.precipProbability; // ver. osadkov
            var timeInFormat = time.getFullYear() + '/' + (time.getMonth()+1) + '/' + time.getDate()
                + ' ' + time.getHours() + ':' + time.getMinutes();

            var weatherArea =
                '<div>Местоположение: ' + addr + '</div>' +
                '<div>' + summary + '</div>' +
                '<div> Температура ' + temperature + '</div>' +
                '<div> Давление ' + pressure + '</div>' +
                '<div> Влажность ' + humidity + '</div>' +
                '<div> Скорость ветра ' + windSpeed + '</div>' +
                '<div> Вероятность осадков ' + precipProbability + '</div>' +
                '<div> Текущее время: ' + timeInFormat + '</div>';

            this.el.innerHTML = weatherArea;

        }).catch(function(){
            console.log('error at forecastPromise occurred');
        });
    }

}


InfoArea.prototype.fillContent = function(data){
    var data = JSON.parse(data.body);
    var zeroDegreeByForengeit = 32;

    var summary = data.currently.summary;
    var temperature = (data.currently.temperature - zeroDegreeByForengeit)*5/9;
    var pressure = data.currently.pressure;
    var humidity = data.currently.humidity; // vlazhnost
    var windSpeed = data.currently.windSpeed;
    var time = new Date(data.currently.time * 1000);
    var precipProbability = data.currently.precipProbability; // ver. osadkov
    var timeInFormat = time.getFullYear() + '/' + (time.getMonth()+1) + '/' + time.getDate()
        + ' ' + time.getHours() + ':' + time.getMinutes();

    var weatherArea =
        '<div>Местоположение: ' + data.latitude + ' ' + data.longitude + '(' + data.timezone + ')' + '</div>' +
        '<div>' + summary + '</div>' +
        '<div> Температура ' + temperature + '</div>' +
        '<div> Давление ' + pressure + '</div>' +
        '<div> Влажность ' + humidity + '</div>' +
        '<div> Скорость ветра ' + windSpeed + '</div>' +
        '<div> Вероятность осадков ' + precipProbability + '</div>' +
        '<div> Текущее время: ' + timeInFormat + '</div>';

    this.el.innerHTML = weatherArea;
}

