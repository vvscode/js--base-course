export default class Router
{
	constructor(routes, eventBus)
	{
		this.routes = routes || [];
		this.eventBus = eventBus;
		this.init();
	}

	init()
	{
		window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
		this.handleUrl(window.location.hash);
	}

	findPreviousActiveRoute()
	{
		return this.currentRoute;
	}

	findNewActiveRoute(url)
	{
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

		let previousRoute = this.findPreviousActiveRoute();
		let newRoute = this.findNewActiveRoute(url);

		Promise.resolve()
		       .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(window.location.hash, this.eventBus))
		       .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(window.location.hash, this.eventBus))
		       .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(window.location.hash, this.eventBus))
		       .then(() => { this.currentRoute = newRoute; });
	}
}