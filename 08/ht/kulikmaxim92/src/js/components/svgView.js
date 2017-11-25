const SVG_NS = 'http://www.w3.org/2000/svg';

class SvgView {
    constructor(options, state, eventBus) {
        this.options = options;
        this.eventBus = eventBus;
        this.state = state;
        this.init();
        this.render();
    }

    init() {
        this.svg = document.createElementNS(SVG_NS, 'svg');
        document.getElementById(this.options.container).appendChild(this.svg);

        this.subscribeToClick();
        this.subscribeToTick();        
    }

    render() {
        this.changeSvgSizeAccordingState();

        let $$ = this.options;
        this.svg.textContent = '';
        let rectangles = '';
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                if (this.state[i][j]) {
                    let x = j * $$.squareSize;
                    let y = i * $$.squareSize;

                    rectangles +=
                        `<rect x='${x}' y='${y}' width='${$$.squareSize}' height='${$$.squareSize}' class='svg-square'/>`;
                }
            }
        }

        this.svg.innerHTML += rectangles;
    }

    getCellByCoordinates(x, y) {
        return {
            row: Math.floor(y / this.options.squareSize),
            column: Math.floor(x / this.options.squareSize),
        }
    }

    changeSvgSizeAccordingState() {
        this.svg.setAttribute('width', this.state[0].length * this.options.squareSize);
        this.svg.setAttribute('height', this.state.length * this.options.squareSize);
    }

    subscribeToClick() {
        this.svg.addEventListener('click', (ev) =>
            this.eventBus.trigger('view:cellChanged', this.getCellByCoordinates(ev.offsetX, ev.offsetY)));
    }

    subscribeToTick() {
        this.eventBus.on('stateManager:stateChanged', (state) => {
            this.state = state;
            this.render();
        });
    }
}

export default SvgView;