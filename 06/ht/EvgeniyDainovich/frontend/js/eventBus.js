function EventBus() {
    this.listeners = {};
}
EventBus.prototype.on = function (event, cb) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
};
EventBus.prototype.off = function (event, cb) {
    if (cb) {
        var index = this.listeners[event].indexOf(cb);
        if (index !== -1) {
            this.listeners[event].splice(index, 1);
        }
    }
    else {
        this.listeners[event] = [];
    }
};
EventBus.prototype.trigger = function (event) {
    if (this.listeners[event]) {
        var args = [].slice.call(arguments, 1);
        this.listeners[event].forEach(cb => {
            cb.apply(null, args);
        });
    }
};
EventBus.prototype.once = function (event, cb) {
    var context = this;
    this.on(event, function wrap() {
        cb.apply(null, arguments);
        context.off(event, wrap);
    });
};
export default EventBus;