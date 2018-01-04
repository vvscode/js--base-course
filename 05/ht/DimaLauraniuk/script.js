function compileTemplate(template) {
    return function (element, templateObj) {
        for (key in templateObj) {
            template = template.split('{{' + key + '}}').join(templateObj[key]);
        }
        element.innerHTML = template;
    }
}

function EventBus() {
    this.listeners = {};
}

EventBus.prototype.trigger = function () {
    var event = arguments[0];
    var data = [].slice.call(arguments, 1);
    (this.listeners[event] || []).forEach(cb => {
        if (typeof cb === 'function') {
            cb.apply(this, data);
        }
    });
};

EventBus.prototype.on = function (event, cb) {
    this.listeners[event] = (this.listeners[event] || []);
    this.listeners[event].push(cb);
};

EventBus.prototype.off = function (event, cb) {
    this.listeners[event].splice(this.listeners[event].indexOf(event), 1);
};

EventBus.prototype.once = function (event, cb) {
    var state = this;
    this.on(event, function f() {
        cb.apply(null, arguments);
        state.off(event, f);
    });
};

function Router(routeParams) {
    this.routes = routeParams || [];
    this.currentRoute;
    this.previousRoute;
    this.currentParams;
    this.previousParams;
    window.addEventListener('hashchange', (event) => {
        this.handler(window.location.hash);
    });
    this.handler(window.location.hash);
}

Router.prototype = {
    handler: function (hash) {
        this.previousRoute = this.currentRoute;
        this.previousParams = this.currentParams;
        this.currentRoute = this.findRoute(hash);
        this.launchHandlers();
    },
    findRoute: function (hash) {
        hash = hash.slice(1);
        for (var i = 0; i < this.routes.length; i++) {
            var routeElement = this.routes[i];
            if (typeof (routeElement.match) == "string" && routeElement.match == hash) {
                this.currentParams = '';
                return routeElement;
            }
            if (typeof (routeElement.match) == "function" && routeElement.match(hash)) {
                this.currentParams = '';
                return routeElement;
            }
            if ((routeElement.match instanceof RegExp) && routeElement.match.test(hash)) {
                this.currentParams = hash.match(routeElement.match) || [];
                this.currentParams.splice(0, 1);
                return routeElement;
            }
        }
    },
    launchHandlers() {
        Promise.resolve()
            .then(() => {
                this.previousRoute && this.previousRoute.onLeave && this.previousRoute.onLeave(this.previousParams)
            })
            .then(() => {
                this.currentRoute && this.currentRoute.onBeforeEnter && this.currentRoute.onBeforeEnter(this.currentParams)
            })
            .then(() => {
                this.currentRoute && this.currentRoute.onEnter && this.currentRoute.onEnter(this.currentParams)
            })
    }
}