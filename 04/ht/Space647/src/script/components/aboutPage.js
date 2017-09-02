class aboutPage {
  constructor() {}
  renderingPage() {
    let renderPlace = (document.querySelector(".workPlace").innerHTML = `
    <div class="center">
    <h3>Привет меня зовут <a href="https://vk.com/id55569389">Глеб</a></h3>
    <p>Я начинающий frontend developer, и пока еще прокачиваю свои навыки <img src="img/slightly_smiling_face.png" alt="slightly smiling face" class="smile"></p>
    <h4>Мои контакты</h4>
    <ul class="myСontacts">
    <li><a href="https://www.linkedin.com/in/gleb-borisevich-68928513a/">linkedin <img src="img/linkedin.png" alt="linkedin" ></a></li>
    <li><a href="https://github.com/Space647">GitHub <img src="img/github.png" alt="github" ></a></li>
    <li><a href="https://vk.com/id55569389" > &#160; &#160; VK &#160; &#160;<img src="img/vk.png" alt="Vk" ></a></li>
    </ul>
    </div>
    
    `);
  }
}
export default aboutPage;
