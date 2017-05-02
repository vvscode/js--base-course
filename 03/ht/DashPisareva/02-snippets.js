// Создать массив тремя способами

var someArray = ['item0', 'item1', 'item2'];

var someArray = new Array('item0', 'item1', 'item2');

var someArray = new Array();
someArray[0] = "item0";
someArray[1] = "item1";
someArray[2] = "item2";


// Убрать из массива [1, 2, 3, 4, 9, 8, 7, 1, 2, 2, 3] четные числа (2 способа)

function removeOdds(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      arr.splice(i, 1);
      i = i - 1;
    }
  }
  console.log(arr);
}

// Проверить является ли строка полиндромом (одинаково читается с права на лево и с лева на право) - двумя способами

function checkPalindrome(str) {
  var normalizedStr = str.replace(/[\W_]/g, '').toLowerCase();
  var reverseStr = normalizedStr.split('').reverse().join('');
  return normalizedStr === reverseStr;
}


// Как изменить содержимое абзаца/блока - два способа

document.getElementById("elementId").innerHTML="newContent";

// Найти элемент <div id="someId"></div> на странице - 3 разных способа

document.getElementById("someId");

$("#someId");

this.someId;


// Создать функцию - 3 способа

function funct1() {
  //function's body;
}

var func1 = function(params) {
  //function's body;
}

var func1 = new Function(params, code);


// Вызвать функцию let f = function() { alert(this.name); } в контексте объекта { name: 'Bob' } - 4 способа
// вывести элементы массива [4, 5, 6, 7, 3, 4, 2, 1] по-одному - 3 способа
// Заменить в строке mom clean my home букву m на M - два способа
// Написать код, который в заголовке окна будет показывать текущие координаты курсора мыши на странице



// Добавить на страницу тег <h1>I did it</h1> - 3мя способами
// Написать функцию которая в консоль выводит саму себя ( полностью )
