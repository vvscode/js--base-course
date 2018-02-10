var eventBus = (function() {
    var listeners = Symbol('listeners');
    function EventBus() {
        this[listeners] = {};
    }

    EventBus.prototype.on = function(event, cb) {
        this[listeners][event] = this[listeners][event] || [];
        this[listeners][event].push(cb);
    };

    EventBus.prototype.off = function(event, cb) {
        if (!cb) {
            this[listeners][event].splice(0, this[listeners][event].length);
            return;
        }

        this[listeners][event] = (this[listeners][event] || []).filter((listener) => listener !== cb);
    };

    EventBus.prototype.trigger = function(event) {
        if (this[listeners][event]) {
            var args = Array.prototype.slice.call(arguments, 1);
            this[listeners][event].forEach((cb) => cb.apply(null, args));
        }
    };

    EventBus.prototype.once = function(event, cb) {
        var self = this;
        this.on(event, function wrapper() {
            self.off(event, wrapper);
            cb.apply(null, arguments);
        });
    };

    return new EventBus();
})();