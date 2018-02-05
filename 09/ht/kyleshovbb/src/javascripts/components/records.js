"use strict";
class Records {
    constructor(tableContain) {
        this.tableContain = tableContain;
        this.createTableTemplate();
    }

    createTableTemplate() {
        this.table = document.createElement("table");
        this.table.setAttribute("id", "records");
        this.table.innerHTML = `<tr><th>Ник игрока</th><th>Минут</th><th>Секунд</th><th>Воспроизвести записанную игру</th></tr>`;
        if (localStorage["players"]) {
            this.playersArray = JSON.parse(localStorage["players"]);
            this.createTable();
        }
    }

    createTable() {
        for (let i = 0; i < this.playersArray.length; ++i) {
            let tr = document.createElement("tr");
            for (let j = 0; j < this.playersArray[i].length; ++j) {
                let td = document.createElement("td");
                if (j !== this.playersArray[i].length - 1) td.innerText = this.playersArray[i][j];
                else {
                    let button = document.createElement("a");
                    button.setAttribute("class", "playRecordedGame");
                    button.setAttribute("href", `#playbackUser=${i}`);
                    button.innerText = "Play";
                    td.appendChild(button);
                }
                tr.appendChild(td);
            }
            this.table.appendChild(tr);
        }
        this.tableContain.innerHTML = "";
        this.tableContain.appendChild(this.table);
    }
}

export default Records;