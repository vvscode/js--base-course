function compileTemplate (tpl) {
  return function (el, data) {
    let result = tpl.replace(/{{.*?}}/g, function (str) {
      let match = str.match(/{{(.*?)}}/)[1];
      return data[match];
    });
    el.innerHTML += result;
  };
};

function Obj (a, b, c, d) {
  this.name = a;
  this.lastName = b;
  this.age = c;
  this.sex = d;
}

let tpl = `<p>Имя: {{name}}</p><p>Фамилия: {{lastName}}</p><p>Возраст: {{age}}</p><p>Пол: {{sex}}</p>`;

let template = compileTemplate(tpl);
template(document.querySelector(`.div1`), new Obj(`Сергей`, `Ермоленко`, 30, `мужской`));
template(document.querySelector(`.div2`), new Obj(`Петя`, `Подкрадулькин`, 130, `мужской`));
