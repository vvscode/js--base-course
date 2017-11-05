
var currCalendar=new Calendar(1,1,1,1,new Date(2017,10,1));
currCalendar.drawIntCalendar(document.getElementById('calendar'));


function Calendar(showMonthYear,allowPrevNext,allowAddTask,allowRemoveTask,defDate, calendarID)
{this.calendarID=calendarID&&"calendar"+Math.floor(Math.random()*10000);
this.showMonthYear=showMonthYear;
this.allowPrevNext=allowPrevNext;
this.allowAddTask=allowAddTask;
this.allowRemoveTask=allowRemoveTask;
this.defDate=defDate;
this.drawIntCalendar=function(elem) {
        drawCalendar(this,elem);
        // if add is enabled - get data and set EventListener to span with date
        if (this.allowAddTask) {
            getData(this.defDate,calendarID);
            sendDataToCalendar(1,monthTasks.length);
            elem.addEventListener("click",function addTask(event)
            {if (event.target.className!='dataAddTask') return;
                var target=event.target;
                var date = new Date(this.defDate.getFullYear(), this.defDate.getMonth(), target.innerHTML);
                var task=getTask(date);
                if (task!=""&&task!=null)
                {addDayTask(task,date);
                setData(date,monthTasks,calendarID);
                drawTaskInDay(task,date.getDate());
                };


            }.bind(this));
        }
        //EventListeners for PrevNext
        if (this.allowPrevNext) {
            elem.addEventListener("click", function buttons(event) {
                if (event.target.className!="prevMonth"&&event.target.className != "nextMonth") return;
                var month = this.defDate.getMonth();
                var year = this.defDate.getFullYear();

                if (event.target.className == "prevMonth") {
                    if (month == 0) {
                        month = 11;
                        year -= 1;
                    }
                    else month -= 1;
                }
                if (event.target.className == "nextMonth") {
                    if (month == 11) {
                        month = 0;
                        year += 1;
                    }
                    else month += 1;
                }
                this.defDate.setFullYear(year, month, 1);
                drawCalendar(this, elem);
                if (this.allowAddTask) {
                    getData(this.defDate, calendarID);
                    sendDataToCalendar(1,monthTasks.length);
                }
                // if add is enabled - get data and set EventListener to span with date
                if (this.allowAddTask) getData(this.defDate, calendarID);
            }.bind(this));
        }
        // event listener to call function to remove task
        if (this.allowRemoveTask)
            addEventListener("click",function removeTask(event){
                var target=event.target;
                if (target.className!='addedTask') return;
                var day=parseInt(target.parentNode.firstChild.innerHTML);
                var task=target.innerHTML;
                var remDate=new Date(this.defDate.getFullYear(),this.defDate.getMonth(),day);
                var shouldRemove=confirmTaskRemoval(task,remDate);
                if (!shouldRemove) return;
                removeDayTask(task,day);
                setData(remDate,monthTasks,calendarID)
                refreshCell(day);
        }.bind(this));

    }
}

//draws calendar template
function drawCalendar(obj,elem)
{
    var date=obj.defDate;
    var numberOfDays=([3,5,8,10].includes(date.getMonth()))?30:31;
    if (date.getMonth()==1) numberOfDays=(date.getFullYear()%4==0&&date.getFullYear()%100!=0)?29:28;
    var dayOfWeek1=date.getDay();
    var calendarTable="<table style='empty-cells: hide'>";
    //configurable header
    if (obj.allowPrevNext) calendarTable+="<th><button class='prevMonth'><</button>";
    else calendarTable+="<th>";
    if (obj.showMonthYear) calendarTable+=(date.getMonth()+1)+"/"+date.getFullYear();
    if (obj.allowPrevNext) calendarTable+="<button class='nextMonth'>></button></th>";
    else calendarTable+="<th>"
    //caption - filling days of week cells
    calendarTable+="<tr bgcolor='#e6e6fa'><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>";
    //sunday =7
    if (dayOfWeek1==0) dayOfWeek1=7;
    // filling date cells
    //filling prev month with empty spaces
    for (var i=1;i<dayOfWeek1;i++)
        calendarTable+="<td></td>";
    for (var i=1;i<=numberOfDays;i++) {
        calendarTable +="<td><span class='dataAddTask'>"+i+"</span></td>";
        //going to next line
        if ((dayOfWeek1+i-1) % 7 == 0&&i!=numberOfDays) calendarTable += "</tr><tr>"
    }
    calendarTable+="</tr></table>";
    elem.innerHTML=calendarTable;
};

function drawTaskInDay(task,day)
{
    if (task=="") return;
    var taskToAdd=document.createTextNode(task);
    var elemToAdd=document.createElement("div");
    elemToAdd.className="addedTask";
    elemToAdd.appendChild(taskToAdd);
    var cellsToAddTo=document.getElementsByClassName("dataAddTask");
    for (var i=0;i<cellsToAddTo.length;i++) {
        if (cellsToAddTo[i].innerHTML == day) {
            cellsToAddTo[i].parentNode.appendChild(elemToAdd);
            return;
        }
    }
};

function refreshCell(day)
{
    var cellsToClear=document.getElementsByClassName("dataAddTask");
    for (var i=0;i<cellsToClear.length;i++) {
        if (cellsToClear[i].innerHTML == day) {
            var tdCell=cellsToClear[i].parentNode;
           while (tdCell.firstChild!=tdCell.lastChild) tdCell.removeChild(tdCell.lastChild);
        }
    }
    sendDataToCalendar(day,day+1);
}

