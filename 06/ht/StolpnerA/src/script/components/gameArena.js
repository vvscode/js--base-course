function GameArena(element, lvl, timer, width, height, Player, Enemy, eventBus) {
    this.canvas = element;
    this.lvl = lvl;
    this.timer = timer;
    this.ctx = this.canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.player = new Player(this.ctx);
    this.enemy = [];
    var level = 0;
    this.enemyInterval = setInterval(() => {
        this.enemy.push(new Enemy(this.ctx));
        level++;
        this.lvl.innerHTML = ` Level: ${level}`;
    }, 5000);
    this.eventBus = eventBus;

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
        clearInterval(this.enemyInterval);
        clearInterval(this.timer.timer);
        this.lvl.innerHTML += `<span style="color: red; font-weight: bold; font-size: 5em;"> THE END!!! Количество очков = ${this.timer.time}</span>`;
        this.eventBus.trigger('game:finish');
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
        this.enemy.map(item => {
            let newX = Math.abs(item.x - this.player.x);
            let newY = Math.abs(item.y - this.player.y);
            if (newX < 25  && newY < 25){
                this.stop()
            }
            item.newPos(this.width, this.height).update(this.ctx);
        });
    },
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
};

export default GameArena;