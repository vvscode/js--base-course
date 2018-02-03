"use strict";
import Person from "./person";

class GameArea {
    constructor(contain, personage) {
        this.contain = contain;
        this.arcadeGameContainer = document.createElement("canvas");
        this.arcadeGameContainer.setAttribute("id", "game");
        this.arcadeGameContainer.height = document.documentElement.clientHeight;
        this.arcadeGameContainer.width = document.documentElement.clientWidth;
        this.playingGame = true;
        this.gameStage = 1;

        if (!personage) {
            this.human = new Person("human");
            this.timeToStart = new Date();
            this.personage = [this.human];
            this.historyStage = [];
            this.exportCharacterData();
            this.startTimer();
            this.updateArea();
        } else this.getCurrentPersonageArray(personage);

        this.createCanvasArea();
    }

    getCurrentPersonageArray(personage) {
        this.personage = personage[this.gameStage - 1];
    }

    createCanvasArea() {
        let ctx = this.arcadeGameContainer.getContext('2d');
        ctx.clearRect(0, 0, this.arcadeGameContainer.width, this.arcadeGameContainer.height);
        this.drawGameBoard(ctx);
        let numberOfCharacters = this.personage.length;
        for (let i = 0; i < numberOfCharacters; ++i) {
            this.drawPersonage(ctx, this.personage[i]);
        }
        this.contain.appendChild(this.arcadeGameContainer);
    }

    drawGameBoard(ctx) {
        let ctx1 = ctx;
        ctx1.beginPath();
        let background = document.querySelector('#background');
        ctx1.drawImage(background, 0, 0, this.arcadeGameContainer.width, this.arcadeGameContainer.height);
    }

    drawPersonage(ctx, personage) {
        let x = personage.x;
        let y = personage.y;
        let sx = 0;
        let sy = 0;

        if (personage.sx >= 0) sx = personage.sx;
        else if (personage.updateSprites.sx >= 0) sx = personage.updateSprites.sx;

        if (personage.sy >= 0) sy = personage.sy;
        else if (personage.updateSprites.sy >= 0) sy = personage.updateSprites.sy;

        let sWidth, sHeight, sprite;
        let SUBJECT_SIZE = personage.SUBJECT_SIZE || this.arcadeGameContainer.height / 15;
        switch (personage.type || personage.t) {
            case "human":
                ctx.beginPath();
                sWidth = 63.5;
                sHeight = 68.5;
                sprite = document.querySelector('#person-img');
                ctx.drawImage(sprite, sx, sy, sWidth, sHeight, x, y, SUBJECT_SIZE, SUBJECT_SIZE);
                break;
            case "hunt1":
                ctx.beginPath();
                sWidth = 45.7;
                sHeight = 47.75;
                sprite = document.querySelector('#hunter1-img');
                ctx.drawImage(sprite, sx, sy, sWidth, sHeight, x, y, SUBJECT_SIZE, SUBJECT_SIZE);
                break;
            case "hunt2":
                ctx.beginPath();
                sWidth = 142.33;
                sHeight = 95.75;
                sprite = document.querySelector('#hunter2-img');
                SUBJECT_SIZE = personage.SUBJECT_SIZE || this.arcadeGameContainer.height / 12;
                ctx.drawImage(sprite, sx, sy, sWidth, sHeight, x, y, SUBJECT_SIZE, SUBJECT_SIZE);
                ctx.arc(x + (SUBJECT_SIZE / 2), y + (SUBJECT_SIZE / 2), SUBJECT_SIZE * 2.5, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case "mushroom":
                ctx.beginPath();
                sWidth = 50;
                sHeight = 50;
                sprite = document.querySelector('#tinyshroommen-img');
                ctx.drawImage(sprite, sx, sy, sWidth, sHeight, x, y, SUBJECT_SIZE, SUBJECT_SIZE);
                break;
        }
    }

    startTimer() {
        let timer = setInterval(() => {
            if (this.playingGame) {
                this.addNewHunter();
                ++this.gameStage;
            } else if (!this.human.humanLife) clearInterval(timer);
        }, 5000);
    }

    createCharacterDataForExport() {
        let arr = [];
        this.personage.forEach((personage) => {
            let obj = {
                x: personage.x,
                y: personage.y,
                sx: personage.updateSprites.sx,
                sy: personage.updateSprites.sy,
                t: personage.type,
                d: personage.direction
            };
            arr.push(obj);
        });
        return arr;
    }

    addNewHunter() {
        if (this.gameStage % 5 === 0) this.personage.push(new Person("hunt2", this.human));
        else this.personage.push(new Person("hunt1", this.human));
        if (this.gameStage % 10 === 0) this.personage.push(new Person("mushroom", this.human));
    }

    updateArea() {
        let timer = setInterval(() => {
            if (this.human.humanLife) {
                this.removeDeadCharacters();
                this.createCanvasArea();
                this.checkMushroomTimer();
            } else if (!this.human.humanLife) {
                clearInterval(timer);
                this.gameOver();
            }
        }, 50)
    }

    exportCharacterData() {
        let timer = setInterval(() => {
            this.historyStage.push(this.createCharacterDataForExport());
            if (!this.human.humanLife) clearInterval(timer);
        }, 200)
    }

    removeDeadCharacters() {
        this.personage = this.personage.filter((character) => {
            return character.die === false;
        })
    }

    checkMushroomTimer(){
        if (this.human.mushroomTimer > 0) {
            let mushroomTimer = document.querySelector("#mushroomTimer");
            if (!mushroomTimer) {
                mushroomTimer = document.createElement("p");
                mushroomTimer.setAttribute("id","mushroomTimer");
                document.body.appendChild(mushroomTimer);
            }
            mushroomTimer.innerHTML = `Время действия волшебного гриба: ${this.human.mushroomTimer} секунд`;
        } else {
            let mushroomTimer = document.querySelector("#mushroomTimer");
            if (mushroomTimer) mushroomTimer.remove();
        }
    }

    gameOver() {
        let currentItem = new Date();
        let differenceInTime = currentItem - this.timeToStart;
        let overTime = new Date(differenceInTime);
        let minutes = overTime.getMinutes();
        let seconds = overTime.getSeconds();
        this.playingGame = false;
        setTimeout(this.writeFiniteTime(minutes, seconds), 100);
    }

    writeFiniteTime(minutes, seconds) {
        let playerName = prompt("Конец игры. Введите Ваш ник", "User") || "User";
        let historyStage = this.historyStage;
        let player = [playerName, minutes, seconds, historyStage];
        if (!localStorage["players"]) {
            localStorage["players"] = "";
            let playersArray = [player];
            localStorage["players"] = JSON.stringify(playersArray);
        } else {
            let playersArray = JSON.parse(localStorage["players"]);
            playersArray.push(player);
            localStorage["players"] = JSON.stringify(playersArray);
        }

        window.location.hash = `theEnd${playerName};${minutes + ":" + seconds}`;
    }
}

export default GameArea;