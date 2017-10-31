/**
 * Created by sherstyuk on 31.10.2017.
 */
var nameInput = document.getElementById('name__input');
var buttonSend = document.getElementById('button__send');
var comments = document.getElementById('comments');





nameInput.addEventListener('blur', saveName);
comments.addEventListener('blur', saveComment);
/*var cityInput = document.getElementById('city__input');





var buttonReset = document.getElementById('button__reset');


buttonReset.addEventListener('click', );*/
function saveName() {
    alert( 'сохраняем имя' );
    var name = nameInput.value;
    alert(name);
    return name;
}

function saveComment() {
    alert( 'сохраняем коментарии' );
    var comment = comments.value;
    alert(comment);
    return comment;
}

var select = document.querySelector("select");

select.addEventListener('change', saveCity );

function saveCity() {
    alert('Сохраняем город')
}






var sex = document.getElementsByName('sex');

for (var i=0; i < sex.length; i++){
    sex[i].addEventListener('change',saveSex )
}

function saveSex () {
    alert('Сохраняем пол')
}