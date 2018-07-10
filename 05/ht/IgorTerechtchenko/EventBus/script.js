function EventBus() {
  
}

EventBus.prototype.on = function(eventName, cb) {
  if(!this[eventName]) {
    this[eventName] = []
  }
  this[eventName].push(cb);
}
EventBus.prototype.off = function(eventName, cb) {
  var list = this[eventName];
  while(list && list.includes(cb)) {
    list.splice(list.indexOf(cb), 1);
  }
}
EventBus.prototype.trigger = function(eventName, arg) {
  if(this[eventName]) {
    this[eventName].forEach(function(cb) {cb(arg)});
  }
}
EventBus.prototype.once = function(eventName, cb) {
  var wrapper = function(arg) {
    this.off(eventName, wrapper);
    return cb(arg); 
  }.bind(this);
  this.on(eventName, wrapper);
}
