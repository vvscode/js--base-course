import { eventBus } from '../index';

export default class TextField {
  constructor(state, htmlEl) {
    this.SIZE_CELL = state.SIZE_CELL;
    this.arr = state[state.count];
    this.htmlEl = htmlEl;

    eventBus.on('field: drawGameField', param => {
      this.arr = param.arr;
      this.SIZE_CELL = param.SIZE_CELL;
      this.htmlEl = param.htmlEl;
      this.drawTextField();
    });

    eventBus.trigger('field: drawGameField', {
      arr: this.arr,
      SIZE_CELL: this.SIZE_CELL,
      htmlEl: this.htmlEl
    });
  }

  drawTextField() {
    this.field = '';
    if (!document.querySelector('pre')) {
      var pre = document.createElement('pre');
      this.htmlEl.appendChild(pre);
      pre.classList.add('text-field');
    } else {
      pre = document.querySelector('pre');
    }
    pre.style.fontSize = this.SIZE_CELL / 4.2 + 'vh';

    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        this.field += this.arr[i][j] ? 'x' : ' ';
      }
      this.field += '\n';
    }
    pre.innerHTML = this.field;
  }
}
