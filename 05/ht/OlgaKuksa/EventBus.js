//eventBus
var EventBus = function () {
    this.listeners = {};
}

EventBus.prototype.on = function (event, cb) {
    this.listeners[event] = this.listeners[event] || [];
    if (!(this.listeners[event].includes(cb))) this.listeners[event].push(cb);
};


EventBus.prototype.off = function (event, cb) {
    if (!cb || this.listeners[event].length == 0) return;
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event] = this.listeners[event].filter(callback => callback != cb);
};


EventBus.prototype.trigger = function (event, data) {
    this.listeners[event].forEach(callback => {
        if (typeof callback === 'function')
            callback.apply(null, [].slice.call(arguments, 1));
    })
};


EventBus.prototype.once = function (event, cb) {
    var context=this;
    context.on(event, function callback (){
        cb.apply(null, arguments);
        context.off(event, callback);
    })
};