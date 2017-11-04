	var settingsRuler = document.getElementById("settings__ruler");
	var settingsCreateNote = document.getElementById("settings__create-note");
	var settingsDeleteNote = document.getElementById("settings__delete-note");
	var settingsCreateTitle = document.getElementById("settings__calendar-title");
	var createButton = document.getElementById("create-calendar");

	function createCalendar() {
		var d = new Date();
		var month = d.getMonth(); 
		var year = d.getFullYear();
		var date = d.getDate();
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
		


		function newCalendar (year, month) {
			var firstDateThisMonth = new Date(year, month, 1); 
			var lastDateThisMonth = new Date(year, month + 1, 0); 
			

			function newCalendar (year, month) {
				var firstDateThisMonth = new Date(year, month, 1); 
	      		var tableRow = table.insertRow();
	     		for (var i = 0; i < getDay(firstDateThisMonth); i++) {
					var tableCell = tableRow.insertCell();
					tableCell.className = "calendar__table-cell";
				}

	     		while (firstDateThisMonth.getMonth() == month) {
					var tableCell = tableRow.insertCell();
					tableCell.innerHTML = firstDateThisMonth.getDate();
					tableCell.id = "c" + firstDateThisMonth.getTime();
					tableCell.className = "calendar__table-cell";

	       			if (getDay(firstDateThisMonth) % 7 === 6) {
						tableRow = table.insertRow();
					}
					firstDateThisMonth.setDate(firstDateThisMonth.getDate() + 1);
				}


				function getDay(date) { // weekdays Monday (0) to Sunday (6)
					var weekDay = date.getDay();
						if (weekDay === 0) weekDay = 7;
						return weekDay - 1;
					}

					if (getDay(firstDateThisMonth) !== 0) {
						for (i = getDay(lastDateThisMonth); i < 6; i++) {
							var tableCell = tableRow.insertCell();
							tableCell.className = "calendar__table-cell";
						}
					}

					calendarWrapper.appendChild(table);
				}	

				newCalendar(year, month);

			
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

