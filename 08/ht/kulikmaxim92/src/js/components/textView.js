class TextView {
    constructor(options, eventBus) {
        this.options = options;
        this.eventBus = eventBus;
        this.container = document.getElementById(this.options.container);

        this.subscribeToTick();
    }

    render(state) {
        this.state = state;
        let content = this.state.map(
            (row) => row.map(
                (cell) => cell ? 'X' : ' ').join('')).join('\n');

        this.container.innerHTML = `<pre class='textView'>\n${content}\n</pre>`;
    }

    subscribeToClick() {
        this.container.addEventListener('click', (ev) => {
            let containerWidth = this.container.clientWidth;
            let containerHeight = this.container.clientHeight;

            let cellWidth = containerWidth / this.state.length;
            let cellHeigth = containerHeight / this.state[0].length;

            let x = ev.offsetX;
            let y = ev.offsetY;

            let cell = {
                row: Math.floor(x / cellWidth),
                column: Math.floor(y / cellHeigth),
            };

            this.eventBus.trigger('textView:cellChanged', cell);
        });
    }

    subscribeToTick() {
        this.eventBus.on('gameLife:tick', (state) => this.render(state));
    }
}

export default TextView;