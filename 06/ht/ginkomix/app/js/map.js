import {Memory} from "./memory";
import Queries from "./queries";
import {eb} from "./eventBus";

export default class Map extends Memory(Queries)  {
    constructor(key) {
        super();

        this.yaMap;
        this.createMapFlag = false;
        var self = this;
        this.key = key;
        this.enterPress();

        this.outputSave('history','history-chande-block');
        this.outputSave('favorite','favorite-chande-block');

        this.createMap = this.createMap.bind(this);
        this.showCenter = this.showCenter.bind(this);
        this.findCity = this.findCity.bind(this);
        this.moveCity = this.moveCity.bind(this);
        this.history = this.history.bind(this);
        this.favorite = this.favorite.bind(this);
        this.delItem = this.delItem.bind(this);
        this.XHRsetWeather = this.XHRsetWeather.bind(this);
        this.fetchSetWeather = this.fetchSetWeather.bind(this);
    }

    createMap(cord) {
        var self = this;
        ymaps.ready(init);
        function init () {
            self.createMapFlag = true;
            self.yaMap = new ymaps.Map('map', {
                center: [cord[0],cord[1]],
                zoom: 13,
                controls: ['zoomControl', 'typeSelector']
            });
            self.yaMap.events.add('actionend', self.showCenter);
            self.showCenter();
        } 
    }

    favorite() {
        var self = this;
        Promise.resolve()
            .then(function() {
            return self.yaMap.getCenter();
        })
            .then(function(text) {
            var num = text;
            num[0] = num[0].toFixed(7);
            num[1] = num[1].toFixed(7);
            var objectSave = {
                '0':num                
            }; 
            self.save('favorite', objectSave,0);
        })
            .then(function() {
            self.outputSave('favorite','favorite-chande-block');
        });

    }

    enterPress() {
        var self =this;
        document.onkeyup = function (e) {
            e = e || window.event;
            if (e.keyCode === 13) {
                self.findCity();
            }
            return false;
        }
    }

    delItem(event) {
        var target = event.target,
            self = this;
        if(target.tagName!='BUTTON') {
            return;
        }
        Promise.resolve()
            .then(function() {
            self.removeItemFromStorage('favorite',target.className);
        })
            .then(function() {
            self.outputSave('favorite','favorite-chande-block');
        });
    }

    history() {
        var self = this;
        Promise.resolve()
            .then(function() {
            return document.querySelector('#findeInput').value;
        })
            .then(function(text) {
            self.addHistoryHtml(text);
            var objectSave = {
                '0':text                
            };
            self.save('history',objectSave,5);
        });
    }

    XHRsetWeather(cord) {
        var self = this;
        super.XHR.call(this,cord)
            .then(function(type) {
            self.setWearher(type[0],type[1],type[2]);
        });
    }

    fetchSetWeather(cord) {
        var self = this;
        super.fetch.call(this,cord)
            .then(function(type) {
            self.setWearher(type[0],type[1],type[2]);
        });
    }

    findCity() {
        Promise.resolve()
            .then(function() {
            var text = document.querySelector('#findeInput').value;
            return  text;
        })
            .then(function(text){
            var myGeocoder = ymaps.geocode(text);
            myGeocoder.then(
                function (res) {
                    eb.trigger('moveCity',res.geoObjects.get(0).geometry.getCoordinates());
                });
        });
    }

    showCenter() {
        eb.trigger('cordChange',this.yaMap.getCenter());
    }

    setWearher(type, temperature,speed) {
        document.querySelector('.precipType').innerHTML = type;
        document.querySelector('.temperature').innerHTML = temperature;
        document.querySelector('.windSpeed').innerHTML = speed;
    }

    sliceCord(str) {
        var arr = str.split(',');
        return arr;
    }

    outputSave(where,block) {
        var text = JSON.parse(localStorage.getItem(where));
        var blockOut = document.querySelector('.'+block);
        blockOut.innerHTML = '';
        for(var key in text) {
            if(where === 'favorite') {
                var p = document.createElement('p'),
                    a = document.createElement('a'),
                    button = document.createElement('button');
                button.innerHTML = 'del';
                button.className = key;
                a.innerHTML = text[key];
                a.setAttribute('href','#main='+text[key][0]+','+text[key][1]);
                p.appendChild(a);
                p.appendChild(button);
                blockOut.appendChild(p);
            }
            if(where === 'history')  {
                var p = document.createElement('p');
                p.innerHTML = text[key];
                blockOut.appendChild(p);
            }
        }
    }

    addHistoryHtml(text) {
        var historyP = document.querySelectorAll('.history-chande-block p');
        var block = document.querySelector('.history-chande-block');
        if(historyP.length>4) {
            historyP[4].remove();
        }
        var p = document.createElement('p');
        p.innerHTML = text;
        var first = block.firstChild;
        block.insertBefore(p,first);
    }

    changeHash(cord) {
        window.location.hash = 'main='+cord[0]+','+cord[1];  
    }

    changeButtonHref(cord) {
        document.querySelector('#buttonMain').setAttribute('href','#main='+cord[0]+','+cord[1]);
    }

    moveCord(event) {
        var target = event.target;
        if(target.tagName!='A') {
            return;
        }
        var arr =target.getAttribute('href').slice(6).split(',');
        arr[0]=parseFloat(arr[0]);
        arr[1]=parseFloat(arr[1]);
        eb.trigger('changeHash',arr);
    }

    moveCity(cord) {
        this.yaMap.panTo(cord, {
            flying: 1
        });
    }

};

