'use strict';
class EventBus {
    constructor(){
        this.listeners = {};
    }

    on(name, cb) {
        this.listeners[name] = this.listeners[name] || [];
        this.listeners[name].push(cb);
    }

    trigger(name, ...data) {
        if (this.listeners[name]) {
            this.listeners[name].forEach(cb => cb(...data));
        }
    }

    off(name, cb) {
        if (!cb) {
            delete this.listeners[name];
        } else {
            this.listeners[name] = this.listeners[name].filter((arrayCallback) => !(cb === arrayCallback))
        }
    }

    once(name, cb) {
        this.on(name, onceOff);
        let self = this;

        function onceOff(...data) {
            cb(...data);
            delete self.listeners[name];
        }
    }
}

export default EventBus;
