export default class Search
{
	constructor(request, general)
	{
		this.search = document.querySelector('#search-field-id');
		this.request = request;
		this.general = general;
		this.init();
	}

	init()
	{
		let debounce = this.general.debounce(this.sendRequest.bind(this), 1300);

		this.search.addEventListener('input', () =>
		{
			this.general.eventBus.trigger('search:request', debounce());
		});

		this.search.addEventListener('keypress', (el) =>
		{
			let key = el.which || el.keyCode;
			if (key === 13)
			{
				el.preventDefault();
				this.general.eventBus.trigger('search:request', this.sendRequest.bind(this));
			}
		});
	}

	sendRequest()
	{
		if (this.search.value && this.search.value.length > 3)
		{
			this.request.run(this.search.value);
		}
	}
}