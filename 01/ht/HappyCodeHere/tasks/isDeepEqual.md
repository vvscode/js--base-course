## Написать функцию isDeepEqual которая принимает на вход два объекта и проверяет идентичны ли они по содержимому. Например

```javascript
var a = { prop1: 1, list: [1,2,3], o: { x: 2 } };
var b = { list: [1,2,3], o: { x: 2 } };
isDeepEqual(a, b) // false
b.prop1 = 1;
isDeepEqual(a, b) // true
```

#### Решение:

явно не лучшее решение)

```javascript
function isDeepEqual(obj1, obj2) {
	for (i in obj1) {
  	if (obj2[i] == undefined) {
    	return false;
    }
  }
  return true;
}
```
