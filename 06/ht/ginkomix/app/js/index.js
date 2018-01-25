import {eb} from "./eventBus";
import {Router} from "./router";
import Map from "./map";



var router = new Router({
    routes: [{
        name: 'about',
        match: '',
        onBeforeEnter: function(){

        },
        onEnter: function() {
            document.querySelector('#about').style.display = 'flex'; 
        },
        onLeave: function() {
            document.querySelector('#about').style.display = 'none';
        }
    }, {
        name: 'Main',
        match: /main=(.+)/,
        onBeforeEnter:  function(cord) {
            
            if(!map.createMapFlag){
            var cord = map.sliceCord(cord);
            map.createMap(cord);
        } 
        },
        onEnter: function(cord) {
            document.querySelector('#main').style.display = 'block'; 
        },
        onLeave: function(cord) {
            document.querySelector('#main').style.display = 'none'; 
        }
    }, {
        name: 'Author',
        match: (text) => text === 'author',
        onBeforeEnter: function(){

        },
        onEnter: function() {
            document.querySelector('#author').style.display = 'flex'; 
        },
        onLeave: function() {
            document.querySelector('#author').style.display = 'none'; 
        }
    }]
});


function radioChecked() {
    var radio = document.querySelectorAll('.inputConfigure');
    for(var i = 0;i < radio.length;i ++) {
        if(radio[i].checked) {
            if(radio[i].id === 'xhr') {
                eb.on('cordChange',map.XHRsetWeather);
                eb.off('cordChange',map.fetchSetWeather);
                eb.on('changeHash',map.XHRsetWeather);
                eb.off('changeHash',map.fetchSetWeather);
                eb.on('moveCity',map.XHRsetWeather);
                eb.off('moveCity',map.fetchSetWeather);
            }
            if(radio[i].id === 'fetch') {
                eb.off('cordChange',map.XHRsetWeather);
                eb.on('cordChange',map.fetchSetWeather);
                eb.off('changeHash',map.XHRsetWeather);
                eb.on('changeHash',map.fetchSetWeather);
                eb.off('moveCity',map.XHRsetWeather);
                eb.on('moveCity',map.fetchSetWeather);	
            }
        }
    }
}

export var map = new Map('41b2362125a88e95e5d8522aa7a1a7d1');
eb.on('cordChange',map.changeButtonHref);
eb.on('cordChange',map.changeHash);

eb.on('changeHash',map.moveCity);
eb.on('changeHash',map.changeButtonHref);

eb.on('moveCity',map.changeButtonHref);
eb.on('moveCity',map.changeHash);
eb.on('moveCity',map.moveCity);
eb.on('moveCity',map.history);
radioChecked();
document.querySelector('#findButton').addEventListener('click',map.findCity);
document.querySelector('.favorite-chande-block').addEventListener('click',map.moveCord);
document.querySelector('.favorite').addEventListener('click',map.favorite);
document.querySelector('.favorite-chande-block').addEventListener('click',map.delItem);
var radio = document.querySelectorAll('.inputConfigure');
for(var i = 0;i<radio.length;i++) {
    radio[i].addEventListener('click',radioChecked);
}