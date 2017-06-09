window.onload = function() {

	
	var geocoder = new google.maps.Geocoder();
	var searchSubmitButton = document.getElementById('submit');
	var searchField = document.getElementById('address');
	var search = document.getElementById('search');
	var fetch = document.getElementById("fetch");
	var xhr = document.getElementById("xhr");
	var alert = document.getElementById("alert");


	try {
		var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
	} catch (e) {
		alert.innerHTML = 'Something went wrong. Try again later.';;
	}
	
	for (var i = 0; i < citiesArray.length; i++) {
		var citiesList = document.getElementById('cities-list');
		var cityItem = document.createElement('LI');
		var cityLink = document.createElement('A');
		cityLink.innerHTML = citiesArray[i]; 
		cityLink.href = "#" + citiesArray[i]; 
		cityItem.className = 'widget__city-item';
		cityLink.className = 'widget__city-link-style';
		cityItem.appendChild(cityLink);
		citiesList.appendChild(cityItem);
		if (citiesList.childNodes.length > citiesArray.length) {		
			citiesList.removeChild(citiesList.lastChild);
		}
	}
	citiesArray.length = 5;


	//--------------------------
	//CHECKING IF WINDOW HAS A HASH TO SHOW CITY WEATHER ON LOAD
	//--------------------------
	if (window.location.hash !== '') {
		console.log(window.location.hash);
		var locationHash = window.location.hash.split('#').pop();
		var address = locationHash;
		geocodeAddress(geocoder, address);
		alert.innerHTML = '';
	}
	

	//--------------------------
	//SENDING REQUEST ON HISTORY LINK/HASH CHANGE
	//--------------------------
	window.onhashchange = function (url) {
		var cityHash = event.newURL.split('#').pop();
		var address = cityHash;
		geocodeAddress(geocoder, address);
		search.reset();
		alert.innerHTML = '';
	};


	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}


	//--------------------------
	//CALLING GEOCODE FUNCTION ON SUBMIT
	//--------------------------
	searchSubmitButton.addEventListener('click', function() {
		if (searchField.value !== "") {
			var address = capitalize(searchField.value);
			geocodeAddress(geocoder, address);
		} else {
			return;
		}
		search.reset();
		alert.innerHTML = '';
	});
	

	//--------------------------
	//CALLING GOOGLE GEOCODING API THROUGH CALLBACK
	//--------------------------
	function geocodeAddress(geocoder, address) {
		geocoder.geocode({'address': address}, function(results, status) {
			if (status === 'OK') {
				var latitude = results["0"].geometry.location.lat();
				var longitude = results["0"].geometry.location.lng();
				var myUrl = 'https://shrouded-spire-35703.herokuapp.com/forecast/' + latitude + ',' + longitude;

				if (document.getElementById("request-type").checked == true) {
					httpGetFetch (myUrl, address);
				} else {
					httpGet(myUrl, address);
				}
				setHistoryItem(address);
			} else {
				alert.innerHTML = "No weather forecast for this city was found";
			}
		});
	}

	
	//--------------------------
	//CALCULATING WEEKDAY FOR EXTENDED FORECAST
	//--------------------------
	var d = new Date();
	var weekdaysArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	var theDayAfterTomorrow = weekdaysArray[d.getDay() + 1];
	var days = ["Today", "Tomorrow", theDayAfterTomorrow];


	//--------------------------
	//CONSTRUCTOR FOR EXTENDED FORECAST (BOTTOM)
	//--------------------------
	function ExtendedForecast (res, num) {
		this.temperatureMax = Math.round(res.daily.data[num].apparentTemperatureMax);
		this.temperatureMin = Math.round(res.daily.data[num].apparentTemperatureMin);
		this.icon = res.daily.data[num].icon;
		this.day = days[num];
	}	


	//--------------------------
	//CONSTRUCTOR FOR TODAY'S FORECAST (MAIN SCREEN)
	//--------------------------
	function CurrentForecast (res) {
		this.temperature = Math.round(res.currently.temperature);
		this.summary = res.currently.summary;
		this.icon = res.currently.icon;
	}

	
	//--------------------------
	//XMLHTTPREQUEST FOR WEATHER DATA FROM DARK SKY RESOURCE
	//--------------------------
	function httpGet (someUrl, address) {
		var xhr = new XMLHttpRequest();
		var result = '';
		xhr.responseType = 'json';

		xhr.open('GET', someUrl, true);

		xhr.onload = function resultingData () {
		  result = this.response;
		  showWeatherData(result, address);
		}
		

		xhr.onerror = function() {
		  alert('Error' + this.status);
		}

		xhr.send();
	}


	//--------------------------
	//FETCH REQUEST FOR WEATHER DATA FROM DARK SKY RESOURCE
	//--------------------------
	let httpGetFetch = (someUrl, address) => fetch(someUrl)
	  .then((fetchResponse) => fetchResponse.json())
	  .then((fetchResult) => fetchResult)
	  .then((processResult) => showWeatherData(processResult, address));


	//--------------------------
	//BUILDING DOM WITH DARK SKY RESULTS
	//--------------------------
	function showWeatherData(result, address) {
		var todayData = new ExtendedForecast(result, 0);
		var tomorrowData = new ExtendedForecast(result, 1);
		var thedayafterData = new ExtendedForecast(result, 2);
		

		var templateExtended = function (extendedData) {
			return '<div class="extended__top-wrapper"><div class="extended__day">' + extendedData.day + '</div><div class="extended__icon extended__' + extendedData.icon + '"></div></div><div class="extended__temps-wrapper"><div class="extended__temp-max">' + extendedData.temperatureMax  + '\xB0</div><div class="divider">/</div><div class="extended__temp-max">' + extendedData.temperatureMin + '\xB0</div></div>';
		};
		

		document.getElementById('today').innerHTML = templateExtended(todayData);
		document.getElementById('tomorrow').innerHTML = templateExtended(tomorrowData);
		document.getElementById('thedayafter').innerHTML = templateExtended(thedayafterData);

		
		var templateCurrentDay = function (currentData) {
			console.log(currentData.icon);
			return '<div><div class="current__temp">' + currentData.temperature + '\xB0</div><div class="current__wrapper"><div class="current__city">' + address + '</div><div class="current__icon current__' + currentData.icon + '"></div></div>';
		};


		var currentData = new CurrentForecast(result);
		var current = document.getElementById('current');
		current.innerHTML = templateCurrentDay(currentData);
	}


	function setHistoryItem(address) {
		if (citiesArray.indexOf(address) >= 0) return;

		var historyItem = address;
		cityLink.innerHTML = address;
		cityLink.href = "#" + historyItem; 
		cityItem.appendChild(cityLink);

		if (citiesArray.indexOf(address) >= 0) return;

		citiesArray.unshift(historyItem);
		if (citiesArray.length > 5) {
			citiesArray.pop(); 
		}
		localStorage.setItem("cities", JSON.stringify(citiesArray));
		
		citiesList.insertBefore(cityItem, citiesList.childNodes[0]); 
		
		if (citiesList.childNodes.length > citiesArray.length) {		
			citiesList.removeChild(citiesList.lastChild);
		}
	}

};

