## Написать фукнцию isPolindrom , которая принимает на вход строку и возвращает результат проверки, является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
```javascript
    var isPolindrom = function (text) {
        var str = text.split('').reverse().join('');
        if (text === str) {
            return true;
        }
        else return false;
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

