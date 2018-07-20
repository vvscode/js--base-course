export default function DisplayComponent(el, bus, type) {
  this.el = el;
  this.bus = bus; 
  this.type = type;
  this.displayWrapper = document.createElement('div');
  this.displayWrapper.className = 'displayWrapper';
  this.controlsWrapper = document.createElement('div');
  this.controlsWrapper.className = 'controlsWrapper';
  this.historyWrapper = document.createElement('div');
  this.historyWrapper.className = 'historyWrapper';
  this.fieldSizeWrapper = document.createElement('div');
  this.fieldSizeWrapper.className = 'fieldSizeWrapper';
  this.paused = true;
  this.el.appendChild(this.displayWrapper);
  this.el.appendChild(this.controlsWrapper);
  this.el.appendChild(this.historyWrapper);
  this.el.appendChild(this.fieldSizeWrapper);
  this.cellSide = 30;
}

DisplayComponent.prototype.render = function(field) {
  this.displayWrapper.innerHTML = '';
  if(this.type === 'text') {
    var table = document.createElement('table');
    var tb = '';
    for(var i = 0; i < field.length; i++) {
      tb += '<tr>';
      for(var j = 0; j < field[0].length; j ++) {
        if (field[i][j] == '_') {
          tb += ('<td class="' + i + ';' + j + '">' + ' ' + '</td>');
        } else {
          tb += ('<td class="' + i + ';' + j + '">' + field[i][j] + '</td>');
        }
      }
      tb += '</tr>';
    }
    table.innerHTML = tb;
    this.displayWrapper.appendChild(table);
  } 
  else if(this.type === 'canvas') {
    this.cellSide = 30;
    this.displayWrapper.innerHTML = '';
    var canvas = document.createElement('canvas');  
    canvas.width = field[0].length * this.cellSide;
    canvas.height = field.length * this.cellSide;
    var context = canvas.getContext('2d');
    context.fillStyle = 'rgb(200, 0, 0)';
    var currentX = 0;
    var currentY = 0;
    for(var i = 0; i < field.length; i++) {
      currentX = 0;
      for(var j = 0; j < field[0].length; j++) {
        if(field[i][j] == '*') {
          context.fillRect(currentX, currentY, this.cellSide, this.cellSide);
        }
        currentX += this.cellSide;
      }
      currentY += this.cellSide;
    }
    this.displayWrapper.appendChild(canvas);
  }
  else if(this.type === 'svg') {
    var SVG_NS  = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', field[0].length * this.cellSide);
    svg.setAttribute('height', field.length * this.cellSide);
    var wrapper = document.createElementNS(SVG_NS, 'rect');
    wrapper.setAttribute('class', 'wrapper');
    svg.appendChild(wrapper);

    document.body.appendChild(svg);

    svg.addEventListener('click', (ev) => {
      // var x = ev.offsetX; var y = ev.offsetY;
      var { offsetX:x , offsetY: y } = ev;
      var rect = `
        <rect 
          x="${x - SQUARE_SIZE/2}"
          y="${y - SQUARE_SIZE/2}"
          rx="${Math.floor(Math.random()*10)}"
          ry="${Math.floor(Math.random()*10)}" 
          width="${SQUARE_SIZE}"
          class="inner-square"
        />`;
      svg.innerHTML += rect;
    })
  }
  this.addCellListeners();
}

DisplayComponent.prototype.addCellListeners = function() {
  if (this.type === 'text') {
    var table = this.displayWrapper.querySelector('table');
    table.addEventListener('click', (event) => {
      if(event.target.tagName.toLowerCase() === 'td') {
        this.bus.trigger('cellClick', event.target.className.split(';'));
      }
    });
  }
  if (this.type === 'canvas') {
    var canvas = this.displayWrapper.querySelector('canvas');
    canvas.addEventListener('click', (event) => {
      var rect = canvas.getBoundingClientRect();
      var i = event.clientY - rect.top; 
      var j = event.clientX - rect.left;
      this.bus.trigger('cellClick', [Math.floor(i / this.cellSide), Math.floor(j / this.cellSide)]);
    });
  }
};

DisplayComponent.prototype.addControls = function() {
  this.controlsWrapper.innerHTML = '';
  var slowerButton = document.createElement('button');
  slowerButton.className = 'slowerButton';
  slowerButton.innerHTML = '|<<';
  var PPButton = document.createElement('button');
  if(this.paused === true) {
    PPButton.innerHTML = '>';
  } else {
    PPButton.innerHTML = '||';
  }
  PPButton.className = 'PPButton';
  var fasterButton = document.createElement('button');
  fasterButton.className = 'fasterButton';
  fasterButton.innerHTML = '>>|'
  this.controlsWrapper.className = ('controlsWrapper');
  this.controlsWrapper.appendChild(slowerButton);
  this.controlsWrapper.appendChild(PPButton);
  this.controlsWrapper.appendChild(fasterButton);
  this.controlsWrapper.addEventListener('click', (event) => {
    if(event.target.tagName.toLowerCase() === 'button') {
      if(event.target.className === 'slowerButton') {
        this.bus.trigger('slowerClick');
        return;
      }
      if(event.target.className === 'PPButton') {
        if(this.paused) {
          event.target.innerHTML = '||';
          this.paused = false;
          this.bus.trigger('switchClick');
        } else if(!this.paused) {
          event.target.innerHTML = '>';
          this.paused = true;
          this.bus.trigger('switchClick');
        }
        return;
      }
      if(event.target.className === 'fasterButton') {
        this.bus.trigger('fasterClick');
        return;
      }
    }
    this.bus.trigger('rerenderRequest');
  });
};

DisplayComponent.prototype.addHistory = function() {
  this.historyWrapper.innerHTML = '';
  var input = document.createElement('input');
  input.setAttribute('type', 'range');
  input.setAttribute('min', 0);
  input.setAttribute('max', this.bus.maxHistory);
  this.historyWrapper.appendChild(input);
  input.addEventListener('input', () => {
    this.bus.trigger('historyChange', input.value);
  });
}

DisplayComponent.prototype.addFieldSize = function() {
  this.fieldSizeWrapper.innerHTML = '';
  var selectX = document.createElement('select');
  selectX.innerHTML = `<option value="5"> 5 </option>
                       <option value="10"> 10 </option>
                       <option value="15"> 15 </option>`
  var selectY = document.createElement('select');
  selectY.innerHTML = `<option value="5"> 5 </option>
                       <option value="10"> 10 </option>
                       <option value="15"> 15 </option>`
  var button = document.createElement('button');
  button.innerHTML = 'create new field';
  this.fieldSizeWrapper.appendChild(selectX);
  this.fieldSizeWrapper.appendChild(selectY);
  this.fieldSizeWrapper.appendChild(button);
  button.addEventListener('click', () => {
    this.bus.trigger('fieldSizeChange', [+selectX.value, +selectY.value]);
  });
}
