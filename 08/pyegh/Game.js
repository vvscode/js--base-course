var GameLife = function (renderer, interval) {
    this.state = [
        [
            [1,0,0,0,0,1,0,0,0,0,0,0,1],
            [1,1,0,0,0,1,1,0,0,0,0,1,0],
            [1,0,1,1,0,0,0,0,1,0,1,0,0],
            [1,0,1,1,0,1,0,0,1,1,1,0,0],
            [1,1,0,1,0,0,1,0,1,0,0,0,0],
            [1,0,0,1,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,0,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0,0,1,0,0,0],
            [0,1,0,1,0,1,0,0,1,1,0,0,0],
            [0,0,0,0,0,1,0,0,1,0,0,0,0],
            [0,0,0,0,0,1,0,0,1,0,0,0,0],
            [0,0,0,0,0,1,0,0,1,0,0,0,0],
            [0,0,0,0,0,1,0,0,1,0,0,0,0]

        ]
    ];
    this.currStateIndex = 0;
    this.renderer = renderer;
    this.interval = interval;
    this.renderer.render(this.state[this.currStateIndex]);
}

GameLife.prototype.play = function(){

    this.timer = setTimeout(() => {

        if(this.isPrevStateTheSame()){
            this.stop();
            alert('Game finished');
            return;
        }
        console.log(this.state.length);
        this.state.push(this.tick());
        this.currStateIndex = this.state.length - 1;
        this.renderer.render(this.state[this.currStateIndex]);
        this.play(this.interval);
    }, this.interval);
}

GameLife.prototype.stop = function(){
    clearTimeout(this.timer);
}

GameLife.prototype.tick  = function() {
    var arr = [];
    var currStateIndex = this.state.length -1;
    for (var i = 0; i < this.state[currStateIndex].length; i++) {
        arr[i] = [];
        for (var j = 0; j < this.state[currStateIndex][i].length; j++) {
            arr[i][j] = +this.isAlive(i, j, this.state[currStateIndex]);
        }
    }

    return arr;
}

GameLife.prototype.isAlive = function(x, y, state) {
    var counter = 0;

    for(var i = x - 1 ; i <= x + 1 ; i++){
        for(var j = y - 1 ; j <= y + 1 ; j++){
            if( i !== j && state[i] && state[i][j]){
                counter++;
            }
        }
    }

    // if cell is alive
    if (state[x][y]) {
        return counter === 2 || counter === 3;
    }

    // if cell is dead
    return counter ===3 ;
}

GameLife.prototype.isPrevStateTheSame = function(){
    if( this.state.length === 1){
        return false
    }

    for(var i=0; i< this.state[0].length; i++){
        for(var j=0; j < this.state[0][0].length; j++){
            if(this.state[this.state.length - 2][i][j] !== this.state[this.state.length - 1][i][j]){
                return false;
            }
        }
    }
    return true;
}

GameLife.prototype.changeRowsNumber = function(newRowNum){

    var rowsLength = this.state[0][0].length;

    // update all stetes with new number of rows
    for(var i = 0; i< this.currStateIndex + 1; i++){

        var historyElement = this.state[i];
        var updatedHistoryElement = [];
        for(var j=0; j< newRowNum;j++){
            if(historyElement[j]){
                updatedHistoryElement[j] = historyElement[j];
            } else{
                updatedHistoryElement[j] = createEmptyRow(rowsLength);
            }
        }
        this.state[i] = updatedHistoryElement;
    }

    // delete 'future' states
    if(this.currStateIndex < this.state.length){
        var deleteFromPosition = this.currStateIndex + 1;
        var numberOfRemovedElements = this.state.length - deleteFromPosition;
        this.state.splice(deleteFromPosition, numberOfRemovedElements);
    }

}

GameLife.prototype.changeCellState = function(i,j){

    // change state
    var currState = this.state[this.currStateIndex];
    currState[i][j] = currState[i][j] === 1 ? 0 : 1;

    // clear history
    this.state = [];
    this.currStateIndex = 0;
    this.state.push(currState);

}

// move to util
function createEmptyRow(length){
    var emptyRow = [];
    for(var i = 0; i < length ; i++){
        emptyRow[i] = 0;
    }
    return emptyRow;
}

// можно было бы использовать транспонирование, а потом добавление строк предыдущим методом и обраное транспонирование, но было лень...
// поэтому сделал в лоб
GameLife.prototype.changeColumnsNumber = function(newColNum){
    var rowLength = this.state[0].length;
    for(var i = 0; i< this.currStateIndex + 1; i++){

        var historyElement = this.state[i];
        var updatedHistoryElement = [];
        for(var j = 0; j< rowLength; j++){
            updatedHistoryElement[j] = [];
            for(var k = 0; k< newColNum; k++){
                if(historyElement[j][k]){
                    updatedHistoryElement[j][k] = historyElement[j][k];
                } else{
                    updatedHistoryElement[j][k] = 0;
                }
            }
        }
        this.state[i] = updatedHistoryElement;
    }

    // delete 'future' states
    if(this.currStateIndex < this.state.length){
        var deleteFromPosition = this.currStateIndex + 1;
        var numberOfRemovedElements = this.state.length - deleteFromPosition;
        this.state.splice(deleteFromPosition, numberOfRemovedElements);
    }

}



GameLife.prototype.drawCurrentStep = function(){
    this.renderer.render(this.state[this.currStateIndex]);
}

GameLife.prototype.setRenderer = function(renderer){
    this.renderer = renderer;
}

GameLife.prototype.getCurrState = function(){
    return this.state[this.currStateIndex];
}
/**

 var game= new GameLife();
 game.play(1000);
 var timer = setTimeout(() => game.stop(), 10000);
 var timer2 = setTimeout(() => {
	console.log('info ' + game.interval);
	game.interval = 2000;
}, 5000);

 undefined
 Game.js:23 1
 Game.js:23 2
 Game.js:23 3
 Game.js:23 4
 VM216:5 info 1000
 Game.js:23 5
 Game.js:23 6
 Game.js:23 7


 */
