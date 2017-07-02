'use strict';

const GOOGLE_API_KEY = 'AIzaSyAixr2nI5GQlenIgblTO8uMGCduUwWS70o';
let citiesList = {};
let citiesFavorites = {};

let formSelector = document.querySelector('form');
formSelector.addEventListener('submit', function (ev){ev.preventDefault();});

let search = document.querySelector('#search-field-id');
search.addEventListener('input', debounce(function(){ getWeather(search.value) }, 1000));

// Если есть хеш, то запускаем через него
if (window.location.hash)
{
	getWeather(window.location.hash.slice(1));
}

function debounce(func, wait)
{
	let timer;

	return function()
	{
		clearTimeout(timer);
		let args = arguments;

		timer = setTimeout(function()
		{
			func.apply(null, args);
		}, wait);
	};
};

function getWeather(city)
{
	let fetch = document.querySelector('#fetch-id');

	if (city)
	{
		search.value = city;
	}

	if (search.value && search.value.length > 3)
	{
		showWeather(fetch.checked ? fetchRequest(search.value) : xhrRequest(search.value));
	}
};

function fetchRequest(value)
{
	return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${GOOGLE_API_KEY}`)
			.then((resp) => resp.json())
			.then((data) => {
				let lat = data.results[0].geometry.location.lat;
				let lng = data.results[0].geometry.location.lng;

				return fetch(`https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`);
			})
			.then((resp) => resp.json())
			.catch(reject => console.error(reject));
};

function xhrRequest(value)
{
	return new Promise(function(resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${GOOGLE_API_KEY}`, true);

		xhr.onload = function()
		{
			if (this.status == 200)
			{
				let data = JSON.parse(this.response);
				if (data.results[0])
				{
					let lat = data.results[0].geometry.location.lat;
					let lng = data.results[0].geometry.location.lng;

					xhr.open('GET', `https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=ru&units=si`, true);

					xhr.onload = function()
					{
						if (this.status == 200)
						{
							let data = JSON.parse(this.response);
							resolve(data);
						}
					};

					xhr.onerror = function()
					{
						reject(new Error("Network Error"));
					};

					xhr.send();
				}
				else
				{
					resolve(data);
				}
			}
			else
			{
				let error = new Error(this.statusText);
				error.code = this.status;
				reject(error);
			}
		};

		xhr.onerror = function()
		{
			reject(new Error("Network Error"));
		};

		xhr.send();
	});
};

function showWeather(resp)
{
	let cityWeather = document.querySelector('.city-weather');
	let cityName = document.querySelector('.city-name');

	if (resp)
	{
		resp
			.then((data) => {
				console.log(data);
				if (data && data.currently)
				{
					return addCityToList(data);
				}
			})
			.then((data) => {
				let searchValue = search.value.toLowerCase();
				if (!citiesList[searchValue])
				{
					cityWeather.innerHTML = '';
					cityName.innerHTML = `<p style="text-transform:none;font-size: 17px;padding: 20px 0 0 0;">Такого города не существует</p>`;
				}
				else
				{
					cityWeather.innerHTML = `<p>${citiesList[searchValue].summary}</p><p class='degree'>${citiesList[searchValue].temperature}&deg;C</p>`;
					cityName.innerHTML = `<p>${searchValue}</p>`;

					// Устанавливаем новые координаты для карты, сет таймаут нужен чтобы хеш не вызвал функцию раньше прогрузки скриптов
					setTimeout(function(){setPan([data.lat, data.lng]);}, 100);

					//console.log(JSON.stringify(citiesList,'',4));

					window.location.hash = searchValue;
				}
			});
	}
}

function addCityToList(data)
{
	let cityList = document.querySelector('.city-list');
	let searchValue = search.value.toLowerCase();
	let currentCityObj = {};

	currentCityObj[searchValue] = {
		summary: data.currently.summary,
		temperature: data.currently.temperature.toFixed(0),
		lat: data.latitude,
		lng: data.longitude
	};

	if (citiesList[searchValue])
	{
		delete citiesList[searchValue];
	}

	citiesList = Object.assign(currentCityObj, citiesList);

	if (Object.keys(citiesList).length > 5)
	{
		delete citiesList[Object.keys(citiesList)[5]];
	}

	cityList.innerHTML = `<p class="city-list-header">Последние просмотренные:</p>`;
	for (var key in citiesList)
	{
		cityList.innerHTML += `<p class="city-list-item">${key} <span>${citiesList[key].temperature}&deg;C<span></p>`;
	}

	let cityListItem = document.querySelectorAll('.city-list-item');
	for (let i=0;i<cityListItem.length;i++)
	{
		cityListItem[i].addEventListener('click',
		function()
		{
			let split = event.target.innerHTML.split(' <span>');
			//console.log(split[0]);
			getWeather(split[0]);
		})
	}

	return citiesList[searchValue];
}





