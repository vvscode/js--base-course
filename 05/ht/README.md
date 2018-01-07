## Теория

### Прочитать
Прочитать книгу ["Паттерны для масштабируемых JavaScript-приложений" Автор: Эдди Османи.](http://largescalejs.ru/)

### Быть способным рассказать о:

- Как работать с XHR
- Что такое AJAX
- Как работать с fetch
- CDN
- GitHub Pages
- TDD

## Практика

Через [TDD](https://ru.wikipedia.org/wiki/%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)  реализовать следующее:

####  1  Шаблонизатор
 Должен иметь следующую сигнатуру:
``` 
 // compileTemplate = (tpl) => (el, data)
 // Компиляция шаблона возвращает функцию
 // при передаче этой функции элемента и объекта с данными
 // элемент получает разметку в соответсвии с tpl из data
  var tpl = "{{name}} is {{age}} years old";
  var el = document.createElement('div');
  var template = compileTemplate(tpl);
  template(el, { name: 'Bob', age: 33 });
  el.innerHTML; // 'Bob is 33 years old
```

####  2 EventBus  c реализацией интерфейса
```
on(eventName, cb)
off(eventName[, cb])
trigger(eventName[, data1 [, data2 [...data]]])

once(eventName, cb)
```
####  3  Router

Поддерживающий описание роутов в формате

```
	 IRoute {
		   [name]: String optional
		   [match]: String | RegExp | function
		   onEnter([data]) | optional async function
		   onLeave([data]) | optional async function
		   onBeforeEnter([data]) | optional async function
	 }
```
 
При этом он должен работать [как обсуждалось](https://rawgit.com/vvscode/js--base-course/master/05/cls/index.html#/10/1) с роутами структуры

```
  routes: [
    {
      name: 'index',
      match: '',
      onBeforeEnter: () => console.log('onBeforeEnter index'),
      onEnter: () => console.log('onEnter index'),
      onLeave: () => console.log('onLeave index')
    },
    {
      name: 'city',
      match: /city=(.+)/,
      onBeforeEnter: (city) => console.log(`onBeforeEnter city:${city}`),
      onEnter: (city) => console.log(`onEnter city:${city}`),
      onLeave: (city) => console.log(`onLeave city:${city}`)
    },
    {
      name: 'about',
      match: (text) => text === 'about',
      onBeforeEnter: () => console.log(`onBeforeEnter about`),
      onEnter: () => console.log(`onEnter about`),
      onLeave: () => console.log(`onLeave about`)
    }
  ]
```
