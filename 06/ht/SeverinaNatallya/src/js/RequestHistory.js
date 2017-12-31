import { iStorage } from "./utils";
class RequestHistory {
    constructor(htmlEl, eventBus) {
        this.htmlEl = htmlEl;
        this.eventBus = eventBus;
        this.historyList;
        this.readData().then(() => this.render()).catch(err => {
            console.log(err);
        });
        //подписка на событие изменения истории запросов
        this.addHandlers();
    }
    addHandlers() {
        this.eventBus.on("weatherMap:changeHistory", centerCity => {
            iStorage
                .getData("historyList")
                .then(result => {
                    if (result) {
                        this.historyList = result.split(",");
                    } else {
                        this.historyList = [];
                    }
                    this.historyList.unshift(centerCity); //добавляем первым элементом
                    if (this.historyList.length > 5) {
                        //если больше 5 удаляем последний
                        this.historyList.pop();
                    }
                    return this.historyList.join(",");
                })
                .then(result => {
                    iStorage.setData("historyList", result);
                })
                .then(() => {
                    this.readData().then(() => this.render()).catch(err => {
                        console.log(err);
                    });
                })
                .catch(() => {
                    console.log("ошибка добавления истории");
                });
        });
    }
    readData() {
        return new Promise((resolve, reject) => {
            iStorage
                .getData("historyList")
                .then(result => {
                    if (result) {
                        this.historyList = result.split(",");
                    } else {
                        this.historyList = [];
                    }
                    resolve();
                })
                .catch(() => {
                    reject("ошибка удаления");
                });
        });
    }
    render() {
        let htmlText = "<ul>";
        htmlText += this.historyList
            .map(
            (value, index) =>
                `<li value="${value}"><a href="#city=${this.historyList[
                index
                ]}">${this.historyList[
                index
                ]}</a></li>`
            )
            .join("");      
        htmlText += "</ul>";
        this.htmlEl.innerHTML = htmlText;
    }
}
export default RequestHistory;
