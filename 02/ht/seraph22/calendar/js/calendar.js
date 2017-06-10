"use strict";
/*
function createCalendar(id)
{
	var outerDiv = document.createElement('div');
	outerDiv.className = 'outer-div';
	outerDiv.id = id;

	outerDiv.innerHTML = '<div class="wrapper border"><div class="two-third border"><div class="calendar"><table id="calendar"><thead><tr><td class="arrow">‹</td><td id="headerDate" colspan="5"></td><td class="arrow">›</td></tr><tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr></thead><tbody></tbody></table></div><div class="options"><form><div class="checkbox"><div><input type="checkbox" onchange="calendarHeadCheckFunc();" id="calendarHeadCheck" name="calendarHeadCheck" value="true" checked><label for="calendarHeadCheck">Ввести заголовок календаря?</label></div><div><input type="checkbox" onchange="calendarClassCheckFunc();" id="calendarClassCheck" name="calendarClassCheck" value="true" checked><label for="calendarClassCheck">Показать класс главного элемента календаря?</label></div><div><input type="checkbox" onchange="arrowButtonsFunc();" id="arrowButtons" name="arrowButtons" value="true" checked><label for="arrowButtons">Отрисовывать ли кнопки для смены месяца?</label></div><div><input type="checkbox" onchange="addEventsCheckFunc();" id="addEventsCheck" name="addEventsCheck" value="true" checked><label for="addEventsCheck">Давать ли возможность создавать события?</label></div><div><input type="checkbox" onchange="deleteEventsCheckFunc();" id="deleteEventsCheck" name="deleteEventsCheck" value="true" checked><label for="deleteEventsCheck">Давать ли возможность удалять события?</label></div></div><div class="checkbox-fields"><div style="position:absolute;top:0;"><input type="text" id="calendarHeadField" placeholder="Введите заголовок календаря" size="45"></div><div style="position:absolute;top:22px;"><input type="text" id="calendarClassField" placeholder="Пример: font-size:25px;font-weight:bold; затем Enter" size="45"></div></div><div class="clear-button"><input type="button" onclick="clearStorage();" value=" Очистить storage "></div><div class="create-button"><input type="button" onclick="createWidget();" value=" Создать виджет "></div></form></div></div><div class="one-third border"><div class="code"><h2 id="calendarName"></h2></div></div></div>';
	document.body.appendChild(outerDiv);
*/
	// Эта дата нужна будет потом для восстановления данных из localStorage
	var headDate;
	var eventsObj = {};

	// Отрисовка календаря
	function Calendar(id, year, month)
	{
		var lastDayNumber = new Date(year, month + 1, 0).getDate();
		var lastDayDate = new Date(year, month, lastDayNumber);
		var dayOfWeekLast = new Date(lastDayDate.getFullYear(), lastDayDate.getMonth(), lastDayNumber).getDay();
		var dayOfWeekFirst = new Date(lastDayDate.getFullYear(), lastDayDate.getMonth(), 1).getDay();

		var tdID = 0;

		var calendar = '<tr>';
		var month = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

		if (dayOfWeekFirst != 0)
		{
			for (var i=1;i<dayOfWeekFirst;i++) 
			{
				calendar += '<td><div id="td-' + tdID + '" class="div-wrapper">';
				tdID++;
			}
		}
		else
		{
			for (var i=0;i<6;i++) 
			{
				calendar += '<td><div id="td-' + tdID + '" class="div-wrapper">';
				tdID++;
			}
		}

		for (var i=1;i<=lastDayNumber;i++)
		{
			if (i == new Date().getDate() && lastDayDate.getFullYear() == new Date().getFullYear() && lastDayDate.getMonth() == new Date().getMonth())
			{
				calendar += '<td><div id="td-' + tdID + '" class="div-wrapper today">' + i;
				tdID++;
			}
			else
			{
				calendar += '<td><div id="td-' + tdID + '" class="div-wrapper">' + i;
				tdID++;
			}

			if (new Date(lastDayDate.getFullYear(),lastDayDate.getMonth(),i).getDay() == 0)
			{
				calendar += '<tr>';
			}
		}

		for (var i = dayOfWeekLast; i < 7; i++)
		{
			calendar += '<td><div id="td-' + tdID + '" class="div-wrapper">&nbsp;';
			tdID++;
		}

		document.querySelector('#'+id+' tbody').innerHTML = calendar;
		document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[lastDayDate.getMonth()] +' '+ lastDayDate.getFullYear();
		document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = lastDayDate.getMonth();
		document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = lastDayDate.getFullYear();

		headDate = month[lastDayDate.getMonth()] + lastDayDate.getFullYear();

		if (document.querySelectorAll('#'+id+' tbody tr').length < 6)
		{
			document.querySelector('#'+id+' tbody').innerHTML += '<tr><td><div id="td-' + tdID + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+1) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+2) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+3) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+4) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+5) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+6) + '" class="div-wrapper">&nbsp;';
		}

		// Зануляем объект для перезаписи
		eventsObj = {};
		// Подгружаем сохраненные записи из localStorage и записываем их в eventsObj
		loadData();

		// Добавляем EventListener на класс del
		listenerControl(".del","add");
	}

	Calendar("calendar", new Date().getFullYear(), new Date().getMonth());


	// Переключатель минус месяц
	document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function()
	{
		Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
	}

	// Переключатель плюс месяц
	document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function()
	{
		Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
	}

	/*-----------------------------------------------------------------------------------------------------------------------*/

	// Создать событие на день календаря
	var calendarEvent = document.querySelector('#calendar tbody');
	calendarEvent.addEventListener('dblclick', createEvent)

	function createEvent()
	{
		if ((event.target.id).indexOf('td-') < 0) return;

		var eventText = prompt('Добавьте запись','');
		if (!eventText) return;

		event.target.style.backgroundColor = 'rgb(218, 255, 196)';

		let id = event.target.id;

		addEvent(event.target, eventText, id);
	};

	// Добавить событие на день календаря
	function addEvent(field, eventText, id)
	{
		let dateID = new Date().toLocaleString();
		// ID события будет равно текущей дате и времени с точностью до секунды
		dateID = dateID.replace(/[^0-9]/g, '');
		var resultID = id + '_' + dateID;

		let div = document.createElement('div');
		div.className = 'eventText';
		div.id = dateID;
		div.innerHTML = eventText + '<span class="del">x</span>';
		field.appendChild(div);

		saveToStorage(resultID, eventText);

		// Добавляем EventListener на класс del
		listenerControl(".del","add");
	};

	// Записываем в объект события и добавляем в localStorage, имя для ключа localStorage берем исходя из текущего мес и года
	function saveToStorage(resultID, eventText)
	{
		eventsObj[resultID] = eventText;

		localStorage.setItem(headDate, JSON.stringify(eventsObj, "", 4));
	};

	// Подгружаем сохраненные записи из localStorage
	function loadData()
	{
		if (localStorage.getItem(headDate))
		{
			let data = localStorage.getItem(headDate);
			eventsObj = JSON.parse(data);

			//alert(JSON.stringify(eventsObj, "", 4));

			function loadEvent(tdID, id, eventText)
			{
				let div = document.createElement('div');
				div.className = 'eventText';
				div.id = id;
				div.innerHTML = eventText + '<span class="del">x</span>';
				if (tdID)
				{
					document.querySelector('#calendar tbody #' + tdID).style.backgroundColor = 'rgb(218, 255, 196)';
					document.querySelector('#calendar tbody #' + tdID).appendChild(div);
				}
			}

			for (var key in eventsObj)
			{
				var ids = key.split('_');
				loadEvent(ids[0], ids[1], eventsObj[key]);
			}
		}
		else return;
	}

	// Добавить или удалить EventListener на классы
	function listenerControl(className, action)
	{
		let elements = document.querySelectorAll(className);

		for (let i=0;i<elements.length;i++)
		{
			if (action === 'add')
			{
				elements[i].addEventListener('click', deleteEvent);
			}
			else if (action === 'remove')
			{
				elements[i].removeEventListener('click', deleteEvent);
			}
			else return;
		}
	}

	// Удалить событие
	function deleteEvent()
	{
		var conf = confirm("Вы уверены, что хотите удалить эту запись?");

		if (conf)
		{
			let targetID = event.target.parentElement.id;
			let divToRemove = event.target.parentElement;

			console.log(divToRemove);
			for (var key in eventsObj)
			{
				if (key.indexOf(targetID) >= 0)
				{
					delete eventsObj[key];
					divToRemove.parentElement.style.backgroundColor = 'rgb(245, 242, 158)';
					divToRemove.parentElement.removeChild(divToRemove);
				}
			}
			localStorage.setItem(headDate, JSON.stringify(eventsObj, "", 4));

			//alert(JSON.stringify(eventsObj, "", 4));
		}
	}



	// Чекбоксы
	// Убрать отрисовку для кнопок смены месяца
	function arrowButtonsFunc()
	{
		let check = document.querySelector("#arrowButtons").checked;
		let arrows = document.querySelectorAll(".arrow");
		let headerDate = document.querySelector("#headerDate");

		for (var i=0;i<arrows.length;i++)
		{
			if (!check)
			{
				arrows[i].className += " hidden";
				headerDate.colSpan = 7;
			}
			else
			{
				arrows[i].className = arrows[i].className.replace(/ hidden/,'');
				headerDate.colSpan = 5;
			}
		}
	}

	// Давать ли возможность создавать события
	function addEventsCheckFunc()
	{
		let check = document.querySelector("#addEventsCheck").checked;

		if (!check)
		{
			calendarEvent.removeEventListener('dblclick', createEvent);
		}
		else
		{
			calendarEvent.addEventListener('dblclick', createEvent);
		}
	}

	// Давать ли возможность удалять события
	function deleteEventsCheckFunc()
	{
		let check = document.querySelector("#deleteEventsCheck").checked;

		if (!check)
		{
			listenerControl(".del", "remove");
		}
		else
		{
			listenerControl(".del", "add");
		}
	}

	// Заголовок календаря
	function calendarHeadCheckFunc()
	{
		let check = document.querySelector("#calendarHeadCheck").checked;
		let headField = document.querySelector("#calendarHeadField");
		let calendarName = document.querySelector("#calendarName");
		var timer;

		if (!check)
		{
			headField.className += " hidden";
			calendarName.className += " hidden";
			clearInterval(timer);
			headField.value = '';
		}
		else
		{
			headField.className = headField.className.replace(/ hidden/,'');
			calendarName.className = calendarName.className.replace(/ hidden/,'');
			timer = setInterval(function(){ calendarName.innerHTML = headField.value; },100);
		}
	};
	calendarHeadCheckFunc();

	// Показать класс главного элемента календаря
	document.querySelector("#calendarClassField").addEventListener('keypress', function (e)
	{
		var key = e.which || e.keyCode;
		if (key === 13)
		{
			if (document.getElementsByTagName('style').length)
			{
				console.log(document.getElementsByTagName('style').length);
				addStyle('replace');
			}
			else
			{
				addStyle('add');
			}
		}
	});

	function addStyle(type)
	{
		var css = '#calendar { ' + document.querySelector("#calendarClassField").value + ' }';
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		style.type = 'text/css';

		if (style.styleSheet)
		{
			style.styleSheet.cssText = css;
		}
		else
		{
			style.appendChild(document.createTextNode(css));
		}

		if (type == "add")
		{
			head.appendChild(style);
		}
		else
		{
			head.replaceChild(style, document.getElementsByTagName('style')[0]);
		}
	}

	function calendarClassCheckFunc()
	{
		let check = document.querySelector("#calendarClassCheck").checked;
		let classField = document.querySelector("#calendarClassField");
		var timer;

		if (!check)
		{
			classField.className += " hidden";
		}
		else
		{
			classField.className = classField.className.replace(/ hidden/,'');
		}
	}

	function clearStorage()
	{
		localStorage.clear();
		location.reload();
	}

	function createWidget()
	{
		return;
	}
//}