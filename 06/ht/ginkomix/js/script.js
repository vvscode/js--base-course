class Queries {

    XHR(cord) {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            xhr = new XHR(),
            self = this;
        return new Promise(function(resolve) {
            xhr.open('GET', 'http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/'+self.key+'/'+cord, true);
            xhr.send();
            xhr.onload = function() {
                var arr = JSON.parse(this.responseText);
                arr = JSON.parse(arr.body);
                var type = [ 
                    arr.currently.precipType,
                    arr.currently.temperature,
                    arr.currently.windSpeed
                ];
                resolve(type);
            }
        });
    } 

    fetch(cord) {
        var self = this;
        return new Promise(function(resolve) {
            fetch('http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/'+self.key+'/'+cord)
                .then(function(response) {
                return response.json();
            })
                .then(function(wearher) {
                var arr = JSON.parse(wearher.body),
                    type = [ arr.currently.precipType,
                            arr.currently.temperature,
                            arr.currently.windSpeed
                           ];
                resolve(type);
            });
        });
    }
};

const Memory = (Memory) => class extends Memory {

    removeItemFromStorage(where,link) {
        return  Promise.resolve()
            .then(function() {
            var storageText =JSON.parse(localStorage.getItem(where));
            delete storageText[link];
            var arr = [],storageObj = {};
            for(var i in storageText) {
                arr.push(storageText[i]);
            }
            for(var i= 0;i<arr.length;i++) {
                storageObj[i] = arr[i];
            }
            var sObj = JSON.stringify(storageObj);
            localStorage.setItem(where,sObj);

        });
    } 

    save(where,text,size) {
        var sObj;
        var storageText =JSON.parse(localStorage.getItem(where));
        var saveObj = {};
        if(!storageText)
        {
            saveObj = text;
        }else {
            for(var key in storageText) {
                var num = parseInt(key)+1;
                saveObj[num] = storageText[key];
                if((size-1) === num) {
                    break;
                }
            }
            Object.assign(saveObj,text);
        }
        var sObj = JSON.stringify(saveObj);
        localStorage.setItem(where,sObj);
    }
};

class Map extends Memory(Queries)  {
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

var map = new Map('41b2362125a88e95e5d8522aa7a1a7d1');
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