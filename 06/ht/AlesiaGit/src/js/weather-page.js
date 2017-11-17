class WeatherPage {

	constructor (coords) {

		document.getElementById('widget').innerHTML = '<div class="header">\
			<div class="request-type header-block">\
				<label class="radio-label"><input type="radio" name="request" id="xhr">XHR</label>\
				<label class="radio-label"><input type="radio" name="request" id="fetch" checked>fetch</label>\
			</div>\
			<div class="menu header-block">\
				<a class="menu-item" href="#about">About widget</a>\
				<span class="divider">|</span>\
				<a class="menu-item" href="#">Main page</a>\
			</div>\
			<form class="search header-block">\
				<input type="text" class="search-field" />\
				<input type="submit" class="submit" value="submit" />\
			</form>\
		</div>\
		<div class="map-wrapper">\
			<div id="map" class="map"></div>\
			<div class="add-favorites-modal">\
				<div class="add-favorites-title">Add to favorites</div>\
				<form class="add-favorites-form">\
					<input type="text" class="add-favorites-name" autofocus/>\
					<div class="add-favorites-buttons-wrapper">\
						<input type="submit" class="add-favorites-button" id="save" value="save" />\
						<input type="reset" class="add-favorites-button" id="cancel" value="cancel" />\
					</div>\
				</form>\
			</div>\
		</div>\
		<div class="info">\
			<div class="history info-block">\
				<div class="history-title info-block-title">History</div>\
				<ul class="history-list"></ul>\
			</div>\
			<div class="weather info-block">\
				<div class="weather-title info-block-title">Weather</div>\
				<ul class="weather-details"></ul>\
			</div>\
			<div class="favorites info-block">\
				<div class="favorites-title info-block-title">Favorites</div>\
				<ul class="favorites-list"></ul>\
			</div>\
		</div>';
		
		this.coords = coords;
		this.location;
		this.latlng = {
			lat: parseFloat(this.coords.split(",").shift()),
			lng: parseFloat(this.coords.split(",").pop())
		};
		this.init = false;
		this.handleHash();
		this.renderMap();

		document.querySelector(".submit").addEventListener("click", this.getlocation.bind(this));

		this.historyList = document.querySelector('.history-list');
		this.historyItem = document.getElementsByClassName('history-item');
		this.arrayHistory = JSON.parse(localStorage.getItem('history')) || [];

		this.favoritesList = document.querySelector('.favorites-list');
		this.favoritesItem = document.getElementsByClassName('favorites-item');
		this.arrayFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

		this.historyList.innerHTML = '';
		this.favoritesList.innerHTML = '';

		this.fillPageWithData();

		this.historyList.addEventListener('click', this.toggleEvent.bind(this));
		this.favoritesList.addEventListener('click', this.toggleEvent.bind(this));
	}

	processFavoritesInput() {
		var modal = document.querySelector('.add-favorites-modal');
		modal.style.display = 'flex';
		document.querySelector('.add-favorites-name').focus();

		document.getElementById('save').addEventListener('click', function() {
			event.preventDefault();
			var name = document.querySelector('.add-favorites-name').value;
			window.location.hash = '#city=' + this.coords;
			this.writeFavoritesItem(this.coords, name);
			modal.style.display = 'none';
		}.bind(this));

		document.getElementById('cancel').addEventListener('click', function() {
			modal.style.display = 'none';
		}.bind(this));
	}

	renderMap() {
		if (this.init === false) {
			map = new google.maps.Map(document.getElementById("map"), {
				zoom: 10,
				center: this.latlng
			});

			geocoder = new google.maps.Geocoder();

			map.addListener('click', function(event) {
				map.setCenter(event.latLng);
				this.coords = event.latLng.lat().toFixed(6) + ',' + event.latLng.lng().toFixed(6);
				this.processFavoritesInput();

			}.bind(this));

			map.addListener('center_changed', function(event) {
				map.getCenter();
				this.coords = map.getCenter().lat().toFixed(6) + ',' + map.getCenter().lng().toFixed(6);
				this.getWeather();
			}.bind(this));

			this.init = true;
			return;
		} else {
			map.setCenter(this.latlng);
			
		}
	}

	handleHash() {
		if (this.coords.search(/\d,\d/) > -1 || this.coords.search(/\d,.\d/) > -1) {
			this.getWeather(this.coords);
			return;
		} 

		return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.coords).then(function (req) {
			return req.json();
		}).then(function (data) {
			if (data.status === 'OK') {
				this.coords = data.results[0].geometry.location.lat.toFixed(6) + ',' + data.results[0].geometry.location.lng.toFixed(6);
				window.location.hash = '#city=' + this.coords;
				this.getWeather(this.coords);
			} else {
				new mainPage();
			}
		}.bind(this));
	}

	fillPageWithData() {
		this.arrayHistory.forEach(function(elem) {
			this.historyList.innerHTML += '<li><a class="history-item" href="#city=' + elem + '">' + elem + '</a></li>';
		}.bind(this));

		this.arrayFavorites.forEach(function(elem) {
			this.favoritesList.innerHTML += '\
			<li>\
				<a class="favorites-item" href="#city=' + elem[0] + '">' + elem[1] + '</a>\
				<button class="delete-favorites" id="' + elem[0] + '">x</button>\
			</li>';
		}.bind(this));
	}

	toggleEvent(event) {
		if (event.target.tagName === 'A') {
			window.location.hash = event.target.hash;
			this.location = event.target.innerHTML;
			this.getWeather(this.coords, this.location);
		}

		if (event.target.tagName === 'BUTTON') {
			this.arrayFavorites = this.arrayFavorites.filter(function(elem) {
				console.log(elem);
				if (elem[0] !== event.target.id) {
					return elem;	
				}
			});
			localStorage.setItem('favorites', JSON.stringify(this.arrayFavorites));
			this.favoritesList.removeChild(event.target.parentElement);
		}
	}

	getlocation(event) {
		event.preventDefault();
		let city = this.capitalize((document.querySelector(".search-field").value).toLowerCase());
		window.location.hash = "#city=" + city;
		this.writeHistoryItem(city);
	}

	writeHistoryItem(location) {
		if (this.arrayHistory.indexOf(this.capitalize(location.toLowerCase())) > -1) return;

		if (this.arrayHistory.length === 5) {
			this.arrayHistory.pop();
		}
		this.getWeather(this.coords, location);
		this.arrayHistory.unshift(location);
		localStorage.setItem('history', JSON.stringify(this.arrayHistory));
	}


	writeFavoritesItem(coords, name) {
		this.getWeather();

		name = this.capitalize(name.toLowerCase());
		this.arrayFavorites.unshift([coords, name]);
		localStorage.setItem('favorites', JSON.stringify(this.arrayFavorites));
	}

	deleteFromFavorites() {
		if (event.target.tagName === 'BUTTON') {
			this.arrayFavorites = this.arrayFavorites.filter(function(elem) {
				console.log(elem);
				if (elem[0] !== parentNode.event.targetNode.getElementsByClassName('history-item').href) {
					return elem;	
				}
			});
			console.log(this.arrayFavorites);
			localStorage.setItem('favorites', JSON.stringify(this.arrayFavorites));
			this.favoritesList.removeChild(parentNode.event.targetNode);
		}
	}

	capitalize(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	getWeather() {
		if (document.getElementById('xhr').checked === true) {
			this.xhrWeather();
		} else {
			this.fetchWeather();
		}
	}

	xhrWeather() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/14b2f0cd9db914c3bbf4ab5e43ac514d/' + this.coords, true);
		xhr.responseType = 'json';
		xhr.send();

		xhr.onreadystatechange = function() {
		  if (xhr.readyState != 4) return;
		  

		  if (xhr.status != 200) {
		    alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
		    return;
		  }
		  this.writeWeatherDetails(xhr.response);
		}.bind(this);
	}

	fetchWeather() {
		return fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/14b2f0cd9db914c3bbf4ab5e43ac514d/' + this.coords).then(function (req) {
			return req.json();
		}).then(function (data) {
			this.writeWeatherDetails(data);
		}.bind(this));
	}

	writeWeatherDetails(data) {
		document.querySelector(".weather-details").innerHTML = '\
		<li class="weather-info">Temperature: ' + Math.floor((data.currently.temperature - 32)/1.8) + '°C</li>\
		<li class="weather-info">Humidity: ' + data.currently.humidity.toFixed(2) + '</li>\
		<li class="weather-info">Rain probability: ' + Math.floor(data.currently.precipProbability) + '%</li>';
	}
	
}