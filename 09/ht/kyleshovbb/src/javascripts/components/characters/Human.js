"use strict";
import Person from '../characters';

class Human extends Person {
    constructor(eventBus) {
        super(eventBus);
        this.SUBJECT_SIZE = this.containerHeight / 15;
        this.x = Math.round(this.containerWidth / 2 - this.SUBJECT_SIZE / 2);
        this.y = Math.round(this.containerHeight / 2 - this.SUBJECT_SIZE / 2);
        this.speed = 5;
        this.type = 'human';
        this.humanLife = true;
        this.ateMushroom = false;
        this.mushroomTimer = 0;
        this.init();
    }

    init() {
        this.setEventBusDirection();
        this.moveInRandomDirection();
        this.subscribeToMove();
        this.startUpdateSprites();
    }

    updateSprite() {
        let MOVE_FORWARD_SPRITE_LINE = 207;
        let MOVE_BACKWARD_SPRITE_LINE = 0;
        let MOVE_RIGHT_SPRITE_LINE = 138;
        let MOVE_LEFT_SPRITE_LINE = 69;
        let CHARACTER_STEP = 64;
        let FIRST_CHARACTER_STEP = 0;
        let END_OF_THE_SPRITE = 250;
        switch (this.direction) {
            case 'moveForward':
            case 'moveLeftAndAUp':
            case 'moveRightAndAUp':
                this.sy = MOVE_FORWARD_SPRITE_LINE;
                break;
            case 'backward':
            case 'moveLeftAndDown':
            case 'moveRightAndDown':
                this.sy = MOVE_BACKWARD_SPRITE_LINE;
                break;
            case 'moveRight':
                this.sy = MOVE_RIGHT_SPRITE_LINE;
                break;
            case 'moveLeft':
                this.sy = MOVE_LEFT_SPRITE_LINE;
                break;
        }
        this.sx += CHARACTER_STEP;
        if (this.sx >= END_OF_THE_SPRITE) this.sx = FIRST_CHARACTER_STEP;
    }
}

export default Human;