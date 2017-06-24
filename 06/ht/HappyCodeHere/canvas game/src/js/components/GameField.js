class GameField {
  constructor(element, height, width, Player, Enemy, eventBus) {
    this.canvas = element;
    this.ctx = this.canvas.getContext('2d');

    this.eventBus = eventBus;

    this.height = height;
    this.width = width;

    this.person = new Player(this.ctx, 50, 50, 'orange', 50, 50);
    this.enemy = [];

    this.enemyInterval = setInterval(() => {
      this.enemy.push(new Enemy(this.ctx, 30, 30, 'red', 10, 10));
    }, 5000)

    this.start();
  }

  start() {
    this.canvas.height = this.height;
    this.canvas.width = this.width;

    this.frameNo = 0;
    this.interval = setInterval(this.updateState.bind(this), 20);
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.keys = (this.keys || []);
      this.keys[e.keyCode] = (e.type === "keydown");
    })
    window.addEventListener('keyup', (e) => {
      this.keys[e.keyCode] = (e.type === "keydown");
    })


    this.eventBus.trigger('game:start');
  }

  stop() {
    console.log('game stopped');
    clearInterval(this.interval);
    clearInterval(this.enemyInterval);
    this.eventBus.trigger('game:finished');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateState() {
    this.clear();

    this
      .person
      .newPos({
        right: this.keys && this.keys[39],
        left: this.keys && this.keys[37],
        up: this.keys && this.keys[38],
        down: this.keys && this.keys[40],
      })
      .update(this.ctx);

    this.enemy.map(item => {
      let distX = Math.abs(item.x - this.person.x);
      let distY = Math.abs(item.y - this.person.y);

      if (distX < 20 && distY < 20) {

        this.person.color === 'orange' ? this.person.color = 'purple' : null

        this.stop();

        if (this.person.color === 'purple') {
          this.person.color = 'green';
        } else {
          this.person.color = 'purple';
        }

      }
      item.newPos({}).update(this.ctx);
    })
  }


  // checkCoords(playerCoords, )
}

export default GameField;
