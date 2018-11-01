'use strict';

function Router(options) {
    this.routes = options.routes || [];
    this.eventBus = options.eventBus;
    window.addEventListener('hashchange', () =>
        this.handleUrl(decodeURIComponent(window.location.hash))
    );
    this.handleUrl(decodeURIComponent(window.location.hash));
}

Router.prototype.handleUrl = function(url) {
    url = url.slice(1);
    let previousRoute = this.currentRoute;
    var newRoute = this.findNewActiveRoute(url);
    let routeParams = this.getRouteParams(newRoute, url);
    return Promise.resolve()
        .then(() => {
            if (previousRoute) {
                if (this.eventBus) {
                    //"route:about:leave"
                    this.eventBus.trigger(
                        'route:' + previousRoute.name + ':leave',
                        ...this.currentRouteParams
                    );
                }
                return (
                    previousRoute.onLeave &&
                    previousRoute.onLeave(...this.currentRouteParams)
                );
            }
        })
        .then(() => {
            if (newRoute) {
                if (this.eventBus) {
                    //"route:about:beforeenter"
                    this.eventBus.trigger(
                        'route:' + newRoute.name + ':beforeenter',
                        ...routeParams
                    );
                }
                return (
                    newRoute.onBeforeEnter &&
                    newRoute.onBeforeEnter(...routeParams)
                );
            }
        })
        .then(() => {
            if (newRoute) {
                if (this.eventBus) {
                    //"route:about:enter"
                    this.eventBus.trigger(
                        'route:' + newRoute.name + ':enter',
                        ...routeParams
                    );
                }
                return newRoute.onEnter && newRoute.onEnter(...routeParams);
            }
        })
        .then(() => {
            this.currentRoute = newRoute;
            this.currentRouteParams = routeParams;
        });
};

Router.prototype.findNewActiveRoute = function(url) {
    for (let i = 0; i < this.routes.length; i++) {
        let route = this.routes[i];
        if (typeof route.match === 'string') {
            if (url === route.match) {
                return route;
            }
        } else if (typeof route.match === 'function') {
            if (route.match(url)) {
                return route;
            }
        } else if (route.match instanceof RegExp) {
            if (url.match(route.match)) {
                return route;
            }
        }
    }
};

Router.prototype.getRouteParams = function(newRoute, url) {
    if (!newRoute) {
        return [];
    }
    if (newRoute.match instanceof RegExp) {
        var params = url.match(newRoute.match) || [];
        params.shift();
        return params;
    } else {
        return [];
    }
};
