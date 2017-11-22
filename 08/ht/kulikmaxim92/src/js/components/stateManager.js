import GameLife from '../utils/gameLife';

class StateManager {
   constructor(options, eventBus) {
       this.options = options;
       this.eventBus = eventBus;
       this.container = document.getElementById(this.options.container);
       this.states = [];

       this.render();
       this.initGame();

       this.subscribeToClick();
       this.subscribeToChangeSpeed();
       this.subscribeToChangeSize();
       this.subscribeToChangeCell();
   }

   get currentState() {
       return this.states[this.currentStateIndex];
   }

   initGame() {
       let state = [];
       for (var i = 0; i < this.options.height; i++) {
           state.push(Array(this.options.width).fill(false));
       }

       this.gameLife = new GameLife(state);
       this.states.push(state);
       this.currentStateIndex = this.states.length - 1;
   }

   start() {
       this.timer = setTimeout(() => {
           if (this.currentStateIndex !== this.states.length - 1) {
               this.gameLife.state = this.states[this.currentStateIndex];
               this.states.length = this.currentStateIndex + 1;
           }

           this.gameLife.tick();
           this.states.push(this.gameLife.state);
           this.eventBus.trigger('stateManager:tick', this.gameLife.state); // should use array copy
           this.currentStateIndex = this.states.length - 1;
          
           this.start();
      }, this.options.speed);
   }

   stop() {
       clearTimeout(this.timer);
   }

   render() {
       let content = '<input type="button" value="<<" id="previous"><input type="button" id="play" value="|>">' +
           `<input type="button" value=">>" id="next"><input type="text" value="${this.options.width}" id="width">` +
           `<input type="text" value="${this.options.height}" id="height">` +
           `<input type="range" min="1000" max="10000" step="1000" value="${this.options.speed}">`; // todo: add configuration in options

       this.container.innerHTML = content;
   }

   subscribeToClick() {
       this.container.addEventListener('click', (ev) => {
           if (ev.target.matches('#play')) {
               if (this.timer) {
                   this.stop();
                   this.timer = null;
                   ev.target.value = '|>';
               } else {
                   this.start();
                   ev.target.value = '||';
               }
           }

           if (ev.target.matches('#previous')) {
               let index = this.currentStateIndex > 0 ? --this.currentStateIndex : this.currentStateIndex;
               this.eventBus.trigger('stateManager:tick', this.states[index]); // should use array copy
           }

           if (ev.target.matches('#next')) {
               let index = this.currentStateIndex < this.states.length - 1 ? ++this.currentStateIndex : this.currentStateIndex;
               this.eventBus.trigger('stateManager:tick', this.states[index]); // should use array copy
           }

       });
   }

   subscribeToChangeSpeed() {
       this.container.addEventListener('change', (ev) => {
           if (ev.target.matches('input[type=range]')) {
               this.options.speed = ev.target.value;
           }
       });
   }

   subscribeToChangeSize(){
       this.container.addEventListener('blur', (ev) => {
           if (ev.target.matches('#width')) {
               this.options.width = +ev.target.value;
               this.changeStateSize();
           }

           if (ev.target.matches('#height')) {
               this.options.height = +ev.target.value;
               this.changeStateSize();
           }
          
       }, true);
   }

   changeStateSize(){
       let state = this.states[this.currentStateIndex];
       state.length = this.options.height;

       for (var i = 0; i < this.options.height; i++) {
           if (!state[i]) {
               state[i] = Array(this.options.width).fill(false);
               continue;
           }

           state[i].length = this.options.width;           
       }

       this.eventBus.trigger('stateManager:tick', state); // should use array copy
   }

   subscribeToChangeCell() {
       this.eventBus.on('view:cellChanged', ({row, column}) => {
           let state = this.states[this.currentStateIndex];
           state[row][column] = !state[row][column];
           this.eventBus.trigger('stateManager:tick', state); // should use array copy
       });
   }
}

export default StateManager;