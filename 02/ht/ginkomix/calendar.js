function drawInteractiveCalendar(el,yearParam,monthParam) {

	var year =yearParam,
		month = monthParam;
	var calendar = document.createElement('div');
	calendar.id = 'calendar';
	var buttonLeft = document.createElement('button');
	buttonLeft.innerHTML = '[<]';
	buttonLeft.id = 'buttonLeft';
	var data = document.createElement('span');
	data.className = 'data';
	var buttonRight = document.createElement('button');
	buttonRight.innerHTML = '[>]';
	buttonRight.id = 'buttonRight';
	var divButton = document.createElement('div');
	divButton.className = 'divButton';
	var divButton = document.createElement('div');
	divButton.className = 'divButton';
	var boxSave = document.createElement('div');
	boxSave.className = 'boxSave';
	var divCalendarMain =document.createElement('div');
	divCalendarMain.id = 'divCalendarMain';
	divButton.appendChild(buttonLeft);
	divButton.appendChild(data);
	divButton.appendChild(buttonRight);
	calendar.appendChild(divButton);
	el.appendChild(calendar);
	el.appendChild(divCalendarMain);
	el.appendChild(boxSave);
	data.innerHTML = year+' '+month;
	drawCalendar(divCalendarMain,year,month);
getLocal() ;

	document.getElementById('buttonLeft').onclick = function(e) {
		month--;
		if(month===0) {
			month=12;
			year--;
		}
		drawCalendar(divCalendarMain,year,month);
		data.innerHTML = year+' '+month;
	}

	document.getElementById('buttonRight').onclick = function(e) {
		month++;
		if(month===13) {
			month=1;
			year++;
		}
		drawCalendar(divCalendarMain,year,month);
		data.innerHTML = year+' '+month;
	}
	document.getElementById('divCalendarMain').onclick = function(event){
		var target = event.target;
		if(target.tagName!='TD') {
			return;
		}
		var p = document.createElement('p');
		boxSave.appendChild(p);
		p.innerHTML = target.innerHTML+' '+year+' '+month;
		localStorage.setItem(target.innerHTML+' '+year+' '+month,target.innerHTML+' '+year+' '+month)
	}
	function getLocal() {
		for( var i = 0;i<localStorage.length;i++) {
			var key = localStorage.key(i);


			var p = document.createElement('p');
			boxSave.appendChild(p);
			p.innerHTML = localStorage.getItem(key);
		}
	}




	function drawCalendar(el,year,month) {
		el.innerHTML ='';
		function getDayNumber(date) { 
			var number = date.getDay();
			if(number === 0)
			{
				return number = 6;
			}
			else  return number - 1;

		}
		var now = new Date(year,month-1);

		var Calendar = '<table><tr>';
		for(var i=0;i<getDayNumber(now);i++) {
			Calendar+='<th></th>';
		}
		while(now.getMonth()===month-1) {

			Calendar += '<td>' + now.getDate() + '</td>';
			if (getDayNumber(now) % 6 === 0 && getDayNumber(now)!==0) {

				Calendar += '</tr><tr>';
			}
			now.setDate(now.getDate() + 1);
		}
		Calendar += '</tr></table>';
		el.innerHTML=  Calendar;

	}
}

var calendar = document.getElementById('interactiveCalendar');
drawInteractiveCalendar(calendar,2017,11);