	
function drawCalendar2(id, year, month) {
	var content = document.querySelector('#content');

	content.innerHTML = '<table id="calendar2"><thead><tr><td>‹<td colspan="5"><td>›		<tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс<tbody></table>'
	
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
				calendar += '<td class="monthDate">' + i + '<ul class="myList"></ul>';
			}else{
				calendar += '<td class="monthDate">' + i + '<ul class="myList"></ul>';
			}
			if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
				calendar += '<tr>';
			}
		}
	
		for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
	
		document.querySelector('#'+id+' tbody').innerHTML = calendar;
		document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
		document.querySelector('#'+id+' thead td:nth-child(2)').id = 'month';
		document.querySelector('#month').nextSibling.id = 'next_month';
		document.querySelector('#month').previousSibling.id = 'prev_month';
		document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
		document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
	
		if (document.querySelectorAll('#'+id+' tbody tr').length < 6) { 
			document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
		}

	// переключатель минус месяц
	document.querySelector('#prev_month').onclick = function() {

		drawCalendar2("calendar2", document.querySelector('#month').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);

		if (localStorage.length !== 0) {
			showHistoryDate();
		}
	};
	// переключатель плюс месяц
	document.querySelector('#next_month').onclick = function() {

		drawCalendar2("calendar2", document.querySelector('#month').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);

		if (localStorage.length !== 0) {
			showHistoryDate();
		}
	};
	// работа с добавлением задач
	var tbody = document.getElementsByTagName('tbody')[0];

	tbody.addEventListener('click', function (ev) {

		var td = ev.target;
		var curentUl = td.lastChild;

		var tagName = ev.target.tagName;
		//фильтруются неподходящие td
		if (!td) return; 
	
		if (!tbody.contains(td)) return;

		if (tagName !== 'TD') return;
	
		if (td.innerText === '') return;
		//
		var description = prompt('Введите пояснение к дате', '');

		if (description === null) {
			return;
		}

		var li = document.createElement("li");
		var t = document.createTextNode(description);
		li.appendChild(t);
		curentUl.appendChild(li);
		var span = document.createElement("SPAN");
		var txt = document.createTextNode("\u00D7");
		span.className = "close";
		span.appendChild(txt);
		li.appendChild(span);

		//работа с сокальным хранилищем
		var month__year = document.getElementById('month');	
		var year = month__year.getAttribute('data-year');	
		var attrMonth = month__year.getAttribute('data-month');
	
		var idLocalStorage = attrMonth + '_' + year;
	
		localStorage.setItem(idLocalStorage, tbody.innerHTML);

	});

	tbody.addEventListener('click', function (ev) {
		ev.preventDefault();
		var close = document.getElementsByClassName("close");
		var i;
		for (i=0; i < close.length; i++){
			close[i].onclick = function(){
				var div = this.parentElement;
				div.style.display = "none";
			}	
		}
		var month__year = document.getElementById('month');	
		var year = month__year.getAttribute('data-year');	
		var attrMonth = month__year.getAttribute('data-month');
	
		var idLocalStorage = attrMonth + '_' + year;
	
		localStorage.setItem(idLocalStorage, tbody.innerHTML);
	});

}
	// drawCalendar2("calendar2", new Date().getFullYear(), new Date().getMonth());

	function showHistoryDate () {

		var tbody = document.getElementsByTagName('tbody')[0];
		
		var month__year = document.getElementById('month');	
		var year = month__year.getAttribute('data-year');	
		var attrMonth = month__year.getAttribute('data-month');
	
		var idLocalStorage = attrMonth + '_' + year;

		if (localStorage.length === 0) {
			return;
		} else if (localStorage.getItem(idLocalStorage) === null) {
			return;
		}

		tbody.innerHTML = localStorage.getItem(idLocalStorage);
	}
	
	showHistoryDate();
	