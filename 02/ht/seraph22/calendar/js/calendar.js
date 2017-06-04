"use strict";

// Текущая дата + настройки
var date = new Date();
var dateOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	timezone: 'UTC'
};

function currentDate() {
	var dateNow = date.toLocaleString("ru", dateOptions);
	document.querySelector('#currentDate').innerHTML = dateNow;
};

// Отрисовка календаря
var calendarWrap = document.querySelector('#calendarID');

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
}