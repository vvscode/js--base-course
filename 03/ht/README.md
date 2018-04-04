### Теория

Прочитать (желательно с выполнением задач) разделы из учебника:

* [Современные возможности ES-2015](http://learn.javascript.ru/es-modern)
* [Основы работы с событиями](http://learn.javascript.ru/events-and-interfaces)
* [Создание графических компонентов](http://learn.javascript.ru/widgets)
* [Формы, элементы управления](http://learn.javascript.ru/js-misc)
* [Современные возможности ES-2015](http://learn.javascript.ru/forms-controls)
* [AJAX и COMET](http://learn.javascript.ru/ajax)
* [Управление историей браузера](https://developer.mozilla.org/ru/docs/Web/API/History_API)

---

* [Путеводитель по JavaScript Promise для новичков](https://habrahabr.ru/company/zerotech/blog/317256/)
* [Промисы в ES6: паттерны и анти-паттерны](https://habrahabr.ru/company/ruvds/blog/339414/)

### Вопросы

* Что такое "стрелочная" ("arrow function") функция? Чем она отличается от обычной?
* Что такое Promise? Какой стандарт отписывает поведение Promise? Основные пункты стандарта?
* Чем куки (cookie) отличаются от localStorage ?
* Что такое CORS?
* Что такое и какие есть коды ответов HTTP?
* Что такое jsonp-запрос?
* Как код, написанный на ES6 (ES2015-2017) превратить в код, который поддерживается IE10?
* Как реализовать простейший модуль на js?
* Что такое и зачем нужен паттерн модуль? Какие модули существуют в JS?
* Как реализовать подписку на клик по кнопке, которая отработает только один раз? ( с примером кода )
* Какие события не "всплывают" ?
* Что такое делегирование?
* Преимущества и особенности работы с делегированием?
* Какие вспомогательные методы есть для работы с промисами?
* в чем разница между следующими кусками кода?

```javascript
// promise - это экземпляр Promise
// onSuccess - фукнция обработки успешного результата
// onError - функция обработки ошибки
// a:
promise.then(onSuccess, onError);
// b:
promise.then(onSuccess).catch(onError);
```

* в чем разница между следующими кусками кода?

```javascript
doSomething().then(function() {
  return doSomethingElse();
});

doSomething().then(function() {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);
```
