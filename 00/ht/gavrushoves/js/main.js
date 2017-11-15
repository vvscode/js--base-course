var positiveButton = document.querySelector('button');
var negativeButton = document.querySelector('.closewin');

positiveButton.onclick = function question() {
    var NameUser = prompt('Как вас зовут?');
    var AgeUser = prompt('Сколько вам лет?');

    if(AgeUser === '' || isNaN(AgeUser) === true || NameUser === '' || AgeUser === null || NameUser === null){
        question();
    }
    else if(AgeUser < 18){
        alert('Здарова, ' + NameUser + '. Как твои ' + AgeUser + '?');
    }
    else {
        alert('Привествую, ' + NameUser + '. Уж ' + AgeUser + ' лет прошло.');
    }
}
negativeButton.onclick = function closeOpenedWindow() {
    var exitWindow = window.open("../index.html",'_self');
    exitWindow.close();
}