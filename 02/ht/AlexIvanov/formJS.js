var userForm = document.getElementById('my__form');

/* кнопка собрать данные */
var buttonSend = document.getElementById('button__send');
buttonSend.addEventListener('click', addForm);

/* кнопка очистить */
var buttonReset = document.getElementById('button__reset');
buttonReset.addEventListener('click', delForm, false);

/*Собираем данные с анкетной формы*/

var nameInput = document.getElementById('form__name');
nameInput.addEventListener('blur', returnValueForm(nameInput));

var city = document.getElementById('form__city');
city.addEventListener('change', returnValueForm(city) );


var sex = document.getElementsByName('sex');
for (var i=0; i < sex.length; i++){
    sex[i].addEventListener('change',saveSex )
}
function saveSex() {
    for (var i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            return sex[i].value;
        }
    }
    return 'не выбрано ничего';
}

var comments = document.getElementById('comments');
comments.addEventListener('blur', returnValueForm(comments));

function returnValueForm(form) {
    return form.value
}

/* добавляем данные на страницу*/

/*var anket = {
    userName: 'Ваше имя: ' + 'eturnValueForm(nameInput)',
    userCity: 'Ваш родной город: ' + returnValueForm(city),
    userSex: 'Ваш пол: ' + saveSex (i),
    userComments: 'Ваши коментарии: ' + returnValueForm(comments)
};

var newFormDiv = document.createElement('div');
newFormDiv.className = 'first__div';
newFormDiv.id = 'firstDiv';

d('Ваше имя: ', eturnValueForm(nameInput))
function d(a,b){
    return a + b
}


function addForm() {
    userForm.appendChild(newFormDiv);
    for(key in anket ){
        var newFormDiv2 = document.createElement('div');
        newFormDiv2.innerHTML = anket[key];
        newFormDiv.appendChild(newFormDiv2);
    }
}

function delForm() {
    userForm.removeChild(document.getElementById('firstDiv'));
}*/

 var newForm1 = document.createElement('div');
 var nameInput1 = document.createElement('div');
 var city1 = document.createElement('div');
 var sex1 = document.createElement('div');
 var comments1 = document.createElement('div');

 function addForm() {
 newForm1.className = 'first__div' ;
 nameInput1.innerHTML = 'Ваше имя: ' + returnValueForm(nameInput);
 city1.innerHTML = 'Ваш родной город: ' + returnValueForm(city);
 sex1.innerHTML = 'Ваш пол: ' + saveSex (i);
 comments1.innerHTML = 'Ваши коментарии: ' + returnValueForm(comments);

 userForm.appendChild(newForm1);
 newForm1.appendChild(nameInput1);
 newForm1.appendChild(city1);
 newForm1.appendChild(sex1);
 newForm1.appendChild(comments1);
 }

 function delForm() {
     userForm.reset();
     userForm.removeChild(newForm1);
 }
