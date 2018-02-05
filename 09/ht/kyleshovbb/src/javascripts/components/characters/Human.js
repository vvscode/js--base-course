"use strict";
import Person from '../characters';

class Human extends Person {
    constructor(eventBus) {
        super();
        this.SUBJECT_SIZE = this.containerHeight / 15;
        this.x = Math.round(this.containerWidth / 2 - this.SUBJECT_SIZE / 2);
        this.y = Math.round(this.containerHeight / 2 - this.SUBJECT_SIZE / 2);
        this.speed = 5;
        this.type = 'human';
        this.currentDirection = {};
        this.humanLife = true;
        this.die = false;
        this.ateMushroom = false;
        this.mushroomTimer = 0;
        this.eventBus = eventBus;
        this.init();
    }

    init() {
        this.setEventBusDirection();
        this.moveInRandomDirection();
        this.subscribeToMove();
        this.startUpdateSprites();
    }

    updateSprite() {
        switch (this.direction) {
            case 'moveForward':
            case 'moveLeftAndAUp':
            case 'moveRightAndAUp':
                this.sy = 207;
                break;
            case 'backward':
            case 'moveLeftAndDown':
            case 'moveRightAndDown':
                this.sy = 0;
                break;
            case 'moveRight':
                this.sy = 138;
                break;
            case 'moveLeft':
                this.sy = 69;
                break;
        }
        this.sx += 64;
        if (this.sx >= 250) this.sx = 0;
    }
}

export default Human;