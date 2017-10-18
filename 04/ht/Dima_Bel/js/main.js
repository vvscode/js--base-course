
 
 var content = document.querySelector('#content');
 
 // Создать обработчик URL
 function handleUrl(url) {
   document.querySelectorAll('a.active').forEach(el => el.classList.remove('active'));
   document.querySelectorAll('a[href="' + url.split('#').pop() + '"]').forEach(el => el.classList.add('active'));
   
   var curentURL = url.split('#').pop();

   if(curentURL === 'calendar') {
    drawCalendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
   } else if(curentURL === 'setings') {
    drawSetings('#content');
   }
   
 }
 
 // Подписаться на изменения URL
 window.addEventListener('hashchange', (ev) => handleUrl(ev.newURL));
 
 // При загрузке страницы - считать состояние и запустить обработчик
 handleUrl(window.location.href);
 
 // Переопределить поведение внутренних ссылок
 document.body.addEventListener('click', (ev) => {
   if(!ev.target.matches('a')) {
     return;
   }
   ev.preventDefault();
   // При клике по ссылке - обновлять URL
   let url = ev.target.getAttribute('href');
   window.location.hash = url;
 });