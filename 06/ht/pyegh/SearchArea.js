var SearchArea = function(el){
    this.el = el;
}

SearchArea.prototype.render  = function() {

}

/*

function updatePageAccordingToEnteredData() {

    var input = document.getElementById("searchAreaId");
    var enteredText = input.value;
    var blocksWithDinamicContent = getBlocksWithDinamicContent();
    drawContentAccordingToEnteredData(blocksWithDinamicContent, enteredText);
}

function getBlocksWithDinamicContent(){
    return {
        searchInputDiv: document.getElementById("searchInputDivId"),
        mapAreaDiv: document.getElementById("YMapsID"),
        infoAreaDiv: document.getElementById("infoAreaDivId")
    }
}

function drawContentAccordingToEnteredData(blocksWithDinamicContent, addr){

    var mapArea = new MapArea(blocksWithDinamicContent.mapAreaDiv, addr);
    mapArea.render();

    var infoArea = new InfoArea(blocksWithDinamicContent.infoAreaDiv, addr);
    infoArea.render();
}
 */

