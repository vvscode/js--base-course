/*Создаем обработчик URL */

function handleUrl(url) {
    /*удаляет класс active у ссылки*/
    document.querySelectorAll('a.active').forEach( function (el) {
        el.classList.remove('active');
    });
    document.querySelectorAll('a[href="' + url.split('#').pop() + '"]').forEach( function (el) {
        //удаляет весь url до # остается /link2 который дальше переберается
        el.classList.add('active')
    });
}

// Подписаться на изменения URL
window.addEventListener('hashchange', function (ev) {
    //событие происходит когда изменяется hash
   handleUrl(ev.newURL)
});

// При загрузке страницы - считать состояние и запустить обработчик
handleUrl(window.location.href); // весь url текущего окна/ссылки

// Переопределить поведение внутренних ссылок
document.body.addEventListener('click', function (ev){
    if( !ev.target.matches('a')){ // true, если соответствует CSS селектору
      return;
    }
    ev.preventDefault(); // отмена действия браузера

    // При клике по ссылке - обновлять URL
    let url = ev.target.getAttribute('href');
    window.location.hash = url; // часть URL после # включительно #/link2
});


// обработчик ссылок

document.body.addEventListener('click', function (ev){

    document.querySelectorAll('.hidden1').forEach( function (elem) {
        elem.classList.remove('hidden1');
    });

    if( !ev.target.matches('a')){ // true, если соответствует CSS селектору
        return;
    }
    ev.preventDefault(); // отмена действия браузера

    let link =  ev.target.getAttribute('href');
    let a;
    if( link === '/link1'){
        a = document.querySelector('.calender_page');
    } else if( link === '/link2'){
        a = document.querySelector('.create_calender_page');
    } else if( link === '/link3'){
        a = document.querySelector('.about_me_page');
    }
    showHiddenElement(a);

});

//функция отображения нужных/не нужных элементов
function showHiddenElement(el) {
    document.querySelectorAll('.show_element').forEach( function (elem) {
        elem.classList.remove('show_element');
    });
    el.classList.add('show_element');

}