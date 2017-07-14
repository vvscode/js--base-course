export default class Index
{
	constructor(map)
	{
		this.name = 'index';
		this.match = '';
		this.map = map;
		this.status = false;
	}

	onBeforeEnter()
	{
		if (!this.status)
		{
			this.status = true;
			this.map.getAPI();
		}
	}

	onEnter()
	{
		let map = document.querySelector('.wrapper .container .main .map');
		map.classList.remove('hidden');

		let selected = document.querySelector('.wrapper .container .main .main-menu #index-id');
		selected.classList.add('selected');
	}

	onLeave()
	{
		let map = document.querySelector('.wrapper .container .main .map');
		map.classList.add('hidden');

		let selected = document.querySelector('.wrapper .container .main .main-menu #index-id');
		selected.classList.remove('selected');
	}
};