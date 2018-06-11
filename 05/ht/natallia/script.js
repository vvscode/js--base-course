var compileTemplate = tpl => {
  return function(el, data) {
    let text = tpl.replace(/{{(\w+)}}/g, function(match, group) {
      if (data[group]) {
        return data[group];
      }
    });
    el.innerHTML = text;
  };
};

function EventBus() {
  this.listeners = {};
}

EventBus.prototype = {
  on: function(eventName, cb) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(cb);
  },

  off: function(eventName, cb) {
    if (this.listeners[eventName] || []) {
      this.listeners[eventName].splice(
        this.listeners[eventName].indexOf(cb),
        1
      );
    }
  },

  trigger: function(eventName, data) {
    if (this.listeners[eventName] || []) {
      this.listeners[eventName].forEach(cb => {
        cb(data);
      });
    }
  },

  once: function(eventName, cb) {
    let func = function(data) {
      cb(data);
      this.off(eventName, func);
    }.bind(this);

    this.on(eventName, func);
  }
};

var Router = function(options) {
  this.routes = options.routes || [];
  this.previosRoute;
  this.nextRoute;
  this.prev;
  this.next;

  this.handleUrl(window.location.hash);
  window.addEventListener('hashchange', () => {
    this.handleUrl(window.location.hash);
  });
};

Router.prototype = {
  handleUrl: function(url) {
    this.previosRoute = this.nextRoute;
    this.prev = this.next;
    this.url = url.replace(/#/, '');
    this.routes.forEach(el => {
      if (typeof el.match === 'string' && this.url === el.match) {
        this.nextRoute = url;
        this.next = el || {};
      } else if (typeof el.match === 'function' && el.match(this.url)) {
        this.nextRoute = this.url;
        this.next = el;
      } else if (
        el.match instanceof RegExp &&
        this.url.search(el.match) !== -1
      ) {
        this.nextRoute = this.url.match(el.match);
        this.nextRoute = this.nextRoute[1];
        this.next = el;
      }
    });
    if (this.previosRoute !== this.nextRoute) {
      Promise.resolve()
        .then(() => {
          this.prev &&
            this.prev.onLeave &&
            this.prev.onLeave(this.previosRoute);
        })
        .then(() => {
          this.next &&
            this.next.onBeforeEnter &&
            this.next.onBeforeEnter(this.nextRoute);
        })
        .then(() => {
          this.next && this.next.onEnter && this.next.onEnter(this.nextRoute);
        });
    }
  }
};
