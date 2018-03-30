var UserData = document.querySelector('h1');

do {
  var myName = prompt('Введи имя.', "");
} while (!myName );

do {
  var myBirth = prompt('Сколько вам лет?', "");
} while (!myBirth);

(myBirth < 18) ? UserData.innerHTML  = "Здарова, " + myName + ". Как твои " + myBirth + " ?" :
  UserData.innerHTML  = "Приветствую, " + myName + ". Уж " + myBirth + " лет (года) прошло!";
