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
  
