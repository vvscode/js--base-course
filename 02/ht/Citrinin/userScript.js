var btn = document.querySelector("button");
btn.onclick = function(event) {
    var strContent;
    strContent = ["Имя: " + document.querySelector("[name='userName']").value,
        "Город: " + document.querySelector("[name='userCity']").value,
        "Комментарий: " + document.querySelector("[name='userComment']").value,
        "Пол: " + document.querySelector("[name='sex']:checked").value
    ].join("<br>");
    document.querySelector("[name='content']").innerHTML = strContent;
    document.getElementById('userForm').reset();
    return false;
}