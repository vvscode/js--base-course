'use strict';

//tests

describe('EventBus', function() {
    it('is function', function() {
        assert.isFunction(EventBus);
    });

    var bus = new EventBus();
    it('method "on" exists', function() {
        assert.isFunction(bus.on);
    });
    it('method "off" exists', function() {
        assert.isFunction(bus.off);
    });
    it('method "trigger" exists', function() {
        assert.isFunction(bus.trigger);
    });
    it('method "once" exists', function() {
        assert.isFunction(bus.once);
    });
});

describe('logic', () => {
    var eb = new EventBus();
    it('calls .on handler by .trigger', () => {
      var a = 0;
      eb.on('some:event', () => (a = 1));
      assert.equal(a, 0);
      eb.trigger('some:event');
      assert.equal(a, 1);
    });
    it('works fine for no-handled events', () => {
      eb.trigger('some:event');
    });
    it('hanldes multiple events', () => {
      var x = 0;
      var y = 0;
      eb.on('x', () => (x = 1));
      eb.on('y', () => (y = 2));
      eb.trigger('x');
      eb.trigger('y');
      assert.equal(x, 1);
      assert.equal(y, 2);
    });
    it('manages multiple hanlder per one event', () => {
      var x = 0;
      var y = 0;
      eb.on('x', () => (x = 1));
      eb.on('x', () => (y = 2));
      eb.trigger('x');
      assert.equal(x, 1);
      assert.equal(y, 2);
    });
    it('passes params from .trigger into hanlders', () => {
      var x = [0];
      eb.on('x', (a) => x.push(a));
      eb.trigger('x', 2);
      assert.deepEqual(x, [0, 2]);
    });
    it('unsubscribes by .off call', () => {
      var x = 0;
      var _ = () => (x = 1);
      eb.on('x', _);
      eb.off('x', _);
      eb.trigger('x');
      assert.equal(x, 0);
    });
    it('unsubscribe multiple subscriptions', () => {
      var x = 0;
      var _ = () => (x = 1);
      eb.on('x', _);
      eb.on('x', _);
      eb.off('x', _);
      eb.trigger('x');
      assert.equal(x, 0);
    });
    it('once handles call only once', () => {
      var x = 0;
      var _ = () => x++;
      eb.once('x', _);
      eb.trigger('x');
      assert.equal(x, 1);
      eb.trigger('x');
      assert.equal(x, 1);
    });
    it('passes params into .once hanlder', () => {
      var x = [0];
      var _ = (y) => x.push(y);
      eb.once('x', _);
      eb.trigger('x', 4);
      assert.deepEqual(x, [0, 4]);
    });
    it('.off handles correctly', () => {
      var x = 0;
      var y = 0;
      var _ = () => x++;
      eb.on('x', _);
      eb.on('x', () => y++);
      eb.off('x', _);
      eb.trigger('x');
      assert.equal(y, 1);
    });
});


//code

function EventBus() {
    this.listeners = {};
}

EventBus.prototype.on = function(eName, cb) {
    this.listeners[eName] = this.listeners[eName] || [];
    this.listeners[eName].push(cb);
};

EventBus.prototype.off = function(eName) {
    if (!this.listeners[eName]) {
        return;
    }
    if (arguments.length == 1) {
        delete this.listeners[eName];
    } else {
        this.listeners[eName] = this.listeners[eName].filter(item => {
            for (var i = 1; i < arguments.length; i++) {
                if (item == arguments[i]) {
                    return false;
                }
            }
            return true;
        });
    }
};

EventBus.prototype.trigger = function(eName) {
    var handlers = this.listeners[eName];
    if (!handlers) {
        return;
    }
    var args = [].slice.call(arguments);
    args.shift();
    for (var i = 0; i < handlers.length; i++) {
        var cb = handlers[i];
        cb.apply(null, args);
    }
};

EventBus.prototype.once = function(eName, cb) {
    var handler = (...args) => {
        this.off(eName);
        cb.apply(null, args);
    }
    this.on(eName, handler);
};
