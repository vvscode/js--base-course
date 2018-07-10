var tpl = "{{name}} is {{age}} years old";
var el = document.createElement("div");

function createTemplate(template) {
    function template(element, object) {
        var array = tpl.split(" ");
        array.forEach(i => {
            if (/{{.+}}/g.test(i)) {
                var template = i.match(/\w+/);
                array[array.indexOf(i)] = i.replace(
                    /{{.+?}}/g,
                    object[template]
                );
            }
        });
        element.innerHTML = array.join(" ");
    }
    return template;
}

var template = createTemplate(tpl);
template(el, { name: "Bob", age: 33 });
el.innerHTML;

// EventBus

function EventBus() {
    this.handlers = {};
}
EventBus.prototype = {
    on(eventName, callback) {
        this.handlers[eventName] = this.handlers[eventName] || [];
        this.handlers[eventName].push(callback);
    },
    off(eventName) {
        var data = [].slice.call(arguments, 1);
        data.forEach(mainElement => {
            this.handlers[eventName] = this.handlers[eventName].filter(
                elem => elem != mainElement
            );
        });
    },
    trigger: function(eventName) {
        var data = [].slice.call(arguments, 1);
        if (this.handlers[eventName]) {
            this.handlers[eventName].forEach(function(element) {
                return element.apply(null, data);
            });
        }
    },
    once: function(eventName, callback) {
        var self = this;
        self.on(eventName, function temp() {
            callback.apply(self, arguments);
            self.off(eventName, temp);
        });
    }
};

// Router

function HashRouter(options) {
    options = options || {};
    this.routes = options.routes || [];
    this.handleUrl(getHash());
    window.addEventListener(
        "hashchange",
        function() {
            this.handleUrl(getHash());
        }.bind(this)
    );
}

HashRouter.prototype = {
    handleUrl: function(url) {
        var routes = this.routes || [];
        var result = findRoute(routes, url);
        var route = result[0];
        var params = result[1];
        if (!route) {
            return;
        }

        Promise.resolve()
            .then(() => {
                if (this.prevRoute && this.prevRoute.onLeave) {
                    return this.prevRoute.onLeave.call(
                        this.prevRoute,
                        this.prevParams
                    );
                }
            })
            .then(() => {
                if (route.onBeforeEnter) {
                    return route.onBeforeEnter.call(route, params);
                }
            })
            .then(() => {
                this.prevRoute = route;
                this.prevParams = params;
                if (route.onEnter) {
                    return route.onEnter.call(route, params);
                }
            });
    }
};
function getHash() {
    return decodeURI(window.location.hash).slice(1);
}
function findRoute(routeList, url) {
    var result = [null, null];
    routeList.forEach(function(route) {
        if (result[0]) {
            return;
        }
        if (route.match === url) {
            result = [route, url];
        } else if (route.match instanceof RegExp && route.match.test(url)) {
            result = [route, url.match(route.match)];
        } else if (
            typeof route.match === "function" &&
            route.match.call(this, url)
        ) {
            result = [route, route.match.call(this, url)];
        }
    });
    return result;
}