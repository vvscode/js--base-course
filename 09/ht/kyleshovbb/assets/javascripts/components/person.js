"use strict";
import EventBus from "../utilities/eventBus";
import UpdateSprites from "./updatePersonageSprites";

class Person {
    constructor(type,prey,x,y,direction) {
        this.prey = prey;
        this.containerWidth = document.documentElement.clientWidth;
        this.containerHeight = document.documentElement.clientHeight;
        this.SUBJECT_SIZE = this.containerHeight / 15;
        this.x = x || Math.round(this.containerWidth / 2 - this.SUBJECT_SIZE / 2);
        this.y = y || Math.round(this.containerHeight / 2 - this.SUBJECT_SIZE / 2);
        this.speed = 5;
        this.type = type;
        this.direction = direction;
        this.currentDirection = {};
        this.die = false;
        this.eventBus = new EventBus();
        this.checkPersonType();
        this.moveInRandomDirection();
    }

    checkPersonType() {
        switch (this.type) {
            case "human":
                this.subscribeToMove();
                this.humanLife = true;
                this.ateMushroom = false;
                this.mushroomTimer = 0;
                break;
            case "hunt1":
                this.speed = this.getRandomInt(3, 10);
                this.setRandomPositions();
                break;
            case "hunt2":
                this.SUBJECT_SIZE = this.containerHeight / 12;
                this.speed = this.getRandomInt(5, 12);
                this.setRandomPositions();
                break;
            case "mushroom":
                this.speed = this.getRandomInt(7, 14);
                this.setRandomPositions();
                break;
        }
    }

    setRandomPositions() {
        this.x = this.getRandomInt(0, this.containerWidth);
        this.y = this.getRandomInt(0, this.containerHeight);

        let c = this.getResultPythagoreanTheorem();
        if (c < this.SUBJECT_SIZE * 5) this.setRandomPositions();
    }

    subscribeToMove() {
        let wrapperMovePerson = this.movePerson.bind(this);
        document.body.addEventListener("keydown", wrapperMovePerson);
        let wrapperMoveCharacterOnMobile = this.moveCharacterOnMobile.bind(this);
        document.querySelector(".mobileControls").addEventListener("click",wrapperMoveCharacterOnMobile)
    }

    moveCharacterOnMobile(ev) {
        let target = ev.target;
        this.direction = +target.value;
        this.updateSprites.direction = +target.value;
        this.setDirection();
    }

    movePerson(event) {
        switch (event.keyCode) {
            case 38:
                this.direction = 1;
                this.updateSprites.direction = 1;
                this.setDirection();
                break;
            case 40:
                this.direction = 2;
                this.updateSprites.direction = 2;
                this.setDirection();
                break;
            case 39:
                this.direction = 3;
                this.updateSprites.direction = 3;
                this.setDirection();
                break;
            case 37:
                this.direction = 4;
                this.updateSprites.direction = 4;
                this.setDirection();
                break;
        }
    }

    moveInRandomDirection() {
        this.direction = this.getRandomInt(1, 4);
        this.updateSprites = new UpdateSprites(this.type,this.direction,this.speed);
        this.setDirection();
        this.startMove();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setDirection() {
        switch (this.direction) {
            case 1:
                this.changeDirection();
                this.eventBus.on("move", this.moveForward);
                break;
            case 2:
                this.changeDirection();
                this.eventBus.on("move", this.backward);
                break;
            case 3:
                this.changeDirection();
                this.eventBus.on("move", this.moveRight);
                break;
            case 4:
                this.changeDirection();
                this.eventBus.on("move", this.moveLeft);
                break;
            case 5:
                this.changeDirection();
                this.eventBus.on("move", this.moveLeftAndAUp);
                break;
            case 6:
                this.changeDirection();
                this.eventBus.on("move", this.moveRightAndAUp);
                break;
            case 7:
                this.changeDirection();
                this.eventBus.on("move", this.moveLeftAndDown);
                break;
            case 8:
                this.changeDirection();
                this.eventBus.on("move", this.moveRightAndDown);
                break;
        }
    }

    pursueCharacter() {
        this.changeDirection();
        if (this.prey.x > this.x && this.prey.y > this.y) {
            this.direction = 8;
            this.updateSprites.direction = 8;
        }
        else if (this.prey.x < this.x && this.prey.y > this.y) {
            this.direction = 7;
            this.updateSprites.direction = 7;
        }
        else if (this.prey.x > this.x && this.prey.y < this.y) {
            this.direction = 6;
            this.updateSprites.direction = 6;
        }
        else if (this.prey.x < this.x && this.prey.y < this.y) {
            this.direction = 5;
            this.updateSprites.direction = 5;
        }
        else if (this.prey.x < this.x) {
            this.direction = 4;
            this.updateSprites.direction = 4;
        }
        else if (this.prey.x > this.x) {
            this.direction = 3;
            this.updateSprites.direction = 3;
        }
        else if (this.prey.y > this.y) {
            this.direction = 2;
            this.updateSprites.direction = 2;
        }
        else if (this.prey.y < this.y) {
            this.direction = 1;
            this.updateSprites.direction = 1;
        }
        this.setDirection();
    }

    moveForward(self) {
        self.y = self.y - 2;
        self.currentDirection = self.moveForward;
    }

    backward(self) {
        self.y = self.y + 2;
        self.currentDirection = self.backward;
    }

    moveRight(self) {
        self.x = self.x + 2;
        self.currentDirection = self.moveRight;
    }

    moveLeft(self) {
        self.x = self.x - 2;
        self.currentDirection = self.moveLeft;
    }

    moveLeftAndAUp(self) {
        --self.x;
        --self.y;
        self.currentDirection = self.moveLeftAndAUp;
    }

    moveRightAndAUp(self) {
        ++self.x;
        --self.y;
        self.currentDirection = self.moveRightAndAUp;
    }

    moveLeftAndDown(self) {
        --self.x;
        ++self.y;
        self.currentDirection = self.moveLeftAndDown;
    }

    moveRightAndDown(self) {
        ++self.x;
        ++self.y;
        self.currentDirection = self.moveRightAndDown;
    }

    getResultPythagoreanTheorem() {
        let a = (this.prey.x - this.SUBJECT_SIZE / 2) - (this.x - this.SUBJECT_SIZE / 2);
        let b = (this.prey.y - this.SUBJECT_SIZE / 2) - (this.y - this.SUBJECT_SIZE / 2);
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

    changeDirection() {
        if (this.currentDirection.length) {
            this.eventBus.off("move", this.currentDirection);
        }
    }

    catchUpWithThePlayer() {
        let c = this.getResultPythagoreanTheorem();

        if (c < this.SUBJECT_SIZE / 1.5 && this.type === "mushroom" && !this.die) {
            if (!this.prey.ateMushroom) this.playerCatchMushroom();
            this.die = true;
            this.prey.ateMushroom = true;
            this.prey.mushroomTimer += 15;
        }
        else if (c < this.SUBJECT_SIZE / 1.5 && this.prey.ateMushroom) this.die = true;
        else if (c < this.SUBJECT_SIZE / 1.5 && !this.die) this.prey.humanLife = false;
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
        }, 1000)
    }

    startMove() {
        let timer = setInterval(() => {
            this.checkOutTheEdgeOfTheCharacter();
            if (this.type === "hunt2") {
                this.eventBus.trigger("move", this);
                this.catchUpWithThePlayer();
                this.checkForCharacterOccurrencesInRadius();
            }
            else {
                this.eventBus.trigger("move", this);
                if (this.type !== "human") this.catchUpWithThePlayer();
            }
            this.abortInterval(timer);
        }, this.speed * 4)
    }

    abortInterval(timer) {
        if ((this.type === "hunt2" || this.type === "hunt1") && !this.prey.humanLife) {
            clearInterval(timer);
            this.updateSprites.stopUpdateSprites();
        }
        else if (this.type === "human" && !this.humanLife) {
            clearInterval(timer);
            this.updateSprites.stopUpdateSprites();
        }
    }
}

export default Person;