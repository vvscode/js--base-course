var yaMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

var info = document.querySelector('#info');

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    yaMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });

    var showCenter = () => {
        info.innerHTML = (info.innerHTML +'\n' + 'Center: ' + yaMap.getCenter().join(' - ')).trim();
        yaMap.events.add('actionend', showCenter);
        console.log(info.innerHTML);
    };

    showCenter();
}