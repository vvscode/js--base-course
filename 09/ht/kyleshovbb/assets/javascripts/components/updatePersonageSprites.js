"use strict";
class UpdateSprites {

    constructor(type, direction, speed) {
        this.direction = direction;
        this.speed = speed;
        this.type = type;
        this.sx = 0;
        this.sy = 0;
        this.initUpdateSprites();
        this.startUpdateSprites();
    }

    initUpdateSprites() {
        switch (this.type) {
            case "human":
                this.updateHumanSprite();
                break;
            case "hunt1":
                this.updateHunter1Sprite();
                break;
            case "hunt2":
                this.updateHunter2Sprite();
                break;
            case "mushroom":
                this.updateMushroomSprite();
                break;
        }
    }

    updateHumanSprite() {
        switch (this.direction) {
            case 1:
            case 5:
            case 6:
                this.sy = 207;
                break;
            case 2:
            case 7:
            case 8:
                this.sy = 0;
                break;
            case 3:
                this.sy = 138;
                break;
            case 4:
                this.sy = 69;
                break;
        }
        this.sx += 64;
        if (this.sx >= 250) this.sx = 0;
    }

    updateHunter1Sprite() {
        switch (this.direction) {
            case 1:
            case 5:
            case 6:
                this.sy = 145;
                break;
            case 2:
            case 7:
            case 8:
                this.sy = 0;
                break;
            case 3:
                this.sy = 96;
                break;
            case 4:
                this.sy = 48;
                break;
        }
        this.sx += 46;
        if (this.sx >= 130) this.sx = 0;
    }

    updateHunter2Sprite() {
        switch (this.direction) {
            case 1:
            case 5:
            case 6:
                this.sy = 288;
                break;
            case 2:
            case 7:
            case 8:
                this.sy = 0;
                break;
            case 3:
                this.sy = 192;
                break;
            case 4:
                this.sy = 96;
                break;
        }
        this.sx += 143;
        if (this.sx >= 425) this.sx = 0;
    }

    updateMushroomSprite() {
        switch (this.direction) {
            case 1:
            case 5:
            case 6:
                this.sy = 150;
                break;
            case 2:
            case 7:
            case 8:
                this.sy = 0;
                break;
            case 3:
                this.sy = 100;
                break;
            case 4:
                this.sy = 50;
                break;
        }
        this.sx += 50;
        if (this.sx >= 140) this.sx = 0;
    }

    startUpdateSprites() {
        this.timer = setInterval(() => {
            this.initUpdateSprites();
        }, this.speed * 18)
    }

    stopUpdateSprites() {
        clearInterval(this.timer);
    }
}

export default UpdateSprites;