import Switcher from '../components/switcher';

const GOOGLE_API_KEY = 'AIzaSyAixr2nI5GQlenIgblTO8uMGCduUwWS70o';
let switcher = new Switcher('#fetch-id');

export default class Request
{
	constructor(map, general)
	{
		this.map = map;
		this.general = general;
		this.coordinates = [];
	}

	run(value)
	{
		this.value = value;
		this.requestType = (() =>
		{
			if (switcher.check())
			{
				this.fetch();
				return 'Fetch';
			}
			else
			{
				this.xhr();
				return 'XHR';
			}
		})();
		//console.log(this.requestType);
	}

	trigger(data)
	{
		//console.log('trigger');
		// Отправляем в eventBus
		this.general.eventBus.trigger('request:data', data);
	}

	setCenter(lat, lng)
	{
		//console.log('setCenter');
		// Устанавливаем новые координаты для карты
		this.map.render([lat, lng]);
	}

	fetch()
	{
		console.log('Fetch request');

		let getForecast = (coordinates) =>
		{
			// Добавим в хеш полученные координаты
			window.location.hash = `${coordinates[0]}#${coordinates[1]}`;

			if (coordinates.length === 2)
			{
				fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/02c1428da75f9c5927065135c43bca6b/${coordinates[0]},${coordinates[1]}?lang=ru&units=si`)
					.then(promise => promise.json())
					.then(data =>
					{
						this.setCenter(data.latitude, data.longitude);
						this.trigger(data);
					})
					.catch(reject => console.error(reject));
			}
			else
			{
				this.getErrorText();
				console.error('Warning! coordinates array has wrong length!');
			}
		};

		if (this.value instanceof Array) // Если координаты пришли из хеша
		{
			//console.log('Coordinates from hash!');
			this.coordinates = this.value;
			getForecast(this.coordinates);
		}
		else
		{
			fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.value}&key=${GOOGLE_API_KEY}`)
				.then(promise => promise.json())
				.then(promise =>
				{
					this.coordinates = [promise.results[0].geometry.location.lat, promise.results[0].geometry.location.lng];
					this.coordinates = this.coordinates.map(function(str) { return +str.toFixed(7); });
					getForecast(this.coordinates);
				})
				.catch(reject =>
				{
					this.getErrorText();
					console.error(reject)
				});
		}
	}

	xhr()
	{
		console.log('XHR request');

		let self = this;

		let getForecast = (coordinates) =>
		{
			// Добавим в хеш полученные координаты
			window.location.hash = `${coordinates[0]}#${coordinates[1]}`;

			new Promise((resolve, reject) =>
			{
				let xhr = new XMLHttpRequest();
				xhr.open('GET', `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/02c1428da75f9c5927065135c43bca6b/${coordinates[0]},${coordinates[1]}?lang=ru&units=si`, true);

				xhr.onload = function()
				{
					if (this.status === 200)
					{
						let data = JSON.parse(this.response);

						self.setCenter(data.latitude, data.longitude);
						self.trigger(data);

						resolve(data);
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
					reject(new Error("Something gone wrong"));
				};

				xhr.send();
			});
		};

		if (this.value instanceof Array) // Если координаты пришли из хеша
		{
			//console.log('Coordinates from hash!');
			this.coordinates = this.value;
			getForecast(this.coordinates);
		}
		else
		{
			new Promise((resolve, reject) =>
			{
				let xhr = new XMLHttpRequest();
				xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${this.value}&key=${GOOGLE_API_KEY}`, true);

				xhr.onload = function() // не arrow funс т.к. нужен локальный this
				{
					if (this.status === 200)
					{
						let data = JSON.parse(this.response);
						if (data && data.results && data.results[0])
						{
							this.coordinates = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
							this.coordinates = this.coordinates.map(function(str) { return +str.toFixed(7); });
							getForecast(this.coordinates);
						}
						else
						{
							self.getErrorText();
							console.error("There is no coordinates in data.results");
						}
					}
					else
					{
						self.getErrorText();
						let error = new Error(this.statusText);
						error.code = this.status;
						reject(error);
					}
				};

				xhr.onerror = function()
				{
					self.getErrorText();
					reject(new Error("Something gone wrong"));
				};

				xhr.send();
			});
		}
	}

	getErrorText()
	{
		let description = document.querySelector('.description');
		let forecastDataOutput = document.querySelector('.forecast');

		description.innerHTML = `<p class="error">Неправильные параметры поиска</p>`;
		forecastDataOutput.innerHTML = '';
	}
}