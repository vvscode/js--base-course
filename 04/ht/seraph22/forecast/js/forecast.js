'use strict';

const GOOGLE_API_KEY = 'AIzaSyAixr2nI5GQlenIgblTO8uMGCduUwWS70o';
let forecastsObj = {};
let currentForecastObj = {};
let favoritesObj = {};

let formSelector = document.querySelector('form');
formSelector.addEventListener('submit', function(ev) { ev.preventDefault() });

let search = document.querySelector('#search-field-id');
search.addEventListener('input', debounce(function () { getCoordinates(search.value) }, 1200));

let mainMenu = document.querySelectorAll('.main-menu ul li a');
for (let i = 0; i < mainMenu.length; i++)
{
	mainMenu[i].addEventListener('click', function ()
	{
		addClass('selected');
	});
}

let favorites = document.querySelector('#favorites-id');
favorites.addEventListener('click', function () { addToFavoritesObj(currentForecastObj) });

/*==============================================================================================================*/

let getForecastDebounce = debounce(getForecast, 100);
let changeForecastsObjDebounce = debounce(changeForecastsObj, 2000);

function debounce(func, wait)
{
	let timer;

	return function ()
	{
		clearTimeout(timer);
		let args = arguments;

		timer = setTimeout(function ()
		{
			func.apply(null, args);
		}, wait);
	};
}

function addClass(className)
{
	for (let i = 0; i < mainMenu.length; i++)
	{
		mainMenu[i].classList.remove(className);
	}
	event.target.classList.add(className);
}

/*==============================================================================================================*/

if (window.location.hash)
{
	// hash = decodeURI(hash);
	let arrCoord = window.location.hash;

	if (arrCoord.indexOf('#') === 0)
	{
		arrCoord = arrCoord.slice(1);
	}
	arrCoord = arrCoord.split('#');

	// Преобразуем к типу number
	arrCoord = arrCoord.map(function (str) { return +str; });

	// Устанавливаем новые координаты для карты
	setCenter(arrCoord);

	getForecast(arrCoord);
}
else
{
	// Определение начальных координат
	fetch(`https://api.userinfo.io/userinfos`)
		.then((resp) => resp.json())
		.then((data) =>
		{
			setCenter([data.position.latitude, data.position.longitude]);
		})
		.catch(reject => console.error(reject));
}

/*==============================================================================================================*/

function getCoordinates(inputValue) // String
{
	let fetch = document.querySelector('#fetch-id');

	if (inputValue && inputValue.length > 3)
	{
		fetch.checked ? getCoordinatesByFetch(inputValue) : getCoordinatesByXhr(inputValue);
	}
}

/*==============================================================================================================*/

function getCoordinatesByFetch(inputValue) // String
{
	return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=${GOOGLE_API_KEY}`)
		.then(promise => promise.json())
		.then(promise =>
		{
			let arrCoord = [promise.results[0].geometry.location.lat, promise.results[0].geometry.location.lng];
			//console.log('Fetch');
			getForecast(arrCoord);
		})
		.catch(reject =>
		{
			getErrorText();
			console.error(reject);
		});
}

function getCoordinatesByXhr(inputValue) // String
{
	return new Promise(function (resolve, reject)
	{
		let xhr = new XMLHttpRequest();
		xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=${GOOGLE_API_KEY}`, true);

		xhr.onload = function ()
		{
			if (this.status === 200)
			{
				let data = JSON.parse(this.response);
				if (data && data.results && data.results[0])
				{
					let arrCoord = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
					//console.log('XHR');
					getForecast(arrCoord);
				}
				else
				{
					getErrorText();
					console.error("There is no coordinates in data.results");
				}
			}
			else
			{
				let error = new Error(this.statusText);
				error.code = this.status;
				reject(error);
			}
		};

		xhr.onerror = function ()
		{
			reject(new Error("Something gone wrong"));
		};

		xhr.send();
	});
}

/*==============================================================================================================*/

function getForecast(arrCoord) // Array
{
	arrCoord = arrCoord.map(function (str) { return +str.toFixed(7); });
	// Добавим в хеш полученные координаты
	window.location.hash = `${arrCoord[0]}#${arrCoord[1]}`;

	let fetch = document.querySelector('#fetch-id');

	if (arrCoord.length === 2)
	{
		changeForecastsObjDebounce(fetch.checked ? getForecastByFetch(arrCoord) : getForecastByXhr(arrCoord));
	}
	else
	{
		console.log('Warning! arrCoord array has wrong length!')
	}
}

/*==============================================================================================================*/

function getForecastByFetch(arrCoord) // Array
{
	//return fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${arrCoord[0]},${arrCoord[1]}?lang=ru&units=si`)
	return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/02c1428da75f9c5927065135c43bca6b/${arrCoord[0]},${arrCoord[1]}?lang=ru&units=si`)
		.then(promise => promise.json())
		.catch(reject => console.error(reject));
}

function getForecastByXhr(arrCoord) // Array
{
	return new Promise(function (resolve, reject)
	{
		let xhr = new XMLHttpRequest();
		//xhr.open('GET', `https://shrouded-spire-35703.herokuapp.com/forecast/${arrCoord[0]},${arrCoord[1]}?lang=ru&units=si`, true);
		xhr.open('GET', `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/02c1428da75f9c5927065135c43bca6b/${arrCoord[0]},${arrCoord[1]}?lang=ru&units=si`, true);

		xhr.onload = function ()
		{
			if (this.status === 200)
			{
				let data = JSON.parse(this.response);
				resolve(data);
			}
			else
			{
				let error = new Error(this.statusText);
				error.code = this.status;
				reject(error);
			}
		};

		xhr.onerror = function ()
		{
			reject(new Error("Something gone wrong"));
		};

		xhr.send();
	});
}

/*==============================================================================================================*/

function changeForecastsObj(promise) // Promise
{
	// console.log(promise);

	if (promise)
	{
		promise
			.then(data =>
			{
				if (data && data.currently)
				{
					currentForecastObj = {};
					let propertyName = data.latitude + '#' + data.longitude;

					currentForecastObj[propertyName] = {
						searchRequest: null,
						description: '',
						summary: data.currently.summary,
						temperature: data.currently.temperature.toFixed(0),
						coordinates: [data.latitude, data.longitude]
					};

					if (search.value)
					{
						currentForecastObj[propertyName].searchRequest = search.value;

						// Устанавливаем новые координаты для карты
						setCenter([data.latitude, data.longitude]);

						if (forecastsObj[propertyName])
						{
							delete forecastsObj[propertyName];
						}

						// Создаем копию, чтобы сохранить currentForecastObj неизменным после assign
						let copy = Object.assign({}, currentForecastObj);

						forecastsObj = Object.assign(copy, forecastsObj);

						if (Object.keys(forecastsObj).length > 5)
						{
							delete forecastsObj[Object.keys(forecastsObj)[5]];
						}
					}

					// Делаем запрос на дескрипшн для новых координат и записываем в текущий объект
					(function setDescription()
					{
						ymaps.geocode([data.latitude, data.longitude].join(','), {
							json: true,
							results: 1
						})
						     .then(result =>
						     {
							     let members = result.GeoObjectCollection.featureMember;
							     let geoObjectData = (members && members.length) ? members[0].GeoObject : null;

							     if (geoObjectData)
							     {
								     currentForecastObj[propertyName].description = geoObjectData.metaDataProperty.GeocoderMetaData.text;

								     // console.log('Current Forecast ' + JSON.stringify(currentForecastObj,'',4));

								     // Делаем из forecastsObj список 'Последние просмотренные'
								     getForecastList(forecastsObj);

								     // Выводим данные для currentForecastObj
								     showCurrentForecastObj(currentForecastObj[propertyName]);
							     }
							     else
							     {
								     // console.log('Current Forecast ' + JSON.stringify(currentForecastObj,'',4));
								     // Делаем из forecastsObj список 'Последние просмотренные'
								     getForecastList(forecastsObj);

								     // Выводим данные для currentForecastObj
								     showCurrentForecastObj(currentForecastObj[propertyName]);
							     }
						     });
					})();
				}
				else
				{
					console.error('There is no data in Promise');
				}
			})
	}
	else
	{
		console.error('There is no Promise in changeForecastsObj(arguments)');
	}
}

/*==============================================================================================================*/

function getForecastList(forecasts) // Object
{
	console.log('Forecasts List ' + JSON.stringify(forecasts, '', 4));

	if (Object.keys(forecasts).length > 0)
	{
		let forecastsList = document.querySelector('.forecasts-list');

		forecastsList.innerHTML = `<p class="forecasts-list-header">Последние просмотренные:</p>`;

		for (let key in forecastsObj)
		{
			forecastsList.innerHTML += `<p title="${forecastsObj[key].description}" class="forecasts-list-item">${forecastsObj[key].searchRequest} <span>${forecastsObj[key].temperature}&deg;C<span></p>`;
		}

		// Добавим EventListener на элементы списка
		let forecastsListItem = document.querySelectorAll('.forecasts-list-item');

		for (let i = 0; i < forecastsListItem.length; i++)
		{
			forecastsListItem[i].addEventListener('click', function ()
			{
				let split = event.target.innerHTML.split(' <span>');

				for (let key in forecastsObj)
				{
					if (forecastsObj[key].searchRequest === split[0])
					{
						search.value = forecastsObj[key].searchRequest;
						getForecast(forecastsObj[key].coordinates);
					}
				}
			})
		}
	}
}

function showCurrentForecastObj(currentForecast) // Object
{
	// console.log('Current Forecast ' + JSON.stringify(currentForecast, '', 4));
	let description = document.querySelector('.description');
	let forecastDataOutput = document.querySelector('.forecast');

	let descriptionValue = 'Нет данных';
	if (currentForecast.description)
	{
		descriptionValue = currentForecast.description;
	}
	else if (search.value)
	{
		descriptionValue = search.value;
	}

	description.innerHTML = `<p title="${descriptionValue}">${descriptionValue}</p>`;
	forecastDataOutput.innerHTML = `
	 <p class='degree'>${currentForecast.temperature}&deg;C</p><p>${currentForecast.summary}</p>
	 <p class='coordinates'><span>lat:</span> ${currentForecast.coordinates[0]}  <span>lng:</span> ${currentForecast.coordinates[1]}</p>
	 `;
}

function addToFavoritesObj(currentForecast) // Object
{
	if (Object.keys(currentForecast).length > 0)
	{
		if (Object.keys(favoritesObj).length > 0)
		{
			for (let key in favoritesObj)
			{
				if (key === Object.keys(currentForecast)[0])
				{
					delete favoritesObj[key];
				}
			}
		}

		// Создаем копию, чтобы сохранить currentForecast неизменным после assign
		let copy = Object.assign({}, currentForecast);

		favoritesObj = Object.assign(copy, favoritesObj);

		if (Object.keys(favoritesObj).length > 5)
		{
			delete favoritesObj[Object.keys(favoritesObj)[5]];
		}

		// Вызываем функцию, которая заполнит список "избранное"
		getFavoritesList(favoritesObj);

		addActiveToFavoritesButton();
		//console.log('Favorites Object ' + JSON.stringify(favoritesObj, '', 4));
	}
}

function getFavoritesList(favorites) // Object
{
	console.log('Favorites List ' + JSON.stringify(favorites, '', 4));

	if (Object.keys(favorites).length > 0)
	{
		let favoritesList = document.querySelector('.favorites-list');

		favoritesList.innerHTML = `<p class="favorites-list-header">Избранное:</p>`;

		for (let key in favorites)
		{
			favoritesList.innerHTML += `<p title="${favorites[key].description}" class="favorites-list-item">${favorites[key].description} <span>${favorites[key].temperature}&deg;C<span></p>`;
		}

		// Добавим EventListener на элементы списка
		let favoritesListItem = document.querySelectorAll('.favorites-list-item');

		for (let i = 0; i < favoritesListItem.length; i++)
		{
			favoritesListItem[i].addEventListener('click', function ()
			{
				let split = event.target.innerHTML.split(' <span>');

				for (let key in favorites)
				{
					if (favorites[key].description === split[0])
					{
						search.value = '';
						getForecast(favorites[key].coordinates);
						// Устанавливаем новые координаты для карты
						setCenter(favorites[key].coordinates);

						addToFavoritesObj({[key]: favorites[key]});
					}
				}
			})
		}
	}
}

function addActiveToFavoritesButton()
{
	if (Object.keys(favoritesObj).length > 0)
	{
		let favorites = document.querySelector('#favorites-id');
		let active = false;
		let center = myMap.getCenter();
		// Координаты центра карты
		if (center)
		{
			// Преобразуем к типу number
			center = center.map(function (str) { return +(+str).toFixed(7); });
		}
		for (let key in favoritesObj)
		{
			if (favoritesObj[key].coordinates[0] === center[0] &&
				favoritesObj[key].coordinates[1] === center[1])
			{
				active = true;
			}
		}

		if (active)
		{
			favorites.classList.add('active');
		}
		else
		{
			favorites.classList.remove('active');
		}
	}
}

function getErrorText() // undefined
{
	let description = document.querySelector('.description');
	let forecastDataOutput = document.querySelector('.forecast');

	description.innerHTML = `<p class="error">Неправильные параметры поиска</p>`;
	forecastDataOutput.innerHTML = '';
}