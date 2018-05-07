'use strict';
		class Calendar {
			constructor(month, year){
				this.month = Number(month);   // Number - так с input type="number" значения приходят  в String 
				this.year = Number(year);
				this.nameofthemonth = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
				this.buttonInCalendar1 = '<input type="button" ig = "elemMore" value="<" />';
				this.buttonInCalendar2 = '<input type="button" id = "elemLess" value=">" />';
				this.data = this.nameofthemonth[this.month-1]+' / '+this.year;
				this.tableWriteStart = '<tr height="40"><td about = "hell" colspan="1" id = "left"></td><td id = "data" about = "hell" colspan="5" align = "center" ></td><td about = "hell" colspan="1" id = "right" ></td></td></tr><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr>';
				this.tableWrite = '';
				this.memory;
				this.amountOfdays;
				this.determinant;
				this.state = {showmonth: false, allowadd: false, allowremove: false, allowchangemonth: false}
			}
			checkInMemory (){
				if (!isNaN(localStorage.getItem("mykey"))){
				localStorage.setItem("mykey", '{}');
			}}                                             //Проверяет наличие записи в LocaleStorage
			changeState(checkbox){
				
				if(document.getElementById(checkbox).checked){
						this.state[checkbox] = true;     // Принимает название чекбокса, эдентичное какому - либо свойству в обьекте state
					}
				else{
					this.state[checkbox] = false;
			}}
			return(){
				
				if(isNaN(localStorage.getItem("state"))){
				
					this.state = JSON.parse(localStorage.getItem('state')); //Проверяет наличие записи в LS обькта State, если есть, записывает в this.state
					}             // Создано для сохранения состояние чекбоксов, кода листается календарь
			}
			getHTMLCalendar(year, month){       // получение HTML календаря
			this.checkInMemory();
			this.return();
			this.tableWrite = this.tableWriteStart;
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
			 document.getElementById('calendar').innerHTML = this.tableWrite;
			 if(this.state.showmonth){
				 document.getElementById('data').innerHTML = this.data
				}
			 if(this.state.allowchangemonth){
				 document.getElementById('right').innerHTML = this.buttonInCalendar2;  // и тут проверяется значния свойств обьекта state, соответственно
				 document.getElementById('left').innerHTML = this.buttonInCalendar1;  // вывод кнопок листания календаря  и даты в календаре(table)
				}
			 }
			clearingAPartOfMemory(number, deletingArecord){				   // Принимает  номер (день) ячейки , номер записи (номер в массиве)  ps:  это к обькту в LS, который хранит записи на календаре
				this.memory = JSON.parse(localStorage.getItem('mykey'));		//  Извлекает обьект с записями 
				let arr = this.memory[this.determinant+number];				 // Находит свойство в таком виде i2018I12I23
				arr.splice(deletingArecord, 1);								 	//  Удаляет по номеру в массиве, элемент в массиве - блабла бла Х  на календаре			
				this.memory[this.determinant+number]  = arr;
				localStorage.setItem('mykey', JSON.stringify(this.memory));  // Обратно пишет в LS 
			 }	
			drawMemory(){
				this.memory = JSON.parse(localStorage.getItem('mykey'));     // берет обьект из памяти 
				this.determinant = 'i'+this.year+'I'+this.month+'I';            // определяется строка, по которой будет искаться свойство
				for (let i = 1; this.amountOfdays >= i; i++){                        // перебираются  дни месяца
					if(this.memory[this.determinant+i]){ 							  // находится свойство 
						document.getElementById(this.determinant+i).innerHTML = i;				// в ячейку добовляется заново номер дня
						for(let y = 0 ; this.memory[this.determinant+i].length > y; y++) {		// перебирается массив и вносится в ячейку
							document.getElementById(this.determinant+i).innerHTML += this.memory[this.determinant+i][y]; 
								if(this.state.allowremove){		// И проверяется свойство в обьекте state, если true - добавляются кнопки Х
									document.getElementById(this.determinant+i).innerHTML += '<input type="button" about1="'+i+'" about2 = "'+y+'" value = "X" />'; 
								}
							}
						}
					}
				}
			};
			let calendar = new Calendar (4, 2018);
			calendar.getHTMLCalendar();
			calendar.drawMemory();
			function changeMonthYear (change1, change2, change3){
				calendar.month += change1;
				if(calendar.month==change2){ 
					calendar.month = change3;
					calendar.year +=change1;
				}
				calendar = new Calendar (calendar.month, calendar.year);
				calendar.getHTMLCalendar();
				calendar.drawMemory();
			 }
			document.getElementById("calendar").addEventListener("click", leftAndRight);
			function leftAndRight (event){
				function changeMonthYear (change1, change2, change3){
					calendar.month += change1;
					if(calendar.month==change2){ 
						calendar.month = change3;
						calendar.year +=change1;
					}
					
					calendar = new Calendar (calendar.month, calendar.year);
					calendar.getHTMLCalendar();
					calendar.drawMemory();
 				}
				(event.target.value == "<" && event.target.value !== "x")&& changeMonthYear(-1, 0, 12);
				(event.target.value == ">" && event.target.value !== "x")&& changeMonthYear(1, 13, 1);
				if(event.target.value == "X"){
					calendar.clearingAPartOfMemory(event.target.getAttribute('about1'), event.target.getAttribute('about2')); 
					calendar.drawMemory();
				}
			};
			document.getElementById("calendar").addEventListener("dblclick", ask);
			function ask (ev){
				if(ev.target.tagName == "TD"&& ev.target.getAttribute("about") != 'hell'&& calendar.state.allowadd){
					let numberOFtrampling = ev.target.getAttribute("about"); // определяется ячейка, по кторой кликнули
					let comment = prompt ('Чем запомнился этот день?');
					if (comment == null){
						return; }
					let key = 'i'+calendar.year+'I'+calendar.month+'I'+numberOFtrampling;   //формируется  название будущего свойства в обьекте памяти
					let memory = JSON.parse(localStorage.getItem('mykey'));
					if (memory[key]){   //  Проверяется, нет ли уже такого свойства 
						memory[key].push('<br>'+comment+' ');   //  делается свойство, пушится коментарий (бла бла Х)
					}else{
					memory[key] = ['<br>'+comment+' ', ]; // Это тот случай, если свойство еще не было создано 
					}
					localStorage.setItem( 'mykey', JSON.stringify(memory)); // обьект памяти записывается в ls 
					calendar.drawMemory();				
				}
			};
			
   
			
		  
			
