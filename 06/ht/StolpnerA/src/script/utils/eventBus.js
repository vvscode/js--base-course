/*
 d1. Реализовать EventBus

 создать конструктор
 создать метод on
 coздать метод off
 создать метод trigger
 создать метод once
 вызвать конструктор
 */

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

// var eventBus = new EventBus();
// var handler = (a, b, c) => console.log('Handler', a, b, c);
// eventBus.once('one', handler);
// eventBus.trigger('one', 1,2,3);
// // Handler 1 2 3
// eventBus.trigger('one');
