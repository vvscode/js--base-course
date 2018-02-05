function addAbout() {
    let about = document.querySelector("#aboutDiv");
    if (!about) {
        let aboutDiv = document.createElement("div");
        aboutDiv.setAttribute("id", "aboutDiv");
        document.body.appendChild(aboutDiv);
    }

    aboutDiv.innerHTML = `<p>Аркдная игра была создана Кулешовым Владимиром</p>
<p><a href='https://vk.com/vvkuleshov' target='_blank'>ВКонтакте</a></p>
<p><a href='https://www.linkedin.com/in/vladimir-kuleshov-27325712a/' target='_blank'>LinkedIn</a></p>
<p>Игра была создана по ТЗ описанному тут: <a href='https://github.com/vvscode/js--base-course/tree/master/09/ht' target='_blank'>ТЗ для игры</a></p>`
}

export default addAbout;