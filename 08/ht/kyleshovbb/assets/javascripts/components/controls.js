'use strict';

import CalculatingGameLife from "./calculatingGameLife";

class Controls extends CalculatingGameLife {
    constructor(eventBus) {
        let selectLine = document.querySelector("#selectLine");
        let selectColumn = document.querySelector("#selectColumn");
        super(+selectLine.value, +selectColumn.value, eventBus);
        this.eventBus = eventBus;
        this.selectLine = selectLine;
        this.selectColumn = selectColumn;
        this.buttons = document.querySelector("#buttons");
        this.subscribeToClickButton();
    }

    subscribeToClickButton() {
        this.wrapperClickOnControlsButton = this.clickOnControlsButton.bind(this);
        this.buttons.addEventListener("click", this.wrapperClickOnControlsButton);
        this.repeatGame();
    }

    clickOnControlsButton(ev) {
        let target = ev.target;
        if (target.closest("#back")) {
            if (this.currentArrayIndex > 0) {
                --this.currentArrayIndex;
                this.eventBus.trigger('view', this);
            }
        } else if (target.closest("#forward")) {
            if (this.currentArrayIndex < this.stageHistory.length - 1) {
                ++this.currentArrayIndex;
                this.eventBus.trigger('view', this);
            }
        } else if (target.closest("#play")) {
            if (target.value === "Stop") {
                target.value = "Play";
                this.playState = false;
            } else if (target.value === "Play") {
                target.value = "Stop";
                this.playState = true;
                this.repeatGame();
            }
        }
    }
}

export default Controls;