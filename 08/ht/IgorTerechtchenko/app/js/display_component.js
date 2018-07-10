export default function DisplayComponent(el, bus, type) {
  this.el = el;
  this.bus = bus; 
  this.type = type;
}

DisplayComponent.prototype.render = function(field) {
  this.el.innerHTML = '';
  if(this.type === 'text') {
    var table = document.createElement('table');
    var tb = '';
    for(var i = 0; i < field.length; i++) {
      tb += '<tr>';
      for(var j = 0; j < field[0].length; j ++) {
        if (field[i][j] == '_') {
          tb += ('<td class="' + i + ';' + j + '">' + '_' + '</td>');
        } else {
          tb += ('<td class="' + i + ';' + j + '">' + field[i][j] + '</td>');
        }
      }
      tb += '</tr>';
    }
    table.innerHTML = tb;
    this.el.appendChild(table);
  } 
  else if(this.type === 'canvas') {
    console.log('canvas');
  }
  else if(this.type === 'svg') {
    console.log('svg');
  }
}

DisplayComponent.prototype.addCellListeners = function() {
  var table = this.el.querySelector('table');
  if (this.type === 'text') {
    table.addEventListener('click', (event) => {
      this.bus.trigger('cellClick', event.target.className.split(';'));
    });
  }
};
