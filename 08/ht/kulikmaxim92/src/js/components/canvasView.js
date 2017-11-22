class CanvasView {
    constructor(options, eventBus) {
        this.options = options;
        this.eventBus = eventBus;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')
        document.getElementById(this.options.container).appendChild(this.canvas);
       
        this.subscribeToClick();
 
        this.eventBus.on('stateManager:tick', (state) => this.render(state));
    }
 
    render(state) {
        this.state = state;
        this.changeCanvasSizeAccordingState();
 
        this.context.clearRect(0, 0, this.options.width, this.options.height);
        this.context.beginPath();
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j]) {
 
                    let pointX = j * this.options.squareSize;
                    let pointY = i * this.options.squareSize;
 
                    this.context.moveTo(pointX, pointY);
                    this.context.rect(pointX, pointY, this.options.squareSize, this.options.squareSize);
                   
                }
            }
        }
        this.context.stroke();
        this.context.fill();
    }
 
    getCellByCoordinates(x, y) {
        return {
            row: Math.floor(y / this.options.squareSize),
            column: Math.floor(x / this.options.squareSize),
        }
    }
 
    changeCanvasSizeAccordingState() {
        this.canvas.width = this.state[0].length * this.options.squareSize;
        this.canvas.height = this.state.length * this.options.squareSize;
    }
 
    subscribeToClick() {
        this.canvas.addEventListener('click', (ev) =>
            this.eventBus.trigger('view:cellChanged', this.getCellByCoordinates(ev.offsetX, ev.offsetY)));
    }
 
}
 
export default CanvasView;