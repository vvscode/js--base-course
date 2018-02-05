'use strict';
class Router {
    constructor(options = []) {
        this.routes = options.routes;
        window.addEventListener("hashchange", () => this.hashCheck(window.location.hash));
        this.hashCheck(window.location.hash);
    }
    findNewRoute(hash) {
        let route;
        let self = this;
        if (!this.routes) {
            return;
        } else if (this.routes.length === 1) {
            return this.findRoute(hash, this.routes[0]);
        } else {
            this.routes.forEach((routeItem) => {
                if (self.findRoute(hash, routeItem)) {
                    return route = routeItem;
                }
            });
        }
        return route;
    }

    findRoute(hash, item){
        if (typeof item.match === 'string' && hash === item.match ||
            typeof item.match === 'function' && item.match(hash) ||
            item.match instanceof RegExp && hash.match(item.match)) {
            return item;
        }
    }

    hashCheck(hash){
        hash = hash.slice(1);
        let preRoute = this.activeRoute;
        let newRoute = this.findNewRoute(hash);

        if (!newRoute) {
            return;
        } else if (typeof newRoute.match === 'string') {
            this.routeParams = newRoute.match;
        } else if (newRoute.match instanceof RegExp) {
            this.routeParams = hash.match(newRoute.match)[1];
        } else if (typeof newRoute.match === 'function') {
            this.routeParams = newRoute.match(hash);
        }

        Promise.resolve()
            .then(() => {
                if (preRoute && preRoute.onLeave) {
                    this.preRouteParams ? preRoute.onLeave(this.preRouteParams) : preRoute.onLeave()
                }
            })
            .then(() => {
                if (newRoute && newRoute.onBeforeEnter) {
                    this.routeParams ? newRoute.onBeforeEnter(this.routeParams) : newRoute.onBeforeEnter()
                }
            })
            .then(() => {
                if (newRoute && newRoute.onEnter) {
                    this.routeParams ? newRoute.onEnter(this.routeParams) : newRoute.onEnter()
                }
            })
            .then(() => {
                this.activeRoute = newRoute;
                this.preRouteParams = this.routeParams;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default Router;