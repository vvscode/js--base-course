export default function LifeGame(startingField, bus) {
  this.currentState = startingField;
  this.history = [];
  this.paused = true;
  this.speed = 500;
  this.bus = bus;
  this.currentHistory = 0;
  this.bus.maxHistory;
}

LifeGame.prototype = {
  getNeighbours: function(i, j) {
    return [[i-1, j-1], [i-1, j], [i-1, j+1],[i, j-1], [i, j+1] ,[i+1, j-1], [i+1,j], [i+1, j+1]];
  },
  nextGen: function() {
    var field = Array.from(this.currentState);
    this.history.push(this.currentState);
    this.bus.maxHistory = this.history.length;
    this.currentHistory += 1;
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
    this.bus.trigger('rerenderRequest');
  },
  switchGameState: function() {
    if(this.paused) {
      this.intervalId = setInterval(() => {
        this.nextGen();
        this.bus.trigger('rerenderRequest');
      }, this.speed);
      this.paused = false;
    } else {
      this.paused = true;
      clearInterval(this.intervalId); 
    }
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
  traverseHistory: function(position) {
    this.bus.traversingHistory = true; 
    this.currentHistory = position;
    this.currentState = this.history[position];
    this.switchGameState(); 
  },
}
