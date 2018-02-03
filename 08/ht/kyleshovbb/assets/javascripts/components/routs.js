'use strict';

import addAbout from "./aboutPage";
import WriteCanvasGameLife from "./writeCanvasGameLife";
import WriteSVGGameLife from "./writeSVGGameLife";
import Controls from "./controls";
import WriteTextGameLife from "./writeTextGameLife";
import EventBus from "../utils/eventBus";
import Router from "../utils/router";

let eventBus = new EventBus();
let lifeGame;

let formControls = document.querySelector("#form-controls");
formControls.addEventListener("change", (ev) => {
    if (lifeGame.selectLine.value > 150) lifeGame.selectLine.value = 150;
    else if (lifeGame.selectLine.value < 3) lifeGame.selectLine.value = 3;

    if (lifeGame.selectColumn.value > 150) lifeGame.selectColumn.value = 150;
    else if (lifeGame.selectColumn.value < 3) lifeGame.selectColumn.value = 3;

    let target = ev.target;
    if (target.closest("#selectLine") || target.closest("#selectColumn")) {
        lifeGame.contain.removeEventListener('click', lifeGame.wrapperClickOnArray);
        lifeGame.buttons.removeEventListener('click', lifeGame.wrapperClickOnControlsButton);
        lifeGame = new Controls(eventBus);
        document.querySelector('#play').value = "Stop";
        eventBus.trigger('view', lifeGame);
    }
});

let router = new Router({
    routes: [{
        name: 'index',
        match: '',
        onBeforeEnter: () => {
            let contain = document.querySelector("#contain");
            let controls = document.querySelector("#controls");
            contain.style.display = "none";
            controls.style.display = "none";
        },
        onEnter: () => {
            let headerText = document.createElement("h1");
            headerText.setAttribute("id", "headerText");
            headerText.innerHTML = "Выберите режим отображения игры";
            document.body.appendChild(headerText);
        },
        onLeave: () => {
            let headerText = document.querySelector("#headerText");
            headerText.style.display = "none";
        }
    }, {
        name: 'Text',
        match: /Text/,
        onBeforeEnter: () => {
            let contain = document.querySelector("#contain");
            let controls = document.querySelector("#controls");
            contain.style.display = "block";
            controls.style.display = "block";
        },
        onEnter: () => {
            eventBus.on('view', WriteTextGameLife);
            if (!lifeGame) lifeGame = new Controls(eventBus);
            eventBus.trigger('view', lifeGame);
        },
        onLeave: () => {
            eventBus.off('view', WriteTextGameLife);
        }
    }, {
        name: 'Canvas',
        match: /Canvas/,
        onBeforeEnter: () => {
            let contain = document.querySelector("#contain");
            let controls = document.querySelector("#controls");
            contain.style.display = "block";
            controls.style.display = "block";
        },
        onEnter: () => {
            eventBus.on('view', WriteCanvasGameLife);
            if (!lifeGame) lifeGame = new Controls(eventBus);
            eventBus.trigger('view', lifeGame);
        },
        onLeave: () => {
            eventBus.off('view', WriteCanvasGameLife);
        }
    }, {
        name: 'SVG',
        match: /SVG/,
        onBeforeEnter: () => {
            let contain = document.querySelector("#contain");
            let controls = document.querySelector("#controls");
            contain.style.display = "block";
            controls.style.display = "block";
        },
        onEnter: () => {
            eventBus.on('view', WriteSVGGameLife);
            if (!lifeGame) lifeGame = new Controls(eventBus);
            eventBus.trigger('view', lifeGame);
        },
        onLeave: () => {
            eventBus.off('view', WriteSVGGameLife);
        }
    }, {
        name: 'About',
        match: /About/,
        onBeforeEnter: () => {
            let contain = document.querySelector("#contain");
            let controls = document.querySelector("#controls");
            contain.style.display = "none";
            controls.style.display = "none";
            if (lifeGame) lifeGame.playState = false;
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
            if (lifeGame) {
                lifeGame.playState = true;
                let playButton = document.querySelector("#play");
                if (playButton.value === "Stop") lifeGame.repeatGame();
            }
        }
    },
    ]
});

export default lifeGame;