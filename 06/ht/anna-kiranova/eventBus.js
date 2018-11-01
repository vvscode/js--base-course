'use strict';

function EventBus() {
    this.listeners = {};
}

EventBus.prototype.on = function(eName, cb) {
    this.listeners[eName] = this.listeners[eName] || [];
    this.listeners[eName].push(cb);
};

EventBus.prototype.off = function(eName) {
    if (!this.listeners[eName]) {
        return;
    }
    if (arguments.length == 1) {
        delete this.listeners[eName];
    } else {
        this.listeners[eName] = this.listeners[eName].filter(item => {
            for (var i = 1; i < arguments.length; i++) {
                if (item == arguments[i]) {
                    return false;
                }
            }
            return true;
        });
    }
};

EventBus.prototype.trigger = function(eName) {
    var handlers = this.listeners[eName];
    if (!handlers) {
        return;
    }
    var args = [].slice.call(arguments);
    args.shift();
    for (var i = 0; i < handlers.length; i++) {
        var cb = handlers[i];
        cb.apply(null, args);
    }
};

EventBus.prototype.once = function(eName, cb) {
    var handler = (...args) => {
        this.off(eName);
        cb.apply(null, args);
    };
    this.on(eName, handler);
};
