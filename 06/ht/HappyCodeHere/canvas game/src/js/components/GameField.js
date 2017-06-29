class GameField {
  constructor(element, width, height, Player, Enemy, eventBus, Enemy2, Bonus) {
    this.canvas = element;
    this.ctx = this.canvas.getContext('2d');

    this.eventBus = eventBus;

    this.height = height;
    this.width = width;

    this.person = new Player(this.ctx, 50, 50, 'orange', 50, 50, eventBus);
    this.enemy = [];
    this.enemy2 = [];
    this.bonus = [];

    this.enemyInterval = setInterval(() => {
      this.enemy.push(new Enemy(this.ctx, 40, 40, 'red', 10, 10, eventBus));
    }, 1500)

    this.enemyInterval2 = setInterval(() => {
      this.enemy2.push(new Enemy2(this.ctx, 50, 50, 'rgb(124, 103, 227)', 10, 10, eventBus));
    }, 2500)

    this.bonusInterval = setInterval(() => {
      this.bonus.push(new Bonus(this.ctx, 25, 25, 'rgb(173, 227, 103)', Math.round(Math.random() * this.width), Math.round(Math.random() * this.height), eventBus));
    }, 7000)

    this.start();
  }

  start() {
    this.canvas.height = this.height;
    this.canvas.width = this.width;

    this.eventBus.trigger('game:logger-clear');
    this.eventBus.trigger('game:logger', ['Game started! Good luck ;)', 'game-status']);

    let num = Math.floor(Math.random() * 5 + 1);
    this.image = document.querySelector('.ground-' + num);




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
    clearInterval(this.bonusInterval);
    this.eventBus.trigger('game:logger', ['Game has finished', 'game-status']);
    this.eventBus.trigger('game:finished');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateState() {
    this.clear();
    // console.log(this.enemy2);



    this.ctx.drawImage(this.image, 0, 0, this.width, this.height);

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

        if (this.person.hasPower) {
          const index = this.enemy.indexOf(item);
          this.enemy.splice(index, 1);
          return;
        }

        this.person.color === 'orange' ? this.person.color = 'purple' : null

        this.stop();

        if (this.person.color === 'purple') {
          this.person.color = 'green';
        } else {
          this.person.color = 'purple';
        }

      }
      item.newPos({}).update(this.ctx);
    });

    this.enemy2.map(item => {
      let distX = Math.abs(item.x - this.person.x);
      let distY = Math.abs(item.y - this.person.y);

      if (distX < 100 && distY < 100) {
        // item.color = 'rgb(201, 32, 73)';

        item.angry = true;

        item.newPos({
          newX: item.x - this.person.x + 3 > distX && !this.person.hasPower ? item.x -3 : item.x + 3,
          newY: item.y - this.person.y + 3 > distX && !this.person.hasPower ? item.y -3 : item.y + 3,
        });


      } else {
        // item.color = 'rgb(124, 103, 227)';
        item.angry = false;
        item.newPos({});
      }

      if (distX < 20 && distY < 20) {
        if (this.person.hasPower) {
          const index = this.enemy2.indexOf(item);
          this.enemy2.splice(index, 1);
          return;
        }


        this.person.color === 'orange' ? this.person.color = 'purple' : null

        this.stop();

        if (this.person.color === 'purple') {
          this.person.color = 'green';
        } else {
          this.person.color = 'purple';
        }

      }
      item.update(this.ctx);
    })


    this.bonus.map(item => {
      let distX = Math.abs(item.x - this.person.x);
      let distY = Math.abs(item.y - this.person.y);

      // console.log(distX);
      // console.log(distY);

      if (distX < 20 && distY < 20) {
        if (!this.person.hasPower) {
          this.person.power();
          this.eventBus.trigger('game:power');
        }

        const index = this.bonus.indexOf(item);
        this.bonus.splice(index, 1);
      }

      //   this.person.color === 'orange' ? this.person.color = 'purple' : null
      //
      //   this.stop();
      //
      //   if (this.person.color === 'purple') {
      //     this.person.color = 'green';
      //   } else {
      //     this.person.color = 'purple';
      //   }
      //
      // }
      item.newPos({}).update(this.ctx);
    });
  }


  // checkCoords(playerCoords, )
}

export default GameField;
