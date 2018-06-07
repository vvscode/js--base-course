function compileTemplate(tpl) {
    return function(el, data) {
        for (key in data) {
            var regexp = "{{" + key + "}}";
            tpl = tpl.replace(regexp, data[key]);
        }
        return (el.innerHTML = tpl);
    };
}

function EventBus() {
    this.listeners = {};
}

EventBus.prototype.on = function(event, hendler) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(hendler);
};
EventBus.prototype.off = function(event, hendler) {
    if (this.listeners[event].includes(hendler)) {
        delete this.listeners[event];
    }
};
EventBus.prototype.trigger = function(event, data) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].forEach(function(hendler) {
        hendler(data);
    });
};
EventBus.prototype.once = function(event, hendler) {
    var wrapper = function(arg) {
        hendler(arg);
        this.off(event, wrapper);
    }.bind(this);
    this.on(event, wrapper);
};


