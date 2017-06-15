function Calendar(settings)
{
	"use strict";
	var calendarEvent;

	// Глобальный объект с созданными событиями calendarTitle
	var eventsObj = {};

	//console.log(JSON.stringify(settings,'',4));

	let parentDiv = document.querySelector(settings.el);
	let h2 = document.createElement('h2');
	if (settings.title)
	{
		h2.className = 'calendar-title';
		h2.innerHTML = settings.title;
		parentDiv.appendChild(h2);
	}

	let table = document.createElement('table');
	table.className = 'calendar-style';
	table.innerHTML = '<thead><tr><td class="arrow">‹</td><td id="header-date-id" colspan="5"></td><td class="arrow">›</td></tr><tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr></thead><tbody></tbody>';
	parentDiv.appendChild(table);

	// Добавить кнопки для смены месяца
	let arrowControls = document.querySelectorAll(settings.el + " .arrow");
	let headerDateID = document.querySelector(settings.el + " #header-date-id");

	if (!settings.showControls)
	{
		for (var i=0;i<arrowControls.length;i++)
		{
			arrowControls[i].className += " hidden";
			headerDateID.colSpan = 7;
		}
	}

	function currentCalendar(year, month)
	{
		let lastDayN = new Date(year, month + 1, 0).getDate();
		let lastDayDate = new Date(year, month, lastDayN);
		let dayOfWeekLast = new Date(lastDayDate.getFullYear(), lastDayDate.getMonth(), lastDayN).getDay();
		let dayOfWeekFirst = new Date(lastDayDate.getFullYear(), lastDayDate.getMonth(), 1).getDay();

		let tdID = 0;

		let calendar = '<tr>';
		var month = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

		if (dayOfWeekFirst != 0)
		{
			for (let i=1;i<dayOfWeekFirst;i++) { calendar += '<td><div id="td-' + tdID + '" class="div-wrapper">'; tdID++; }
		}
		else
		{
			for (let i=0;i<6;i++) { calendar += '<td><div id="td-' + tdID + '" class="div-wrapper">'; tdID++; }
		}

		for (let i=1;i<=lastDayN;i++)
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

			if (new Date(lastDayDate.getFullYear(),lastDayDate.getMonth(),i).getDay() == 0) { calendar += '<tr>'; }
		}

		for (let i = dayOfWeekLast; i < 7; i++) { calendar += '<td><div id="td-' + tdID + '" class="div-wrapper">&nbsp;'; tdID++; }

		document.querySelector(settings.el + ' table tbody').innerHTML = calendar;
		document.querySelector(settings.el + ' table thead td:nth-child(2)').innerHTML = month[lastDayDate.getMonth()] +' '+ lastDayDate.getFullYear();
		document.querySelector(settings.el + ' table thead td:nth-child(2)').dataset.month = lastDayDate.getMonth();
		document.querySelector(settings.el + ' table thead td:nth-child(2)').dataset.year = lastDayDate.getFullYear();

		if (document.querySelectorAll(settings.el + ' table tbody tr').length < 6)
		{
			document.querySelector(settings.el + ' table tbody').innerHTML += '<tr><td><div id="td-' + tdID + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+1) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+2) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+3) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+4) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+5) + '" class="div-wrapper">&nbsp;<td><div id="td-' + (tdID+6) + '" class="div-wrapper">&nbsp;';
		}

		// Зануляем eventsObj чтобы данные с прошлого месяца не накладывались на текущий
		eventsObj = {};

		// Подгружаем записи из БД
		loadData();

		// Добавляем EventListener на класс del
		let delEvent = document.querySelectorAll('.del');
		for (let i=0;i<delEvent.length;i++) { delEvent[i].addEventListener('click', deleteEvent); };

		//console.log(document.querySelector(settings.el + ' #header-date-id').innerHTML + '_' + settings.el);
	}
	currentCalendar(new Date().getFullYear(), new Date().getMonth());

	// Переключатель минус месяц
	document.querySelector(settings.el + ' table thead tr:nth-child(1) td:nth-child(1)').addEventListener('click', leftArrowClick);
	function leftArrowClick()
	{
		currentCalendar(document.querySelector(settings.el + ' table thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector(settings.el + ' table thead td:nth-child(2)').dataset.month)-1);
	}

	// Переключатель плюс месяц
	document.querySelector(settings.el + ' table thead tr:nth-child(1) td:nth-child(3)').addEventListener('click', rightArrowClick);
	function rightArrowClick()
	{
		currentCalendar(document.querySelector(settings.el + ' table thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector(settings.el + ' table thead td:nth-child(2)').dataset.month)+1);
	}

/*-----------------------------------------------------------------------------------------------------------------------*/

	// Подгружаем сохраненные записи из localStorage
	function loadData()
	{
		if (localStorage.getItem(document.querySelector(settings.el + ' #header-date-id').innerHTML + '_' + settings.el))
		{
			let headDateID = document.querySelector(settings.el + ' #header-date-id').innerHTML + '_' + settings.el;
			let data = localStorage.getItem(headDateID);
			eventsObj = JSON.parse(data);

			//console.log('LOAD headDateID: ' + headDateID);
			//console.log('LOAD eventsObj: ' + JSON.stringify(eventsObj, "", 4));
			//console.log('-----------------------------------------------------');

			function loadEvent(tdID, divID, calendarID, eventText)
			{
				let div = document.createElement('div');
				div.className = 'eventText';
				div.id = divID;
				div.innerHTML = eventText + '<span class="del">x</span>';
				if (tdID && calendarID == settings.el)
				{
					document.querySelector(calendarID + ' table tbody #' + tdID).style.backgroundColor = 'rgb(218, 255, 196)';
					document.querySelector(calendarID + ' table tbody #' + tdID).appendChild(div);
				}
			}

			for (var key in eventsObj)
			{
				var ids = key.split('_');
				loadEvent(ids[0], ids[1], ids[2], eventsObj[key]);
			}
		}
		else return;
	}

/*-----------------------------------------------------------------------------------------------------------------------*/

	// Добавить EventListener на все ячейки таблицы
	calendarEvent = document.querySelector(settings.el + ' table tbody');
	calendarEvent.addEventListener('dblclick', createEvent);

/*-----------------------------------------------------------------------------------------------------------------------*/

	// Создать событие на день календаря
	function createEvent()
	{
		// Давать ли возможность создавать события(для виджета)
		if (!settings.allowAddEvents) return;

		if ((event.target.id).indexOf('td-') < 0) return;

		let eventText = prompt('Добавьте запись','');
		if (!eventText) return;

		event.target.style.backgroundColor = 'rgb(218, 255, 196)';

		let dateID = new Date().toLocaleString();
		// ID события будет равно текущей дате и времени с точностью до секунды
		dateID = dateID.replace(/[^0-9]/g, '');
		let resultID = event.target.id + '_' + dateID + '_' + settings.el;

		let div = document.createElement('div');
		div.className = 'eventText';
		div.id = dateID;
		div.innerHTML = eventText + '<span class="del">x</span>';
		event.target.appendChild(div);

		// Добавляем EventListener на класс del
		let delEvent = document.querySelectorAll('.del');
		for (let i=0;i<delEvent.length;i++) { delEvent[i].addEventListener('click', deleteEvent); };

		// Сохраняем в базе данных
		saveToStorage(resultID, eventText);
	};

	// Записываем в объект события и добавляем в localStorage, имя для ключа localStorage берем исходя из текущего мес и года
	function saveToStorage(resultID, eventText)
	{
		let headDateID = document.querySelector(settings.el + ' #header-date-id').innerHTML + '_' + settings.el;
		eventsObj[resultID] = eventText;

		//console.log('SAVE headDateID: ' + headDateID);
		//console.log('SAVE eventsObj: ' + JSON.stringify(eventsObj, "", 4));
		//console.log('-----------------------------------------------------');

		localStorage.setItem(headDateID, JSON.stringify(eventsObj, "", 4));
	};

/*-----------------------------------------------------------------------------------------------------------------------*/

	// Удалить событие
	function deleteEvent()
	{
		// Давать ли возможность удалять события
		if (!settings.allowRemoveEvents) return;

		var conf = confirm("Вы уверены, что хотите удалить эту запись?");

		if (conf)
		{
			let targetID = event.target.parentElement.id;
			let divToRemove = event.target.parentElement;

			for (var key in eventsObj)
			{
				if (key.indexOf(targetID) >= 0)
				{
					delete eventsObj[key];
					divToRemove.parentElement.style.backgroundColor = 'rgb(245, 242, 158)';
					divToRemove.parentElement.removeChild(divToRemove);
				}
			}
			let headDateID = document.querySelector(settings.el + ' #header-date-id').innerHTML + '_' + settings.el;
			localStorage.setItem(headDateID, JSON.stringify(eventsObj, "", 4));

			//alert(JSON.stringify(eventsObj, "", 4));
		}
	}

/*-----------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------Далее код только для главной страницы с календарем-----------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------*/

	// Добавить EventListener на все события с формы
	var inputElements = document.querySelectorAll('form input[type=checkbox], form input[type=text]');
	for (let i=0;i<inputElements.length;i++)
	{
		if (inputElements[i].type === 'text')
		{
			inputElements[i].addEventListener('input', widgetCode);
			if (inputElements[i].id === 'style-id')
			{
				inputElements[i].addEventListener('keypress', function (e)
				{
					let key = e.which || e.keyCode;
					if (key === 13)
					{
						if (document.getElementsByTagName('style').length) { setCalendarStyle('replace'); }
						else { setCalendarStyle('add'); }
					}
				});
			}
		}
		else if (inputElements[i].type === 'checkbox')
		{
			inputElements[i].addEventListener('change', widgetCode);
			if (inputElements[i].id === 'arrow-controls-id')
			{
				inputElements[i].addEventListener('change', allowArrowControls);
			}
			else if (inputElements[i].id === 'allow-add-events-id')
			{
				inputElements[i].addEventListener('change', allowAddEvents);
			}
			else if (inputElements[i].id === 'allow-remove-events-id')
			{
				inputElements[i].addEventListener('change', allowRemoveEvents);
			}
		}
		else
		{
			console.error(inputElements[i]);
		}
	}

	// Добавить кнопки для смены месяца
	function allowArrowControls()
	{
		let showControls = document.querySelector('#arrow-controls-id').checked;
		let arrows = document.querySelectorAll(".arrow");
		let headerDate = document.querySelector("#header-date-id");

		for (var i=0;i<arrows.length;i++)
		{
			if (!showControls)
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
	function allowAddEvents()
	{
		let allowAddEvents = document.querySelector('#allow-add-events-id').checked;

		if (!allowAddEvents) { settings.allowAddEvents = false; }
		else { settings.allowAddEvents = true; }
	}

	// Давать ли возможность удалять события
	function allowRemoveEvents()
	{
		let allowRemoveEvents = document.querySelector('#allow-remove-events-id').checked;
		let delEvent = document.querySelectorAll('.del');

		if (!allowRemoveEvents) { settings.allowRemoveEvents = false; }
		else { settings.allowRemoveEvents = true; }
	}

	// Добавить свой стиль для календаря
	function setCalendarStyle(action)
	{
		let newClass = 'custom-' + settings.el.slice(1);
		let targetDIV = document.querySelector(settings.el);
		if (targetDIV.className.indexOf(newClass) < 0)
		{
			targetDIV.className += ' ' + newClass;
		}

		let css;
		if (settings.cssStyles)
		{
			css = '.' + newClass + ' ' + settings.cssStyles;
		}
		else if (document.querySelector("#style-id"))
		{
			css = '.' + newClass + ' ' + document.querySelector("#style-id").value;
		}
		else return;

		let head = document.head || document.getElementsByTagName('head')[0];
		let style = document.createElement('style');
		style.type = 'text/css';

		if (style.styleSheet)
		{
			style.styleSheet.cssText = css;
		}
		else
		{
			style.appendChild(document.createTextNode(css));
		}

		if (action == "add")
		{
			head.appendChild(style);
		}
		else
		{
			head.replaceChild(style, document.getElementsByTagName('style')[0]);
		}
	}
	setCalendarStyle('add');
}