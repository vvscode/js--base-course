class StateManager {
    constructor(options, gameLife, eventBus) {
        this.options = options;
        this.gameLife = gameLife;
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
        this.gameLife.state = [];
        for (var i = 0; i < this.options.heigth; i++) {
            this.gameLife.state.push(Array(this.options.width).fill(false));
        }

        this.states.push(this.gameLife.state);
        this.currentStateIndex = this.states.length - 1;
    }

    start() {
        this.timer = setTimeout(() => {
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
            `<input type="button" value=">>" id="next"><form><input type="text" value="${this.options.width}" name="width">` +
            `<input type="text" value="${this.options.heigth}" name="heigth"></form>` +
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
        let form = this.container.getElementsByTagName('form')[0];
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.options.width = form.width.value;
            this.options.heigth = form.heigth.value;
        });
    }

    subscribeToChangeCell() {
        this.eventBus.on('view:cellChanged', ({row, column}) => {
            this.gameLife.state[row][column] = !this.gameLife.state[row][column];
            this.eventBus.trigger('stateManager:tick', this.gameLife.state); // should use array copy
        });
    }
}

export default StateManager;