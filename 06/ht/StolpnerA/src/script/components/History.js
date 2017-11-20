import { city } from "../routes/city";
import BD from "../utils/BD";

let arrayHistory = [];
const db = new BD();

class History {
  constructor() {
    this.getHistoryFromStorage();
  }
  addHistory(country) {
    if (arrayHistory[0] === country) {
      return;
    }
    if (arrayHistory.indexOf(country) > 0) {
      arrayHistory.splice(arrayHistory.indexOf(country), 1);
    }
    if (arrayHistory.length > 4) {
      arrayHistory.pop();
    }

    arrayHistory.unshift(country);

    this.saveHistoryInStorage();
  }

  renderHistory() {
    const divHistory = document.querySelector(".history");
    divHistory.innerHTML = " ";
    arrayHistory.map(item => {
      divHistory.innerHTML += `<a href="#city=${item}">${item}</a><br />`;
    });
  }

  saveHistoryInStorage() {
    db.setItem("forecast", arrayHistory);
  }

  getHistoryFromStorage() {
    db
      .fetch("forecast")
      .then(data => (arrayHistory = data))
      .catch(() => (arrayHistory = []));
  }
}

export default History;
