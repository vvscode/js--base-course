﻿var iStorage = {
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
