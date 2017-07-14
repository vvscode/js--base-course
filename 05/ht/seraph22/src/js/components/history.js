export default class History
{
	constructor(request, general)
	{
		this.request = request;
		this.general = general;
		this.list = document.querySelector('.forecasts-list');

		// Подписываемся на изменения
		this.general.eventBus.on('forecastsObj', this.render.bind(this));
	}

	render(forecastsObj)
	{
		if (Object.keys(forecastsObj).length > 0)
		{
			/*console.log(
				'%c%s%c %s',
				'background: #333333; color: #83d1f7',
				'forecastsObj',
				'background: #fff; color: #000',
				JSON.stringify(forecastsObj,'',4)
			);*/

			this.list.innerHTML = `<p class="forecasts-list-header">Последние просмотренные:</p>`;

			for (let key in forecastsObj)
			{
				this.list.innerHTML += `<p title="${forecastsObj[key].description}" class="forecasts-list-item">${forecastsObj[key].searchRequest} <span>${forecastsObj[key].temperature}&deg;C<span></p>`;
			}

			// Добавим EventListener на элементы списка
			let item = document.querySelectorAll('.forecasts-list-item');
			let search = document.querySelector('#search-field-id');

			for (let i = 0; i < item.length; i++)
			{
				item[i].addEventListener('click', () =>
				{
					let split = event.target.innerHTML.split(' <span>');

					for (let key in forecastsObj)
					{
						if (forecastsObj[key].searchRequest === split[0])
						{
							search.value = forecastsObj[key].searchRequest;
							this.request.run(search.value);
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
}