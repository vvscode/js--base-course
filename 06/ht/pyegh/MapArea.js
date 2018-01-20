var MapArea = function(el, addr){
    this.el = el;
    this.addr = addr;
}

MapArea.prototype.render = function(){
    YMaps.load(this.drawMap.apply(this));

}

MapArea.prototype.renderByCoordinates = function(){
    YMaps.load(this.drawMapByCoordinates.apply(this));

}


MapArea.prototype.drawMap  = function() {

    var ws = new WeatherService();
    var locationPromise = ws.getLatLng();

    if(this.addr instanceof Object){
        // case when address is a coordinates (Object)
        this.drawMapByCoordinates(this.addr);
    } else{
        // case when address is a city (String)
        locationPromise(this.addr).then(this.drawMapByCoordinates).catch(function(){
            console.log('error occurred during map drawing');
        });
    }


}

MapArea.prototype.drawMapByCoordinates = function(locationCoordinates) {
    if(!locationCoordinates){
        locationCoordinates = this.addr;
    }

    var lat = locationCoordinates.lat;
    var lng = locationCoordinates.lng;

    var divWithMap = document.querySelector("#YMapsID");
    divWithMap.classList.add('mapClass');

    // Создает экземпляр карты и привязывает его к созданному контейнеру
    var map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);

    // Устанавливает центр и масштаб карты
    map.setCenter(new YMaps.GeoPoint(lng, lat), 10); //37.64, 55.76 MSC
    currCordinates = {lng: lng, lat: lat};

    YMaps.Events.observe(map, map.Events.MoveEnd, function(){

        var mapCenter = map.getCenter();
        var infoArea = new InfoArea(
            document.getElementById("infoAreaDivId"),
            {lat: mapCenter.__lat, lng: mapCenter.__lng}
        );
        currCordinates = {lat: mapCenter.__lat, lng: mapCenter.__lng};
        infoArea.render('enteredCityHistoryStorageId');
    });
}