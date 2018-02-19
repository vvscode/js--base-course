
// интервальный вызов функции и остановка вызовов при нажатии на "pause"
var delay = 1000;

function intervalInvoke(func) {
  var timer = setInterval(func, delay);

  $('#stop').on('click', function () {
    clearInterval(timer);
  });
}

// скрыть правила игры
function clear() {
  $('#title').css('display','none');
  $('#rules').css('display','none');
}

$('#make').on('click', function (ev) {
  ev.preventDefault();
  clear();
  // удалить старую таблицу перед созданием новой
  var table = document.querySelector('table');
  if (table)table.parentNode.removeChild(table);
  var life = new Life(100,100);

  // изменение состояния клетки при клике
  $('table').on('click', function (ev) {
    ev.target.matches('td') && life.makeAliveOrDead(ev.target);
  });

  var boundState = life.newState.bind(life);
  // старт при нажатии на "play"
  $('#start').on('click', function () {
    intervalInvoke(boundState);
  });
  // старт при перетаскивании бегунка
  $('.thumb').on('mousedown', function () {
    intervalInvoke(boundState);
  });

  // движение назад по истории
  $('#back').on('click', function () {
    var boundFillTable = life.goBack(life);
    boundFillTable;
  });
  // движение вперед по истории
  $('#forward').on('click', function () {
    var boundFillTable = life.goForward(life);
    boundFillTable;
  });
});


