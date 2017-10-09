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

	
function Calendar2(id, year, month) {

	var Dlast = new Date(year,month+1,0).getDate(),
			D = new Date(year,month,Dlast),
			DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
			DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
			calendar = '<tr>',
			month = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

	if (DNfirst != 0) {
			for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
	}else{
			for(var  i = 0; i < 6; i++) calendar += '<td>';
	}
	for(var  i = 1; i <= Dlast; i++) {
			if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
			calendar += '<td class="today">' + i;
			}else{
		calendar += '<td>' + i;
			}
  		if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
    		calendar += '<tr>';
  		}
	}

	for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';

	document.querySelector('#'+id+' tbody').innerHTML = calendar;
	document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
	document.querySelector('#'+id+' thead td:nth-child(2)').id = 'month';
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();

	if (document.querySelectorAll('#'+id+' tbody tr').length < 6) { 
		document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
	}
}
	
Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
  Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
};
// переключатель плюс месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
  Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
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

