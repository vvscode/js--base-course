
class SecondLevelCop extends Person {
  constructor(x,y) {
    super();
    this.x = x;
    this.y = y;
    this.newX = '';
    this.newY = '';
    this.movement = this.movement.bind(this);
    this.movement2 = this.movement2.bind(this);
  }

  movement(arr) {
    super.clear();
    this.startMove(arr);
    super.update();
  }
  movement2(arr) {
    super.clear();
    this.startMove2(arr);
    super.update();
  }
  startMove(arr) {
    super.fillSquareArray(copArray2);
    this.chooseDirection();
    super.compareArrays(copArray2);
    super.fillHistoryArray(arr);
  }
  startMove2(arr) {
    super.fillSquareArray(copArray2);
    this.chooseDirection2();
    super.compareArrays(copArray2);
    super.fillHistoryArray(arr);
  }
  chooseDirection() {
    if (this.findDistance() < 250) {
      this.changeDirection();
    } else {
      this.sprite.src = 'pic/3__2.png';
      this.x -= 1;
      if (this.x + this.width <= 0) this.x = FIELD_WIDTH;
    }
  }
  chooseDirection2() {
    if (this.findDistance() < 250) {
      this.changeDirection();
    } else {
      this.sprite.src = 'pic/3__1.png';
      this.x += 1;
      if (this.x > FIELD_WIDTH) this.x = -this.width;
    }
  }
  changeDirection() {
    var diffX = playerArray[0].x - copArray2[0].x;
    var diffY = playerArray[0].y - copArray2[0].y;

    if (diffX < 0) {
      this.newX = copArray2[0].x - 1;
      this.sprite.src = 'pic/3__2.png';
    }
    if (diffX > 0) {
      this.newX = copArray2[0].x + 1;
      this.sprite.src = 'pic/3__1.png';
    }
    if (diffY < 0 && diffX > 0) {
      this.newY = copArray2[0].y - 1;
      this.sprite.src = 'pic/3__1.png';
    }
    if (diffY > 0 && diffX > 0) {
      this.newY = copArray2[0].y + 1;
      this.sprite.src = 'pic/3__1.png';
    }
    if (diffY < 0 && diffX <= 0) {
      this.newY = copArray2[0].y - 1;
      this.sprite.src = 'pic/3__2.png';
    }
    if (diffY > 0 && diffX <= 0) {
      this.newY = copArray2[0].y + 1;
      this.sprite.src = 'pic/3__2.png';
    }

    this.x = this.newX;
    this.y = this.newY;
  }
  // определение расстояния от копа до игрока
  findDistance() {
    var a = Math.abs(playerArray[0].x - copArray2[0].x);
    var b = Math.abs(playerArray[0].y - copArray2[0].y);
    var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return Math.round(distance);
  }
}

