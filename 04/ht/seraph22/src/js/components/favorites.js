export default class Favorites
{
	constructor(map, request, general)
	{
		this.map = map;
		this.request = request;
		this.general = general;
		this.list = document.querySelector('.favorites-list');
		this.favorites = document.querySelector('#favorites-id');

		this.favorites.addEventListener('click', () => this.add('new'));

		// Подписываемся на изменения
		this.general.eventBus.on('favoritesObj', this.render.bind(this));

		// Подписываемся на изменения для кнопки
		this.general.eventBus.on('map:boundschange', this.addActiveClass.bind(this));
	}

	add(key)
	{
		let favoritesObj = JSON.parse(localStorage.getItem('favoritesObj')) || {};
		let currentForecastObj = {};
		if (key === 'new')
		{
			currentForecastObj = JSON.parse(localStorage.getItem('currentForecastObj')) || {};
		}
		else
		{
			currentForecastObj[key] = favoritesObj[key] || {};
			console.log(JSON.stringify(currentForecastObj,'',4));
		}

		if (Object.keys(currentForecastObj).length > 0)
		{
			let currentForecast = currentForecastObj[Object.keys(currentForecastObj)[0]];
			let propertyName = currentForecast.latitude + '#' + currentForecast.longitude;

			if (favoritesObj[propertyName])
			{
				delete favoritesObj[propertyName];
			}

			// Создаем копию, чтобы сохранить currentForecastObj неизменным после assign
			let copy = Object.assign({}, currentForecastObj);
			favoritesObj = Object.assign(copy, favoritesObj);
			if (Object.keys(favoritesObj).length > 5)
			{
				delete favoritesObj[Object.keys(favoritesObj)[5]];
			}

			localStorage.setItem('favoritesObj', JSON.stringify(favoritesObj, "", 4));
			this.general.eventBus.trigger('favoritesObj', favoritesObj);

			this.addActiveClass();
		}
	}

	render(favoritesObj)
	{
		if (Object.keys(favoritesObj).length > 0)
		{
			console.log(
			 '%c%s%c %s',
			 'background: #333333; color: #f9ce00',
			 'favoritesObj',
			 'background: #fff; color: #000',
			 JSON.stringify(favoritesObj,'',4)
			 );

			this.list.innerHTML = `<p class="favorites-list-header">Избранное:</p>`;

			for (let key in favoritesObj)
			{
				this.list.innerHTML += `<p title="${favoritesObj[key].description}" class="favorites-list-item">${favoritesObj[key].description} <span>${favoritesObj[key].temperature}&deg;C<span></p>`;
			}

			// Добавим EventListener на элементы списка
			let item = document.querySelectorAll('.favorites-list-item');
			let search = document.querySelector('#search-field-id');

			for (let i = 0; i < item.length; i++)
			{
				item[i].addEventListener('click', () =>
				{
					let split = event.target.innerHTML.split(' <span>');

					for (let key in favoritesObj)
					{
						if (favoritesObj[key].description === split[0])
						{
							search.value = '';
							this.add(key);
							this.request.run(favoritesObj[key].coordinates);
						}
					}
				});
			}
		}
		else
		{
			this.list.innerHTML = ``;
		}
	}

	addActiveClass(data)
	{
		let favoritesObj = JSON.parse(localStorage.getItem('favoritesObj')) || {};
		let favorites = document.querySelector('#favorites-id');
		let center = this.map.myMap.getCenter();
		if (data && data[0] === center[0] && data[1] === center[1])
		{
			// Округляем
			center = data.map(function(str) { return +(+str).toFixed(7); });

			let active = false;

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
		else
		{
			if (Object.keys(favoritesObj).length > 0)
			{
				let active = false;

				// Координаты центра карты
				if (center)
				{
					// Преобразуем к типу number
					center = center.map(function(str) { return +(+str).toFixed(7); });
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
	}
}