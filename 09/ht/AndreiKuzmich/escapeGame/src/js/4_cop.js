
class Cop extends Person {
  constructor(x,y) {
    super();
    this.x = x;
    this.y = y;
    this.movement = this.movement.bind(this);
    this.movement2 = this.movement2.bind(this);
    this.movement3 = this.movement3.bind(this);
    this.movement4 = this.movement4.bind(this);
  }
  update() {
    super.update();
  }
  clear() {
    super.clear();
  }
  movement() {
    super.clear();
    this.move();
    super.update();
  }
  movement2() {
    super.clear();
    this.move2();
    super.update();
  }
  movement3() {
    super.clear();
    this.move3();
    super.update();
  }
  movement4(arr) {
    super.clear();
    this.move4(arr);
    super.update();
  }
  // первый вариант движения
  move() {
    this.sprite.src = 'pic/2__2.png';
    if (this.x === FIELD_WIDTH - this.width && this.y > 1) {
      this.y -= 1; this.sprite.src = 'pic/2__2.png';
    } else if (this.y === 1 && this.x < FIELD_WIDTH && this.x > 1) {
      this.x -= 1; this.sprite.src = 'pic/2__2.png';
    } else if (this.x === 1 && this.y < FIELD_HEIGHT - this.height) {
      this.y += 1; this.sprite.src = 'pic/2__1.png';
    } else {
      this.x += 1; this.sprite.src = 'pic/2__1.png';
    }
    super.fillSquareArray(copArray);
    super.compareArrays(copArray);
    super.fillHistoryArray(historyArray2);
  }
  // второй вариант движения
  move2() {
    this.x += 1;
    this.sprite.src = 'pic/2__1.png';
    if (this.x >= FIELD_WIDTH) this.x = -this.width;
    super.fillSquareArray(copArray3);
    super.compareArrays(copArray3);
    super.fillHistoryArray(historyArray1);
  }
  move3() {
    this.x += 1;
    this.y -= 1;
    this.sprite.src = 'pic/2__1.png';
    if (this.x >= FIELD_WIDTH) this.x = -this.width;
    if (this.y <= 0) this.y = FIELD_HEIGHT;
    super.fillSquareArray(copArray1);
    super.compareArrays(copArray1);
    super.fillHistoryArray(historyArray5);
  }
  move4(arr) {
    this.x -= 1;
    this.y += 1;
    this.sprite.src = 'pic/2__2.png';
    if (this.x >= FIELD_WIDTH) this.x = -this.width;
    if (this.y <= 0) this.y = FIELD_HEIGHT;
    super.fillSquareArray(copArray4);
    super.compareArrays(copArray4);
    super.fillHistoryArray(arr);
  }
}
