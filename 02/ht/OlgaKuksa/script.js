/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA 
 * @param {*} objB 
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {

//typeof(null) - object, checking nulls
    if (objA == null && objB == null) return true;
    //NaN checking; object is not equal to itself
    if(objA!=objA&&objB!=objB) return true;
    //2 primitives; primitive+object
    if (typeof objA != "object" || typeof objB != "object") {
        return (objA===objB);
    }

    //two objects
    if (typeof objA == "object" && typeof objB == "object") {

        var objAKeys = Object.keys(objA);
        var objBKeys = Object.keys(objB);

        if (objAKeys.length != objBKeys.length) return false;

        return objAKeys.every(function (key) {
            if (!objBKeys.includes(key)) return false;
            //string object comparison for recursive objects
            if (""+objA[key]==""+objA||""+objB[key]==""+objB) return (""+objA==""+objB);
            return (isDeepEqual(objA[key], objB[key]));
        })
    }
}


/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
   return function()
  {
    func.apply(context,arguments);
  }
 }

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind=function(context)
{
  return bind(this,context);
}

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
var magValue;
var o= {
    set magicProperty(value) {
        console.log(value + " - " + new Date().toLocaleString());
        magValue=value;
    },
    get magicProperty() {
        return magValue;
    }
}

//o.magicProperty=30;


/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/

function u(){
  this.askName=function(){
      this.name=prompt("Как вас зовут?");
      return this};
  this.askAge=function(){
      this.age=prompt("Сколько вам лет?");
      return this};
  this.showAgeInConsole=function(){
      console.log("Вам "+this.age+" лет");
      return this;}
  this.showNameInConsole=function(){
      console.log("Ваше имя "+this.name);
      return this;}

};

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate() {
    var args=[].slice.call(arguments);
    return function(opnd1)
    {
      var a=opnd1;
      return function (b)
        {
          switch(args[0])
        {case '+': return a+b;
        case '-':return a-b;
              case '*': return a*b;
              case '/': return a/b;
              default: alert ("Incorrect operator");
          };
          //return eval(a+args[0]+b);
        }
    }

}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
    var sIntance=Singleton.instance;
 if (!sIntance)
 {
   Singleton.instance=this;
 }
  return sIntance;
}

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
  //checking if this was created with ForceConstructor constructor
 if (this instanceof ForceContructor){
  this.a=a;
  this.b=b;
  this.c=c;
  return this;}
  return new ForceContructor(a,b,c);
}

/**
 * Написать фукнцию сумматор, которая будет работать 
 * var s = sum();
 * log(s); // 0
 * log(s(1)); // 1
 * log(s(1)(2)); //3
 * log(s(3)(4)(5)); // 12
 * Число вызовов может быть неограниченым
 */

function sum() {

    var result = arguments[0] || 0;

    function addArg(a) {
        return sum(result + (a || 0));
    }

    addArg.toString = function () {
        return result;
    };

    return addArg;
}


function log(x) {
  console.log(+x);
}

/**
 * Написать каррирующую функцию и покрыть ее тестами
 * Функция должна поддерживать каррирование функций с 2,3,4,5 параметрами
 * пример работы  функции
 * 
 * function target1(a,b,c,d) { return a + b + c + d }
 * function target2(a,b) { return a + b }
 * curry(target1)(1)(2)(3)(4) // 10
 * curry(target2)(5)(8) // 13
 * 
 * Примеры тестов смотреть в файле тестов
 * 
 * Читать
 * http://prgssr.ru/development/vvedenie-v-karrirovanie-v-javascript.html
 * @param {*} func 
 */

function curry(func)
{
   var fLen=func.length;
   if (fLen) return function(a) {return curry(func.bind(null,a))};
   return func();
}


/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
function PreUser() {};

function User() {};

PreUser.prototype=[];
User.prototype=new PreUser();


// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true

/*
Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле),
пол (radiobutton).
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/


function debounce (func, delay)
{ var shouldExecute=0;
    return function () {
        if (shouldExecute) return;
        func.apply(this, arguments);
        shouldExecute = 1;
        setTimeout(function () {
            shouldExecute = 0
        }, delay);
    }
}



function throttle(func, delay)
{
    var isThrottled=false;
    var savedArgs;
    var savedThis;
    return wrapper;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);
        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedThis = savedArgs = null;
            }
        }, delay);
    }

}



/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/


function drawInteractiveCalendar(el) {
  var date=new Date();
  var monthSelected=date.getMonth();
  var yearSelected=date.getFullYear();
  var elem=el;
  drawCalendar(yearSelected,monthSelected,elem);
  var printedDates=localStorage.getItem("printedDates");
  if (printedDates!=null) {
      var arrDates=printedDates.split("&");
      arrDates.forEach(function(element){printDate(document.createTextNode(element),elem)});
  }
el.addEventListener("click", function buttons (event)
    {
      if (event.target.className=="prevMonth")
      {if (monthSelected==0)
      { monthSelected=11; yearSelected-=1;}
        else monthSelected-=1;
      }
      if (event.target.className=="nextMonth")
      {
        if (monthSelected==11) {monthSelected=0;yearSelected+=1;}
        else monthSelected+=1;
      }
      drawCalendar(yearSelected,monthSelected,elem);
    });
    el.addEventListener("click",function dates(event)
    {
        var target=event.target;
        if (target.tagName=='TD'&&target.innerHTML.length>0&&!isNaN(parseInt(target.innerHTML)))
        {
            var date=new Date(yearSelected,monthSelected,target.innerHTML);
            var textToAdd=document.createTextNode(date.toLocaleDateString())
            printDate(textToAdd,elem);
            if (printedDates==null) printedDates=date.toLocaleDateString();
            else printedDates+="&"+date.toLocaleDateString();
            localStorage.setItem("printedDates",printedDates);
        }
    });
}

function printDate(dateToAdd,el)
{
    var elemToAdd = document.createElement("div");
    elemToAdd.setAttribute("align", "center");
    elemToAdd.appendChild(dateToAdd);
    document.body.insertBefore(elemToAdd, el.nextSibling);
}

function drawCalendar(year, month, htmlEl) {
    var numberOfDays=([3,5,8,10].includes(month))?30:31;
    if (month==1) numberOfDays=(year%4==0&&year%100!=0)?29:28;
    var date=new Date(year, month,1);
    var dayOfWeek1=date.getDay();

    var calendarTable="<table><tr align='center'><button class='prevMonth'><</button>"+(month+1)+"/"+year+"<button class='nextMonth'>></button></tr>";
    //caption
    calendarTable+="<tr bgcolor='#e6e6fa'><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td><td>Su</td></tr><tr>";
    //sunday =7
    if (dayOfWeek1==0) dayOfWeek1=7;
    //filling prev month with empty spaces
    for (var i=1;i<dayOfWeek1;i++)
        calendarTable+="<td></td>";

    for (var i=1;i<=numberOfDays;i++) {
        calendarTable +="<td>"+i+"</td>";
        //going to next line
        if ((dayOfWeek1+i-1) % 7 == 0&&i!=numberOfDays) calendarTable += "</tr><tr>"
    }
    calendarTable+="</tr></table>";
    htmlEl.innerHTML=calendarTable;
}

console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
sleep(4);
console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)

function sleep (n)
{
    var date1=new Date();
    var date2=new Date(date1.getTime() + n*1000);
   while (date1<date2)
   {date1=new Date();
       continue;
   }
}


