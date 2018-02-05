"use strict";
import GameArea from "./gameArea";

class RecordPlayback {
    constructor(index) {
        this.playbackArray = JSON.parse(localStorage["players"])[index][3];
        this.playbackGameContainer = document.createElement("div");
        this.playbackGameContainer.setAttribute("id", "paybackGame");
        document.body.appendChild(this.playbackGameContainer);
        this.playingGame = true;
        this.initPlayback();
    }

    initPlayback() {
        this.createControls();
        this.createPlaybackGameArea();
        this.updatePlaybackGameArea();
    }

    createControls(){
        let controls = document.querySelector("#controlsDiv");
        if (controls){
            controls.style.display = "block";
        } else {
            this.controlsDiv = document.createElement("div");
            this.controlsDiv.setAttribute("id", "controlsDiv");
            document.body.appendChild(this.controlsDiv);
            let speedControllerLabel = document.createElement("label");
            speedControllerLabel.innerText = "Регулятор скорости:";
            speedControllerLabel.setAttribute("id","speedControllerLabel");
            this.controlsDiv.appendChild(speedControllerLabel);
            this.speedController = this.createRange(speedControllerLabel,"speedController",50);
            this.speedController.setAttribute("value", "25");
            this.rewindController = this.createRange(this.controlsDiv,"rewindController",this.playbackArray.length - 1);
            this.createPlayButton(this.controlsDiv);
            this.subsToChangeControls();
        }
    }

    createRange(contain,id,maxRange) {
        let range = document.createElement("input");
        range.setAttribute("id", id);
        range.setAttribute("type", "range");
        range.setAttribute("value", "1");
        range.setAttribute("min", "1");
        range.setAttribute("max", maxRange);
        contain.appendChild(range);
        return range;
    }

    createPlayButton(){
        this.playButton = document.createElement("input");
        this.playButton.setAttribute("id", "playButton");
        this.playButton.setAttribute("type", "button");
        this.playButton.setAttribute("value", "stop");
        this.controlsDiv.appendChild(this.playButton);
    }

    subsToChangeControls(){
        let wrapperClickOnPlayButton = this.clickOnPlayButton.bind(this);
        this.playButton = document.querySelector("#playButton");
        this.playButton.addEventListener("click",wrapperClickOnPlayButton);

        let wrapperChangeRange = this.changeRange.bind(this);
        this.controlsDiv.addEventListener("change",wrapperChangeRange);
    }

    changeRange(ev){
        let target = ev.target;
        if (target.closest("#rewindController")) {
            this.playback.gameStage = +target.value;
            this.playback.getCurrentPersonageArray(this.playbackArray);
            this.playback.drawCanvasArea();
        } else if (target.closest("#speedController") && this.playbackArray.length - 1 !== this.playback.gameStage) {
            this.stopPlaybackGameArea();
            this.updatePlaybackGameArea();
        }
    }

    clickOnPlayButton(ev){
        let target = ev.target;
        if (target.value === "stop") {
            target.value = "play";
            target.style.backgroundPositionX = "0";
            if (this.timer) this.stopPlaybackGameArea();
        }
        else if (target.value === "play") {
            target.value = "stop";
            target.style.backgroundPositionX = "17%";
            if (!this.timer) this.updatePlaybackGameArea();
            if (this.playbackArray.length - 1 === this.playback.gameStage) {
                this.rewindController.value = 1;
                this.playback.gameStage = 1;
            }
        }
    }

    createPlaybackGameArea() {
        this.playback = new GameArea(this.playbackGameContainer, this.playbackArray);
    }

    updatePlaybackGameArea() {
        this.timer = setInterval(() => {
            ++this.playback.gameStage;
            if (+this.rewindController.value === this.playback.gameStage - 1) {
                this.rewindController.value = this.playback.gameStage;
            }
            this.playback.getCurrentPersonageArray(this.playbackArray);
            this.playback.drawCanvasArea();
            if (this.playbackArray.length - 1 === this.playback.gameStage) {
                this.playButton.value = "play";
                this.playButton.style.backgroundPositionX = "0";
                this.stopPlaybackGameArea();
            }
        }, this.speedController.value);
    }

    stopPlaybackGameArea(){
        clearInterval(this.timer);
        this.timer = 0;
    }
}

export default RecordPlayback;