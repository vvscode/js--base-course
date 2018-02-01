// on(eventName, cb)
// off(eventName[, cb])
// trigger(eventName[, data1 [, data2 [...data]]])

// once(eventName, cb)
function EventBus() {
  this.listeners = {};
}

EventBus.prototype.trigger = function(event) {
  if (this.listeners[event]) {
    let args = Array.prototype.slice.call(arguments, 1);
    this.listeners[event].forEach((callback) => callback.apply(null, args));
  }
};
EventBus.prototype.on = function(event, callback) {
  if (!this.listeners[event]) this.listeners[event] = [];
  this.listeners[event].push(callback);
};
EventBus.prototype.off = function(event, callback) {
  if (!callback) {
    this.listeners[event].splice(0, this.listeners[event].length);
    return;
  }
  this.listeners[event] = (this.listeners[event] || []).filter(
    (listener) => listener !== callback
  );
};

EventBus.prototype.once = function(event, callback) {
  let self = this;
  this.on(event, function decorator() {
    self.off(event, decorator);
    callback.apply(null, arguments);
  });
};
