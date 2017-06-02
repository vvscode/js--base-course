window.onload = function () {

	var settingsRuler = document.getElementById("settings__ruler");
	var settingsCreateNote = document.getElementById("settings__create-note");
	var settingsDeleteNote = document.getElementById("settings__delete-note");
	var settingsCreateTitle = document.getElementById("settings__calendar-title");
	var createButton = document.getElementById("create-calendar");

	function createCalendar() {
		var d = new Date();
		var month = d.getMonth(); 
		var year = d.getFullYear();
		var monthNameArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var titleValue = settingsCreateTitle.value;


		var calendarWrapper = document.createElement('DIV');
		calendarWrapper.className = "calendar__wrapper";
		document.body.appendChild(calendarWrapper);


		if (titleValue != false) {
			var calendarTitle = document.createElement('DIV');
			calendarTitle.className = "calendar__title";
			calendarTitle.innerHTML = titleValue;
			calendarWrapper.appendChild(calendarTitle);
		}

		var calendarHeader = document.createElement('DIV');
		calendarHeader.className = "calendar__header";
		calendarWrapper.appendChild(calendarHeader);

		if (settingsRuler.checked == false) {
			var prevMonth = document.createElement('BUTTON');
			prevMonth.className = "calendar__ruler";
			prevMonth.innerHTML = "<";
			calendarHeader.appendChild(prevMonth);
		}

		prevMonth.addEventListener('click', function() {
			if (--month < 0) {
				month = 11;
			} else {
				month = month;
			}
			currentMonth.innerHTML = monthNameArray[month];
			table.innerHTML = '';
			newCalendar(year, month);
		});

		
		var currentMonth = document.createElement('DIV');
		currentMonth.className = "calendar__month-name";
		currentMonth.innerHTML = monthNameArray[month];
		calendarHeader.appendChild(currentMonth);


		if (settingsRuler.checked == false) {
			var nextMonth = document.createElement('BUTTON');
			nextMonth.className = "calendar__ruler";
			nextMonth.innerHTML = ">";
			calendarHeader.appendChild(nextMonth);
		}

		nextMonth.addEventListener('click', function() {
			month = ++month % 12;
			currentMonth.innerHTML = monthNameArray[month];
			table.innerHTML = '';
			newCalendar(year, month);
		});
		

		var table = document.createElement('TABLE');
		table.className = "calendar__table";
		calendarWrapper.appendChild(table);


		function newCalendar (year, month) {
			var firstDateThisMonth = new Date(year, month, 1); 
			var firstDate = firstDateThisMonth.getDate(); //первый день нынешнего месяца
			var firstWeekDay = firstDateThisMonth.getDay(); //день недели первого дня
			

			var lastDateThisMonth = new Date(year, month + 1, 0); //последний день этого месяца
			var lastDate = lastDateThisMonth.getDate();
			var lastWeekDay = lastDateThisMonth.getDay();


			var firstDateNextMonth = new Date(year, month + 1, 1); //первый день следующего месяца
			var firstWeekDayNextMonth = firstDateNextMonth.getDay();

			
			for (var i = 0; i <= 34; i++) {
				var tableCell = document.createElement('td');
				var tableRow = document.createElement('tr');
				tableCell.className = 'calendar__table-cell';

				if (i < firstDateThisMonth.getDay()) {
					tableCell.innerHTML = '';
				} else if (firstDateThisMonth.getDay() == 0) {
					tableCell.innerHTML = firstDateThisMonth.getDate();
					tableCell.id = "c" + firstDateThisMonth.getTime();
					table.appendChild(tableRow);
					firstDateThisMonth.setDate(firstDateThisMonth.getDate() + 1);
				} else if (lastDateThisMonth.getDate() < i) {
					tableCell.innerHTML = '';
				} else {
					tableCell.innerHTML = firstDateThisMonth.getDate();
					tableCell.id = "c" + firstDateThisMonth.getTime();
					firstDateThisMonth.setDate(firstDateThisMonth.getDate() + 1);
				}
				table.appendChild(tableCell);

				var notesArray = LoadNotesForCell(tableCell.id);
				for(var j= 0; j < notesArray.length; j++) {
					var note = notesArray[j];
					var noteBlock = CreateNoteElement(note.text, note.id);
					tableCell.appendChild(noteBlock);
				};
			}

			if (settingsCreateNote.checked == false) {

				table.onclick = function(event) {
					var target = event.target;

					while (target !== table && target.innerHTML !=='') {
						if (target.tagName == 'TD') {
							
							var noteInput = prompt('Add text note here:');
							if (noteInput) { 
								var noteBlock = CreateNoteElement(noteInput);
								target.appendChild(noteBlock);
								AddNoteToLocalStorage(target.id, {id: 1, text: noteInput});
							}
							return;
						}

						if (settingsDeleteNote.checked == false && target.nodeName == 'BUTTON') {
							RemoveNoteFromLocalStorage(target.parentNode.parentNode.id, target.parentNode.id);
							target.parentNode.parentNode.removeChild(target.parentNode);							
						} else {
							return;
						}

						target = target.parentNode;
					}					
				};
			}
		}

		newCalendar(year, month);
	}

	noteCounter = 0;

	function CreateNoteElement(noteInput, noteId) {
		var noteBlock = document.createElement('DIV');
		noteBlock.className = 'note__block-wrapper';
		if (noteId) {
			noteBlock.id = noteId;
		} else {
			noteBlock.id = ++noteCounter; 
		}

		var noteText = document.createElement('DIV');
		noteText.className = 'note__text-style';
		noteText.innerHTML = noteInput;
		noteBlock.appendChild(noteText);

		var noteCloseButton = document.createElement('BUTTON');
		noteCloseButton.className = 'note__close-button';
		noteCloseButton.innerHTML = 'x';
		noteBlock.appendChild(noteCloseButton);

		return noteBlock;
	}

	function LoadNotesForCell(cellId) {
		var cellItemsString  = localStorage.getItem(cellId);
		return JSON.parse(cellItemsString) || []; 
	}

	function SaveNotesForCell(cellId, notesArray) {
		var cellItemsString = JSON.stringify(notesArray);
		localStorage.setItem(cellId, cellItemsString);
	}

	function AddNoteToLocalStorage(cellId, note) {
		var notesArray = LoadNotesForCell(cellId);
		notesArray.push(note);
		SaveNotesForCell(cellId, notesArray);
	}

	function RemoveNoteFromLocalStorage(cellId, noteId) {
		var notesArray = LoadNotesForCell(cellId);
		var noteIndexInArray = notesArray.findIndex(function(note) {
			if (note.id == noteId)
				return true;
			else
				return false;
			});
		if (noteIndexInArray > -1) {
			notesArray.splice(noteIndexInArray, 1);
		}
		SaveNotesForCell(cellId, notesArray);
	}

	createButton.addEventListener('click', createCalendar);

};
