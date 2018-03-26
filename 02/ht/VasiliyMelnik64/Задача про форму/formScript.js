var button = document.getElementById('button');
var radios = document.querySelectorAll('input[type="radio"]');
var inputs = document.getElementsByTagName('input');

var user = {
    "Имя": inputs[0],
    "Возраст": document.getElementsByTagName('select')[0],
    "Пол": {
        male: inputs[1],
        female: inputs[2],
        toString: function () {
            return this.male.checked ? 'Мужской' : 'Женский';
        }
    },
    "Водительское удостоверение": inputs[3], 
    "О себе": inputs[4]
};

button.addEventListener('click', showData, false);
Array.prototype.forEach.call(radios, function (elem) { 
    elem.addEventListener('focus', clearRadios, false);
});

function clearRadios(e) { 
    e = e || true;
    Array.prototype.forEach.call(radios, function (elem) { 
        elem.checked = false;
    });
    e.target = true;
}

function showData(e) { 
    e.preventDefault();
    createUserDescription(user);
    clearForm(user);
}
function clearForm(user) { 
    for (var prop in user) { 
        user[prop].value = '';
        user[prop].checked = false;
    }
    clearRadios();
}
function createUserDescription(user) { 
    var userBlock = document.getElementById('userBlock');
    var block = '<div class="userBlock">';
    for (var prop in user) { 
        if (prop === 'Пол') {
            block += '<p><div class="div">' + prop + '</div> : ' + user[prop] + '</p>';
        }
        else if (prop === 'Водительское удостоверение') {
            block += '<p><div class="div">' + prop + '</div> : ' + (user[prop].checked ? 'Имеется' : 'Не имеется') + '</p>';
        }
        else {
            if (user[prop].value == '') { 
                block += '<p><div class="div">' + prop + '</div> : [значение не введено] </p>';
            }
            else {
                block += '<p><div class="div">' + prop + '</div> : ' + user[prop].value + '</p>';
            }
        }
    }
    block += '</div>';
    userBlock.innerHTML = block;
}