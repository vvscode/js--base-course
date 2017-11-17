class mainPage {
	constructor () {
		this.getUserCoords();
	}

	getUserCoords() {
		return fetch('https://cors-anywhere.herokuapp.com/https://api.userinfo.io/userinfos').then(function (req) {
			return req.json();
		}).then(function (data) {
			var coords = (data.position.latitude).toFixed(6) + ',' + (data.position.longitude).toFixed(6);

			window.location.hash = "#city=" + coords;
			new weatherPage(coords);
		});
					
	}
}