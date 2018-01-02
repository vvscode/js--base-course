function EventBus () {
  this.event = {};
};

EventBus.prototype.on = function (str, cb) {
  if (str in this.event) {
    this.event[str].push(cb);
  } else {
    this.event[str] = [cb];
  }
};

EventBus.prototype.off = function (str, cb) {
  if (this.event[str]) {
    if (cb) {
      let number;
      this.event[str].forEach(function (func, i) {
        if (func === cb) number = i;
      });
      this.event[str].splice(number, 1);
      return;
    }
    delete this.event[str];
  }
};

EventBus.prototype.trigger = function (str) {
  if (str in this.event) {
    let arr = arguments;
    this.event[str].forEach(function (cb) {
      arr.slice = [].slice;
      cb.apply(this, arr.slice(1));
    });
  }
};

EventBus.prototype.once = function (str, cb) {
  let self = this;
  function temp () {
    cb.apply(this, arguments);
    self.off(str, temp);
  }
  this.on(str, temp);
};

let eb = new EventBus();
