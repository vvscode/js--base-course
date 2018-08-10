export default function EventBus() {
  
}

EventBus.prototype.on = function(eventName, cb) {
  if(!this[eventName]) {
    this[eventName] = []
  }
  this[eventName].push(cb);
}

EventBus.prototype.off = function(eventName, cb) {
  this[eventName] = this[eventName].filter(function(func) {
    return func !== cb; 
  });
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
