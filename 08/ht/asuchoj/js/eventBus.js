'use strict';
function EventBus() {
  this.listeners = {};
}
EventBus.prototype.on = function(eventName, cb) {
  this.listeners[eventName] = Array.isArray(this.listeners[eventName]) ? this.listeners[eventName] : [];
  this.listeners[eventName].push(cb);
};
EventBus.prototype.off = function(eventName, cb) {
  if (!eventName && cb) {
    for (let key in this.listeners) {
      if(this.listeners.hasOwnProperty(key)){
        this.listeners[key].forEach((el) => {
          let newArr = [];
          if (el !== cb) {
            newArr.push(el)
          }
          return this.listeners[key] = newArr;
        })
      }
    }
  }

  if (eventName && !cb) {
    for (let key in this.listeners) {
      if(this.listeners.hasOwnProperty(key)){
        if (this.listeners[key] === this.listeners[eventName]) {
          this.listeners[eventName] = undefined;
        }
      }
    }
  }

  if (eventName && cb) {
    let newArr = [];
    if (cb === undefined) return;
    this.listeners[eventName].forEach((el) => {
      if (el !== cb) {
        newArr.push(el)
      }
    });
    return this.listeners[eventName] = newArr;
  }

  if (!eventName && !cb) {
    return this.listeners = {};
  }
};

EventBus.prototype.trigger = function(eventName, ...data) {
  (this.listeners[eventName] || []).forEach(cb => cb.apply(this, data))
};
EventBus.prototype.once = function(eventName, cb) {
  let self = this;

  function addOnceCallback() {
    cb.apply(this, arguments);
    self.off(eventName, addOnceCallback);
  }
  this.on(eventName, addOnceCallback);
};
