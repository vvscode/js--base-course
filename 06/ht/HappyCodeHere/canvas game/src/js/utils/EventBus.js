class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(name, func) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(func);
  }

  off(name, func) {
    if (!this.listeners[name]) return;

    const index = this.listeners[name].indexOf(func);
    this.listeners[name].splice(index, 1);

    if (this.listeners[name].length === 0) {
      delete this.listeners[name];
    }
  }

  trigger(name, data) {
    if (!this.listeners[name]) return;

    this.listeners[name].map(item => {
      if (Array.isArray(data) && data.length > 0) {
        // паходу так не катит
        item(...data);
      } else {
        item(data);
      }
    });
  }

  once(name, func) {
    // пробовал через new Function вызывать функцию с таким же названием
    // и потом удалять в ней, не получилось
  }
}

export default EventBus;
