import { debounce } from "./utils";
import { changeHashByMapState } from "./services";
class YandexMap {
    constructor(center, eventBus, ymaps) {
        this.map;
        this.center = center;
        this.eventBus = eventBus;
        this.ymaps = ymaps;
        this.ymaps.ready(() => this.drawMap());
    }
    //функция рисующая карту
    drawMap() {
        this.map = new this.ymaps.Map("myMap", {
            center: this.center,
            controls: ["zoomControl"],
            zoom: 10
        });
        //кнопка добавить в избранное
        var btnAdd2Favor = new this.ymaps.control.Button({
            data: {
                image:
                "https://rawgit.com/NatallyaSeverina/js--base-course/06ht/06/ht/SeverinaNatallya/build/img/favorites.png"
            },
            options: {
                float: "right"
            }
        });
        this.map.controls.add(btnAdd2Favor);
        this.addHandlers(btnAdd2Favor);
    }
    //подписка на события перемещения карты и нажатие на кнопку добавить в избранное
    addHandlers(btnAdd2Favor) {
        btnAdd2Favor.events.add("click", e => {
            this.center = this.map.getCenter();
            this.eventBus.trigger("weatherMap:add2Favorite", this.center);
        });
        this.map.events.add(
            "boundschange",
            debounce(e => {
                //для не слишком частой генерации события
                this.eventBus.trigger("weatherMap:centerChange", e.get("newCenter"));
                changeHashByMapState(e.get("newCenter"));
            }, 2000)
        );
        this.eventBus.on("weatherMap:setMapCenter", center => {
            this.center = center;
            this.render();
        });
    }
    //перерисовка карты с указанным центром
    render() {
        this.map.panTo(this.center, { duration: 2000 });
    }
}
export default YandexMap;
