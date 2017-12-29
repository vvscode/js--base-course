/*обработчик для кнопки поиска*/
let searchClick = document.querySelector('#search_click');
let searchEnter = document.querySelector('#search_enter');

searchClick.addEventListener('click',(e)=>{
    e.preventDefault();
    google(searchEnter.value)
});

function google(city) {

  let xhr = new XMLHttpRequest();
  xhr.open('GET','http://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&sensor=false&language=ru',true);
  xhr.send();

  xhr.onreadystatechange = function () {

    if (xhr.readyState !== 4) return;

    if (xhr.status !== 200) {
      alert( xhr.status + ': ' + xhr.statusText );
    }else{
      let city = JSON.parse(xhr.responseText);
      let locationCity = city.results[0].geometry.location
      setCenter(locationCity.lat, locationCity.lng);
    }
  }


}


