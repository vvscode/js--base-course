export default function DisplayComponent(el, bus) {
  this.el = el;
  this.bus = bus; 
  this.type = 'text';
}

DisplayComponent.prototype.render = function(field) {
  if(this.type === 'text') {
    field.forEach(function(line) {
      line.forEach(function(cell) {
        this.el.innerHTML += cell;
      });
      this.el.innerHTML += '</br>';
    });
    return;
  } 
  else if(this.type === 'canvas') {
    console.log('canvas');
  }
  else if(this.type === 'svg') {
    console.log('svg');
  }
}
