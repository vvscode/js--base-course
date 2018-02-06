"use strict";
import Person from '../characters';

class Mushroom extends Person {
    constructor(prey,eventBus) {
        super(eventBus);
        this.prey = prey;
        this.SUBJECT_SIZE = this.containerHeight / 15;
        this.speed = this.getRandomInt(7, 14);
        this.type = "mushroom";
        this.init();
    }

    init() {
        this.setRandomPositions();
        this.moveInRandomDirection();
        this.startUpdateSprites();
    }

    updateSprite() {
        let MOVE_FORWARD_SPRITE_LINE = 150;
        let MOVE_BACKWARD_SPRITE_LINE = 0;
        let MOVE_RIGHT_SPRITE_LINE = 100;
        let MOVE_LEFT_SPRITE_LINE = 50;
        let FIRST_CHARACTER_STEP = 0;
        let CHARACTER_STEP = 50;
        let END_OF_THE_SPRITE = 140;
        switch (this.direction) {
            case "moveForward":
            case "moveLeftAndAUp":
            case "moveRightAndAUp":
                this.sy = MOVE_FORWARD_SPRITE_LINE;
                break;
            case "backward":
            case "moveLeftAndDown":
            case "moveRightAndDown":
                this.sy = MOVE_BACKWARD_SPRITE_LINE;
                break;
            case "moveRight":
                this.sy = MOVE_RIGHT_SPRITE_LINE;
                break;
            case "moveLeft":
                this.sy = MOVE_LEFT_SPRITE_LINE;
                break;
        }
        this.sx += CHARACTER_STEP;
        if (this.sx >= END_OF_THE_SPRITE) this.sx = FIRST_CHARACTER_STEP;
    }
}

export default Mushroom;