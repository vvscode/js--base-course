var historyArr = [];
var currentHistoryArrLength;
class Life {
  constructor(x,y) {
    this.x = document.querySelector('#numberX').value;
    this.y = document.querySelector('#numberY').value;
    this.arr = new Array(x).fill(1).map(() => new Array(y));
    this.newArr = new Array(x).fill(1).map(() => new Array(y));

    this.render();
  }
  render() {
    this.drawGameTable();
    this.fillArray(this.arr);
    this.fillArray(this.newArr);
    this.fillTable(this.arr);
  }

  // рисует таблицу
  drawGameTable() {
    const game = document.querySelector('#tableDiv');
    const table = document.createElement('table');
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        const td = document.createElement('td');
        td.className = `col_${i}`;
        td.className += `__row_${j}`;
        table.appendChild(td);
      }
      const tr = document.createElement('tr');
      table.appendChild(tr);
    }
    game.appendChild(table);
  }
  // заполняет массив
  fillArray(arr) {
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        arr[i][j] = 0;
      }
    }
  }
  // заполняет таблицу
  fillTable(arr) {
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        var cell = document.querySelector(`.col_${i}__row_${j}`);
        cell.innerHTML = arr[i][j];
        if (arr[i][j] === 1) {
          cell.style.backgroundColor = 'green';
          cell.style.color = 'green';
        } else {
          cell.style.backgroundColor = 'white';
          cell.style.color = 'white';
        }
      }
    }
  }
  // история
  goBack() {
    this.fillTable(historyArr[currentHistoryArrLength - 2]);
    if (currentHistoryArrLength > 2)currentHistoryArrLength -= 1;
  }
  goForward() {
    this.fillTable(historyArr[currentHistoryArrLength - 1]);
    if (currentHistoryArrLength < historyArr.length)currentHistoryArrLength += 1;
  }
  // меняет значение клетки
  makeAliveOrDead(tdValue) {
    const arr1 = tdValue.className.split('__');
    const row = arr1[0].split('_');
    const col = arr1[1].split('_');
    const i = row[row.length - 1];
    const j = col[col.length - 1];

    if (this.arr[i][j] === 0) {
      this.arr[i][j] = 1;
    } else {
      this.arr[i][j] = 0;
    }
    this.fillTable(this.arr);
  }

  // определяет количество живых клеток рядом
  isAliveNeighbors(arr, cellX, cellY) {
    let numberOfAliveNeghbors = 0;
    for (let x = (cellX - 1); x <= (cellX + 1); x++) {
      if (!arr[x]) continue;
      for (let y = (cellY - 1); y <= (cellY + 1); y++) {
        if (!arr[x][y]) continue;
        if (x === cellX && y === cellY) continue;
        numberOfAliveNeghbors += arr[x][y];
      }
    }

    return (numberOfAliveNeghbors);
  }
  // новое состояние игры
  newState() {
    for (let x = 0; x < this.x; x++) {
      for (let y = 0; y < this.y; y++) {
        if (!this.arr[x][y] && this.isAliveNeighbors(this.arr, x, y) === 3) {
          this.newArr[x][y] = 1;
        }
        if (this.arr[x][y] && this.isAliveNeighbors(this.arr, x, y) === 2) {
          this.newArr[x][y] = 1;
        }

        if (this.arr[x][y] && (this.isAliveNeighbors(this.arr, x, y) < 2 ||
              this.isAliveNeighbors(this.arr, x, y) > 3)) {
          this.newArr[x][y] = 0;
        }
      }
    }


    this.fillTable(this.newArr);
    this.arr = JSON.parse(JSON.stringify(this.newArr));
    historyArr.push(this.arr);
    currentHistoryArrLength = historyArr.length;
    console.log('processs');
  }

  //
}





