'use strict';

class WriteCanvasGameLife {
    constructor(gameLife){
        this.canvas = document.createElement("canvas");
        this.gameLife = gameLife;
        this.SQUARE_SIZE = 8;
        this.startWriteGame();
    }

    startWriteGame() {
        this.writeGame(this.gameLife.stageHistory[this.gameLife.currentArrayIndex],this.pre);
        window.location.hash = `Canvas&gameState=${this.gameLife.currentArrayIndex + 1}`;
    }

    writeGame(lastLifeStage) {
        let verticalLength = lastLifeStage.length,
            horizontalLength = lastLifeStage[0].length;

        this.canvas.height = verticalLength * 11;
        this.canvas.width = horizontalLength * 11;

        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        let y = 0;
        for (let i = 0; i < verticalLength; ++i) {
            let x = 0;
            for (let j = 0; j < horizontalLength; ++j) {
                if (lastLifeStage[i][j]){
                    ctx.rect(x, y, this.SQUARE_SIZE, this.SQUARE_SIZE);
                }
                x += 11;
            }
            y += 11;
        }
        ctx.fillStyle = "#8bc34a";
        ctx.fill();
        this.gameLife.contain.innerHTML = "";
        this.gameLife.contain.appendChild(this.canvas);
    }
}

export default WriteCanvasGameLife;