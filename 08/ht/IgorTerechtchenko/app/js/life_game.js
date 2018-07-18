export default function LifeGame(startingField, bus) {
  this.currentState = startingField;
  this.history = [];
  this.paused = true;
  this.speed = 500;
  this.bus = bus;
  this.bus.maxHistory = 0;
  var tmp = [];
  startingField.forEach((line, index) => {
    tmp[index] = line.slice();      
  });
  this.history.push(tmp);
}

LifeGame.prototype = {
  getNeighbours: function(i, j) {
    return [[i-1, j-1], [i-1, j], [i-1, j+1],[i, j-1], [i, j+1] ,[i+1, j-1], [i+1,j], [i+1, j+1]];
  },
  nextGen: function() {
    var field = [];
    this.currentState.forEach((line, index) => {
      field[index] = line.slice();      
    });
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
    var newArray = [];
    this.currentState.forEach((line, index) => {
      newArray[index] = line.slice();      
    });
    this.history.push(newArray);
    this.bus.maxHistory += 1;
  },
  switchCell: function(i, j) {
    if(this.currentState[i][j] === '_') {
      this.currentState[i][j] = '*';
    } else if(this.currentState[i][j] === '*') {
      this.currentState[i][j] = '_';
    }
    this.bus.trigger('rerenderRequest');
  },
  switchGameState: function() {
    if(this.paused) {
      this.startGame();
    } else {
      this.pauseGame();
    }
  },
  pauseGame: function() {
    this.paused = true;
    clearInterval(this.intervalId); 
  },
  startGame: function() {
    this.intervalId = setInterval(() => {
      this.nextGen();
      this.bus.trigger('rerenderRequest');
    }, this.speed);
    this.paused = false;
  },
  changeSpeed: function(value) {
    if(value === '+') {
      if(this.speed > 100) {
        this.speed -= 100;
      }
    }
    if(value === '-') {
      if(this.speed <= 1000) {
        this.speed += 100;
      }
    }
  },
}
