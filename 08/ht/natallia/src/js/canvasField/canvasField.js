import { eventBus } from '../index';

export default class CanvasField {
  constructor(state, htmlEl) {
    this.SIZE_CELL = state.SIZE_CELL;
    this.arr = state[state.count];
    this.htmlEl = htmlEl;

    eventBus.on('field: drawGameField', param => {
      this.arr = param.arr;
      this.SIZE_CELL = param.SIZE_CELL;
      this.htmlEl = param.htmlEl;
      this.drawCanvasField();
    });

    eventBus.trigger('field: drawGameField', {
      arr: this.arr,
      SIZE_CELL: this.SIZE_CELL,
      htmlEl: this.htmlEl
    });
  }

  drawCanvasField() {
    if (!document.querySelector('#canvas')) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'canvas';
      this.canvas.classList.add('canvas-field');
    } else {
      this.canvas = document.querySelector('#canvas');
    }
    this.ctx = this.canvas.getContext('2d');
    this.htmlEl.appendChild(this.canvas);
    this.canvas.width = this.SIZE_CELL * this.arr[0].length;
    this.canvas.height = this.SIZE_CELL * this.arr.length;
    this.canvas.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    var img = new Image();
    drawPict(this.arr, this.ctx, this.SIZE_CELL);

    function drawPict(arr, ctx, sizeCell) {
      img.addEventListener(
        'load',
        function() {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              if (arr[i][j]) {
                let x = j * sizeCell;
                let y = i * sizeCell;

                ctx.drawImage(img, x, y, sizeCell, sizeCell);
              } else {
                ctx.stroke();
              }
            }
          }
        },
        false
      );
      img.src = 'img/smile.png';
    }
  }
}
