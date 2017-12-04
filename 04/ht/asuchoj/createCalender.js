document.body.addEventListener('click', function (ev){
    if( !ev.target.matches('a')){ // true, если соответствует CSS селектору
        return;
    }
    ev.preventDefault(); // отмена действия браузера

    if( ev.target.getAttribute('href') === '/link2'){
        document.querySelector('.third_page').innerHTML = 'Создать календарь'
    }
});