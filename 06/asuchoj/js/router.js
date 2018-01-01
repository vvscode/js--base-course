let Router = function(options) {
    options ? this.routes = options.routes : this.routes = [];
    this.init();
};

Router.prototype = {
    init: function() {
        window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
        this.handleUrl(window.location.hash);
    },

    findPreviousActiveRoute: function() {
        return this.currentRoute;
    },

    findNewActiveRoute: function(url) {
        let r = this.routes.find((routeItem) => {
            if (typeof routeItem.match === 'string') {
            return url === routeItem.match;
        } else if (typeof routeItem.match === 'function') {
            return routeItem.match(url);
        } else if (routeItem.match instanceof RegExp) {
            return url.match(routeItem.match);
        }
    });
        return r;
    },
    getRouteParams(route, url) {
        let params;
        if (!route && !url) {
            params = []
        } else {
            params = url.match(route.match);
        }
        return params;
    },

    handleUrl: function(url) {
        url = url.split('#').pop();
        let previousRoute = this.findPreviousActiveRoute();
        let newRoute = this.findNewActiveRoute(url);
        let routeParams = this.getRouteParams(newRoute, url);

        Promise.resolve()
            .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(...this.currentRouteParams))
            .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(...routeParams))
            .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(...routeParams))
            .then(() => {
                this.currentRoute = newRoute;
                this.currentRouteParams = routeParams;
            })
    },
};

let router = new Router({
    routes: [{
        name: 'about',
        match: 'about',
        onBeforeEnter: () => {
            addClassAndDel ()
        },
        onEnter: () => {
            addClassAndDel ()
        },
        onLeave: () => {
            addClassAndDel ()
        }
    }, {
        name: 'main',
        match: 'main',
        onBeforeEnter: () => {
            addClassAndDel ()
        },
        onEnter: () => {
            addClassAndDel ()
        },
        onLeave: () => {
            addClassAndDel ()
        }
    }, {
        name: 'author',
        match: 'author',
        onBeforeEnter: () => {
            addClassAndDel ()
        },
        onEnter: () => {
            addClassAndDel ()
        },
        onLeave: () => {
            addClassAndDel ()
        }
    }]
});

function addClassAndDel () {
    let a = document.querySelector('.page');
    a.classList.toggle("page-show");
}