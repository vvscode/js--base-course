var genders = document.querySelectorAll("input[name='gender']");
var button = document.querySelector("input[type='submit']");
var options = document.querySelectorAll("#city option")
var textarea = document.querySelector("textarea");
var input = document.getElementById("name");
var div = document.querySelector("div");

button.onclick = function (event) {
    event.preventDefault();

    div.innerHTML = "<p>Имя: " + input.value + "</p>" +
        "<p>Город: " + getChecked(options) + "</p>" +
        "<p>Пол: " + getChecked(genders) + "</p>" +
        "<p>Комментарий: " + textarea.value + "</p>";

    document.forms.questionnaire.reset();
}

function getChecked(arg) {
    for (var i = 0; i < arg.length; i++) {
        if (arg[i].checked || arg[i].selected) return arg[i].value
    }
    return "Не выбран"
}

