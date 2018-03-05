
class Char extends Person {
  constructor(x,y) {
    super();
    this.x = x;
    this.y = y;
    this.movement = this.movement.bind(this);
  }

  // движение игрока
  movement(e) {
    super.clear();
    this.move(e);
    super.update();
  }
  // управление игроком
  move(e) {
    switch (e.keyCode) {
      case 65: // если нажата клавиша 'a'
        this.x -= 2;
        this.sprite.src = 'pic/1__2.png';
        if (this.x < -this.width) this.x = FIELD_WIDTH;
        super.fillSquareArray(playerArray);
        super.fillHistoryArray(historyArray);
        break;
      case 87: // если нажата клавиша 'w'
        this.y -= 2;
        this.sprite.src = 'pic/1__1.png';
        if ((this.y + this.height) <= 0) this.y = FIELD_HEIGHT;
        super.fillSquareArray(playerArray);
        super.fillHistoryArray(historyArray);
        break;
      case 68: // если нажата клавиша 'd'
        this.x += 2;
        this.sprite.src = 'pic/1__1.png';
        if (this.x > FIELD_WIDTH) this.x = -this.width;
        super.fillSquareArray(playerArray);
        super.fillHistoryArray(historyArray);
        break;
      case 83: // если нажата клавиша 's'
        this.y += 2;
        this.sprite.src = 'pic/1__2.png';
        if (this.y >= FIELD_HEIGHT) this.y = -this.height;
        super.fillSquareArray(playerArray);
        super.fillHistoryArray(historyArray);
        break;
      default:
        e.preventDefault();
        return false;
    }
  }
}
