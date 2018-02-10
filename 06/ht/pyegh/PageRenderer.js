var PageRenderer = function(){
}

PageRenderer.prototype.updatePageAccordingToEnteredData = function(city) {
    var input = document.getElementById("searchAreaId");
    var enteredText = city;
    var blocksWithDinamicContent = this.getBlocksWithDinamicContent();

    var cityDao = new DAO(localStorage);
    //cityDao.saveNote('enteredCityHistoryStorageId', enteredText)


    var saveCityPromise = new Promise((resolve, reject) => {
        resolve();
    });


    saveCityPromise.then(function(){
        var maxStorageSize = 5;
        cityDao.saveNote('enteredCityHistoryStorageId', enteredText, maxStorageSize);
        //location.hash = '/city/' + enteredText;
    }).then(() => {


        this.drawContentAccordingToEnteredData(blocksWithDinamicContent, enteredText);
    });
}


PageRenderer.prototype.updatePageAccordingToCoordinates = function(coordinates) {

    var blocksWithDinamicContent = this.getBlocksWithDinamicContent();
    this.drawContentAccordingToCoordinates (blocksWithDinamicContent, coordinates);

}

PageRenderer.prototype.updateFavouriteListAfterNewItemAdded = function(){

    var cityDao = new DAO(localStorage);
    var saveCityPromise = new Promise((resolve, reject) => {
        resolve();
    });

    saveCityPromise.then(function(){
        cityDao.saveNote('favouriteCityHistoryStorageId', currCordinates);
    }).then(() => {

        var favouriteDiv = document.getElementById("favouriteAreaDivId");
        var newFavouriteDiv = document.createElement('div');
        newFavouriteDiv.innerHTML = '<div class="deleteAreaClass"></div><a href=#' + currCordinates.lat + ',' +  currCordinates.lng + '>' + currCordinates.lat +  ' ' + currCordinates.lng + '</a>';

        favouriteDiv.appendChild(newFavouriteDiv);

    });

}




PageRenderer.prototype.getBlocksWithDinamicContent = function() {
    return {
        searchInputDiv: document.getElementById("searchInputDivId"),
        mapAreaDiv: document.getElementById("YMapsID"),
        infoAreaDiv: document.getElementById("infoAreaDivId"),
        historyAreaDiv : document.getElementById("historyAreaDivId"),
        favouriteAreaDiv : document.getElementById("favouriteAreaDivId")
    }
}

PageRenderer.prototype.drawContentAccordingToEnteredData = function(blocksWithDinamicContent, addr) {

    var renderMapPromise = new Promise((resolve, reject) => {
        resolve();
    });

    renderMapPromise.then(function(){
        var mapArea = new MapArea(blocksWithDinamicContent.mapAreaDiv, addr);
        mapArea.render();
    }).then(() => {
        var historyArea = new HistoryArea(blocksWithDinamicContent.historyAreaDiv, 'History of search');
        historyArea.render('enteredCityHistoryStorageId');//favouriteCityHistoryStorageId

        var infoArea = new InfoArea(blocksWithDinamicContent.infoAreaDiv, addr);
        infoArea.render('enteredCityHistoryStorageId');

        var favouriteArea = new HistoryArea(blocksWithDinamicContent.favouriteAreaDiv, 'Favourite Places');
        favouriteArea.renderCoordinates('favouriteCityHistoryStorageId');//favouriteCityHistoryStorageId

    })
}


PageRenderer.prototype.drawContentForCurrPosition = function(blocksWithDinamicContent) {

    var renderMapPromise = new Promise((resolve, reject) => {
        resolve();
    });

    var ws = new WeatherService();
    var locationPromise = ws.getLatLngForCurrLocation();
    locationPromise().then((coordinates) =>{
        var mapArea = new MapArea(blocksWithDinamicContent.mapAreaDiv, coordinates);
        currCordinates = coordinates;
        mapArea.render();
    }).then(() => {
        var historyArea = new HistoryArea(blocksWithDinamicContent.historyAreaDiv, 'History of search');
        historyArea.render('enteredCityHistoryStorageId');//favouriteCityHistoryStorageId

        var infoArea = new InfoArea(document.getElementById("infoAreaDivId"), currCordinates);

        infoArea.render('enteredCityHistoryStorageId');

        var favouriteArea = new HistoryArea(blocksWithDinamicContent.favouriteAreaDiv, 'Favourite Places');
        favouriteArea.renderCoordinates('favouriteCityHistoryStorageId');//favouriteCityHistoryStorageId

    })


    /*renderMapPromise.then(function(){
        var mapArea = new MapArea(blocksWithDinamicContent.mapAreaDiv, addr);
        mapArea.render();
    }).then(() => {
        var historyArea = new HistoryArea(blocksWithDinamicContent.historyAreaDiv, 'History of search');
        historyArea.render('enteredCityHistoryStorageId');//favouriteCityHistoryStorageId

        var infoArea = new InfoArea(blocksWithDinamicContent.infoAreaDiv, addr);
        infoArea.render('enteredCityHistoryStorageId');

        var favouriteArea = new HistoryArea(blocksWithDinamicContent.favouriteAreaDiv, 'Favourite Places');
        favouriteArea.renderCoordinates('favouriteCityHistoryStorageId');//favouriteCityHistoryStorageId

    })*/
}




PageRenderer.prototype.drawContentAccordingToCoordinates = function(blocksWithDinamicContent, coordinates){
    var mapArea = new MapArea(blocksWithDinamicContent.mapAreaDiv, coordinates);
    mapArea.renderByCoordinates();

    var infoArea = new InfoArea(blocksWithDinamicContent.infoAreaDiv, coordinates);
    infoArea.render('enteredCityHistoryStorageId');
}
