let Router = function (options) {
    this.routes = options.routes || [];
    this.eventBus = options.eventBus;
    this.init();
};

Router.prototype = {
    init: function () {
        // 1. Подписать this.handleUrl на изменения url
        window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
        // 2. Выполнить this.handleUrl
        this.handleUrl(window.location.hash);
    },
    findPreviousActiveRoute: function () {
        // Найти роут с которого уходим
        return this.currentRoute;
    },
    findNewActiveRoute: function (url) {
        // Найти роут на который переходим
        let route = this.routes.find((routeItem) => {
            if (typeof routeItem.match === 'string') {
                return url === routeItem.match;
            } else if (typeof routeItem.match === 'function') {
                return routeItem.match(url);
            } else if (routeItem.match instanceof RegExp) {
                return url.match(routeItem.match);
            }
        });
        return route;
    },
    getRouteParams(route, url) {
        let params = url.match(route.match) || [];
        params.shift();
        return params;
    },
    handleUrl: function (url) {
        url = url.slice(1);
        // Найти текущий роут
        let previousRoute = this.findPreviousActiveRoute();
        // Найти новый роут
        let newRoute = this.findNewActiveRoute(url);

        let routeParams = this.getRouteParams(newRoute, url);

        // Если есть роут с которого уходим - выполнить его .onLeave
        Promise.resolve()
            .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(...this.currentRouteParams))
            // После этого выполнить .onBeforeEnter для нового активного роута
            .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(...routeParams))
            // После этого выполнить .onEnter для ногового активного роута ( только если с .onBeforeEnter все ок)
            .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(...routeParams))
            .then(() => {
                this.currentRoute = newRoute;
                this.currentRouteParams = routeParams;
            });
    },
};

let router = new Router({
    routes: [{
        name: 'index',
        match: '',
        onBeforeEnter: () => {

        },
        onEnter: () => {

        },
        onLeave: () => {

        }
    },{
        name: 'city',
        match: /city(.+)/,
        onBeforeEnter: () => {

        },
        onEnter: () => {
            newEventBus.trigger('init');
        },
        onLeave: () => {

        }
    },{
        name: 'string',
        match: (text) => text ,
        onBeforeEnter: () => {

        },
        onEnter: () => {

        },
        onLeave: () => {

        }
    }]
});