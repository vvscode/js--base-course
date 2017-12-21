(function (storage) {
    var RequestHistory = function (htmlEl, eventBus) {
        this.htmlEl = htmlEl;
        this.eventBus = eventBus;
        this.historyList;
        this.render();
        //подписка на событие изменения истории запросов
        this.eventBus.on("weatherMap:changeHistory", centerCity => {
            storage
                .getData("historyList")
                .then(result => {
                    if (result) {
                        this.historyList = result.split(",");
                    } else {
                        this.historyList = [];
                    }
                    this.historyList.unshift(centerCity);//добавляем первым элементом
                    if (this.historyList.length > 5) {//если больше 5 удаляем последний
                        this.historyList.pop();
                    }
                    return this.historyList.join(",");
                })
                .then(result => {
                    storage.setData("historyList", result);
                })
                .then(() => {
                    this.render();
                })
                .catch(() => {
                    console.log("ошибка добавления истории");
                });
        });
    };
    //функция отрисовки компонента
    RequestHistory.prototype.render = function () {
        storage.getData("historyList").then(result => {
            if (result) {
                this.historyList = result.split(",");
            } else {
                this.historyList = [];
            }
            let htmlText = "<ul>";
            for (let i = 0; i < this.historyList.length; i++) {
                htmlText += `<li><a href="#city=${this.historyList[i]}">${this
                    .historyList[i]}</a></li>`;
            }
            htmlText += "</ul>";
            this.htmlEl.innerHTML = htmlText;
        });
    };
    window.RequestHistory = RequestHistory;
})(iStorage);
