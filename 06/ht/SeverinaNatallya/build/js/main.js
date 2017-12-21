var iStorage = {
    //функции для работы с window.localStorage
    setData: (key, value) =>
        new Promise(function (resolve, reject) {
            window.localStorage.setItem(key, value);
            resolve([key, value]);
        }),
    getData: key =>
        new Promise(function (resolve, reject) {
            let value = window.localStorage.getItem(key);
            resolve(value);
        })
};
//функция для торможения генерации события смены центра карты
function debounce(func, ms) {
    var state = 0;
    var funcArguments;
    var funcThis;
    function wrapper() {
        if (state) {
            funcArguments = arguments;
            funcThis = this;
            return;
        }
        func.apply(this, arguments);
        state = 1;
        setTimeout(function () {
            state = 0;
            if (funcThis) {
                wrapper.apply(funcThis, funcArguments);
                funcArguments = funcThis = null;
            }
        }, ms);
    }
    return wrapper;
}
//отправить координаты карты в url
function changeHashByMapState(center) {
    window.location.hash = `center=${center}`;
}
//считать координаты центра карты из url
function getMapCenterFromHash(kindRequest) {
    return new Promise((resolve, reject) => {
        let reg = /#center=(-?\d*[.]?\d+),(-?\d*[.]?\d+)/;
        let params = window.location.hash.match(reg);
        let center;
        if (params) {
            center = [+params[1], +params[2]];
            resolve(center);
        } else if (kindRequest == "XHR") {
            getUserInfoXHR().then(({ lat, lng }) => {
                center = [+lat, +lng];
                resolve(center);
            });
        } else {
            getUserInfoFetch().then(({ lat, lng }) => {
                center = [+lat, +lng];
                resolve(center);
            });
        }
    });
}
//+++++++++++++++++++++++++fetch+++++++++++++++++++++
//получить положение пользователя
var getUserInfoFetch = () =>
    fetch(`https://api.userinfo.io/userinfos`)
        .then(response => response.json())
        .then(data => {
            return { lat: data.position.latitude, lng: data.position.longitude };
        })
        .catch(() => {
            alert("Ошибка запроса");
        });

//название города по координатам
var getCityNameByCoordFetch = ({ lat, lng }) =>
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&lang=ru&APPID=97248aca315ea6cccb5cf1cab8b0771b`
    )
        .then(response => response.json())
        .then(data => {
            return data.city.name;
        })
        .catch(() => {
            alert("Ошибка запроса");
        });

//прогноз по координатам APIKEY 97248aca315ea6cccb5cf1cab8b0771b
var getForecastByCoordFetch = ({ lat, lng }) =>
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&lang=ru&APPID=97248aca315ea6cccb5cf1cab8b0771b`
    )
        .then(response => response.json())
        .then(data => {
            return {
                temp: data.list[0].main.temp_max,
                descript: data.list[0].weather[0].description,
                humidity: data.list[0].main.humidity,
                windSpeed: data.list[0].wind.speed
            };
        })
        .catch(() => {
            alert("Ошибка запроса");
        });
//прогноз по названию города
var getForecastByCityNameFetch = city =>
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ru&APPID=97248aca315ea6cccb5cf1cab8b0771b`
    )
        .then(response => response.json())
        .then(data => {
            return {
                temp: data.list[0].main.temp_max,
                descript: data.list[0].weather[0].description,
                humidity: data.list[0].main.humidity,
                windSpeed: data.list[0].wind.speed,
                lat: data.city.coord.lat,
                lng: data.city.coord.lon
            };
        })
        .catch(() => {
            alert("Ошибка запроса, проверьте название нас.пункта");
        });

//+++++++++++++++++++++++++++++++++++++++++XHR+++++++++++++++++++
//получить положение пользователя
var getUserInfoXHR = () => {
    return new Promise((resolve, reject) => {
        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос
        xhr.open("GET", "https://api.userinfo.io/userinfos", true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                // обработать ошибку
                alert("ошибка: " + (xhr.status ? xhr.statusText : "запрос не удался"));
                reject();
            } else {
                let data = JSON.parse(xhr.response);
                resolve({ lat: data.position.latitude, lng: data.position.longitude });
            }
        };
    });
};
var getCityNameByCoordXHR = ({ lat, lng }) => {
    return new Promise((resolve, reject) => {
        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос
        xhr.open(
            "GET",
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&lang=ru&APPID=97248aca315ea6cccb5cf1cab8b0771b`,
            true
        );
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                // обработать ошибку
                alert("ошибка: " + (xhr.status ? xhr.statusText : "запрос не удался"));
                reject();
            } else {
                let data = JSON.parse(xhr.response);
                resolve(data.city.name);
            }
        };
    });
};
////прогноз по координатам
var getForecastByCoordXHR = ({ lat, lng }) => {
    return new Promise((resolve, reject) => {
        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос
        xhr.open(
            "GET",
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&lang=ru&APPID=97248aca315ea6cccb5cf1cab8b0771b`,
            true
        );
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                // обработать ошибку
                alert("ошибка: " + (xhr.status ? xhr.statusText : "запрос не удался"));
                reject();
            } else {
                let data = JSON.parse(xhr.response);
                resolve({
                    temp: data.list[0].main.temp_max,
                    descript: data.list[0].weather[0].description,
                    humidity: data.list[0].main.humidity,
                    windSpeed: data.list[0].wind.speed
                });
            }
        };
    });
};
//прогноз по названию города
var getForecastByCityNameXHR = city => {
    return new Promise((resolve, reject) => {
        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос
        xhr.open(
            "GET",
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ru&APPID=97248aca315ea6cccb5cf1cab8b0771b`,
            true
        );
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                // обработать ошибку
                alert(
                    "ошибка: " +
                    (xhr.status
                        ? xhr.statusText
                        : "запрос не удался, проверьте название нас.пункта")
                );
                reject();
            } else {
                let data = JSON.parse(xhr.response);
                resolve({
                    temp: data.list[0].main.temp_max,
                    descript: data.list[0].weather[0].description,
                    humidity: data.list[0].main.humidity,
                    windSpeed: data.list[0].wind.speed,
                    lat: data.city.coord.lat,
                    lng: data.city.coord.lon
                });
            }
        };
    });
};
﻿function EventBus() {
    this.listeners = {};
}
EventBus.prototype.trigger = function (event, data) {
    (this.listeners[event] || []).forEach(cb => {
        if (typeof cb === "function") {
            cb.apply(null, [].slice.call(arguments, 1));
        }
    });
};
EventBus.prototype.on = function (event, cb) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
};
EventBus.prototype.off = function (event, cb) {
    if (!cb) {
        this.listeners[event] = (this.listeners[event] || []).lenght = 0;
        return;
    }
    this.listeners[event] = (this.listeners[event] || [])
        .filter(listener => listener !== cb);
};
EventBus.prototype.once = function (event, cb) {
    var item = this;
    this.on(event, function f() {
        cb.apply(null, arguments);
        item.off(event, f);
    });
};
﻿var Router = function (options) {
    this.routes = options.routes || [];
    this.prevRoute;
    this.prevParam;
    this.activeRoute;
    this.activeParam;
    window.addEventListener("hashchange", () =>
        //обаботка события изменения url
        this.handleHashChange(window.location.hash)
    );
    this.handleHashChange(window.location.hash); //при перезагрузке станицы вызвать нужные функции
};
//обработчик смены url
Router.prototype.handleHashChange = function (url) {
    url = url.slice(1);
    this.routes.forEach((item, i, arr) => {
        if (typeof item.match === "string" && item.match === url) {
            this.activeRoute = item;
        } else if (typeof item.match === "function" && item.match(url)) {
            this.activeRoute = item;
        } else if (item.match instanceof RegExp && item.match.test(url)) {
            this.activeRoute = item;
        }
    });
    this.activeParam = this.getParams(url);
    this.execFunctions();
};
//извлечение параметров из url
Router.prototype.getParams = function (url) {
    let params = url.match(this.activeRoute.match) || [];
    if (params.length == 2) return params[1];
    return params;
    ////var params = url.match(this.activeRoute.match) || [];
    ////params.shift();
    ////return params;
};
//запуск функций из маршрутов
Router.prototype.execFunctions = function () {
    Promise.resolve()
        .then(() => {
            this.prevRoute &&
                this.prevRoute.onLeave &&
                this.prevRoute.onLeave(this.prevParam);
        })
        .then(() => {
            this.activeRoute &&
                this.activeRoute.onBeforeEnter &&
                this.activeRoute.onBeforeEnter(this.activeParam);
        })
        .then(() => {
            this.activeRoute &&
                this.activeRoute.onEnter &&
                this.activeRoute.onEnter(this.activeParam);
        })
        .then(() => {
            this.prevRoute = this.activeRoute;
            this.prevParam = this.activeParam;
        })
        .catch(() => alert("маршрут отсутствует"));
};
﻿(function () {
    var WeatherForecast = function (htmlEl, eventBus) {
        this.htmlEl = htmlEl;
        this.eventBus = eventBus;
        this.eventBus.on("weatherMap:changeForecast", text => this.render(text));
    };
    WeatherForecast.prototype.render = function (text) {
        this.htmlEl.innerHTML = text;
    };
    window.WeatherForecast = WeatherForecast;
})();
﻿(function (storage) {
    var RequestHistory = function (htmlEl, eventBus) {
        this.htmlEl = htmlEl;
        this.eventBus = eventBus;
        this.historyList;
        this.render();
        //подписка на событие изменения истории запросов
        this.eventBus.on("weatherMap:changeHistory", centerCity => {
            storage
                .getData("historyList")
                .then(result => {
                    if (result) {
                        this.historyList = result.split(",");
                    } else {
                        this.historyList = [];
                    }
                    this.historyList.unshift(centerCity);//добавляем первым элементом
                    if (this.historyList.length > 5) {//если больше 5 удаляем последний
                        this.historyList.pop();
                    }
                    return this.historyList.join(",");
                })
                .then(result => {
                    storage.setData("historyList", result);
                })
                .then(() => {
                    this.render();
                })
                .catch(() => {
                    console.log("ошибка добавления истории");
                });
        });
    };
    //функция отрисовки компонента
    RequestHistory.prototype.render = function () {
        storage.getData("historyList").then(result => {
            if (result) {
                this.historyList = result.split(",");
            } else {
                this.historyList = [];
            }
            let htmlText = "<ul>";
            for (let i = 0; i < this.historyList.length; i++) {
                htmlText += `<li><a href="#city=${this.historyList[i]}">${this
                    .historyList[i]}</a></li>`;
            }
            htmlText += "</ul>";
            this.htmlEl.innerHTML = htmlText;
        });
    };
    window.RequestHistory = RequestHistory;
})(iStorage);
﻿(function (storage) {
    var FavoriteList = function (htmlEl, eventBus) {
        this.htmlEl = htmlEl;
        this.eventBus = eventBus;
        this.favoritesList;
        this.render();
        //обработчик для удаления записи
        this.htmlEl.onclick = event => {
            if (event.target.className == "btnDelete") {
                let cityName = event.target.previousSibling.text;//название города, который удалить
                if (typeof this.favoritesList === "string") {//если в this.favoritesList данные в строке делаем массив
                    this.favoritesList = this.favoritesList.split(",");
                }
                var resultList = this.favoritesList.filter(function (item) {//убираем из массива элементы с совпадающим названием города
                    return item != cityName;
                });
                this.favoritesList = resultList.join(",");//преобразуем массив в сторку
                storage.setData("favoritesList", this.favoritesList).then(() => {//помещаем обновленные данные в storage
                    this.render();
                });
            }
        };
        //подписка на событие добавления записи в избранное (перерисовываем компонент)
        this.eventBus.on("weatherMap:changeFavorites", centerCity => {
            storage
                .getData("favoritesList")
                .then(result => {
                    if (result) {
                        this.favoritesList = result.split(",");
                    } else {
                        this.favoritesList = [];
                    }
                    this.favoritesList.unshift(centerCity);
                    return this.favoritesList.join(",");
                })
                .then(result => {
                    storage.setData("favoritesList", result);
                })
                .then(() => {
                    this.render();
                })
                .catch(() => {
                    console.log("ошибка добавления избранного");
                });
        });
    };
    //функция отрисовки компонента
    FavoriteList.prototype.render = function () {
        storage
            .getData("favoritesList")
            .then(result => {
                if (result) {
                    this.favoritesList = result.split(",");
                } else {
                    this.favoritesList = [];
                }
                let htmlText = "<ul>";
                for (let i = 0; i < this.favoritesList.length; i++) {
                    htmlText += `<li value="${this.favoritesList[
                        i
                    ]}"><a href="#city=${this.favoritesList[i]}">${this.favoritesList[
                    i
                    ]}</a><button class="btnDelete">X</button ></li>`;
                }
                htmlText += "</ul>";
                this.htmlEl.innerHTML = htmlText;
            })
            .catch(() => {
                console.log("ошибка удаления");
            });
    };
    window.FavoriteList = FavoriteList;
})(iStorage);
﻿(function (debounce, changeHashByMapState) {
    var YandexMap = function (center, eventBus) {
        this.map;
        this.center = center;
        this.eventBus = eventBus;
        this.ymaps = ymaps;
        this.ymaps.ready(() => this.drawMap());
    };
    //функция рисующая карту
    YandexMap.prototype.drawMap = function () {
        this.map = new this.ymaps.Map("myMap", {
            center: this.center,
            controls: ["zoomControl"],
            zoom: 10
        });
        //кнопка добавить в избранное
        var btnAdd2Favor = new this.ymaps.control.Button({
            data: {
                image: "favorites.png"
            },
            options: {
                float: "right"
            }
        });
        this.map.controls.add(btnAdd2Favor);
        this.addHandlers(btnAdd2Favor);
    };
    //подписка на события перемещения карты и нажатие на кнопку добавить в избранное
    YandexMap.prototype.addHandlers = function (btnAdd2Favor) {
        btnAdd2Favor.events.add("click", e => {
            this.center = this.map.getCenter();
            this.eventBus.trigger("weatherMap:add2Favorite", this.center);
        });
        this.map.events.add(
            "boundschange",
            debounce(e => {
                //для не слишком частой генерации события
                this.eventBus.trigger("weatherMap:centerChange", e.get("newCenter"));
                changeHashByMapState(e.get("newCenter"));
            }, 2000)
        );
        this.eventBus.on("weatherMap:setMapCenter", center => {
            this.center = center;
            this.render();
        });
    };
    //перерисовка карты с указанным центром
    YandexMap.prototype.render = function () {
        this.map.panTo(this.center, { duration: 2000 });
    };
    window.YandexMap = YandexMap;
})(debounce, changeHashByMapState);
﻿(function () {
    var eventBus = new EventBus();
    //обработчик для события отправки формы
    var form = document.forms.main;
    form.addEventListener("submit", ev => {
        ev.preventDefault();
        changeMapStateByCityName(form, eventBus, form.search.value);
    });
    //компонент прогноза
    new window.WeatherForecast(
        document.getElementsByClassName("weather")[0],
        eventBus
    );
    //компонент истории запросов
    new window.RequestHistory(
        document.getElementsByClassName("history")[0],
        eventBus
    );
    //компонент избранных
    new window.FavoriteList(
        document.getElementsByClassName("favorites")[0],
        eventBus
    );
    //загрузка карты либо по координатам нахождения пользователя, либо из url
    getMapCenterFromHash(form.rb.value)
        .then(result => {
            new window.YandexMap(result, eventBus);
            eventBus.trigger("weatherMap:centerChange", result);
        })
        .catch(error => {
            eventBus.trigger(
                "weatherMap:changeForecast",
                "ошибка получения прогноза"
            );
        });
    //при смене центра карты меняется прогноз погоды
    eventBus.on("weatherMap:centerChange", center => {
        let lat = center[0];
        let lng = center[1];
        let forecastText;
        if (form.rb.value == "fetch") {
            getForecastByCoordFetch({
                lat,
                lng
            })
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
        } else {
            getForecastByCoordXHR({
                lat,
                lng
            })
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
        }
    });
    //установление центра карты и соответствующего прогноза по названию города
    function changeMapStateByCityName(form, eventBus, city) {
        let forecastText;
        if (form.rb.value == "fetch") {
            getForecastByCityNameFetch(city)
                .then(({ temp, descript, humidity, windSpeed, lat, lng }) => {
                    forecastText = `<h2>В ближайшие 3 часа ожидается:<br/>температура ${temp} C<br/>влажность ${humidity}%<br/>скорость ветра ${windSpeed} м/с<br/>${descript}</h2>`;
                    eventBus.trigger("weatherMap:changeForecast", forecastText);
                    eventBus.trigger("weatherMap:setMapCenter", [+lat, +lng]);
                    eventBus.trigger("weatherMap:changeHistory", city);
                })
                .catch(error => {
                    eventBus.trigger(
                        "weatherMap:changeForecast",
                        "ошибка получения прогноза"
                    );
                });
        } else {
            getForecastByCityNameXHR(city)
                .then(({ temp, descript, humidity, windSpeed, lat, lng }) => {
                    forecastText = `<h2>В ближайшие 3 часа ожидается:<br/>температура ${temp} C<br/>влажность ${humidity}%<br/>скорость ветра ${windSpeed} м/с<br/>${descript}</h2>`;
                    eventBus.trigger("weatherMap:changeForecast", forecastText);
                    eventBus.trigger("weatherMap:setMapCenter", [+lat, +lng]);

                    eventBus.trigger("weatherMap:changeHistory", city);
                })
                .catch(error => {
                    eventBus.trigger(
                        "weatherMap:changeForecast",
                        "ошибка получения прогноза"
                    );
                });
        }
    }
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
                onEnter: () => {
                    //  alert("Index");
                    // var map = new window.YandexMap(centerMap, eventBus);
                }
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

                    // eventBus.trigger("weatherMap:setMapCenter", centerMap);
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
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIu+7v3ZhciBpU3RvcmFnZSA9IHtcclxuICAgIC8v0YTRg9C90LrRhtC40Lgg0LTQu9GPINGA0LDQsdC+0YLRiyDRgSB3aW5kb3cubG9jYWxTdG9yYWdlXHJcbiAgICBzZXREYXRhOiAoa2V5LCB2YWx1ZSkgPT5cclxuICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShba2V5LCB2YWx1ZV0pO1xyXG4gICAgICAgIH0pLFxyXG4gICAgZ2V0RGF0YToga2V5ID0+XHJcbiAgICAgICAgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICAgICAgfSlcclxufTtcclxuLy/RhNGD0L3QutGG0LjRjyDQtNC70Y8g0YLQvtGA0LzQvtC20LXQvdC40Y8g0LPQtdC90LXRgNCw0YbQuNC4INGB0L7QsdGL0YLQuNGPINGB0LzQtdC90Ysg0YbQtdC90YLRgNCwINC60LDRgNGC0YtcclxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgbXMpIHtcclxuICAgIHZhciBzdGF0ZSA9IDA7XHJcbiAgICB2YXIgZnVuY0FyZ3VtZW50cztcclxuICAgIHZhciBmdW5jVGhpcztcclxuICAgIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGZ1bmNBcmd1bWVudHMgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgICAgIGZ1bmNUaGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgc3RhdGUgPSAxO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChmdW5jVGhpcykge1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5hcHBseShmdW5jVGhpcywgZnVuY0FyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBmdW5jQXJndW1lbnRzID0gZnVuY1RoaXMgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgbXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdyYXBwZXI7XHJcbn1cclxuLy/QvtGC0L/RgNCw0LLQuNGC0Ywg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LrQsNGA0YLRiyDQsiB1cmxcclxuZnVuY3Rpb24gY2hhbmdlSGFzaEJ5TWFwU3RhdGUoY2VudGVyKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGBjZW50ZXI9JHtjZW50ZXJ9YDtcclxufVxyXG4vL9GB0YfQuNGC0LDRgtGMINC60L7QvtGA0LTQuNC90LDRgtGLINGG0LXQvdGC0YDQsCDQutCw0YDRgtGLINC40LcgdXJsXHJcbmZ1bmN0aW9uIGdldE1hcENlbnRlckZyb21IYXNoKGtpbmRSZXF1ZXN0KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGxldCByZWcgPSAvI2NlbnRlcj0oLT9cXGQqWy5dP1xcZCspLCgtP1xcZCpbLl0/XFxkKykvO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5tYXRjaChyZWcpO1xyXG4gICAgICAgIGxldCBjZW50ZXI7XHJcbiAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICBjZW50ZXIgPSBbK3BhcmFtc1sxXSwgK3BhcmFtc1syXV07XHJcbiAgICAgICAgICAgIHJlc29sdmUoY2VudGVyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGtpbmRSZXF1ZXN0ID09IFwiWEhSXCIpIHtcclxuICAgICAgICAgICAgZ2V0VXNlckluZm9YSFIoKS50aGVuKCh7IGxhdCwgbG5nIH0pID0+IHtcclxuICAgICAgICAgICAgICAgIGNlbnRlciA9IFsrbGF0LCArbG5nXTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoY2VudGVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2V0VXNlckluZm9GZXRjaCgpLnRoZW4oKHsgbGF0LCBsbmcgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyID0gWytsYXQsICtsbmddO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjZW50ZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4vLysrKysrKysrKysrKysrKysrKysrKysrKytmZXRjaCsrKysrKysrKysrKysrKysrKysrK1xyXG4vL9C/0L7Qu9GD0YfQuNGC0Ywg0L/QvtC70L7QttC10L3QuNC1INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG52YXIgZ2V0VXNlckluZm9GZXRjaCA9ICgpID0+XHJcbiAgICBmZXRjaChgaHR0cHM6Ly9hcGkudXNlcmluZm8uaW8vdXNlcmluZm9zYClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGxhdDogZGF0YS5wb3NpdGlvbi5sYXRpdHVkZSwgbG5nOiBkYXRhLnBvc2l0aW9uLmxvbmdpdHVkZSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQntGI0LjQsdC60LAg0LfQsNC/0YDQvtGB0LBcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4vL9C90LDQt9Cy0LDQvdC40LUg0LPQvtGA0L7QtNCwINC/0L4g0LrQvtC+0YDQtNC40L3QsNGC0LDQvFxyXG52YXIgZ2V0Q2l0eU5hbWVCeUNvb3JkRmV0Y2ggPSAoeyBsYXQsIGxuZyB9KSA9PlxyXG4gICAgZmV0Y2goXHJcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHtsYXR9Jmxvbj0ke2xuZ30mdW5pdHM9bWV0cmljJmxhbmc9cnUmQVBQSUQ9OTcyNDhhY2EzMTVlYTZjY2NiNWNmMWNhYjhiMDc3MWJgXHJcbiAgICApXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5jaXR5Lm5hbWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChcItCe0YjQuNCx0LrQsCDQt9Cw0L/RgNC+0YHQsFwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbi8v0L/RgNC+0LPQvdC+0Lcg0L/QviDQutC+0L7RgNC00LjQvdCw0YLQsNC8IEFQSUtFWSA5NzI0OGFjYTMxNWVhNmNjY2I1Y2YxY2FiOGIwNzcxYlxyXG52YXIgZ2V0Rm9yZWNhc3RCeUNvb3JkRmV0Y2ggPSAoeyBsYXQsIGxuZyB9KSA9PlxyXG4gICAgZmV0Y2goXHJcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHtsYXR9Jmxvbj0ke2xuZ30mdW5pdHM9bWV0cmljJmxhbmc9cnUmQVBQSUQ9OTcyNDhhY2EzMTVlYTZjY2NiNWNmMWNhYjhiMDc3MWJgXHJcbiAgICApXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGVtcDogZGF0YS5saXN0WzBdLm1haW4udGVtcF9tYXgsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdDogZGF0YS5saXN0WzBdLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBodW1pZGl0eTogZGF0YS5saXN0WzBdLm1haW4uaHVtaWRpdHksXHJcbiAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IGRhdGEubGlzdFswXS53aW5kLnNwZWVkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChcItCe0YjQuNCx0LrQsCDQt9Cw0L/RgNC+0YHQsFwiKTtcclxuICAgICAgICB9KTtcclxuLy/Qv9GA0L7Qs9C90L7QtyDQv9C+INC90LDQt9Cy0LDQvdC40Y4g0LPQvtGA0L7QtNCwXHJcbnZhciBnZXRGb3JlY2FzdEJ5Q2l0eU5hbWVGZXRjaCA9IGNpdHkgPT5cclxuICAgIGZldGNoKFxyXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZsYW5nPXJ1JkFQUElEPTk3MjQ4YWNhMzE1ZWE2Y2NjYjVjZjFjYWI4YjA3NzFiYFxyXG4gICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRlbXA6IGRhdGEubGlzdFswXS5tYWluLnRlbXBfbWF4LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHQ6IGRhdGEubGlzdFswXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgaHVtaWRpdHk6IGRhdGEubGlzdFswXS5tYWluLmh1bWlkaXR5LFxyXG4gICAgICAgICAgICAgICAgd2luZFNwZWVkOiBkYXRhLmxpc3RbMF0ud2luZC5zcGVlZCxcclxuICAgICAgICAgICAgICAgIGxhdDogZGF0YS5jaXR5LmNvb3JkLmxhdCxcclxuICAgICAgICAgICAgICAgIGxuZzogZGF0YS5jaXR5LmNvb3JkLmxvblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQntGI0LjQsdC60LAg0LfQsNC/0YDQvtGB0LAsINC/0YDQvtCy0LXRgNGM0YLQtSDQvdCw0LfQstCw0L3QuNC1INC90LDRgS7Qv9GD0L3QutGC0LBcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrWEhSKysrKysrKysrKysrKysrKysrK1xyXG4vL9C/0L7Qu9GD0YfQuNGC0Ywg0L/QvtC70L7QttC10L3QuNC1INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG52YXIgZ2V0VXNlckluZm9YSFIgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIDEuINCh0L7Qt9C00LDRkdC8INC90L7QstGL0Lkg0L7QsdGK0LXQutGCIFhNTEh0dHBSZXF1ZXN0XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIC8vIDIuINCa0L7QvdGE0LjQs9GD0YDQuNGA0YPQtdC8INC10LPQvjogR0VULdC30LDQv9GA0L7RgVxyXG4gICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIFwiaHR0cHM6Ly9hcGkudXNlcmluZm8uaW8vdXNlcmluZm9zXCIsIHRydWUpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9IDQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtCw0YLRjCDQvtGI0LjQsdC60YNcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi0L7RiNC40LHQutCwOiBcIiArICh4aHIuc3RhdHVzID8geGhyLnN0YXR1c1RleHQgOiBcItC30LDQv9GA0L7RgSDQvdC1INGD0LTQsNC70YHRj1wiKSk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IGxhdDogZGF0YS5wb3NpdGlvbi5sYXRpdHVkZSwgbG5nOiBkYXRhLnBvc2l0aW9uLmxvbmdpdHVkZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxufTtcclxudmFyIGdldENpdHlOYW1lQnlDb29yZFhIUiA9ICh7IGxhdCwgbG5nIH0pID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgLy8gMS4g0KHQvtC30LTQsNGR0Lwg0L3QvtCy0YvQuSDQvtCx0YrQtdC60YIgWE1MSHR0cFJlcXVlc3RcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgLy8gMi4g0JrQvtC90YTQuNCz0YPRgNC40YDRg9C10Lwg0LXQs9C+OiBHRVQt0LfQsNC/0YDQvtGBXHJcbiAgICAgICAgeGhyLm9wZW4oXHJcbiAgICAgICAgICAgIFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PSR7bGF0fSZsb249JHtsbmd9JnVuaXRzPW1ldHJpYyZsYW5nPXJ1JkFQUElEPTk3MjQ4YWNhMzE1ZWE2Y2NjYjVjZjFjYWI4YjA3NzFiYCxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT0gNCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPSAyMDApIHtcclxuICAgICAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0LDRgtGMINC+0YjQuNCx0LrRg1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLQvtGI0LjQsdC60LA6IFwiICsgKHhoci5zdGF0dXMgPyB4aHIuc3RhdHVzVGV4dCA6IFwi0LfQsNC/0YDQvtGBINC90LUg0YPQtNCw0LvRgdGPXCIpKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEuY2l0eS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxufTtcclxuLy8vL9C/0YDQvtCz0L3QvtC3INC/0L4g0LrQvtC+0YDQtNC40L3QsNGC0LDQvFxyXG52YXIgZ2V0Rm9yZWNhc3RCeUNvb3JkWEhSID0gKHsgbGF0LCBsbmcgfSkgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAvLyAxLiDQodC+0LfQtNCw0ZHQvCDQvdC+0LLRi9C5INC+0LHRitC10LrRgiBYTUxIdHRwUmVxdWVzdFxyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAvLyAyLiDQmtC+0L3RhNC40LPRg9GA0LjRgNGD0LXQvCDQtdCz0L46IEdFVC3Qt9Cw0L/RgNC+0YFcclxuICAgICAgICB4aHIub3BlbihcclxuICAgICAgICAgICAgXCJHRVRcIixcclxuICAgICAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHtsYXR9Jmxvbj0ke2xuZ30mdW5pdHM9bWV0cmljJmxhbmc9cnUmQVBQSUQ9OTcyNDhhY2EzMTVlYTZjY2NiNWNmMWNhYjhiMDc3MWJgLFxyXG4gICAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPSA0KSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLQsNGC0Ywg0L7RiNC40LHQutGDXHJcbiAgICAgICAgICAgICAgICBhbGVydChcItC+0YjQuNCx0LrQsDogXCIgKyAoeGhyLnN0YXR1cyA/IHhoci5zdGF0dXNUZXh0IDogXCLQt9Cw0L/RgNC+0YEg0L3QtSDRg9C00LDQu9GB0Y9cIikpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXA6IGRhdGEubGlzdFswXS5tYWluLnRlbXBfbWF4LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0OiBkYXRhLmxpc3RbMF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBodW1pZGl0eTogZGF0YS5saXN0WzBdLm1haW4uaHVtaWRpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZFNwZWVkOiBkYXRhLmxpc3RbMF0ud2luZC5zcGVlZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn07XHJcbi8v0L/RgNC+0LPQvdC+0Lcg0L/QviDQvdCw0LfQstCw0L3QuNGOINCz0L7RgNC+0LTQsFxyXG52YXIgZ2V0Rm9yZWNhc3RCeUNpdHlOYW1lWEhSID0gY2l0eSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIDEuINCh0L7Qt9C00LDRkdC8INC90L7QstGL0Lkg0L7QsdGK0LXQutGCIFhNTEh0dHBSZXF1ZXN0XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIC8vIDIuINCa0L7QvdGE0LjQs9GD0YDQuNGA0YPQtdC8INC10LPQvjogR0VULdC30LDQv9GA0L7RgVxyXG4gICAgICAgIHhoci5vcGVuKFxyXG4gICAgICAgICAgICBcIkdFVFwiLFxyXG4gICAgICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5fSZ1bml0cz1tZXRyaWMmbGFuZz1ydSZBUFBJRD05NzI0OGFjYTMxNWVhNmNjY2I1Y2YxY2FiOGIwNzcxYmAsXHJcbiAgICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9IDQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtCw0YLRjCDQvtGI0LjQsdC60YNcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFxyXG4gICAgICAgICAgICAgICAgICAgIFwi0L7RiNC40LHQutCwOiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgKHhoci5zdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyB4aHIuc3RhdHVzVGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwi0LfQsNC/0YDQvtGBINC90LUg0YPQtNCw0LvRgdGPLCDQv9GA0L7QstC10YDRjNGC0LUg0L3QsNC30LLQsNC90LjQtSDQvdCw0YEu0L/Rg9C90LrRgtCwXCIpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXA6IGRhdGEubGlzdFswXS5tYWluLnRlbXBfbWF4LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0OiBkYXRhLmxpc3RbMF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBodW1pZGl0eTogZGF0YS5saXN0WzBdLm1haW4uaHVtaWRpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZFNwZWVkOiBkYXRhLmxpc3RbMF0ud2luZC5zcGVlZCxcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IGRhdGEuY2l0eS5jb29yZC5sYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBkYXRhLmNpdHkuY29vcmQubG9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxufTtcclxu77u/ZnVuY3Rpb24gRXZlbnRCdXMoKSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG59XHJcbkV2ZW50QnVzLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAodGhpcy5saXN0ZW5lcnNbZXZlbnRdIHx8IFtdKS5mb3JFYWNoKGNiID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGNiID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgY2IuYXBwbHkobnVsbCwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuRXZlbnRCdXMucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBjYikge1xyXG4gICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdIHx8IFtdO1xyXG4gICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnB1c2goY2IpO1xyXG59O1xyXG5FdmVudEJ1cy5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBjYikge1xyXG4gICAgaWYgKCFjYikge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9ICh0aGlzLmxpc3RlbmVyc1tldmVudF0gfHwgW10pLmxlbmdodCA9IDA7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdID0gKHRoaXMubGlzdGVuZXJzW2V2ZW50XSB8fCBbXSlcclxuICAgICAgICAuZmlsdGVyKGxpc3RlbmVyID0+IGxpc3RlbmVyICE9PSBjYik7XHJcbn07XHJcbkV2ZW50QnVzLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBjYikge1xyXG4gICAgdmFyIGl0ZW0gPSB0aGlzO1xyXG4gICAgdGhpcy5vbihldmVudCwgZnVuY3Rpb24gZigpIHtcclxuICAgICAgICBjYi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIGl0ZW0ub2ZmKGV2ZW50LCBmKTtcclxuICAgIH0pO1xyXG59O1xyXG7vu792YXIgUm91dGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHRoaXMucm91dGVzID0gb3B0aW9ucy5yb3V0ZXMgfHwgW107XHJcbiAgICB0aGlzLnByZXZSb3V0ZTtcclxuICAgIHRoaXMucHJldlBhcmFtO1xyXG4gICAgdGhpcy5hY3RpdmVSb3V0ZTtcclxuICAgIHRoaXMuYWN0aXZlUGFyYW07XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgKCkgPT5cclxuICAgICAgICAvL9C+0LHQsNCx0L7RgtC60LAg0YHQvtCx0YvRgtC40Y8g0LjQt9C80LXQvdC10L3QuNGPIHVybFxyXG4gICAgICAgIHRoaXMuaGFuZGxlSGFzaENoYW5nZSh3aW5kb3cubG9jYXRpb24uaGFzaClcclxuICAgICk7XHJcbiAgICB0aGlzLmhhbmRsZUhhc2hDaGFuZ2Uod2luZG93LmxvY2F0aW9uLmhhc2gpOyAvL9C/0YDQuCDQv9C10YDQtdC30LDQs9GA0YPQt9C60LUg0YHRgtCw0L3QuNGG0Ysg0LLRi9C30LLQsNGC0Ywg0L3Rg9C20L3Ri9C1INGE0YPQvdC60YbQuNC4XHJcbn07XHJcbi8v0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvNC10L3RiyB1cmxcclxuUm91dGVyLnByb3RvdHlwZS5oYW5kbGVIYXNoQ2hhbmdlID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgdXJsID0gdXJsLnNsaWNlKDEpO1xyXG4gICAgdGhpcy5yb3V0ZXMuZm9yRWFjaCgoaXRlbSwgaSwgYXJyKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLm1hdGNoID09PSBcInN0cmluZ1wiICYmIGl0ZW0ubWF0Y2ggPT09IHVybCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVJvdXRlID0gaXRlbTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLm1hdGNoID09PSBcImZ1bmN0aW9uXCIgJiYgaXRlbS5tYXRjaCh1cmwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUm91dGUgPSBpdGVtO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5tYXRjaCBpbnN0YW5jZW9mIFJlZ0V4cCAmJiBpdGVtLm1hdGNoLnRlc3QodXJsKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVJvdXRlID0gaXRlbTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlUGFyYW0gPSB0aGlzLmdldFBhcmFtcyh1cmwpO1xyXG4gICAgdGhpcy5leGVjRnVuY3Rpb25zKCk7XHJcbn07XHJcbi8v0LjQt9Cy0LvQtdGH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LIg0LjQtyB1cmxcclxuUm91dGVyLnByb3RvdHlwZS5nZXRQYXJhbXMgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICBsZXQgcGFyYW1zID0gdXJsLm1hdGNoKHRoaXMuYWN0aXZlUm91dGUubWF0Y2gpIHx8IFtdO1xyXG4gICAgaWYgKHBhcmFtcy5sZW5ndGggPT0gMikgcmV0dXJuIHBhcmFtc1sxXTtcclxuICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAvLy8vdmFyIHBhcmFtcyA9IHVybC5tYXRjaCh0aGlzLmFjdGl2ZVJvdXRlLm1hdGNoKSB8fCBbXTtcclxuICAgIC8vLy9wYXJhbXMuc2hpZnQoKTtcclxuICAgIC8vLy9yZXR1cm4gcGFyYW1zO1xyXG59O1xyXG4vL9C30LDQv9GD0YHQuiDRhNGD0L3QutGG0LjQuSDQuNC3INC80LDRgNGI0YDRg9GC0L7QslxyXG5Sb3V0ZXIucHJvdG90eXBlLmV4ZWNGdW5jdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2Um91dGUgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldlJvdXRlLm9uTGVhdmUgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldlJvdXRlLm9uTGVhdmUodGhpcy5wcmV2UGFyYW0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVJvdXRlICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVJvdXRlLm9uQmVmb3JlRW50ZXIgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUm91dGUub25CZWZvcmVFbnRlcih0aGlzLmFjdGl2ZVBhcmFtKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVSb3V0ZSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVSb3V0ZS5vbkVudGVyICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVJvdXRlLm9uRW50ZXIodGhpcy5hY3RpdmVQYXJhbSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldlJvdXRlID0gdGhpcy5hY3RpdmVSb3V0ZTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2UGFyYW0gPSB0aGlzLmFjdGl2ZVBhcmFtO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IGFsZXJ0KFwi0LzQsNGA0YjRgNGD0YIg0L7RgtGB0YPRgtGB0YLQstGD0LXRglwiKSk7XHJcbn07XHJcbu+7vyhmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgV2VhdGhlckZvcmVjYXN0ID0gZnVuY3Rpb24gKGh0bWxFbCwgZXZlbnRCdXMpIHtcclxuICAgICAgICB0aGlzLmh0bWxFbCA9IGh0bWxFbDtcclxuICAgICAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XHJcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5vbihcIndlYXRoZXJNYXA6Y2hhbmdlRm9yZWNhc3RcIiwgdGV4dCA9PiB0aGlzLnJlbmRlcih0ZXh0KSk7XHJcbiAgICB9O1xyXG4gICAgV2VhdGhlckZvcmVjYXN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgIHRoaXMuaHRtbEVsLmlubmVySFRNTCA9IHRleHQ7XHJcbiAgICB9O1xyXG4gICAgd2luZG93LldlYXRoZXJGb3JlY2FzdCA9IFdlYXRoZXJGb3JlY2FzdDtcclxufSkoKTtcclxu77u/KGZ1bmN0aW9uIChzdG9yYWdlKSB7XHJcbiAgICB2YXIgUmVxdWVzdEhpc3RvcnkgPSBmdW5jdGlvbiAoaHRtbEVsLCBldmVudEJ1cykge1xyXG4gICAgICAgIHRoaXMuaHRtbEVsID0gaHRtbEVsO1xyXG4gICAgICAgIHRoaXMuZXZlbnRCdXMgPSBldmVudEJ1cztcclxuICAgICAgICB0aGlzLmhpc3RvcnlMaXN0O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgLy/Qv9C+0LTQv9C40YHQutCwINC90LAg0YHQvtCx0YvRgtC40LUg0LjQt9C80LXQvdC10L3QuNGPINC40YHRgtC+0YDQuNC4INC30LDQv9GA0L7RgdC+0LJcclxuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKFwid2VhdGhlck1hcDpjaGFuZ2VIaXN0b3J5XCIsIGNlbnRlckNpdHkgPT4ge1xyXG4gICAgICAgICAgICBzdG9yYWdlXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YShcImhpc3RvcnlMaXN0XCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXN0b3J5TGlzdCA9IHJlc3VsdC5zcGxpdChcIixcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXN0b3J5TGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnlMaXN0LnVuc2hpZnQoY2VudGVyQ2l0eSk7Ly/QtNC+0LHQsNCy0LvRj9C10Lwg0L/QtdGA0LLRi9C8INGN0LvQtdC80LXQvdGC0L7QvFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCA+IDUpIHsvL9C10YHQu9C4INCx0L7Qu9GM0YjQtSA1INGD0LTQsNC70Y/QtdC8INC/0L7RgdC70LXQtNC90LjQuVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnlMaXN0LnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oaXN0b3J5TGlzdC5qb2luKFwiLFwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0RGF0YShcImhpc3RvcnlMaXN0XCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItC+0YjQuNCx0LrQsCDQtNC+0LHQsNCy0LvQtdC90LjRjyDQuNGB0YLQvtGA0LjQuFwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8v0YTRg9C90LrRhtC40Y8g0L7RgtGA0LjRgdC+0LLQutC4INC60L7QvNC/0L7QvdC10L3RgtCwXHJcbiAgICBSZXF1ZXN0SGlzdG9yeS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHN0b3JhZ2UuZ2V0RGF0YShcImhpc3RvcnlMaXN0XCIpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaXN0b3J5TGlzdCA9IHJlc3VsdC5zcGxpdChcIixcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnlMaXN0ID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGh0bWxUZXh0ID0gXCI8dWw+XCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaHRtbFRleHQgKz0gYDxsaT48YSBocmVmPVwiI2NpdHk9JHt0aGlzLmhpc3RvcnlMaXN0W2ldfVwiPiR7dGhpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5oaXN0b3J5TGlzdFtpXX08L2E+PC9saT5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0bWxUZXh0ICs9IFwiPC91bD5cIjtcclxuICAgICAgICAgICAgdGhpcy5odG1sRWwuaW5uZXJIVE1MID0gaHRtbFRleHQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgd2luZG93LlJlcXVlc3RIaXN0b3J5ID0gUmVxdWVzdEhpc3Rvcnk7XHJcbn0pKGlTdG9yYWdlKTtcclxu77u/KGZ1bmN0aW9uIChzdG9yYWdlKSB7XHJcbiAgICB2YXIgRmF2b3JpdGVMaXN0ID0gZnVuY3Rpb24gKGh0bWxFbCwgZXZlbnRCdXMpIHtcclxuICAgICAgICB0aGlzLmh0bWxFbCA9IGh0bWxFbDtcclxuICAgICAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XHJcbiAgICAgICAgdGhpcy5mYXZvcml0ZXNMaXN0O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgLy/QvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0YPQtNCw0LvQtdC90LjRjyDQt9Cw0L/QuNGB0LhcclxuICAgICAgICB0aGlzLmh0bWxFbC5vbmNsaWNrID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PSBcImJ0bkRlbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2l0eU5hbWUgPSBldmVudC50YXJnZXQucHJldmlvdXNTaWJsaW5nLnRleHQ7Ly/QvdCw0LfQstCw0L3QuNC1INCz0L7RgNC+0LTQsCwg0LrQvtGC0L7RgNGL0Lkg0YPQtNCw0LvQuNGC0YxcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5mYXZvcml0ZXNMaXN0ID09PSBcInN0cmluZ1wiKSB7Ly/QtdGB0LvQuCDQsiB0aGlzLmZhdm9yaXRlc0xpc3Qg0LTQsNC90L3Ri9C1INCyINGB0YLRgNC+0LrQtSDQtNC10LvQsNC10Lwg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXNMaXN0ID0gdGhpcy5mYXZvcml0ZXNMaXN0LnNwbGl0KFwiLFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRMaXN0ID0gdGhpcy5mYXZvcml0ZXNMaXN0LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgey8v0YPQsdC40YDQsNC10Lwg0LjQtyDQvNCw0YHRgdC40LLQsCDRjdC70LXQvNC10L3RgtGLINGBINGB0L7QstC/0LDQtNCw0Y7RidC40Lwg0L3QsNC30LLQsNC90LjQtdC8INCz0L7RgNC+0LTQsFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtICE9IGNpdHlOYW1lO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhdm9yaXRlc0xpc3QgPSByZXN1bHRMaXN0LmpvaW4oXCIsXCIpOy8v0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQvNCw0YHRgdC40LIg0LIg0YHRgtC+0YDQutGDXHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnNldERhdGEoXCJmYXZvcml0ZXNMaXN0XCIsIHRoaXMuZmF2b3JpdGVzTGlzdCkudGhlbigoKSA9PiB7Ly/Qv9C+0LzQtdGJ0LDQtdC8INC+0LHQvdC+0LLQu9C10L3QvdGL0LUg0LTQsNC90L3Ri9C1INCyIHN0b3JhZ2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v0L/QvtC00L/QuNGB0LrQsCDQvdCwINGB0L7QsdGL0YLQuNC1INC00L7QsdCw0LLQu9C10L3QuNGPINC30LDQv9C40YHQuCDQsiDQuNC30LHRgNCw0L3QvdC+0LUgKNC/0LXRgNC10YDQuNGB0L7QstGL0LLQsNC10Lwg0LrQvtC80L/QvtC90LXQvdGCKVxyXG4gICAgICAgIHRoaXMuZXZlbnRCdXMub24oXCJ3ZWF0aGVyTWFwOmNoYW5nZUZhdm9yaXRlc1wiLCBjZW50ZXJDaXR5ID0+IHtcclxuICAgICAgICAgICAgc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoXCJmYXZvcml0ZXNMaXN0XCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXNMaXN0ID0gcmVzdWx0LnNwbGl0KFwiLFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdm9yaXRlc0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXNMaXN0LnVuc2hpZnQoY2VudGVyQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmF2b3JpdGVzTGlzdC5qb2luKFwiLFwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0RGF0YShcImZhdm9yaXRlc0xpc3RcIiwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0L7RiNC40LHQutCwINC00L7QsdCw0LLQu9C10L3QuNGPINC40LfQsdGA0LDQvdC90L7Qs9C+XCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLy/RhNGD0L3QutGG0LjRjyDQvtGC0YDQuNGB0L7QstC60Lgg0LrQvtC80L/QvtC90LXQvdGC0LBcclxuICAgIEZhdm9yaXRlTGlzdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHN0b3JhZ2VcclxuICAgICAgICAgICAgLmdldERhdGEoXCJmYXZvcml0ZXNMaXN0XCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXNMaXN0ID0gcmVzdWx0LnNwbGl0KFwiLFwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXNMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgaHRtbFRleHQgPSBcIjx1bD5cIjtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mYXZvcml0ZXNMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbFRleHQgKz0gYDxsaSB2YWx1ZT1cIiR7dGhpcy5mYXZvcml0ZXNMaXN0W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cIj48YSBocmVmPVwiI2NpdHk9JHt0aGlzLmZhdm9yaXRlc0xpc3RbaV19XCI+JHt0aGlzLmZhdm9yaXRlc0xpc3RbXHJcbiAgICAgICAgICAgICAgICAgICAgaVxyXG4gICAgICAgICAgICAgICAgICAgIF19PC9hPjxidXR0b24gY2xhc3M9XCJidG5EZWxldGVcIj5YPC9idXR0b24gPjwvbGk+YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGh0bWxUZXh0ICs9IFwiPC91bD5cIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHRtbEVsLmlubmVySFRNTCA9IGh0bWxUZXh0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLQvtGI0LjQsdC60LAg0YPQtNCw0LvQtdC90LjRj1wiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgd2luZG93LkZhdm9yaXRlTGlzdCA9IEZhdm9yaXRlTGlzdDtcclxufSkoaVN0b3JhZ2UpO1xyXG7vu78oZnVuY3Rpb24gKGRlYm91bmNlLCBjaGFuZ2VIYXNoQnlNYXBTdGF0ZSkge1xyXG4gICAgdmFyIFlhbmRleE1hcCA9IGZ1bmN0aW9uIChjZW50ZXIsIGV2ZW50QnVzKSB7XHJcbiAgICAgICAgdGhpcy5tYXA7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBjZW50ZXI7XHJcbiAgICAgICAgdGhpcy5ldmVudEJ1cyA9IGV2ZW50QnVzO1xyXG4gICAgICAgIHRoaXMueW1hcHMgPSB5bWFwcztcclxuICAgICAgICB0aGlzLnltYXBzLnJlYWR5KCgpID0+IHRoaXMuZHJhd01hcCgpKTtcclxuICAgIH07XHJcbiAgICAvL9GE0YPQvdC60YbQuNGPINGA0LjRgdGD0Y7RidCw0Y8g0LrQsNGA0YLRg1xyXG4gICAgWWFuZGV4TWFwLnByb3RvdHlwZS5kcmF3TWFwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IHRoaXMueW1hcHMuTWFwKFwibXlNYXBcIiwge1xyXG4gICAgICAgICAgICBjZW50ZXI6IHRoaXMuY2VudGVyLFxyXG4gICAgICAgICAgICBjb250cm9sczogW1wiem9vbUNvbnRyb2xcIl0sXHJcbiAgICAgICAgICAgIHpvb206IDEwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/QutC90L7Qv9C60LAg0LTQvtCx0LDQstC40YLRjCDQsiDQuNC30LHRgNCw0L3QvdC+0LVcclxuICAgICAgICB2YXIgYnRuQWRkMkZhdm9yID0gbmV3IHRoaXMueW1hcHMuY29udHJvbC5CdXR0b24oe1xyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZTogXCJmYXZvcml0ZXMucG5nXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZmxvYXQ6IFwicmlnaHRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYXAuY29udHJvbHMuYWRkKGJ0bkFkZDJGYXZvcik7XHJcbiAgICAgICAgdGhpcy5hZGRIYW5kbGVycyhidG5BZGQyRmF2b3IpO1xyXG4gICAgfTtcclxuICAgIC8v0L/QvtC00L/QuNGB0LrQsCDQvdCwINGB0L7QsdGL0YLQuNGPINC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0LrQsNGA0YLRiyDQuCDQvdCw0LbQsNGC0LjQtSDQvdCwINC60L3QvtC/0LrRgyDQtNC+0LHQsNCy0LjRgtGMINCyINC40LfQsdGA0LDQvdC90L7QtVxyXG4gICAgWWFuZGV4TWFwLnByb3RvdHlwZS5hZGRIYW5kbGVycyA9IGZ1bmN0aW9uIChidG5BZGQyRmF2b3IpIHtcclxuICAgICAgICBidG5BZGQyRmF2b3IuZXZlbnRzLmFkZChcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMubWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJ3ZWF0aGVyTWFwOmFkZDJGYXZvcml0ZVwiLCB0aGlzLmNlbnRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYXAuZXZlbnRzLmFkZChcclxuICAgICAgICAgICAgXCJib3VuZHNjaGFuZ2VcIixcclxuICAgICAgICAgICAgZGVib3VuY2UoZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL9C00LvRjyDQvdC1INGB0LvQuNGI0LrQvtC8INGH0LDRgdGC0L7QuSDQs9C10L3QtdGA0LDRhtC40Lgg0YHQvtCx0YvRgtC40Y9cclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcIndlYXRoZXJNYXA6Y2VudGVyQ2hhbmdlXCIsIGUuZ2V0KFwibmV3Q2VudGVyXCIpKTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZUhhc2hCeU1hcFN0YXRlKGUuZ2V0KFwibmV3Q2VudGVyXCIpKTtcclxuICAgICAgICAgICAgfSwgMjAwMClcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuZXZlbnRCdXMub24oXCJ3ZWF0aGVyTWFwOnNldE1hcENlbnRlclwiLCBjZW50ZXIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlciA9IGNlbnRlcjtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL9C/0LXRgNC10YDQuNGB0L7QstC60LAg0LrQsNGA0YLRiyDRgSDRg9C60LDQt9Cw0L3QvdGL0Lwg0YbQtdC90YLRgNC+0LxcclxuICAgIFlhbmRleE1hcC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubWFwLnBhblRvKHRoaXMuY2VudGVyLCB7IGR1cmF0aW9uOiAyMDAwIH0pO1xyXG4gICAgfTtcclxuICAgIHdpbmRvdy5ZYW5kZXhNYXAgPSBZYW5kZXhNYXA7XHJcbn0pKGRlYm91bmNlLCBjaGFuZ2VIYXNoQnlNYXBTdGF0ZSk7XHJcbu+7vyhmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXZlbnRCdXMgPSBuZXcgRXZlbnRCdXMoKTtcclxuICAgIC8v0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINGB0L7QsdGL0YLQuNGPINC+0YLQv9GA0LDQstC60Lgg0YTQvtGA0LzRi1xyXG4gICAgdmFyIGZvcm0gPSBkb2N1bWVudC5mb3Jtcy5tYWluO1xyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGV2ID0+IHtcclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNoYW5nZU1hcFN0YXRlQnlDaXR5TmFtZShmb3JtLCBldmVudEJ1cywgZm9ybS5zZWFyY2gudmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICAvL9C60L7QvNC/0L7QvdC10L3RgiDQv9GA0L7Qs9C90L7Qt9CwXHJcbiAgICBuZXcgd2luZG93LldlYXRoZXJGb3JlY2FzdChcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwid2VhdGhlclwiKVswXSxcclxuICAgICAgICBldmVudEJ1c1xyXG4gICAgKTtcclxuICAgIC8v0LrQvtC80L/QvtC90LXQvdGCINC40YHRgtC+0YDQuNC4INC30LDQv9GA0L7RgdC+0LJcclxuICAgIG5ldyB3aW5kb3cuUmVxdWVzdEhpc3RvcnkoXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhpc3RvcnlcIilbMF0sXHJcbiAgICAgICAgZXZlbnRCdXNcclxuICAgICk7XHJcbiAgICAvL9C60L7QvNC/0L7QvdC10L3RgiDQuNC30LHRgNCw0L3QvdGL0YVcclxuICAgIG5ldyB3aW5kb3cuRmF2b3JpdGVMaXN0KFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmYXZvcml0ZXNcIilbMF0sXHJcbiAgICAgICAgZXZlbnRCdXNcclxuICAgICk7XHJcbiAgICAvL9C30LDQs9GA0YPQt9C60LAg0LrQsNGA0YLRiyDQu9C40LHQviDQv9C+INC60L7QvtGA0LTQuNC90LDRgtCw0Lwg0L3QsNGF0L7QttC00LXQvdC40Y8g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPLCDQu9C40LHQviDQuNC3IHVybFxyXG4gICAgZ2V0TWFwQ2VudGVyRnJvbUhhc2goZm9ybS5yYi52YWx1ZSlcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBuZXcgd2luZG93LllhbmRleE1hcChyZXN1bHQsIGV2ZW50QnVzKTtcclxuICAgICAgICAgICAgZXZlbnRCdXMudHJpZ2dlcihcIndlYXRoZXJNYXA6Y2VudGVyQ2hhbmdlXCIsIHJlc3VsdCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKFxyXG4gICAgICAgICAgICAgICAgXCJ3ZWF0aGVyTWFwOmNoYW5nZUZvcmVjYXN0XCIsXHJcbiAgICAgICAgICAgICAgICBcItC+0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0L/RgNC+0LPQvdC+0LfQsFwiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAvL9C/0YDQuCDRgdC80LXQvdC1INGG0LXQvdGC0YDQsCDQutCw0YDRgtGLINC80LXQvdGP0LXRgtGB0Y8g0L/RgNC+0LPQvdC+0Lcg0L/QvtCz0L7QtNGLXHJcbiAgICBldmVudEJ1cy5vbihcIndlYXRoZXJNYXA6Y2VudGVyQ2hhbmdlXCIsIGNlbnRlciA9PiB7XHJcbiAgICAgICAgbGV0IGxhdCA9IGNlbnRlclswXTtcclxuICAgICAgICBsZXQgbG5nID0gY2VudGVyWzFdO1xyXG4gICAgICAgIGxldCBmb3JlY2FzdFRleHQ7XHJcbiAgICAgICAgaWYgKGZvcm0ucmIudmFsdWUgPT0gXCJmZXRjaFwiKSB7XHJcbiAgICAgICAgICAgIGdldEZvcmVjYXN0QnlDb29yZEZldGNoKHtcclxuICAgICAgICAgICAgICAgIGxhdCxcclxuICAgICAgICAgICAgICAgIGxuZ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHsgdGVtcCwgZGVzY3JpcHQsIGh1bWlkaXR5LCB3aW5kU3BlZWQgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0VGV4dCA9IGA8aDI+0JIg0LHQu9C40LbQsNC50YjQuNC1IDMg0YfQsNGB0LAg0L7QttC40LTQsNC10YLRgdGPOjxici8+0YLQtdC80L/QtdGA0LDRgtGD0YDQsCAke3RlbXB9IEM8YnIvPtCy0LvQsNC20L3QvtGB0YLRjCAke2h1bWlkaXR5fSU8YnIvPtGB0LrQvtGA0L7RgdGC0Ywg0LLQtdGC0YDQsCAke3dpbmRTcGVlZH0g0Lwv0YE8YnIvPiR7ZGVzY3JpcHR9PC9oMj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzLnRyaWdnZXIoXCJ3ZWF0aGVyTWFwOmNoYW5nZUZvcmVjYXN0XCIsIGZvcmVjYXN0VGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndlYXRoZXJNYXA6Y2hhbmdlRm9yZWNhc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCLQvtGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC/0YDQvtCz0L3QvtC30LBcIlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRGb3JlY2FzdEJ5Q29vcmRYSFIoe1xyXG4gICAgICAgICAgICAgICAgbGF0LFxyXG4gICAgICAgICAgICAgICAgbG5nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoeyB0ZW1wLCBkZXNjcmlwdCwgaHVtaWRpdHksIHdpbmRTcGVlZCB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RUZXh0ID0gYDxoMj7QkiDQsdC70LjQttCw0LnRiNC40LUgMyDRh9Cw0YHQsCDQvtC20LjQtNCw0LXRgtGB0Y86PGJyLz7RgtC10LzQv9C10YDQsNGC0YPRgNCwICR7dGVtcH0gQzxici8+0LLQu9Cw0LbQvdC+0YHRgtGMICR7aHVtaWRpdHl9JTxici8+0YHQutC+0YDQvtGB0YLRjCDQstC10YLRgNCwICR7d2luZFNwZWVkfSDQvC/RgTxici8+JHtkZXNjcmlwdH08L2gyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXMudHJpZ2dlcihcIndlYXRoZXJNYXA6Y2hhbmdlRm9yZWNhc3RcIiwgZm9yZWNhc3RUZXh0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzLnRyaWdnZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2VhdGhlck1hcDpjaGFuZ2VGb3JlY2FzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcItC+0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0L/RgNC+0LPQvdC+0LfQsFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy/Rg9GB0YLQsNC90L7QstC70LXQvdC40LUg0YbQtdC90YLRgNCwINC60LDRgNGC0Ysg0Lgg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQtdCz0L4g0L/RgNC+0LPQvdC+0LfQsCDQv9C+INC90LDQt9Cy0LDQvdC40Y4g0LPQvtGA0L7QtNCwXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VNYXBTdGF0ZUJ5Q2l0eU5hbWUoZm9ybSwgZXZlbnRCdXMsIGNpdHkpIHtcclxuICAgICAgICBsZXQgZm9yZWNhc3RUZXh0O1xyXG4gICAgICAgIGlmIChmb3JtLnJiLnZhbHVlID09IFwiZmV0Y2hcIikge1xyXG4gICAgICAgICAgICBnZXRGb3JlY2FzdEJ5Q2l0eU5hbWVGZXRjaChjaXR5KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHsgdGVtcCwgZGVzY3JpcHQsIGh1bWlkaXR5LCB3aW5kU3BlZWQsIGxhdCwgbG5nIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdFRleHQgPSBgPGgyPtCSINCx0LvQuNC20LDQudGI0LjQtSAzINGH0LDRgdCwINC+0LbQuNC00LDQtdGC0YHRjzo8YnIvPtGC0LXQvNC/0LXRgNCw0YLRg9GA0LAgJHt0ZW1wfSBDPGJyLz7QstC70LDQttC90L7RgdGC0YwgJHtodW1pZGl0eX0lPGJyLz7RgdC60L7RgNC+0YHRgtGMINCy0LXRgtGA0LAgJHt3aW5kU3BlZWR9INC8L9GBPGJyLz4ke2Rlc2NyaXB0fTwvaDI+YDtcclxuICAgICAgICAgICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKFwid2VhdGhlck1hcDpjaGFuZ2VGb3JlY2FzdFwiLCBmb3JlY2FzdFRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzLnRyaWdnZXIoXCJ3ZWF0aGVyTWFwOnNldE1hcENlbnRlclwiLCBbK2xhdCwgK2xuZ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzLnRyaWdnZXIoXCJ3ZWF0aGVyTWFwOmNoYW5nZUhpc3RvcnlcIiwgY2l0eSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndlYXRoZXJNYXA6Y2hhbmdlRm9yZWNhc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCLQvtGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC/0YDQvtCz0L3QvtC30LBcIlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRGb3JlY2FzdEJ5Q2l0eU5hbWVYSFIoY2l0eSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCh7IHRlbXAsIGRlc2NyaXB0LCBodW1pZGl0eSwgd2luZFNwZWVkLCBsYXQsIGxuZyB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RUZXh0ID0gYDxoMj7QkiDQsdC70LjQttCw0LnRiNC40LUgMyDRh9Cw0YHQsCDQvtC20LjQtNCw0LXRgtGB0Y86PGJyLz7RgtC10LzQv9C10YDQsNGC0YPRgNCwICR7dGVtcH0gQzxici8+0LLQu9Cw0LbQvdC+0YHRgtGMICR7aHVtaWRpdHl9JTxici8+0YHQutC+0YDQvtGB0YLRjCDQstC10YLRgNCwICR7d2luZFNwZWVkfSDQvC/RgTxici8+JHtkZXNjcmlwdH08L2gyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXMudHJpZ2dlcihcIndlYXRoZXJNYXA6Y2hhbmdlRm9yZWNhc3RcIiwgZm9yZWNhc3RUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKFwid2VhdGhlck1hcDpzZXRNYXBDZW50ZXJcIiwgWytsYXQsICtsbmddKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXMudHJpZ2dlcihcIndlYXRoZXJNYXA6Y2hhbmdlSGlzdG9yeVwiLCBjaXR5KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzLnRyaWdnZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2VhdGhlck1hcDpjaGFuZ2VGb3JlY2FzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcItC+0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0L/RgNC+0LPQvdC+0LfQsFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsNC20LDRgtC40Y8g0LrQvdC+0L/QutC4INC00L7QsdCw0LLQuNGC0Ywg0LIg0LjQt9Cx0YDQsNC90L3QvtC1XHJcbiAgICBldmVudEJ1cy5vbihcIndlYXRoZXJNYXA6YWRkMkZhdm9yaXRlXCIsIGNlbnRlciA9PiB7XHJcbiAgICAgICAgbGV0IGxhdCA9IGNlbnRlclswXTtcclxuICAgICAgICBsZXQgbG5nID0gY2VudGVyWzFdO1xyXG4gICAgICAgIGlmIChmb3JtLnJiLnZhbHVlID09IFwiZmV0Y2hcIikge1xyXG4gICAgICAgICAgICBnZXRDaXR5TmFtZUJ5Q29vcmRGZXRjaCh7IGxhdCwgbG5nIH0pLnRoZW4oY2l0eSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKFwid2VhdGhlck1hcDpjaGFuZ2VGYXZvcml0ZXNcIiwgY2l0eSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdldENpdHlOYW1lQnlDb29yZFhIUih7IGxhdCwgbG5nIH0pLnRoZW4oY2l0eSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKFwid2VhdGhlck1hcDpjaGFuZ2VGYXZvcml0ZXNcIiwgY2l0eSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy/QvNCw0YDRiNGA0YPRgtGLXHJcbiAgICB2YXIgcm91dGVyID0gbmV3IFJvdXRlcih7XHJcbiAgICAgICAgcm91dGVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5kZXhcIiwgLy/QvdCw0YfQsNC70YzQvdCw0Y8g0YHRgtGA0LDQvdC40YbQsFxyXG4gICAgICAgICAgICAgICAgbWF0Y2g6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIGFsZXJ0KFwiSW5kZXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIG1hcCA9IG5ldyB3aW5kb3cuWWFuZGV4TWFwKGNlbnRlck1hcCwgZXZlbnRCdXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFib3V0XCIsIC8v0L4g0L/RgNC+0LPRgNCw0LzQvNC1XHJcbiAgICAgICAgICAgICAgICBtYXRjaDogXCJhYm91dFwiLFxyXG4gICAgICAgICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWJvdXRcIikuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25MZWF2ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWJvdXRcIikuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJtYWluXCIsIC8v0L/QvtC00LTQtdGA0LbQutCwINC/0L7QuNGB0LrQsCDQs9C+0YDQvtC00LAg0LIgdXJsXHJcbiAgICAgICAgICAgICAgICBtYXRjaDogL2NpdHk9KC4rKS9pLFxyXG4gICAgICAgICAgICAgICAgb25FbnRlcjogY2l0eSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlTWFwU3RhdGVCeUNpdHlOYW1lKGZvcm0sIGV2ZW50QnVzLCBjaXR5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnRCdXMudHJpZ2dlcihcIndlYXRoZXJNYXA6c2V0TWFwQ2VudGVyXCIsIGNlbnRlck1hcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibWFwXCIsIC8v0L/RgNC4INC/0LXRgNC10LzQtdGJ0LXQvdC40Lgg0LrQsNGA0YLRiyDQvNC10L3Rj9GO0YLRgdGPINC60L7QvtGA0LTQuNC90LDRgtGLINCyIHVybFxyXG4gICAgICAgICAgICAgICAgbWF0Y2g6IC9jZW50ZXI9KC0/XFxkKlsuXT9cXGQrLC0/XFxkKlsuXT9cXGQrKS8sXHJcbiAgICAgICAgICAgICAgICBvbkVudGVyOiBjZW50ZXIgPT4geyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYXV0aG9yXCIsIC8v0LjQvdGE0L7RgNC80LDRhtC40Y8g0L7QsSDQsNCy0YLQvtGA0LVcclxuICAgICAgICAgICAgICAgIG1hdGNoOiBcImF1dGhvclwiLFxyXG4gICAgICAgICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0aG9yXCIpLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uTGVhdmU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1dGhvclwiKS5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbn0pKCk7Il0sImZpbGUiOiJtYWluLmpzIn0=
