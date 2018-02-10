'use strict';

class WriteSVGGameLife {
    constructor(gameLife) {
        this.SQUARE_SIZE = 8;
        this.SVG_NS = "http://www.w3.org/2000/svg";
        this.svg = document.createElementNS(this.SVG_NS, 'svg');
        this.wrapper = document.createElementNS(this.SVG_NS, 'rect');
        this.wrapper.setAttribute('class', 'wrapper');
        this.svg.appendChild(this.wrapper);
        this.gameLife = gameLife;
        this.startWriteGame();
    }

    startWriteGame() {
        this.writeGame(this.gameLife.stageHistory[this.gameLife.currentArrayIndex], this.pre);
        window.location.hash = `SVG&gameState=${this.gameLife.currentArrayIndex + 1}`;
    }

    writeGame(lastLifeStage) {
        let verticalLength = lastLifeStage.length,
            horizontalLength = lastLifeStage[0].length;

        this.svg.setAttribute('height', verticalLength * 11);
        this.svg.setAttribute('width', horizontalLength * 11);

        let y = 0;
        for (let i = 0; i < verticalLength; ++i) {
            let x = 0;
            for (let j = 0; j < horizontalLength; ++j) {
                if (lastLifeStage[i][j]) {
                    let SVGSquare = `<rect 
                                  x="${x}"
                                  y="${y}"
                                  width="${this.SQUARE_SIZE}"
                                  class="inner-square" />`
                    this.svg.innerHTML += SVGSquare;
                }
                x += 11;
            }
            y += 11;
        }
        this.gameLife.contain.innerHTML = "";
        this.gameLife.contain.appendChild(this.svg);
    }
}

export default WriteSVGGameLife;