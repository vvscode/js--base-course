class Field {
  constructor(field, element) {
    this.field = field;
    this.element = element;
    this.drawPlain(this.field, this.element);
  }
  drawPlain(field, element) {
    let buffer = '';
    for (let y = 0; y < field.length; y++) {
      buffer += '\n';
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x]) {
          buffer += 'O';
        } else {
          buffer += 'X';
        }
      }
    }
    this.element.innerHTML = buffer;
  }
}

export { Field };
