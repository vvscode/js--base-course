// on(eventName, cb)
// off(eventName[, cb])
// trigger(eventName[, data1 [, data2 [...data]]])

// once(eventName, cb)
function EventBus() {
  this.listeners = {};
}

EventBus.prototype.trigger = () => {};
EventBus.prototype.on = (event, callback) => {};
EventBus.prototype.off = () => {};
EventBus.prototype.once = () => {};
