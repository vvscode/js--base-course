function compileTemplate(template) {
  var output = function(el, data) {
    template = template.split(' ');
    template.forEach(function(word) {
      var tmp; 
      if(/{{.+}}/g.test(word)) {
        tmp = word.replace(/{{/g, '').replace(/}}/g, ''); 
        template[template.indexOf(word)] = template[template.indexOf(word)]
      }
    el.innerHTML = template.join(' ');
    });
  }
  return output; 
}
