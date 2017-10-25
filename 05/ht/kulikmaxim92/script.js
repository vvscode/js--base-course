/**
 * EventBus
 */
function EventBus() {
  this.listeners = {};
}

EventBus.prototype.on = function(event, cb) {
  this.listeners[event] = this.listeners[event] || [];
  this.listeners[event].push(cb);
};

EventBus.prototype.off = function(event, cb) {
  if (!this.listeners[event] || !this.listeners[event].length) {
    return;
  }

  if (!cb) {
    this.listeners[event].splice(0, this.listeners[event].length);
    return;
  }

  var index = this.listeners[event].indexOf(cb);
  while (index >= 0) {
    this.listeners[event].splice(index, 1);
    index = this.listeners[event].indexOf(cb);
  }
};

EventBus.prototype.trigger = function(event) {
  if (this.listeners[event]) {
    var args = Array.prototype.slice.call(arguments, 1);
    this.listeners[event].forEach((cb) => cb.apply(null, args));
  }
};

EventBus.prototype.once = function(event, cb) {
  var self = this;
  this.on(event, function wrapper() {
    var args = Array.prototype.slice.call(arguments, 0);
    cb.apply(null, args);
    self.off(event, wrapper);
  });
};

/**
 * compileTemplate = (tpl) => (el, data)
 */
function compileTemplate(template) {
  var regex = /{{(.+?)}}/;
  return function(element, data) {
    var coincidence = template.match(regex);

    while (coincidence) {
        template = template.replace(coincidence[0], getPropertyValue(data, coincidence[1].split('.')));
        coincidence = template.match(regex);
    }

    element.innerHTML = template.replace(regex, data);
  };
}

function getPropertyValue(obj, properties) {
  var property = obj;
  while (properties.length) {
      property = property[properties.shift()];
  }

  return property;
}

/**
 * Router
 */
function Router(routes, eventBus) {
  this.routes = routes || [];
  this.init(eventBus);
}

Router.prototype.init = function(eventBus) {
  if (eventBus) {
    eventBus.on('changeUrl', (oldUrl, newUrl) => {
      this.handleUrl(oldUrl, newUrl);
    });
  }
};

Router.prototype.handleUrl = function(oldUrl, newUrl) {
  var previousRoute = this.findRoute(oldUrl);
  var nextRoute = this.findRoute(newUrl);

  var oldUrlParams = this.getUrlParams(oldUrl);
  var newUrlParams = this.getUrlParams(newUrl);

  return Promise.resolve()
    .then(() => {
      previousRoute &&
      previousRoute.onLeave &&
      (oldUrlParams ? previousRoute.onLeave(oldUrlParams) : previousRoute.onLeave());
    })
    .then(() => {
      nextRoute &&
      nextRoute.onBeforeEnter &&
      (newUrlParams ? nextRoute.onBeforeEnter(newUrlParams) : nextRoute.onBeforeEnter());
    })
    .then(() => {
      nextRoute &&
      nextRoute.onEnter &&
      (newUrlParams ? nextRoute.onEnter(newUrlParams) : nextRoute.onEnter());
    });
};

Router.prototype.findRoute = function(url) {
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

Router.prototype.getUrlParams = function(url) {
  var route = this.findRoute(url);

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
