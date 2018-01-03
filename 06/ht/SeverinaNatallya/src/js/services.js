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
export {
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
};
