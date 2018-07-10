'use strict';
// partialy
/* global EventBus, describe, it, assert, beforeEach  */

describe('EventBus', function() {
  it('is a function', function() {
    assert.isOk(typeof EventBus === 'function');
  });
  it('is a constructor', function() {
    assert.isOk(new EventBus() instanceof EventBus);
  });
  describe('methods', () => {
    var eb;
    beforeEach(() => (eb = new EventBus()));

    describe('.on', function() {
      it('a method', () => assert.equal(typeof eb.on, 'function'));
    });
    describe('.off', function() {
      it('a method', () => assert.equal(typeof eb.off, 'function'));
    });
    describe('.trigger', function() {
      it('a method', () => assert.equal(typeof eb.trigger, 'function'));
    });
    describe('.once', function() {
      it('a method', () => assert.equal(typeof eb.once, 'function'));
    });

    describe('logic', () => {
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
  });
});
