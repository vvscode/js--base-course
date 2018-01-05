'use strict';
function compileTemplate(tp1) {
    let tp1Array = tp1.split(' ');
    let newString = "";
    return function (el, data) {
        tp1Array.forEach(function (templateWords) {
            let key = templateWords.slice(2, -2);
            if (templateWords.slice(0, 2) === "{{" && templateWords.slice(-2) === "}}"
                && data[key]) {
                newString += data[key] + " ";
            } else newString += templateWords + " ";
        });
        el.innerHTML = newString.slice(0, -1);
    }
}

function EventBus() {
    this.listeners = {};
}

EventBus.prototype.on = function (name, cb) {
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(cb);
};

EventBus.prototype.trigger = function (name, ...data) {
    if (this.listeners[name] && data.length) {
        this.listeners[name].forEach(cb => cb(...data));
    } else if (this.listeners[name]) {
        this.listeners[name].forEach(cb => cb(data));
    }
};

EventBus.prototype.off = function (name, cb) {
    if (!cb) {
        delete this.listeners[name];
    } else {
        this.listeners[name] = this.listeners[name].filter((arrayCallback) => !(cb === arrayCallback))
    }
};

EventBus.prototype.once = function (name, cb) {
    this.on(name, onceOff);
    let self = this;

    function onceOff(...data) {
        cb(...data);
        delete self.listeners[name];
    }
};

function Router(options = []) {
    this.routes = options.routes;
    window.addEventListener("hashchange", () => this.hashCheck(window.location.hash));
    this.hashCheck(window.location.hash);
}

Router.prototype = {
    findNewRoute: function (hash) {
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
    },
    findRoute: function (hash, item) {
        if (typeof item.match === 'string' && hash === item.match ||
            typeof item.match === 'function' && item.match(hash) ||
            item.match instanceof RegExp && hash.match(item.match)) {
            return item;
        }
    },
    hashCheck: function (hash) {
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
            .catch(() => {
            });

    },
};