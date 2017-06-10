
class EventBus {
  constructor() {
    this.listeners = [];
  }

  on(event, handler) {
    if (!(event in this.listeners)) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(handler);
  }

  off(event, handler) {
    if (!(event in this.listeners)) {
      return;
    }
    var stack = this.listeners[event];

    for (var i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === handler) {
        stack.splice(i, 1);
        return;
      }
    }
  }

  trigger(event, data) {
    (this.listeners[event] || []).forEach((handler) => handler(data));
    // if (!(event.type in this.listeners)) {
    //   return true;
    // }
    // var stack = this.listeners[event.type];
    // event.target = this;
    // for (var i = 0, l = stack.length; i < l; i++) {
    //   stack[i].call(this, event);
    // }
    //   return !event.defaultPrevented;
    // }
  }

  once(event, handler) {

}


export default EventBus;

// 
// function EventBus() {
//   this.listeners = {};
// };
//
// EventBus.prototype.on = function (ev, handler) {
//   this.listeners[ev] = this.listeners[ev] || [];
//   this.listeners[ev].push(handler);
// }
//
// EventBus.prototype.trigger = function (ev, data) {
//   (this.listeners[ev] || []).forEach((handler) => handler(data));
// }
