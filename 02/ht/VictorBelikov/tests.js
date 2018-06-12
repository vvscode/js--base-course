describe("curry", function () {

    function target1(a, b) { return a + b; }
    function target2(a, b, c) { return a + b + c; }
    function target3(a, b, c, d) { return a + b + c + d; }
    function target4(a, b, c, d, e) { return a + b + c + d + e; }

    it('является функцией', function () {
        assert.isOk(typeof curry === 'function');
    });
    it('поддерживает каррирование с 2-мя параметрами', function () {
        assert.isOk(curry(target1)(1)(2) === 3);
    });
    it('поддерживает каррирование с 3-мя параметрами', function () {
        assert.isOk(curry(target2)(1)(2)(3) === 6);
    });
    it('поддерживает каррирование с 4-мя параметрами', function () {
        assert.isOk(curry(target3)(1)(2)(3)(4) === 10);
    });
    it('поддерживает каррирование с 5-ю параметрами', function () {
        assert.isOk(curry(target4)(1)(2)(3)(4)(5) === 15);
    });
});

describe("NotConstructor", () => {

    it('является функцией', () => {
        assert.isOk(typeof NotConstructor === 'function');
    });
    it('не может работать как конструктор (работать с "new"), генерирует ошибку типа "TypeError"', () => {
        let err;

        try { new NotConstructor(); }
        catch (e) { err = e; }

        // assert.equal(err.name === 'TypeError', true);
        assert.equal(err instanceof TypeError, true);
    });
    it('корректно работает, как обычная функция (не генерирует исключение)', () => {
        let err;

        try { NotConstructor(); }
        catch (e) { err = e; }

        assert.equal(typeof err === 'undefined', true);
    });
});


describe("getCounter", () => {
    it("является функцией", () => assert.isFunction(getCounter));
    it("возвращает объект", () => assert.isObject(getCounter(5)));
    it("содержит метод log()", () => assert.isFunction(getCounter(5).log));
    it("содержит метод reset()", () => assert.isFunction(getCounter(5).reset));
    it("содержит метод add()", () => assert.isFunction(getCounter(5).add));
    it("возвращает this из add()", () => {
        var c = getCounter(5);
        assert.equal(c, c.add());
    });
    it("возвращает this из log()", () => {
        var c = getCounter(5);
        assert.equal(c, c.log());
    });
    it("возвращает this из reset()", () => {
        var c = getCounter(5);
        assert.equal(c, c.reset());
    });
});

describe('.myCall', () => {
    let func;

    beforeEach(function () {
        func = function (val) {
            return [val, this.name];
        };
    });

    it('является функцией', () => assert.isOk(typeof func.myCall === 'function'));
    it('не использует встроенный .call', function () {
        assert.isOk(func.myCall.toString()
            .indexOf('.call') < 0);
    });
    it("Вызывает с правильным контекстом", function () {
        let context = { dummy: "context" };
        (function () {
            assert.isOk(this === context);
        }.myCall(context));
    });
    it("Пробрасывает параметры контекстом", function () {
        (function () {
            assert.isOk(arguments.length === 0);
        }.myCall({}));
        (function () {
            assert.isOk(arguments.length === 1);
            assert.isOk(arguments[0] === 1);
        }.myCall({}, 1));
        (function () {
            assert.isOk(arguments.length === 3);
            assert.isOk(arguments[0] === 1);
            assert.isOk(arguments[1] === 2);
            assert.isOk(arguments[2] === "три");
        }.myCall({}, 1, 2, "три"));
    });
});

describe('throttle', function () {
    let counter,
        func;

    beforeEach(function () {
        counter = 0;
        func = function () {
            counter++;
        };
    });

    it('Является функцией', () => {
        assert.isOk(typeof throttle === 'function');
    });
    it('Возвращает функцию', () => {
        assert.isOk(typeof throttle(function () {
        }, 0) === 'function');
    });
    it('Вызывает оригинальную функцию', () => {
        assert.isOk(counter === 0);
        let th1 = throttle(func, 0);
        th1();
        assert.isOk(counter === 1);
        th1();
        assert.isOk(counter === 2);
    });
    it('Первый вызов происходит без задержки', () => {
        assert.equal(counter, 0);
        let th2 = throttle(func, 2000);
        th2();
        assert.equal(counter, 1);
    });
    it('Преждевременные вызовы не срабатывают', () => {
        assert.isOk(counter === 0);
        let th1 = throttle(func, 2000);
        th1();
        assert.isOk(counter === 1);
        th1();
        assert.isOk(counter === 1);
        th1();
        assert.isOk(counter === 1);
    });
    it('Вызов сделанный по истечении переданного интервала срабатывает', done => {
       let value = 0;
       let fn = throttle(() => value++, 500);
       fn();
       assert.equal(value, 1);

       setTimeout(function () {
           fn();
           console.log(value);
           assert.equal(value, 2);
       }, 600);

       setTimeout(done, 650);
    });
});

describe('debounce', function () {
    let counter,
        func;

    beforeEach(function () {
        counter = 0;
        func = function () {
            counter++;
        };
    });

    it('Является функцией', () => {
        assert.isOk(typeof debounce === 'function');
    });
    it('Возвращает функцию', () => {
        assert.isOk(typeof debounce(function () {
        }, 0) === 'function');
    });
    it('Сработает через определенный промежуток времени', done => {
        let counter = 0,
            fn = debounce(function () {
                counter++;
            }, 100);

        fn();
        setTimeout(() => {
            assert.isOk(counter === 0, 'значение не изменилось до истечения интервала');
        }, 50);
        setTimeout(() => {
            assert.isOk(counter === 1, "значение изменилось после истечения таймера");
        }, 120);
        setTimeout(done, 150);
    });
});
