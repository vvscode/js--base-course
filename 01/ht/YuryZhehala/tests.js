/*
Тесты для фукнции `fizzBuzz`
*/

describe('fizzBuzz', function() {
  it('функция', function() {
    return assert.isTrue(typeof fizzBuzz === 'function');
  });
  var result =
    "n1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz\n31\n32\nFizz\n34\nBuzz\nFizz\n37\n38\nFizz\nBuzz\n41\nFizz\n43\n44\nFizzBuzz\n46\n47\nFizz\n49\nBuzz\nFizz\n52\n53\nFizz\nBuzz\n56\nFizz\n58\n59\nFizzBuzz\n61\n62\nFizz\n64\nBuzz\nFizz\n67\n68\nFizz\nBuzz\n71\nFizz\n73\n74\nFizzBuzz\n76\n77\nFizz\n79\nBuzz\nFizz\n82\n83\nFizz\nBuzz\n86\nFizz\n88\n89\nFizzBuzz\n91\n92\nFizz\n94\nBuzz\nFizz\n97\n98\nFizz\nBuzz";
  var _log = window.log;
  var str = '';
  window.log = function(a) {
    return (str = str + a + '\n');
  };
  fizzBuzz();
  it('выводит правильные данные', function() {
    return assert.isTrue(str.trim() === result.trim());
  });
  it('не использует `if`', function() {
    return assert.isTrue(('' + fizzBuzz).indexOf('if') < 0);
  });
  it('не использует `else`', function() {
    return assert.isTrue(('' + fizzBuzz).indexOf('else') < 0);
  });
  it('не использует `switch`', function() {
    return assert.isTrue(('' + fizzBuzz).indexOf('switch') < 0);
  });
  it('не использует `? :`', function() {
    return assert.isTrue(('' + fizzBuzz).indexOf('?') < 0);
  });
});

/*
Тесты для фукнции `isPalindrom`
*/

describe('isPalindrome', function() {
    it('Функция существует', function() {
        assert.isFunction(isPalindrome);
    });
    it('Возвращает true/false', function() {
        return assert.isTrue(typeof isPalindrome(str) === 'boolean');
    });
    it('`11212` - не полиндром', function() {
        return assert.isTrue(isPalindrome('11212') === false);
    });
    it('`11211` - полиндром', function() {
        return assert.isTrue(isPalindrome('11211') === true);
    });
    it('`Алла` - полиндром', function() {
        return assert.isTrue(isPalindrome('Алла') === true);
    });
});

/*
Тесты для фукнции `drawCalendar`
*/

describe('drawCalendar', function() {
    var elem;
    beforeEach(function() {
        return elem = document.getElementById("calendar");
    });
    it('Функция существует', function() {
        assert.isFunction(drawCalendar);
    });
    it('Функция gринимает 3 аргумента', function() {
        assert.equal(drawCalendar.length, 3);
    });
    it('Функция принимает аргумент htmlElement и выводит в него календарь', function() {
        assert.isTrue(elem.innerHTML !== '');
    });
    it('При разных аргументах выводит разный результат', function() {
        drawCalendar(2018, 4, 'calendar');
        var html1 = elem.innerHTML ;
        drawCalendar(2018, 5, 'calendar');
        var html2 = elem.innerHTML ;
        assert.isTrue(html1 !== html2);
    });
});

/*
Тесты для фукнции `isDeepEqual`
*/

describe('isDeepEqual', function() {
    it('Функция существует', function() {
        assert.isFunction(isDeepEqual);
    });
    it('Возвращает true/false', function() {
        assert.isTrue(typeof isDeepEqual('', '') === 'boolean');
    });
    it('Распознает одинаковые строки', function() {
        assert.isTrue(isDeepEqual('мама', 'мама'));
    });
    it('Распознает разные строки', function() {
        assert.isTrue(isDeepEqual('мама', 'папа') === false);
    });
    it('Распознаем разные массивы', function() {
        assert.isTrue(isDeepEqual([1, 4, 2], [1, 2, 4]) === false);
    });
    it('Распознает одинаковые массивы', function() {
        assert.isTrue(isDeepEqual([1, 2, 4, 3], [1, 2, 4, 3]));
    });
    it('Распознает массивы разной длинны', function() {
        assert.isTrue(isDeepEqual([1, 2, 5], [1, 2, 5, 7]) === false);
    });
    var a = { prop1: 1, list: [1, 2, 3], o: { x: 2 } };
    var b = { list: [1, 2, 3], o: { x: 2 } };
    it('Распознает разные объекты', function() {
        assert.isTrue(isDeepEqual(a, b) === false);
    });
    it('Распознает одинаковые объекты', function() {
        b.prop1 = 1;
        assert.isTrue(isDeepEqual(a, b));
    });
    it('Распознает разные объекты', function() {
        var a = { a: 1, b: 3, c: 2 };
        var b = { a: 1, b: 4, c: 2 };
        assert.isTrue(isDeepEqual(a, b) === false);
    });
    it('Распознает вложенные объекты', function() {
        var a = { a: 1, b: { x: 5 }, c: 2 };
        var b = { a: 1, b: { x: 5 }, c: 2 };
        assert.isTrue(isDeepEqual(a, b));
    });
    it('Распознает числа', function() {
        var a = 1;
        var b = 1.0;
        assert.isTrue(isDeepEqual(a, b));
    });
    it('Распознает разные числа', function() {
        let a = 1;
        let b = 2;
        assert.isTrue(isDeepEqual(a, b) === false);
    });
    it('Может работать с NaN', function() {
        let a = { NaN: NaN };
        let b = { NaN: NaN };
        assert.isTrue(isDeepEqual(NaN, NaN));
        assert.isTrue(isDeepEqual(a, b));
    });
});

/*
Тесты для фукнции `spiral`
*/

describe('spiral', function() {
    var array = [[4, 5], [6, 7]];
    it('Функция существует', function() {
        assert.isFunction(spiral);
    });
    it('Возвращает массив', function() {
        return assert.equal(Array.isArray(spiral(array)), true);
    });
    it('Принимает на вход массив из 2 массивов и возвращает одномерный спиральный массив', function() {
        assert.deepEqual(spiral([[1, 2], [3, 4]]).join(), [1, 2, 4, 3].join());
    });
    it('Принимает на вход массив из 3 массивов и возвращает одномерный спиральный массив', function() {
        assert.deepEqual(spiral([[1, 2, 3], [1, 2, 3], [1, 2, 3]]).join(),
            [1, 2, 3, 3, 3, 2, 1, 1, 2].join());
    });
    it('Принимает на вход массив из 4 массивов и возвращает одномерный спиральный массив', function() {
        assert.deepEqual(
            spiral([
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20]
            ]).join(),
            [ 1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12 ].join()
        );
    });
});

/*
Тесты для фукнции quadraticEquation
*/

describe('quadraticEquation', function() {
    it('Функция существует', function() {
        assert.isFunction(quadraticEquation);
    });
    it('Принимает 3 аргумента', function() {
        assert.equal(quadraticEquation.length, 3);
    });
    it('Возвращает массив', function() {
        return assert.equal(Array.isArray(quadraticEquation(1, 2, 1)), true);
    });
    it('Возвращает значения при d>0 (a=1, b=4, c=1)', function() {
        assert.equal(quadraticEquation(1,4,1).join(), [-0.2679491924311228,
            -3.732050807568877].join());
    });
    it('Возвращает значение при d=0 (a=1, b=2, c=1)', function() {
        assert.equal(quadraticEquation(1,2,1).join(), [-1].join());
    });
    it('Возвращает пустой массив при d<0 (a=1, b=1, c=1)', function() {
        assert.equal(quadraticEquation(1,1,1).join(), [].join());
    });
});
