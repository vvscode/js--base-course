export default class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(eventName, cb) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(cb);
  }

  off(eventName, cb) {
    if (this.listeners[eventName] || []) {
      this.listeners[eventName].splice(
        this.listeners[eventName].indexOf(cb),
        1
      );
    }
  }

  trigger(eventName, data) {
    if (this.listeners[eventName] || []) {
      this.listeners[eventName].forEach(cb => {
        cb(data);
      });
    }
  }

  once(eventName, cb) {
    let func = function(data) {
      cb(data);
      this.off(eventName, func);
    }.bind(this);

    this.on(eventName, func);
  }
}
