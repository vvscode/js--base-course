'use strict';

function addAuthor() {
    let author = document.querySelector("#authorDiv");
    if (!author) {
        let authorDiv = document.createElement("div");
        authorDiv.setAttribute("id", "authorDiv");
        document.body.appendChild(authorDiv);
    }

    authorDiv.innerHTML =
        "<p>Приложение было создано Кулешовым Владимиром Владимировичем.</p>" +
        "<p><a href='https://vk.com/vvkuleshov' target='_blank'>ВКонтакте</a></p>" +
        "<p><a href='https://www.linkedin.com/in/vladimir-kuleshov-27325712a/' target='_blank'>LinkedIn</a></p>" +
        "<p><img src=\"./img/portfolio.jpeg\"></p>"
}

export default addAuthor;