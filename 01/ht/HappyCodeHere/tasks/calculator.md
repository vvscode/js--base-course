## Написать фукнцию сумматор для следующией логики (число вложенностей неограничего)

```javascript
var sum = function() { /* put your code here */};
var s = sum();
alert(s); // 0
alert(s(1)); // 1
alert(s(1)(2)); //3
alert(s(3)(4)(5)); // 12
```

#### Решение:

```javascript

// не работает пока

var sum = function() {

  var total = 0;

  return function sumInner(number) {
    console.log(number);
    total += number;
    return sumInner;
  }
};
```
