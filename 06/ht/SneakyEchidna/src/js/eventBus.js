// on(eventName, cb)
// off(eventName[, cb])
// trigger(eventName[, data1 [, data2 [...data]]])

// once(eventName, cb)
/**
 * {*}
 */
class EventBus {
  constructor() {
    this.listeners = {};
  }

  trigger(event) {
    if (this.listeners[event]) {
      let args = Array.prototype.slice.call(arguments, 1);
      this.listeners[event].forEach((callback) => callback.apply(null, args));
    }
  }
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }
  off(event, callback) {
    if (!callback) {
      this.listeners[event].splice(0, this.listeners[event].length);
      return;
    }
    this.listeners[event] = (this.listeners[event] || []).filter(
      (listener) => listener !== callback
    );
  }

  once(event, callback) {
    let self = this;
    this.on(event, function decorator() {
      self.off(event, decorator);
      callback.apply(null, arguments);
    });
  }
}

export { EventBus };
