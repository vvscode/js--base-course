function EventBus() {
    this.listeners = {};
}

EventBus.prototype.trigger = function (event, data) {
    (this.listeners[event] || []).forEach(cb => {
        if (typeof cb === "function") {
            cb.apply(null, [].slice.call(arguments, 1));
        }
    });
};
EventBus.prototype.on = function (event, cb) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
};
EventBus.prototype.off = function (event, cb) {
    if (!cb) {
        this.listeners[event] = (this.listeners[event] || []).lenght = 0;
        return;
    }
    this.listeners[event] = (this.listeners[event] || [])
        .filter(listener => listener !== cb);
};
EventBus.prototype.once = function (event, cb) {
    var item = this;
    this.on(event, function f() {
        cb.apply(null, arguments);
        item.off(event, f);
    });
};
