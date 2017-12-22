import { iStorage } from "./services";
var FavoriteList = function (htmlEl, eventBus) {
    this.htmlEl = htmlEl;
    this.eventBus = eventBus;
    this.favoritesList;
    this.render();
    //обработчик для удаления записи
    this.htmlEl.onclick = event => {
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
                this.render();
            });
        }
    };
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
                this.render();
            })
            .catch(() => {
                console.log("ошибка добавления избранного");
            });
    });
};
//функция отрисовки компонента
FavoriteList.prototype.render = function () {
    iStorage
        .getData("favoritesList")
        .then(result => {
            if (result) {
                this.favoritesList = result.split(",");
            } else {
                this.favoritesList = [];
            }
            let htmlText = "<ul>";
            for (let i = 0; i < this.favoritesList.length; i++) {
                htmlText += `<li value="${this.favoritesList[i]}"><a href="#city=${this
                    .favoritesList[i]}">${this.favoritesList[
                    i
                    ]}</a><button class="btnDelete">X</button ></li>`;
            }
            htmlText += "</ul>";
            this.htmlEl.innerHTML = htmlText;
        })
        .catch(() => {
            console.log("ошибка удаления");
        });
};
export default FavoriteList;
