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

## Cоздать собыственнй метод .myBind у всех функций, который будет работать так же как встроенный .bind ( его использовать нельзя )


## Cоздать функцию debounce С помощью этой функции добавить обработчик на resize окна, чтобы заголовок окна показывал текущее время и выводил его в консоль, не чаще 1 раза в 10 секунд.


## Написать код, который для объекта созданного с помощью конструктора будет показывать, что объект является экземпляром двух классов


## Создать объект o так, чтобы каждый раз когда в коде написано o.magicProperty = 3 // (любое значение) в консоль выводилось значение, которое присваивается и текущее время

```javascript
        var o = {
        set magicProperty (val) {
            console.log(val + '      ' + new Date().toLocaleTimeString()); // Кроме IE 10
        }
    };

    o.magicProperty = 5;
```

## Создать конструктор с методами, так, чтобы следующий код работал и делал соответствующие вещи

```javascript
function User() {
    }
    User.prototype.askName = function () {
        this.askName = prompt('What`s your name?', 'Andrey');
        return this
    };
    User.prototype.askAge = function () {
        this.askAge = +prompt('How old are you', '20');
        return this
    };
    User.prototype.showAgeInConsole = function () {
        console.log(this.askAge);
        return this
    };
    User.prototype.showNameInAlert = function () {
        alert(this.askName);
        return this
    };
    var u = new User();
    u.askName().askAge().showAgeInConsole().showNameInAlert();
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

## Написать фукнцию сумматор для следующией логики (число вложенностей неограничего)





## Создать функцию-конструтор, особенностью которой будет следующее - если фукнцию вызвали без ключевого слова new она ведет себя так же, как если бы ее вызвали с этим ключевым словом

```javascript
    function Mul(a, b) {
        if (this instanceof Window){
            return a + b
        }
        else throw "Please call without NEW";
    }

    console.log(Mul(2, 3));
```


## Создайте конструктор-синглтон? Что такое синглтон?



## Создать веб страницу. Добавить на нее форму с полями - имя (строкое поле), родной город (Выпадающий список), Комментарий (многострочное поле), пол (radiobutton). При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, после чего поля очистить.