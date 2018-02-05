"use strict";
import Person from '../characters';

class Mushroom extends Person {
    constructor(prey,eventBus) {
        super();
        this.prey = prey;
        this.SUBJECT_SIZE = this.containerHeight / 15;
        this.speed = this.getRandomInt(7, 14);
        this.type = "mushroom";
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
                this.sy = 150;
                break;
            case "backward":
            case "moveLeftAndDown":
            case "moveRightAndDown":
                this.sy = 0;
                break;
            case "moveRight":
                this.sy = 100;
                break;
            case "moveLeft":
                this.sy = 50;
                break;
        }
        this.sx += 50;
        if (this.sx >= 140) this.sx = 0;
    }
}

export default Mushroom;