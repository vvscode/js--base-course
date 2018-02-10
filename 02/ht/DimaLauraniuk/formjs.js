var btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('click', readUserInfoAndReset);

function readUserInfoAndReset() {
    var userName = document.getElementById('name').value;
    var city = document.getElementById('city').value;
    var comment = document.getElementById('comment').value;
    var sex;
    if(document.getElementById('male').checked){
        sex = 'Мужской';
    }
    else if(document.getElementById('female').checked){
        sex = 'Женский';
    }
    else{
        sex = 'не выбран';
    }
    document.getElementById('outputInfo').innerHTML =`Имя: ${userName} <br> Пол: ${sex} <br> Родной город: ${city} <br> Комментарии: ${comment}`;
    document.getElementById('userInfo').reset();
};