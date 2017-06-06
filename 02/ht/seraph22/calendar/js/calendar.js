"use strict";

// Текущая дата + настройки
/*var date = new Date();
var dateOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	timezone: 'UTC'
};

function currentDate() {
	var dateNow = date.toLocaleString("ru", dateOptions);
	document.querySelector('#currentDate').innerHTML = dateNow;
};*/

// Отрисовка календаря
/*var calendarWrap = document.querySelector('#calendarID');

for (var i=0;i<49;i++) {
	let days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

	var div = document.createElement('div');
	var p = document.createElement('p');

	calendarWrap.appendChild(div);
	div.classList.add('ch-div');

	div.appendChild(p);

	if (days[i])
	{
		p.innerHTML = days[i];
	}
	
}*/

function Calendar(id, year, month)
{
	var lastDayNumber = new Date(year, month + 1, 0).getDate();
	var lastDayDate = new Date(year, month, lastDayNumber);
	var dayOfWeekLast = new Date(lastDayDate.getFullYear(), lastDayDate.getMonth(), lastDayNumber).getDay();
	//alert(lastDayDate.getMonth());
	alert(dayOfWeekLast);
	var dayOfWeekFirst = new Date(lastDayDate.getFullYear(), lastDayDate.getMonth(), 1).getDay();
	//alert(dayOfWeekFirst);
	var calendar = '<tr>';
	var month = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

	if (dayOfWeekFirst != 0)
	{
		for (var  i = 1; i < dayOfWeekFirst; i++) 
		{
			calendar += '<td>';
		}
	}
	else
	{
		for (var  i = 0; i < 6; i++) 
		{
			calendar += '<td>';
		}
	}

	for (var  i = 1; i <= lastDayNumber; i++)
	{
		if (i == new Date().getDate() && lastDayDate.getFullYear() == new Date().getFullYear() && lastDayDate.getMonth() == new Date().getMonth())
		{
			calendar += '<td class="today">' + i;
		}
		else
		{
			calendar += '<td>' + i;
		}

		if (new Date(lastDayDate.getFullYear(),lastDayDate.getMonth(),i).getDay() == 0)
		{
			calendar += '<tr>';
		}
	}

	for (var  i = dayOfWeekLast; i < 7; i++)
	{
		calendar += '<td>&nbsp;';
	}

	document.querySelector('#'+id+' tbody').innerHTML = calendar;
	document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[lastDayDate.getMonth()] +' '+ lastDayDate.getFullYear();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = lastDayDate.getMonth();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = lastDayDate.getFullYear();

	if (document.querySelectorAll('#'+id+' tbody tr').length < 6)
	{  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
		document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
	}
}

Calendar("calendar", new Date().getFullYear(), new Date().getMonth());

// переключатель минус месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function()
{
	Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
}

// переключатель плюс месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function()
{
	Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
}