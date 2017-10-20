(function(window) {
	var doc = document;

	if ( "onhashchange" in window.document.body ) { return; }

	var location = window.location,
		oldURL = location.href,
		oldHash = location.hash;


	setInterval(function() {
		var newURL = location.href,
			newHash = location.hash;

		if ( newHash !== oldHash && typeof window.onhashchange === "function" ) {
			window.onhashchange({
				type: "hashchange",
				oldURL: oldURL,
				newURL: newURL
			});
			oldURL = newURL;
			oldHash = newHash;
			selectId(newHash);
		}
	}, 100);


	window.addEventListener('hashchange', selectId);

	function selectId(newHash) {
		if (newHash === '#calendar') {
			console.log(newHash);
			drawInteractiveCalendar('calendar');
		}
		if (newHash === '#createCalendar') {
			createForm('#createCalendar');
		}
	}

})(window);

