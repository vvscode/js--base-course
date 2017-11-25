import GameLife from '../utils/gameLife';

class StateManager {
    constructor(options, eventBus, storage) {
        this.options = options;
        this.eventBus = eventBus;
        this.states = [];
        this.init();

        this.subscribeToChangeCell();
    }

    init() {
        this.container = document.getElementById(this.options.container);
        this.render();
        this.initGameState();

        this.subscribeToClick();
        this.subscribeToChangeSpeed();
        this.subscribeToChangeSize();
    }

    get currentState() {
        return this.states[this.stateIndex];
    }

    initGameState() {
        if (this.states.length) {
            return;
        }

        let state = [];
        for (var i = 0; i < this.options.height; i++) {
            state.push(Array(this.options.width).fill(false));
        }

        this.gameLife = new GameLife(state);
        this.states.push(state);
        this.stateIndex = this.states.length - 1;
    }

    start() {
        if (this.stateIndex !== this.states.length - 1) {
            this.gameLife.state = this.states[this.stateIndex];
            this.states.length = this.stateIndex + 1;
        }

        this.timer = setTimeout(() => {
            this.gameLife.tick();
            this.states.push(this.gameLife.state);
            this.eventBus.trigger('stateManager:stateChanged', this.gameLife.state);
            this.stateIndex = this.states.length - 1;

            this.start();
        }, this.options.speed.current);
    }

    stop() {
        clearTimeout(this.timer);
        this.timer = null;
    }

    render() {
        let $$ = this.options.speed;
        let content = 
        `<input type="button" value="<<" id="previous">
        <input type="button" id="play" value="|>">
        <input type="button" value=">>" id="next">
        <br><br>
        Width: <input type="number" data-size="width" value="${this.options.width}" step="1" min="0" max="30">
        Height: <input type="number" data-size="height" value="${this.options.height}" step="1" min="0" max="20">
        <br><br>
        Speed: <input type="range" id="speed" min="${$$.min}" max="${$$.max}" step="${$$.step}" value="${$$.current}"` +
        ` list="speed-values">`;

        this.container.innerHTML = content;
    }

    subscribeToClick() {
        this.container.addEventListener('click', (ev) => {
            if (ev.target.matches('#play')) {
                if (this.timer) {
                    this.stop();
                    ev.target.value = '|>';
                    document.getElementById('previous').disabled = false;
                    document.getElementById('next').disabled = false;
                } else {
                    this.start();
                    ev.target.value = '||';
                    document.getElementById('previous').disabled = true;
                    document.getElementById('next').disabled = true;
                }
            }

            if (ev.target.matches('#previous')) {
                let index = this.stateIndex > 0 ? --this.stateIndex : this.stateIndex;
                this.eventBus.trigger('stateManager:stateChanged', this.states[index]); 
            }

            if (ev.target.matches('#next')) {
                let index = this.stateIndex < this.states.length - 1 ? ++this.stateIndex : this.stateIndex;
                this.eventBus.trigger('stateManager:stateChanged', this.states[index]); 
            }
        });
    }

    subscribeToChangeSpeed() {
        this.container.addEventListener('change', (ev) => {
            if (ev.target.matches('input[type=range]')) {
                this.options.speed.current = ev.target.value;
            }
        });
    }

    subscribeToChangeSize() {
        this.container.addEventListener('input', (ev) => {
            if (ev.target.hasAttribute('data-size')) {
                if (ev.target.getAttribute('data-size') === 'height') {
                    this.options.height = +ev.target.value;
                } else{
                    this.options.width = +ev.target.value;
                } 

                this.changeStateSize();
            }
        }, true);
    }

    changeStateSize() {
        let state = this.states[this.stateIndex];
        state.length = this.options.height;

        for (var i = 0; i < this.options.height; i++) {
            if (!state[i]) {
                state[i] = Array(this.options.width).fill(false);
                continue;
            }

            state[i].length = this.options.width;
        }

        this.eventBus.trigger('stateManager:stateChanged', state);
    }

    subscribeToChangeCell() {
        this.eventBus.on('view:cellChanged', ({ row, column }) => {
            this.gameLife.state = this.states[this.stateIndex];
            this.gameLife.state[row][column] = !this.gameLife.state[row][column];
            this.eventBus.trigger('stateManager:stateChanged', this.gameLife.state);
        });
    }

}

export default StateManager;