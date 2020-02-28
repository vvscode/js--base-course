mocha.setup({
  ui: 'bdd',
  bail: true,
});
const assert = chai.assert;

describe("Реализовать фукнцию `apply` тремя способами", () => {
  [
    { title: 'Определение функции', name: 'applyFD' },
    { title: 'Выражение функции', name: 'applyFE' },
    { title: 'Конструирование функции', name: 'applyFС' },
  ].forEach((testItem) => {
     describe(`${itemTitle} (${testItem.name})`, () => {
         it(`функция ${testItem.name} определена`, () => {
             assert.equal(typeof window[testItem.name], 'function');
         });
         
         it(`вызывает функцию с аргументами`, () => {
            let a;
            let fun = (a, b) => a = [a, b];
            window[testItem.name](fun, 1, 2);
            assert.equal(Array.isArray(a), true);
            assert.equal(a[0], 1);
            assert.equal(a[1], 2);
         });
         
        it(`возвращает результат работы функции`, () => {
            let ret = Math.random();
            let fun = (a, b) => ret;
            assert.equal(window[testItem.name](fun, 1, 2), ret);
         });
     });
  });
});
