import Request from '../utils/request';

export default class Map
{
	constructor(general)
	{
		this.general = general;
		this.el = '#map';
		this.myMap = {};
	}

	getAPI()
	{
		let script = document.createElement('script');
		script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
		document.head.appendChild(script);

		let afterLoad = () => this.init();

		script.onload = script.onerror = () =>
		{
			if (!this.executed)
			{
				this.executed = true;
				afterLoad();
			}
		};

		script.onreadystatechange = () =>
		{
			let self = this;
			if (this.readyState === "complete" || this.readyState === "loaded")
			{
				setTimeout(() => { self.onload(); }, 0); // сохранить "this" для onload
			}
		};
	}

	init()
	{
		let elem = this.el.slice(1);
		let coordinates; // Начальные координаты для карты

		let map = () =>
		{
			ymaps.ready(() =>
			{
				this.myMap = new ymaps.Map(elem, {
					center: coordinates,
					zoom: 12,
					type: 'yandex#hybrid',
					controls: ['zoomControl']
				});

				// Вешаем обработчики на события карты
				onMouse();

				// Для кнопки избранное
				this.myMap.events.add('boundschange', () =>
				{
					this.general.eventBus.trigger('map:boundschange', this.myMap.getCenter());
				});
			});

			let sendRequest = () =>
			{
				let search = document.querySelector('#search-field-id');
				// При изменении центра чистим поиск
				search.value = '';

				let coordinates = this.myMap.getCenter();

				if (coordinates)
				{
					// Преобразуем к типу number
					coordinates = coordinates.map(function(str) { return +str.toFixed(7); });

					let request = new Request(this, this.general);
					request.run(coordinates);
				}
			};

			let onMouse = () =>
			{
				let debounce = this.general.debounce(sendRequest, 1300);

				this.myMap.events.add('mousedown', () =>
				{
					this.general.eventBus.trigger('map:mousedown', debounce());
				});

				this.myMap.events.add('wheel', () =>
				{
					this.general.eventBus.trigger('map:wheel', debounce());
				});
			};
		};

		// Если есть координаты в хеше при рефреше страницы, то переходим на них
		if (window.location.hash)
		{
			coordinates = window.location.hash;

			if (coordinates.indexOf('#') === 0)
			{
				coordinates = coordinates.slice(1);
			}
			coordinates = coordinates.split('#');

			// Преобразуем к типу number
			coordinates = coordinates.map((str) => { return +str; });
			map();
		}
		// Иначе определяем начальные координаты через userinfos
		else
		{
			fetch(`https://api.userinfo.io/userinfos`)
				.then((resp) => resp.json())
				.then((data) =>
				{
					return [data.position.latitude, data.position.longitude];
				})
				.then((data) => {
					coordinates = data;
					map();
				})
				.catch(reject => console.error(reject));
		}
	}

	render(coordinates)
	{
		this.myMap.setCenter(coordinates);
	}
}