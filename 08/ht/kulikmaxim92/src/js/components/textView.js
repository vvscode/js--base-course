class TextView {
    constructor(options, state, eventBus) {
        this.options = options;
        this.eventBus = eventBus;
        this.state = state;
        this.init();
        this.render();
    }

    init(){
        this.container = document.createElement('pre');
        this.container.className = 'textView';
        document.getElementById(this.options.container).appendChild(this.container);

        this.subscribeToTick();
        this.subscribeToClick();
    }
 
    render() {
        let content = '';
        for (var i = 0; i < this.state.length; i++) {
            for (var j = 0; j < this.state[i].length; j++) {
                content += this.state[i][j] ? 'X' : 'O';
            }
            content += '\n';
        }
 
        this.container.innerHTML = content;
    }
 
    subscribeToClick() {
        this.container.addEventListener('click', (ev) => {
            let preWidth = ev.target.clientWidth;
            let preHeight = ev.target.clientHeight;
 
            let cellWidth = preWidth / this.state.length;
            let cellHeigth = preHeight / this.state[0].length;
 
            let x = ev.offsetX;
            let y = ev.offsetY;
 
            let cell = {
                row: Math.floor(y / cellWidth),
                column: Math.floor(x / cellHeigth),
            }
 
            this.eventBus.trigger('view:cellChanged', cell);
        });
    }
 
    subscribeToTick() {
        this.eventBus.on('stateManager:tick', (state) => {
            this.state = state;
            this.render();
        });
    }
}
 
export default TextView;