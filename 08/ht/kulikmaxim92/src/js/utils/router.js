function Router(routes) {
    this.routes = routes || [];
    this.init();
}

Router.prototype.init = function () {
    window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
    this.handleUrl(window.location.hash);
};

Router.prototype.handleUrl = function (url) {
    var nextRoute = this.findRoute(url);
    var nextRouteParams = this.getUrlParams(nextRoute, url);

    return Promise.resolve()
        .then(() => {
            return this.currentRoute &&
                this.currentRoute.onLeave &&
                this.currentRoute.onLeave(this.currentRouteParams);
        })
        .then(() => {
            return nextRoute &&
                nextRoute.onBeforeEnter &&
                nextRoute.onBeforeEnter(nextRouteParams);
        })
        .then(() => {
            return nextRoute &&
                nextRoute.onEnter &&
                nextRoute.onEnter(nextRouteParams);
        })
        .then(() => {
            this.currentRoute = nextRoute;
            this.currentRouteParams = nextRouteParams;
        });
};

Router.prototype.findRoute = function (url) {
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

Router.prototype.getUrlParams = function (route, url) {
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

export default Router;