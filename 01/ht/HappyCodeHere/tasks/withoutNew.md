## Создать функцию-конструтор, особенностью которой будет следующее - если фукнцию вызвали без ключевого слова new она ведет себя так же, как если бы ее вызвали с этим ключевым словом

```javascript
function WithoutNew() {
  return {}
}

console.log(new WithoutNew());
console.log(WithoutNew());
```
