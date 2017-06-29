function GameArena(element, width, height, Player) {
    this.canvas = element;
    this.ctx = this.canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.player = new Player(this.ctx);

    //this.eventBus = eventBus;
    this.start();
}

GameArena.prototype = {
    start() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.interval = setInterval(this.updateState.bind(this), 20);
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            this.keys = (this.keys || []);
            this.keys[e.keyCode] = (e.type === 'keydown');
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = (e.type === 'keydown')
        });
    },
    stop() {
        clearInterval(this.interval);
    },
    updateState() {
        this.clear();
        this.player
            .newPos({
                right: this.keys && this.keys[68],
                left: this.keys && this.keys[65],
                up: this.keys && this.keys[87],
                down: this.keys && this.keys[83]
            }, this.width, this.height)
            .update(this.ctx);
    },
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
};

export default GameArena;