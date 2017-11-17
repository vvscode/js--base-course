function EventBus() {
  this.listeners = {};
};

EventBus.prototype = {

    on: function (event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
    },

    off: function (event, callback) {
      if (this.listeners[event]) {
        var callbackIndex = this.listeners[event].indexOf(callback);
        if (callbackIndex >= 0) {
          this.listeners[event].splice(callbackIndex, 1);
        }
      }
    },

    trigger: function (event, data) {
      (this.listeners[event] || []).forEach(function (callback) {
        return callback(data);
      });

      (this.listeners['once' + event] || []).forEach(function (callback) {
        return callback(data);
      });
      
      this.listeners['once' + event] = [];
    },

    once: function (event, callback) {
      this.listeners['once' + event] = this.listeners['once' + event] || [];
      this.listeners['once' + event].push(callback);
    }
};
