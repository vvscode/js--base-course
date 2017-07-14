export default class General
{
	constructor()
	{
		this.name = 'general';
		this.methodList = ['eventBus', 'debounce', 'storage'];

		this.eventBus = {
			listeners: {},

			on(name, handler)
			{
				this.listeners[name] = this.listeners[name] || [];
				this.listeners[name].push(handler);
			},

			off(name, handler)
			{
				this.listeners[name] = this.listeners[name] || [];
				this.listeners[name] = this.listeners[name].filter((item) => item !== handler);
			},

			once(name, handler)
			{
				let self = this;
				this.on(name, function getter(data)
				{
					handler(data);
					self.off(name, getter);
				});
			},

			trigger(name, data)
			{
				(this.listeners[name] || []).forEach((handler) => handler(data));
			}
		};

		// Подписываемся на изменения
		this.eventBus.on('request:data', this.storage.bind(this));

		// Очистка запросов при рефреше страницы
		localStorage.clear();
	}

	debounce(func, wait)
	{
		let timer;
		return () =>
		{
			clearTimeout(timer);
			let args = arguments;
			timer = setTimeout(() => { func.apply(null, args); }, wait);
		};
	}

	storage(data) // Obj
	{
		let search = document.querySelector('#search-field-id');
		let forecastsObj = JSON.parse(localStorage.getItem('forecastsObj')) || {};
		let currentForecastObj = {};
		let propertyName = data.latitude + '#' + data.longitude;

		currentForecastObj[propertyName] = {
			searchRequest: null,
			description: '',
			summary: data.currently.summary,
			temperature: data.currently.temperature.toFixed(0),
			coordinates: [data.latitude, data.longitude]
		};

		let renderData = () =>
		{
			if (search.value)
			{
				currentForecastObj[propertyName].searchRequest = search.value;
				localStorage.setItem('currentForecastObj', JSON.stringify(currentForecastObj, "", 4));

				console.log('');
				console.log(
					'%c%s%c %s',
					'background: #333333; color: #81e56c',
					'currentForecastObj',
					'background: #fff; color: #000',
					JSON.stringify(currentForecastObj, '', 4)
				);

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
				localStorage.setItem('forecastsObj', JSON.stringify(forecastsObj, "", 4));
			}
			else
			{
				localStorage.setItem('currentForecastObj', JSON.stringify(currentForecastObj, "", 4));
				console.log('');
				console.log(
					'%c%s%c %s',
					'background: #333333; color: #81e56c',
					'currentForecastObj',
					'background: #fff; color: #000',
					JSON.stringify(currentForecastObj, '', 4)
				);
			}

			if (Object.keys(forecastsObj).length > 0)
			{
				console.log(
					'%c%s%c %s',
					'background: #333333; color: #e1e7a2',
					'forecastsObj',
					'background: #fff; color: #000',
					JSON.stringify(forecastsObj,'',4)
				);
			}
			console.log('__________________________________________________');

			// Отправляем объекты в eventBus
			this.eventBus.trigger('currentForecastObj', currentForecastObj);
			this.eventBus.trigger('forecastsObj', forecastsObj);
		};

		// Делаем запрос на дескрипшн для новых координат и записываем в currentForecastObj
		let setDescription = () =>
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
					     renderData();

					     //console.log('Current Forecast ' + JSON.stringify(currentForecastObj,'',4));

					     // Делаем из forecastsObj список 'Последние просмотренные'
					     //getForecastList(forecastsObj);

					     // Выводим данные для currentForecastObj
					     //showCurrentForecastObj(currentForecastObj[propertyName]);
				     }
				     else
				     {
					     // console.log('Current Forecast ' + JSON.stringify(currentForecastObj,'',4));
					     // Делаем из forecastsObj список 'Последние просмотренные'
					     //getForecastList(forecastsObj);

					     // Выводим данные для currentForecastObj
					     //showCurrentForecastObj(currentForecastObj[propertyName]);
				     }
			     });
		};
		setDescription();
	}

	getHistory()
	{

	}
}