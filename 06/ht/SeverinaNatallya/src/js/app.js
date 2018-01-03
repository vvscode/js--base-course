import {
    changeHashByMapState,
    getMapCenterFromHash,
    getUserInfoFetch,
    getCityNameByCoordFetch,
    getForecastByCoordFetch,
    getForecastByCityNameFetch,
    getUserInfoXHR,
    getCityNameByCoordXHR,
    getForecastByCoordXHR,
    getForecastByCityNameXHR,
    changeMapStateByCityName
} from "./services";
import EventBus from "./EventBus";
import Router from "./Router";
import WeatherForecast from "./WeatherForecast";
import RequestHistory from "./RequestHistory";
import FavoriteList from "./FavoriteList";
import YandexMap from "./YandexMap";
var eventBus = new EventBus();
// обработчик для события отправки формы
var form = document.forms.main;
form.addEventListener("submit", ev => {
    ev.preventDefault();
    changeMapStateByCityName(form, eventBus, form.search.value);
});
new WeatherForecast(document.getElementsByClassName("weather")[0], eventBus);
new RequestHistory(document.getElementsByClassName("history")[0], eventBus);
new FavoriteList(document.getElementsByClassName("favorites")[0], eventBus);
////загрузка карты либо по координатам нахождения пользователя, либо из url
getMapCenterFromHash(form.rb.value)
    .then(result => {
        new YandexMap(result, eventBus, ymaps);
        eventBus.trigger("weatherMap:centerChange", result);
    })
    .catch(error => {
        eventBus.trigger("weatherMap:changeForecast", "ошибка получения прогноза");
    });
//при смене центра карты меняется прогноз погоды
eventBus.on("weatherMap:centerChange", center => {
    let [lat, lng] = center;
    let forecastText;
    let getForecastPromise = form.rb.value == "fetch"
        ? getForecastByCoordFetch({ lat, lng })
        : getForecastByCoordXHR({ lat, lng }); // тут единственное различие
    getForecastPromise
        .then(({ temp, descript, humidity, windSpeed }) => {
            forecastText = `<h2>В ближайшие 3 часа ожидается:<br/>температура ${temp} C<br/>влажность ${humidity}%<br/>скорость ветра ${windSpeed} м/с<br/>${descript}</h2>`;
            eventBus.trigger("weatherMap:changeForecast", forecastText);
        })
        .catch(error => {
            eventBus.trigger(
                "weatherMap:changeForecast",
                "ошибка получения прогноза"
            );
        });
});

//обработчик события нажатия кнопки добавить в избранное
eventBus.on("weatherMap:add2Favorite", center => {
    let lat = center[0];
    let lng = center[1];
    if (form.rb.value == "fetch") {
        getCityNameByCoordFetch({ lat, lng }).then(city => {
            eventBus.trigger("weatherMap:changeFavorites", city);
        });
    } else {
        getCityNameByCoordXHR({ lat, lng }).then(city => {
            eventBus.trigger("weatherMap:changeFavorites", city);
        });
    }
});
//маршруты
var router = new Router({
    routes: [
        {
            name: "index", //начальная страница
            match: "",
            onEnter: () => { }
        },
        {
            name: "about", //о программе
            match: "about",
            onEnter: () => {
                document.getElementById("about").hidden = false;
            },
            onLeave: () => {
                document.getElementById("about").hidden = true;
            }
        },
        {
            name: "main", //поддержка поиска города в url
            match: /city=(.+)/i,
            onEnter: city => {
                changeMapStateByCityName(form, eventBus, city);
            }
        },
        {
            name: "map", //при перемещении карты меняются координаты в url
            match: /center=(-?\d*[.]?\d+,-?\d*[.]?\d+)/,
            onEnter: center => { }
        },
        {
            name: "author", //информация об авторе
            match: "author",
            onEnter: () => {
                document.getElementById("author").hidden = false;
            },
            onLeave: () => {
                document.getElementById("author").hidden = true;
            }
        }
    ]
});
