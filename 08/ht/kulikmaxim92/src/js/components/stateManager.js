class StateManager {
    constructor(options, gameLife, eventBus) {
        this.options = options;
        this.gameLife = gameLife;
        this.eventBus = eventBus;
        this.container = document.getElementById(this.options.container);
        this.states = [];
        this.currentStateIndex = 0;

        this.render();

        this.eventBus.on('gameLife:tick', (state) => {
            this.states.push(state);
            console.log(this.states.length);
        });

        this.subscribeToClick();
    }

    play() {
        this.gameLife.start(10000);
    }

    stop() {
        this.gameLife.stop();
    }

    getPreviousState() {
        if (this.currentStateIndex > 0) {
            return this.states[--this.currentStateIndex];
        }

        return this.states[this.currentStateIndex];
    }

    getNextState() {
        if (this.currentStateIndex < this.states.length - 1) {
            return this.states[++this.currentStateIndex];
        }

        return this.states[this.currentStateIndex];
    }

    render() {
        let content = '<input type="button" value="<<"><input type="button" id="play" value="|>">' +
            '<input type="button" value=">>"><form></form>' +
            '<input type="range" min="100" max="10000" step="100" value="2000">';

        this.container.innerHTML = content;
    }

    subscribeToClick() {
        this.container.addEventListener('click', (ev) => {
            if (ev.target.matches('#play')) {
                this.play();
            }
        });
    }
}

export default StateManager;