class TextView {
    constructor(options, eventBus) {
        this.options = options;
        this.eventBus = eventBus;

        this.container = document.createElement('pre');
        this.container.className = 'textView';
        document.getElementById(this.options.container).appendChild(this.container);

        this.subscribeToTick();
        this.subscribeToClick();
    }

    render(state) {
        this.state = state;
        let content = this.state.map(
            (row) => row.map(
                (cell) => cell ? 'X' : 'O').join('')).join('\n');

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
        this.eventBus.on('stateManager:tick', (state) => this.render(state));
    }
}

export default TextView;