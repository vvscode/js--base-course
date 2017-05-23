# 1. Что такое замыкание?
`Замыкание-это сохранение доступа к не-локальным областям видимости, даже если функции-владельцы этих областей видимости уже не выполняются или даже не существуют. `
# 2. Что такое `this` ? Чем определяется? Как его изменить?
`this - ссылка на сам объект (При работе обычных функций this также доступен, но он равен window в обычном режиме и undefined в строгом режиме 'use strict'.).`
```javascript
name='Gleb';
function sayHi(name){
  var name='Ted';
  this.name='Hi '+ name;
  alert(this.name);
  }
sayHi(name);
```
# 3. Как узнать сколько параметров принимает функция?
```javascript
name='Gleb';
function sayHi(name){
  var name='Ted';
  this.name='Hi '+ name;
  alert(this.name);
  }
sayHi(name);
sayHi.length
```
# 4. Что такое прототипное наследование
`Прототипное наследование - объекты наследуют от объектов`
# 5. Как узнать есть ли у объекта свойство `x` ?
  ```javascript
   var user = {
            name: "Вася",
            surname: "Петров",
            x:'hoho'
        };
     console.log(user.hasOwnProperty('x'));
  ```
  # 6. Что происходит при использовании ключевого слова new?
  `Оператор new создаёт новый объект указанного класса`
  # 7. Как сделать ревес строки?
  ```javascript
  var str="i'm idiot";
  alert(str.split('').reverse().join('')); // строка -> в массив -> реверс -> преобразование в строку
  // 2й чисто массив
  var str=['i,m','idiot'];
  str=str.reverse();
  alert(str);
  ```
  # 8. Как заменить в строке `"papa roach"` все буквы `a` на `A` ?
  ```javascript
  var str="papa roach"
  str=str.replace(/a/g, "A" );
  alert(str);
  ```
  # 9. Сколькими способами ( с примерами кода ) можно найти на странице `div` с id `someId` ?
  
  
