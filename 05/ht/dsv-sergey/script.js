function compileTemplate(tpl) {
    return function(el, data) {
        for (key in data) {
            var regexp = new RegExp("{{" + key + "}}",'g');

            tpl = tpl.replace(regexp, data[key]);
        }
        return (el.innerHTML = tpl);
    };
}

function EventBus() {
    this.listeners = {};
}
EventBus.prototype.on = function(event, hendler) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(hendler);
};
EventBus.prototype.off = function(event, hendler) {
    if (this.listeners[event].includes(hendler)) {
        var habArr = [];
        this.listeners[event].forEach(function(el, i, arr) {
            if (el != hendler) {
                habArr.push(el);
            }
        });
        this.listeners[event] = habArr;
    }
};
EventBus.prototype.trigger = function(event, data) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].forEach(function(hendler) {
        hendler(data);
    });
};
EventBus.prototype.once = function(event, hendler) {
    var wrapper = function(arg) {
        hendler(arg);
        this.off(event, wrapper);
    }.bind(this);
    this.on(event, wrapper);
};

function HashRouter() {
	this.handleUrl( getHash() );
    window.addEventListener("hashchange", function() { this.handleUrl( getHash() ) }.bind(this)
    );
}

HashRouter.prototype = {
    handleUrl: function(url) {
        var routes = this.routes || [];
        console.log(routes);
        var result = findRoute(routes, url);
        var route = result[0];
        var params = result[1];
        if (!route) {
            return;
        }

        Promise.resolve()
            .then(() => {
                if (route.onBeforeEnter) {
                    return route.onBeforeEnter.call(route, params);
                }
            })
            .then(() => {
                if (route.onEnter) {
                    route.onEnter.call(route, params);
                }
            });
    }
};

function getHash() {
    return decodeURI(window.location.hash).slice(1);
};

function findRoute(routeList, url) {
    var result = [null, null];
    routeList.forEach(function(route) {
        if (result[0]) {
            return;
        } // если роут уже нашли - остальное не проверяем
        if (route.match === url) {
            result = [route, url];
        } else if (RegExp(route.match).test(url)) {
            result = [route, url.match(route.match)];
        } else if (
            typeof route.match === "function" &&
            route.match.call(this, url)
        ) {
            result = [route, route.match.call(this, url)];
            console.log(result);
        }
    });
    return result;
}