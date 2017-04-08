var onButtonClick = function (ev) {
    alert('click on ' + ev.target.innerText);
};

// Навешиваем обработчик напрямую на кнопки
// Находим все кнопки на момент выполнения кода
// var buttonsList = document.querySelectorAll('button');
// Проходим по списку кнопок циклом и к каждой кнопке добавляем обработчик click
// for (var i = 0; i < buttonsList.length; i++) {
    // buttonsList[i].addEventListener('click', onButtonClick);
// }

// Навешиваем обработчик на общего родителя
// Находим блок и добавляем к нему обработчик click
document.querySelector('#block').addEventListener('click', function (ev) {
    // фильтруем клики на общем блоке,
    // чтобы обрабатывать только те, 
    // что сделаны по кнопкам
    if (ev.target.tagName === 'BUTTON') {
        // Если это кнопка - вызываем нужный обработчик
        onButtonClick(ev);
    }
});