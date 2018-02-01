// compileTemplate = (tpl) => (el, data)
// Компиляция шаблона возвращает функцию
// при передаче этой функции элемента и объекта с данными
// элемент получает разметку в соответсвии с tpl из data
// let tpl = "{{name}} is {{age}} years old";
// let el = document.createElement('div');
// let template = compileTemplate(tpl);
// template(el, { name: 'Bob', age: 33 });
// el.innerHTML; // 'Bob is 33 years old
/**
 *  @param {string} tpl
 *  @return {function}
 */
function compileTemplate(tpl) {
  let regexp = /{{(\w+)}}/g;
  return function(el, data) {
    let str = tpl;
    let match;
    while ((match = regexp.exec(tpl)) !== null) {
      str = str.replace(match[0], data[match[1]]);
    }
    console.log(str);
    el.innerHTML = str;
  };
}
