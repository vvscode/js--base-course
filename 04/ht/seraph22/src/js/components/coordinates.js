export default class Coordinates
{
	constructor(request, map)
	{
		this.request = request;
		this.map = map;
		this.hash = window.location.hash;
		this.coordinates = [];
		this.init();
	}

	init()
	{
		this.coordinates = this.hash;

		if (this.coordinates.indexOf('#') === 0)
		{
			this.coordinates = this.coordinates.slice(1);
		}

		if (this.coordinates.indexOf('#') >= 0)
		{
			this.coordinates = this.coordinates.split('#');
			// Преобразуем к типу number
			this.coordinates = this.coordinates.map((str) => { return +str; });

			// Подгружаем API яндекса
			this.map.getAPI();

			// Не смог сделать через колбэки..=(
			setTimeout(()=>(this.request.run(this.coordinates)), 3000);
		}
	}
}