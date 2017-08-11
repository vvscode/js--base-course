export default class About
{
	constructor()
	{
		this.name = 'about';
		this.match = 'about';
	}

	onEnter()
	{
		let about = document.querySelector('.wrapper .container .main .about');
		about.classList.remove('hidden');
		about.innerHTML = `
			<p style="padding-top:250px;">© 2017 Forecast v2.3.1</p>
		`;

		let favorites = document.querySelector('.wrapper .container .main .favorites');
		favorites.classList.add('hidden');

		let selected = document.querySelector('.wrapper .container .main .main-menu #about-id');
		selected.classList.add('selected');
	}

	onLeave()
	{
		let about = document.querySelector('.wrapper .container .main .about');
		about.classList.add('hidden');

		let favorites = document.querySelector('.wrapper .container .main .favorites');
		favorites.classList.remove('hidden');

		let selected = document.querySelector('.wrapper .container .main .main-menu #about-id');
		selected.classList.remove('selected');
	}
};