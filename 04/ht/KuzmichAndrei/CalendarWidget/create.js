function onChange() {
  var click1 = document.querySelector('#allowChange').checked;
  var click2 = document.querySelector('#allowAdd').checked;
  var click3 = document.querySelector('#allowRemove').checked;
  var click4 = document.querySelector('#show').checked;
  var type1 = document.querySelector('#dateM').value;
  var type2 = document.querySelector('#dateY').value;
  var type3 = document.querySelector('#class').value;

  var data = {
    el: '.main',
    el1: '',
    year: type2 || 2017,
    month: type1 || 10,
  };

  calendar.drawCalendar(data.year, data.month);


  document.querySelector('.block2').innerHTML = [
    '&ltscript src = ""&gt&lt/script&gt',
    '<br/>',
    '&ltscript&gt',
    '<br/>',
    'document.write("&ltdiv id="calendar1"&gt&lt/div&gt");',
    '<br/>',
    'var data = {',
    '<br/>',
    'el: "#calendar1"',
    '<br/>',
    `allow to change month : ${click1},<br/>`,
    `allow to add tasks : ${click2},<br/>`,
    `allow to remove tasks : ${click3},<br/>`,
    `show month / year : ${click4},<br/>`,
    `month: ${type1 || data.month},<br/>`,
    `year: ${type2 || data.year},<br/>`,
    `class: ${type3}<br/>`,
    '};',
    '<br/>',
    'calendar.drawCalendar(data.year, data.month, data.el);',
    '<br/>',
    '&lt/script&gt',
  ].join('');
}


document.querySelector('.inputs').addEventListener('change', onChange);
document.querySelector('.inputs').addEventListener('keyup', onChange);

