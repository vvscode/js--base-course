"use strict";
import Person from '../characters';

class Hunt2 extends Person {
    constructor(prey,eventBus) {
        super();
        this.prey = prey;
        this.SUBJECT_SIZE = this.containerHeight / 12;
        this.speed = this.getRandomInt(5, 12);
        this.type = "hunt2";
        this.die = false;
        this.eventBus = eventBus;
        this.init();
    }

    init() {
        this.setRandomPositions();
        this.moveInRandomDirection();
        this.startUpdateSprites();
    }

    updateSprite() {
        switch (this.direction) {
            case "moveForward":
            case "moveLeftAndAUp":
            case "moveRightAndAUp":
                this.sy = 288;
                break;
            case "backward":
            case "moveLeftAndDown":
            case "moveRightAndDown":
                this.sy = 0;
                break;
            case "moveRight":
                this.sy = 192;
                break;
            case "moveLeft":
                this.sy = 96;
                break;
        }
        this.sx += 143;
        if (this.sx >= 425) this.sx = 0;
    }
}

export default Hunt2;