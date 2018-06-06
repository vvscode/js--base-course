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
