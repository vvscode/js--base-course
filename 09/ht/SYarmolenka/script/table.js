export class Table {
  constructor (arr, cb) {
    this.list = arr;
    this.play = cb;
    this.create();
  }
  create () {
    let main = document.querySelector(`main`);
    main.innerHTML = `
    <table id="winners">
      <thead>
        <tr>
          <th colspan="2">Best results</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>`;
    this.table = main.querySelector(`table`);
    let str = ``;
    this.list.forEach((obj, i) => {
      if (i === 0) {
        str += `<tr><td>${obj.name}</td><td>${Math.round(obj.time / 1000)} s</td><td id="click">&#9658;</td></tr>`;
      } else {
        str += `<tr><td>${obj.name}</td><td>${Math.round(obj.time / 1000)} s</td></tr>`;
      }
    });
    let tbody = main.querySelector(`tbody`);
    tbody.innerHTML = str;
    let click = this.table.querySelector(`#click`);
    if (click !== null) click.onclick = this.play;
  };
};
