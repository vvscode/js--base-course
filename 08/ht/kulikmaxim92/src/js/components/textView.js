class TextView {
    constructor(options, eventBus) {
        this.options = options;
        this.eventBus = eventBus;
        this.container = document.getElementById(this.options.container);

        this.subscribeToTick();
        this.subscribeToClick();
    }

    render(state) {
        this.state = state;
        let content = this.state.map(
            (row) => row.map(
                (cell) => cell ? 'x' : 'o').join('')).join('\n');

        this.container.innerHTML = `<pre class='textView'>${content}</pre>`;
    }

    subscribeToClick() {
        this.container.addEventListener('click', (ev) => {
            if (!ev.target.matches('pre')) {
                return;
            }

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