mocha.setup('bdd');
const assert = chai.assert;

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

describe('EventBus', () => {
    let eventBus;
    beforeEach(() => eventBus = new EventBus());

    it('Should create EventBus', () => {
        assert.isFunction(EventBus);
        assert.isOk((new EventBus) instanceof EventBus);
    });

    describe('#trigger', () => {
        it('should be function', () => assert.isFunction(eventBus.trigger));
    });

    describe('#once', () => {
        it('should be function', () => assert.isFunction(eventBus.once));
        it('should subscribe handler to event', () => {
            let spy = sinon.spy();
            eventBus.once('someEvent', spy);
            eventBus.trigger('someEvent');
            assert.isOk(spy.called);
        });
        it('should subscribe handler to event only for single call', () => {
            let spy = sinon.spy();
            eventBus.once('someEvent', spy);
            eventBus.trigger('someEvent');
            eventBus.trigger('someEvent');
            assert.equal(spy.callCount, 1);
        });
    });
    describe('#on', () => {
        it('should be function', () => assert.isFunction(eventBus.on));
        it('should subscribe handler to event', () => {
            let spy = sinon.spy();
            eventBus.on('someEvent', spy);
            eventBus.trigger('someEvent');
            assert.isOk(spy.called);
        });
    });
    describe('#off', () => {
        it('should be function', () => assert.isFunction(eventBus.on));
        it('should deleted handler to event', () => {
            let spy = sinon.spy();
            eventBus.on('someEvent', spy);
            eventBus.off('someEvent', spy);
            eventBus.trigger('someEvent');
            assert.isNotOk(spy.called);
        });
    });
});

mocha.run();