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
    arr.map((elem) => {
      elem.map(num => {str+= +num ? `X` : ` `});
      str += `\n`;
    });
    this.pre.innerText = str;
  };
  clear () {
    this.elem.innerHTML = ``;
  }
}

export{Text};
