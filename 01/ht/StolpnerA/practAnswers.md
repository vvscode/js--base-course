## Написать фукнцию isPolindrom , которая принимает на вход строку и возвращает результат проверки, является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
```javascript
    var isPolindrom = function (text) {
        var str = text.split('').reverse().join('');
        return text === str
    };
    alert(isPolindrom('abcdedcbaa'));
    alert(isPolindrom('abcdedcba'));
```

## Написать функцию isDeepEqual которая принимает на вход два объекта и проверяет идентичны ли они по содержимому.

```javascript
var a = { prop1: 1, list: [1,2,3], o: { x: 2 } };
    var b = { list: [1,2,3], o: { x: 2 } };
    var resual = false;
    function isDeepEqual(a, b) {
        for (var key in a, b){
            if (a[key] == b[key]){
                resual = true;
            }
            else {
                resual = false;
            }
        }

    }
    isDeepEqual(a, b); // false
    b.prop1 = 1;
    isDeepEqual(a, b); // true
    console.log(resual);
```



## Написать фукнцию-калькулятор, которая работает следующим образом

```javascript
function calculate(sign) {
        return function (a) {
            return function (b) {
                var res = eval(a + sign + b);
                return  console.log(res);
            }
        }
    }
    calculate('+')(1)(2); // 3
    calculate('*')(2)(3); // 6
```

