function compileTemplate(template) {
  var output = function(el, data) {
    template = template.split(' ');
    template.forEach(function(word) {
      var tmp; 
      if(/{{.+}}/g.test(word)) {
        tmp = word.replace(/{{/g, '').replace(/}}/g, ''); 
        template[template.indexOf(word)] = data[tmp];
      }
    el.innerHTML = template.join(' ');
    });
  }
  return output; 
}

var template = '{{name}} is {{age}} years old'
var element = document.createElement('div');
var dataObj = { name: 'Bob', age: 33 }; 
compileTemplate(template)(element, dataObj);

//compileTemplate = (tpl) => (el, data)
//Компиляция шаблона возвращает функцию
//при передаче этой функции элемента и объекта с данными
//элемент получает разметку в соответсвии с tpl из data
//var tpl = "{{name}} is {{age}} years old";
//var el = document.compileElement('div');
//var template = compileTemplate(tpl);
//template(el, { name: 'Bob', age: 33 });
//el.innerHTML; // 'Bob is 33 years old'
