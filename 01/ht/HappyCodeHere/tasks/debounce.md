## Cоздать функцию debounce С помощью этой функции добавить обработчик на resize окна, чтобы заголовок окна показывал текущее время и выводил его в консоль, не чаще 1 раза в 10 секунд.

`
debounce(function, wait) Вернёт версию функции, исполнение которой начнётся не ранее, чем истечёт промежуток wait, после её последнего вызова. Полезно для реализации логики, которая зависит от завершения действий пользователя. Например, проверить орфографию комментария пользователя лучше будет после того, как он его окончательно введёт, а динамечески перерассчитать разметку - после того, как пользователь закончит изменять размер окна. По истечению интервала wait, функция будет вызвана с агрументами которые были переданы в самый последний раз.
`

#### Решение:

ухх...

```javascript
function debounce(func, wait) {
		var lastTime = new Date().getTime() - wait*1000 -1; // active first time

		return function() {
     var now = new Date().getTime();
     if(now - lastTime < wait*1000) {
       console.log('You should wait');
       return;
     }

     lastTime = now;

     console.log(now);
     func(now);
    }
}


var handleWindowResize = debounce(changePageTitle, 10);

function changePageTitle(time) {
	document.title = time;
}

window.addEventListener('resize', handleWindowResize);
```
