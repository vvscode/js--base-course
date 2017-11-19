var EventBus = function() {
    this.listeners = {};
}

EventBus.prototype.trigger = function() {
    var data = Array.prototype.slice.call(arguments, 1);
    var event = Array.prototype.slice.call(arguments, 0, 1);
    var eventListeners = (this.listeners[event] || []).map(handler => handler);
    (eventListeners).forEach(function(handler) {
        if(typeof handler === "function")
            handler.apply(null, data);
    });
}

EventBus.prototype.on = function(event, handler) {
    this.listeners[event] = (this.listeners[event] || []);
    this.listeners[event].push(handler);
}

EventBus.prototype.off = function(event, handler) {
    if(!handler) delete this.listeners[event];    
    var handlerIndex = (this.listeners[event] || []).indexOf(handler);
    if(handlerIndex >= 0) {
        this.listeners[event].splice(handlerIndex, 1);
    }
}

EventBus.prototype.once = function(event, handler) {
    var evBus = this;
    var onceHandler = function() {
        handler.apply(evBus, arguments);
        evBus.off(event, onceHandler);
    }
    evBus.on(event, onceHandler);
}