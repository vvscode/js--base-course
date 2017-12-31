class EventBus {
    constructor() {
        this.listeners = {};
    }
    trigger(event, data) {
        try {
            (this.listeners[event] || []).forEach(cb => {
                if (typeof cb === "function") {
                    cb.apply(null, [].slice.call(arguments, 1));
                }
            });
        }
        catch (err) {
            console.log(`ошибка в подписчике: ${err}`);
        }
    }
    on(event, cb) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(cb);
    }
    off(event, cb) {
        if (!cb) {
            this.listeners[event] = [];
            return;
        }
        this.listeners[event] = (this.listeners[event] || [])
            .filter(listener => listener !== cb);
    }
    once(event, cb) {
        var item = this;
        this.on(event, function f() {
            cb.apply(null, arguments);
            item.off(event, f);
        });
    }
}
export default EventBus;