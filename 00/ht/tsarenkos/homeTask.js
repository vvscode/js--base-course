function setUserGreeting(){
    do{
        var userName = prompt('Please enter your name!',"");
    } while (userName===""||userName===null);
    do{
        var userAge = prompt('Please enter your age!',"");
    } while (userAge===""||userAge===null);

    var userHeading = document.querySelector('h1');

    if(userAge<18){
        userHeading.innerHTML='Здарова, '+userName+'. Как твои '+userAge+'?';
    }
    else{
        userHeading.innerHTML='Приветствую, '+userName+'. Уж '+userAge+' лет прошло';
    }    
}
setUserGreeting();
