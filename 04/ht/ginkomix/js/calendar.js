'use strict';
(function() {
    function Calendar(yearParam,monthParam,block,element) {
        let now = new Date();
        this.year =	yearParam || now.getYear();
        this.month = monthParam || now.getMonth();
        this.element =  element || 1;
        this.showMonth =  true;
        this.allowAdd =  true;
        this.allowRemove =  true;
        this.block = block ||'#calendar';
        var self = this;
        this.daySelect = 0;
        this.clickChangeCalendarBind = this.clickChangeCalendar.bind(this);
        this.configureBind = this.configure.bind(this);
        this.newTaskBind = this.newTask.bind(this);
        this.delInfBind = this.delInf.bind(this);


    }

    Calendar.prototype.delInf = function(event) {
        if(!this.allowRemove) {
            return;
        }
        var where = document.querySelector('.boxSave'+this.element);
        var target = event.target;
        if(target.tagName != 'BUTTON') {
            return;
        }
        var id = event.target.getAttribute('id');
        var nextTrip = confirm('Удалить?');
        if(!nextTrip) {
            return;
        }
        var data = this.toArr(id);
        var textObj =  this.outputOllStorage(data[0]);
        var self = this;
        this.removeItemFromStorage(data)
            .then(function(){
            textObj =  self.outputOllStorage(data[0]);
            where.innerHTML = '';
            for(var key in textObj) {
                self.output(where,textObj[key],data[1],data[0]);
            }	
        });

    }

    Calendar.prototype.newTask = function(event) {
        if(!this.allowAdd) {
            return;
        }
        var self = this;
        var where = document.querySelector('.boxSave'+this.element);
        this.getNumDay(event,this.daySelect)
            .then(function(day) {
            var data = ''+self.element+self.year+self.month+day;
            var textObj =  self.outputOllStorage(data);							  
            where.innerHTML = '';
            for(var key in textObj) {
                self.output(where,textObj[key],key,data);
            }
            return day;							  
        }).then(function(day){
            if(self.daySelect === day) {
                var text = self.getText();
                if(text===null) {
                    return;
                }
                var data = ''+self.element+self.year+self.month+day;
                var objStorage= {}, num =where.childNodes.length ;
                self.output(where,text,num,data); 
                objStorage[num] = text;	
                self.saveText(data,objStorage); 
                self.outputOllStorage(data);
            } else {
                self.daySelect = day;
                self.daySelect = self.setActive(self.daySelect);
            }
        });

    }

    Calendar.prototype.configure = function() {
        var elementTest = (Math.random()*(1000-1)+1).toFixed(),
            showMonthTest = document.querySelector('#changeMonth').checked ? 1 : 0,
            allowAddTest = document.querySelector('#addTasks').checked ? 1 : 0,
            allowRemoveTest = document.querySelector('#removeTasks').checked ? 1 : 0,
            yearParamTest = document.querySelector('#year').value || 2017,
            monthParamTest = document.querySelector('#month').value || 12,
            classCalendarTest = document.querySelector('#class').value || 'ginkoMix';
        this.year =	yearParamTest || now.getYear();
        this.month = monthParamTest || now.getMonth();
        this.showMonth =  showMonthTest;
        this.allowAdd =  allowAddTest;
        this.allowRemove =  allowRemoveTest;   this.calendarScript(elementTest,showMonthTest,allowAddTest,allowRemoveTest,yearParamTest,monthParamTest,classCalendarTest);
        this.drawCalendar();    
    }

    Calendar.prototype.clickChangeCalendar = function(event){
        if(this.showMonth) {
            if(event.target.tagName!="BUTTON") {
                return;
            }
            let classButton = event.target.getAttribute('class');
            var where = document.querySelector('.boxSave'+this.element);
            if(classButton==='buttonLeft'){
                this.changeMonthBack(this);

                this.daySelect = this.clearText(where);
                this.drawCalendar();
            }
            if(classButton==='buttonRight'){
                this.changeMonthNext(this);
                this.daySelect =this.clearText(where);
                this.drawCalendar();
            }
        }
    }

    Calendar.prototype.changeMonthBack = function(self){
        self.month--;
        if(self.month===0) {
            self.month=12;
            self.year--;
        }
    }

    Calendar.prototype.changeMonthNext= function(self){
        self.month++;
        if(self.month===13) {
            self.month=1;
            self.year++;
        }
    }

    Calendar.prototype.clearText = function (where){
        where.innerHTML = '';
    }

    Calendar.prototype.toArr = function(num) {
        var num = num+'';
        num = num.split(',');
        for(var i = 0;i<num.length;i++) {
            num[i] = parseInt(num[i]);
        }
        return num;
    }

    Calendar.prototype.removeItemFromStorage = function(link) {
        return new Promise(function(resolve) {

            var storageText =JSON.parse(localStorage.getItem(link[0]));
            delete storageText[link[1]];
            var arr = [],storageObj = {};
            for(var i in storageText) {
                arr.push(storageText[i]);
            }
            for(var i= 0;i<arr.length;i++) {
                storageObj[i] = arr[i];
            }
            var sObj = JSON.stringify(storageObj);
            localStorage.setItem(link[0],sObj);	
            return	resolve();
        });
    }

    Calendar.prototype.output = function(where,text,num,data){
        var p = document.createElement('p');
        var div = document.createElement('div');
        var button = document.createElement('button');
        var arrayForDel = [data,num];
        div.className = 'infAboutDay';
        button.innerHTML = 'Удалить!';
        button.className = 'del';
        button.id = arrayForDel;
        div.appendChild(p);
        div.appendChild(button);
        where.appendChild(div);
        p.innerHTML = text;
    }

    Calendar.prototype.saveText = function(where,text){
        var sObj;
        var storageText =JSON.parse(localStorage.getItem(where));
        if(!storageText)
        {
            storageText = text;
        }else {
            Object.assign(storageText,text);
        }
        var sObj = JSON.stringify(storageText);
        localStorage.setItem(where,sObj);
    }

    Calendar.prototype.outputOllStorage = function(where) {
        return JSON.parse(localStorage.getItem(where));
    }

    Calendar.prototype.getText = function() {
        return prompt('Введите задачу');
    }

    Calendar.prototype.drawInteractiveCalendar = function() {

        var el = document.createElement('div');
        el.id = 'interactiveCalendar'+this.element;
        document.querySelector(this.block).appendChild(el);
        var buttonLeft = document.createElement('button');
        buttonLeft.innerHTML = '[<]';
        buttonLeft.className = 'buttonLeft';
        var data = document.createElement('span');
        data.className = 'data'+this.element;
        var buttonRight = document.createElement('button');
        buttonRight.innerHTML = '[>]';
        buttonRight.className = 'buttonRight';
        var divButton = document.createElement('div');
        divButton.className += 'divButton';
        divButton.className += ' divButton'+this.element;
        var boxSave = document.createElement('div');
        boxSave.className = 'boxSave'+this.element;
        var divCalendarMain =document.createElement('div');
        divCalendarMain.id = 'divCalendarMain'+this.element;
        divButton.appendChild(buttonLeft);
        divButton.appendChild(data);
        divButton.appendChild(buttonRight);
        el.appendChild(divButton);
        el.appendChild(divCalendarMain);
        el.appendChild(boxSave);
        data.innerHTML = this.year+' '+this.month;
    }

    Calendar.prototype.getDayNumber = function(date) { 
        var number = date.getDay();
        if(number === 0) {
            return number = 6;
        }
        else  return number - 1;
    }

    Calendar.prototype.drawCalendar = function() {
        document.querySelector('#divCalendarMain'+this.element).innerHTML ='';
        var now = new Date(this.year,this.month-1);
        var Calendar = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>св</th><tr>';
        for(var i=0;i<this.getDayNumber(now);i++) {
            Calendar+='<th></th>';
        }
        while(now.getMonth()===this.month-1) {
            Calendar += '<td>' + now.getDate() + '</td>';
            if (this.getDayNumber(now) % 6 === 0 && this.getDayNumber(now)!==0) {
                Calendar += '</tr><tr>';
            }
            now.setDate(now.getDate() + 1);
        }
        Calendar += '</tr></table>';	document.querySelector('#divCalendarMain'+this.element).innerHTML=  Calendar;
        document.querySelector('.data'+this.element).innerHTML = this.year+' '+this.month;
        this.daySelect = this.setActive(this.daySelect);

    }

    Calendar.prototype.getNumDay = function(event,day) {
        return new Promise(function(resolve) {
            var target = event.target;
            if(target.tagName != 'TD') {
                resolve(NaN);
            }
            resolve(parseInt(target.innerHTML));
        });
    }

    Calendar.prototype.setActive = function(dayActive) {
        var day = dayActive;
        var td =	document.querySelectorAll('#divCalendarMain'+this.element+' td');
        if(day>td.length) {
            day = 1;
        }
        td.forEach(function(item,i,td) {
            if(item.className === 'activeDay') {
                item.removeAttribute('class');
            }
        });
        td.forEach(function(item,i,td) {
            if(parseInt(item.innerHTML) === day) {
                item.className = 'activeDay';
            }
        });
        return day;	
    }

    Calendar.prototype.calendarScript = function(element,showMonth,allowAdd,allowRemove,yearParam,monthParam,classCalendar) {
        return new Promise(function(resolve) {
            document.querySelector('#textScriptCalendar').innerText = '';
            document.querySelector('#textScriptCalendar').innerText  = "(function() {\
function Calendar() { \n\
this.year =	"+yearParam +"; \n\
this.month = "+monthParam +"; \n\
this.element = "+element+"; \n\
this.showMonth = "+showMonth+ ";\n \
this.allowAdd = "+allowAdd+ "; \n\
this.allowRemove = "+allowRemove+ ";\n \
var self = this; \n\
this.daySelect = 0;\n \
this.clickChangeCalendarBind = this.clickChangeCalendar.bind(this);\n\
this.configureBind = this.configure.bind(this);\n\
this.newTaskBind = this.newTask.bind(this);\n\
this.delInfBind = this.delInf.bind(this);\n\
}\n\
Calendar.prototype.delInf = function(event) {\n\
if(!this.allowRemove) {\n\
return;\n\
}\n\
var where = document.querySelector('.boxSave'+this.element);\n\
var target = event.target;\n\
if(target.tagName != 'BUTTON') {\n\
return;\n\
}\n\
var id = event.target.getAttribute('id');\n\
var nextTrip = confirm('Удалить?');\n\
if(!nextTrip) {\n\
return;\n\
}\n\
var data = this.toArr(id);\n\
var textObj =  this.outputOllStorage(data[0]);\n\
var self = this;\n\
this.removeItemFromStorage(data)\n\
.then(function(){\n\
textObj =  self.outputOllStorage(data[0]);\n\
where.innerHTML = '';\n\
for(var key in textObj) {\n\
self.output(where,textObj[key],data[1],data[0]);\n\
}	\n\
});\n\
}\n\
Calendar.prototype.newTask = function(event) {\n\
if(!this.allowAdd) {\n\
return;\n\
}\n\
var self = this;\n\
var where = document.querySelector('.boxSave'+this.element);\n\
this.getNumDay(event,this.daySelect)\n\
.then(function(day) {\n\
var data = ''+self.element+self.year+self.month+day;\n\
var textObj =  self.outputOllStorage(data);\n\
where.innerHTML = '';\n\
for(var key in textObj) {\n\
self.output(where,textObj[key],key,data);\n\
}\n\
return day;		\n\
}).then(function(day){\n\
if(self.daySelect === day) {\n\
var text = self.getText();\n\
if(text===null) {\n\
return;\n\
}\n\
var data = ''+self.element+self.year+self.month+day;\n\
var objStorage= {}, num =where.childNodes.length ;\n\
self.output(where,text,num,data); \n\
objStorage[num] = text;	\n\
self.saveText(data,objStorage); \n\
self.outputOllStorage(data);\n\
} else {\n\
self.daySelect = day;\n\
self.daySelect = self.setActive(self.daySelect);\n\
}\n\
});\n\
}\n\
Calendar.prototype.configure = function() {\n\
var elementTest = (Math.random()*(1000-1)+1).toFixed(),\n\
showMonthTest = document.querySelector('#changeMonth').checked ? 1 : 0,\n\
allowAddTest = document.querySelector('#addTasks').checked ? 1 : 0,\n\
allowRemoveTest = document.querySelector('#removeTasks').checked ? 1 : 0,\n\
yearParamTest = document.querySelector('#year').value || 2017,\n\
monthParamTest = document.querySelector('#month').value || 12,\n\
classCalendarTest = document.querySelector('#class').value || 'ginkoMix';\n\
this.year =	yearParamTest || now.getYear();\n\
this.month = monthParamTest || now.getMonth();\n\
this.showMonth =  showMonthTest;\n\
this.allowAdd =  allowAddTest;\n\
this.allowRemove =  allowRemoveTest;   \n\this.calendarScript(elementTest,showMonthTest,allowAddTest,allowRemoveTest,yearParamTest,monthParamTest,classCalendarTest);\n\
this.drawCalendar();    \n\
}\n\
Calendar.prototype.clickChangeCalendar = function(event){\n\
if(this.showMonth) {\n\
if(event.target.tagName!='BUTTON') {\n\
return;\n\
}\n\
let classButton = event.target.getAttribute('class');\n\
var where = document.querySelector('.boxSave'+this.element);\n\
if(classButton==='buttonLeft'){\n\
this.changeMonthBack(this);\n\
this.daySelect = this.clearText(where);\n\
this.drawCalendar();\n\
}\n\
if(classButton==='buttonRight'){\n\
this.changeMonthNext(this);\n\
this.daySelect =this.clearText(where);\n\
this.drawCalendar();\n\
}\n\
}\n\
}\n\
Calendar.prototype.clearText = function (where){\n\
where.innerHTML = '';\n\
return 0;\n\
}\n\
Calendar.prototype.toArr = function(num) {\n\
var num = num+'';\n\
num = num.split(',');\n\
for(var i = 0;i<num.length;i++) {\n\
num[i] = parseInt(num[i]);\n\
}\n\
return num;\n\
}\n\
Calendar.prototype.removeItemFromStorage = function(link) {\n\
return new Promise(function(resolve) {\n\
var storageText =JSON.parse(localStorage.getItem(link[0]));\n\
delete storageText[link[1]];\n\
var arr = [],storageObj = {};\n\
for(var i in storageText) {\n\
arr.push(storageText[i]);\n\
}\n\
for(var i= 0;i<arr.length;i++) {\n\
storageObj[i] = arr[i];\n\
}\n\
var sObj = JSON.stringify(storageObj);\n\
localStorage.setItem(link[0],sObj);	\n\
return	resolve();\n\
});\n\
}\n\
Calendar.prototype.changeMonthBack = function(self){\n\
self.month--;\n\
if(self.month===0) {\n\
self.month=12;\n\
self.year--;\n\
}\n\
}\n\
\n\
Calendar.prototype.changeMonthNext = function(self){\n\
self.month++;\n\
if(self.month===13) {\n\
self.month=1;\n\
self.year++;\n\
}\n\
}\n\
Calendar.prototype.output = function(where,text,num,data){\n\
var p = document.createElement('p');\n\
var div = document.createElement('div');\n\
var button = document.createElement('button');\n\
var arrayForDel = [data,num];\n\
div.className = 'infAboutDay';\n\
button.innerHTML = 'Удалить!';\n\
button.className = 'del';\n\
button.id = arrayForDel;\n\
div.appendChild(p);\n\
div.appendChild(button);\n\
where.appendChild(div);\n\
p.innerHTML = text;\n\
}\n\
Calendar.prototype.saveText = function(where,text){\n\
var sObj;\n\
var storageText =JSON.parse(localStorage.getItem(where));\n\
if(!storageText)\n\
{\n\
storageText = text;\n\
}else {\n\
Object.assign(storageText,text);\n\
}\n\
var sObj = JSON.stringify(storageText);\n\
localStorage.setItem(where,sObj);\n\
}\n\
Calendar.prototype.outputOllStorage = function(where) {\n\
return JSON.parse(localStorage.getItem(where));\n\
}\n\
Calendar.prototype.getText = function() {\n\
return prompt('Введите задачу');\n\
}\n\
Calendar.prototype.drawInteractiveCalendar = function() {\n\
var el = document.createElement('div');\n\
el.id = 'interactiveCalendar'+this.element;\n\
el.className = '"+classCalendar+"';\n\
document.querySelector('body').appendChild(el);\n\
var buttonLeft = document.createElement('button');\n\
buttonLeft.innerHTML = '[<]';\n\
buttonLeft.className = 'buttonLeft';\n\
var data = document.createElement('span');\n\
data.className = 'data'+this.element;\n\
var buttonRight = document.createElement('button');\n\
buttonRight.innerHTML = '[>]';\n\
buttonRight.className = 'buttonRight';\n\
var divButton = document.createElement('div');\n\
divButton.className += 'divButton';\n\
divButton.className += ' divButton'+this.element;\n\
var boxSave = document.createElement('div');\n\
boxSave.className = 'boxSave'+this.element;\n\
var divCalendarMain =document.createElement('div');\n\
divCalendarMain.id = 'divCalendarMain'+this.element;\n\
divButton.appendChild(buttonLeft);\n\
divButton.appendChild(data);\n\
divButton.appendChild(buttonRight);\n\
el.appendChild(divButton);\n\
el.appendChild(divCalendarMain);\n\
el.appendChild(boxSave);\n\
data.innerHTML = this.year+' '+this.month;\n\
}\n\
Calendar.prototype.getDayNumber = function(date) {\n \
var number = date.getDay();\n\
if(number === 0) {\n\
return number = 6;\n\
}\n\
else  return number - 1;\n\
}\n\
Calendar.prototype.drawCalendar = function() {\n\
document.querySelector('#divCalendarMain'+this.element).innerHTML ='';\n\
var now = new Date(this.year,this.month-1);\n\
var Calendar ='<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>св</th><tr>';\n\
for(var i=0;i<this.getDayNumber(now);i++) {\n\
Calendar+='<th></th>';\n\
}\n\
while(now.getMonth()===this.month-1) {\n\
Calendar += '<td>' + now.getDate() + '</td>';\n\
if (this.getDayNumber(now) % 6 === 0 && this.getDayNumber(now)!==0) {\n\
Calendar += '</tr><tr>';\n\
}\n\
now.setDate(now.getDate() + 1);\n\
}\n\
Calendar += '</tr></table>';	document.querySelector('#divCalendarMain'+this.element).innerHTML=  Calendar;\n\
document.querySelector('.data'+this.element).innerHTML = this.year+' '+this.month;\n\
this.daySelect = this.setActive(this.daySelect);\n\
}\n\
Calendar.prototype.getNumDay = function(event,day) {\n\
return new Promise(function(resolve) {\n\
var target = event.target;\n\
if(target.tagName != 'TD') {\n\
resolve(NaN);\n\
}\n\
resolve(parseInt(target.innerHTML));\n\
});\n\
}\n\
Calendar.prototype.setActive = function(dayActive) {\n\
var day = dayActive;\n\
var td =	document.querySelectorAll('#divCalendarMain'+this.element+' td');\n\
if(day>td.length) {\n\
day = 1;\n\
}\n\
td.forEach(function(item,i,td) {\n\
if(item.className === 'activeDay') {\n\
item.removeAttribute('class');\n\
}\n\
});\n\
td.forEach(function(item,i,td) {\n\
if(parseInt(item.innerHTML) === day) {\n\
item.className = 'activeDay';\n\
}\n\
});\n\
return day;	\n\
}\n\
let calendar = new Calendar(2017,12);\n\\n\
calendar.drawInteractiveCalendar();\n\
calendar.drawCalendar();\n\
document.querySelector('.divButton'+calendar.element).addEventListener('click',calendar.clickChangeCalendarBind);\n\
document.querySelector('#divCalendarMain'+calendar.element).addEventListener('click',calendar.newTaskBind);\n\
document.querySelector('.boxSave'+calendar.element).addEventListener('click',calendar.delInfBind);\n\
})()";
            return resolve();
        });


    }

    let calendar = new Calendar(2017,12);
    calendar.drawInteractiveCalendar();
    calendar.drawCalendar();
    document.querySelector('.divButton'+calendar.element).addEventListener('click',calendar.clickChangeCalendarBind);
    document.querySelector('#divCalendarMain'+calendar.element).addEventListener('click',calendar.newTaskBind);
    document.querySelector('.boxSave'+calendar.element).addEventListener('click',calendar.delInfBind);

    let calendarTest = new Calendar(2017,12,'#testCalendarBlock',3);
    calendarTest.drawInteractiveCalendar();
    calendarTest.drawCalendar();	document.querySelector('.divButton'+calendarTest.element).addEventListener('click',calendarTest.clickChangeCalendar);	document.querySelector('#divCalendarMain'+calendarTest.element).addEventListener('click',calendarTest.newTaskBind);
    document.querySelector('.boxSave'+calendarTest.element).addEventListener('click',calendarTest.delInfBind);
    var element = document.querySelectorAll('.inputConfigure');
    for(var i = 0;i<element.length;i++) {
        element[i].addEventListener('change',calendarTest.configureBind);
    }
    calendarTest.configureBind();
})()