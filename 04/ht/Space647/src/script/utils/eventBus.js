function EventBus() {
    this.listeners = {};
}
EventBus.prototype.on = function (ev, handler) {
    this.listeners[ev] = this.listeners[ev] || [];
    this.listeners[ev].push(handler);
};
EventBus.prototype.trigger = function (ev, ...args) {
    (this.listeners[ev] || []).forEach((handler) => handler.apply(null, args));
};
EventBus.prototype.off = function (ev, handler) {
    (this.listeners[ev] || []).forEach(function (item, i) {
        if (item === handler) {
            this.listeners[ev].splice(i, 1);
        }
    }, this);
};
EventBus.prototype.once = function (ev, handler) {
    var that = this;
    this.on(ev, function offMethod() {
        handler.apply(null, arguments);
        that.off(ev, offMethod);
    });
};
export default EventBus;
