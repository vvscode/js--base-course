		'use strict';
		class Calendar {
			constructor(month, year){
				this.month = Number(month);   // Number - так с input type="number" значения приходят  в String 
				this.year = Number(year);
				this.nameofthemonth = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
				this.buttonInCalendar1 = '<input type="button" ig = "elemMore" value="<" />';
				this.buttonInCalendar2 = '<input type="button" id = "elemLess" value=">" />';
				this.data = this.nameofthemonth[this.month-1]+' / '+this.year;
				this.checkbox = '<input type = "button" id = "StateButton" value = "clear state"><br><br>'+
				'<input type = "button" id = "mykey" value = "clear memory"'+
				'<form><fieldset id = "check">'+
				 '<legend><p>Configure Calendar</p></legend><br>'+
				'<input type="checkbox" id="showmonth"> show month <br><br>'+
				 '<input type="checkbox" id="allowadd"> allow add <br><br>'+
				 '<input type="checkbox" id="allowremove"> allow remove <br><br>'+
				'<input type="checkbox" id="allowchangemonth"> allow change month <br><br>'+
				 '<input type="number" id = "changeyearinpage" value="'+this.year+'" step="1" placeholder="Your budget">'+
				 '<input type="number" id = "changemontsinpage" value="'+ this.month+'" min="1" max="12" step="1" placeholder="Your budget">'+
				 '<p id = "Date"></p></fieldset></form>';
				this.tableWriteStart = '<table  width="800" height="322" border="1">';
				this.tableWrite = '';
				this.memory;
				this.amountOfdays;
				this.determinant;
				this.state = {showmonth: false, allowadd: false, allowremove: false, allowchangemonth: false};
			}
			checkInMemory (){
				if (!isNaN(localStorage.getItem("mykey"))){
				localStorage.setItem("mykey", '{}');
			}}
			checkInMemoryState (){
				if (isNaN(localStorage.getItem("state"))){
					this.state = JSON.parse(localStorage.getItem('state'));
					}
			}
			checkCheckbox(){
				for (let key in this.state){
					document.getElementById([key]).checked = this.state[key];
				}
			}
			buttonLeftAndRight (){
				if(this.state.allowchangemonth){
					document.getElementById('left').innerHTML = '<input type = "button" value = "<">';
					document.getElementById('right').innerHTML = '<input type = "button" value = ">">';
				}
				else{
					document.getElementById('left').innerHTML = null;
					document.getElementById('right').innerHTML = null;
				}
			}
			conclusionData (){
				if(this.state.showmonth){
					document.getElementById('data').innerHTML = this.data;		
				}else{
					document.getElementById('data').innerHTML = null;
				}	
			}                                     
			getHTMLCalendar(year, month){       
			this.checkInMemory();
			this.checkInMemoryState();
			this.tableWrite = this.tableWriteStart;
			this.tableWrite += '<tr><td about = "hell" colspan="1" id = "left">'+
			'</td><td id = "data" about = "hell" colspan="5" align = "center" >'+
			'</td><td about = "hell" colspan="1" id = "right" >'+
			'</td></td></tr><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr>';
			this.amountOfdays = new Date(this.year, this.month, 0).getDate();
			let dayOftheweek = new Date(this.year, (this.month - 1), 1).getDay();
			if(dayOftheweek == 0){
				dayOftheweek = 7;
			}
			let cell = 1;
			for (let calendarSize = 42; calendarSize >= cell; cell++) {
				if (dayOftheweek == cell) {
					for (let number = 1; this.amountOfdays >= number; number++) {
						if (cell % 7 == 0) {
							if (this.amountOfdays == number) {
								this.tableWrite += '<td id = "i'+this.year+'I'+this.month+'I'+number+'" about = "'+number+'">' + number + '</td>';
								break;
								}
								this.tableWrite += '<td id = "i'+this.year+'I'+this.month+'I'+number+'" about = "'+number+'">' + number + '</td></tr><tr>';
								number++;
								cell++;
							}
							this.tableWrite += '<td id = "i'+this.year+'I'+this.month+'I'+number+'" about = "'+number+'">' + number + '</td>';
						cell++;
						}
					}
			if (cell % 35 == 0 && (dayOftheweek + this.amountOfdays - 1) == cell) {
				break;
			}
			if (cell % 35 == 0) {
				this.tableWrite += '<td  about = "hell"></td>';          
				break;
			}
			this.tableWrite += '<td  about = "hell"></td>';
			}
			this.tableWrite += '</table>';
			document.getElementById('calendar').innerHTML = this.tableWrite;
			this.buttonLeftAndRight();
			this.conclusionData();
			}
			conclusionCheckbox (){
				document.getElementById('checkbox').innerHTML = this.checkbox;
			}
			conclusionState(){
				if (!isNaN(document.getElementById('showmonth'))){return};
				document.getElementById('state').innerHTML = '<fieldset id = "conclusion"> show month: '+ 
				calendar.state.showmonth +',<br> allow add: '+
				calendar.state.allowadd+',<br>allow remove: '+
				calendar.state.allowremove+',<br>allow change month: '+
				calendar.state.allowchangemonth+'<br> Date: '+calendar.data+'</fieldset>';
			}
			clearingAPartOfMemory(number, deletingArecord){				   
				this.memory = JSON.parse(localStorage.getItem('mykey'));	
				let arr = this.memory[this.determinant+number];				
				arr.splice(deletingArecord, 1);								 	
				this.memory[this.determinant+number]  = arr;
				localStorage.setItem('mykey', JSON.stringify(this.memory)); 
			}	
			drawMemory(){
				this.memory = JSON.parse(localStorage.getItem('mykey'));     
				this.determinant = 'i'+this.year+'I'+this.month+'I';           
				for (let i = 1; this.amountOfdays >= i; i++){                        
					if(this.memory[this.determinant+i]){ 							 
						document.getElementById(this.determinant+i).innerHTML = i;				
						for(let y = 0 ; this.memory[this.determinant+i].length > y; y++) {		
							document.getElementById(this.determinant+i).innerHTML += this.memory[this.determinant+i][y]; 
								if(this.state.allowremove){		
									document.getElementById(this.determinant+i).innerHTML += '<input type="button" about1="'+i+'" about2 = "'+y+'" value = "X" />'; 
								}
							}
						}
					}
				}
			};
			let calendar = new Calendar (4, 2018);
		
			function callCalendar (month, year){
				
					calendar = new Calendar (month, year);
					if(!document.getElementById('checkbox').innerHTML){
					calendar.tableWriteStart = '<table  width="1000" height="500" border="3">';
					}
					calendar.getHTMLCalendar();
					calendar.drawMemory();
					calendar.conclusionState();
			}
			function leftAndRight (event){
				function changeMonthYear (change1, change2, change3){
					calendar.month += change1;
					if(calendar.month==change2){ 
						calendar.month = change3;
						calendar.year +=change1;
					}
					callCalendar(calendar.month, calendar.year);
				}
				(event.target.value == "<" && event.target.value !== "x")&& changeMonthYear(-1, 0, 12);
				(event.target.value == ">" && event.target.value !== "x")&& changeMonthYear(1, 13, 1);
				if(event.target.value == "X"){
					calendar.clearingAPartOfMemory(event.target.getAttribute('about1'), event.target.getAttribute('about2')); 
					calendar.drawMemory();
				}
			};
			document.getElementById("calendar").addEventListener("click", leftAndRight);
			function handleUrl(url) {
			if (url.includes("Options")) {
				document.getElementById('calendar').style.top = null;
				document.getElementById('calendar').style.left = null;
				calendar.tableWriteStart = '<table  width="800" height="322" border="1">';
				calendar.getHTMLCalendar();
				calendar.drawMemory();
				calendar.conclusionCheckbox();
				calendar.conclusionState();
				calendar.checkCheckbox();
				document.getElementById('mykey').addEventListener('click', clear1);
				document.getElementById('StateButton').addEventListener('click',clear2);
			
				}
				else{
					document.getElementById('checkbox').innerHTML = null;
					document.getElementById('state').innerHTML = null;
					calendar.tableWriteStart = '<table  width="1000" height="500" border="3">';
					calendar.getHTMLCalendar();
					calendar.drawMemory();
					document.getElementById('calendar').style.top = '20%'
					document.getElementById('calendar').style.left = '20%'
				}
			}
			window.addEventListener("hashchange", ev => handleUrl(ev.newURL));
			handleUrl(window.location.href);
			document.body.addEventListener("click", ev => {
			if (!ev.target.matches("a")) {
				return;
			}
			ev.preventDefault();
			let url = ev.target.getAttribute("href");
			window.location.hash = url;
			});
			document.getElementById('checkbox').addEventListener('click', checkboxClick);
			function checkboxClick (event){
			
				if (event.target.value == 'on'){
					calendar.state[event.target.id] = event.target.checked;
					(event.target.id == 'allowremove')&& calendar.drawMemory();
					(event.target.id == "showmonth")&& calendar.conclusionData();
					(event.target.id == "allowchangemonth")&& calendar.buttonLeftAndRight();
					calendar.conclusionState();
					localStorage.setItem('state', JSON.stringify(calendar.state));
				}else{
						
					callCalendar(document.getElementById('changemontsinpage').value, document.getElementById('changeyearinpage').value);
				}}
			document.getElementById("calendar").addEventListener("dblclick", ask);
			function ask (ev){
				if(ev.target.tagName == "TD"&& ev.target.getAttribute("about") != 'hell'&& calendar.state.allowadd){
					let numberOFtrampling = ev.target.getAttribute("about"); 
					let comment = prompt ('Чем запомнился этот день?');
					if (comment == null){return}
					let key = 'i'+calendar.year+'I'+calendar.month+'I'+numberOFtrampling;  
					let memory = JSON.parse(localStorage.getItem('mykey'));
					if (memory[key]){   
						memory[key].push('<br>'+comment+' ');  
					}else{
					memory[key] = ['<br>'+comment+' ', ]; 
					}
					localStorage.setItem( 'mykey', JSON.stringify(memory)); 
					calendar.drawMemory();				
				}
			};
			function clear1() {
				localStorage.removeItem("mykey");
			}
			function clear2() {
				localStorage.removeItem("state");
			}