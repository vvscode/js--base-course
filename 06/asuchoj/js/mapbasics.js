/*
let yaMap;

ymaps.ready(init);

function init(x) {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").

    yaMap = new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [53.90, 27.56], // Минск
      zoom: 10,
      controls: ['zoomControl', 'typeSelector']
    });

      var showCenter = () => info.innerHTML = (info.innerHTML +'\n' + 'Center: ' + yaMap.getCenter().join(' - ')).trim();
  yaMap.events.add('actionend', showCenter);

  showCenter();

}

function setCenter (lat, lng) {
  yaMap.setCenter([lat, lng]);
}
*/
