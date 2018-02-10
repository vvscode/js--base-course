
var sprite1 = new Image();
sprite1.src = 'pic/1__1.png';

var playerArray = [],
  copArray = [],
  copArray1 = [],
  copArray2 = [],
  copArray3 = [],
  copArray4 = [],
  historyArray = [],
  historyArray1 = [],
  historyArray2 = [],
  historyArray3 = [],
  historyArray4 = [],
  historyArray5 = [],
  historyArray6 = [],
  historyArray7 = [],
  historyArray8 = [],
  scoresArray = [];
class Person {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 31;
    this.height = 68;
    this.sprite = new Image();
    this.spriteStart = 0;
    this.ctx = document.querySelector('canvas').getContext('2d');
    this.i = 0;
    this.duration = '';
    this.backPlay = this.showLastGame.bind(this);
  }
  // начальное отображение игрока
  startPosition() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.drawImage(sprite1,0,0,this.width,this.height,0,0,this.width,this.height);
    this.ctx.restore();
  }

  // массив с координатами движения персрнажа
  fillHistoryArray(arr) {
    var obj = {};
    obj.x = this.x;
    obj.y = this.y;
    arr.unshift(obj);
  }

  // воспроизведение последней игры
  showLastGame(arr,pic1,pic2) {
    if (this.i < arr.length - 1) {
      this.i += 1;
      this.clear();
      this.x = arr[this.i].x;
      this.y = arr[this.i].y;
      if (this.x < arr[this.i - 1].x) {
        this.sprite.src = pic1;
      } else {
        this.sprite.src = pic2;
      }
      this.update();
    }
    if (this.i === historyArray.length - 1) {
      this.clearIntervals();
      this.deleteCanvas();
      $('#content').show();
      this.i = 0;
    }
  }

  get xPix() {
    return this.x + this.width;
  }
  get yPix() {
    return this.y + this.height;
  }
  // массив с координатами всей площади персонажа
  fillSquareArray(arr) {
    arr.splice(0);
    for (var i = this.x; i <= this.xPix; i += 3) {
      for (var j = this.y; j <= this.yPix; j += 3) {
        var obj = {};
        obj.x = i;
        obj.y = j;
        arr.push(obj);
      }
    }
  }

  // сравнение объектов
  isEqualObjects(a,b) {
    return (JSON.stringify(a) === JSON.stringify(b));
  }
  // сравнение массивов с координатами всей площади персонажа
  compareArrays(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < playerArray.length; j++) {
        if (this.isEqualObjects(arr[i], playerArray[j])) {
          this.gameOver();
          playerArray.fill(0);
        }
      }
      break;
    }
  }
  deleteCanvas() {
    this.ctx.clearRect(0,0, FIELD_WIDTH, FIELD_HEIGHT);
    let canvas = document.querySelector('canvas');
    document.body.removeChild(canvas);
  }
  gameOver() {
    audio.pause();
    endDate = new Date().getTime();
    this.duration = Math.round((endDate - startDate) * 0.001);
    let myPrompt = prompt(`Duration of game: ${this.duration} secs.You are busted. Your name?, ''`);
    this.showListOfScores(myPrompt);
    this.clearTimeouts();
    this.clearIntervals();
    this.deleteCanvas();
    $('#content').show();
  }
  /* gameOverBlock(param) {
    let block = document.createElement('div');
    block.id = 'gameOver';
    document.body.appendChild(block);
    let input = `<div>GAME OVER</div><p>Duration of game: ${param} secs.You are busted. Your name?</p><br/><input id="input" type = "text"><button id = "endBtn">OK</butoon>`;
    block.innerHTML = input;
    $('#input').on('change',() => {
      $('#gameOver').hide();
      $('#content').show();
    });
  } */
  clearIntervals() {
    for (var key in intervals) {
      clearInterval(intervals[key]);
    }
  }
  clearTimeouts() {
    for (var key in intervals) {
      clearTimeout(timeouts[key]);
    }
  }
  // вывод списка игравших
  showListOfScores(name) {
    var text = `<div class = "list"><b>Player:</b> ${name}, <b>time:</b> ${this.duration} seconds</div>`;
    scoresArray.unshift(text);
    document.querySelector('#scoresList').innerHTML = scoresArray.join('');
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
  }

  tick() {
    this.spriteStart = (this.spriteStart === 527 ? 0 : this.spriteStart + this.width);
    this.ctx.drawImage(this.sprite,this.spriteStart,0,this.width,this.height,0,0,this.width,this.height);
  }

  update() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.tick();
    this.ctx.restore();
    return this;
  }
}

