## Что нового появилось в ES6 по сравнению с ES5?
 - Возможно новое объявление переменных (let и const)
 - Деструктуризация
 - `arrow function`
 - Template literals
 - классы
 - Тип данных `Symbol`
 - Итераторы
 - Set, Map, WeakSet и WeakMap
 - Promise
 - Модули
 - Proxy
## Что такое "стрелочная" ("arrow function") функция? Чем она отличается от обычной?
`Arrow function` имеет виду `передаваемые значения => возращаемые значения`
Если функция ничего не принимает, то просто ставим `()` и если после `=>` ставятся `{}`, то обязательно прописывается `return`
`Arrow function` - не имеет своих `this` и `arguments` и не может быть использована как конструтор с `new`
## Что такое Promise? Какой стандарт отписывает поведение Promise? Основные пункты стандарта?
`Promise` - это объект, который содержит свое состояние и после выолнение выдает либо fulfilled, либо rejected
Стандарт ECMAScript2015
## Чем куки (cookie) отличаются от localStorage ?
`cookie` работает с сервером, а `localSorage` работает на стороне клиента. Так же у `cookie` - 4 кб выделяется, а для `localStorage` - 5 мб.
## Что такое CORS?
Производит запросы, с контролем безопасности
## Что такое и какие есть коды ответов HTTP?
1.  1xx: Informational (информационные):
-    100 Continue («продолжай»);
-    101 Switching Protocols («переключение протоколов»);
-    102 Processing («идёт обработка»).
2.  2xx: Success (успешно):
-    200 OK («хорошо»);
-    201 Created («создано»);
-    202 Accepted («принято»);
-    203 Non-Authoritative Information («информация не авторитетна»);
-    204 No Content («нет содержимого»);
-    205 Reset Content («сбросить содержимое»);
-    206 Partial Content («частичное содержимое»);
-    207 Multi-Status («многостатусный»);
-    226 IM Used («использовано IM»).
3. 3xx: Redirection (перенаправление):
-    300 Multiple Choices («множество выборов»);
-    301 Moved Permanently («перемещено навсегда»);
-    302 Moved Temporarily («перемещено временно»);
-    302 Found («найдено»);
-    303 See Other (смотреть другое);
-    304 Not Modified (не изменялось);
-    305 Use Proxy («использовать прокси»);
-    306 — зарезервировано (код использовался только в ранних спецификациях);
-    307 Temporary Redirect («временное перенаправление»).
4.  4xx: Client Error (ошибка клиента):
-    400 Bad Request («плохой, неверный запрос»);
-    401 Unauthorized («не авторизован»);
-    402 Payment Required («необходима оплата»);
-    403 Forbidden («запрещено»);
-    404 Not Found («не найдено»);
-    405 Method Not Allowed («метод не поддерживается»);
-    406 Not Acceptable («неприемлемо»);
-    407 Proxy Authentication Required («необходима аутентификация прокси»);
-    408 Request Timeout («истекло время ожидания»);
-    409 Conflict («конфликт»);
-    410 Gone («удалён»);
-    411 Length Required («необходима длина»);
-    412 Precondition Failed («условие ложно»);
-    413 Request Entity Too Large («размер запроса слишком велик»);
-    414 Request-URI Too Large («запрашиваемый URI слишком длинный»);
-    415 Unsupported Media Type («неподдерживаемый тип данных»);
-    416 Requested Range Not Satisfiable («запрашиваемый диапазон не достижим»);
-    417 Expectation Failed («ожидаемое неприемлемо»);
-    422 Unprocessable Entity («необрабатываемый экземпляр»);
-    423 Locked («заблокировано»);
-    424 Failed Dependency («невыполненная зависимость»);
-    425 Unordered Collection («неупорядоченный набор»);
-    426 Upgrade Required («необходимо обновление»);
-    428 Precondition Required («необходимо предусловие»);
-    429 Too Many Requests («слишком много запросов»);
-    431 Request Header Fields Too Large («поля заголовка запроса слишком большие»);
-    444 Закрывает соединение без передачи заголовка ответа. Нестандартный код;
-    449 Retry With («повторить с»);
-    451 Unavailable For Legal Reasons («недоступно по юридическим причинам»).
5. 5xx: Server Error (ошибка сервера):
-    500 Internal Server Error («внутренняя ошибка сервера»);
-    501 Not Implemented («не реализовано»);
-    502 Bad Gateway («плохой, ошибочный шлюз»);
-    503 Service Unavailable («сервис недоступен»);
-    504 Gateway Timeout («шлюз не отвечает»);
-    505 HTTP Version Not Supported («версия HTTP не поддерживается»);
-    506 Variant Also Negotiates («вариант тоже проводит согласование»);
-    507 Insufficient Storage («переполнение хранилища»);
-    508 Loop Detected («обнаружено бесконечное перенаправление»);
-    509 Bandwidth Limit Exceeded («исчерпана пропускная ширина канала»);
-    510 Not Extended («не расширено»);
-    511 Network Authentication Required («требуется сетевая аутентификация»); 
-    520 Web server is returning an unknown error, возникает когда сервер CDN не смог обработать ошибку веб-сервера; нестандартный код           CloudFlare;
-    521 Web server is down, возникает когда подключения CDN отклоняются веб-сервером; нестандартный код CloudFlare;
-    522 Connection timed out, возникает когда CDN не удалось подключиться к веб-серверу; нестандартный код CloudFlare;
-    523 Origin is unreachable, возникает когда веб-сервер недостижим; нестандартный код CloudFlare;
-    524 A timeout occurred, возникает при истечении таймаута подключения между сервером CDN и веб-сервером; нестандартный код 
        CloudFlare;
-    525 SSL handshake failed, возникает при ошибке рукопожатия SSL между сервером CDN и веб-сервером; нестандартный код CloudFlare;
-    526 Invalid SSL certificate, возникает когда не удаётся подтвердить сертификат шифрования веб-сервера; нестандартный код CloudFlare.
## Что такое jsonp-запрос?
Это запрос с каими-либо параметрами, так же можно обратиться к другому домену.
## Как код, написанный на ES6 (ES2015-2017) превратить в код, который поддерживается IE10?
Транслятором
## Что такое полифилл?
Библиотека, нужна для сатрых браузеров. В свежих - она встроенная.
## Как реализовать простейший модуль на js?
## Что такое и зачем нужен паттерн модуль? Какие модули существуют в JS?
## Как реализовать подписку на клик по кнопке, которая отработает только один раз? ( с примером кода )
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<button>Click</button>


<script>
    var button = document.querySelector('button');
    function click() {
        alert('click');
        button.removeEventListener('click', click);
    }
    button.addEventListener('click', click);
</script>
</body>
</html>
```
## Какие события не "всплывают" ?
`onFocus, mouseout`
## Какие вспомогательные методы есть для работы с промисами?
```javascript
Promise.all();
Promise.race();
Promise.reject();
Promise.resolve();
```
## В чем разница между следующими кусками кода?

```javascript
// promise - это экземпляр Promise
// onSuccess - фукнция обработки успешного результата
// onError - функция обработки ошибки
// a: При выполнении функции свалиться либо, onSuccess - если все норм, либо onError - если какая-то ошибка
promise.then(onSuccess, onError);
// b: Если в onSuccess произайдет какая-то ошибка, то выполниться функцияя onError из-за catch
promise.then(onSuccess).catch(onError);
```