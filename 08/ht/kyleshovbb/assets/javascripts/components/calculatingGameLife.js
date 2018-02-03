'use strict';

class CalculatingGameLife {
    constructor(line, column) {
        this.gameLineNumbew = line || 40;
        this.gameColumnNumbew = column || 40;
        this.gameLifeArray = this.createGameArray(line, column);
        this.contain = document.querySelector('#contain');
        this.gameSpeed = document.querySelector("#rangeGameSpeed");
        if (this.stageHistory) {
            this.stageHistory.push(this.gameLifeArray);
        } else {
            this.stageHistory = [];
            this.stageHistory.push(this.gameLifeArray);
        }
        this.subscribeToClickOnArray();
        this.playState = true;
        this.currentArrayIndex = this.stageHistory.length - 1;
    }

    subscribeToClickOnArray() {
        this.wrapperClickOnArray = this.clickOnArray.bind(this);
        this.contain.addEventListener('click', this.wrapperClickOnArray);
    }

    clickOnArray(ev) {
        let height = this.contain.clientHeight;
        let width = this.contain.clientWidth;
        let x = ev.offsetX;
        let y = ev.offsetY;
        let rowHeight = height / this.gameLineNumbew;
        let cellWidth = width / this.gameColumnNumbew;
        let offsetX = Math.floor(x / cellWidth);
        let offsetY = Math.floor(y / rowHeight);
        let cell = this.stageHistory[this.currentArrayIndex][offsetY][offsetX];
        if (cell) {
            this.stageHistory[this.currentArrayIndex][offsetY][offsetX] = 0;
        } else this.stageHistory[this.currentArrayIndex][offsetY][offsetX] = 1;
        this.stageHistory.splice(this.currentArrayIndex + 1);
        this.eventBus.trigger('view', this);
    }

    createGameArray(line, column) {
        let array = [];
        for (let i = 0; i < line; ++i) {
            let newRow = [];
            for (let j = 0; j < column; ++j) {
                newRow.push(0);
            }
            array.push(newRow);
        }

        return this.addToArrayFixedItem(array);
    }

    addToArrayFixedItem(array){
        let centerColumn = Math.round(array[0].length / 2);
        let centerLine = Math.round(array.length / 2);

        array[centerLine][centerColumn] = 1;
        array[centerLine - 1][centerColumn] = 1;
        array[centerLine + 1][centerColumn] = 1;
        array[centerLine + 1][centerColumn] = 1;
        array[centerLine + 1][centerColumn + 1] = 1;

        return array;
    }

    startCalculate() {
        if (this.stageHistory.length) {
            let currentLifeStage = this.stageHistory[this.currentArrayIndex];
            this.calculateGameLife(currentLifeStage);
        }
        this.currentArrayIndex = this.stageHistory.length - 1;
    }

    calculateGameLife(stageLife) {
        let newStageOfLife = [];
        for (let i = 0; i < this.gameLineNumbew; ++i) {
            let newRowOnStageOfLife = [];
            for (let j = 0; j < this.gameColumnNumbew; ++j) {
                let adjacentElementLength = this.getAdjacentElementLength(i, j, stageLife);
                if (adjacentElementLength === 3 && !stageLife[i][j]) {
                    newRowOnStageOfLife.push(1);
                } else if (adjacentElementLength === 2 || (adjacentElementLength === 3 && stageLife[i][j])) {
                    newRowOnStageOfLife.push(stageLife[i][j]);
                } else if (adjacentElementLength < 2 || adjacentElementLength > 3) {
                    newRowOnStageOfLife.push(0);
                }
            }
            newStageOfLife.push(newRowOnStageOfLife);
        }
        this.stageHistory.splice(this.currentArrayIndex + 1);
        this.stageHistory.push(newStageOfLife);
    }

    getAdjacentElementLength(horizontalNumber, verticalNumber, stageLife) {
        let count = 0;
        for (let i = horizontalNumber - 1; i <= horizontalNumber + 1; ++i) {
            for (let j = verticalNumber - 1; j <= verticalNumber + 1; ++j) {
                if (i === horizontalNumber && j === verticalNumber) continue;
                if (!(i < 0 || j < 0 || i > this.gameLineNumbew - 1 || j > this.gameColumnNumbew - 1) &&
                    stageLife[i][j] === 1)
                    ++count;
            }
        }
        return count;
    }

    repeatGame() {
        setTimeout(() => {
            if (this.playState) {
                this.startCalculate(this.stageHistory);
                this.eventBus.trigger('view', this);
                this.repeatGame();
            } else if (!this.playState) {
                clearTimeout();
            }
        }, +this.gameSpeed.value * 100);
    }
}

export default CalculatingGameLife;