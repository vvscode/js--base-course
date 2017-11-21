const SQUARE_SIZE = 20;

class CanvasView {
    constructor(options, eventBus) {
        this.options = options;
        this.eventBus = eventBus;

        this.container = document.createElement('div');
        document.getElementById(this.options.container).appendChild(this.container);
        this.subscribeToClick();

        this.init();

        this.eventBus.on('stateManager:tick', (state) => this.render(state));
    }

    init() {
        let canvas = document.createElement('canvas');
        canvas.width = this.options.width;
        canvas.height = this.options.height;

        this.container.appendChild(canvas);

        this.context = canvas.getContext('2d');
        this.context.strokeStyle = '#000000';
        this.context.fillStyle = '#FF0000';
    }

    render(state) {
        this.state = state;

        this.context.clearRect(0, 0, this.options.width, this.options.height);
        this.context.beginPath();
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j]) {

                    let pointX = j * SQUARE_SIZE;
                    let pointY = i * SQUARE_SIZE;

                    this.context.moveTo(pointX, pointY);
                    this.context.rect(pointX, pointY, SQUARE_SIZE, SQUARE_SIZE);
                    
                }
            }
        }
        this.context.stroke();
        this.context.fill();
    }

    getCellByCoordinates(x, y) {
        return {
            row: Math.floor(y / SQUARE_SIZE),
            column: Math.floor(x / SQUARE_SIZE),
        }
    }

    subscribeToClick() {
        this.container.addEventListener('click', (ev) => {
            if (!ev.target.matches('canvas')) {
                return;
            }

            this.eventBus.trigger('view:cellChanged', this.getCellByCoordinates(ev.offsetX, ev.offsetY));
        })
    }

}

export default CanvasView;