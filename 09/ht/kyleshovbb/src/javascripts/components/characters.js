'use strict';
class Person {
    constructor(eventBus) {
        this.containerWidth = document.documentElement.clientWidth;
        this.containerHeight = document.documentElement.clientHeight;
        this.eventBus = eventBus;
        this.die = false;
        this.sx = 0;
        this.sy = 0;
    }

    setRandomPositions() {
        this.x = this.getRandomInt(0, this.containerWidth);
        this.y = this.getRandomInt(0, this.containerHeight);

        let c = this.getResultPythagoreanTheorem();
        if (c < this.SUBJECT_SIZE * 5) this.setRandomPositions();
    }

    subscribeToMove() {
        let wrapperMovePerson = this.movePerson.bind(this);
        document.body.addEventListener('keydown', wrapperMovePerson);
        let wrapperMoveCharacterOnMobile = this.moveCharacterOnMobile.bind(
            this);
        document.querySelector('.mobileControls').
            addEventListener('click', wrapperMoveCharacterOnMobile);
    }

    moveCharacterOnMobile(ev) {
        let target = ev.target;
        this.direction = target.value;
    }

    movePerson(event) {
        let TOP_ARROW_KEY = 38;
        let BOTTOM_ARROW_KEY = 40;
        let RIGHT_ARROW_KEY = 39;
        let LEFT_ARROW_KEY = 37;
        switch (event.keyCode) {
            case TOP_ARROW_KEY:
                this.direction = 'moveForward';
                break;
            case BOTTOM_ARROW_KEY:
                this.direction = 'backward';
                break;
            case RIGHT_ARROW_KEY:
                this.direction = 'moveRight';
                break;
            case LEFT_ARROW_KEY:
                this.direction = 'moveLeft';
                break;
        }
    }

    moveInRandomDirection() {
        switch (this.getRandomInt(1, 4)) {
            case 1:
                this.direction = 'moveForward';
                break;
            case 2:
                this.direction = 'backward';
                break;
            case 3:
                this.direction = 'moveRight';
                break;
            case 4:
                this.direction = 'moveLeft';
                break;
        }
        this.startMove();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setEventBusDirection() {
        this.eventBus.on('moveRightAndDown', this.moveRightAndDown);
        this.eventBus.on('moveLeftAndDown', this.moveLeftAndDown);
        this.eventBus.on('moveRightAndAUp', this.moveRightAndAUp);
        this.eventBus.on('moveLeftAndAUp', this.moveLeftAndAUp);
        this.eventBus.on('moveForward', this.moveForward);
        this.eventBus.on('moveRight', this.moveRight);
        this.eventBus.on('moveLeft', this.moveLeft);
        this.eventBus.on('backward', this.backward);
    }

    pursueCharacter() {
        if (this.prey.x > this.x && this.prey.y > this.y) {
            this.direction = 'moveRightAndDown';
        }
        else if (this.prey.x < this.x && this.prey.y > this.y) {
            this.direction = 'moveLeftAndDown';
        }
        else if (this.prey.x > this.x && this.prey.y < this.y) {
            this.direction = 'moveRightAndAUp';
        }
        else if (this.prey.x < this.x && this.prey.y < this.y) {
            this.direction = 'moveLeftAndAUp';
        }
        else if (this.prey.x < this.x) {
            this.direction = 'moveLeft';
        }
        else if (this.prey.x > this.x) {
            this.direction = 'moveRight';
        }
        else if (this.prey.y > this.y) {
            this.direction = 'backward';
        }
        else if (this.prey.y < this.y) {
            this.direction = 'moveForward';
        }
    }

    moveForward(self) {
        self.y = self.y - 2;
    }

    backward(self) {
        self.y = self.y + 2;
    }

    moveRight(self) {
        self.x = self.x + 2;
    }

    moveLeft(self) {
        self.x = self.x - 2;
    }

    moveLeftAndAUp(self) {
        --self.x;
        --self.y;
    }

    moveRightAndAUp(self) {
        ++self.x;
        --self.y;
    }

    moveLeftAndDown(self) {
        --self.x;
        ++self.y;
    }

    moveRightAndDown(self) {
        ++self.x;
        ++self.y;
    }

    getResultPythagoreanTheorem() {
        let a = (this.prey.x - this.SUBJECT_SIZE / 2) -
            (this.x - this.SUBJECT_SIZE / 2);
        let b = (this.prey.y - this.SUBJECT_SIZE / 2) -
            (this.y - this.SUBJECT_SIZE / 2);
        return Math.sqrt(a * a + b * b);
    }

    checkOutTheEdgeOfTheCharacter() {
        if (this.x < 0 - this.SUBJECT_SIZE) {
            this.x = this.containerWidth;
        } else if (this.x > this.containerWidth) {
            this.x = 0;
        } else if (this.y < 0 - this.SUBJECT_SIZE) {
            this.y = this.containerHeight;
        } else if (this.y > this.containerHeight) {
            this.y = 0;
        }
    }

    catchUpWithThePlayer() {
        let c = this.getResultPythagoreanTheorem();

        if (c < this.SUBJECT_SIZE / 1.5 && this.type === 'mushroom' &&
            !this.die) {
            if (!this.prey.ateMushroom) this.playerCatchMushroom();
            this.die = true;
            this.prey.ateMushroom = true;
            this.prey.mushroomTimer += 15;
        }
        else if (c < this.SUBJECT_SIZE / 1.5 &&
            this.prey.ateMushroom) this.die = true;
        else if (c < this.SUBJECT_SIZE / 1.5 &&
            !this.die) this.prey.humanLife = false;
    }

    checkForCharacterOccurrencesInRadius() {
        let c = this.getResultPythagoreanTheorem();
        if (c < this.SUBJECT_SIZE * 2.7) {
            this.pursueCharacter();
        }
    }

    playerCatchMushroom() {
        let time = setInterval(() => {
            --this.prey.mushroomTimer;
            if (this.prey.mushroomTimer <= 0) {
                this.prey.ateMushroom = false;
                clearInterval(time);
            }
        }, 1000);
    }

    startMove() {
        let timer = setInterval(() => {
            this.checkOutTheEdgeOfTheCharacter();
            if (this.type === 'hunt2') {
                this.eventBus.trigger(this.direction, this);
                this.catchUpWithThePlayer();
                this.checkForCharacterOccurrencesInRadius();
            }
            else {
                this.eventBus.trigger(this.direction, this);
                if (this.type !== 'human') this.catchUpWithThePlayer();
            }
            this.abortInterval(timer);
        }, this.speed * 4);
    }

    startUpdateSprites() {
        this.updateSpritesTimer = setInterval(() => {
            this.updateSprite();
        }, this.speed * 18);
    }

    abortInterval(timer) {
        if ((this.type === 'hunt2' || this.type === 'hunt1') &&
            !this.prey.humanLife) {
            clearInterval(timer);
            clearInterval(this.updateSpritesTimer);
        } else if (this.type === 'human' && !this.humanLife) {
            clearInterval(timer);
            clearInterval(this.updateSpritesTimer);
        }
    }
}

export default Person;