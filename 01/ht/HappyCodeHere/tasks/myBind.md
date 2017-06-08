## создать собыственнй метод .myBind у всех функций, который будет работать так же как встроенный .bind ( его использовать нельзя )

```javascript
(function() { console.log(this.name); }).myBind({name: 'Bob'})() // 'Bob'
```

#### Решение:

```javascript
Function.prototype.myBind = function(func, obj) {
	
  return func
}
```
