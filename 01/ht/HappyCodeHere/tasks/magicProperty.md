## Создать объект o так, чтобы каждый раз когда в коде написано o.magicProperty = 3 // (любое значение) в консоль выводилось значение, которое присваивается и текущее время

не прокатило(

```javascript
var o = {
	prop: '',
	get magicProperty() {
  	console.log(new Date());
    return this.prop;
  },
  set magicProperty(val) {
  	this.prop = val;
  }
};

o.magicProperty;
o.magicProperty = 3;
```
