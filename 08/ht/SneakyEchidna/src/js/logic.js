class GameOfLife {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.step;
    this.history = [];
    this.field = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];
  }
  nextStep() {
    let nextField = this.createArray();
    for (let y = 0; y < this.field.length; y++) {
      for (let x = 0; x < this.field[y].length; x++) {
        console.log(this.field[y][x], this.findNeighbours(this.field, x, y));
        if (!this.field[y][x] && this.findNeighbours(this.field, x, y) === 3) {
          nextField[y][x] = 1;
          continue;
        }
        if (
          this.field[y][x] &&
          (this.findNeighbours(this.field, x, y) < 2 ||
            this.findNeighbours(this.field, x, y) > 3)
        ) {
          nextField[y][x] = 0;
          continue;
        }
        nextField[y][x] = 1;
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

  createArray() {
    let arr = [];
    for (let i = 0; i < this.height; i++) {
      arr[i] = [];
    }
    console.log(arr);
    return arr;
  }
}
export { GameOfLife };
