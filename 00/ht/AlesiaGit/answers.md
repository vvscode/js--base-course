
# Что такое переменная? Как создать переменную? 
 > Переменная (variable) - именованая ячейка памяти, содержащая определенное значение.
```sh
var name; //переменная создана
name = "Alesia"; //в переменную добавлено значение				
 
var name = "Alesia"; //переменная создана и в нее сразу добавлено значение	
```
Как вывести строку на экран:
```sh
document.getElementById("Id").innerHTML = "text";
document.write(); //depreciated
alert();
confirm();
```

# Виды циклов? Примеры использования
> While;
> For;
> Do while; 
```sh
//Тип цикла "while".
document.getElementById("alerts-number").onclick = function() {
	var i = (+prompt("Введите целое положительное число"));
	var m = i;
	while (i > 0) {
		alert("Alert: " + i);
		i--; 
	}
	document.getElementById("alerts-number-result").innerHTML = "Было показано " + m + " alert сообщений";
};				
```
```sh
//Тип цикла "for". 
document.getElementById("odd-numbers").onclick = function() {
	var x = (+prompt("Введите целое положительное число"));
	document.getElementById("ttt").style.display = "block";
	document.getElementById("count-odd-numbers").innerHTML = x;
	for (var i = 1; i <= x; i++) {
		if (i == 2) {
			document.getElementById("odd-numbers-result").innerHTML += i;
		} else if (i%2 == 0 && i !== 2) {
			document.getElementById("odd-numbers-result").innerHTML += "; " + i;
		} 
	}
};
```
```sh
//Тип цикла "do while".
document.getElementById("all-numbers").onclick = function() {
	var x = (+prompt("Введите целое положительное число"));
	document.getElementById("all-numbers-text").style.display = "block";
	document.getElementById("count-all-numbers").innerHTML = x;
	var i = 0;
	do {
		var text = i; 
		if (i < x) {
			document.getElementById("all-numbers-result").innerHTML += text + " -> ";
		} else {
			document.getElementById("all-numbers-result").innerHTML += text;
		}
		i++;
	} while (i <= x);
};			
```
# Сколько и какие типы данных в javascript? 
```sh
//Примитивные (5 штук):
var name = "Alesia"; //string
var year = 2017; //number
var spring = true; //boolean
var null = null; //null = value unknown
var special = undefined; //undefined = value undefined

//Объекты:
var student = {name: "Alesia"}; //object
```
```sh
//Как узнать тип переменной
alert(typeof "Alesia"); //string
alert(typeof 17); //number
```

# Oбласть видимости
Переменные в JS бывают глобальные (доступные везде) и локальные (доступные в текущей области видимости).
```sh
//Global scope. 
var myScope = 5;
document.getElementById("global-scope").onclick = function() { 
	document.getElementById("global-scope-text").style.display = "block";
	alert("myScope variable is equal to " + myScope); 
}
```
```sh
//Local scope.
function Temp() {
	var localScope = 5;
}
 
document.getElementById("local-scope").onclick = function() {
	if (typeof localScope === 'undefined') {
		alert("undefined");
	} else {
		alert("myScope variable is equal to " + myScope);
	}
}
```
# Условное выполнение кода
> Условное выполнение кода можно выполнить, используя условные операторы (if, if else, if else if else) или через логическое значение (boolean)
```sh
//Как с помощью оператора 'if' сосчитать числа от 0 до заданного? 
function SumUp(n) {
	if (n!=1) {
		return n + SumUp(n-1);
	} else {
		return 1;
	}
}
document.getElementById("logic-run").onclick = function () {
	var x = +prompt("Сейчас мы сумируем все числа от одного до того, которое вы введете:");
	document.getElementById("logic-result").innerHTML = "Cумма всех чисел от 0 до " + x + " равна " + SumUp(x);
	document.getElementById("sumup-hidden").style.display = "table";
}
```

> Тернарный оператор = "если то иначе все в одну строчку" - условие ? значение1 : значение2.
```sh
//пример использования тернарного оператора
function Compare(x, y) {
		return (x > y) ? (x - y) : "получится отрицательное число";
	}
	alert(Compare(4,3));
```

> Конструкция switch = условное выполнение кода без использования условных операторов
```sh
//пример использования конструкции switch
x = prompt("who are you?");
	switch (x) {
		case "man": alert("go to work");
			break;
		case "woman": alert("go to vacation");
			break;
		case "cat": alert("go to eat");
			break;
		default: alert("alians invasion!!!");
	}
```

# Функции. Способы создания
```sh
//Function declaration - объявление функции в основном потоке кода.
//function Name(params) {...}
function Count(a, b) {return a + b}
	
//Function expression - объявление функции в контексте какого-то выражения, например, присваивания:
//var x = function(params) {...}
var xx = function(a, b) {return a + b;};
	
//Объявление через New Function
//var x = new Function(params, code)
var mm = new Function('a, b', 'return a + b;')
var result = x(a, b);
```
```sh
document.getElementById("function-run").onclick = function() {
	var a = +prompt("Введите первое значение - a:");
	var b = +prompt("Введите второе значение - b:");
	var result = a + b;
	document.getElementById("function-result").innerHTML = "Сумма двух чисел составляет: " + a + " + " + b + " = " + result;
}
```

# Объект. Как создать объект
```sh
document.getElementById("object-run").onclick = function() {
 
	var myObject = {};
	myObject.width = 40;
	myObject.id = "blue";
 
	var anotherObject = {
		width: 60,
		id: "red"
	}
	alert("myObject id value is " + myObject["id"]); //Первый способ обращения к свойству объекта
	alert("anotherObject id value is " + anotherObject.id); //Второй способ обращения к свойству объекта
}
```
# Массив
> Массив - упорядоченная коллекция данных (набор элементов), к которым можно обратиться по индексу (массив с числовыми индексами []) и по ключу (ассоциативный массив {} - см объекты).
```sh
var Array = [Apple, Banana, Kiwi];

var Array = [];
var Array[0] = Apple;
var Array[1] = Banana;
var Array[2] = Kiwi;

var Array = new Array(3); //создан массив заданной длины, в котором значения undefined
```

# Как запросить данные у пользователя
```sh
//all types included
function Question() {
	var a = +prompt("how old are you?");
		if (a >= 18) {
			var x = confirm("can you prove with id?");
			if (x == true) {
				alert("welcome to club!");
			} else {
				alert("sorry, go to school :(");
			}
		} else {
			alert("sorry, go to school :(");
		}
	}
	Question();
```

# Передача по ссылке vs передача по значению
> По ссылке в JS передаются объекты, по значению - примитивы. Ссылка означает доступаться к одному и тому же объекту под разными именами. Если мы через одно из имен (=переменных) изменим объект, то эти изменения будут видны во всех переменных, которые ссылаются на этот объект. В примитивах переменные независимы, потому что заниают разные ячейки памяти.

# Минификация
Минификаторы сжимают, оптимизируют, пр. Цель - ускорить и облегчить загрузку и обработку.

# Как добавить JS код на страницу
```sh
<head>
    <!-- в head страницы -->
    <script type="text/javascript">
        function Panic() {alert("Паника!");}
    </script>
<head>

<body>
    <h1>Сейчас будет паника</h1>
    <button type="button" onclick="Panic()">Click me</button>
   
    <div>
        <div></div>
         <!-- непосредственно в месте исполнения -->
         <script type="text/javascript"> 
            alert("Все норм!");
         </script>
    </div>
</body>
