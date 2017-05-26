## Создайте конструктор-синглтон? Что такое синглтон?

```javascript
// modify example above
var User = function(param) {

  // как то через замыкание чтобы ссылалось на один объект

  return {

  }
}
var u1 = new User(1);
var u2 = new User(2);
u1 instanceof User; // true
u1 === u2; // true
```
