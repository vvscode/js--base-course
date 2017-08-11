export default class Router
{
	constructor(routes, general)
	{
		this.routes = routes || [];
		this.general = general;

		this.init();
	}

	init()
	{
		// Подписать this.handleUrl на изменения url, чтобы отслеживать переключение между страницами сайта
		window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
		// Выполнить this.handleUrl для текущего урла
		this.handleUrl(window.location.hash);
	}

	findPreviousActiveRoute()
	{
		//console.log(`---> router findPreviousActiveRoute: ${(this.currentRoute || {}).name}`);
		// Найти роут с которого уходим
		return this.currentRoute;
	}

	findNewActiveRoute(url)
	{
		// Найти роут на который переходим
		let route = this.routes.find((routeItem) =>
		{
			if (typeof routeItem.match === 'string')
			{
				return url === routeItem.match;
			}
			else if (typeof routeItem.match === 'function')
			{
				return routeItem.match(url);
			}
			else if (routeItem.match instanceof RegExp)
			{
				return url.match(routeItem.match);
			}
		});

		if (!route)
		{
			route = this.routes['0']; // Главная страница
		}

		//console.log(`---> router findNewActiveRoute: ${url} -- ${(route || {}).name}`);
		return route;
	}

	handleUrl(url)
	{
		url = url.slice(1);

		// Найти текущий роут
		let previousRoute = this.findPreviousActiveRoute();

		// Найти новый роут
		let newRoute = this.findNewActiveRoute(url);

		// Если есть роут с которого уходим - выполнить его .onLeave
		Promise.resolve()
		       .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(window.location.hash, this.general.eventBus))

		       // После этого выполнить .onBeforeEnter для нового активного роута
		       .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(window.location.hash, this.general.eventBus))

		       // После этого выполнить .onEnter для нового активного роута ( только если с .onBeforeEnter все ок)
		       .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(window.location.hash, this.general.eventBus))
		       .then(() => { this.currentRoute = newRoute; });
	}
}