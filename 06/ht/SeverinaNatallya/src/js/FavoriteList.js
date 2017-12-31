import { iStorage } from "./utils";
class FavoriteList {
    constructor(htmlEl, eventBus) {
        this.htmlEl = htmlEl;
        this.eventBus = eventBus;
        this.favoritesList;
        this.readData().then(() => this.render()).catch(err => {
            console.log(err);
        });
        this.addHandlers();
    }
    addHandlers() {
        //обработчик для удаления записи
        this.htmlEl.addEventListener("click", event => {
            if (event.target.className == "btnDelete") {
                let cityName = event.target.previousSibling.text; //название города, который удалить
                if (typeof this.favoritesList === "string") {
                    //если в this.favoritesList данные в строке делаем массив
                    this.favoritesList = this.favoritesList.split(",");
                }
                var resultList = this.favoritesList.filter(function (item) {
                    //убираем из массива элементы с совпадающим названием города
                    return item != cityName;
                });
                this.favoritesList = resultList.join(","); //преобразуем массив в сторку
                iStorage.setData("favoritesList", this.favoritesList).then(() => {
                    //помещаем обновленные данные в storage
                    this.readData().then(() => this.render()).catch(err => {
                        console.log(err);
                    });
                });
            }
        });
        //подписка на событие добавления записи в избранное (перерисовываем компонент)
        this.eventBus.on("weatherMap:changeFavorites", centerCity => {
            iStorage
                .getData("favoritesList")
                .then(result => {
                    if (result) {
                        this.favoritesList = result.split(",");
                    } else {
                        this.favoritesList = [];
                    }
                    this.favoritesList.unshift(centerCity);
                    return this.favoritesList.join(",");
                })
                .then(result => {
                    iStorage.setData("favoritesList", result);
                })
                .then(() => {
                    this.readData().then(() => this.render()).catch(err => {
                        console.log(err);
                    });
                })
                .catch(() => {
                    console.log("ошибка добавления избранного");
                });
        });
    }
    readData() {
        return new Promise((resolve, reject) => {
            iStorage
                .getData("favoritesList")
                .then(result => {
                    if (result) {
                        this.favoritesList = result.split(",");
                    } else {
                        this.favoritesList = [];
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
        htmlText += this.favoritesList
            .map(
            (value, index) =>
                `<li value="${value}"><a href="#city=${this.favoritesList[
                index
                ]}">${this.favoritesList[
                index
                ]}</a><button class="btnDelete">X</button ></li>`
            )
            .join("");
        htmlText += "</ul>";
        this.htmlEl.innerHTML = htmlText;
    }
}
export default FavoriteList;
