"use strict";
import Person from '../characters';

class Hunt1 extends Person {
    constructor(prey,eventBus) {
        super();
        this.prey = prey;
        this.SUBJECT_SIZE = this.containerHeight / 15;
        this.speed = this.getRandomInt(3, 10);
        this.type = "hunt1";
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
                this.sy = 145;
                break;
            case "backward":
            case "moveLeftAndDown":
            case "moveRightAndDown":
                this.sy = 0;
                break;
            case "moveRight":
                this.sy = 96;
                break;
            case "moveLeft":
                this.sy = 48;
                break;
        }
        this.sx += 46;
        if (this.sx >= 130) this.sx = 0;
    }
}

export default Hunt1;