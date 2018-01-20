'use strict';

class WriteTextGameLife {
    constructor(gameLife){
        this.pre = document.createElement("pre");
        this.gameLife = gameLife;
        this.startWriteGame();
    }

    startWriteGame() {
        this.writeGame(this.gameLife.stageHistory[this.gameLife.currentArrayIndex],this.pre);
        window.location.hash = `Text&gameState=${this.gameLife.currentArrayIndex + 1}`;
    }

    writeGame(lastLifeStage) {
        let verticalLength = lastLifeStage.length,
            horizontalLength = lastLifeStage[0].length;
        let textGameLife = "";

        for (let i = 0; i < verticalLength; ++i) {
            if (i > 0) textGameLife += "\n";
            for (let j = 0; j < horizontalLength; ++j) {
                if (lastLifeStage[i][j]) {
                    textGameLife += "x";
                } else textGameLife += " ";
            }
            this.pre.innerHTML = textGameLife;
        }
        this.gameLife.contain.innerHTML = "";
        this.gameLife.contain.appendChild(this.pre);
    }
}

export default WriteTextGameLife;