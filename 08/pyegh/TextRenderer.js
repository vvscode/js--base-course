var TextRenderer = function(){

}

TextRenderer.prototype.render = function(currState){
    var gameField = document.getElementById('gameFieldId');
    var rowNum = currState.length;
    var colNum = currState[0].length;

    var fieldHTML = '<table>';
    for(var i = 0; i < rowNum; i++ ){
        fieldHTML += '<tr>';
        for(var j = 0; j < colNum; j++ ){
            var id = i + '_' + j;
            if(currState[i][j] === 1){
                fieldHTML += '<td class="blackCell" id=' + id + '>';
            } else{
                fieldHTML += '<td class="whiteCell" id=' + id + '>';
            }
            fieldHTML += currState[i][j] +  '</td>';
        }
        fieldHTML += '</tr>';
    }
    fieldHTML += '</table>';
    gameField.innerHTML = fieldHTML;
}

TextRenderer.prototype.setState = function(state){
    this.state = state;
}