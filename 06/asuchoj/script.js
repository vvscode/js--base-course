'use strict';
/*шаблонизатор*/
let compileTemplate = function(tp) {
    let newTp = tp;
    return function(el, data, ) {
        for (let key in data) {
            let regexp = new RegExp("{{" + key + "}}");
            newTp = newTp.replace(regexp, data[key]);
        }
        return el.innerHTML = newTp;
    }
};

function EventBus() {
    this.listeners = {};
}
EventBus.prototype.on = function(eventName, cb) {
    this.listeners[eventName] = Array.isArray(this.listeners[eventName]) ? this.listeners[eventName] : [];
    this.listeners[eventName].push(cb);
};
EventBus.prototype.off = function(eventName, cb) {
    if (!eventName && cb) {
        for (let key in this.listeners) {
            this.listeners[key].forEach((el) => {
                let newArr = [];
                if (el !== cb) {
                    newArr.push(el)
                }
                return this.listeners[key] = newArr;
            })
        }
    }
    if (eventName && !cb) {
        for (let key in this.listeners) {
            if (this.listeners[key] === this.listeners[eventName]) {
                this.listeners[eventName] = undefined;
            }
        }
    }
    if (eventName && cb) {
        let newArr = [];
        if (cb === undefined) return;
        this.listeners[eventName].forEach((el) => {
            if (el !== cb) {
                newArr.push(el)
            }
        });
        return this.listeners[eventName] = newArr;
    }
    if (!eventName && !cb) {
        return this.listeners = {};
    }
};
EventBus.prototype.trigger = function(eventName, ...data) {
    (this.listeners[eventName] || []).forEach(cb => cb.apply(this, data))
};
EventBus.prototype.once = function(eventName, cb) {
    let self = this;

    function addOnceCallback() {
        cb.apply(this, arguments);
        self.off(eventName, addOnceCallback);
    }
    this.on(eventName, addOnceCallback);
};

/*роутер*/
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