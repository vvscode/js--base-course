/*обработчик для кнопки поиска*/
var searchClick = document.querySelector('#search_click');
var searchEnter = document.querySelector('#search_enter');

searchClick.addEventListener('click',(e)=>{
    e.preventDefault();
    google(searchEnter.value);
});

/*searchEnter.addEventListener('change',(e)=>{
    e.preventDefault();
    google(searchEnter.value);
});*/
var locationCity;

function google(city) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET','http://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&sensor=false&language=ru',false);

    xhr.send();
    if (xhr.status !== 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    }else{
        console.log(xhr.responseText);
        var city = JSON.parse(xhr.responseText);

        locationCity = city.results[0].geometry.location;
        console.log(locationCity.lat);
        console.log(locationCity.lng);
    }
}



"https://geocode-maps.yandex.ru/1.x/?geocode=Ивановка&ll=37.618920,55.756994&spn=3.552069,2.400552."
