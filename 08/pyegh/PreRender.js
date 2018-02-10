var PreRenderer = function(){

}

PreRenderer.prototype.render = function(currState){
    //var preGameField = document.getElementById('preDivId');
    //var preBlock = preGameField.getElementsByTagName('Pre');

    var pre = document.getElementById('preId');
    var rowNum = currState.length;
    var colNum = currState[0].length;

    var fieldHTML ='';
    for(var i = 0; i < rowNum; i++ ){
        for(var j = 0; j < colNum; j++ ){
            fieldHTML += currState[i][j];
        }
        fieldHTML += '\n';
    }
    pre.innerHTML = fieldHTML;
}

PreRenderer.prototype.setState = function(state){
    this.state = state;
}