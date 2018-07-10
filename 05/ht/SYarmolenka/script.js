const compileTemplate = tpl => (el, data) => {
  el.innerHTML = tpl.replace(/{{\w+}}/g, key => data[key.match(/\w+/)[0]]);
};

class EventBus {
  constructor (events) {
    if (typeof events === 'object') {
      let fail;
      for (let key in events) {
        if (events[key].push) {
          events[key].forEach(cb => { fail = (typeof cb === 'function') ? 0 : 1; });
        } else { events = 0; };
      };
      events = fail ? 0 : events;
    };
    this.events = events || {};
  };
  on (event, cb) {
    if (event in this.events) {
      this.events[event].push(cb);
    } else {
      this.events[event] = [cb];
    }
  };
  off (event, cb) {
    if (!(event in this.events)) return;
    if (cb) {
      this.events[event].forEach((el, i, arr) => el === cb ? arr.splice(i, 1) : 0);
    } else {
      delete this.events[event];
    };
  };
  once (event, cb) {
    const inside = (...args) => {
      cb(...args);
      this.off(event, inside);
    };
    this.on(event, inside);
  };
  trigger (event, ...data) {
    if (event in this.events) this.events[event].forEach(el => el(...data));
  };
};

class Router {
  constructor (routes) {
    this.routes = routes;
    this.start();
    this.iterateByRoutes(`#`, window.location.hash.slice(1));
  };
  start () {
    window.addEventListener('hashchange', e => {
      const oldHash = e.oldURL.match(/.+#(.+)/) ? e.oldURL.match(/.+#(.+)/)[1] : '';
      const newHash = e.newURL.match(/.+#(.+)/) ? e.newURL.match(/.+#(.+)/)[1] : '';
      this.iterateByRoutes(oldHash, newHash);
    });
  };
  iterateByRoutes (oldHash, newHash) {
    let beforeEnter, enter, leave;
    this.routes.forEach(route => {
      if (typeof route.match === 'string') {
        if (route.match === oldHash) {
          leave = ('onLeave' in route) ? route.onLeave : 0;
        };
        if (route.match === newHash) {
          beforeEnter = ('onBeforeEnter' in route) ? route.onBeforeEnter : 0;
          enter = ('onEnter' in route) ? route.onEnter : 0;
        };
      };
      if (route.match instanceof RegExp) {
        if (oldHash.match(route.match)) {
          leave = ('onLeave' in route) ? _ => route.onLeave(oldHash.match(route.match)[1]) : 0;
        };
        if (newHash.match(route.match)) {
          beforeEnter = ('onBeforeEnter' in route) ? _ => route.onBeforeEnter(newHash.match(route.match)[1]) : 0;
          enter = ('onEnter' in route) ? _ => route.onEnter(newHash.match(route.match)[1]) : 0;
        };
      };
      if (typeof route.match === 'function') {
        if (route.match(oldHash)) {
          leave = ('onLeave' in route) ? _ => route.onLeave(route.match(oldHash)) : 0;
        };
        if (route.match(newHash)) {
          beforeEnter = ('onBeforeEnter' in route) ? _ => route.onBeforeEnter(route.match(newHash)) : 0;
          enter = ('onEnter' in route) ? _ => route.onEnter(route.match(newHash)) : 0;
        };
      };
    });
    if (beforeEnter === undefined && enter === undefined) window.location.hash = oldHash;
    Promise.resolve().then(_ => {
      if (leave) leave();
      if (beforeEnter) beforeEnter();
      if (enter) enter();
    });
  };
};
