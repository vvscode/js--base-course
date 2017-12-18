'use strict';

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

mocha.setup('bdd');
var assert = chai.assert;

describe('fizzBuzz', function() {
    it('функция', function() {
        return assert.isOk(typeof isPolindrom === 'function');
    });

    var result = '\n1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz\n31\n32\nFizz\n34\nBuzz\nFizz\n37\n38\nFizz\nBuzz\n41\nFizz\n43\n44\nFizzBuzz\n46\n47\nFizz\n49\nBuzz\nFizz\n52\n53\nFizz\nBuzz\n56\nFizz\n58\n59\nFizzBuzz\n61\n62\nFizz\n64\nBuzz\nFizz\n67\n68\nFizz\nBuzz\n71\nFizz\n73\n74\nFizzBuzz\n76\n77\nFizz\n79\nBuzz\nFizz\n82\n83\nFizz\nBuzz\n86\nFizz\n88\n89\nFizzBuzz\n91\n92\nFizz\n94\nBuzz\nFizz\n97\n98\nFizz\nBuzz';

    var _log = window.log;
    var str = '';
    window.log = function(a) {
        return str = str + a + '\n';
    };
    fizzBuzz();

    it('выводит правильные данные', function() {
        return assert.isOk(str.trim() === result.trim());
    });
    it('не использует `if`', function() {
        return assert.isOk(('' + fizzBuzz).indexOf('if') < 0);
    });
    it('не использует `else`', function() {
        return assert.isOk(('' + fizzBuzz).indexOf('else') < 0);
    });
    it('не использует `switch`', function() {
        return assert.isOk(('' + fizzBuzz).indexOf('switch') < 0);
    });
    it('не использует `? :`', function() {
        return assert.isOk(('' + fizzBuzz).indexOf('?') < 0);
    });
});

describe('isPolindrom', function() {
    it('функция', function() {
        return assert.isOk(typeof isPolindrom === 'function');
    });
    it('возвращает true/false', function() {
        return assert.isOk(typeof isPolindrom('') === 'boolean');
    });
    it('asd - не полиндром', function() {
        return assert.isOk(isPolindrom('asd') === false);
    });
    it('asdsa - полиндром', function() {
        return assert.isOk(isPolindrom('asdsa') === true);
    });
    it('"" - полиндром', function() {
        return assert.isOk(isPolindrom('') === true);
    });
    it('asdsb - не полиндром', function() {
        return assert.isOk(isPolindrom('asdsb') === false);
    });
});

describe('drawCalendar', function() {
    var el;
    beforeEach(function() {
        return el = document.createElement('div');
    });

    it('функция', function() {
        return assert.isOk(typeof isPolindrom === 'function');
    });
    it('заполняет innerHTML у элемента (третий аргумент)', function() {
        drawCalendar(2017, 9, el);
        assert.isOk(el.innerHTML.trim() !== '');
    });
    it('генерирует разный html для разных месяцев', function() {
        drawCalendar(2017, 9, el);
        var html1 = el.innerHTML;
        drawCalendar(2017, 10, el);
        var html2 = el.innerHTML;
        assert.isOk(html1 !== html2);
    });
    it('правильно определяет число дней в месяце', function() {
        drawCalendar(2017, 9, el);
        var html = el.innerHTML;
        assert.isOk(html.indexOf('30') > 0);
        assert.isOk(html.indexOf('31') < 0);

        drawCalendar(2017, 2, el);
        var html = el.innerHTML;
        assert.isOk(html.indexOf('28') > 0);
        assert.isOk(html.indexOf('29') < 0);
        assert.isOk(html.indexOf('30') < 0);
        assert.isOk(html.indexOf('31') < 0);
    });
    /** Остальные проверки сильно зависят от разметки календаря */
});

describe('isDeepEqual', function() {
    it('фунция', function() {
        return assert.isOk(typeof isDeepEqual === 'function');
    });
    it('возвращает true/false', function() {
        return assert.isOk(typeof isDeepEqual('', '') === 'boolean');
    });
    it('распознает одинаковые строки', function() {
        return assert.isOk(isDeepEqual('мама', 'мама') === true);
    });
    it('распознает разные строки', function() {
        return assert.isOk(isDeepEqual('мама', 'папа') === false);
    });

    it('распознаем разные массивы', function() {
        return assert.isOk(isDeepEqual([1, 4, 2], [1, 2, 4]) === false);
    });
    it('распознает одинаковые массивы', function() {
        return assert.isOk(isDeepEqual([1, 2, 4, 3], [1, 2, 4, 3]) === true);
    });
    it('распознает массивы разной длинны', function() {
        return assert.isOk(isDeepEqual([1, 2, 5], [1, 2, 5, 7]) === false);
    });

    var a = {prop1: 1, list: [1, 2, 3], o: {x: 2}};
    var b = {list: [1, 2, 3], o: {x: 2}};
    it('распознает разные объекты', function() {
        return assert.isOk(isDeepEqual(a, b) === false);
    });

    it('распознает одинаковые объекты', function() {
        b.prop1 = 1;
        return assert.isOk(isDeepEqual(a, b) === true);
    });

    it('распознает разные объекты', function() {
        var a = {a: 1, b: 3, c: 2};
        var b = {a: 1, b: 4, c: 2};
        return assert.isOk(isDeepEqual(a, b) === false);
    });

    it('распознает вложенные объекты', function() {
        var a = {a: 1, b: {x: 5}, c: 2};
        var b = {a: 1, b: {x: 5}, c: 2};
        return assert.isOk(isDeepEqual(a, b) === true);
    });

    it('распознает числа', function() {
        var a = 1;
        var b = 1.0;
        return assert.isOk(isDeepEqual(a, b) === true);
    });

    it('распознает разные числа', function() {
        let a = 1;
        let b = 2;
        return assert.isOk(isDeepEqual(a, b) === false);
    });
});

mocha.run();
