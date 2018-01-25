import updateIcons from '../utils/skycons';
import request from '../utils/request';
var key = '5031e075946739a76f0e37598086d0a3';

class WeatherForecast {
    constructor(_element, eventBus) {
        this.element = _element;
        this.eventBus = eventBus;
    };

    getForecastByLatLng(lat, lng, cityName) {
        this.cityName = cityName;
        request(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${lng}?lang=ru&units=si`)
            .then(result => {
                this.render(result.daily.data);
            });
    }
    render(dailyForecast) {
        this.element.innerHTML = '';
        var header = document.createElement('span');
        header.innerHTML = `Place: ${this.cityName}`;
        this.element.appendChild(header);
        var table = document.createElement('table');
        table.className = 'weatherTable table';
        var tr = document.createElement('tr');
        var thHeader = document.createElement('th');
        thHeader.innerHTML = 'Date';
        var date = new Date();
        tr.appendChild(thHeader);
        for (let index = 0; index < 7; index++) {
            var th = document.createElement('th');
            th.innerHTML = `${date.getDate()}.${date.getMonth()+1}`;
            tr.appendChild(th);
            date.setDate(date.getDate() + 1);
        }
        table.appendChild(tr);

        tr = document.createElement('tr');
        var tdHeader = document.createElement('th');
        tr.appendChild(tdHeader);
        for (let index = 0; index < 7; index++) {
            var td = document.createElement('td');
            td.innerHTML = `<canvas class="${dailyForecast[index].icon}" width="30" height="30"></canvas>`
            tr.appendChild(td);
        }
        table.appendChild(tr);

        table.appendChild(this.createRow(dailyForecast, 'Day temperature, &#8451', 'temperatureHigh'));
        table.appendChild(this.createRow(dailyForecast, 'Night temperature, &#8451', 'temperatureLow'));
        table.appendChild(this.createRow(dailyForecast, 'Wind speed, m/s', 'windSpeed'));

        this.element.appendChild(table);
        updateIcons();
    }

    createRow(source, rowHeader, rowContent) {
        var tr = document.createElement('tr');
        var tdHeader = document.createElement('th');
        tdHeader.innerHTML = rowHeader;
        tr.appendChild(tdHeader);
        for (let index = 0; index < 7; index++) {
            var td = document.createElement('td');
            td.innerHTML = source[index][rowContent];
            tr.appendChild(td);
        }
        return tr;
    }
}

export default WeatherForecast;