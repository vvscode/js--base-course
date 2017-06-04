## Создать конструктор с методами, так, чтобы следующий код работал и делал соответствующие вещи

```javascript
var u = new User();
u.askName().askAge().showAgeInConsole().showNameInAlert();
```

#### Решение:

```javascript
function User() {

  this.name = '';
  this.age = '';
}

User.prototype.askName = function() {
  this.name = prompt('Привет, как тебя зовут?', 'Бэмби');
  return this;
}

User.prototype.askAge = function() {
  this.age = +prompt('И сколько тебе лет?', 20);
  return this;
}

User.prototype.showAgeInConsole = function() {
  console.log('Твой возраст: ' + this.age);
  return this;
}

User.prototype.showNameInAlert = function() {
  alert('Тебя зовут: ' + this.name);
  return this;
}
```
