class Text {
  constructor (where) {
    this.elem = where;
  };
  create () {
    this.elem.innerHTML = `<pre id="text"></pre>`;
    this.pre = this.elem.querySelector(`#text`);
  };
  render (arr) {
    if (!arr) return;
    let str = ``;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (+arr[i][j] === 1) {
          str += `X`;
        } else {
          str += ` `;
          // str += `\u263A`;
        }
      }
      str += `\n`;
    }
    this.pre.innerText = str;
  };
  clear () {
    this.elem.innerHTML = ``;
  }
}

export{Text};
