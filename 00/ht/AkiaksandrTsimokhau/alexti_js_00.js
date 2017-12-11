/*
Создать страницу. При открытии у пользователя сначала нужно спросить его имя,
а потом возраст (можно использовать функцию prompt).
Если пользователь не ввел имя/возраст - запросить данные повторно ( пока данные не будут заполнены ).
После ввода пользователя вывести на странице сообщение.
Если возвраст пользователя меньше 18 - Здарова, {{ИМЯ_ПОЛЬЗОВАТЕЛЯ}}.
 Как твои {{ВОЗРАТ ПОЛЬЗОВАТЕЛЯ}}?.
 Если возраст пользователя больше либо равен 18 - Привествую,
  {{ИМЯ_ПОЛЬЗОВАТЕЛЯ}}. Уж {{ВОЗРАТ ПОЛЬЗОВАТЕЛЯ}} лет прошло
*/
function askingAge() {
  var bool=false;
  do {

    var questionName = prompt("Введите свое имя","");
    if (questionName!="") {
      var bool=true;
    }
    else {
       alert("Пожалуйста, введите имя!");
}
  } while (bool!=true);

   //var questionName = prompt("Введите свое имя","");
   var bool1=false;
   do {
     var questionAge = prompt("Введите свой возраст","");
     if (questionAge!="") {
       var bool1=true;
   }
   else {
     alert("Пожалуйста, введите возраст!")
   }
 }while (bool1!=true);



       if(parseInt(questionAge)<18){
         alert("Здарова," + questionName + "!"+ " Как твои " + questionAge +" ?");
       }
      else {
        if (questionAge%10===0||questionAge%10===5) {
          alert("Привествую, " + questionName + "!" + " Уж " + questionAge +" лет прошло!");
        }
        else {
          alert("Привествую, " + questionName + "!" + " Уж " + questionAge +" год(а) прошло!");
        }

      }

}
askingAge();
