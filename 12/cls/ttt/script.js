var sleep = function(delay) {
  return new Promise(function(resolve, reject){
    setTimeout(resolve, delay*1000);
  });
};


var GameView = function (players, map, msg, isStopped) {
  this.players = players;
  this.map = map;
  this.msg = msg;
  this.isStopped = isStopped;

  var num = this.map.length;
  var table = document.createElement('table');
  table.id = 'table';
  for (var i = 0; i < num; i++) {
    var row = document.createElement('tr');
    table.appendChild(row);
    for (var j = 0; j < num; j++) {
      var cell = document.createElement('td');
      cell.className = 'cell';
      row.appendChild(cell);
    }
  }

  document.body.appendChild(table);

  this.drawGameView = function (map) {
    this.map = map;
    for (var i = 0; i < num; i++) {
      for (var j = 0; j < num; j++) {
        document.getElementById('table').rows[i].cells[j].innerHTML = this.map[i][j];
      }
    }
  };

  this.draw = this.drawGameView;

  this.congratsWinner = function (msg, isStopped) {
    this.msg = msg;
    this.isStopped = isStopped;
    if (this.isStopped == true) {
      alert(msg);
    }
  };

  this.legend = function (players) {
    this.players = players;
    var legend = document.createElement('div');
    legend.innerHTML = 'player ' + this.players[0]['name'] + ' plays with ' + this.players[0]['symbol'] + '; ' + 'player ' + this.players[1]['name'] + ' plays with ' + this.players[1]['symbol'];
    document.body.appendChild(legend);
  }

  this.legend(this.players);
  this.drawGameView(this.map);
  this.congratsWinner(this.msg, this.isStopped);
};


class Bot1 {
  constructor(name, sym) {
    this.name = name;
    this.symbol = sym;
  }
  getMovement(map) {
    return Promise.resolve()
      .then(() => {
        let arr = [];
        for (let i = 0; i < map.length; i++) {
          for (let k = 0; k < map[i].length; k++) {
            if (map[i][k] == " ") {
              arr.push(`${i}` + k);
            }
          }
        }
        let rand = Math.floor(Math.random() * arr.length);

        let newcorArr = arr[rand];
        newcorArr = newcorArr.split("");
        return newcorArr;
      })
  }
}
class Player2 {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }
  getMovement(map) {
    return Promise.resolve()
      .then(() => {
        let newCoords = [];
        for (let i = 0; i < map.length; i++) {

          if (newCoords.length != 0) {
            break;
          }
          for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == ' ') {
              if (map[i][j - 1] == this.symbol) {
                newCoords[0] = i;
                newCoords[1] = j;
                break;
              } else {
                continue;
              }

            }
          }
        }

        return newCoords
      })
  }

}


////////

class Game {
  constructor(n, Player1, Player2, GameView) {
    this.player1 = new Player1('Bot1', 'x');
    this.player2 = new Player2('Bot2', 'o');
    let players = [this.player1, this.player2];

    this.start(n);

    this.gameView = new GameView(players, this.map, 'Game start', false);;

    let i = 0;
    this.getPlayer = () => {
      let player = players[i % 2];
      i++;
      return player;
    };
  }

  createMap(n) {
    const arr = [];

    for (let i = 0; i <= n; i++) {

      const arr2 = [];

      for (let y = 0; y <= n; y++) {
        arr2.push(' ');
      }

      arr.push(arr2);
    }

    this.map = arr;
  }

  start(n) {
    this.message = 'Start game!';
    this.createMap(n);
    this.tick();
  }

  isGameContinue() {

    let isFinished = true;

    this.map.forEach(item => {
      if (item.indexOf(' ') >= 0) {
        isFinished = false;
      }
    });

    // for (let i = 0; i <= n; i++) {
    //   this.map[i]

    // }

    return isFinished ? Promise.reject() : Promise.resolve();
  }

  onGameFinish(reason) {
    console.log('reason', reason);
    this.message = 'Game finished';
    this.redraw(
      this.message,
      true,
    )
  }

  updateMapWithCoords(coords, symbol) {
    this.map[coords[0]][coords[1]] = symbol;
  }

  tick() {
    return Promise.resolve()
      .then(() => this.isGameContinue())
      .then(() => {
        let pl = this.getPlayer();
        return pl.getMovement(this.map, pl.symbol)
          .then((coords) => {
            return [coords, pl.symbol]
          });
      })
      .then(([coords, symbol]) => this.updateMapWithCoords(coords, symbol))
      .then(() => this.redraw())
      .then(() => this.isGameContinue())
      .then(() => sleep(Math.random() * 5))
      .then(() => this.tick())
      .catch((reason) => this.onGameFinish(reason));
  }

  redraw(message = '', isGameFinished = false) {
    this.gameView.draw(
      this.map,
      [this.player1Coords, this.player2Coords],
      message,
      isGameFinished,
    )
  }
}

new Game(3, Bot1, Bot1, GameView);