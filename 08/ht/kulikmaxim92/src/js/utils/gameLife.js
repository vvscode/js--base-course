class GameLife {
    constructor(options, eventBus) {
        this.options = options;
        this.eventBus = eventBus;
        this.state = [
            [0, 1, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1],
        ];
    }

    start(interval=1000) {
        this.timer = setTimeout(() => {
            this.state = this.tick();
            this.eventBus.trigger('gameLife:tick', this.state); // should use array copy
            this.start(interval);
        }, interval);
    }

    stop() {
        clearTimeout(this.timer);
    }

    tick() {
        return this.state.map(
            (row, i) => {
                return row.map(
                    (cell, j) => {
                        return +this.isAlive(i, j);
                    });
            });
    }

    isAlive(row, col) {
        let counter = 0;

        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i !== j && this.state[i] && this.state[i][j]) {
                    counter++;
                }
            }
        }

        if (this.state[row][col]) {
            return counter === 2 || counter === 3;
        }

        return counter === 3;
    }
}

export default GameLife;


// let game = new GameLife({interval: 1000});

// game.start(1000);
// let timer = setTimeout(() => game.stop(), 10000);
// let timer2 = setTimeout(() => {
// console.log('info ' + game.options.interval);
// game.options.interval = 2000;
// }, 5000);
