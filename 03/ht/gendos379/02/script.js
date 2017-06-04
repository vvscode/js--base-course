// 1. Создать массив тремя способами
var arr1 = [];
var arr2 = new Array();
var arr3 = ''.split().splice(0, arr3.length);

// 2. Убрать из массива `[1, 2, 3, 4, 9, 8, 7, 1, 2, 2, 3]` четные числа (2 способа)
function removeEven(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            arr.splice(i, 1);
            i--;
        }
    }
}
removeEven(arr);

arr = arr.filter(function(num) { if (num % 2) return num; });

// 3. Проверить является ли строка полиндромом (*одинаково читается с права на лево и с лева на право*) - двумя способами
function isPalindrome1(str) {
    var re = /[\W]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join(''); 
    return reverseStr === lowRegStr;
}

function isPalindrome2(str) {
    var re = /[\W]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    for (var i = 0; i < lowRegStr.length/2; i++) {
        if (lowRegStr[i] !== lowRegStr[lowRegStr.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

// 4. Как изменить содержимое абзаца/блока - два способа
document.getElementById('someDiv').innerHTML = "some text";

var newText = document.createTextNode("some text");
document.getElementById('someDiv').appendChild(newText);

// 5. Найти элемент `<div id="someId"></div>` на странице - 3 разных способа
document.getElementById('someId');
document.getElementsByTagName("div");
document.querySelector("div");


// 6. Создать функцию - 3 способа
// 7. Вызвать функцию `let f = function() { alert(this.name); }` в контексте объекта `{ name: 'Bob' }` - 4 способа
// 8. вывести элементы массива `[4, 5, ,6 7, 3, 4, 2, 1]`  по-одному - 3 способа
// 9. Заменить в строке `mom clean my home`  букву `m` на `M` - два способа
// 10. Написать код, который в заголовке окна будет показывать текущие координаты курсора мыши на странице
// 11. Добавить на страницу тег `<h1>I did it</h1>` - 3мя способами
// 12. Написать функцию которая в консоль выводит саму себя ( полностью )
