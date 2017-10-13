let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let infoBox = document.querySelector(".infoBox");

(function init() {
    document.querySelector(".back").addEventListener("click", back);
    document.querySelector(".next").addEventListener("click", next);
    drawInteractiveCalendar(year, month);
    let data = getSmth();
    if (!data) return;
    data.forEach((item) => {
        infoBox.innerHTML += item;
    });

})();

function drawInteractiveCalendar(year, month) {
    let d = new Date(year, month - 1);
    let mon = month - 1;
    let table =
        "<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>";
    for (let i = 0; i < getDay(d); i++) {
        table += "<td class='none'</td>";
    }
    while (d.getMonth() === mon) {
        table += `<td>${d.getDate()}</td>`;
        if (d.getDay() === 0) {
            table += "</tr><tr>";
        }
        d.setDate(d.getDate() + 1);
    }

    table += "</tr></table>";
    document.querySelector("#calendar").innerHTML = table;
    document.querySelector("#info").innerHTML = month + " / " + year;
    handlerEvent(year, month);
}

function getDay(d) {
    let day = d.getDay();
    if (day === 0) {
        day = 7;
    }
    return day - 1;
}

function back() {
    --month;
    check();
}

function next() {
    ++month;
    check();
}

function check() {
    if (month === 13) {
        ++year;
        month = 1;
    } else if (month === 0) {
        --year;
        month = 12;
    }
    return drawInteractiveCalendar(year, month);
}

function handlerEvent(year, month) {
    document.querySelector("table").addEventListener("click", (ev) => { event(ev) })
}


function event(ev) {
    let info = [];
    if (ev.target.nodeName !== "TD") return;
    if (!ev.target.innerHTML) return;
    let days = ev.target.innerHTML;
    let event = prompt(`What do you do ${days} ?`, "eat");
    if (event === null) return;
    let tmp = `<li>${ev.target.innerHTML} / ${month} / ${year} - ${event}</li>`;
    info.push(tmp);
    infoBox.innerHTML += tmp;
    let data = getSmth();
    if (!data) {
        writeSmth(info);
    } else {
        data.push(tmp);
        writeSmth(data);
    }
}

function writeSmth(data) {
    localStorage.setItem("event", JSON.stringify(data));

}

function getSmth() {
    return JSON.parse(localStorage.getItem("event"));
}