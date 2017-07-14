export default class Forecast
{
	constructor(general)
	{
		this.general = general;

		// Подписываемся на изменения
		this.general.eventBus.on('currentForecastObj', this.show);
	}


	show(currentForecastObj)
	{
		let description = document.querySelector('.description');
		let forecastDataOutput = document.querySelector('.forecast');
		let currentForecast = currentForecastObj[Object.keys(currentForecastObj)[0]];

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
}