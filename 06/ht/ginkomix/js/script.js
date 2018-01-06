function Map() {
	this.yaMap;
	this.createMapFlag = false;
	var self = this;
	this.enterPress();

	this.outputSave('history','history-chande-block');

	this.outputSave('favorite','favorite-chande-block');
	
	this.XHR = this.XHR.bind(this);
	this.fetch = this.fetch.bind(this);
	this.createMap = this.createMap.bind(this);
	this.showCenter = this.showCenter.bind(this);
	this.findCity = this.findCity.bind(this);
	this.moveCity = this.moveCity.bind(this);
	this.history = this.history.bind(this);
	this.favorite = this.favorite.bind(this);
	this.delItem = this.delItem.bind(this);

}

Map.prototype.favorite = function() {
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

Map.prototype.delItem = function(event) {
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

Map.prototype.moveCity = function(cord) {

	this.yaMap.panTo(cord, {
		flying: 1
	});
}

Map.prototype.history = function() {
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

Map.prototype.findCity = function() {
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

Map.prototype.showCenter = function() {
	eb.trigger('cordChange',this.yaMap.getCenter());
}

Map.prototype.createMap = function(cord) {
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

Map.prototype.XHR = function(cord) {
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
		xhr = new XHR(),
		self = this;

	xhr.open('GET', 'http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/41b2362125a88e95e5d8522aa7a1a7d1/'+cord, true);
	xhr.onload = function() {

		var arr = JSON.parse(this.responseText);
		arr = JSON.parse(arr.body);
		var type = arr.currently.precipType,
			temperature = arr.currently.temperature,
			speed = arr.currently.windSpeed;
		self.setWearher(type, temperature,speed);
	}
	xhr.send();
}

Map.prototype.fetch = function(cord) {
	fetch('http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/41b2362125a88e95e5d8522aa7a1a7d1/'+cord)
		.then(function(response) {
		return response.json();
	})
		.then(function(wearher) {
		var arr = JSON.parse(wearher.body),
			type = arr.currently.precipType,
			temperature = arr.currently.temperature,
			speed = arr.currently.windSpeed;
		self.setWearher(type, temperature,speed);
	});

}

Map.prototype.setWearher = function(type, temperature,speed) {
	document.querySelector('.precipType').innerHTML = type;
	document.querySelector('.temperature').innerHTML = temperature;
	document.querySelector('.windSpeed').innerHTML = speed;
}

Map.prototype.removeItemFromStorage = function(where,link) {
	return new Promise(function(resolve) {
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
		resolve();
	});
}

Map.prototype.sliceCord = function(str) {
	var arr = str.split(',');
	return arr;
}

Map.prototype.moveCord = function(event) {
	var target = event.target;
	if(target.tagName!='A') {
		return;
	}
	var arr =target.getAttribute('href').slice(6).split(',');
	arr[0]=parseFloat(arr[0]);
	arr[1]=parseFloat(arr[1]);
	eb.trigger('changeHach',arr);
}

Map.prototype.save = function(where,text,size) {

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

Map.prototype.outputSave = function(where,block) {
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

Map.prototype.addHistoryHtml = function(text) {
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

Map.prototype.changeHach = function(cord) {
	window.location.hash = 'main='+cord[0]+','+cord[1];  
}

Map.prototype.changeButtonHref = function(cord) {
	document.querySelector('#buttonMain').setAttribute('href','#main='+cord[0]+','+cord[1]);
}

Map.prototype.enterPress = function() {
	var self =this;
	document.onkeyup = function (e) {
		e = e || window.event;
		if (e.keyCode === 13) {
			self.findCity();
		}
		return false;
	}

}

 function radioChecked() {
	var radio = document.querySelectorAll('.inputConfigure');
	for(var i = 0;i < radio.length;i ++) {
		if(radio[i].checked) {
			if(radio[i].id === 'xhr') {
				eb.on('cordChange',map.XHR);
				eb.off('cordChange',map.fetch);
				eb.on('changeHach',map.XHR);
				eb.off('changeHach',map.fetch);
				eb.on('moveCity',map.XHR);
				eb.off('moveCity',map.fetch);
			}
			if(radio[i].id === 'fetch') {
				eb.off('cordChange',map.XHR);
				eb.on('cordChange',map.fetch);
				eb.off('changeHach',map.XHR);
				eb.on('changeHach',map.fetch);
				eb.off('moveCity',map.XHR);
				eb.on('moveCity',map.fetch);	
			}
		}
	}
}

var map = new Map();
eb.on('cordChange',map.changeButtonHref);
eb.on('cordChange',map.changeHach);


eb.on('changeHach',map.moveCity);
eb.on('changeHach',map.changeButtonHref);


eb.on('moveCity',map.changeButtonHref);
eb.on('moveCity',map.changeHach);
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



































