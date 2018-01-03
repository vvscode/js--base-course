`use strict`;
mocha.setup('bdd');
var assert = chai.assert;

describe("compileTemplate", function () {
    var tpl = '{{name}} is {{age}} years old';
    var el = document.createElement('div');
    var template = compileTemplate(tpl);
    it("функция", function () {
        return assert.isOk(typeof (compileTemplate) === 'function');
    });
    it("принимает 1 аргумент - шаблон", function () {
        return assert.isOk(compileTemplate.length == 1);
    });
    it("возвращает функцию", function () {
        return assert.isOk(typeof (compileTemplate()) === "function");
    });
    it("возвращаемая функция шаблонизатора принимает 2 аргумента - элемент и объект", function () {
        return assert.isOk(compileTemplate().length == 2)
    });
    it("элемент получает разметку в соответствии с шаблоном", function () {

        template(el, { name: 'Bob', age: 33 });
        assert.equal(el.innerHTML, 'Bob is 33 years old');
    });
    it("если значения по ключу нет, не выдается ошибка, а остается вхождение ключа", function () {
        template(el, { name: 'Bob' });
        assert.equal(el.innerHTML, 'Bob is {{age}} years old');
    });
    it("корректно обрабатывается одинарная кавычка (как в ирландских фамилиях)", function () {
        template(el, { name: "Bob O'Brian", age: 33 });
        assert.equal(el.innerHTML, "Bob O'Brian is 33 years old");
    });
    it ("корректно обрабатываются пустые значения", function(){
        template(el, { name: "", age:"" });
        assert.equal(el.innerHTML, " is  years old");
    })
})



mocha.run();