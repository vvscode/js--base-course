var HistoryArea = function(el, label){
    this.el = el;
    this.label =label;
}

HistoryArea.prototype.render  = function(storageId) {

    var cityDao = new DAO(localStorage);
    var cities = cityDao.getStoredArray(storageId);

    var data = '<div>' + cities && cities !== null ? cities.join('</div><div>') : '' + '</div>';


    var historyArea ='<div>'+this.label + ':' + '</div>' + data;

    this.el.innerHTML = historyArea;
}

HistoryArea.prototype.renderCoordinates  = function(storageId) {

    var cityDao = new DAO(localStorage);
    var coordinates = cityDao.getStoredArray(storageId);

    //var data = coordinates ? coordinates.join('\n') : '';

    if(coordinates){
        var favouriteDiv = document.getElementById("favouriteAreaDivId");
        favouriteDiv.innerHTML = '';

        for(var i =0; i < coordinates.length ; i++){
            var newFavouriteDiv = document.createElement('div');
            newFavouriteDiv.innerHTML = '<div class="deleteAreaClass"></div><a href=#' + coordinates[i].lat + ',' +  coordinates[i].lng + '>' + coordinates[i].lat +  ' ' + coordinates[i].lng + '</a>';
            favouriteDiv.appendChild(newFavouriteDiv);
        }
    }

    //this.el.innerHTML = historyArea;
}
