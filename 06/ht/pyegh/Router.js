var Router = function (options){
    this.routes = options.routes || [];
    this.eventBus = options.eventBus;
    this.init();
}


Router.prototype = {
    init: function(){
        // subscribe window on hashchange to handle url from router
        window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
        // and at once handle base url
        //this.handleUrl(window.location.hash);
    },
    findPreviousActiveRoute: function(){
        return this.currentRoute;
    },
    findNewActiveRoute: function (url) {
        // return just part of url after # symbol
        var url = url.split('#').pop();

        return this.routes.find((route) => {
            if(typeof route.match === 'string'){
                return route.match === url;
            }

            if (route.match instanceof RegExp) {
                return route.match.test(url);
            }

            if (typeof route.match === 'function') {
                return route.match(url);
            }
        })
    },
    getRouteParams: function(route, url) {
        var params = url.match(route.match) || [];
        params.shift();
        return params;
    },
    handleUrl: function (url) {
        url = url.slice(1);
        // Найти текущий роут
        var prevRoute = this.findPreviousActiveRoute();
        // Найти новый роут
        var newRoute = this.findNewActiveRoute(url);

        var newRouteParams = this.getRouteParams(newRoute, url);

        if(prevRoute && prevRoute.onLeave){
            prevRoute.onLeave(this.currentRouteParams);
        }

        if(newRoute && newRoute.onBeforeEnter){
            newRoute.onBeforeEnter(newRouteParams);
        }

        if(newRoute && newRoute.onEnter){
            newRoute.onEnter(newRouteParams);
        }

        this.currentRoute = newRoute;
        this.currentRouteParams = newRouteParams;
    },
};