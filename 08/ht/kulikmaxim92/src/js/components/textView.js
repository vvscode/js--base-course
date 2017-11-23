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
                content += this.state[i][j] ? 'X' : ' ';
            }
            content += '\n';
        }
 
        this.container.innerHTML = content;
    }
 
    subscribeToClick() {
        this.container.addEventListener('click', (ev) => {
            let preWidth = ev.target.clientWidth;
            let preHeight = ev.target.clientHeight;
 
            let cellWidth = preWidth / this.state[0].length;
            let cellHeight = preHeight / this.state.length;
 
            let x = ev.offsetX;
            let y = ev.offsetY;
 
            this.eventBus.trigger('view:cellChanged', {
                row: Math.floor(y / cellHeight),
                column: Math.floor(x / cellWidth),
            });
        });
    }
 
    subscribeToTick() {
        this.eventBus.on('stateManager:stateChanged', (state) => {
            this.state = state;
            this.render();
        });
    }
}
 
export default TextView;