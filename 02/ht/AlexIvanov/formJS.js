/**
 * Created by sherstyuk on 31.10.2017.
 */
var a = document.querySelector('.questionary');

var buttonSend = document.getElementById('button__send');
buttonSend.addEventListener('click', addForm, false);

var buttonReset = document.getElementById('button__reset');
buttonReset.addEventListener('click', delForm, false);

var nameInput = document.getElementById('name__input');
nameInput.addEventListener('blur', saveName);
function saveName() {
    return nameInput.value;
}

var city = document.getElementById('city__input');
city.addEventListener('change', saveCity );
function saveCity() {
    return city.value;
}

var sex = document.getElementsByName('sex');
for (var i=0; i < sex.length; i++){
    sex[i].addEventListener('change',saveSex )
}

function saveSex () {
    if(sex[1] === true) {
        return 'Мужской';
    }
    return 'Женский';
}

var comments = document.getElementById('comments');
comments.addEventListener('blur', saveComment);


function saveComment() {
    return comments.value;
}

/* добавляем данные на страницу*/
var newForm1 = document.createElement('div');
var nameInput1 = document.createElement('div');
var city1 = document.createElement('div');
var sex1 = document.createElement('div');
var comments1 = document.createElement('div');

function addForm() {
    newForm1.className = 'first__div' ;
    nameInput1.innerHTML = 'Ваше имя: ' + saveName();
    city1.innerHTML = 'Ваш родной город: ' + saveCity();
    sex1.innerHTML = 'Ваш пол: ' + saveSex();
    comments1.innerHTML = 'Ваши коментарии: ' + saveComment();

    a.appendChild(newForm1);
    newForm1.appendChild(nameInput1);
    newForm1.appendChild(city1);
    newForm1.appendChild(sex1);
    newForm1.appendChild(comments1);
}

function delForm() {
    newForm1.removeChild(nameInput1);
    newForm1.removeChild(city1);
    newForm1.removeChild(sex1);
    newForm1.removeChild(comments1);
    a.removeChild(newForm1)
}