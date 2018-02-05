'use strict';
import Router from "../utilities/router";
import addAbout from "./aboutPage";
import GameArea from "./gameArea";
import Records from "./records";
import RecordPlayback from "./recordPlayback";
import EventBus from '../utilities/eventBus';

let eventBus = new EventBus();

window.onload = () => {
    let router = new Router({
        routes: [{
            name: 'index',
            match: "",
            onEnter: () => {
                let mobileControls = document.querySelector(".mobileControls");
                mobileControls.style.display = "none";
            }
        },{
            name: 'Game',
            match: /Game/,
            onBeforeEnter: () => {
                let containerWidth = document.documentElement.clientWidth;
                if (containerWidth < 1024) {
                    let mobileControls = document.querySelector(".mobileControls");
                    mobileControls.style.display = "block";
                }
            },
            onEnter: () => {
                let mainText = document.querySelector("#main_text");
                let nav = document.querySelector("nav");
                mainText.style.display = "none";
                nav.style.display = "none";
                let containGame = document.querySelector("#contain");
                containGame.style.display = "block";
                let contain = document.querySelector("#contain");
                new GameArea(contain);
            },
            onLeave: () => {
                let containGame = document.querySelector("#contain");
                containGame.style.display = "none";
            }
        },{
            name: 'GameOver',
            match: /theEnd(.+)/,
            onBeforeEnter: () => {
                let mobileControls = document.querySelector(".mobileControls");
                mobileControls.style.display = "none";
                let mainText = document.querySelector("#main_text");
                mainText.style.display = "none";
            },
            onEnter: (playerTime) => {
                let player = playerTime.split(";");
                let finalTime = document.createElement("h2");
                finalTime.setAttribute("id","finalTime");
                finalTime.innerHTML = `${player[0]}, Ваше время игры: ${player[1]}`;
                document.body.appendChild(finalTime);
                let nav = document.querySelector("nav");
                nav.style.display = "block";
            },
            onLeave: () => {
                let finalTime = document.querySelector("#finalTime");
                finalTime.style.display = "none";
            }
        }, {
            name: 'Records',
            match: /Records/,
            onBeforeEnter: () => {
                let mobileControls = document.querySelector(".mobileControls");
                mobileControls.style.display = "none";
                let mainText = document.querySelector("#main_text");
                mainText.style.display = "none";
            },
            onEnter: () => {
                let tableContain = document.querySelector("#tableContain");
                new Records(tableContain);
            },
            onLeave: () => {
                document.querySelector("#tableContain").innerHTML = "";
            }
        }, {
            name: 'playbackUser',
            match: /playbackUser=(.+)/,
            onBeforeEnter: () => {
                let mobileControls = document.querySelector(".mobileControls");
                mobileControls.style.display = "none";
                let mainText = document.querySelector("#main_text");
                mainText.style.display = "none";
            },
            onEnter: (index) => {
                new RecordPlayback(index);
            },
            onLeave: () => {
                let controls = document.querySelector("#controlsDiv");
                let containGame = document.querySelector("#paybackGame");
                containGame.style.display = "none";
                controls.remove();
            }
        }, {
            name: 'Author',
            match: /Author/,
            onBeforeEnter: () => {
                let mobileControls = document.querySelector(".mobileControls");
                mobileControls.style.display = "none";
                let mainText = document.querySelector("#main_text");
                mainText.style.display = "none";
            },
            onEnter: () => {
                let aboutDiv = document.querySelector("#aboutDiv");
                if (!aboutDiv) {
                    addAbout();
                } else {
                    aboutDiv.style.display = "block";
                }
            },
            onLeave: () => {
                let aboutDiv = document.querySelector("#aboutDiv");
                aboutDiv.style.display = "none";
            }
        }
        ]
    });
};

export default eventBus;