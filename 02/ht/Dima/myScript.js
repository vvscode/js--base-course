;(function () {

function addData() {

	var name = document.getElementById('name').value,
		sity = document.getElementById('city').value,
		text = document.getElementById('text').value,
		sex = document.getElementById('sex').value,
		button = document.getElementById('button');

	var html = 'Имя: ' + name + '<br>' + 'Родной город: ' + sity + '<br>' + 'Коментарий: ' + text + '<br>' + 'Пол: ' + sex;

	document.getElementById('result').innerHTML = html;
	}

	button.addEventListener('click', addData);

}());

	
function drowCalendar(id, year, month) {
  var content = document.querySelector('#content');
  
  content.innerHTML = '<table id="calendar2"><thead><tr><td>‹<td colspan="5"><td>›		<tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс<tbody></table>';

	var dLast = new Date(year, month+1, 0).getDate(),
      d = new Date(year, month, dLast),
      dnLast = new Date(d.getFullYear(), d.getMonth(), dLast).getDay(),
      dnFirst = new Date(d.getFullYear(), d.getMonth(), 1).getDay(),
      calendar = '<tr>',
      month = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

	if (dnFirst != 0) {
    for(var  i = 1; i < dnFirst; i++) calendar += '<td>';
	}else{
    for(var  i = 0; i < 6; i++) calendar += '<td>';
	}
	for(var  i = 1; i <= dLast; i++) {
    if (i == new Date().getDate() && d.getFullYear() == new Date().getFullYear() && d.getMonth() == new Date().getMonth()) {
    calendar += '<td class="today">' + i;
    }else{
  calendar += '<td>' + i;
    }
    if (new Date(d.getFullYear(), d.getMonth(),i).getDay() == 0) {
      calendar += '<tr>';
    }
	}

	for(var  i = dnLast; i < 7; i++) calendar += '<td>&nbsp;';

	document.querySelector('#'+id+' tbody').innerHTML = calendar;
	document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[d.getMonth()] +' '+ d.getFullYear();
	document.querySelector('#'+id+' thead td:nth-child(2)').id = 'month';
	document.querySelector('#month').nextSibling.id = 'next_month';
	document.querySelector('#month').previousSibling.id = 'prev_month';
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = d.getMonth();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = d.getFullYear();

	if (document.querySelectorAll('#'+id+' tbody tr').length < 6) { 
		document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
	}
}
	
drowCalendar('calendar2', new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#prev_month').onclick = function() {
  drowCalendar('calendar2', document.querySelector('#month').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
};
// переключатель плюс месяц
document.querySelector('#next_month').onclick = function() {
  drowCalendar('calendar2', document.querySelector('#month').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
};

var tbody = document.getElementsByTagName('tbody')[0];

function showHistoryDate () {

	var history = document.getElementById('history');
  
  history.innerHTML = localStorage.getItem('dateHistory');
}

showHistoryDate();

tbody.onclick = function (event) {
  var target = event.target;
 
  var td = target.closest('td');
  //фильтруются неподходящие td
  if (!td) return; 

  if (!tbody.contains(td)) return;

  if (td.innerText === '') return;
  //

  var month__year = document.getElementById('month');

  var year = month__year.getAttribute('data-year');

  var attrMonth = month__year.getAttribute('data-month');

  var arrMonths = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];

  var curentMonth = arrMonths[attrMonth];

  var date = td.innerText + ' ' + curentMonth + ' ' + year;

  var description = prompt('Введите пояснение к дате', '');

  if (description === null) {
  	description = '';
  }

  var newLi = document.createElement('li');

  newLi.innerHTML = date + ' ' + description;

  var history = document.getElementById('history');
  
  history.appendChild(newLi);

  localStorage.setItem('dateHistory', history.innerHTML);

};

function clearStorege () {
	localStorage.clear();
	location.reload();  
}

var buttonClear = document.getElementById('clearStorege');

buttonClear.addEventListener('click', clearStorege);

