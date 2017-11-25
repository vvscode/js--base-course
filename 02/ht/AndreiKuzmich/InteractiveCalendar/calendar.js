

  window.onload = function() {

  var tab = document.createElement('table');
 
 tab.innerHTML = '<table id="tab"><tr><th><button id = "L"><</button></th><th colspan="5" id = "currentDate">месяц</th><th><button id = "R">></button></th></table>';
 head.appendChild(tab);

  function drawInteractiveCalendar(year, month, id) {
    
   
        var mon = month - 1;
        var d = new Date(year, mon);
  
        month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
    
    var table1 = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
    
         
          for (var i = 0; i < getDay(d); i++) {
            table1 += '<td></td>';
          }
    

          while (d.getMonth() == mon) {
            table1 += '<td>' + d.getDate() + '</td>';
    
            if (getDay(d) % 7 == 6) { 
              table1 += '</tr><tr>';
            }
    
            d.setDate(d.getDate() + 1);
          }
    
         
          if (getDay(d) != 0) {
            for (var i = getDay(d); i < 7; i++) {
              table1 += '<td></td>';
            }
          }
    
          
          table1 += '</tr></table>';
    
          var showCalendar = document.getElementById(id);
          showCalendar.innerHTML = table1;
        
    
        function getDay(date) { 
          var day = date.getDay();
          if (day == 0) day = 7;
          return day - 1;
        }
    
        document.querySelector('#currentDate').innerHTML = month[mon] +' '+ d.getFullYear();
        document.querySelector('#currentDate').dataset.month = d.getMonth();  
        document.querySelector('#currentDate').dataset.year = d.getFullYear();
          
      }

        drawInteractiveCalendar(2015, 11, 'body')

        function PlusMonth(){
       
            drawInteractiveCalendar(document.querySelector('#currentDate').dataset.year, parseFloat(document.querySelector('#currentDate').dataset.month)+ 1, "body");
       
        }
        function MinusMonth(){
            drawInteractiveCalendar(document.querySelector('#currentDate').dataset.year, parseFloat(document.querySelector('#currentDate').dataset.month)-1, "body");
  
          }  
            R.onclick = PlusMonth;
            L.onclick = MinusMonth;
        }

       
    
    








    
