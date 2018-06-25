function compileTemplate(template) {
  var output = function(el, data) {
    template = template.split(' ');
    template.forEach(function(word) {
      var currentIndex = template.indexOf(word); //readablity
      template[currentIndex] = word.replace(/\{\{(.+)\}\}/g, function(str, p1, offset, s) {
        return data[p1];
      }); 
    });
    el.innerHTML = template.join(' ');
  }
  return output; 
}
