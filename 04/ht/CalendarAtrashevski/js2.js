'use strict';
			
			function conslusion (){
				if(calendar.state.showmonth){
				document.getElementById('result1').innerHTML = calendar.nameofthemonth[calendar.month-1]+'<br>'+calendar.year;
				}else{document.getElementById('result1').innerHTML = ''}
				document.getElementById('stateconclusion').innerHTML = 'show month: '+ calendar.state.showmonth +',<br> allow add: '+calendar.state.allowadd+',<br>allow remove: '+calendar.state.allowremove+',<br>allow change month: '+calendar.state.allowchangemonth+'<br> Date: '+calendar.data;
			} 
			conslusion();
			function callCalendar(checkbox){
				(checkbox)&&calendar.changeState(checkbox);
				(checkbox)&&localStorage.setItem('state', JSON.stringify(calendar.state));
				calendar.getHTMLCalendar();
				calendar.drawMemory();	
				conslusion();
			}
			function callCalendarLeftAndRight (month, year){
				 calendar = new Calendar(month, year);
				 callCalendar();
			}
			document.getElementById("showmonth").addEventListener("change", function(){
			callCalendar('showmonth');
			});
			document.getElementById('allowadd').addEventListener("change", function(){
			callCalendar('allowadd');
			});
			document.getElementById('allowremove').addEventListener("change", function(){
			callCalendar('allowremove');
			});
			document.getElementById('allowchangemonth').addEventListener("change", function(){
			callCalendar('allowchangemonth');
			});

			document.getElementById('changemontsinpage').oninput = function() {
				callCalendarLeftAndRight(document.getElementById('changemontsinpage').value, document.getElementById('changeyearinpage').value);
		  	};
			document.getElementById('changeyearinpage').oninput = function() {
			
				callCalendarLeftAndRight(document.getElementById('changemontsinpage').value, document.getElementById('changeyearinpage').value);
			};

			

			clearMemory.addEventListener("click", clear);
			function clear() {
			
				localStorage.removeItem("mykey");
			}
			clearMemoryState.addEventListener("click", clearState);
			function clearState() {
				localStorage.removeItem("state");
			}
   
			
		  
			
