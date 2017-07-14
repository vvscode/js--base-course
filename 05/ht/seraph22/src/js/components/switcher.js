export default class Switcher
{
	constructor(el)
	{
		this.el = el;
		this.setDefault();
	}

	setDefault()
	{
		let element = document.querySelector(this.el);
		element.checked = true;
	}

	check()
	{
		let element = document.querySelector(this.el);
		return element.checked;
	}
}