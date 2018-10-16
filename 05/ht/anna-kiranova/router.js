'use strict';

//tests

describe('Router', function() {
    let router, a, b, c;

    beforeEach(() => {
        a = b = c = '';
        router = new Router({ 
            routes: [
                {
                name: 'index',
                match: '',
                onBeforeEnter: () => a = 'onBeforeEnter index',
                onEnter: () => b = 'onEnter index',
                onLeave: () => c = 'onLeave index'
                },
                {
                name: 'city',
                match: /city=(.+)/,
                onBeforeEnter: (city) => a = 'onBeforeEnter city:' + city,
                onEnter: (city) => b = 'onEnter city:' + city,
                onLeave: (city) => c = 'onLeave city:' + city
                },
                {
                name: 'about',
                match: (text) => text === 'about',
                onBeforeEnter: () => a = 'onBeforeEnter about',
                onEnter: () => b = 'onEnter about',
                onLeave: () => c = 'onLeave about'
                }
            ]
        });
    });
    
    it('Router is function', function() {
        assert.isFunction(Router);
    });

    it('method "handleUrl" exists', function() {
        assert.isFunction(router.handleUrl);
    });

    it('page "about" onBeforeEnter and "onEnter"', function(done) {
        router.handleUrl('#about').then(() => {
            assert.equal(a, 'onBeforeEnter about');
            assert.equal(b, 'onEnter about');
            done();
        });
    });
   
    it('page "index" onBeforeEnter and "onEnter"', function(done) {
        router.handleUrl('#index').then(() => {
            assert.equal(a, 'onBeforeEnter index');
            assert.equal(b, 'onEnter index');
            done();
        });
    });
    
    it('page "city" onBeforeEnter and "onEnter"', function(done) {
        router.handleUrl('#city=minsk').then(() => {
            assert.equal(a, 'onBeforeEnter city:minsk');
            assert.equal(b, 'onEnter city:minsk');
            done();
        });
    });

    it('test onLeave', function(done) {
        router.handleUrl('#about').then(() => {
            router.handleUrl('#city=minsk').then(() => {
                assert.equal(c, 'onLeave about');
                done();
            });
        });
    });
});

//code

function Router(options) {
    this.routes = options.routes || [];
    window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
    this.handleUrl(window.location.hash);
}  

Router.prototype.handleUrl = function(url) {
    url = url.slice(1);
    let previousRoute = this.currentRoute;
    var newRoute = this.findNewActiveRoute(url);
    let routeParams = this.getRouteParams(newRoute, url);
    return Promise.resolve()
        .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(...this.currentRouteParams))
        .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(...routeParams))
        .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(...routeParams))
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
}

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
}
