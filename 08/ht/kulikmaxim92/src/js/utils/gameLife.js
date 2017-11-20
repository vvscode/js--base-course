class GameLife {
    constructor(options) {
        this.options = options;
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