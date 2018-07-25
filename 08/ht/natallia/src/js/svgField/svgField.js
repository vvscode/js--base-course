import { eventBus } from '../index';

export default class SvgField {
  constructor(state, htmlEl) {
    this.SIZE_CELL = state.SIZE_CELL;
    this.arr = state[state.count];
    this.htmlEl = htmlEl;

    eventBus.on('field: drawGameField', param => {
      this.arr = param.arr;
      this.SIZE_CELL = param.SIZE_CELL;
      this.htmlEl = param.htmlEl;
      this.drawSvgField();
    });

    eventBus.trigger('field: drawGameField', {
      arr: this.arr,
      SIZE_CELL: this.SIZE_CELL,
      htmlEl: this.htmlEl
    });
  }

  drawSvgField() {
    const SVG_NS = 'http://www.w3.org/2000/svg';

    if (document.querySelector('#game-field').childNodes.length) {
      this.field = document.querySelector('#field');
      this.field.innerHTML = '';
    } else {
      this.field = document.createElementNS(SVG_NS, 'svg');
			this.field.classList.add('svg-field');
      this.field.id = 'field';
      this.htmlEl.appendChild(this.field);
    }

    this.fieldWrap = document.createElementNS(SVG_NS, 'rect');
    this.fieldWrap.classList.add('svg-field__rect');
    this.field.appendChild(this.fieldWrap);
    this.field.setAttribute('width', this.arr[0].length * this.SIZE_CELL);
    this.field.setAttribute('height', this.arr.length * this.SIZE_CELL);

    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        if (this.arr[i][j]) {
          let figure = `<image href="img/tongue-out.svg" x="${this
            .SIZE_CELL * j}" y="${this.SIZE_CELL * i}" height="${
            this.SIZE_CELL
          }" width="${this.SIZE_CELL}"/>`;
          this.field.innerHTML += figure;
        }
      }
    }
  }
}
