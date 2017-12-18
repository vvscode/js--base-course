var Router = (function(eventBus) {
    function Router(routes, eventBus) {
        this.routes = routes || [];
        this.init(eventBus);
    }

    Router.prototype.init = function(eventBus) {
        if (eventBus) {
            eventBus.on('window:hashchange', (oldUrl, newUrl) => this.handleUrl(oldUrl, newUrl));
        }
    };

    Router.prototype.handleUrl = function(oldUrl, newUrl) {
        var previousRoute = this.findRoute(oldUrl);
        var nextRoute = this.findRoute(newUrl);

        var oldUrlParams = this.getUrlParams(oldUrl);
        var newUrlParams = this.getUrlParams(newUrl);

        return Promise.resolve()
            .then(() => {
                return previousRoute &&
                    previousRoute.onLeave &&
                    (oldUrlParams ? previousRoute.onLeave(oldUrlParams) : previousRoute.onLeave());
            })
            .then(() => {
                return nextRoute &&
                    nextRoute.onBeforeEnter &&
                    (newUrlParams ? nextRoute.onBeforeEnter(newUrlParams) : nextRoute.onBeforeEnter());
            })
            .then(() => {
                return nextRoute &&
                    nextRoute.onEnter &&
                    (newUrlParams ? nextRoute.onEnter(newUrlParams) : nextRoute.onEnter());
            });
    };

    Router.prototype.findRoute = function(url) {
        return this.routes.find((route) => {
            if (typeof route.match === 'string') {
                return route.match === url;
            }

            if (route.match instanceof RegExp) {
                return route.match.test(url);
            }

            if (typeof route.match === 'function') {
                return route.match(url);
            }
        });
    };

    Router.prototype.getUrlParams = function(url) {
        var route = this.findRoute(url);

        if (!route) {
            return;
        }

        if (route.match instanceof RegExp) {
            return url.match(route.match);
        }

        if (typeof route.match === 'function') {
            return route.match(url);
        }
    };

    return Router;
})(eventBus);
