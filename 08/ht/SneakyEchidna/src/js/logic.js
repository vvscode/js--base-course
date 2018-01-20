class GameOfLife {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.step;
    this.history = [];
    this.field = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
    ];
  }
  nextStep() {
    let nextField = JSON.parse(JSON.stringify(this.field));
    for (let y = 0; y < this.field.length; y++) {
      for (let x = 0; x < this.field[y].length; x++) {
        if (!this.field[y][x] && this.findNeighbours(this.field, x, y) === 3) {
          nextField[y][x] = 1;
        }
        if (
          this.field[y][x] &&
          (this.findNeighbours(this.field, x, y) < 2 ||
            this.findNeighbours(this.field, x, y) > 3)
        ) {
          nextField[y][x] = 0;
        }
      }
    }
    this.history.push(this.field);
    this.field = nextField;
  }
  findNeighbours(field, cellX, cellY) {
    let neighboursNumber = 0;
    for (let y = cellY - 1; y <= cellY + 1; y++) {
      if (!field[y]) continue;
      for (let x = cellX - 1; x <= cellX + 1; x++) {
        if (!field[y][x]) continue;
        if (y === cellY && x === cellX) continue;
        neighboursNumber++;
      }
    }
    return neighboursNumber;
  }
}
export { GameOfLife };
