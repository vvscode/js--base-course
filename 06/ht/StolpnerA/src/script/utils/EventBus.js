class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(ev, handler) {
    this.listeners[ev] = this.listeners[ev] || [];
    this.listeners[ev].push(handler);
  }

  trigger(ev, ...args) {
    (this.listeners[ev] || []).forEach(handler => handler.apply(null, args));
  }

  off(ev, handler) {
    (this.listeners[ev] || []).forEach((item, i) => {
      if (item === handler) {
        this.listeners[ev].splice(i, 1);
      }
    }, this);
  }

  once(ev, handler) {
    let that = this;
    this.on(ev, function offMethod() {
      handler.apply(null, arguments);
      that.off(ev, offMethod);
    });
  }
}

export default EventBus;
