export default function LifeGame(startingField) {
  this.currentState = startingField;
  this.history = [];
}

LifeGame.prototype = {
  getNeighbours: function(i, j) {
    return [[i-1, j-1], [i-1, j], [i-1, j+1],[i, j-1], [i, j+1] ,[i+1, j-1], [i+1,j], [i+1, j+1]];
  },
  nextGen: function() {
    var field = Array.from(this.currentState);
    this.history.push(this.currentState);
    var livingNeighbours = 0;
    var neighbourArray;
    for(var i = 0; i < field.length; i++) {
        for(var j = 0; j <  field[i].length; j++) {
            neighbourArray = this.getNeighbours(i, j);
            neighbourArray.forEach(function(item) {
              if(field[item[0]] && field[item[1]]) {
                if(field[item[0]][item[1]] === '*' || field[item[0]][item[1]] === '-') {
                  livingNeighbours ++;
                }
              }
            });
            if(field[i][j] === '*' && (livingNeighbours > 3  || livingNeighbours < 2)) {
              field[i][j] = '-';
            }
            if(field[i][j] === '_' && (livingNeighbours === 3)) {
              field[i][j] = '+';
            }
            livingNeighbours = 0;
        }
    }
    for(var i = 0; i < field.length; i++) {
      for(var j = 0; j <  field[i].length; j++) {
        if(field[i][j] === '-') {field[i][j] = '_';}
        if(field[i][j] === '+') {field[i][j] = '*';}
      }
    }
    this.currentState = field;
  },
  switchCell: function(i, j) {
    if(this.currentState[i][j] === '_') {
      this.currentState[i][j] = '*';
    } else if(this.currentState[i][j] === '*') {
      this.currentState[i][j] = '_';
    }
  },
}
