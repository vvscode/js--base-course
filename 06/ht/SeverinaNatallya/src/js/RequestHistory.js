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
            this.addItem(centerCity);
        });
    }
    addItem(centerCity) {
        this.readData()
            .then(() => {
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
    }
    readData() {
        return iStorage
            .getData("historyList")
            .then(result => {
                if (result) {
                    this.historyList = result.split(",");
                } else {
                    this.historyList = [];
                }
            })
            .catch(() => {
                console.log("ошибка получения данных");
            });
    }
    render() {
        let htmlText = "<ul>";
        htmlText += this.historyList
            .map(
            (value, index) =>
                `<li value="${value}"><a href="#city=${value}">${value}</a></li>`
            )
            .join("");
        htmlText += "</ul>";
        this.htmlEl.innerHTML = htmlText;
    }
}
export default RequestHistory;
