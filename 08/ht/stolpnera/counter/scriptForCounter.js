mocha.setup('bdd');
const assert = chai.assert;

function Clicker(element, eventBus) {
    element.innerHTML = `<button>Click</button>`;
    element.querySelector('button').addEventListener('click', () => eventBus.trigger('clicker:click'));
}

function EventBus() {
    this.listeners = {};
}

EventBus.prototype.on = function (name, handler) {
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(handler);
};
EventBus.prototype.trigger = function (name, data) {
    (this.listeners[name] || []).forEach((handler) => handler(data));
};

let eb = new EventBus();
let counterVal = 5;

let clickerElement = document.querySelector('.clicker');
let counterElement = document.querySelector('.counter');
let clicker = new Clicker(clickerElement, eb);

eb.on('clicker:click', () => {
    counterVal++;
    counterElement.innerHTML = counterVal;
});

describe('Counter', () => {
    describe('EventBus', () => {
        it('Should create EventBus', () => {
            assert.isFunction(EventBus);
            assert.isOk((new EventBus) instanceof EventBus);
        });
    });
    describe('Clicker', () => {
        it('Should create Clicker', () => {
            assert.isFunction(Clicker);
            assert.isOk((new Clicker(clickerElement, eb)) instanceof Clicker);
        });
        it('Should be create btn', () => {
            let btn = document.querySelector('button');
            assert.isDefined(btn);
        });
        function test(x) {
            it('Should be ' + x, () => {
                eb.trigger('clicker:click');
                assert.equal(counterVal, x);
            })
        }

        for (var x = 6; x <= 10; x++) {
            test(x);
        }
    });
});

mocha.run();